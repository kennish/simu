<template>
  <div class="home">
    <home-card :total="cardData.total" :profitLoss="cardData.profitLoss" :available="cardData.available"></home-card>
    <home-nav></home-nav>
    <div class="home-hot">
      <hb-title text="热门推荐" :isBold="true">
        <router-link to="/productLists" class="hot-link" slot="right">
          全部产品<span class="hot-link-icon"><img :src="require('@/assets/img/pf_pic01.png')"/></span>
        </router-link>
      </hb-title>
      <div class="hot-box">
        <product-list v-for="(item, index) in productData" :key="index"
         :title="item.fundName" :value="item.fundNetValue" :grade='item.riskLevel' :status="item.fundStatus" to="/ProductDetails" :id="item.fundCode">
        </product-list>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCard from '@/components/home/HomeCard'
import HomeNav from '@/components/home/HomeNav'
import ProductList from '@/components/ProductList'
import HbTitle from '@/components/HbTitle'
import { getHomeData } from '@/public/api.js'
export default {
  components: {
    HomeCard,
    HomeNav,
    ProductList,
    HbTitle
  },
  data () {
    return {
      cardData: {
        total: '--',
        profitLoss: '--',
        available: '--'
      },
      productData: []
    }
  },
  created() {
    this.getData()
    // 清楚查询的日期
    window.sessionStorage.removeItem('searchStartDate')
    window.sessionStorage.removeItem('searchEndDate')
  },
  methods: {
    getData () {
      getHomeData({userId: '1351295'}).then((res) => {
        this.cardData.total = res.fundAssets.totalMarketValue
        this.cardData.profitLoss = res.fundAssets.earnings
        this.cardData.available = res.fundAssets.useAvailable
        this.productData = res.fundProductList
      }).catch((err) => {
        console.log(err)
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    }
  }
}
</script>

<style scoped>
.home{
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -o-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.home-hot{
  margin-top: .2rem;
}
.hot-link{
  display: flex;
  font-size: .24rem;
  color: #666666;
  align-items: center;
  justify-content: flex-end;
}
.hot-link-icon{
  display: inline-block;
  width: .1rem;
  margin-left: .15rem;
}
.hot-link-icon img{
  display: block;
  width: 100%;
}
</style>