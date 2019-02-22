<template>
  <div class="checklist">
    <div class="label" @click="checkFn">
      <img class="icon" v-show="value == 0" :src="require('@/assets/img/pf_pic07.png')" />
      <img class="icon" v-show="value == 1" :src="require('@/assets/img/pf_pic09.png')" />
      <img class="icon" v-show="value == 2" :src="require('@/assets/img/pf_pic08.png')" />
      阅读并同意
    </div>
    <div class="name" @click="showModelFn">《{{checkName}}》</div>
    <div class="model-box" v-show="showModel" @click="closeModelFn">
      <div class="model" @click.stop.prevent>
        <div class="model-header">
          {{checkName}}
          <div class="close-btn" @click="closeModelFn"><img :src="require('@/assets/img/pf_pic10.png')"/></div>
        </div>
        <div class="model-main">
          <slot></slot>
        </div>
        <div class="model-footer">
          <button type="button" class="confirm-btn" @click="confirmFn">我同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {type: Number | Boolean, default: 0 }, // 0=未选择 1=已选择 2=已选不可改
    checkName: { type: String, default: '' }
  },
  data () {
    return {
      showModel: false
    }
  },
  methods: {
    // 切换选择
    checkFn () {
      if (this.value != 2) {
        if (this.value == false) {
          this.$emit('input', true)
        } else{
          this.$emit('input', false)
        }
        this.$emit('checkListClick')
      }
    },
    // 展示弹出窗
    showModelFn () {
      if (this.value != 2) {
        this.showModel = true
      }
    },
    // 关闭弹出窗
    closeModelFn () {
      this.showModel = false
    },
    // 我同意
    confirmFn () {
      if (this.value == 0) {
        this.$emit('input', true)
        this.$emit('checkListClick')
      }
      this.showModel = false
    }
  }
}
</script>

<style scoped>
.checklist{
  margin-top: .36rem;
  display: flex;
  align-items: flex-start;
}
.label{
  display: flex;
  align-items: center;
  font-size: .3rem;
  color: #2F2F2F;
}
.icon{
  display: block;
  width: .28rem;
  height: .28rem;
  margin-right: .2rem;
}

.name{
  flex: 1;
  font-size: .3rem;
  color: #4783F6;
}

.model-box{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .7);
  /* padding: 1rem .3rem; */
  z-index: 100;
}
.model{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
.model-header{
  display: flex;
  position: relative;
  height: 1.12rem;
  align-items: center;
  justify-content: center;
  font-size: .36rem;
  color: #2F2F2F;
  border-bottom: 1px solid #e4e4e4;
}
.close-btn{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1.12rem;
  text-align: center;
  line-height: 1.12rem;
}
.close-btn img{
  display: inline-block;
  width: .32rem;
  height: .32rem;
}
.model-main{
  flex: 1;
  /* padding: .3rem; */
  overflow-y: auto;
  -webkit-font-smoothing: antialiased;
 -webkit-overflow-scrolling: touch;
 -moz-overflow-scrolling: touch;
 -o-overflow-scrolling: touch;
 overflow-scrolling: touch;
 position: relative;
}
.model-footer{
  height: .9rem;
  display: flex;
  border-top: 1px solid #e4e4e4;
}
.confirm-btn{
  background: none;
  flex: 1;
  font-size: .36rem;
  color: #CE3533;
}
</style>