# 一次狗血的bug查找记录

## 问题描述

今天本来想调试下接口，结果发现如下问题，接口404了，因为现在的代码是好久之前的，发现之前的接口是好的，只有这次上的接口是404的。

 ![image.png](https://upload-images.jianshu.io/upload_images/4432476-91324b48055396ed.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240) 

但是用curl去curl这个接口的时候，发现是200,如下图所示： ![image.png](https://upload-images.jianshu.io/upload_images/4432476-74cb151e8965a1bd.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

## 问题查找

1，首先判断是否和上接口方式有关，因为这次是接手了别人好久之前的代码，是否存在限制或者其它 结果发现没有

 2，因为发现如下

 ![image.png](https://upload-images.jianshu.io/upload_images/4432476-b5ddd52b6ee39181.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240) 

可是发现接口返回了access denied，判断这个是否和用户有关系，因为开发的时候需要把账号加到后端权限里边，最后发现确实没有加到开发的权限里边，本来因为这个原因，但是发现不是这里的问题，依然没有解决。 3，因为只有新上的接口有问题，于是去找后端看了下，有没有什么问题，可是后端说他用postman是正常啊，没有什么问题，于是就怀疑自己的配置是不是有什么问题，因为以前遇到过用webpack的proxy，再用http-proxy-middleware 这个包去转发的时候，因为webpack的proxy写法和http-proxy-middleware写法不一致，导致转发不成功的问题，可是去查找了一遍，发现没有问题 

4，后来想了下，去浏览器里边复制了请求的curl，然后再去请求，发现curl的时候，这时候也就返回了404了，那就说明接口确实有问题。可是为什么不从浏览器复制，单纯的使用curl -I 接口的时候，就返回200 ok了，这时候想到返回access denied， 可能和权限有关，后来去问了下后端，他们用的spring，那就是可能后端框架做了事情，如果curl带上cookie的时候，后端框架首先判断有没有cookie，cookie是否正确，如果不正确的话，根本不会转发到接口哪里，直接按照200返回了。 

5，最后想了想是不是这次所有新上的接口都是404，于是重新换了个接口，竟然不是404，而是正常的，这就很明显了，是后端的问题，于是再次去找后端确认，结果最狗血的事情出来了，后端竟然没上这个接口，或者说文档里边的接口地址写错了，也就是说根本没上这个接口，而他用postman 一直说测试是正常的，没有问题的，postman里边测试的竟然不是我发的这个接口，也就是说一直在拿着别的接口在测试，真是日了狗 一口血！！！

