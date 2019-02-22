<template>
  <div class="order">
    <div class="contract-header">{{$route.query.title+'('+$route.query.fundCode+')'}}</div>
    <div class="main">
      <div>
        <hb-title text="填写交易金额"></hb-title>
        <hb-title text="买入金额(元)" class="no-border"></hb-title>
        <div class="pay-box">
          <div class="pay-inpt">
            <number-input v-model="money" :placeholder="placeholder" :showDecimal="false" :max="10"></number-input>
          </div>
          <div class="pay-r" @click="yzzzFn">银证转账</div>
        </div>
        <hb-cell title="可用金额" :text="useAvailable | currency('元')" style="color: #666666;"></hb-cell>
        <hb-cell title="买入金额大写" :text="money | cnNumber" style="color: #666666;"></hb-cell>
        <!-- <hb-cell title="手续费" :text="serviceMoney | currency('元')" style="color: #666666;"></hb-cell> -->
      </div>
      <div class="note">
        <div class="note-text">注：</div>
        <div class="note-text">1.个人首次起购最低金额{{minAmount | moneyUnits}}；追加起购最低金额{{addMinAmount | moneyUnits}}。</div>
        <div class="note-text">2.机构首次起购最低金额{{organizationMinAmount | moneyUnits}}；追加起购最低金额{{organizationAddMinAmount | moneyUnits}}。</div>
        <!-- <div class="note-text">1.最低起购金额{{minAmount | moneyUnits}}元；</div> -->
        <div class="note-text">3.最小变动单位为{{minUnits | moneyUnits}}元。</div>
        <div class="note-text">4.最终以交易确认数据为准。</div>
      </div>
    </div>
    <hb-submit @submit="submitFn" :isFixed="true" :disabled="available"></hb-submit>
  </div>
</template>

<script>
import HbTitle from '@/components/HbTitle'
import NumberInput from '@/components/keypad/NumberInput'
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import {currency, cnNumber, moneyUnits} from '@/public/filters.js'
import { getHomeData, getFundProductDetail } from '@/public/api.js'
export default {
  components: {
    HbTitle,
    NumberInput,
    HbCell,
    HbSubmit
  },
  data () {
    return {
      money: null,
      placeholder: '',
      minAmount: null, // 个人最低申购、认购
      addMinAmount: null, // 个人最低追加申购、认购
      organizationMinAmount: null, //机构最低申购、认购
      organizationAddMinAmount: null, // 机构最低追加申购、认购
      minUnits: null, // 认购、申购基数
      useAvailable: null
    }
  },
  created () {
    this.getData()
    this.getAmount()
  },
  methods: {
    // 获取可用金额
    getData () {
      getHomeData({userId: '1351295'}).then((res) => {
        this.placeholder = '可用金额'+ currency(res.fundAssets.useAvailable, '元')
        this.useAvailable = res.fundAssets.useAvailable
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取起购金额
    getAmount (){
      getFundProductDetail({fundCode: this.$route.query.fundCode}).then((res) => {
        if (res.fundStatus == 0) { // 申购
          this.minAmount = res.minPurchaseAmount
          this.addMinAmount = res.addMinPurchaseAmount
          this.organizationMinAmount = res.organizationMinPurchaseAmount
          this.organizationAddMinAmount = res.organizationAddPurchaseAmount
          this.minUnits = res.creationUnit
        } else if (res.fundStatus == 1) {  //认购
          this.minAmount = res.minSubscriptionAmount
          this.addMinAmount = res.addMinSubscriptionAmount
          this.organizationMinAmount = res.organizationFirstAmount
          this.organizationAddMinAmount = res.organizationAddAmount
          this.minUnits = res.subscribeBase
        }
      }).catch((res) => {
        
      })
    },
    submitFn () {
      this.$router.push({ 
        path: '/confirmOrder', 
        query: { 
          title: this.$route.query.title, 
          sum: this.money, 
          serviceMoney: this.serviceMoney, 
          entrustType: this.$route.query.entrustType, 
          fundCode: this.$route.query.fundCode, 
          taCode: this.$route.query.taCode
        }
      })
    },
    yzzzFn () {
      console.log(process.env.YZZZ_URL)
      window.location.href = process.env.YZZZ_URL+'?type=privateFund'
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
    },
    // 按钮是否可用
    available () {
      if (this.money) {
        return false
      } else {
        return true
      }
    }
  },
  filters: {
    currency: currency,
    cnNumber: cnNumber,
    moneyUnits: moneyUnits
  }
}
</script>

<style scoped>
.main{
  height: calc(100vh - 3.18rem);
  border-top: .2rem solid #f6f6f6;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
}
.contract-header{
  display: flex;
  align-items: center;
  height: 1.52rem;
  padding: 0 .3rem;
  background: #FFFFFF;
  font-size: .3rem;
  color: #2F2F2F;
  line-height: .46rem;
}
.no-border{
  border-bottom: none !important;
}
.pay-box{
  display: flex;
  padding: 0 .3rem;
}
.pay-inpt{
  flex: 1;
  overflow-x: auto;
  background: #f6f6f6;
}
.pay-r{
  display: flex;
  align-items: center;
  background: #f6f6f6;
  padding: 0 .3rem;
  font-size: .3rem;
  color: #4783F6;
}
.note{
  padding: .3rem;
}
.note-text{
  font-size: .26rem;
  color: #999999;
  line-height: .4rem;
}
</style>