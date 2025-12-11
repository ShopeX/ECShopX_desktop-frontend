/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<style lang="scss" src="./checkout.scss"></style>

<template>
  <div class="page-cart page-checkout page-body">
    <div class="container">
      <h2 class="page-title">{{ $t('cart.checkout-old.371702-0') }}</h2>

      <div class="cart-wrap">
        <div class="cart-side" v-if="total">
          <div class="checkout-total">
            <div class="checkout-total-count">{{ $t('cart.checkout-old.371702-1') }} {{ total.totalQuantity }} {{ $t('cart.checkout-old.371702-2') }}</div>
            <div class="checkout-item">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-3') }}</div>
              <div class="checkout-item__bd"><SpPrice :value="total.totalPrice" /></div>
            </div>
            <div class="checkout-item">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-4') }}</div>
              <div class="checkout-item__bd"><SpPrice :value="total.postFee" /></div>
            </div>
            <div class="checkout-item" v-if="total.totalDiscount > 0">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-5') }}</div>
              <div class="checkout-item__bd">-<SpPrice :value="total.totalDiscount" /></div>
            </div>
            <div class="checkout-item" v-if="total.memberDiscount > 0">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-6') }}</div>
              <div class="checkout-item__bd">-<SpPrice :value="total.memberDiscount" /></div>
            </div>
            <div class="checkout-item" v-if="total.pointDiscount > 0">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-7') }}</div>
              <div class="checkout-item__bd">-<SpPrice :value="total.pointDiscount" /></div>
            </div>
            <div class="checkout-item">
              <div class="checkout-item__hd">{{ $t('cart.checkout-old.371702-8') }}</div>
              <div class="checkout-item__bd"><SpPrice :value="total.totalPay" /></div>
            </div>
          </div>

          <div class="cart-sec">
            <div class="cart-sec-hd">{{ $t('cart.checkout-old.371702-9') }}</div>
            <div class="cart-sec-bd">
              <Payments :value="payment" :list="payments" @change="handlePaymentChange" />
            </div>
          </div>

          <div class="cart-sec">
            <div class="cart-sec-hd">{{ $t('cart.checkout-old.371702-10') }}</div>
            <div class="cart-sec-bd">
              <SpRadio class="invoice-radio" type="checkbox" @change="handleToggleInvoiceEditor"
                >{{ $t('cart.checkout-old.371702-11') }}</SpRadio
              >
              <InvoiceEditor
                v-if="isInvoiceEditorShow"
                ref="form-invoice"
                v-model="invoice.invoice_content"
              />
            </div>
          </div>

          <div class="checkout-actions">
            <SpButton type="primary" @click="handleCheckout">{{ $t('cart.checkout-old.371702-12') }}</SpButton>
          </div>
        </div>

        <div class="cart-main" v-if="total">
          <div class="cart-sec cart-address">
            <div class="cart-sec-hd">
              <span
                v-if="addressList && addressList.length > 0"
                class="btn-edit"
                @click="toggleAddressPicker"
                >{{ $t('cart.checkout-old.371702-13') }}</span
              >
              <h3 class="address-h">{{ $t('cart.checkout-old.371702-14') }}</h3>
            </div>
            <div class="cart-sec-bd">
              <div v-if="address" class="address-info">
                <p>{{ address.name }}</p>
                <p>{{ address.mobile }}</p>
                <p>{{ address.area.replace(/\//g, '').replace(/\s*/g, '') }}{{ address.addr }}</p>
                <p>{{ address.zip }}</p>
              </div>
              <SpDpTransition>
                <MemberAddressPicker
                  v-if="isAddressPickerShow"
                  v-model="address"
                  :list="addressList"
                  :isBag="isStaffAddress"
                  @change="handleChooseAddress"
                />
              </SpDpTransition>
              <template v-if="!address && !isAddressPickerShow">
                <div class="address-info__label">{{ $t('cart.checkout-old.371702-15') }}</div>
                <div class="address-info__addbtn">
                  <SpButton type="primary" class="button-dark" @click="toggleAddressPicker"
                    >{{ $t('cart.checkout-old.371702-16') }}</SpButton
                  >
                </div>
              </template>
            </div>
          </div>

          <!-- <div class="cart-sec checkout-transport">
            <div class="cart-sec-hd">配送方式</div>
            <div class="cart-sec-bd">
              <p class="checkout-transport__text">运费:<SpPrice :value="shipping.allPostfee" /></p>
              <p class="checkout-transport__text">默认顺丰</p>
            </div>
          </div> -->

          <div
            class="cart-sec coupon-group"
            v-if="couponList && couponList.length > 1 && !usePoint"
          >
            <div class="cart-sec-bd">
              <div class="coupon-group">
                <SpSelect
                  class="coupon-group__select"
                  :value="couponCode"
                  :placeholder="couponList.length > 0 ? $t('cart.checkout-old.371702-17') : $t('cart.checkout-old.371702-18')"
                  :disabled="couponList.length == 0 || !!code"
                  :data="couponList"
                  @change="handleChangeCoupon"
                />
              </div>
            </div>
          </div>

          <Point
            v-if="pointEnabled && !couponCode"
            :total="memberPoint"
            :value="{ usePoint, value: point }"
            @change="handleChangePoint"
          />

          <div class="cart-group" v-for="(group, idx) in list" :key="idx">
            <div class="cart-item-wrap" v-for="item in group.items" :key="item.cart_id">
              <CartItem :info="item" :has-selection="false" no-actions> </CartItem>
            </div>
          </div>

          <no-ssr>
            <div class="cart-sec" v-if="showGift">
              <div class="gift-info" v-for="(gitem, index) in giftList" :key="index">
                <CartGift :info="gitem" :hasSelection="false" />
              </div>
            </div>
          </no-ssr>

          <div class="cart-bottom-tips">{{ $t('cart.checkout-old.371702-19') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { isNativeBrower, isMobile } from '@/utils'
import { resolveCartData } from './helper'
import CartItem from './comps/cart-item'
import CartGift from './comps/cart-gift'
import Payments from './comps/payments'
import InvoiceEditor from './comps/invoice-editor'
import MemberAddressPicker from './comps/member-address-picker'
import Point from './comps/point'

export default {
  components: { Payments, CartItem, MemberAddressPicker, InvoiceEditor, Point, CartGift },

  data() {
    return {
      mode: '',
      list: [],
      total: null,
      md5_cart_info: '',
      address: null,
      addressList: null,
      payment: '',
      payments: [],
      pointEnabled: false,
      invoice: {
        invoice_type: 'notuse',
        invoice_content: {}
      },
      staff_sale: null,
      couponList: [],
      couponCode: '', // 优惠券
      code: '', // 优惠码
      memberPoint: 0, // 会员总积分
      usePoint: false,
      point: 0, // 使用积分
      isAddressPickerShow: false,
      giftList: [],
      showGift: false,
      showPromotion: false,
      secret: {}, // 分销信息
      shipping: {}
    }
  },

  mounted() {
    const { mode } = this.$route.query
    this.mode = mode

    this.fetch().then(() => {
      this.fetchAddress()
      this.fetchPoint()
    })
    this.fetchPayments()
    this.getStorageSecretCode()
  },

  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    // 员工地址 福袋不可以新增地址
    isStaffAddress() {
      return this.list.some((group) => group.items.some((o) => o.product_type === 'bag'))
    },
    isInvoiceEditorShow() {
      return this.invoice.invoice_type === 'normal'
    }
  },

  methods: {
    async fetchAddress() {
      if (this.isStaffAddress) {
        // 员工地址
        const addressList = await this.$api.staff.addressList()
        const list = addressList.map((item) => {
          const { addr_id, name: storename, area, addr } = item
          const addrdetail = `${area.replace(/\//g, '')}${addr}`

          return {
            addr_id,
            storename,
            addrdetail,
            area,
            addr
          }
        })
        this.addressList = list
      } else {
        const { list } = await this.$api.member.addressList()
        this.addressList = list
      }
    },
    async fetchPayments() {
      const { openid } = this.$route.query || {}
      const from_weixin = isNativeBrower() ? 0 : 1
      const platform = isMobile() ? 'iswap' : 'ispc'

      // 微信浏览器下 已授权openid
      // 非微信浏览器
      // 微信浏览器下 pc模式
      if ((!isNativeBrower() && openid) || isNativeBrower() || (!isNativeBrower() && !isMobile())) {
        const { payments } = await this.$api.trade.paymentList({
          from_weixin,
          platform,
          openid
        })
        this.payments = payments
        if (!this.payment) this.payment = payments[0].app_id
      } else {
        // 微信授权，获取openid
        const { code_url } = await this.$api.trade.paymentList({
          from_weixin,
          platform,
          redirect_uri: window.location.href
        })
        // console.log(code_url)
        window.location.href = code_url
      }
    },
    async fetch() {
      this.$loading({ background: 'transparent' })

      const params = {
        mode: this.mode
      }
      if (this.couponCode) {
        params.use_coupon = true
      }
      if (this.usePoint && this.point && this.pointEnabled) {
        params.use_point = this.point
      }

      let res = {}
      try {
        res = await this.$api.cart.checkout(params)
      } catch (res) {
        console.log(res)
        this.$loading().close()
        return
      }
      const {
        cartInfo,
        checked_addr,
        total,
        shipping,
        md5_cart_info,
        staff_sale,
        userPoint = {}
      } = res
      this.pointEnabled = Boolean(userPoint.is_open)

      if (!cartInfo) {
        this.$loading().close()
        return
      }

      if (!this.address) {
        this.address = checked_addr
      }

      if (staff_sale) {
        this.staff_sale = staff_sale
      }

      this.shipping = {
        ...shipping,
        allPostfee: total.allPostfee
      }

      this.total = { ...cartInfo.totalCart } || {}
      const { hasItems, list, coupons, showGift, showPromotion, giftList } = resolveCartData(
        cartInfo.resultCartData
      )
      let couponList = coupons
      this.$loading().close()

      // 没有checkout数据， 跳转到购物车
      if (!hasItems || list.length === 0) {
        this.$router.push('/cart')
        return
      }

      // 商品大于1件，过滤掉生日券
      const goodsLen = this.total.totalQuantity
      if (goodsLen > 1) {
        couponList = coupons.filter((item) => item.coupon_nature !== 'birthday_coupon')
      }

      this.list = list
      this.couponList = couponList
      this.md5_cart_info = md5_cart_info
      this.giftList = giftList
      this.showGift = showGift
      this.showPromotion = showPromotion
    },
    async fetchPoint() {
      const { points } = await this.$api.cart.userPoint({
        total_price: this.total.totalPrice,
        post_fee: 0,
        mode: this.mode
      })
      this.memberPoint = points
    },
    getStorageSecretCode() {
      try {
        const secret = JSON.parse(sessionStorage.getItem('secret') || '{}')
        if (secret) {
          this.secret = secret
        }
      } catch (res) {
        console.log(res)
      }
    },
    handleToggleInvoiceEditor(val) {
      const invoice_type = val ? 'normal' : 'notuse'
      this.invoice = {
        ...this.invoice,
        invoice_type
      }
      // if (invoice_type !== 'notuse') {
      //   this.isInvoiceEditorShow = true
      // } else {
      //   this.isInvoiceEditorShow = false
      // }
    },
    // 地址选择
    toggleAddressPicker(isShow) {
      this.isAddressPickerShow = isShow !== undefined ? isShow : !this.isAddressPickerShow
    },
    async useCoupon(coupon) {
      const mode = this.mode
      const item = this.couponList.find((c) => c.coupon_code === coupon.coupon_code)

      // 标品 coupon_code
      // await this.$api.promotion.useCoupon({
      //   mode,
      //   platform: 'app',
      //   coupon_code: code
      // })
      await this.$api.promotion.useCoupon({
        mode,
        platform: 'app',
        coupon_id: item.coupon_id,
        coupon_code: item.coupon_code
      })
    },
    async cancelCoupon(code) {
      await this.$api.promotion.cancelCoupon({
        coupon_code: code
      })
    },
    async handleChangePoint(data) {
      if (this.couponCode) {
        this.$Message.error(this.$t('cart.checkout-old.371702-20'))
      }
      const { usePoint, value: point } = data
      if (usePoint !== undefined) this.usePoint = usePoint
      if (point !== undefined) this.point = point
      await this.fetch()

      // if (this.usePoint && this.point) {
      // }
    },
    // 选择优惠券
    async handleChangeCoupon(coupon) {
      if (this.usePoint) {
        this.$Message.error(this.$t('cart.checkout-old.371702-20'))
      }
      try {
        if (coupon) {
          this.couponCode = coupon
          await this.useCoupon({
            coupon_code: coupon
          })
        } else if (this.couponCode) {
          await this.cancelCoupon(this.couponCode)
          this.couponCode = null
        }
        await this.fetch()
      } catch (e) {
        console.info(e)
      }
    },
    // 输入优惠码
    async handleChangeCode(e) {
      try {
        const code = e.target.value.trim()

        if (code) {
          this.code = code
          await this.useCoupon({
            coupon_code: code
          })
        } else if (this.code) {
          await this.cancelCoupon({
            coupon_code: code
          })
          this.code = null
        }
        await this.fetch()
      } catch (e) {
        console.info(e)
      }
    },
    handlePaymentChange(payment) {
      this.payment = payment
      this.$track('pay_type', payment)
    },
    handleChooseAddress(address, list) {
      let addr
      // 福袋员工地址
      if (this.isStaffAddress) {
        addr = {
          ...this.address,
          ...address,
          area: address.area.replace(/\//g, ''),
          addr: address.addr + address.storename
        }
      } else {
        addr = {
          ...this.address,
          ...address
        }
      }

      this.address = addr
      this.addressList = list
      this.isAddressPickerShow = false

      // 地址切换，如果已经使用了优惠券(后台已经取消了当前优惠券)
      if (this.couponCode || this.code) {
        this.couponCode = null
        this.code = null
        this.fetch()
      }
    },
    handleClickItem(item) {
      this.$router.push(`/items/${item.item_id}`)
    },
    handleClickGoCart() {
      this.$router.push('/cart')
    },
    getParams() {
      const { mode } = this.$route.query
      const { addr_id } = this.address
      const shipping_type = []
      const { invoice_type, invoice_content } = this.invoice
      const { secret_code, type } = this.secret || {}

      this.list.forEach((v, idx) => {
        shipping_type.push({
          shop_id: v.shop_id,
          type: v.shipping.shipping_type
        })
      })

      const params = {
        mode,
        addr_id,
        payment_type: 'online',
        shipping_type: JSON.stringify(shipping_type), // 配送方式
        md5_cart_info: this.md5_cart_info, // 购物车数据校验
        source_from: 'app', // 使用平台
        invoice_type,
        invoice_content: invoice_content && JSON.stringify(invoice_content)
      }
      if (this.usePoint && this.pointEnabled) {
        params.use_point = this.point
      }
      if (this.staff_sale) {
        params.staff_sale = this.staff_sale
      }
      if (secret_code && type) {
        params.secret_code = secret_code
        params.shareType = type
      }

      return params
    },
    validInvoice() {
      let result = false
      const refInvoiceComp = this.$refs['form-invoice']
      const refForm = refInvoiceComp.$refs['form-submit']
      refForm.validate((valid, errors) => {
        if (valid) {
          result = true
        }
      })
      return result
    },
    async handleCheckout() {
      if (!this.address) {
        this.$Message.error(this.$t('cart.checkout-old.371702-21'))
        return
      }

      if (!this.payment) {
        this.$Message.error(this.$t('cart.checkout-old.371702-22'))
        return
      }

      if (this.invoice.invoice_type !== 'notuse') {
        const result = this.validInvoice()
        if (!result) {
          return
        }
      }

      const params = this.getParams()
      const { payment_id, tids } = await this.$api.trade.create(params)
      this.$store.dispatch('cart/getCartInfo')

      const query = {
        tids: tids[0],
        payment_id,
        pay_app_id: this.payment,
        platform: 'pc'
      }

      const { openid } = this.$route.query
      if (openid) {
        query.openid = openid
      }

      if (this.payment === 'alipay') {
        this.$router.push({
          path: '/finish',
          query
        })
        window.open(`${window.location.origin}/cashier?${qs.stringify(query)}`, '_blank')
      } else {
        this.$router.push({
          path: '/cashier',
          query
        })
      }
    }
  }
}
</script>
