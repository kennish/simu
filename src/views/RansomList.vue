<template>
  <div class="ransom-wrap">
    <div class="no-data" v-if="isnodata">
      <div class="no-data-icon"><img :src="require('@/assets/img/nodata_icon.png')"/></div>
      <div class="no-data-text">暂无相关内容</div>
    </div>
    <ransom-list v-for="(item, index) in ransomList" :key="index" 
      :title="item.fundAbbrName+'('+ item.fundCode +')'" :value="item.amount" :value2="item.sellAvailable" 
      @tolink="tolinkFn(item.fundNetValue, item.fundCode, item.fundAbbrName, item.taCode, item.sellAvailable, item.minRedeemAmount, item.organizationMinRedeemAmount)">
    </ransom-list>
  </div>
</template>

<script>
import RansomList from '@/components/ransomList/RansomList'
import { getShuHuiList } from '@/public/api.js'
export default {
  components: {
    RansomList
  },
  data () {
    return {
      isnodata: false,
      ransomList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getShuHuiList({userId: '1351295'}).then((res) => {
        if (res.length == 0) {
          this.isnodata = true
        } else {
          this.ransomList = res
        }
      }).catch((err) => {
        console.log(err)
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    tolinkFn (fundNetValue, fundCode, fundName, taCode, sellAvailable, grzd, jgzd) {
      this.$router.push({
        path: '/ransom',
        query: {
          fundName: fundName,
          fundNetValue: fundNetValue,
          fundCode: fundCode,
          taCode: taCode,
          sellAvailable: sellAvailable,
          grzd: grzd,
          jgzd: jgzd
        }
      })
    }
  }
}
</script>

<style scoped>

</style>