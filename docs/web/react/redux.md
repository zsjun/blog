# redux实现的一点思考
问题驱动思考，思考反馈问题。

# 思考如何实现redux
如果你是redux的作者，你会怎么实现redux呢？或者换句话说如果是给你一个需求，实现一个单数据流控制，你会如何实现呢？可以自己思考一下，别人写的，毕竟不是你的，还是自己思考之后，互相印证才是自己的。
可以自己想下，自己大约有多久，没有两三天来思考一个问题，没有两三天来思考来解决一个问题了。
如果有，是为什么？是因为自己所有的问题都解决了嘛，还是因为自己的所有问题都交给个了搜索，自己根本不需要再思考为什么？或者是因为自己感觉用两三天来思考一个问题的解决方案，不如多用搜索解决几个问题。

# 放弃

本来是想写一篇关于从0到1开发redux的，但是看了这篇文章，感觉写的已经很浅显易懂了，自己根本没有必要再重复一遍。<br/>
https://github.com/brickspert/blog/issues/22

# 反思

## redux概念的见名知意
redux基本的概念就是dispatch， action， reducer，这几个概念，其实dispatch和action都比较好理解，就是reducer，感觉是一头雾水，如果把reducer给更改成produceState，感觉更好理解一些，reducer就是一个生产出state的函数。

## 看懂很容易，自己写很难
阅读别人的文章，看懂别人写的很容易，比如别人写的这篇redux的实现文章，稍微懂点的一看就能完全明白redux的基本实现，可能读完之后也觉得自己懂了，可是真的懂了吗？<br>
别人写的浅显易懂，只是别人的，而不是你自己的，等自己能用自己的语言，而不是复制别人的写出来才是自己的。

