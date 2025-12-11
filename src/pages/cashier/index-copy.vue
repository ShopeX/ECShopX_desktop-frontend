/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<script>
import Wxqrpay from './comps/wxqrpay'
import Alipay from './comps/alipay'
import WxpayH5 from './comps/wxpayH5'
import WxpayJsapi from './comps/wxpayJsapi'
import Malipay from './comps/malipay'
import qs from 'qs'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'

import { log } from '@/utils'

export default {
  data() {
    return {
      payment_id: null, // 支付单号
      pay_app_id: null, // 支付方式(wxqrpay、wxpayH5、wxpayJsapi、alipay、malipay)
      platform: null,
      done: false
      // timer: null,
      // qrcode_url: null
    }
  },
  created() {
    const { payment_id, pay_app_id, platform } = this.$route.query
    // console.log(`${qs.stringify(this.$route.query)}`)
    this.payment_id = payment_id
    this.pay_app_id = pay_app_id
    this.platform = platform
    this.fetch()
  },
  components: {
    Wxqrpay,
    Alipay,
    WxpayH5,
    WxpayJsapi,
    Malipay
  },
  mounted() {
    // // 发起支付
    // this.payment()
    // this.timer = setInterval(() => {
    //   if (this.payment_id) {
    //     // this.tradePaymentFinish()
    //   }
    // }, 3000)
  },
  methods: {
    async fetch() {
      const res = await this.$api.trade.tradeList({
        payment_id: this.payment_id
        // accessToken: S.getAuthToken()
      })
      let paymentMethod = 'WeChat'
      if (
        this.pay_app_id === 'alipay' ||
        this.pay_app_id === 'malipay' ||
        this.pay_app_id === 'testpay'
      ) {
        paymentMethod = 'AliPay'
      }
      let order = res[0]
      let product = []
      for (let pro of order.order) {
        product.push({
          id: pro.item_id,
          name: pro.title,
          price: pro.price,
          sku: pro.bn,
          style: pro.style,
          quantity: pro.num,
          discountAmount: 0,
          discountCode: ''
        })
      }
      let ecommerce = {
        checkoutStepName: 'Billing',
        paymentMethod,
        tax: 0,
        shipping: 0,
        giftCardAmount: 0,
        orderTotal: parseFloat(order.payment),
        orderSubTotal: parseFloat(order.payment),
        orderDiscount: parseFloat(order.discount_fee),
        shippingMethod: order.shipping_type,
        promoCode: order.couponCode,
        product
      }
      analytics.pageReady({
        page: {
          pageName: 'Checkout: Payment - ' + paymentMethod,
          pageType: 'checkout',
          breadcrumb: 'Checkout'
        },
        ecommerce
      })
      this.done = true
    }
  },
  render(h) {
    const { tids, payment_id, pay_app_id, platform } = this.$route.query
    // log.debug('[cashier]', {
    //   payment_id, pay_app_id, platform
    // })
    if (!this.done) {
      return null
    }
    return (
      <div class='page-cashier page-body container'>
        <no-ssr>
          {pay_app_id === 'wxqrpay' && (
            <Wxqrpay
              tids={tids}
              payment_id={payment_id}
              pay_app_id={pay_app_id}
              platform={platform}
            ></Wxqrpay>
          )}
          {(pay_app_id === 'alipay' || pay_app_id === 'malipay' || pay_app_id === 'testpay') && (
            <Alipay
              tids={tids}
              payment_id={payment_id}
              pay_app_id={pay_app_id}
              platform={platform}
            ></Alipay>
          )}
          {pay_app_id === 'wxpayH5' && (
            <WxpayH5
              tids={tids}
              payment_id={payment_id}
              pay_app_id={pay_app_id}
              platform={platform}
            ></WxpayH5>
          )}
          {pay_app_id === 'wxpayjsapi' && (
            <WxpayJsapi
              tids={tids}
              payment_id={payment_id}
              pay_app_id={pay_app_id}
              platform={platform}
            ></WxpayJsapi>
          )}
        </no-ssr>
      </div>
    )
  }
  // methods: {
  // async tradePaymentFinish () {
  //   const { rs } = await this.$api.trade.tradePaymentFinish(this.payment_id)
  //   if (rs.status === 'succ') {
  //     clearInterval(this.timer)
  //     this.$router.replace('/success')
  //   } else if (rs.status === 'failed') {
  //     clearInterval(this.timer)
  //     this.$router.replace(`/fail?payment_id=${this.payment_id}&pay_app_id=${this.pay_app_id}`)
  //   }
  // },
  // async payment () {
  //   const { payment_id, pay_app_id, platform } = this
  //   let params = {
  //     payment_id,
  //     pay_app_id,
  //     platform
  //   }
  //   if (pay_app_id === 'alipay') {
  //     const form = document.createElement('form')
  //     form.setAttribute('method', 'get')

  //     let query = {
  //       format: 'json',
  //       v: 'v1',
  //       accessToken: S.getAuthToken(),
  //       method: 'trade.payment.do',
  //       payment_id,
  //       pay_app_id,
  //       platform
  //     }

  //     let action = `${process.env.VUE_APP_API_BASE_URL}`

  //     form.setAttribute('method', 'get')
  //     form.setAttribute('target', '_blank')
  //     form.setAttribute('action', action)
  //     form.innerHTML = Object.keys(query).map(p => {
  //       return `<input type="hidden" name="${p}" value="${query[p]}" />`
  //     }).join('')
  //     document.body.appendChild(form)
  //     form.submit()
  //   } else if (pay_app_id === 'wxqrpay') {
  //     // pc 微信
  //     const { list } = await this.$api.trade.paymentdo(params)
  //     this.qrcode_url = list.qrcode_url
  //   } else if (pay_app_id === 'wxpayjsapi') {
  //     // 微信浏览器
  //     // pc 微信
  //     await this.$api.trade.paymentdo(params)
  //   } else if (pay_app_id === 'wxpayH5' || pay_app_id === 'malipay') {
  //     // h5 微信
  //     const { list } = await this.$api.trade.paymentdo(params)
  //     console.log(list.mweb_url)
  //     window.location.href = list.mweb_url
  //   }
  // }
  // }
}
</script>
