<template>
  <div class="open-account">

    <div class="no-data" v-if="isnodata">
      <div class="no-data-icon"><img :src="require('@/assets/img/nodata_icon.png')"/></div>
      <div class="no-data-text">暂无相关内容</div>
    </div>

    <div class="account-list" v-for="(item, index) in accountData" :key="index" @click="openFn(item.companySortName, item.openAccount, item.taCode, item)">
      <div class="account-l">
        <div class="account-title">{{item.companySortName}}</div>
        <div class="account-code">{{item.taCode}}</div>
      </div>
      <div class="account-r">
        <span class="account-gray" v-if="item.openAccount == 1">已开户</span>
        <span class="account-gray purple" v-else>开户</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getFundCompany, submitFundOpenAccount } from '@/public/api.js'
export default {
  data () {
    return {
      accountData: [],
      isnodata: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getFundCompany({userId: '1351295'}).then((res) => {
        if (res) {
          if (res.length == 0) {
            this.isnodata = true
          } else {
            this.accountData = res
          }
        }
      }).catch((err) => {
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    openFn (title, status, code, item) {
      if (status == 0) {
        this.$msgBox.confirm('是否开通'+title+'的基金账户',{
          confirmButtonText: '开通',
          cancelButtonText: '暂不',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            submitFundOpenAccount({
              taCode: code,
              userId: '1351295'
            }).then((res) => {
              if (res) {
                this.$toast('开户成功')
                item.openAccount = 1 // 由于后台需要1s的反应时间，因此此处改开户状态
              } else {
                this.$toast('开户失败')
              }
            }).catch((err)=> {
              console.log(err)
              this.$toast({
                message: '系统忙',
                position: 'bottom',
                duration: 3000
              })
            })
            
          }
        }).catch(err => { 
          if (err == 'cancel') {
            console.log('点击了暂不')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.account-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.28rem;
  background: #ffffff;
  padding: 0 .3rem;
  border-bottom: 1px solid #e4e4e4;
}
.account-l{}
.account-title{
  font-size: .3rem;
  color: #2F2F2F;
  margin-bottom: .06rem;
}
.account-code{
  font-size: .24rem;
  color: #999999;
}
.account-r{
  
}
.account-gray{
  font-size: .3rem;
  color: #999999;
}
</style>