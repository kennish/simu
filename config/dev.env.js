'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"//m.dev.hbec.com/stock"',
  // API_URL: '"//10.0.31.155:8888"',
  YZZZ_URL: '"//m.dev.hbec.com/trading/trade/transfer"'
})
