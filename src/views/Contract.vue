<template>
  <div class="contract">
    <!-- <div class="contract-header">{{$route.query.title+'('+$route.query.fundCode+')'}}</div> -->
    <div class="contract-main">
      <div class="contract-title">尊敬的用户，您好！</div>
      <div class="contract-p">
        您在风险测评中评估的风险承受能力等级是{{xieyi.riskToleranceLevel?xieyi.riskToleranceLevel:'--'}}。
        拟投资期限是{{xieyi.investmentHorizon?xieyi.investmentHorizon:'--'}}。
        投资品种是{{xieyi.investmentVariety?xieyi.investmentVariety:'--'}}。
        预期收益是{{xieyi.forecastEarning?xieyi.forecastEarning:'--'}}。
        本产品的风险等级是{{xieyi.fundRiskGrade?xieyi.fundRiskGrade:'--'}}。
        投资期限是{{xieyi.fundInvestmentHorizon?xieyi.fundInvestmentHorizon:'--'}}。
        投资品种是{{xieyi.fundInvestmentVariety?xieyi.fundInvestmentVariety:'--'}}。
        预期收益是{{xieyi.fundForecastEarning?xieyi.fundForecastEarning:'--'}}。
      </div>

      <div class="contract-p" v-if="xieyi.resultCode == '6'">您的风险承受能力等级、拟投资期限、投资品种、预期收益等投资目标与该产品的风险等级、投资期限、投资品种、预期收益相匹配。</div>

      <div class="contract-p" v-if="xieyi.resultCode == '1'">
        该产品风险等级高于您的风险承受能力等级。投资该产品，可能导致高出您自身承受能力的损失。
        为了保护您的权益，请您谨慎购买，我司就上述情况向您做出提示，请您在了解您拟购买的产品或者服务情况，听取我司适当性意见的基础上，根据自身能力审慎决策，独立承担投资风险。
        我司适当性匹配意见不表明我司对产品或者服务的风险和收益做出实质性判断或者保证，如您确认购买，代表您投资该项产品或接受该项服务的决定，是您独立、自主、真实的意思表示，与我司及我司相关从业人员无关。
      </div>
      <div class="contract-p" v-if="xieyi.resultCode == '1'">
        请查看下附<a href="javascript:;" @click="showModelFn" style="color: #4783F6;">《产品风险揭示书》</a>。为了保护您的权益，请您选择其他产品购买，如有疑问，请咨询4008209898
        <div class="model-box" v-show="showModel" @click="closeModelFn">
          <div class="model" @click.stop.prevent>
            <div class="model-header">
              {{hetong.name}}
              <div class="close-btn" @click="closeModelFn"><img :src="require('@/assets/img/pf_pic10.png')"/></div>
            </div>
            <div class="model-main">
              <div v-html="hetong.text"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="contract-p" v-if="xieyi.resultCode.indexOf('2') != -1">该产品风险等级高于您的风险承受能力等级。投资该项产品，可能导致高出您自身承受能力的损失。</div>

      <div class="contract-p" v-if="xieyi.resultCode.indexOf('3') != -1">产品所属的投资品种与您测评中确认的投资品种不适当，可能无法满足您预期需求。</div>

      <div class="contract-p" v-if="xieyi.resultCode.indexOf('4') != -1">本产品投资期限与您测评中确认的拟投资期限不适当。投资该产品，可能无法满足您预期的流动性需求或导致其他额外风险。</div>
      
      <div class="contract-p" v-if="xieyi.resultCode.indexOf('5') != -1">本产品的期望收益与您测评中确认的期望收益不适当，可能无法满足您预期需求。</div>

      <div class="contract-p" v-if="xieyi.resultCode != '1'">
        为了保护您的权益，请您谨慎购买，我司就上述情况向您做出提示，请您在了解您拟购买的产品或者服务情况，听取我司适当性意见的基础上，根据自身能力审慎决策，独立承担投资风险。
        我司适当性匹配意见不表明我司对产品或者服务的风险和收益做出实质性判断或者保证，如您确认购买，代表您投资该项产品或接受该项服务的决定，是您独立、自主、真实的意思表示，与我司及我司相关从业人员无关。
        若您经审慎考虑后，仍坚持投资该产品，请签署下附《产品风险揭示书》。
      </div>
      <div class="check-box" v-if="xieyi.resultCode != '1'">
        <checklist v-for="(item, index) in hetong" :key="index" v-model="item.status" @checkListClick="checkListClick" :checkName="item.agreementName">
          <div v-if="item.agreementContent.indexOf('ppf') == -1" v-html="item.agreementContent" style="padding: .3rem;"></div>
          <mypdf v-else :pdfurl="apiurl+'/privateFund/agreement/queryPdfAgreementFile.json?agreementContentUrl='+item.agreementContent"></mypdf>
        </checklist>
      </div>

    </div>
    <hb-submit text="下一步" @submit="submitFn" :isFixed="true" :disabled="btnAvailable"></hb-submit>
  </div>
</template>

<script>
import Checklist from '@/components/contract/Checklist'
import HbSubmit from '@/components/HbSubmit'
import Mypdf from '@/components/Mypdf'
import { getHetong, getAppropriatenessInfo, submitHetong } from '@/public/api.js'
import Vue from 'vue';
export default {
  components: {
    Checklist,
    HbSubmit,
    Mypdf
  },
  data () {
    return {
      apiurl: '',
      showModel: false,
      hetong: [],
      xieyi: {
        forecastEarning: '',
        fundInvestmentHorizon: '',
        fundRiskGrade: '',
        investmentHorizon: '',
        investmentVariety: '',
        resultCode: '',
        riskToleranceLevel: '',
        fundInvestmentVariety: '',
        fundForecastEarning: ''
      },
      btnAvailable: true,
      htId: '',
      htMd5: '',
      signed: true
    }
  },
  created () {
    this.getData()
    this.apiurl = process.env.API_URL
  },
  methods: {
    getData () {
      getAppropriatenessInfo({
        userId: '1351295',
        fundCode: this.$route.query.fundCode,
        taCode: this.$route.query.taCode
      }).then((res) => {
        this.xieyi.forecastEarning = res.forecastEarning
        this.xieyi.fundInvestmentHorizon = res.fundInvestmentHorizon
        this.xieyi.fundRiskGrade = res.fundRiskGrade
        this.xieyi.investmentHorizon = res.investmentHorizon
        this.xieyi.investmentVariety = res.investmentVariety
        this.xieyi.resultCode = res.resultCode
        this.xieyi.riskToleranceLevel = res.riskToleranceLevel
        this.xieyi.fundInvestmentVariety = res.fundInvestmentVariety
        this.xieyi.fundForecastEarning = res.fundForecastEarning
      })
      getHetong({
        userId: '1351295',
        fundCode: this.$route.query.fundCode
      }).then((res) => {
        this.hetong = res
        this.checkListClick(true)
        // this.hetong.xyid = res.agreementId
        // this.hetong.md5 = res.md5
        // this.hetong.text = res.agreementContent
        // // this.hetong.name = res.agreementName
        // if (res.status) {
        //   this.hetong.status = 1
        //   this.hetong.signed = true
        // } else {
        //   this.hetong.status = 0
        //   this.hetong.signed = false
        // }
        
      }).catch((err) => {
        console.log(err)
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    checkListClick (first) {
      if(first) {
        let isOK = false
        let agreementId = []
        let md5 = []
        this.hetong.forEach((item) => {
          if (item.status == false) {
            isOK = true
          }
          agreementId.push(item.agreementId)
          md5.push(item.md5)
        })
        this.btnAvailable = isOK
        this.signed = isOK
        this.htId = agreementId.join(',')
        this.htMd5 = md5.join(',')
        
      } else {
        let isOK = false
        let agreementId = []
        let md5 = []
        this.hetong.forEach((item) => {
          if (item.status == false) {
            isOK = true
          }
          agreementId.push(item.agreementId)
          md5.push(item.md5)
        })
        this.btnAvailable = isOK
        this.htId = agreementId.join(',')
        this.htMd5 = md5.join(',')
      }
      
    },
    submitFn () {
      // 如果已经签过合同直接下一步，否则签合同再下一步
      if (!this.signed) {
        this.$router.push({ 
          path: '/order', 
          query: { 
            title: this.$route.query.title, 
            entrustType: this.$route.query.entrustType, 
            fundCode: this.$route.query.fundCode, 
            taCode: this.$route.query.taCode
          } 
        })
      } else {
        submitHetong({
          userId: '1351295',
          fundCode: this.$route.query.fundCode,
          agreementId: this.htId,
          md5: this.htMd5
        }).then((res) => {
          if (res.code < 0) {
            this.$toast(res.note)
          } else {
            this.$toast(res.note)
            this.$router.push({ 
              path: '/order', 
              query: { 
                title: this.$route.query.title, 
                entrustType: this.$route.query.entrustType, 
                fundCode: this.$route.query.fundCode, 
                taCode: this.$route.query.taCode
              } 
            })
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
    },
    // 当不适当的时候弹出窗
    showModelFn () {
      this.showModel = true
    },
    // 关闭弹出窗
    closeModelFn () {
      this.showModel = false
    },
  }
}
</script>

<style scoped>
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
.contract-main{
  background: #FFFFFF;
  /* margin-top: .2rem; */
  padding: .36rem .3rem 0;
  margin-bottom: 1.46rem;
  min-height: calc(100vh - 1.46rem);
  box-sizing: border-box;
}
.contract-title{
  font-size: .3rem;
  color: #2F2F2F;
  margin-bottom: .3rem;
}
.contract-p{
  font-size: .3rem;
  color: #2F2F2F;
  margin-bottom: .3rem;
}

.check-box{
  /* padding-top: 1rem; */
  padding-bottom: .46rem;
}

/** 查看适当性书样式 **/
.model-box{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .7);
  /* padding: 1rem .3rem; */
  z-index: 100;
}
.model{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
.model-header{
  display: flex;
  position: relative;
  height: 1.12rem;
  align-items: center;
  justify-content: center;
  font-size: .36rem;
  color: #2F2F2F;
  border-bottom: 1px solid #e4e4e4;
}
.close-btn{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1.12rem;
  text-align: center;
  line-height: 1.12rem;
}
.close-btn img{
  display: inline-block;
  width: .32rem;
  height: .32rem;
}
.model-main{
  flex: 1;
  padding: .3rem;
  overflow-y: auto;
  -webkit-font-smoothing: antialiased;
 -webkit-overflow-scrolling: touch;
 -moz-overflow-scrolling: touch;
 -o-overflow-scrolling: touch;
 overflow-scrolling: touch;
}
.model-footer{
  height: .9rem;
  display: flex;
  border-top: 1px solid #e4e4e4;
}
.confirm-btn{
  background: none;
  flex: 1;
  font-size: .36rem;
  color: #CE3533;
}
</style>