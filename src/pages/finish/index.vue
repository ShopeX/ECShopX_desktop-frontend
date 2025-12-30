/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-finish {
  text-align: center;
  .txt {
    font-size: 20px;
    padding: 100px 0;
  }
}
</style>

<template>
  <div class="page-finish page-body container">
    <div class="txt">{{ $t('finish.index.507775-0') }}</div>
  </div>
</template>

<script>
import { log } from '@/utils'
import { getTradeOrderDetail } from '@/api/member'
import qs from 'qs'

export default {
  data() {
    return {
      times: 0,
      max: 2
    }
  },
  created() {
    const { out_trade_no } = this.$route.query
    this.getTradeOrderDetailFunc(out_trade_no)
  },
  methods: {
    async getTradeOrderDetailFunc(out_trade_no) {
      const {
        trade_state,
        total_fee,
        order_id,
        order_class,
        trade_source_type
      } = await getTradeOrderDetail({ trade_id: out_trade_no })
      let payStatus = trade_state === 'SUCCESS' ? 'PAYED' : 'ERROR'
      let orderClass = trade_source_type === 'normal' ? 'normal' : ''
      this.$router.push(
        '/finish/result?order_id=' +
          order_id +
          '&order_class=' +
          orderClass +
          '&total_fee=' +
          total_fee +
          '&pay_status=' +
          payStatus
      )
    }
    // async tradePaymentFinish () {
    //   const { payment_id, pay_app_id } = this.$route.query
    //   log.debug(`payment_id: ${payment_id}`)
    //   if (payment_id) {
    //     const { rs } = await this.$api.trade.tradePaymentFinish(payment_id)
    //     if (rs.status === 'succ') {
    //       this.$router.push('/finish/success?payment_id=' + payment_id + '&pay_app_id=' + pay_app_id)
    //     } else {
    //       this.times++
    //       setTimeout(() => {
    //         // alipay时候不需要判断轮训次数
    //         if (this.times >= this.max && pay_app_id !== 'alipay') {
    //           this.$router.push(`/finish/fail?${qs.stringify(this.$route.query)}`)
    //         } else {
    //           this.tradePaymentFinish()
    //         }
    //       }, 3000)
    //     }
    //   }
    // }
  }
  // render (h) {
  //   return (<div >正在支付....</div>)
  // }
}
</script>
