<template>
  <div class="home-nav">
    <div class="home-nav-item">
      <router-link to="/productLists" class="home-nav-link">
        <div class="home-nav-link-icon">
          <img :src="require('@/assets/img/pf_pic02.png')"/>
        </div>
        <span>购买</span>
      </router-link>
    </div>
    <div class="home-nav-item">
      <router-link to="/ransomList" class="home-nav-link">
        <div class="home-nav-link-icon">
          <img :src="require('@/assets/img/pf_pic03.png')"/>
        </div>
        <span>赎回</span>
      </router-link>
    </div>
    <div class="home-nav-item">
      <router-link to="/search" class="home-nav-link">
        <div class="home-nav-link-icon">
          <img :src="require('@/assets/img/pf_pic04.png')"/>
        </div>
        <span>查询</span>
      </router-link>
    </div>
    <div class="home-nav-item">
      <router-link to="/openAccount" class="home-nav-link">
        <div class="home-nav-link-icon">
          <img :src="require('@/assets/img/pf_pic05.png')"/>
        </div>
        <span>私募开户</span>
      </router-link>
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

<style>
.home-nav{
  display: flex;
  padding: .4rem 0;
  background: #ffffff;
  margin-top: .2rem;
  height: 2.08rem;
  box-sizing: border-box;
}
.home-nav-item{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-nav-link{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.home-nav-link-icon{
  width: .78rem;
  height: .78rem;
  margin: 0 auto;
}
.home-nav-link img{
  display: block;
  width: 100%;
}
.home-nav-link span{
  font-size: .26rem;
  color: #2F2F2F;
  margin-top: .20rem;
}
</style>