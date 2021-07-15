(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{390:function(n,r,t){"use strict";t.r(r);var _=t(25),s=Object(_.a)({},(function(){var n=this,r=n.$createElement,t=n._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"npm-run-dll-引发的问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#npm-run-dll-引发的问题"}},[n._v("#")]),n._v(" npm run dll 引发的问题")]),n._v(" "),t("h1",{attrs:{id:"背景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[n._v("#")]),n._v(" 背景")]),n._v(" "),t("p",[n._v("最近在开发的组件库中发现一个问题，去组件库里边修改了之后，顺理成章的npm publish出去，可是publish之后，当自己在开发环境下测试的时候，发现根本没有修改成功。")]),n._v(" "),t("h1",{attrs:{id:"解决思路"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解决思路"}},[n._v("#")]),n._v(" 解决思路")]),n._v(" "),t("h2",{attrs:{id:"_1"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1"}},[n._v("#")]),n._v(" 1")]),n._v(" "),t("p",[n._v("刚开始以为是没有发布成功，于是又去组件库里边重新修改了下，可是发现在开发环境下重装还是不行，还是没有得到修改。"),t("br"),n._v("\n可是npm publish也没有报错，应该是没有什么问题"),t("br"),n._v("\n后来想着到开发环境下的node_modules目录下，发现这里的组件库里边的代码也是最新的，那应该是发布成功了。")]),n._v(" "),t("h2",{attrs:{id:"_2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2"}},[n._v("#")]),n._v(" 2")]),n._v(" "),t("p",[n._v("后来思考为什么在开发环境下没有成功呢，是不是开发环境下没有使用node_modules目录的组件库啊？"),t("br"),n._v("\n于是直接删掉node_modules目录的组件库，直接报错，\n看来应该是使用了node_modules的组件库，可是为什么没有使用node_modules下的最新的代码呢？\n于是想改改node_modules的组件库下的打包后的文件，可是发现就是把里边的内容删掉了，开发环境还是正常的。"),t("br"),n._v("\n既然这样，那开发环境里边用到的组件库代码是哪里来的呢？"),t("br")]),n._v(" "),t("p",[n._v("后来想了下，先使用npm link 看看自己修改的代码，打包之后是不是正常的，可是发现使用npm link后，在开发环境下就是正常的了，那充分说明了，组件库修改的代码没有任何问题，问题就出在在开发环境下，使用的是哪里的组件库代码？")]),n._v(" "),t("h2",{attrs:{id:"_3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3"}},[n._v("#")]),n._v(" 3")]),n._v(" "),t("p",[n._v("找了半天没有找到在哪里？"),t("br"),n._v("\n后来想想先把代码发布到测试线上，利用测试线下载最近发布的npm 组件库代码，看看有没有任何问题？"),t("br")]),n._v(" "),t("p",[n._v("看来最后的问题，还是出现在开发环境下，到底是使用了哪里的组件库代码，导致一直使用的旧的组件库代码，没有使用最新的修改之后的代码？"),t("br")]),n._v(" "),t("p",[n._v("想了下，是不是使用npm link ，导致一直使用的npm link的代码，可是按说不应该啊，因为npm link之后，也是使用的最近修改的组件库代码啊？"),t("br"),n._v("\n话虽如此，还是去npm link的目录下删掉了，可是仍然没有用。")]),n._v(" "),t("p",[n._v("实在找不到哪里了？"),t("br"),n._v("\n突然想到了，以前的时候，用npm run dll 把许多引入的npm包，打成了dll文件，于是去dll的配置文件，发现修改的组件库，被打包成了dll文件，所以在开发环境中一直是使用的dll文件的组件库代码，而不是修改的组件库代码，直接重新打包就可以了"),t("br"),n._v("\n为了防止以后类似事情，直接在npm start之前，首先先打包一次dll文件"),t("br")])])}),[],!1,null,null,null);r.default=s.exports}}]);