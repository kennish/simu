<template>
  <div class="distribution">
    <div class="distribution-title">{{$route.query.title+'('+$route.query.fundCode+')'}}</div>
    <div class="main">
      <radio v-model="value" :options="options"></radio>
    </div>
    <hb-submit text="确认选择" @submit="submitFn" :disabled="!value" style="background: none; margin-top: .3rem"></hb-submit>
  </div>
</template>

<script>
import Radio from '@/components/distribution/Radio'
import HbSubmit from '@/components/HbSubmit'
import { setDevidendSetting } from '@/public/api.js'
export default {
  components: {
    Radio,
    HbSubmit
  },
  data () {
    return {
      options: [
        { label: '现金分红', mag: '分红所得的资金直接发放至存管余额', value: '2' },
        { label: '红利再投资', mag: '分红所得的资金直接用于购买该基金，将分红转为持仓份额', value: '1' }
      ],
      value: ''
    }
  },
  created () {
    this.value = this.$route.query.dividendType
  },
  methods: {
    submitFn () {
      setDevidendSetting({
        userId: '1351295',
        fundCode: this.$route.query.fundCode,
        devidendType: this.value
      }).then((res) => {
        if (res.entrustCode) {
          this.$toast('修改成功')
          this.$router.go(-1)
        } else if (res.errCode == -6) {
          this.$msgBox.confirm('请于交易日的9:00-15:00期间修改分红方式', {
            confirmButtonText: '知道了',
            cancelButtonText: '暂不',
            showCancelButton: false
          }).then(action => {
            if (action == 'confirm') {
              this.$router.go(-1)
            }
          }).catch(err => { 
            if (err == 'cancel') {
              console.log('暂不')
            }
          })
        } else {
          this.$toast(res.errMessage)
          this.$router.go(-1)
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
  }
}
</script>

<style>
.distribution-title{
  display: flex;
  align-items: center;
  height: 1.52rem;
  padding: 0 .3rem;
  background: #FFFFFF;
  font-size: .3rem;
  color: #2F2F2F;
  line-height: .46rem;
}
.main{
  border-top: .2rem solid #f6f6f6;
}
</style>