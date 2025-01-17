# @uni-app/vue-cli-preset-uni-app

> uni-app preset for vue-cli

## 通过 vue-cli 命令行创建自定义微信小程序模板的 uni-app 项目

> 同时解决了 vue-cli-plugin-uni 跟 webpack 5 不兼容的问题

### 环境安装

全局安装 vue-cli

```js
npm install -g @vue/cli
```

> 已验证的环境：
> node: 12.20.1
> npm: 6.14.8
> @vue/cli: 4.5.13

### 创建 uni-app

**使用正式版**（对应 HBuilderX 最新正式版），注意这里的 preset 是 `qiqihaobenben/uni-preset-vue`

```js
vue create -p qiqihaobenben/uni-preset-vue my-project
```

此时，会提示选择项目模板，选择默认第一项 **默认模板-微信小程序** 项目模板，如下所示：

![](https://cdn.jsdelivr.net/gh/qiqihaobenben/picture/2021-7-28/1627442750530-image.png)

#### 如果想了解其他更多详情，可以查看 [快速上手 uni-app 通过 vue-cli 命令行](https://uniapp.dcloud.io/quickstart-cli)

#### 初始化完项目后一定要先看看根目录的 document.md 文档，里面注明了项目的具体信息和需要自定义修改的地方。
