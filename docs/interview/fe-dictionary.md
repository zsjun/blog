# JS
## 1. react diff 算法

1.1. 相同的level之间进行对比，控制只是比较同一层级的元素，tree diff。<br/>
1.2. 节点与节点之间对比， component diff 判断是否是更新，删除，还是不需要任何操作（使用shouldComponentUpdate()来判断）<br/>
1.3. 同一层级的，可以通过id进行标记，这里的移动规则其实也很简单，
首先遍历新集合，找到存在于旧集合中的元素，根据旧集合中的_mountIndex(实际位置)和新集合中元素的在旧集合中出现的lastIndex来进行比较是否进行移动操作，其实就是一个根据key不断移动旧集合中的元素位置，来达到变成新集合的过程，类似于字符串的编辑距离。<br/>

## 2. react 高阶组件

### 2.1. 什么是react 高阶组件
就是一个组件的包装，可以理解为传入一个组件，返回一个包装之后的组件。

### 2.2. 高阶组件可以做什么
#### 2.2.1. 包裹组件
1. 可以操作props，做任何想做的事情
2. 通过ref获取的包裹组件
3. 操作state和props，可以在高阶组件中拿到包裹组件的状态
4. 包装传入的组件
#### 2.2.2. 反向继承
可以通过反向继承，也就是高阶组件继承传入的组件，比如如下：
```
function HigherOrderComponent(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return super.render();
        }
    };
}
```
1. 可以操作state
2. 修改super.render()返回的json对象

### 2.3 高阶组件存在的问题
1. 静态方法的丢失 <br>
2. ref的丢失， 通过react.forwardRef 来做中间代理

### 2.4. 高阶使用在那些地方
2.4.1. 最基本的是复用代码<br>
2.4.2. 权限控制

## 3. react context
### 3.1. 为什么会有context？
为了防止层层传递整个组件树的值，不用一层层的去传递。

### 3.2. 使用过程
1. 通过React.createContext('light')<br>
2. 通过Provider提供给组件<br>
3. 需要使用context的组件使用static contextType = ThemeContext;定义自己需要使用哪个context

### 3.3. 编写add函数 然后实现
```
用js 实现一个无限极累加的函数， 形如:
add(1) //=> 1;
add(1)(2) //=> 2;
add(1)(2)(3) //=> 6;
add(1)(2)(3)(4) //=> 10;
以此类推...
```

这是涉及到函数的函数柯里化，就是每次函数只接受一个参数
这里比较重点的是如何在最后的循环中如何获取相加之后的值，这里值得一提的是当函数会有一个默认的调用，当是字符串的时候，首先调用toString，如果是数字，则会调用valueOf。

![](https://user-gold-cdn.xitu.io/2019/12/13/16eff5fb77d88aa6?w=372&h=410&f=png&s=56302)


![](https://user-gold-cdn.xitu.io/2019/12/13/16eff601b74f498b?w=353&h=442&f=png&s=55965)

可以看到当转换为数字的时候，会调用valueOf。
## 3. 编写一个autocomplete 组件，应该如何实现？


## 4. 如果提高页面的渲染速度？


## 5. 在spa页面中，当在a页面的时候，如果这时候你点了b，如果监控b页面的整个的渲染时间？

## 6. js 作用域
```
function Foo() {
    getName = function() {
        alert(1)
    }
    return this
}
Foo.getName = function() {
    alert(2)
}
Foo.prototype.getName = function() {
    alert(3)
}
var getName = function() {
    alert(4)
}
function getName() {
    alert(5)
}

// 写出下面的结果
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()

```
解析：
这里涉及了js的变量提升和函数提升，js作用域的查找
所以最后的结果就是
2，4，1，1，2，3，3

## 7. 函数防抖和函数节流

## 8 redux 实现原理？

## 9 redux 中间件，如何实现？
## 10 洗牌算法
## 11 vue响应式原理
## 12 node为什么适合做高并发
## 13 node容灾处理
## 14 死锁，死锁产生的必要条件
## 15 实现cacheRequest方法，保证使用ajax请求相同资源实际只发送一次请求
## 16 一个无限长有序可重复数组N，查X最后出现的位置
## 17 treeshaking原理
## 18 node如何捕获异常
## 19 尾递归函数优化

# css
## 1. 设置背景图片不随文字的移动而移动
可以通过设置background-attachment来达到这种效果
```
background-attachment: scroll 相对于元素本身位置不变
background-attachment: local  跟随元素移动
background-attachment: fixed  相对于视口本身位置不变
```

## 2. vmax和vmin
vmax是vw和vh中最大的值
vmin是vw和vh中最小的值

vmax 和vmin通常用在手机横竖屏中。
# HTML
## 1. 如何防止网页被iframe嵌入
1.1. 使用X-Frame-Options,通过在后端设置这个属性，可以确定是否可以显示在iframe中<br>
1.1.1. DENY：浏览器拒绝当前页面加载任何Frame页面<br>
1.1.2. SAMEORIGIN：frame页面的地址只能为同源域名下的页面<br>
1.1.3. ALLOW-FROM origin：origin为允许frame加载的页面地址<br>

1.2. 使用js判断, window指当前的current ifame，window.top指最顶层的网页，判断当你的网页被嵌套的时候，直接替换最顶层的网页。
```
if (window != window.top) {
    window.top.location.replace(window.location)
    // 这是直接代替外窗，你也可以干别的
}
```
# node
## 1. nodejs的事件轮询机制
```
setTimeout(function() {console.log(1), 0})
setImmedediate(function(){
    console.log(2)
})
process.nextTick(function() {
    console.log(3)
})
```
思考一下打印顺序

1 time 阶段，定时器 <br>
2 pending callback 系统操作 <br>
3 prepare 阶段 处理一些错误 <br>
4 poll 阶段， 处理轮询队列，如果轮询队列为空<br>
&nbsp; 4.1 如果设置了setImmedediate，则进入check阶段<br>
&nbsp; 4.2 如果没有设置了setImmedediate，则等待事件进入，或者定时函数到时间&nbsp;也进入下一阶段<br>
5 check 阶段
执行setImmedediate
6 close阶段
process.nextTick 在任何阶段都是优先执行。




# 其他

## 1. 你做过觉得比较有技术难点的项目，难在哪里，为什么觉得有技术难点。
这个根据自己个人情况自己来回答，这个问题在面试中被问到的概率非常高，可以结合自己所做的项目，针对性的找一两个觉得特别有技术难点的项目好好准备一下，把其中的技术难点在哪里，解决的思路，如何解决，解决之后的反思准备一下。

## 2. 从输入一个url地址到渲染完网页发生了什么？
2.1  DNS解析<br>
&nbsp;- 浏览器DNS缓存<br>
&nbsp;- 系统DNS缓存<br>
&nbsp;- 路由器DNS缓存<br>
&nbsp;- 网络运营商DNS缓存<br>
&nbsp;- 迭代查找域名服务器<br>
2.2  TCP连接<br>
&nbsp;- 浏览器向服务器发送请求，我准备连接你的服务器了<br>
&nbsp;- 服务器向浏览器发送回应，我收到你发来的请求了，准备连接吧<br>
&nbsp;- 浏览器发送给服务器我收到你发来的消息了，我准备连接了<br>
&nbsp;为什么需要三次连接呢，两次好像就够了，那问题就转换为如果只是两次连接会出现什么情况？<br>
假设只有两次，那服务器就会想浏览器收没收到我的消息，我现在准备着，等待浏览器过来连接，可是不能一直等着啊，到底浏览器什么时候过来连接。假设我发的请求丢了呢，我是不是也还这样一直等着。
2.3 发送请求<br>
2.4 响应请求<br>
2.5 浏览器渲染<br>
&nbsp;- 解析构建dom树<br>
&nbsp;- 解析构建css树<br>
&nbsp;- 合并dom树和css树<br>
&nbsp;- 计算布局，渲染<br>
2.5 断开连接 TCP四次挥手<br>
&nbsp;- 浏览器告诉服务器，我接受完了，准备关闭吧<br>
&nbsp;- 服务器告诉浏览器，我收到了消息，准备关闭了<br>
&nbsp;- 服务器告诉浏览器，我东西发送完了，准备关闭了<br>
&nbsp;- 浏览器告诉服务器，我东西接受完了，关闭了，你也关闭吧<br>


