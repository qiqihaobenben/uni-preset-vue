/*
 全局配置文件
 */
const env = process.env.NODE_ENV
// TODO 需要将配置文档改成真实配置
const config = {
  'development': {
    baseUrl: 'https://test.xxxx.com',
    appid: 'wxxxxxxxx'
  },
  'production': {
    baseUrl: 'https://xxxx.com',
    appid: 'wxxxxxxxx'
  }
}

export default config[env]
