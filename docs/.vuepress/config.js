module.exports = {
  title: "云旭泉的博客",
  description: "专注全栈技术分享",
  themeConfig: {
    sidebar: {
      "/node/": [["", "node目录"], "path", ["stream", "stream"]],
      "/interview/": ["fe-dictionary", "fetch", "session"],
      "/web/": [
        ["", "前端"],
        {
          title: "css",
          name: "css",
          collabsable: false,
          children: [
            ["css/", "目录"],
            ["css/1", "css常考面试题"],
          ],
        },
      ],
    },
    // sidebar: "auto",
    nav: [
      { text: "主页", link: "/" },
      { text: "node", link: "/node/" },
      {
        text: "前端",
        items: [
          { text: "html", link: "/web/html/" },
          { text: "css", link: "/web/css/" },
          { text: "js", link: "/web/js/" },
        ],
      },
      { text: "数据库", link: "/database/" },
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
