<template>
  <div class="entrust-box">
    
    <div class="entrust-wrap" v-if="isloading">

      <!-- 未撤单状态 -->
      <div class="entrust" v-if="entrustData.entrustResult >= 0 && entrustData.entrustResult != 4 && entrustData.entrustResult != 7 && entrustData.entrustResult != 8">
        <steps>
          <step title="委托中" :msg="entrustData.entrustDate" :msg2="entrustData.entrustTime" :current="entrustData.flag >= 1? 'success' : null"></step>
          <step title="冷静期截止" :msg="entrustData.calmPeriod" :msg2="entrustData.calmPeriodTime" :current="entrustData.flag >= 2? 'success' : null"></step>
          <step title="回访截止" :msg="entrustData.callBackDate" :msg2="entrustData.callBackDateTime" :current="entrustData.flag >= 3? 'success' : null"></step>
          <step title="查看持仓" msg="" :current="entrustData.flag >= 4? 'success' : null"></step>
        </steps>
        <div class="main">
          <hb-title text="订单详情"></hb-title>
          <hb-cell title="订单号" :text="entrustData.entrustNo? entrustData.entrustNo : '--'"></hb-cell>
          <hb-cell title="名称" :text="entrustData.fundName? entrustData.fundName : '--'"></hb-cell>
          <hb-cell title="代码" :text="entrustData.fundCode? entrustData.fundCode : '--'"></hb-cell>
          <hb-cell title="总金额(含手续费)" :text="entrustData.entrustAmount | currency('元')"></hb-cell>
          <hb-cell title="当前状态">
            <span class="red">{{entrustData.entrustResultDescribe? entrustData.entrustResultDescribe : '--'}}</span>
          </hb-cell>
        </div>
        <hb-submit text="撤单" @submit="submitFn" :isFixed="true" :disabled="entrustData.flag != 1"></hb-submit>
      </div>
      <!-- /未撤单状态 -->

      <!-- 已撤单状态 -->
      <div class="cancellations" v-else>
        <steps>
          <step title="申请撤单" msg="" current="success"></step>
          <step title="撤单失败" msg="" current=error v-if="entrustData.entrustResult == 4 || entrustData.entrustResult == -3"></step>
          <step title="撤单成功" msg="实时退回到资金账户" :current="entrustData.entrustResult == 7 || entrustData.entrustResult == 8 || entrustData.entrustResult == -1? 'success' : null" v-else></step>
        </steps>
        <div class="main">
          <hb-title text="订单详情"></hb-title>
          <hb-cell title="订单号" :text="entrustData.entrustNo? entrustData.entrustNo : '--'"></hb-cell>
          <hb-cell title="名称" :text="entrustData.fundName? entrustData.fundName : '--'"></hb-cell>
          <hb-cell title="代码" :text="entrustData.fundCode? entrustData.fundCode : '--'"></hb-cell>
          <hb-cell title="退款金额" :text="entrustData.entrustAmount | currency('元')"></hb-cell>
          <hb-cell title="当前状态">
            <span class="red">{{entrustData.entrustResultDescribe? entrustData.entrustResultDescribe : '--'}}</span>
          </hb-cell>
        </div>
      </div>
      <!-- /已撤单状态 -->

    </div>

  </div>
</template>

<script>
import HbTitle from '@/components/HbTitle'
import HbCell from '@/components/HbCell'
import HbSubmit from '@/components/HbSubmit'
import Steps from '@/components/steps/Steps'
import Step from '@/components/steps/Step'
import { currency } from "@/public/filters.js";
import { getFundEntrustDetail, submitFundRevoke } from "@/public/api.js";
export default {
  components: {
    Steps,
    Step,
    HbTitle,
    HbCell,
    HbSubmit
  },
  data () {
    return {
      entrustData: {
        entrustNo: '--',
        fundName: '--',
        fundCode: '--',
        entrustAmount: '--',
        entrustResult: '--',
        entrustResultDescribe: '--',
        entrustDate: '--', // 委托日期
        calmPeriod: '--', // 冷静期时间
        flag: null,
        entrustTime: '',
        calmPeriodTime: '',
        callBackDate: '',
        callBackDateTime: ''
      },
      query:{
        userId: '1351295',
        entrustNo: this.$route.query.entrustCode,
        fundName: this.$route.query.fundName,
        fundCode: this.$route.query.fundCode,
        entrustType: this.$route.query.entrustType,
        entrustDate: this.$route.query.entrustDate
      },
      isloading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getFundEntrustDetail(this.query).then((res) => {
        if (res.resultCode == 1) {
          this.entrustData.entrustNo = res.data.entrustNo
          this.entrustData.fundName = res.data.fundName
          this.entrustData.fundCode = res.data.fundCode
          this.entrustData.entrustAmount = res.data.entrustAmount
          this.entrustData.entrustResult = res.data.entrustResult
          this.entrustData.entrustResultDescribe = res.data.entrustResultDescribe
          this.entrustData.entrustDate = res.data.entrustDate
          this.entrustData.calmPeriod = res.data.calmPeriod
          this.entrustData.flag = res.data.flag
          this.entrustData.entrustTime = res.data.entrustTime
          this.entrustData.calmPeriodTime = res.data.calmPeriodTime
          this.entrustData.callBackDate = res.data.callBackDate
          this.entrustData.callBackDateTime = res.data.callBackDateTime
        } else {
          this.$toast(res.resultMessage)
        }
        this.isloading = true
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
          submitFundRevoke({userId: '1351295', entrustNo: this.entrustData.entrustNo}).then((res) => {
            this.$toast(res.message)
            if (res.code > 0) {
              this.query.entrustType = 2 //撤单传2
              this.getData()
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

<style>
.entrust{
  height: calc(100vh - 1.46rem);
  background: #ffffff;
}
.main{
  border-top: .2rem solid #f6f6f6;
}
.cancellations{
  height: calc(100vh);
  background: #ffffff;
}
</style>