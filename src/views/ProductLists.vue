<template>
  <div class="product-wrap">
    <div class="no-data" v-if="isnodata">
      <div class="no-data-icon"><img :src="require('@/assets/img/nodata_icon.png')"/></div>
      <div class="no-data-text">暂无相关内容</div>
    </div>
    <product-list v-for="(item, index) in productListData" :key="index" :title="item.fundName" 
      :value="item.fundNetValue" :grade='item.riskLevel' :status="item.fundStatus" to="/ProductDetails" :id="item.fundCode">
    </product-list>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import { getProductListData } from '@/public/api.js'
export default {
  components: {
    ProductList
  },
  data () {
    return {
      productListData: [],
      isnodata: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getProductListData({userId: '1351295'}).then((res) => {
        if (res.length == 0) {
          this.isnodata = true
        } else {
          this.isnodata = false
        }
        this.productListData = res 
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

<style>
.product-wrap{
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -o-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
</style>