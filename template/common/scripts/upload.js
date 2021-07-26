/*
 微信小程序代码上传到小程序后台
 */

const ci = require('miniprogram-ci')
const path = require('path')
const package = require('../package.json')

const {ENV, MESSAGE_SUFFIX} = process.env

let message_suffix = MESSAGE_SUFFIX ? MESSAGE_SUFFIX : '--本地上传'

let projectPath = path.resolve(__dirname, '../dist/dev/mp-weixin')
let desc = package['upload-description'] || `${package.version} 迭代 ${message_suffix}`
// TODO 此处需要设置项目真实的上传key
const privateKeyPath = path.resolve(__dirname, './private.wxxxxxxxxxxxxx.key')
// TODO 此处需要设置项目真实的appid
const appid = 'wxxxxxxxxxxxxx'
if(ENV === 'production') {
  desc = `【生产环境】：${desc}`
  projectPath = path.resolve(__dirname, '../dist/build/mp-weixin')
}else {
  desc = `【测试环境】：${desc}`
}

;(async () => {
  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
    ignores: ['node_modules/**/*'],
  })

  await ci.upload({
    project,
    version: package.version,
    desc,
    setting: {
      es6: true,
      minifyJS: true,
      minify: true,
      urlCheck: true
    },
    robot: 17,
    onProgressUpdate: console.log,
  })
})()
