# TypeError: Super expression must either be null or a function, not undefined

## 问题：

TypeError: Super expression must either be null or a function, not undefined

## 分析：

这个问题遇到过两次了，一次在企业版，还有一次在公安版里边

## 解决：

### 企业版

企业版的时候，是因为使用webpack的默认压缩出现问题，可能是webpack4默认压缩有bug，然后换成了UglifyJsPlugin来进行压缩，解决

```text
minimizer: [
          new UglifyJsPlugin({
            test: [/\.(js|jsx)$/],
            exclude: [/node_modules/, /src\/components\/vendor/],
            cache: "./.cache",
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              warnings: false,
              compress: {
                inline: 1,
                keep_fnames: true
              },
              mangle: {
                keep_fnames: true
              }
            }
          })
        ],
```

### 公安版

这次解决比较曲折，没有找到更好的办法，只能一点点的排查，缩小范围，最后发现是引入的一个库anzi-ui里边的一个组件导致的。 组件里边使用了react hooks，来作为组件，

```text
function alert() {}
```

最后没有导出组件，而是导出的函数。

