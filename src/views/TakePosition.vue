<template>
  <div class="takePosition">
    <div class="no-data" v-if="isnodata">
      <div class="no-data-icon"><img :src="require('@/assets/img/nodata_icon.png')"/></div>
      <div class="no-data-text">暂无相关内容</div>
    </div>
    <take-list v-for="(item, index) in productData" :key="index" 
      :title="item.fundAbbrName" :value="item.fundNetValue" :value2="item.accumulativeProfit" :value3="item.amount" :fundCode="item.fundCode">
    </take-list>
  </div>
</template>

<script>
import TakeList from '@/components/takePosition/TakeList'
import { getAssetsData } from '@/public/api.js'
export default {
  components: {
    TakeList
  },
  data () {
    return {
      productData: [],
      isnodata: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getAssetsData({userId: '1351295'}).then((res) => {
        if (res.fundHoldPositionList.length == 0) {
          this.isnodata = true
        } else {
          this.productData = res.fundHoldPositionList
        }
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
.no-data{
  padding-top: 2rem;
  text-align: center;
}
.no-data-icon{
  width: 1.6rem;
  margin: 0 auto;
}
.no-data-icon img{
  display: block;
  width: 100%;
}
.no-data-text{
  font-size: .3rem;
  color: #999999;
  margin-top: .1rem;
}
</style>