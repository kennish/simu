<template>
  <div class="ransom">
    <div class="contract-header">{{$route.query.fundName+'('+$route.query.fundCode+')'}}</div>
    <div class="main">
      <div>
        <hb-title text="填写赎回份额"></hb-title>
        <hb-title text="赎回份额(份)" class="no-border"></hb-title>
        <div class="pay-box">
          <div class="pay-inpt">
            <number-input v-model="quotient" :placeholder="placeholder" :maxDecimal="2"></number-input>
          </div>
        </div>
        <hb-cell title="可赎回份额" :text="sellAvailable | currency('份')" style="color: #666666;"></hb-cell>
        <!-- <hb-cell title="赎回金额大写" :text="(quotient * $route.query.fundNetValue) | cnNumber" style="color: #666666;"></hb-cell> -->
      </div>
      <div class="note">
        <div class="note-text">注：</div>
        <div class="note-text">1.个人最小赎回份额为{{grzd}}；</div>
        <div class="note-text">2.机构最小赎回份额为{{jgzd}}；</div>
        <div class="note-text">3.若赎回后会留存金额小于100万元，则会强制全部赎回；</div>
        <div class="note-text">4.资金赎回到原账户。</div>
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
import {currency, cnNumber} from '@/public/filters.js'
import { submitFundEntrust } from '@/public/api.js'
export default {
  components: {
    HbTitle,
    NumberInput,
    HbCell,
    HbSubmit
  },
  data () {
    return {
      quotient: null,
      sellAvailable: null,
      placeholder: '',
      grzd: null,
      jgzd: null
    }
  },
  created () {
    this.sellAvailable = this.$route.query.sellAvailable
    this.placeholder = '可赎回'+currency(this.sellAvailable,'份')
    this.grzd = currency(this.$route.query.grzd, '份')
    this.jgzd = currency(this.$route.query.jgzd, '份')
  },
  methods: {
    submitFn () {
      const confirmMsg = '是否赎回' + currency(this.quotient) + '份' + this.$route.query.fundName + '(' + this.$route.query.fundCode + ')'
      this.$msgBox.confirm(confirmMsg, {
        confirmButtonText: '赎回',
        cancelButtonText: '暂不',
        showCancelButton: true
      }).then(action => {
        if (action == 'confirm') {
          submitFundEntrust({
            userId: '1351295',
            entrustType: '024',
            fundCode: this.$route.query.fundCode,
            entrustAmount: this.quotient
          }).then((res) => {
            if (res.errCode) {
              this.$toast(res.errMessage)
            } else {
              this.$router.push({ 
                path: '/ransomEntrust',
                query: {
                  entrustNo: res.entrustCode,
                  taCode: this.$route.query.taCode,
                  entrustType: 4,
                  fundCode: this.$route.query.fundCode
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
          
          // this.$toast('可赎回份额不足')
        }
      }).catch(err => { 
        if (err == 'cancel') {
          this.$router.push('/index')
        }
      })
    }
  },
  computed: {
    // 按钮是否可用
    available () {
      if (this.quotient > 0) {
        return false
      } else {
        return true
      }
    }
  },
  filters: {
    currency: currency,
    cnNumber: cnNumber
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