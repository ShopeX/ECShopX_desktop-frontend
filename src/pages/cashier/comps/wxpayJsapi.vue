/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.cashier-wxpayjsapi {
  &__title {
    font-size: 28px;
    text-align: center;
    padding: 50px 0 30px;
  }
  &__warp {
    width: 600px;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="cashier-wxpayjsapi">
    <div class="cashier-wxpayjsapi__title">{{ $t('comps.wxpayJsapi.751517-0') }}</div>
    <div class="cashier-wxpayjsapi__warp">
      <div>{{ $t('comps.wxpayJsapi.751517-1') }} {{ payment_id }}</div>
    </div>
  </div>
</template>

<script>
import { log } from '@/utils'
export default {
  props: {
    tids: String,
    payment_id: String,
    pay_app_id: String,
    platform: String
  },
  created() {
    this.pay()
  },
  data() {
    return {
      payParams: null
    }
  },
  methods: {
    async pay() {
      const { openid } = this.$route.query
      const { tids, payment_id, pay_app_id, platform } = this
      let params = {
        payment_id,
        pay_app_id,
        platform,
        openid,
        tids
      }
      const { list } = await this.$api.trade.paymentdo(params)
      //   返回
      //   appId:
      //   timeStamp:
      //   nonceStr:
      //   package:
      //   signType:
      //   paySign:
      //   Url:
      this.payParams = list
      log.debug('[cashier]', `wxpayJsapi respond: ${list}`)
      this.callpay()
    },
    callpay() {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.onBridgeReady()
      }
    },
    onBridgeReady() {
      const { payment_id, pay_app_id, platform } = this
      const { openid } = this.$route.query
      let self = this
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke('getBrandWCPayRequest', self.payParams, (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          self.$router.push(
            '/finish/success?payment_id=' + payment_id + '&pay_app_id=' + pay_app_id
          )
        }
        if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          self.$router.push(
            '/finish/fail?payment_id=' +
              payment_id +
              '&pay_app_id=' +
              pay_app_id +
              '&platform=' +
              platform +
              '&openid=' +
              openid
          )
        }
      })
    }
  }
}
</script>
