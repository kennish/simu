<template>
  <div class="hot-header">
    <div :class="`hot-title ${isBold? 'bold' : ''}`">{{text}}</div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '--' },
    isBold: { type: Boolean, default: false }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.hot-header{
  display: flex;
  padding: 0 .3rem;
  background: #ffffff;
  height: .92rem;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
}
.hot-title{
  flex: 1;
  font-size: .32rem;
  color: #2F2F2F;
}
.bold{
  font-weight: bold;
}
</style>