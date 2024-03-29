# nginx 通关

# 什么是 nginx？

nginx 是一个开源可靠的 HTTP 中间件代理服务。

# 配置目录

## 主配置文件

/etc/nginx/nginx.conf <br>
配置文件基本结构：
![](https://user-gold-cdn.xitu.io/2019/10/23/16df76f566fe407b?w=1516&h=668&f=png&s=47231)

# nginx 开启，关闭，重启

开启 systemctl start nginx
关闭 nginx -s stop
重启，nginx -s reload （这个一般是在修改配置文件后，先用 nginx -t 检查配置语法是否正确后，再用 nginx -s reload 平滑重启）

## 日志文件

/var/log/nginx

# 发生错误的时候查找方法

最重要的就是错误日志，错误日志，错误日志，当发生错误的时候，首先第一要想到去查看错误日志，查看发生错误的原因。

- 1，首先查看错误日志
  tail -n 10 /var/log/nginx/error.log
- 2，找到错误原因，修改配置文件
  /etc/nginx/conf.d/default.conf
- 3，查看修改的错误命令是否争取
  nginx -t
- 4，平滑重启
  nginx -s reload

# server_name

## 优先级

1，当在多个 serve 中匹配了相同的 server_name
最先出现的优先级是最高的。

# location

## location 匹配规则

- 1 = 表示精确匹配。只有请求的 url 路径与后面的字符串完全相等时，才会命中。
- 2 ~ 表示该规则是使用正则定义的，区分大小写。
- 3 ~\* 表示该规则是使用正则定义的，不区分大小写。
- 4 ^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。
  匹配顺序
- 1 如果匹配到 = ， 也就是精确匹配到 url，则返回
- 2 如果匹配到^~,则返回，并且不会想下匹配。这里我曾经遇到过在同一服务器上同时部署两个 react 单页项目的时候，一个 react A 项目放在/home 目录下，一个 react B 项目放在/codsse 目录下，因为写了如下规则

```
^~ /codsse {
    ...
}
```

导致当 url 是/codesse/的时候，可以匹配到 B 项目的 index.html,但是同时在 B 中 index.html 中的 js 也匹配到了 B 项目的 index.html,所以导致形成了一个死循环。

- 3 接下来匹配正则表达式的，~ 或者~\*的，如果匹配到则返回
- 4 最后都没匹配到，则返回最大匹配的或者 404
- 5 = > ^~ > ~/~\* 优先级

# try_files

try_files 试图寻找的文件

# alias 与 root 的区别

root 会把匹配到 location 连在一起去访问
比如有以下配置

```js
location /cat {
    root /cat/imgs/;
}
```

当访问 xx/cat/a.png 的时候，实际上是到 /cat/imgs/cat/a.png 中去寻找
当 alias 是/cat/imgs 的时候，同样的网址，实际上到/cat/imgs/a.png 中去寻找

# nginx 的访问控制

## http_access_module

deny 拒绝访问<br>
allow 可以访问

# 作为静态资源服务器

## 压缩静态资源

1， gzip：on<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gzip_comp_level: 2 (压缩级别)<br>

## 设置过期时间

一般浏览器首先会检查 max-age，如果过期，则会发送 etag 和 Last-Modified 到服务器验证
1， 设置过期时间<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expires

# 正向代理和反向代理

## 正向代理？

正向代理就是代理客户端发起请求，比如我们经常使用的 vpn

## 反向代理？

就是在服务器端进行代理，比如你访问一个域名，并不知道真正的实际资源是否通过 nginx 给代理到哪里去了。

# 跨域访问

设置可以 nginx 允许可以跨域访问

```
location /sddss/ {
       proxy_redirect off; # 关闭重定向
       add_header Access-Control-Allow-Origin *;
   }
```

# 负载均衡

所谓的负载均衡其实就是通过 nginx 把请求转发到不同的服务器上面去。
每个服务可以配置一些参数，比如 weight 权重，比如 max_fails 等
负载均衡也可以选择不同的算法，比如轮询，比如 ip—hash 算法和 url—hash 算法等

```
upsteam ii {
    serve 1;
    serve 2;
}
server {
    location / {
        proxy_pass ii;
        include proxy_params;
    }
}
```

# nginx 作为缓存服务器

nginx 作为中间缓存，使用 proxy_cache_path

# nginx 重定向 url

可以通过 rewrite 根据正则匹配，把匹配到的 url 重定向到别的 url 中去

## rewrite 语法

rewrite 正则 flag <br>
flag 包括 break，last,redirect，permanent
break 会直接去查找<br>
而 last 相当于会继续向下匹配<br>
rediect 临时重定向<br>
permanent 永久重定向

## rewrite 优先级

sever 中的 rewrite 规则 > location 中的 rewrite 规则

# nginx 链接周期限制

## 使用模块

secure_link_module
原理就是首先 nginx 根据一些信息返回下载链接包括 md5 和 expries，然后下载的时候，nginx 在进行验证 md5 和过期时间。
返回链接如下：
/download?mad5=dsdsd&expries=112233222

```js
location ~ {
   secure_link
   secure_link_md5
}
```

# nginx 区分国内外 ip

## 使用模块

http_geoip_module
可以根据访问的 ip 是否是国内 ip，来进行限制访问

```js
location / {
    if ($geoip_country_code != CN) {
        return 403
    }
}
```

# nginx https

## https 配置

*1 安装 openssl http_ssl_module
*2 生成 CA 证书
\*3 配置

```
server {
    listen      443;
    server_name www.onedns.net;
    ssl         on;
    ssl_certificate     /etc/nginx/ssl/111net.pem;
    ssl_certificate_key /etc/nginx/ssl/2222.key;
    ssl_protocols       Tddsdss;
    ssl_ciphers         dddssdss;
```

## https 服务优化

*1 激活 keepalive 长链接
*2 激活 ssl cache 缓存

## nginx+ Lua

## Lua 基础语法

- 1 ~= 表示不等于
- 2 字符串拼接 ..

## 根据 ip 进行不同内容的访问

基本原理： 当用户访问的时候，nginx 获得用户的 ip，然后通过 lua 去访问 ip 数据库，然后让不同的 ip 访问不同的内容。

```js
location / {
    default_type "text/html";
    content_by_lua_file /opt/as.lua;
}
```

# nginx 性能优化

## ab 接口压力测试工具

ab -n 2000 -c 2 http://127.0.0.1

## cpu 亲和

设置 worker process 为 cpu 核数

# nginx 安全

## 常见的攻击手段

- 1 密码撞库
- 2 文件上传漏洞
- 3 sql 注入
