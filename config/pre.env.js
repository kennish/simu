'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"pre"',
  API_URL: '"//m-wwwtest.touker.com/stock"', // 仿真环境
  IMG_URL: '"//static.touker.com/hbec/projects/2018/simu/stock_h5/12/privateFund/1.0.0/static"',
  YZZZ_URL: '"//m-wwwtest.touker.com/trading/trade/transfer"', // 银证转账
  DL_URL: '"//m-wwwtest.touker.com/account/login/index.htm"' // 登录地址
})
