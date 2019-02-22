<template>
  <router-link tag="div" :to="{path: '/takePositionDetails', query: { fundCode: fundCode}}" class="take-list">
    <div class="take-title">{{title+'('+fundCode+')'}}</div>
    <div class="take-info">
      <div class="take-l take-item">
        <div class="take-value bold">{{value | currency('', false, '4')}}</div>
        <div class="take-name">净值</div>
      </div>
      <div class="take-c take-item">
        <div :class="`take-value bold ${valueClass}`">{{value2 | currency('', true)}}</div>
        <div class="take-name">累计盈亏(元)</div>
      </div>
      <div class="take-r take-item">
        <div class="take-value">{{value3 | currency}}</div>
        <div class="take-name">持仓(份)</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import {currency} from '@/public/filters.js'
export default {
  props: {
    title: { type: String, default: '--' },
    value: { type: String | Number, default: '--' },
    value2: { type: String | Number, default: '--' },
    value3: { type: String | Number, default: '--' },
    fundCode: { type: String | Number, default: ''}
  },
  data () {
    return {
      
    }
  },
  computed: {
    valueClass () {
      if (this.value2 > 0) {
        return 'red'
      } else if (this.value2 < 0) {
        return 'green'
      } else {
        return ''
      }
    }
  },
  methods: {
    
  },
  filters: {
    currency: currency
  }
}
</script>

<style scoped>
.take-list{
  height: 2.02rem;
  box-sizing: border-box;
  background: #ffffff;
  padding: .24rem .3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: .2rem;
}
.take-title{
  font-size: .3rem;
  color: #4D4D4D;
}
.take-info{
  display: flex;
  align-content: space-between;
}
.take-item{}
.take-l{
  width: 1.8rem;
}
.take-c{
  flex: 1;
}
.take-r{
  width: 2.3rem;
}
.take-value{
  font-size: .36rem;
  color: #2F2F2F;
}
.take-name{
  font-size: .24rem;
  color: #666666;
  margin-top: .08rem;
}
</style>