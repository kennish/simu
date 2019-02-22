// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/css/reset.css'

// mint-ui
import 'mint-ui/lib/style.css'
import mintUI from './public/mintUi.js'
Vue.use(mintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const winWidth = document.body.clientWidth
document.getElementsByTagName('html')[0].style.fontSize = winWidth / 750 * 100 + 'px'
