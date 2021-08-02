# 自定义微信小程序开发文档

## 文件及相关依赖介绍

### 文件介绍

```
├── scripts                    # 与构建上传相关的脚本和配置文件，主要看一下两个文件
    ├── upload.js              # 上传代码到微信小程序体验版的脚本
    ├── send_msg.sh            # 微信小程序体验版更新成功后的企微通知脚本
├── src                        # 我们的项目代码所在
    ├── common                 # 项目的公共代码
        ├── http               # 数据请求相关
          ├── index.js         # 数据请求主代码，里面配置了 get、post 等请求和一些异常处理
          ├── api.js           # 请求地址汇总模块
          ├── login.js         # 登录和校验登录相关，登录不成功的页面重载提醒等
        ├── log                # 打点相关
        ├── config.js          # 根据NODE_ENV的配置文件，例如基础路由域名等
        ├── util.js            # 工具方法，里面包storage,compareVersion,autoUpdate 等
    ├── components             # 项目中自己实现的组件
    ├── wxcomponents           # 下载的wx组件里面预装有 vant 组件库
    ├── static                 # 静态文件存放的文件夹
    ├── App.vue                # 小程序根组件
    ├── main.js                # 小程序打包编译入口文件
    ├── manifest.json          # uni-app 的配置文件，其中有关的就是微信小程序配置
    ├── pages.json             # uni-app 的页面配置文件
    ├── uni.scss               # uni-app 全局样式文件，不用在组件中引入，可以直接使用其中的样式和变量
├── .gitlab-ci.yml             # gitlab ci/cd 的配置文件
```

### 项目已经安装的相关依赖

1. vue
2. vuex
3. [dayjs](https://dayjs.gitee.io/zh-CN/)： 可用于时间处理

## 前期配置

> 注意项目中带有 TODO 的注释，很可能是需要你修改的地方

### 配置文件 common/config.js

需要将配置文档改成自己的项目真实配置，`NODE_ENV` 有 `development` 和 `production` 两种场景，根据自己的需要进行配置

### src/manifest.json 配置微信小程序

首先改一下 name 字段，即小程序开发者工具中展示的项目名称
搜索 _微信小程序特有相关_ 填入对应微信小程序配置，例如 appid，setting 等

```json
"setting" : {
    "urlCheck" : true,
    "es6" : true,
    "minified" : true,
    "postcss" : true
}
```

### 全局 HTTP 封装

1. 请求路径全部整合到了 `common/http/api.js` 中，路径会根据 `common/config.js` 具体返回的 baseUrl 进行拼接。
2. `common/http/index.js` 中封装了 get 和 post 请求，并对一些特殊情况进行了特殊处理。
3. `common/http/login.js` 文件主要是登录相关，因为作者的小程序都是通过 unionid 来进行用户校验的，所以在接口请求前会首先尝试获取用户的 unionid，获取失败，可以进行重试，重试的逻辑放到了 reloadCurrentPage 函数中。

### gitlab CI/CD 相关

> 需要配置了 runer gitlab，代码仓库有 master 和 release 两个分支

1. 如果你的代码托管平台是 gitlab，并配置了 runner，这里有最简单基本的 CI/CD 流程可用，根据 `master` 和 `release` 分支不同，执行不同的流水线，详情可见 `.gitlab-ci.yml`，需要根据自己的项目实际情况进行调整，可参考文档后面的 **小程序体验版更新流程** 介绍。
2. 基于 uni-app 的打包编译后的代码会根据环境不同存放在 `dist` 文件夹的不同目录下，借助 `miniprogram-ci` 包可以使用命令行实现小程序的自动上传，需要根据你的真实项目将 `scripts/upload.js` 进行完善。
3. 小程序上传体验版后，会通过企微机器人来进行通知，需要你在 `scripts/send_msg.sh` 中完善 webhook_url 相关。

### 开发

```
npm run serve
```

**项目运行起来后，手动打开小程序开发者工具，添加项目，目录地址在当前文件夹下的 dist/dev/mp-weixin**

### 打包

```
npm run build
```

项目打包完毕后，打包后的地址在当前文件夹下的 dist/build/mp-weixin

## 小程序体验版更新流程

### 体验版更新流程

> 依赖 miniprogram-ci 的能力

小程序更新体验版代码的大体流程是：提交代码到对应分支并推到远程， gitlab ci 自动进行打包构建然后更新小程序体验版代码，基本无需本地任何操作。

测试流程：将自己的开发分支合并到 master，并把 master 推送到远程，即可进行测试环境的自动打包构建，然后自动更新体验版。

提审流程：小程序提审前，将 master 代码合并到 release，并推送到远程，即可进行生产环境的自动打包构建，然后自动更新体验版，之后在小程序后台进行提审。

### 小程序代码上传的相关配置

> 详情请查看 `scripts/upload.js` 文件

1. 版本：上传的代码版本默认获取的是 `package.json` 中的 `version` 字段，所以每次版本迭代，请首先更新 `package.json` 中的 `version`
2. 备注：首先会尝试获取 `package.json` 中的 `upload-description` 字段，如果没有就使用 `${package.version} 迭代 ${message_suffix}` 进行相关组合，根据配置更加前缀和后缀
3. 开发者：为了区分环境，测试环境使用编号 1 的 ci 机器人，生产环境使用编号 17 的 ci 机器人
