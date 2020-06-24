# react hooks 基本常识与问题

## useEffect

如果useEffect里边同时改变了state，如果没有设置依赖，有可能会导致无限循环。 因为useEffect在每次update后会执行，然后再改变状态再执行，这样最后就成了死循环了。

## react-hooks 使用原则

1， 在最顶部使用，不需要任何条件 2，必须在react function里边，也就是在代码的function 的函数名必须大写

## 建立自己的hooks

就是抽出公共函数

## useContext

## react-hooks使用问题

### 问题1

当使用react-hooks的时候，发现如果结合react-router使用的时候，如果使用动态注入reducer的时候，会出现组件先卸载，然后再加载的情况。 代码如下

```javascript
const asyncComp = (store, modName, config = { extra: [] }) => props => {
  const Comp = lazy(() => {
    const modKey = modName;
    const keys = [modName, ...config.extra];
    const reducers = keys.map(key => {
      return import(`../reducers/${key}/index`);
    });
    return Promise.all(reducers).then(result => {
      injectReducer(store, { keys, reducers: result });
      return import(/* webpackChunkName: "[request]" */ `./${modName}`);
    });
  });

  return <Comp {...props} store={store} />;
};
```

router 如下：

```text
<Route
              path="/ddssd"
              component={asyncComp(store, "Dsds")}
            />
```

组件代码：

```text
export default function Dashboard(props) {
  useEffect(() => {
    document.title = "Dashboard";
    console.log(111);
    return () => {
      console.log(9999);
    };
  }, []);
  return (
    <div>
      <PageTitle name="Dashboard" />
      {/* <Comp {...props} /> */}
    </div>
  );
}
```

结果会出现如下情况： ![image.png](/images/react-hooks.png) 可以看到上面，执行了一次卸载钩子函数，执行了两次加载完成函数 但是如果router的代码，改成如下的情况：

```text
<Route
              path="/ddssd"
              // component={asyncComp(store, "Dashboard")}
              component={Dsds}
            />
```

结果就是正常的，如下图： ![image.png](https://upload-images.jianshu.io/upload_images/4432476-7c36deccc41cd9f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 问题分析

刚开始以为和react hooks有关系，但是把原来的function 函数改成了class 组件依然是如此，应该和react hooks没有任何关系了，现在基本可以排除了是以为react hooks引起的了。 既然已经排除了，那到底是因为什么呢？ 继续查找 后来把component={asyncComp\(store, "Dashboard"\)} 这里换成component={Dashboard} 竟然是好的，于是怀疑是否是asyncComp这个函数引起的，于是又去查找asyncComp这个函数，可以看了半天感觉没有什么问题。 只能继续查找， 后来去看了react router的官方文档，发现它们推荐是用[`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 这个插件，而我自己当时搭建环境的时候，因为这个使用这个插件，发现不能正常的import，一直报错，所有换成了dynamic-import-node这个插件，会不会是因为这个插件的原因呢，可是换了之后，还是不行。

后来想了下，到底是什么原因导致了，走到了componentWillUnmount这个钩子函数里边了，肯定是因为url改变导致了，可是为什么改变了，url从来没有改变过，那为啥还会出现挂载，卸载，再挂载的情况呢？

后来突然意识到，是不是router外面还包了一层，上层导致了更新，然后router先挂载上，匹配到url，然后上层的更新，导致了router再卸载，然后再重新挂载呢？

代码如下

```text
<MainLayout

        systemInfo={systemInfo}
      >
        <Suspense
          fallback={
            <Fragment>
              <Loading type="bar" />
              <MainLoading />
            </Fragment>
          }
        >
          <Switch>
            <Route
              path="/console"
              component={asyncComp(store, "Do")}
            />

          </Switch>
        </Suspense>
      </MainLayout>
    );
  }
```

于是立即去验证，果然最后发现是因为systemInfo，因为在后面重新需要去更新状态，导致了整个的MainLayout重新刷新，导致了先挂载，再卸载，再挂载，这样的情况，这样也就导致了在useEffect里边的获取数据的函数，不管是否传了\[\],都会请求两边，产生这样诡异的情况。

### 问题总结

首先是对react router 的不了解，因为觉得就是一个单纯的路由，没什么好看的，没有深入的去了解，导致遇到情况的时候，没有合适的下手时机。 其次查找问题就是要逐步缩小范围，大胆假设，小心求证的结果。

