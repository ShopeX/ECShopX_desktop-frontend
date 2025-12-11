/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.cashier-alipay {
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
  <div class="cashier-alipay">
    <div class="cashier-alipay__title">{{ $t('comps.alipay.268516-0') }}</div>
    <div class="cashier-alipay__warp">
      <div>{{ $t('comps.alipay.268516-1') }} {{ payment_id }}</div>
    </div>
  </div>
</template>

<script>
import S from '@/spx'
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
  methods: {
    async pay() {
      const { tids, payment_id, pay_app_id, platform } = this
      const form = document.createElement('form')
      form.setAttribute('method', 'get')
      let query = {
        format: 'json',
        v: 'v1',
        accessToken: S.getAuthToken(),
        method: 'api/h5app/wxapp/payment',
        payment_id,
        pay_app_id,
        platform,
        tids
      }
      let action = `${process.env.VUE_APP_API_BASE_URL}`
      form.setAttribute('method', 'get')
      // form.setAttribute('target', '_blank')
      form.setAttribute('action', action)
      form.innerHTML = Object.keys(query)
        .map((p) => {
          return `<input type="hidden" name="${p}" value="${query[p]}" />`
        })
        .join('')
      document.body.appendChild(form)
      form.submit()
    }
  }
}
</script>
