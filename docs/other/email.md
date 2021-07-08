# web 开发邮件模板

# 背景

最近在准备写一个 html 的邮件模板，在网上搜了下资料，然后用 express 结合 reload 搭建了一个环境，结合自己开发中遇到的一些坑，总结一下。

# 注意事项

- 1 html 的 DOCTYPE
  这个无需多言，网上很多资料都有介绍，使用最古老的声明文档

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <title>HTML Email编写指南</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="/js/reload.js"></script>
  </head>
</html>
```

- 2 全局样式写在 body 里边
  这里我遇到过一个字体的 bug，body 里边的字体在 mac 的 outlook 客户端和网页端都是正常的，但是在 window 的 outlook 客户端上面，字体就变成了宋体，不是微软雅黑了，后来还是全都写在行内样式里边去了。

```
<body
    style="margin: 0; padding: 0;font-family: 'Microsoft YaHei', '微软雅黑', sans-serif; "
  >
  </body>
```

- 3 所有的布局样式都使用 table 格式

```html
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="background:#FAFAFA"
></table>
```

- 4 所有的样式采用行内样式<br/>
  &nbsp;4.1 这里我遇到了一个问题，如果设置了 line-height 和 td 的高度一样的时候，会让样式不居中，所以最好使用 td 自身居中功能 <br/>
  &nbsp;4.2 当 td 里边的内容为空的时候，在 mac 的 outlook 端是正常的，但是到了 window 的 outlook 端，就会显示一条线，特别奇怪，所以如果有空的 td 的时候，里边最好放鸡哥空格

```html
<td style="width: 108px;height:80px; padding-left: 30px;padding-right: 20px;">
  <div
    style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 108px;height:20px; color: #ffffff;line-height: 20px;font-size: 20px;font-weight: 700;"
  >
    dssdssds
  </div>
</td>
```

- 4 td 的宽度必须设置，不然就会拉宽<br/>

```
<td style="height:80px;">
      <div
        style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 54px;height:18px; color: #ffffff;line-height: 18px;text-align: center;font-size:12px;border: 1px solid #ffffff;border-radius: 2px;font-weight: 300;"
      >
        企业版
      </div>
    </td>
```

在 window 的 outlook office 365 下会表现的 td 的宽度超多 54px，达到 100px 左右，所以必须在 td 上加上宽度

```
<td style="height:80px;width：54px;">
      <div
        style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 54px;height:18px; color: #ffffff;line-height: 18px;text-align: center;font-size:12px;border: 1px solid #ffffff;border-radius: 2px;font-weight: 300;"
      >
        企业版
      </div>
    </td>
```

- 5 table 里边的内容必须要用 tr 包一层<br/>
  开始的时候，写了一个类似于这种结构的

```
<table>
    <tr>
        <table></table>
    </tr>
    <table></table>
</table>
```

这种在 mac 的 outlook 和 window 的 outlook 的（office 365）下面都没有问题，但是在 window 的 outlook（2016）下面整个外层的 table 也是居中，但是会把宽度拉的超级宽,只要加一层 tr 就可以解决这个问题。

```
<table>
    <tr>
        <table></table>
    </tr>
    <tr><table></table></tr>
</table>
```

- 5 window 的 outlook 客户端会自动添加标签<br/>
  在 window 的客户端，不知道为什么当你的表格中的内容是 www.baidu.com 这种的时候，就会自动给你添加一个 a 标签来包裹 www.baidu.com,会变成这样的代码

```
<p style="margin-top:0;margin-bottom:0;line-height:28.5pt;"><span lang="en-US" style="color: rgb(51, 51, 51); font-size: 9pt; font-family: 微软雅黑, sans-serif, serif, EmojiFont;"><a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" id="LPlnk991385">www.baidu.com</a>
</span></p>
```

当然如果你的域名不长的时候是可以的，但是如果你的域名特别长的时候，就会把整个表格的样式给撑乱，比如类似这样，就算你设置了自动断行，也没什么用。

![](https://user-gold-cdn.xitu.io/2019/11/7/16e4613345796d69?w=716&h=106&f=png&s=14072)

解决办法：<br/>
就是在 td 上加上 word-wrap:break-word;word-break:break-all;这样当内容超出样式的时候，就会自动断行。
