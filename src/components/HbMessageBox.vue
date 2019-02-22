<template>
  <div v-show="value">
    <div class="hb-msgbox-mask"></div>
    <div class="hb-msgbox">
      <div class="hb-msgbox-header" v-show="title">{{title}}</div>
      <div class="hb-msgbox-content">
        <div class="hb-msgbox-message">{{message}}</div>
      </div>
      <div class="hb-msgbox-btns">
        <button class="hb--msgbox-btn hb-msgbox-cancel" v-show="showCancelButton" @click="cancel">{{cancelButtonText}}</button>
        <button class="hb--msgbox-btn hb-msgbox-confirm" v-show="showConfirmButton" @click="confirm">{{confirmButtonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    title: { type: String | Number, default: '' },
    message: { type: String | Number, default: '' },
    showCancelButton: { type: Boolean, default: false },
    showConfirmButton: { type: Boolean, default: true },
    cancelButtonText: { type: String, default: '取消' },
    confirmButtonText: { type: String, default: '确定' },
    closeOnClickModal: { type: Boolean, default: true },
    closeOnClickConfirm: { type: Boolean, default: true }
  },
  data () {
    return {
      
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
      this.$emit('input', false)
    },
    confirm () {
      this.$emit('confirm')
      if (this.closeOnClickConfirm) {
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style scoped>
.hb-msgbox-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000000;
}
.hb-msgbox{
  position: fixed;
  top: 50%;
  left: 50%;
  width: 85%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  overflow: hidden;
  border-radius: .1rem;
}
.hb-msgbox-header{
  padding-top: .4rem;
  font-size: .38rem;
  color: #000000;
  text-align: center;
}
.hb-msgbox-content{
  padding: .4rem;
  min-height: .56rem;
}
.hb-msgbox-message{
  text-align: center;
  font-size: .34rem;
  color: #2F2F2F;
  line-height: .56rem;
}
.hb-msgbox-btns{
  height: .98rem;
  line-height: .98rem;
  display: flex;
  border-top: 1px solid #e4e4e4;
}
.hb--msgbox-btn{
  display: block;
  flex: 1;
  text-align: center;
  font-size: .34rem;
  background: #ffffff;
}
.hb-msgbox-cancel{
    color: #666666 !important;
    border-right: 1px solid #e4e4e4
}
.hb-msgbox-confirm{
  color: #CE3533
}
</style>