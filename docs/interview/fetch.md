# fetch 小 tip

最近在用 fetch 的时候，发现一个问题，就是接口返回时 200 的，但是却看不到任何的返回信息，如下所示：<br/>
<img :src="$withBase('/images/fetch_error.png')" alt="foo">

所有的信息都是空的，但是实际上是已经返回了数据，后来查了下是因为前端的这边写法有问题，是因为 promise 没有返回,当如下写法的时候，是看不到返回的
代码：

```
fetch("/infod", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({})
      })
        // .then(response => response.json())
        .then(res => {
          console.log("rss", res)
          // res = res.text()
        })
        .catch(err => {

        });
```

只有在代码里边把 response 使用 json()或者其它方法的时候才能看到返回。
