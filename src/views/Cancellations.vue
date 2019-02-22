<template>
  <div class="cancellations-box">
    <div class="cancellations">
      <steps>
        <step title="申请撤单" msg="" current="success"></step>
        <step title="撤单成功" msg="实时退回到资金账户"></step>
      </steps>
      <div class="main">
        <hb-title text="订单详情"></hb-title>
        <hb-cell title="订单号" text="--"></hb-cell>
        <hb-cell title="名称" text="万家共赢歌斐诺宝精选组合1号"></hb-cell>
        <hb-cell title="代码" text="SD001"></hb-cell>
        <hb-cell title="退款金额" :text="10000000 | currency('元')"></hb-cell>
        <hb-cell title="当前状态">
          <span class="red">已撤单</span>
        </hb-cell>
      </div>
    </div>
  </div>
</template>

<script>
import HbTitle from '@/components/HbTitle'
import HbCell from '@/components/HbCell'
import Steps from '@/components/steps/Steps'
import Step from '@/components/steps/Step'
import { currency } from "@/public/filters.js";
export default {
  components: {
    Steps,
    Step,
    HbTitle,
    HbCell
  },
  data () {
    return {
      
    }
  },
  created () {
  },
  methods: {

  },
  filters: {
    currency: currency
  }
}
</script>

<style>
.cancellations{
  height: calc(100vh);
  background: #ffffff;
}
.main{
  border-top: .2rem solid #f6f6f6;
}
</style>