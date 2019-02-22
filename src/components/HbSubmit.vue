<template>
  <div :class="`submit-box ${isFixed? 'fixed-bottom' : ''}`">
    <slot></slot>
    <div :class="`submit-btn ${disabled? 'disabled' : ''}`" @click="submit">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '提交' },
    isFixed: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      
    }
  },
  methods: {
    submit () {
      if (!this.disabled) {
        this.$emit('submit', '')
      }
    }
  }
}
</script>

<style scoped>
.submit-box{
  width: 100%;
  height: 1.26rem;
  background: #ffffff;
  padding: .2rem .3rem;
  box-sizing: border-box;
  display: flex;
}
.fixed-bottom{
  position: fixed;
  bottom: 0;
  left: 0;
}
.submit-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background: #CE3533;
  border-radius: .08rem;
  font-size: .36rem;
  color: #FFFFFF;
  text-align: center;
}
.disabled{
  opacity: .4;
}
</style>