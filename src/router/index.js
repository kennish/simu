import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'
import ProductLists from '@/views/ProductLists'
import ProductDetails from '@/views/ProductDetails'
import Contract from '@/views/Contract'
import Order from '@/views/Order'
import ConfirmOrder from '@/views/ConfirmOrder'
import Entrust from '@/views/Entrust'
import TakePosition from '@/views/TakePosition'
import TakePositionDetails from '@/views/TakePositionDetails'
import RansomList from '@/views/RansomList'
import Ransom from '@/views/Ransom'
import RansomEntrust from '@/views/RansomEntrust'
import Cancellations from '@/views/Cancellations'
import Distribution from '@/views/Distribution'
import Search from '@/views/Search'
import OpenAccount from '@/views/OpenAccount'
import Entrance from '@/views/Entrance'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Entrance',
      component: Entrance,
      meta:{
        index: 0,
        title: '私募基金'
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        index: 1,
        title: '私募基金'
      }
    },
    {
      path: '/productLists',
      name: 'ProductLists',
      component: ProductLists,
      meta: {
        index: 2,
        title: '私募基金产品列表'
      }
    },
    {
      path: '/productDetails',
      name: 'ProductDetails',
      component: ProductDetails,
      meta: {
        index: 4,
        title: '产品详情'
      }
    },
    {
      path: '/contract',
      name: 'Contract',
      component: Contract,
      meta: {
        index: 5,
        title: '签订合同'
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        index: 6,
        title: '填写订单'
      }
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
      meta: {
        index: 7,
        title: '确认订单信息'
      }
    },
    {
      path:'/entrust',
      name: 'Entrust',
      component: Entrust,
      meta: {
        index: 8,
        title: '委托详情'
      }
    },
    {
      path: '/cancellations',
      name: 'Cancellations',
      component: Cancellations,
      meta: {
        index: 9
      }
    },
    {
      path: '/takePosition',
      name: 'TakePosition',
      component: TakePosition,
      meta: {
        index: 2,
        title: '我的持仓'
      }
    },
    {
      path: '/takePositionDetails',
      name: 'TakePositionDetails',
      component: TakePositionDetails,
      meta: {
        index: 3,
        title: '持仓详情'
      }
    },
    {
      path: '/ransom',
      name: 'Ransom',
      component: Ransom,
      meta: {
        index: 4,
        title: '填写赎回份额'
      }
    },
    {
      path: '/ransomList',
      name: 'RansomList',
      component: RansomList,
      meta: {
        index: 2,
        title: '可赎回列表'
      }
    },
    {
      path: '/ransomEntrust',
      name: 'RansomEntrust',
      component: RansomEntrust,
      meta: {
        index: 5,
        title: '赎回详情'
      }
    },
    {
      path: '/distribution',
      name: 'Distribution',
      component: Distribution,
      meta: {
        index: 4,
        title: '选择分红方式'
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        index: 2,
        title: '订单查询'
      }
    },
    {
      path: '/openAccount',
      name: 'OpenAccount',
      component: OpenAccount,
      meta: {
        index: 2,
        title: '基金公司列表'
      }
    }
  ]
})

export default router

router.afterEach(function (to, from) {
  window.scrollTo(0, 0)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '私募基金'
  }
})
