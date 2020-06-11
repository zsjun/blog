# 什么是 cookie

就是一段文本，一般服务端设置返回给浏览器

# 什么是 session

session 就是在后端内存中临时一个对象，保存一些登录的信息，connect 结束之后就销毁
可以超时清除，也可以服务器主动清除

# 不同域名设置 cookie

cookie 只能绑定在单一域名下，只能设置本身或者父域名

# cookie 跨域

通过代理，jsonp

# csrf

就是拿到合法的身份，去伪造请求

# token

服务端返回的一个合法的字符串，token 由三部分组成，header，payload，Signature 组成

```
// 由 HMACSHA256 算法进行签名，secret 不能外泄
const sign = HMACSHA256(base64.encode(header) + '.' + base64.encode(payload), secret)

// jwt 由三部分拼接而成
const jwt = base64.encode(header) + '.' + base64.encode(payload) + '.' + sign

```
