<template>
  <router-link :to="{path: to, query: {id: id}}" class="product-list" tag="div">
    <div class="titie">{{title+'('+id+')'}}</div>
    <div class="product-info">
      <div class="product-info-l">
        <div class="sum bold">{{value | currency('', false, '4')}}</div>
        <div class="name">参考净值</div>
      </div>
      <div class="product-info-c">
        <div :class="`risk bold ${gradeClass}`">{{showGrade}}</div>
        <div class="name">风险类型</div>
      </div>
      <div class="product-info-r">
        <div class="product-btn" v-if="status == 0 || status == 1 || status == 6">{{status==0 || status==6? '立即申购': '立即认购'}}</div>
        <div class="product-pause" v-else><img :src="imgUrl"/></div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { currency } from '@/public/filters.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    },
    grade: {
      type: Number,
      default: null
    },
    status: {
      type: Number,
      default: 1
    },
    to: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {
      gradeClass: '',
      imgUrl: ''
    }
  },
  created () {
    if (process.env.NODE_ENV == 'development') {
      this.imgUrl = require('@/assets/img/pf_pic06.png')
    } else {
      this.imgUrl = process.env.IMG_URL+'/img/pf_pic06.png'
    }
  },
  computed: {
    // 风险等级计算
    showGrade () {
      if(this.grade == 5){
        this.gradeClass = 'red'
        return '高风险'
      } else if(this.grade == 4){
        this.gradeClass = 'orange'
        return '中高风险'
      } else if(this.grade == 3){
        this.gradeClass = 'yellow'
        return '中风险'
      } else if(this.grade == 2){
        this.gradeClass = 'purple'
        return '中低风险'
      } else if(this.grade == 1){
        this.gradeClass = 'green'
        return '低风险'
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
.product-list{
  height: 2.06rem;
  box-sizing: border-box;
  padding: .3rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: .1rem;
}
.product-list .titie{
  font-size: .3rem;
  color: #4D4D4D;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.product-info{
  display: flex;
}
.product-info-l{
  width: 2.95rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-info-l .sum{
  font-size: .42rem;
  color: #2F2F2F;
}
.name{
  font-size: .24rem;
  color: #999999;
}
.product-info-c{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.risk{
  font-size: .32rem;
}
.product-info-r{
  width: 1.6rem;
  display: flex;
  align-items: center;
  position: relative;
}
.product-btn{
  width: 100%;
  height: .54rem;
  border: 1px solid #CE3533;
  border-radius: .04rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .28rem;
  color: #CE3533;
  cursor: pointer;
}
.product-pause{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -54%);
  width: 1.18rem;
}
.product-pause img{
  display: block;
  width: 100%;
}
</style>