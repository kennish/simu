<template>
  <div class="home-card">
    <div class="card-t">
      <div class="card-t-l">
        <div class="name">私募基金总市值(元)</div>
        <div class="sum bold">{{total | currency}}</div>
      </div>
      <div class="card-t-r">
        <router-link to="/takePosition" class="link">
          <span class="link-text">查看我的持仓</span>
          <span class="link-icon"><img :src="require('@/assets/img/pf_pic01.png')"/></span>
        </router-link>
      </div>
    </div>
    <div class="card-b">
      <div class="card-b-l">
        <div class="name">累计盈亏(元)</div>
        <div :class="`sum bold ${className}`">{{profitLoss | currency('', true)}}</div>
      </div>
      <div class="card-b-r">
        <div class="name">可用资金(元)</div>
        <div class="sum bold">{{available | currency}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {currency} from '@/public/filters.js'
export default {
  props: {
    total: {
      type: Number|String,
      default: '--'
    },
    profitLoss: {
      type: Number|String,
      default: '--'
    },
    available: {
      type: Number|String,
      default: '--'
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  computed: {
    className () {
      if (this.profitLoss > 0) {
        return 'red'
      } else if (this.profitLoss < 0) {
        return 'green'
      }else {
        return ''
      }
    }
  },
  filters: {
    currency: currency
  }
}
</script>

<style scoped>
.home-card{
  background: #ffffff;
  padding: 0 .3rem;
}
.home-card .card-t{
  display: flex;
  padding-top: .4rem;
  justify-content: space-between;
}
.home-card .card-t .card-t-l{
  flex: 1;
}
.home-card .card-t .card-t-l .sum{
  font-size: .50rem;
  color: #2F2F2F;
}
.home-card .card-t .card-t-l .name{
  font-size: .24rem;
  color: #999999;
  margin-bottom: .1rem;
}
.home-card .card-t .card-t-r{
  /* width: 1.7rem; */
}
.home-card .card-t .card-t-r .link{
  display: flex;
}
.home-card .card-t .card-t-r .link-text{
  font-size: .24rem;
  color: #666666;
}
.home-card .card-t .card-t-r .link-icon{
  width: .1rem;
  margin-left: .15rem;
  display: flex;
  align-items: center;
}
.home-card .card-t .card-t-r .link-icon img{
  display: inline-block;
  width: 100%;
}
.home-card .card-b{
  display: flex;
  padding: .32rem 0 .26rem;
}
.home-card .card-b .card-b-l{
  flex: 1;
}
.home-card .card-b .card-b-l .sum{
  font-size: .34rem;
}
.home-card .card-b .card-b-l .name{
  font-size: .24rem;
  color: #999999;
  margin-bottom: .08rem;
}
.home-card .card-b .card-b-r{
  flex: 1;
}
.home-card .card-b .card-b-r .sum{
  font-size: .34rem;
  color: #2F2F2F;
}
.home-card .card-b .card-b-r .name{
  font-size: .24rem;
  color: #999999;
  margin-bottom: .08rem;
}
</style>