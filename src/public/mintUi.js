import {Button, MessageBox, Toast, DatetimePicker, Indicator} from 'mint-ui'

export default {
  install: function (Vue) {
    Vue.component(Button.name, Button)
    Vue.component(DatetimePicker.name, DatetimePicker)
    Vue.prototype.$msgBox = MessageBox
    Vue.prototype.$toast = Toast
    Vue.prototype.$indicator = Indicator
  }
}