<template>
  <div class="cell">
    <div class="cell-l">{{title}}</div>
    <div class="cell-r">{{text}}<slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '--' },
    text: { type: String | Number, default: '' }
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
.cell{
  display: flex;
  background: #ffffff;
  padding: .18rem .3rem;
  justify-content: space-between;
  color: #4D4D4D;
  text-align: right;
}
.cell-l{
  font-size: .3rem;
  /* line-height: .3rem; */
}
.cell-r{
  display: flex;
  font-size: .3rem;
  color: #2F2F2F;
  /* line-height: .3rem; */
  align-items: center;
  max-width: 60%;
}
.cell-r .take-abbr{
  display: inline-block;
  width: 1px;
  height: 80%;
  background: #e4e4e4;
  margin: 0 .2rem;
}
</style>