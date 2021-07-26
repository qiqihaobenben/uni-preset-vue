# 自定义微信小程序开发文档

## 开始

```
npm install
```

### 开发

```
npm run serve
```

**项目运行起来后，打开小程序开发者工具，添加项目，目录地址在当前文件夹下的 dist/dev/mp-weixin**

### 打包

```
npm run build
```

项目打包完毕后，打包后的地址在当前文件夹下的 dist/build/mp-weixin

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
        ├── util.js            # 工具方法，里面包formatTimeformatLocation,dateUtils,storage,compareVersion,autoUpdate 等
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

## 小程序体验版更新流程

### 体验版更新流程

> 依赖 miniprogram-ci 的能力

小程序更新体验版代码的大体流程是：提交代码到对应分支并推到远程， gitlab ci 自动进行打包构建然后更新小程序体验版代码，基本无需本地任何操作。

测试流程：将自己的开发分支合并到 master，并把 master 推送到远程，即可进行测试环境的自动打包构建，然后自动更新体验版。

提审流程：小程序提审前，将 master 代码合并到 release，并推送到远程，即可进行生产环境的自动打包构建，然后自动更新体验版，之后在小程序后台进行提审。

**联系陈方旭（fangxu.chen），加入一起打卡小程序通知群，即可收到每次更新成功的通知**

### 小程序代码上传的相关配置

> 详情请查看 `scripts/upload.js` 文件

1. 版本：上传的代码版本默认获取的是 `package.json` 中的 `version` 字段，所以每次版本迭代，请首先更新 `package.json` 中的 `version`
2. 备注：首先会尝试获取 `package.json` 中的 `upload-description` 字段，如果没有就使用 `${package.version} 迭代 ${message_suffix}` 进行相关组合，根据配置更加前缀和后缀

## 小程序配置

#### 1、基础库配置最低为 2.4.0

#### 还存在的问题

1. 课程完成的打点待完善

#### 第一次上线待办

1. 业务域名新增
2. 请求域名新增
