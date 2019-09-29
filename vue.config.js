const path = require('path')

const port = 5555
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 判断是否为生产环境
const ISPRO = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '/',
  devServer: {
    port: port,
    open: true,
    https: false,
    hotOnly: true // 代码热更新
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // 根据不同的环境配置不同的路由
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
  }
}
