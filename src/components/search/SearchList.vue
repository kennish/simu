<template>
  <div class="search-list" @click="$emit('tolink')">
    <div class="search-title">{{title}}</div>
    <div class="search-info">
      <div class="search-item-l">委托类型：<span class="search-value">{{type}}</span></div>
      <div v-if="type != '赎回'" class="search-item">委托金额：<span class="search-value">{{money | currency('元')}}</span></div>
      <div v-else class="search-item">委托份额：<span class="search-value">{{share | currency('份')}}</span></div>
    </div>
    <div class="search-info">
      <div class="search-item">委托时间：<span class="search-value">{{date}}</span></div>
    </div>
    <div class="search-status red">{{status}}</div>
  </div>
</template>

<script>
import { currency } from '@/public/filters.js'
export default {
  props: {
    title: { type: String, default: '--' },
    type: { type: String, default: '--' },
    money: { type: String | Number, default: '--' },
    share: { type: String | Number, default: '--' },
    date: { type: String, default: '--' },
    status: { type: String | Number, default: '--' }
  },
  data () {
    return {
      
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
.search-list{
  padding: .26rem .3rem;
  margin-bottom: .2rem;
  background: #ffffff;
}
.search-title{
  font-size: .3rem;
  color: #4D4D4D;
  margin-bottom: .2rem;
}
.search-info{
  display: flex;
  margin-bottom: .2rem;
}
.search-item{
  flex: 1;
  font-size: .28rem;
  color: #999999;
}
.search-item-l{
  width: 48%;
  font-size: .28rem;
  color: #999999;
}
.search-value{
  color: #000000;
}
.search-status{
  font-size: .24rem;
  color: #CE3533;
}
</style>