<template>
  <div class="productDetails">
    <div class="notification" v-if="detailsData.fundStatus == 1">火爆热抢中，认购即将结束</div>
    <details-card :title="detailsData.fundName+'('+detailsData.fundCode+')'" :value="detailsData.fundNetValue" :subTitle="detailsData.subTitle" :showTag="true" :tag="detailsData.tag" :grade="detailsData.riskLevel">
      <div class="value bold" slot="right">{{detailsData.fundStatusDescribe}}</div>
    </details-card>
    <div class="productDetails-main" v-if="detailsData.fundStatus != 1">
      <hb-title text="交易规则"></hb-title>
      <steps>
        <step title="申购" msg="T日"></step>
        <step title="冷静期" msg="T+1日"></step>
        <step title="回访期" msg="T+2日"></step>
        <step title="持仓" msg=""></step>
      </steps>
    </div>
    <div class="productDetails-main">
      <hb-title text="交易须知"></hb-title>
      <div class="main-info">
        <!-- 认购 -->
        <hb-cell title="个人起购金额(元)" :text="minAmount | moneyUnits"></hb-cell>
        <hb-cell title="机构起购金额(元)" :text="organizationMinAmount | moneyUnits"></hb-cell>
        <hb-cell title="最小变动单位(元)" :text="minUnits | moneyUnits"></hb-cell>
        <!-- /认购 -->
        <!-- 申购 -->
        <!-- <hb-cell title="起购金额(元)" v-if="detailsData.fundStatus != 1" :text="detailsData.minPurchaseAmount | moneyUnits"></hb-cell> -->
        <!-- <hb-cell title="最小变动单位(元)" v-if="detailsData.fundStatus != 1" :text="detailsData.addMinPurchaseAmount | moneyUnits"></hb-cell> -->
        <!-- /申购 -->
        <hb-cell title="收费方式" :text="detailsData.chargeTypeDescribe && detailsData.chargeTypeDescribe!='--'? detailsData.chargeTypeDescribe : '--'"></hb-cell>
        <hb-cell v-if="detailsData.fundStatus == 1" title="认购日期" :text="detailsData.subscriptionBeginDate+'-'+detailsData.subscriptionEndDate"></hb-cell>
        <!-- <hb-cell v-else title="开放日期" :text="detailsData.issueDate"></hb-cell> -->
        <hb-cell title="投资期限" :text="detailsData.investmentLimitDesc && detailsData.investmentLimitDesc!='--'? detailsData.investmentLimitDesc : '--'"></hb-cell>
        <hb-cell title="分红方式" :text="detailsData.dividendWay"></hb-cell>
        <hb-cell title="最低赎回份额(份)" :text="detailsData.minRedeemAmount | currency('')"></hb-cell>
        <hb-cell title="管理人代码" :text="detailsData.managerCode"></hb-cell>
      </div>
      <hb-submit :text="submitText" 
        @submit="submitFn" :isFixed="true" :disabled="detailsData.fundStatus != 0 && detailsData.fundStatus != 1 && detailsData.fundStatus != 6">
      </hb-submit>
    </div>
  </div>
</template>

<script>
import DetailsCard from '@/components/DetailsCard'
import HbTitle from '@/components/HbTitle'
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import Steps from '@/components/steps/Steps'
import Step from '@/components/steps/Step'
import { currency, moneyUnits } from '@/public/filters.js'
import { getFundProductDetail, submitFundOpenAccount, checkHasOpenAccount } from '@/public/api.js'
export default {
  components: {
    DetailsCard,
    HbTitle,
    HbCell,
    HbSubmit,
    Steps,
    Step
  },
  data () {
    return {
      detailsData: {
        fundName: '--',
        fundAbbrName: '--',
        fundNetValue: '--',
        tag: [],
        subTitle: '发行状态',
        fundStatus: null, // 发行状态 
        fundStatusDescribe: '--', // 发行状态 展示用
        riskLevel: null, // 风险等级 5高风险 4中高风险...
        stepsData: 2, // 进度条
        minSubscriptionAmount: '--',  // 认购起购金额
        addMinSubscriptionAmount: '--', // 认购最小变动值
        minPurchaseAmount: '--', // 申购起购金额
        addMinPurchaseAmount: '--', // 申购最小变动值
        chargeTypeDescribe: '--', //收费方式
        subscriptionBeginDate: '', // 认购开始日期
        subscriptionEndDate: '-', // 认购结束日期
        investmentLimitDesc: '--', // 投资期限
        dividendWay: '--', // 分红方式
        minRedeemAmount: '--', // 最低赎回金额
        managerCode: '--', //管理人代码
        taCode: '', // 开通账户的时候用做传参
        fundCode: '',
        issueDate: '--' // 申购开放日期
      },
      minAmount: null, // 个人最低申购、认购
      organizationMinAmount: null, //机构最低申购、认购
      minUnits: null // 认购、申购基数
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getFundProductDetail({fundCode: this.$route.query.id}).then((res) => {
        this.detailsData.fundName = res.fundName
        this.detailsData.fundAbbrName = res.fundAbbrName
        this.detailsData.fundNetValue = res.fundNetValue
        // this.detailsData.tag.push('个人'+moneyUnits(res.minSubscriptionAmount)+'起认购')
        this.detailsData.fundStatus = res.fundStatus
        this.detailsData.fundStatusDescribe = res.fundStatusDescribe
        this.detailsData.riskLevel = res.riskLevel
        this.detailsData.minSubscriptionAmount = res.minSubscriptionAmount
        this.detailsData.addMinSubscriptionAmount = res.addMinSubscriptionAmount
        this.detailsData.chargeTypeDescribe = res.chargeTypeDescribe
        this.detailsData.subscriptionBeginDate = res.subscriptionBeginDate.replace(/\//g, '.')
        this.detailsData.subscriptionEndDate = res.subscriptionEndDate.replace(/\//g, '.')
        this.detailsData.investmentLimitDesc = res.investmentLimitDesc
        this.detailsData.dividendWay = res.dividendWay
        this.detailsData.minRedeemAmount = res.minRedeemAmount
        this.detailsData.managerCode = res.managerCode
        this.detailsData.taCode = res.taCode
        this.detailsData.fundCode = res.fundCode
        this.detailsData.issueDate = res.issueDate
        this.detailsData.minPurchaseAmount = res.minPurchaseAmount
        this.detailsData.addMinPurchaseAmount = res.addMinPurchaseAmount
        
        if (res.fundStatus == 0) { // 申购
          this.minAmount = res.minPurchaseAmount
          this.organizationMinAmount = res.organizationMinPurchaseAmount
          this.minUnits = res.creationUnit
        } else if (res.fundStatus == 1) {  //认购
          this.minAmount = res.minSubscriptionAmount
          this.organizationMinAmount = res.organizationFirstAmount
          this.minUnits = res.subscribeBase
        }
      }).catch((err) => {
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    submitFn () {
      checkHasOpenAccount({userId: '1351295'}).then((res) => {
        if (res) {
          this.next()
        } else {
          // 未开户情况则提示并开户
          const confirmMsg = '是否开通' + this.detailsData.fundAbbrName + '的基金账户' + '(' + this.detailsData.fundCode + ')'
          this.$msgBox.confirm(confirmMsg, {
            confirmButtonText: '开通',
            cancelButtonText: '暂不',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              submitFundOpenAccount({userId: '1351295', taCode: this.detailsData.taCode}).then((res) => {
                if (res == true) {
                  this.$toast('开户成功')
                  this.next()
                } else {
                  this.$toast('开户失败，稍后再试')
                }
              }).catch((err) => {
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
              console.log('暂不')
            }
          })

        }
      }).catch((err) => {
        console.log(err)
      })
    },
    next () {
      let entrustType = null
      if (this.detailsData.fundStatus == 0 || this.detailsData.fundStatus == 6) { // 申购
        entrustType = '022'
      } else if (this.detailsData.fundStatus == 1) { // 认购
        entrustType = '020'
      }
      this.$router.push({ 
        path: '/contract', 
        query: { 
          title: this.detailsData.fundName, 
          entrustType: entrustType, 
          fundCode: this.detailsData.fundCode, 
          taCode: this.detailsData.taCode
        } 
      })
    }
  },
  filters: {
    currency: currency,
    moneyUnits: moneyUnits
  },
  computed: {
    submitText () {
      if (this.detailsData.fundStatus == 0 || this.detailsData.fundStatus == 6) { //0正常开放 6暂停赎回开放申购
        return '立即申购'
      } else if (this.detailsData.fundStatus == 1) {
        return '立即认购'
      } else {
        return '暂停购买'
      }
    }
  }
}
</script>

<style scoped>
.notification{
  background: #FEF6E9;
  height: .6rem;
  line-height: .6rem;
  text-align: center;
  font-size: .28rem;
  color: #F5A623;
}
.productDetails{
  padding-bottom: 1.46rem;
  /* box-sizing: border-box; */
}
.productDetails-main{
  margin-top: .2rem;
}
</style>