<template>
  <div class="takePositionDetails">
    <div class="takePositionDetails-box">
      <details-card :title="cardData.fundAbbrName+'('+cardData.fundCode+')'" :value="cardData.fundNetValue" :subTitle="cardData.subTitle">
        <!-- <router-link :to="{path: '/ProductDetails', query: {id: cardData.fundCode}}" class="details-card-link" tag="div" slot="link">详情</router-link> -->
        <router-link :to="{path: '/ProductDetails', query: {id: cardData.fundCode}}" tag="div" class="details-card-link" slot="link">
          <span class="details-card-link-text">详情</span>
          <span class="details-card-link-icon"><img :src="require('@/assets/img/pf_pic01.png')"/></span>
        </router-link>
        <div :class="`value bold ${subValueClass}`" slot="right">{{cardData.accumulativeProfit | currency('', true)}}</div>
      </details-card>
      <div class="main">
        <hb-title text="投资信息"></hb-title>
        <hb-cell title="最新净值" :text="cardData.fundNetValue | currency('', false, '4')"></hb-cell>
        <hb-cell title="当前状态" :text="cardData.fundStatusDescribe"></hb-cell>
        <hb-cell title="持仓市值" :text="cardData.marketValue | currency('元')"></hb-cell>
        <hb-cell title="分红方式" :text="cardData.dividendWay">
          <span class="take-abbr" v-if="cardData.dividendFlag == 1 || cardData.dividendEntrust"></span>
          <span v-if="cardData.dividendFlag == 1 && !cardData.dividendEntrust" @click="edit" class="blue">修改</span>
          <span class="blue" v-if="cardData.dividendEntrust" @click="fundRevoke">撤销修改</span>
        </hb-cell>
        <hb-cell title="持仓份额" :text="cardData.amount | currency('份')"></hb-cell>
        <hb-cell title="可用持仓" :text="cardData.sellAvailable | currency('份')"></hb-cell>
      </div>
    </div>
    <hb-submit :text="submitText" @submit="submitFn" :isFixed="true" :disabled="cardData.fundStatus == 5 || !btnStatus">
      <div v-if="btnStatus" 
        :class="`shuhui ${hanledShuhuiClass}`" @click="ransomFn">{{shuhuiStatus? '赎回' : '暂停赎回'}}
      </div>
    </hb-submit>
  </div>
</template>

<script>
import DetailsCard from '@/components/DetailsCard'
import HbTitle from '@/components/HbTitle'
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import {currency} from '@/public/filters.js'
import { getFundHoldPositionDetail, submitFundRevoke } from '@/public/api.js'
export default {
  components: {
    DetailsCard,
    HbTitle,
    HbCell,
    HbSubmit
  },
  data () {
    return {
      cardData: {
        fundAbbrName: '--',
        fundNetValue: '--',
        subTitle: '累计盈亏(元)',
        accumulativeProfit: '--',
        marketValue: '--',  // 持仓市值
        dividendType: null, // 分红方式
        dividendWay: '--', // 分红方式 展示用
        amount: '--', // 持仓份额
        sellAvailable: '--',  // 可用持仓
        fundStatus: null, // 状态
        fundStatusDescribe: '--', // 状态展示用
        fundCode: '',
        dividendFlag: 0, //是否允许修改分红方式 0=否 1=是
        dividendEntrust: null, // 是否显示撤销修改
        taCode: '',
        grzd: null, // 个人最低赎回金额
        jgzd: null // 机构最低赎回金额
      },
      shuhuiStatus: true
    }
  },
  computed: {
    subValueClass () {
      if (this.cardData.accumulativeProfit > 0) {
        return 'red'
      } else if (this.cardData.accumulativeProfit < 0) {  
        return 'green'
      } else {
        return ''
      }
    },
    // 计算赎回按钮是否可用 6不可用
    hanledShuhuiClass () {
      if (this.cardData.fundStatus == 6) {
        this.shuhuiStatus = false
        return 'disabled'
      } else {
        this.shuhuiStatus = true
        return ''
      }
    },
    // 计算按钮什么状态下可用
    btnStatus () {
      if (this.cardData.fundStatus == 0 || this.cardData.fundStatus == 1 || this.cardData.fundStatus == 5 || this.cardData.fundStatus == 6) {
        return true
      } else {
        return false
      }
    },
    // 计算分红方式什么状态下可修改
    fenhongStatus () {
      if (this.cardData.fundStatus == -1 || this.cardData.fundStatus == 3 || this.cardData.fundStatus == 9 || this.cardData.fundStatus == 10) {
        return false
      } else {
        return true
      }
    },
    // 计算购买按钮文案
    submitText () {
      if (this.cardData.fundStatus == 0 || this.cardData.fundStatus == 6) {
        return '立即申购'
      } else if (this.cardData.fundStatus == 1) {
        return '立即认购'
      } else {
        return '暂停交易'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    //获取详情数据
    getData () {
      getFundHoldPositionDetail({
        userId: '1351295',
        fundCode: this.$route.query.fundCode
      }).then((res)=> {
        if (res) {
          this.cardData.fundAbbrName = res.fundAbbrName
          this.cardData.fundNetValue = res.fundNetValue
          this.cardData.accumulativeProfit = res.accumulativeProfit
          this.cardData.marketValue = res.marketValue
          this.cardData.dividendType = res.dividendType
          this.cardData.dividendWay = res.dividendWay
          this.cardData.amount = res.amount
          this.cardData.sellAvailable = res.sellAvailable
          this.cardData.fundStatus = res.fundStatus
          this.cardData.fundStatusDescribe = res.fundStatusDescribe
          this.cardData.fundCode = res.fundCode
          this.cardData.dividendFlag = res.dividendFlag
          this.cardData.dividendEntrust = res.dividendEntrust
          this.cardData.taCode = res.taCode
          this.cardData.grzd = res.minRedeemAmount
          this.cardData.jgzd = res.organizationMinRedeemAmount
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
    // 立即申购
    submitFn () {
      console.log('立即申购')
      this.$router.push({ path: '/ProductDetails', query: { id: this.cardData.fundCode} })
    },
    // 赎回
    ransomFn () {
      if (this.shuhuiStatus) {
        this.$router.push({ 
          path: '/ransom', 
          query: { 
            fundName: this.cardData.fundAbbrName, 
            fundCode: this.cardData.fundCode, 
            fundNetValue: this.cardData.fundNetValue,
            taCode: this.cardData.taCode,
            entrustNo: this.$route.query.entrustNo,
            sellAvailable: this.cardData.sellAvailable,
            grzd: this.cardData.grzd,
            jgzd: this.cardData.jgzd
          }
        })
      }
    },
    // 编辑分红方式
    edit () {
      this.$router.push({
        path: '/distribution',
        query: {
          fundCode: this.cardData.fundCode, 
          title: this.cardData.fundAbbrName, 
          dividendType: this.cardData.dividendType
        }
      })
    },
    // 撤销分红方式
    fundRevoke () {
      submitFundRevoke({
        userId: '1351295',
        entrustNo: this.cardData.dividendEntrust
      }).then((res) => {
        if (res.code) {
          this.$toast('撤销成功')
          this.getData()
        } else {
          this.$toast(res.message)
        }
      })
    }
  },
  filters: {
    currency: currency
  }
}
</script>

<style scoped>
.takePositionDetails{

}
.takePositionDetails-box{
  height: calc(100vh - 1.46rem);
  background: #ffffff;
}
.main{
  border-top: .2rem solid #f6f6f6;
  background: #ffffff;
}
.shuhui{
  width: 2.2rem;
  border: 1px solid #4783F6;
  border-radius: .08rem;
  background: none;
  font-size: .36rem;
  color: #4783F6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: .2rem;
  text-align: center;
}
.shuhui.disabled{
  opacity: .4;
}
.cell-r .take-abbr{
  display: inline-block;
  width: 1px;
  height: 80%;
  background: #e4e4e4;
  margin: 0 .2rem;
}

.details-card-link{
  display: flex;
  height: .4rem;
  align-items: center;
  margin-left: .2rem;
}
.details-card-link-text{
  font-size: .24rem;
  color: #666666;
}
.details-card-link-icon{
  width: .1rem;
  margin-left: .15rem;
}
.details-card-link-icon img{
  display: inline-block;
  width: 100%;
}
</style>