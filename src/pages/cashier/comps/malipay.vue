/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.cashier-wxqrpay {
  &__title {
    font-size: 28px;
    text-align: center;
    padding: 50px 0 30px;
  }
  &__warp {
    margin: 0 auto;
  }
  &__wxbarcode {
    position: relative;
    width: 742px;
    height: 406px;
    background: url('~assets/imgs/window-wx.jpg') no-repeat center;
    background-size: cover;
    text-align: center;
    margin: 0 auto;
    img {
      position: absolute;
      width: 180px;
      left: 90px;
      top: 125px;
    }
  }
}
</style>

<template>
  <div class="cashier-wxqrpay">
    <div class="cashier-wxqrpay__title">{{ $t('comps.malipay.452906-0') }}</div>
    <div class="cashier-wxqrpay__warp">
      <div class="cashier-wxqrpay__wxbarcode">
        <img :src="qrcode_url" alt width="630" />
      </div>
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
      qrcode_url: ''
    }
  },
  methods: {
    async pay() {
      const { tids, payment_id, pay_app_id, platform } = this
      let params = {
        payment_id,
        pay_app_id,
        platform,
        tids
      }
      const { list } = await this.$api.trade.paymentdo(params)
      log.debug('[cashier]', `malipay respond: ${list.mweb_url}`)
      this.qrcode_url = list.qrcode_url
    }
  }
}
</script>
