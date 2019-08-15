ps(react: "version": "16.9.0")
# 问题
最近重新clone了react的源码，想使用react自带的jest测试用例来进行调试react源码
# 解决
1， 使用react 推荐的方法
![image.png](https://upload-images.jianshu.io/upload_images/4432476-1ab70c79ec049daf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
但是使用之后，感觉进去之后，不是很方便，而且里边所有的源码都是babel转换之后的。
2，使用vscode
在https://github.com/microsoft/vscode-recipes中找到
![image.png](https://upload-images.jianshu.io/upload_images/4432476-b9eee6ff9ccb4fdf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
直接按照提示复制如下代码到vscode的lanch.json里边
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--config",
        "jest.config.js"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    }
  ]
}
```
但是会提示error，不是node环境，于是需要加上如下配置
```
"env": {
        "NODE_ENV": "development"
      },
```
然后修改Jest current File的args，直接从react 自己的package.json里边的debug-test里边复制过来
```
"args": [
        "${fileBasenameNoExtension}",
        "--config",
        "./scripts/jest/config.source.js",
        "--runInBand"
      ],
```
所以最后配置如下：
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "--config",
        "./scripts/jest/config.source.js",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      },
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--config",
        "./scripts/jest/config.source.js",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "env": {
        "NODE_ENV": "development"
      },
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    }
  ]
}
```
然后随便找个jest 测试用例，在里边打断点就可以了。
但是发现有的代码vscode是进不去的，也就是说如果单步调试的话，有的代码会直接跳过，搜了下，找到了一个解决办法，
https://segmentfault.com/q/1010000019212441?sort=created
然后就可以直接调试了
