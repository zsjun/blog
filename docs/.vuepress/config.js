module.exports = {
  title: "云旭泉的博客",
  description: "专注全栈技术分享",
  base: "/blog/",
  themeConfig: {
    sidebar: {
      "/node/": [],
      "/interview/": ["fe-dictionary", "fetch", "session", "leetcode"],
      "/web/": [
        {
          title: "react",
          name: "react",
          collabsable: false,
          children: [
            "react/requestwork",
            "react/react-fiber-node-jie-gou",
            "react/react-fiber-zhong-expirationtime-de-ji-suan",
            "react/react-hooks-ji-ben-chang-shi-yu-wen-ti",
            "react/react-source-debugger",
            "react/requestwork",
            "react/schedulework",
            "react/typeerror-super-expression-must-either-be-null-or-a-function-not-undefined",
            "react/webpack-da-bao-wen-ti",
            "react/yi-ci-gou-xie-de-bug-cha-zhao-ji-lu",
            "react/zhong-wen-ming-ming-de-svg-wen-jian-zhuan-huan-wei-ying-wen-ming-ming-de-svg",
          ],
        },
        // {
        //   title: "css",
        //   name: "css",
        //   collabsable: false,
        //   children: [],
        // },
      ],
      "/other/": ["", "email", "nginx"],
    },
    // sidebar: "auto",
    nav: [
      { text: "主页", link: "/" },
      { text: "node", link: "/node/" },
      {
        text: "前端",
        items: [
          { text: "react", link: "/web/react/" },
          // { text: "js", link: "/web/js/" },
          // { text: "css", link: "/web/css/" },
        ],
      },
      // { text: "数据库", link: "/database/" },
      { text: "后端", link: "/rearend/" },
      { text: "面试问题", link: "/interview/" },
      { text: "其它", link: "/other/" },
    ],
  },
  plugins: [
    ["@vuepress/back-to-top"], // 返回顶部
    ["@vuepress/nprogress"], // 加载进度条
  ],
};
