<template>
  <div class="comfirmOrder">
    <div class="comfirmOrder-main">
      <hb-cell title="名称" :text="$route.query.title"></hb-cell>
      <hb-cell title="代码" :text="$route.query.fundCode"></hb-cell>
      <hb-cell title="总金额(含手续费)" :text="money | currency('元')"></hb-cell>
      <hb-cell title="总金额大写" :text="money | cnNumber"></hb-cell>
      <!-- <hb-cell title="手续费" :text="serviceMoney | currency('元')"></hb-cell> -->
    </div>
    <hb-submit @submit="submitFn" text="确认" :isFixed="true" :disabled="false"></hb-submit>
  </div>
</template>

<script>
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import {currency, cnNumber} from '@/public/filters.js'
import { getFundRiskLevel, submitFundEntrust } from '@/public/api.js'
export default {
  components: {
    HbCell,
    HbSubmit
  },
  data () {
    return {
      money: null,
      businessBatchNumber: null // 业务批号
    }
  },
  created () {
    this.money = this.$route.query.sum
  },
  methods: {
    submitFn () {
      getFundRiskLevel({
        userId: '1351295',
        fundCode: this.$route.query.fundCode,
        taCode: this.$route.query.taCode
      }).then((res) => {
        this.businessBatchNumber = res.businessBatchNumber
        if (res) {
          this.submitEntrust()
        } 
      }).catch((err) => {
        console.log(err)
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
      
    },
    submitEntrust () {
      submitFundEntrust({
        userId: '1351295',
        entrustType: this.$route.query.entrustType,
        fundCode: this.$route.query.fundCode,
        entrustAmount: this.$route.query.sum,
        businessBatchNumber:this.businessBatchNumber
      }).then((res) => {
        if (res.entrustCode) {
          this.$msgBox.confirm('申请已受理，是否前往委托查看',{
            title: '提交成功',
            confirmButtonText: '查看',
            cancelButtonText: '暂不',
            showCancelButton: true,
            closeOnClickModal: false
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({ 
                path: '/entrust', 
                query: {
                  entrustCode: res.entrustCode, 
                  fundCode: this.$route.query.fundCode, 
                  fundName: this.$route.query.title,
                  entrustType: 1
                } 
              })
            }
          }).catch(err => { 
            if (err == 'cancel') {
              console.log('暂不')
              this.$router.push('/index')
            }
          })
        } else{
          this.$toast(res.errMessage)
        }
      }).catch((err) => {
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    }
  },
  computed: {
    // 手续费计算
    serviceMoney () {
      if (this.money && this.money != 0) {
        if (this.money < 1000) {
          return 1
        } else {
          return parseInt(this.money/1000)
        }
      } else {
        return '--'
      }
    }
  },
  filters: {
    currency: currency,
    cnNumber: cnNumber
  }
}
</script>

<style>
.comfirmOrder{
  
}
.comfirmOrder-main{
  height: calc(100vh - 1.46rem);
  background: #ffffff;
}
</style>