<template>
  <div class="ransomEntrust">
    <hb-title text="订单详情"></hb-title>
    <hb-cell title="订单号" :text="ransomData.entrustNo? ransomData.entrustNo : '--'"></hb-cell>
    <hb-cell title="名称" :text="ransomData.fundName? ransomData.fundName : '--'"></hb-cell>
    <hb-cell title="代码" :text="ransomData.fundCode? ransomData.fundCode : '--'"></hb-cell>
    <hb-cell title="赎回份额" :text="ransomData.entrustShare | currency('份')"></hb-cell>
    <!-- <hb-cell title="赎回金额" :text="ransomData.entrustAmount | currency('元')"></hb-cell> -->
    <!-- <hb-cell title="退款账户" :text="ransomData.bankBrief? ransomData.bankBrief : '--'"></hb-cell> -->
    <hb-cell title="当前状态">
      <span class="red">{{ransomData.entrustResultDescribe? ransomData.entrustResultDescribe : '--'}}</span>
    </hb-cell>
    <hb-submit 
      v-if="ransomData.entrustResult && ransomData.entrustResult == 0" 
      text="撤单" 
      @submit="submitFn" 
      :isFixed="true" 
      :disabled="false">
    </hb-submit>
  </div>
</template>

<script>
import HbTitle from '@/components/HbTitle'
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import {currency} from '@/public/filters.js'
import { getFundEntrustDetail, submitFundRevoke } from '@/public/api.js'
export default {
  components: {
    HbTitle,
    HbCell,
    HbSubmit
  },
  data () {
    return {
      ransomData: {
        entrustNo: '--',
        fundName: '--',
        fundCode: '--',
        entrustShare: '--',
        entrustAmount: '--',
        bankBrief: '--',
        entrustResultDescribe: '--',
        entrustResult: null,
        flag: null
      },
      queryEntrustType: ''
    }
  },
  created () {
    this.queryEntrustType = this.$route.query.entrustType
    this.getData()
  },
  methods: {
    getData () {
      getFundEntrustDetail({
        userId: '1351295',
        entrustNo: this.$route.query.entrustNo,
        taCode: this.$route.query.taCode,
        fundCode: this.$route.query.fundCode,
        entrustType: this.queryEntrustType,
        entrustDate: this.$route.query.entrustDate
      }).then((res) => {
        if (res.resultCode == 1) {
          this.ransomData.entrustNo = res.data.entrustNo
          this.ransomData.fundName = res.data.fundName
          this.ransomData.fundCode = res.data.fundCode
          this.ransomData.entrustShare = res.data.entrustShare
          this.ransomData.entrustAmount = res.data.entrustAmount
          this.ransomData.bankBrief = res.data.bankBrief
          this.ransomData.entrustResultDescribe = res.data.entrustResultDescribe
          this.ransomData.entrustResult = res.data.entrustResult
          this.ransomData.flag = res.data.flag
        } else{
          this.$toast(res.resultMessage)
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
    submitFn () {
      this.$msgBox.confirm('订单正在确认中，是否撤销此单交易',{
        confirmButtonText: '撤销',
        cancelButtonText: '暂不',
        showCancelButton: true
      }).then(action => {
        if (action == 'confirm') {
          submitFundRevoke({userId: '1351295', entrustNo: this.ransomData.entrustNo}).then((res) => {
            this.$toast(res.message)
            if (res.code > 0) {
              this.queryEntrustType = 2
              this.getData()
              // this.$router.push({ 
              //   path: '/entrust', 
              //   query: {
              //     entrustCode: this.ransomData.entrustNo, 
              //     fundCode: this.$route.query.fundCode, 
              //     fundName: this.ransomData.fundName,
              //     entrustType: 2
              //   } 
              // })
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch(err => { 
        if (err == 'cancel') {
          console.log('点击了暂不')
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
.ransomEntrust{
  height: 100vh;
  background: #ffffff;
}
</style>