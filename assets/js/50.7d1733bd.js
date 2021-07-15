(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{399:function(e,t,n){"use strict";n.r(t);var r=n(25),a=Object(r.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"typeerror-super-expression-must-either-be-null-or-a-function-not-undefined"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#typeerror-super-expression-must-either-be-null-or-a-function-not-undefined"}},[e._v("#")]),e._v(" TypeError: Super expression must either be null or a function, not undefined")]),e._v(" "),n("h2",{attrs:{id:"问题："}},[n("a",{staticClass:"header-anchor",attrs:{href:"#问题："}},[e._v("#")]),e._v(" 问题：")]),e._v(" "),n("p",[e._v("TypeError: Super expression must either be null or a function, not undefined")]),e._v(" "),n("h2",{attrs:{id:"分析："}},[n("a",{staticClass:"header-anchor",attrs:{href:"#分析："}},[e._v("#")]),e._v(" 分析：")]),e._v(" "),n("p",[e._v("这个问题遇到过两次了，一次在企业版，还有一次在公安版里边")]),e._v(" "),n("h2",{attrs:{id:"解决："}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解决："}},[e._v("#")]),e._v(" 解决：")]),e._v(" "),n("h3",{attrs:{id:"企业版"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#企业版"}},[e._v("#")]),e._v(" 企业版")]),e._v(" "),n("p",[e._v("企业版的时候，是因为使用webpack的默认压缩出现问题，可能是webpack4默认压缩有bug，然后换成了UglifyJsPlugin来进行压缩，解决")]),e._v(" "),n("div",{staticClass:"language-text extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('minimizer: [\n          new UglifyJsPlugin({\n            test: [/\\.(js|jsx)$/],\n            exclude: [/node_modules/, /src\\/components\\/vendor/],\n            cache: "./.cache",\n            parallel: true,\n            sourceMap: true,\n            uglifyOptions: {\n              warnings: false,\n              compress: {\n                inline: 1,\n                keep_fnames: true\n              },\n              mangle: {\n                keep_fnames: true\n              }\n            }\n          })\n        ],\n')])])]),n("h3",{attrs:{id:"公安版"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#公安版"}},[e._v("#")]),e._v(" 公安版")]),e._v(" "),n("p",[e._v("这次解决比较曲折，没有找到更好的办法，只能一点点的排查，缩小范围，最后发现是引入的一个库anzi-ui里边的一个组件导致的。 组件里边使用了react hooks，来作为组件，")]),e._v(" "),n("div",{staticClass:"language-text extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("function alert() {}\n")])])]),n("p",[e._v("最后没有导出组件，而是导出的函数。")])])}),[],!1,null,null,null);t.default=a.exports}}]);