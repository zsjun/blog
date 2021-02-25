# 前端面试宝典

## 手写源码实现

### 手写 async/await 的实现？

```js
function asyncFunc(generator) {
    const iterator = generator();

    const next = (data) => {
        let {value, done} = iterator.next(data);
        if(done) return true
        value.then((data) => {
            next(data)
        })
    }
    next()
}

