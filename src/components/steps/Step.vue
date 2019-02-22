<template>
  <div class="step">
    <div class="step-t">{{title}}</div>
    <div :class="`step-m ${hanledCurrent}`">
      <div class="abbr"></div>
      <div class="dot"></div>
    </div>
    <div class="step-b">
      <div>{{msg}}</div>
      <div>{{msg2}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    msg: { type: String, default: '' },
    msg2: { type: String, default: '' },
    current: { type: String, default: '' }
  },
  data () {
    return {
      
    }
  },
  computed: {
    hanledCurrent () {
      if (this.current == 'success') {
        return 'active'
      } else if (this.current == 'error') {
        return 'error'
      }
    }
  },
  methods: {
    
  }
}
</script>

<style>
.step{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.step-t{
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: .28rem;
  color: #2F2F2F;
}
.step-m{
  height: .68rem;
  position: relative;
}
.abbr{
  width: 100%;
  height: .06rem;
  background: rgba(206,53,51,.1);
  position: absolute;
  top: 50%;
  left: -50%;
  transform: translateY(-50%);
}
.active .abbr{
  background: rgba(206,53,51,1);
  background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
  background-size: .3rem .3rem;
  animation: progress-bar-stripes 2s linear infinite;
}
.error .abbr{
  background: #F5A623;
}
.dot{
  width: .08rem;
  height: .08rem;
  background: #FFFFFF;
  border: .04rem solid #CE3533;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.error .dot{
  border: .04rem solid #F5A623;
}
.step-b{
  flex: 1;
  display: flex;
  align-items: center;
  font-size: .26rem;
  color: #999999;
  flex-direction: column;
}
.step:last-child .abbr{
  width: 150%;
}
@keyframes progress-bar-stripes {
  from  { background-position: 0 .3rem; }
  to    { background-position: 0 0; }
}
</style>