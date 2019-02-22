import axios from './http.js'

/** 这里添加loading，在http.js里面请求成功以后关闭loading **/
import router from '@/router'

// 首页数据
export const getHomeData = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/position/queryAssetsWithProdcut.json', {params})
}

//全部私募基金产品列表
export const getProductListData = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/product/queryFundProductList.json', {params})
}

//查询我的私募基金资产及持仓列表
export const getAssetsData = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/position/queryFundSummaryAssets.json', {params})
}

//查询基金产品列表的详情
export const getFundProductDetail = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/product/queryFundProductDetail.json', {params})
}

//购买基金的时候，必须先在该基金所属的公司开户
export const submitFundOpenAccount = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/account/fundOpenAccount.json', {params})
}

//私募基金委托(申购、认购、赎回)
export const submitFundEntrust = (params) => {
  router.app.$indicator.open({
    text: '提交中...'
  })
  return axios.get('/privateFund/exchange/fundEntrust.json', {params})
}

// 查询基金委托详情
export const getFundEntrustDetail = (params) => {
  return axios.get('/privateFund/order/queryFundEntrustDetail.json', {params}) 
}

// 私募基金撤单
export const submitFundRevoke = (params) => {
  return axios.get('/privateFund/exchange/fundRevoke.json', {params})
}

//基金公司查询
export const getFundCompany = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/account/queryFundCompany.json', {params})
}

//查询委托订单
export const queryHistoryEntrust = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/order/queryHistoryEntrustWithPage.json', {params})
}

//查询可赎回基金持仓列表
export const getShuHuiList = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/position/queryAbleRedeemFundHoldPositionList.json', {params})
}

//查询持仓详情
export const getFundHoldPositionDetail = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/position/queryFundHoldPositionDetail.json', {params})
}

//设置分红方式
export const setDevidendSetting = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/exchange/fundDevidendSetting.json', {params})
}

//校验用户私募基金权限
export const getVerifyInfo = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/account/checkUserPrivateFundAuthorise.json', {params})
}

//新合同协议接口 风险测评 适当性评估
export const getAppropriatenessInfo = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/agreement/queryCustomerAppropriatenessInfo.json', {params})
}

//查询产品协议
export const getHetong = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/agreement/queryFundProductAgreement.json', {params})
}

//签署产品协议
export const submitHetong = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/agreement/signFundProductAgreement.json', {params})
}

//检查客户购买场外基金产品时风险匹配
export const getFundRiskLevel = (params) => {
  return axios.get('/privateFund/exchange/checkCustomerFundRiskLevel.json', {params})
}

// 入口用户状态
export const checkStatus = (params) => {
  return axios.get('/investment/followInvestment/checkStatus.json', {params})
}

// 认购、申购的时候检查是否已开户
export const checkHasOpenAccount = (params) => {
  router.app.$indicator.open({
    text: '加载中...'
  })
  return axios.get('/privateFund/account/checkHasOpenAccount.json', {params})
}