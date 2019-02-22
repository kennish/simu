/**
 * Created by superman on 17/12/14.
 * http配置
 */

import axios from 'axios'
import qs from 'qs'
import router from '@/router'

// axios 配置
// axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.API_URL
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(
    config => {
      /*if (router.app.$local.fetch('innjia').token) {
        config.headers.token = router.app.$local.fetch('innjia').token
      }*/
      
      //如果是post则用qs序列化数据
      if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
      router.app.$indicator.close() // 关闭loading
      if (response.data.errCode == -5) {
        const redirectUrl = JSON.stringify(router.currentRoute.fullPath.slice(1))
        window.sessionStorage.setItem('redirect', redirectUrl)
        router.push({
          path: '/'
        })
        return ''
      } else {
        return response.data
      }
    },
    error => {
      router.app.$indicator.close() // 关闭loading
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回401 清除localstore 里 token信息并跳转到登录页面 router.app拿到根实例
            // router.app.$local.save('innjia', null)
            /*router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath.slice(1)}
            })*/
        }
      }
      return Promise.reject(error)
    })

// export default {
//   install: function (vm) {
//     vm.prototype.axios = axios
//   }
// }
export default axios