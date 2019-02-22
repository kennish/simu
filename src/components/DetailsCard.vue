<template>
  <div class="details-card">
    <div class="title">
      <span>{{title}}</span>
      <slot name="link"></slot>
    </div>
    <div class="label" v-if="showTag">
      <div :class="`tag ${gradeClass}`" v-show="hanledGrade">{{hanledGrade}}</div>
      <div class="tag" v-for=" (item, index) in tag" :key="index">{{item}}</div>
      <div class="tag">私募基金</div>
    </div>
    <div class="info">
      <div class="info-item">
        <div class="name">最新净值</div>
        <div class="value bold">{{value | currency('', false, '4')}}</div>
      </div>
      <div class="info-item">
        <div class="name">{{subTitle}}</div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {currency} from '@/public/filters.js'
export default {
  props: {
    title: { type: String, default: '' },
    value: { type: Number|String, default: '--' },
    subTitle: { type: String, default: '--' },
    showTag: { type: Boolean, default: false },
    tag: { type: Array, default: function () { return [] } },
    grade: { type: Number, default: null }
  },
  data () {
    return {
      gradeClass: '' // 风险等级样式
    }
  },
  created () {
    // this.gradeTips()
  },
  computed: {
    // 风险等级计算 如果不匹配则不显示风险等级
    hanledGrade () {
      if (this.grade == 5) {
        this.gradeClass = "tag-red"
        return "高风险"
      } else if (this.grade == 4) {
        this.gradeClass = "tag-orange"
        return "中高风险"
      } else if (this.grade == 3) {
        this.gradeClass = "tag-yellow"
        return "中风险"
      } else if (this.grade == 2) {
        this.gradeClass = "tag-purple"
        return "中低风险"
      } else if (this.grade == 1) {
        this.gradeClass = "tag-green"
        return "低风险"
      } else{
        return false
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
.details-card{
  /* height: 3.06rem; */
  background: #ffffff;
  padding: 0 .3rem;
}
.title{
  padding: .18rem 0;
  display: flex;
  justify-content: space-between;
}
.title span{
  display: block;
  font-size: .3rem;
  color: #2F2F2F;
  flex: 1;
}

.label{
  display: flex;
}
.tag{
  font-size: .20rem;
  color: #999999;
  padding: .04rem .08rem;
  border: 1px solid #999999;
  border-radius: .06rem;
  margin-right: .14rem;
}
.tag-red{
  border: 1px solid #F44410;
  color: #F44410;
}
.tag-orange{
  border: 1px solid #F48E2C;
  color: #F48E2C;
}
.tag-yellow{
  border: 1px solid #F3D500;
  color: #F3D500;
}
.tag-purple{
  border: 1px solid #607AE3;
  color: #607AE3;
}
.tag-green{
  border: 1px solid #00AE7B;
  color: #00AE7B;
}
.info{
  display: flex;
  padding: .36rem 0 .2rem;
}
.info-item{
  flex: 1;
}
.name{
  font-size: .24rem;
  color: #666666;
  margin-bottom: .14rem;
}
.value{
  font-size: .36rem;
  color: #2F2F2F;
  line-height: .48rem;
}
</style>