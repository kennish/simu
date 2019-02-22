<template>
  <div class="ransom-list" @click="$emit('tolink')">
    <div class="ransom-title">{{title}}</div>
    <div class="ransom-info">
      <div class="ransom-item">
        <div class="ransom-value bold">{{value | currency}}</div>
        <div class="ransom-name">持仓(份)</div>
      </div>
      <div class="ransom-item">
        <div class="ransom-value bold">{{value2 | currency}}</div>
        <div class="ransom-name">可赎回(份)</div>
      </div>
    </div>
  </div>
</template>

<script>
import {currency} from '@/public/filters.js'
export default {
  props: {
    title: { type: String, default: '--' },
    value: { type: String | Number, default: '--' },
    value2: { type: String | Number, default: '--' }
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
.ransom-list{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1.92rem;
  box-sizing: border-box;
  padding: .22rem .3rem;
  background: #ffffff;
  margin-bottom: .2rem;
}
.ransom-title{
  font-size: .30rem;
  color: #4D4D4D;
}
.ransom-info{
  display: flex;
}
.ransom-item{
  flex: 1;
}
.ransom-value{
  font-size: .32rem;
  color: #2F2F2F;
}
.ransom-name{
  font-size: .24rem;
  color: #666666;
  margin-top: .1rem;
}
</style>