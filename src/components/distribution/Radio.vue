<template>
  <div class="hb-radio-wrap">
    <div class="hb-radio" v-for="(item, index) in options" :key="index" @click="checkedFn(item.value)">
      <div class="radio-icon">
        <img v-if="value != item.value" :src="require('@/assets/img/pf_pic11.png')"/>
        <img v-else :src="require('@/assets/img/pf_pic12.png')"/>
      </div>
      <div class="radio-info">
        <div class="radio-name">{{item.label}}</div>
        <div class="radio-msg">{{item.mag}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String | Number,
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    checkedFn (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.hb-radio-wrap{}
.hb-radio{
  display: flex;
  padding: .26rem .3rem;
  background: #ffffff;
  align-items: center;
}
.hb-radio:not(:last-child){
  border-bottom: 1px solid #e4e4e4;
}
.radio-icon{
  width: .3rem;
  height: .3rem;
  margin-right: .3rem;
}
.radio-icon img{
  display: block;
  width: 100%;
}
.radio-info{
  flex: 1;
}
.radio-name{
  font-size: .30rem;
  color: #2F2F2F;
}
.radio-msg{
  font-size: .24rem;
  color: #999999;
}
</style>