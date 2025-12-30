/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="widget-0010" :style="widgetStyle">
    <slot></slot>
    <div class="widget-0010-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-0010-body widget-body" :style="widgetBodyStyle">
        <div class="minicart-wrap">
          <div
            class="minicart-btn"
            :style="{
              backgroundColor: getThemeColor,
              color: value.wgtTextColor,
              border: `${value.wgtBorderRadius}px solid ${value.wgtAaaa}`
            }"
          >
            <i class="new_iconfont icon-new-pc-cart" :style="{ color: value.wgtTextColor }"></i>
            {{ $t('W0010.index.258451-0') }}

            <span class="count" v-if="true" :style="{ background: value.wgtTextColor }">{{
              cartTotal
            }}</span>
          </div>
          <div class="minicart-list" v-if="isRenderMode()">
            <div class="cart-main-wrap">
              <div class="cart-main" v-for="(item, index) in cartInfo" :key="`shop-cart__${index}`">
                <div
                  class="cart-sub"
                  v-for="(sitem, sindex) in item.list"
                  :key="`cart-item__${sindex}`"
                >
                  <linkPage class="cart-item" :mode="mode" :to="`/items/${sitem.item_id}`">
                    <div class="goods-image">
                      <img :src="sitem.pics" alt="" width="60" height="60" />
                    </div>
                    <div class="goods-info-warp">
                      <div class="goods-info__name">{{ sitem.item_name }}</div>
                      <div class="goods-info__ft">
                        <goodsPrice class="goods-price" :value="sitem.price / 100"></goodsPrice>
                        <span class="goods-num">{{ `x ${sitem.num}` }}</span>
                      </div>
                    </div>
                  </linkPage>
                </div>
              </div>
            </div>
            <div class="cart-total">
              <div class="cart-total__hd">
                {{ $t('W0010.index.258451-1', [cartInfo ? getCartTotal(cartInfo).totalCount : '']) }}
                <goodsPrice
                  class="goods-price"
                  :value="cartInfo ? getCartTotal(cartInfo).totalPrice / 100 : 0"
                ></goodsPrice>
              </div>
              <div class="cart-total__bd">
                <div class="btn btn-cart" @click="handleClickCart">{{ $t('W0010.index.258451-2') }}</div>
                <!-- <div
                  class="btn btn-checkout"
                  :style="{ backgroundColor: getThemeColor, color: value.wgtTextColor }"
                  @click="handleClickCheckout"
                >
                  结算
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'
import { goodsPrice } from '../../common/comps'
const WIDGET_NAME = 'W0010'

export default {
  name: WIDGET_NAME,
  icon: 'icon-gouwuche',
  title: '购物车',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  setting: {
    // 元件名称
    name: '购物车',
    alias: '购物车',
    text: '购物车',
    type: WIDGET_NAME,
    ...attrs,
    fontSize: 14,
    width: 110,
    height: 38,
    heightDisabled: true,
    data: {},
    wgtTheme: '#000000ff',
    wgtTextColor: '#ffffffff',
    wgtAaaa: '#ffffffff',
    wgtBorderRadius: 0
  },
  components: {
    goodsPrice,
    linkPage
  },
  data() {
    return {
      cartTotal: 0
    }
  },
  computed: {
    cartInfo() {
      if (this.isRenderMode()) {
        const { cartInfo } = this.$store.state.cart
        return cartInfo ? cartInfo.valid_cart : null
      } else {
        return null
      }
    },
    loginStatus() {
      if (this.isRenderMode()) {
        const { token } = this.$store.state.user
        return token ? true : false
      } else {
        return false
      }
    }
  },
  mounted() {
    // inLayout
    if (this.inLayout) {
      this.value.heightDisabled = true
      this.value.widthDisabled = true
    }
  },
  methods: {
    getCartTotal(cartInfo) {
      if (cartInfo) {
        let totalPrice = 0
        let totalCount = 0
        cartInfo.forEach((item) => {
          totalPrice += item.list.reduce((prev, cur) => {
            return Number(cur.total_fee) * cur.num + prev
          }, 0)

          totalCount += item.list.reduce((prev, cur) => {
            return Number(cur.num) + prev
          }, 0)
        })

        this.cartTotal = totalCount
        return {
          totalPrice,
          totalCount
        }
      }
    },
    // 进入购物车
    handleClickCart() {
      if (this.isRenderMode()) {
        this.$router.push('/cart')
      }
    },
    // 结算
    handleClickCheckout() {
      if (this.isRenderMode()) {
        this.$router.push('/cart/checkout?mode=cart')
      }
    }
  }
}
</script>
