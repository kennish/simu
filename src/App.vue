<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="app-content"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(process.env.NODE_ENV)
  },
  data () {
    return {
      pageIndex: null,
      transitionName: ''
    }
  },
  watch: {
    $route(){
      let newIndex = this.$route.meta.index
      if(newIndex > this.pageIndex){ // 点击了当前的右边导航
        this.transitionName = 'right-slide-fade'
      } else{
        this.transitionName = 'left-slide-fade'
      }
      this.pageIndex = newIndex
    }
  },
}
</script>

<style>
/* html,body{
  position: relative;  
} */
#app{
  width: 100%;
  height: 100%;
  /* overflow: scroll;  
  -webkit-overflow-scrolling: touch;  
  position: absolute;  
  left:0;  
  top:0;  */
  position: relative;  
}
.app-content{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  min-height: 100%;
}

.left-slide-fade-enter-active {
  transition: transform .3s linear;
}
.left-slide-fade-leave-active {
  transition: transform .3s linear;
}
.left-slide-fade-enter {
  transform: translateX(-100%);
  /* opacity: 0; */
}
.left-slide-fade-leave-to{
  transform: translateX(100%);
}

.right-slide-fade-enter-active {
  transition: transform .3s linear;
}
.right-slide-fade-leave-active {
  transition: transform .3s linear;
}
.right-slide-fade-enter {
  transform: translateX(100%);
  /* opacity: 0; */
}
.right-slide-fade-leave-to{
  transform: translateX(-100%);
}
</style>
