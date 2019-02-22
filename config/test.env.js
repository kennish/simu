'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  API_URL: '"//m.dev.hbec.com/stock"', // 开发环境
  IMG_URL: '"//static.dev.hbec.com/hbec/projects/2018/stock_h5/12/privateFund/1.0.0/static"',
  YZZZ_URL: '"//m.dev.hbec.com/trading/trade/transfer"', // 银证转账
  DL_URL: '"https://m.dev.hbec.com/account/login/index.htm"' // 登录地址
})
