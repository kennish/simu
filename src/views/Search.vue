<template>
  <div class="search">

    <div class="hanled-box-wrap">
      <div class="hanled-box">
        <div class="hanled-l">
          <div class="hanled-btn" @click="openStartPicker">{{startInput.pickerDate | formatDate('yyyy-MM-dd')}}</div>
          <div class="hanled-abbr"></div>
          <div class="hanled-btn" @click="openEndPicker">{{endInput.pickerDate | formatDate('yyyy-MM-dd')}}</div>
        </div>
        <div class="hanled-r" @click="submit">确定</div>
      </div>
      <mt-datetime-picker v-model="startInput.initDate" ref="startPicker" type="date" @confirm="startConfirm" @cancel="startCancel" :closeOnClickModal="false"
        year-format="{value}年" month-format="{value}月" date-format="{value}日" :startDate="startInput.startDate" :endDate="startInput.endDate"> 
      </mt-datetime-picker>
      <mt-datetime-picker v-model="endInput.initDate" ref="endPicker" type="date" @confirm="endConfirm" @cancel="endCancel" :closeOnClickModal="false"
        year-format="{value}年" month-format="{value}月" date-format="{value}日" :startDate="endInput.startDate" :endDate="endInput.endDate"> 
      </mt-datetime-picker>
    </div>

    <div class="search-main">
      <div class="no-data" v-if="isnodata">
        <div class="no-data-icon"><img :src="require('@/assets/img/nodata_icon.png')"/></div> 
        <div class="no-data-text">暂无相关内容</div>
      </div>
      <search-list v-for="(item, index) in searchData" :key="index" 
        @tolink="tolinkFn(item.entrustNo, item.fundCode, item.fundName, item.businessCode, item.taCode, item.entrustDate, item.dividend)"
        :title="item.fundName?item.fundName+'('+item.fundCode+')' : '--'" :type="item.entrustType" 
        :money="item.entrustAmount" :share="item.entrustShare" :date="item.entrustDate" :status="item.orderStatus">
      </search-list>
    </div>
    
    
  </div>
</template>

<script>
import SearchList from '@/components/search/SearchList'
import { formatDate } from '@/public/filters.js'
import { queryHistoryEntrust } from '@/public/api.js'
export default {
  components: {
    SearchList
  },
  data () {
    return {
      jiankong: false,
      startInput: {
        initDate: null, // 初始化选择器中选中的日期
        pickerDate: '请选择日期', // input中展示的日期
        startDate: new Date('2002/01/01'),
        endDate: new Date()
      },
      endInput: {
        initDate: new Date(), // 初始化选择器中选中的日期
        pickerDate: '请选择日期', // input中展示的日期
        startDate: new Date('2002/01/01'),
        endDate: new Date()
      },
      searchData: [],
      page: {
        beginDate: '',
        endDate: '',
        userId: '1351295'
      },
      isnodata: false,
      /*解决页面层级相互影响滑动的问题 */
      handler: function(e){
        e.preventDefault()
      }
    }
  },
  mounted () {
    
    // 从缓存里面取上一次操作的日期
    const prevStartDate = window.sessionStorage.getItem('searchStartDate')
    const prevEndDate = window.sessionStorage.getItem('searchEndDate')
    // 如果缓存里有结束日期则用
    if (prevEndDate) {
      this.endInput.initDate = new Date(prevEndDate)
    }

    // 如果缓存里记录的有开始日期就用，如果没有的话（首次打开页面情况）就取当前日期的前三个月
    if (prevStartDate) {
      this.startInput.initDate = new Date(prevStartDate)
    } else {
      // 开始时间取三个月前的今天
      let oDate = new Date()
      let threeMonthsAgo = oDate.setMonth(oDate.getMonth()-3) // 三月前
      this.startInput.initDate = new Date(threeMonthsAgo)
    }

    // 设置日期选择框里默认日期跟外面input展示日期相同
    if (this.startInput.initDate) {
      this.startInput.pickerDate = this.startInput.initDate
    }

    // 设置日期选择框里默认日期跟外面input展示日期相同
    if (this.endInput.initDate) {
      this.endInput.pickerDate = this.endInput.initDate
    }

    // 同步初始化请求日期
    this.page.beginDate = formatDate(this.startInput.pickerDate, 'yyyyMMdd')
    this.page.endDate = formatDate(this.endInput.pickerDate, 'yyyyMMdd')

    // 初始化请求数据
    this.getData()
  },
  methods: {
    /*解决页面层级相互影响滑动的问题*/
    closeTouch () {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive:false})//阻止默认事件
    },
    openTouch () {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive:false})//打开默认事件
    },
    // 打开开始日期选择框
    openStartPicker () {
      this.$refs.startPicker.open()
      this.jiankong = true
    },
    // 确定选择开始日期
    startConfirm (date) {
      this.startInput.pickerDate = date
      this.jiankong = false
    },
    // 取消选择开始日期
    startCancel () {
      this.jiankong = false
    },
    // 打开结束日期选择框
    openEndPicker () {
      this.$refs.endPicker.open()
      this.jiankong = true
    },
    // 确定选择结束日期
    endConfirm (date) {
      this.endInput.pickerDate = date
      this.jiankong = false
    },
    // 取消选择开始日期
    endCancel () {
      this.jiankong = false
    },
    //获得上一年在昨天这一天的日期  
    getLastYearYestdy(date){  
      var strYear = date.getFullYear() - 1;    
      var strDay = date.getDate();    
      var strMonth = date.getMonth()+1;  
      if (strMonth<10) {    
        strMonth="0"+strMonth;    
      }  
      if(strDay<10) {    
        strDay="0"+strDay;    
      }  
      let datastr = strYear+"-"+strMonth+"-"+strDay;  
      return datastr;  
    },
    // 提交查询
    submit () {
      let normDate = this.getLastYearYestdy(this.endInput.pickerDate) // 结束日期的一年前
      let normFormatDate = formatDate(new Date(normDate), 'yyyy/MM/dd')  // 转换为一年前的参考基准线
      let minFormatDate = formatDate(this.startInput.pickerDate, 'yyyy/MM/dd') // 最低日期

      if (this.startInput.pickerDate <= this.endInput.pickerDate) {
        // 如果起止日期小于基准线 即跨度大于1年
        if (minFormatDate < normFormatDate) { 
          this.$toast('起止日期间隔不能超过1年')
        } else {
          // 确定查询的时候重置分页信息并请求数据
          this.page.beginDate = formatDate(this.startInput.pickerDate, 'yyyyMMdd')
          this.page.endDate = formatDate(this.endInput.pickerDate, 'yyyyMMdd')
          this.getData()
        }
      } else {
        this.$toast('起始日期应小于结束日期')
      }
    },
    // 查询数据
    getData () {
      queryHistoryEntrust(this.page).then((res) => {
        if (res.list.length == 0) {
          this.isnodata = true
        } else {
          this.isnodata = false
        }
        this.searchData = res.list
        // 请求数据完成后存储当前的开始和结束日期
        const searchStartDate = formatDate(this.startInput.pickerDate, 'yyyy/MM/dd')
        const searchEndDate = formatDate(this.endInput.pickerDate, 'yyyy/MM/dd')
        window.sessionStorage.setItem('searchStartDate', searchStartDate)
        window.sessionStorage.setItem('searchEndDate', searchEndDate)
      }).catch((err) => {
        console.log(err)
        this.$toast({
          message: '系统忙',
          position: 'bottom',
          duration: 3000
        })
      })
    },
    // 接收列表点击事件
    tolinkFn (entrustCode, fundCode, fundName, ywdm, taCode, entrustDate, dividend) {
      // ywdm 020认购，022申购，024赎回
      if (ywdm == '020' || ywdm == '022') {
        this.$router.push({
          path: '/entrust', 
          query: {
            entrustCode: entrustCode, 
            fundCode: fundCode, 
            fundName: fundName,
            entrustType: 3,
            entrustDate: entrustDate.replace(/-/g, '')
          } 
        })
      } else if (ywdm == '024') {
        this.$router.push({
          path: '/ransomEntrust', 
          query: {
            entrustNo: entrustCode, 
            fundCode: fundCode, 
            taCode: taCode,
            entrustType: 3,
            entrustDate: entrustDate.replace(/-/g, '')
          } 
        })
      } else if (ywdm == '029') {
        this.$router.push({
          path: '/distribution', 
          query: {
            fundCode: fundCode, 
            title: fundName,
            dividendType: dividend
          } 
        })
      } else {
        console.log(ywdm)
      }
    }
  },
  filters: {                 
    formatDate: formatDate  //时间转换
  },
  //侦听属性
  watch: {
    //jiankong 监控该值
    jiankong (val){
      if(val) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    }
  }
}
</script>

<style scoped>
.search{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.hanled-box-wrap{
  height: 1.2rem;
}
.hanled-box{
  height: 1.2rem;
  display: flex;
  background: #ffffff;
  padding: 0 .3rem;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #E4E4E4;
}
.hanled-l{
  display: flex;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hanled-btn{
  flex: 1;
  height: .8rem;
  border: 1px solid #E4E4E4;
  border-radius: .08rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: .28rem;
  color: #666666;
}
.hanled-btn:after{
  content: '';
  display: block;
  border-top: .1rem solid #666666;
  border-left: .08rem solid transparent;
  border-right: .08rem solid transparent;
  margin-left: .3rem;
  /* position: absolute;
  right: .2rem;
  top: 50%;
  margin-top: -.05rem; */
}
.hanled-abbr{
  width: .2rem;
  height: .03rem;
  background: #666666;
  margin: 0 .1rem;
}
.hanled-r{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: .8rem;
  background: #CE3533;
  border-radius: .08rem;
  font-size: .3rem;
  color: #FFFFFF;
  margin-left: .2rem;
}

.search-main{
  margin-top: .2rem;
  flex: 1;
  overflow-y: auto;
  -webkit-font-smoothing: antialiased;
 -webkit-overflow-scrolling: touch;
 -moz-overflow-scrolling: touch;
 -o-overflow-scrolling: touch;
 overflow-scrolling: touch;
}
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