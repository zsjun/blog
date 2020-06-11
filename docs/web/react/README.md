# function hooks setInterval

## setInterval 问题

```text
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Counter() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    console.log(333);
    let id = setInterval(() => {
      console.log(222);
      setCount(count + 1);
    }, 1000);
    return () => {
      console.log(1111);
      clearInterval(id);
    };
  });

  return <h1>{count}</h1>;
}

const rootElement = document.getElementById("root");

// Second interval to demonstrate the issue.
// Fast updates from it cause the Counter's
// interval to constantly reset and never fire.
// setInterval(() => {
//   ReactDOM.render(<Counter />, rootElement);
// }, 100);
ReactDOM.render(<Counter />, rootElement);
```

运行结果是正常的，通过打印可以看出，它是先清除 setInterval 再添加 setInterval 来执行的，这样如果时间设置的较大没什么问题，但是如果设置时间比较小的话，还没有等到 setInterval 执行的时候，就已经被清除了

```text
setInterval(() => {
  ReactDOM.render(<Counter />, rootElement);
}, 100);
```

可以看到一直没有得到执行就会被清除

![image.png](https://upload-images.jianshu.io/upload_images/4432476-6f43a26ab98fb712.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是因为每次 render，都会执行 useEffect，但是如果这样的代码的话

```text
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      console.log(1234);
      clearInterval(id);
    };
  }, []);

  return <h1>{count}</h1>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```

可以看到它会只执行一次，因为 setCount 只是取得了第一次传入的 count，也就是 0，所以数字就一直为 1,但是循环还是在执行

![image.png](https://upload-images.jianshu.io/upload_images/4432476-69c67ef5478b6c6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以参考如下链接进行使用 setInterval [https://overreacted.io/making-setinterval-declarative-with-react-hooks/](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
