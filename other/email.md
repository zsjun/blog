# 背景

最近在准备写一个html的邮件模板，在网上搜了下资料，然后用express结合reload搭建了一个环境，结合自己开发中遇到的一些坑，总结一下。

# 注意事项

* 1 html的DOCTYPE
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
```
* 2 全局样式写在body里边
这里我遇到过一个字体的bug，body里边的字体在mac的outlook客户端和网页端都是正常的，但是在window的outlook客户端上面，字体就变成了宋体，不是微软雅黑了，后来还是全都写在行内样式里边去了。
```
<body
    style="margin: 0; padding: 0;font-family: 'Microsoft YaHei', '微软雅黑', sans-serif; "
  >
  </body>
```
* 3 所有的布局样式都使用table格式
```html
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="background:#FAFAFA"
>
</table>
```
* 4 所有的样式采用行内样式<br/>
&nbsp;4.1 这里我遇到了一个问题，如果设置了line-height 和 td的高度一样的时候，会让样式不居中，所以最好使用td自身居中功能 <br/>
&nbsp;4.2 当td里边的内容为空的时候，在mac的outlook端是正常的，但是到了window的outlook端，就会显示一条线，特别奇怪，所以如果有空的td的时候，里边最好放鸡哥空格
```html
<td
  style="width: 108px;height:80px; padding-left: 30px;padding-right: 20px;"
>
  <div
    style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 108px;height:20px; color: #ffffff;line-height: 20px;font-size: 20px;font-weight: 700;"
  >
    dssdssds
  </div>
</td>
```
* 4 td的宽度必须设置，不然就会拉宽<br/>
```
<td style="height:80px;">
      <div
        style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 54px;height:18px; color: #ffffff;line-height: 18px;text-align: center;font-size:12px;border: 1px solid #ffffff;border-radius: 2px;font-weight: 300;"
      >
        企业版
      </div>
    </td>
```
在window的outlook office 365下会表现的td的宽度超多54px，达到100px左右，所以必须在td上加上宽度

```
<td style="height:80px;width：54px;">
      <div
        style="font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;width: 54px;height:18px; color: #ffffff;line-height: 18px;text-align: center;font-size:12px;border: 1px solid #ffffff;border-radius: 2px;font-weight: 300;"
      >
        企业版
      </div>
    </td>
```
* 5 table里边的内容必须要用tr包一层<br/>
开始的时候，写了一个类似于这种结构的
```
<table>
    <tr>
        <table></table>
    </tr>
    <table></table>
</table>
```
这种在mac的outlook和window的outlook的（office 365）下面都没有问题，但是在window的outlook（2016）下面整个外层的table也是居中，但是会把宽度拉的超级宽,只要加一层tr就可以解决这个问题。
```
<table>
    <tr>
        <table></table>
    </tr>
    <tr><table></table></tr>
</table>
```

