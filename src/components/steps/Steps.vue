<template>
  <div class="steps">
    <div class="steps-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.steps{
  display: flex;
  height: 2.02rem;
  background: #FFFFFF;
}
.steps-wrap{
  margin: 0 .3rem;
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>