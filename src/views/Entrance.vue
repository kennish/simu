<template>
  <div class="entrance">
    <hb-message-box 
      v-model="shwoMsg"
      :message="message" 
      :showCancelButton="true" 
      cancelButtonText="暂不"
      confirmButtonText="联系客服"
      :closeOnClickModal="false"
      :closeOnClickConfirm="false"
      @cancel="cancelFn"
      @confirm="confirmFn">
    </hb-message-box>
  </div>
</template>

<script>
import { getVerifyInfo, checkStatus } from '@/public/api.js'
// 校验完交易密码后调用保存js,该方法放入js文件中有可能原生调用不到
function checkTradePassword() {
  window.localStorage.setItem('verificationSuccess', '1');
}
import HbMessageBox from '@/components/HbMessageBox'
export default {
  components: {
    HbMessageBox
  },
  data () {
    return {
      shwoMsg: false,
      message: ''
    }
  },
  created () {

  },
  mounted () {
    window.localStorage.removeItem('verificationSuccess');
    // 验密
    var that = this
    if(HB.utils.isQianQApp()) {
      try {
        // nativeInvoker.callTradePwdKeyBoard();
        try {
          //使用HBMBBridge对象，需要通过引入前端公共JS文件
          if (window.HBMBBridge.checkAppRouterValidity()){
            //查看最新移动端接口API文档，调用替换的API逻辑
            window.HBMBBridge.callApp("callTradePwdKeyBoard", null, function(err, result){
                if(err){

                }else{
                  // 安卓有了回调
                  if (HB.utils.isAndroid()) {
                    clearInterval(timer)
                    that.getData()
                  }
                }
            });
          }else{
            //老移动端接口调用逻辑
            hbmobile.callTradePwdKeyBoard();
          }
           //原生校验交易密码框
          var timer = setInterval(function () {
              var params = localStorage.getItem('verificationSuccess');
              if (params == '1') {
                clearInterval(timer)
                that.getData()
              }
            }, 600);
        } catch (e) {
          console.log('调用移动端出错：' + e);
        }
      } catch (e) {

      }
    }
    // this.getData()
  },
  methods: {
    getData () {
      // 验证前置条件
      var that = this
      getVerifyInfo().then((res) => {
        if (res.errCode == -1) {
          this.verify(-1) // 合格投资者认证
        } else if (res.errCode == -2) {
          this.message = '未检测到交易权限，不能进行交易。您可以马上开通权限，或者关联已有华宝证券账户'
          this.shwoMsg = true
        } else if (res.errCode == -4) {
          this.message = '您暂未开通私募基金合格投资者权限，请通过营业网点或客服电话开通权限'
          this.shwoMsg = true
        } else if (res.errCode == -55) {
          // 需要去登录
          const responseUrl = window.location.href
          location.href = process.env.DL_URL+'?referrer='+encodeURI(responseUrl)
        } else if (res.errCode == 1) {
          const redirectUrl = JSON.parse(window.sessionStorage.getItem('redirect'))
          if (redirectUrl) {
            this.$router.push({
              path: '/'+redirectUrl
            })
          } else {
            // 通过认证
            this.$router.push({
              path: '/index'
            })
          }
          window.sessionStorage.removeItem('redirect')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    cancelFn () {
      this.closeView()
    },
    confirmFn () {
      window.location.href = 'tel:4008209898'
    },
    verify (o) {
      var that = this
      if (o == -1) {
        this.$msgBox.confirm('系统维护中，请稍后再试',{
          confirmButtonText: '我知道了',
          cancelButtonText: '',
          showCancelButton: false
        }).then(action => {
          if (action == 'confirm') {
            that.closeView()
          }
        }).catch(err => { 
          if (err == 'cancel') {
            console.log('点击了暂不')
            that.closeView()
          }
        })
      } else if (o == -2) {
        this.$msgBox.confirm('未检测到交易权限，不能进行交易。您可以马上开通权限，或者关联已有华宝证券账户',{
          confirmButtonText: '联系客服',
          cancelButtonText: '暂不',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            window.location.href = 'tel:4008209898'
          }
        }).catch(err => { 
          if (err == 'cancel') {
            console.log('点击了暂不')
            that.closeView()
          }
        })
      } else if (o == -4) {
        this.$msgBox.confirm('您暂未开通私募基金合格投资者权限，请通过营业网点或客服电话开通权限',{
          confirmButtonText: '联系客服',
          cancelButtonText: '暂不',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            window.location.href = 'tel:4008209898'
          }
        }).catch(err => { 
          if (err == 'cancel') {
            console.log('点击了暂不')
            that.closeView()
          }
        })
      } 
    },
    closeView () {
      try {
        //使用HBMBBridge对象，需要通过引入前端公共JS文件
        if (window.HBMBBridge.checkAppRouterValidity()){
          //查看最新移动端接口API文档，调用替换的API逻辑
          var method ="closeCurrentWebView";
          var params;
          window.HBMBBridge.callApp(method, params, function(err, result){
            if(err){
              //error handle
            }else{
              //success handle
            }
          });
        }else{
          //老移动端接口调用逻辑
          hbmobile.closeCurrentWebView();
        }
      } catch (e) {
        console.log('调用移动端出错：' + e);
      }
    }
  }
}
</script>

<style>
.entrance{
  background: #ffffff;
}
</style>