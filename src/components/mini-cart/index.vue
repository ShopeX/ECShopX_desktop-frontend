/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-mini-cart {
  position: relative;
  display: inline-block;
  z-index: $z-index-dropdown;
  .aicon-bag {
    font-size: 18px;
    // color: $color-black;
  }
  .badge {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 3px;
    bottom: -3px;
    // color: #000000;
    line-height: 16px;
    text-align: center;
    font-size: 10px;
  }
  &__list {
    position: absolute;
    top: 38px;
    right: 0px;
    z-index: $z-index-modal;
    width: 300px;
    background: #fff;
    z-index: $z-index-level-11;
    border: 1px solid $color-divider;
    line-height: initial;
    box-shadow: 1px 3px 5px 0 rgba(0, 0, 0, 0.2);
    &.fixed {
      position: fixed;
      z-index: 10001;
      top: 47px;
    }
    &-header {
      margin: 0 10px;
      padding: 10px 0 5px;
      border-bottom: 1px double $color-divider;
      font-weight: bold;
    }
    &-body {
      max-height: 300px;
      padding: 10px;
      overflow-y: auto;
      &.mb {
        display: none;
      }
      .t-num-price {
        margin-top: 10px;
        .t-num {
          margin-right: 6px;
          .sp-num-input__input {
            width: 25px;
          }
        }
        .t-price {
          color: $color-invalid;
          // position: relative;
          // top: 2px;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    &-footer {
      .total {
        padding: 10px;
        background: #efefef;
        // color: #fff;
      }
      .view-cart {
        text-align: center;
        margin: 20px 0 10px;
      }
      .cart-checkout {
        text-align: center;
        margin: 10px 0;
        padding: 0 15px;
        .sp-btn {
          width: 100%;
        }
      }
    }
  }
  .goods-item {
    margin: 0 0 15px;
    padding-right: 20px;
    position: relative;
    &__img {
      border: 1px solid $color-border-gray;
    }
    &__title, &__sub-title {
      font-size: 14px;
      @include text-overflow();
    }
    &__specs {
      &-bn {
        display: none;
        font-weight: normal;
      }
      &-item, &-price {
        padding: 2px 0;
      }
    }
    .aicon-close {
      position: absolute;
      right: 0px;
      top: 3px;
      cursor: pointer;
      display: block;
    }
  }
  .cart-null {
    text-align: center;
    padding: 40px 0;
    .text {
      margin-bottom: 30px;
      font-size: 16px;
      color: $color-disabled-text;
    }
  }
  .img-box {
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    transform: translateY(-3px);
    img {
      position: absolute;
      top: 1px;
      left: 0;
    }
  }
}
</style>

<template>
  <div class="sp-mini-cart" :class="classes" v-on-clickaway="away">
    <a href="javascript:void(0);" @click="goCart">
      <span @mouseover="handleMouseover" @click="handleClickNav">
        <span class="title">{{title}}</span>
        <div class="img-box">
          <i class="aicon aicon-bag"></i>
          <div
            class="badge"
          >{{(cartInfo.total && cartInfo.total.totalQuantity > 0) ? cartInfo.total.totalQuantity : '0'}}</div>
        </div>
      </span>
    </a>
    <SpDpTransition>
      <div
        class="sp-mini-cart__list"
        :class="{'fixed': fixed}"
        :style="{'right': right + 'px'}"
        v-if="show"
        @mouseover="cartBodyMouseOver"
        @mouseleave="cartBodyMouseLeave"
      >
        <div class="sp-mini-cart__list-body">
          <template v-for="cart in cartInfo.list" v-show="cartInfo.list.length > 0">
            <div
              class="mini-cart-item"
              v-for="item in cart.cartitemlist"
              :key="item.cart_id"
            >
              <SpGoodsItem
                :show-promotion="false"
                :item_ts="false"
                :info="item"
                @click="handleClickItem"
              >
                <div slot="specs" class="goods-item__specs">
                  <SpPrice class="goods-item__specs-price" :value="item.price * item.quantity" />
                  <div class="goods-item__specs-item">{{ $t('mini-cart.index.927209-0') }}{{ item.color }}</div>
                  <div class="goods-item__specs-item">{{ $t('mini-cart.index.927209-1') }}{{ item.size }}</div>
                  <div class="goods-item__specs-item">{{ $t('mini-cart.index.927209-2') }}{{ item.quantity }}</div>
                </div>
                <div slot="price"></div>
                <i
                  class="aicon aicon-close"
                  @click="handleClickDeleteCart(item)"
                />
                <!-- <SpNumInput
                  class="t-num"
                  :value="item.quantity"
                  :max="item.store"
                  size="sm"
                  @increase="handleClickNumInput($event, item, 'increase')"
                  @decrease="handleClickNumInput($event, item, 'decrease')"
                  @change="handleQuantityChange($event, item, 'change')"
                ></SpNumInput> -->
              </SpGoodsItem>
            </div>
          </template>
        </div>
        <div class="cart-null" v-if="cartInfo.list.length == 0">
          <div class="text">{{ $t('mini-cart.index.927209-3') }}</div>
          <SpButton type="primary" @click="viewBuy">{{ $t('mini-cart.index.927209-4') }}</SpButton>
        </div>
        <div class="sp-mini-cart__list-body mb">
          <div v-for="(mitem, mindex) in mbCartInfo.list" :key="mindex">
            <div class="mcart-mb__warp" v-for="(kitem, kindex) in mitem.cartitemlist" :key="kindex">
              <div class="gn">{{kitem.title}}</div>
              <div class="gbn">{{kitem.bn}}</div>
              <div class="gs">
                <span class="gs__color">{{kitem.spec_info.color}}</span>
                <span class="gs__size">{{kitem.spec_info.size}}</span>
              </div>
              <SpNumInput
                class="t-num"
                :value="kitem.quantity"
                :max="kitem.store"
                size="sm"
                @increase="handleClickNumInput($event, kitem, 'increase')"
                @decrease="handleClickNumInput($event, kitem, 'decrease')"
                @change="handleQuantityChange($event, kitem, 'change')"
              ></SpNumInput>
            </div>
          </div>
        </div>
        <div class="sp-mini-cart__list-footer" v-if="cartInfo.list.length > 0">
          <div class="total clearfix">
            <span class="fl">{{ $t('mini-cart.index.927209-5') }}</span>
            <span class="fr">
              <!-- <SpPrice
                class="t-price"
                :value="cartInfo.total ? cartInfo.total.totalAfterDiscount : 0"
              /> -->
              <SpPrice
                class="t-price"
                :value="cartTotal || 0"
              />
            </span>
          </div>
          <!-- <div class="view-cart">
            <SpButton type="warning" @click="viewCart">查看购物袋</SpButton>
          </div> -->
          <div class="cart-checkout">
            <SpButton type="primary" @click="viewCart">{{ $t('mini-cart.index.927209-6') }}</SpButton>
          </div>
        </div>
      </div>
    </SpDpTransition>
  </div>
</template>

<script>
import SpGoodsItem from './../goods-item'
import _debounce from 'lodash/debounce'
import { mixin as clickaway } from '@/plugins/clickaway'
import { oneOf } from '@/utils'
import { lockScreen } from '@/utils/dom'
import { setTimeout } from 'timers'
import { analytics } from '@/plugins/analytics'
import S from '@/spx'
import store from 'store'

const prefixCls = 'sp-minicart'
export default {
  name: 'SpMiniCart',
  mixins: [clickaway],
  props: {
    title: String,
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return 'default'
      }
    }
  },
  data () {
    return {
      show: false,
      isMouseOver: false,
      fixed: false,
      right: 0,
      quantity: 0
    }
  },
  components: { SpGoodsItem },
  computed: {
    cartInfo () {
      let cart_info = {
        list: [],
        total: {
          totalQuantity: 0
        }
      }
      const { cart } = this.$store.state
      if (cart.cartInfo) {
        const { resultCartData, totalCart } = cart.cartInfo
        cart_info.list = resultCartData
        cart_info.total = totalCart
      }
      return cart_info
    },
    cartTotal () {
      const { cart } = this.$store.state
      let total = 0
      if (cart.cartInfo) {
        const { resultCartData } = cart.cartInfo
        for (let cartItem of resultCartData) {
          for (let item of cartItem.cartitemlist) {
            total += item.price * item.quantity - item.discount_price
          }
        }
      }
      return total
    },
    mbCartInfo () {
      let cart_info = {
        list: [],
        total: null
      }
      const { cart } = this.$store.state
      if (cart.cartNewInfo) {
        const { resultCartData, totalCart } = cart.cartNewInfo
        cart_info.list = resultCartData
        cart_info.total = totalCart
      }
      return cart_info
    },
    userInfo () {
      return this.$store.state.user.userInfo
    },
    classes () {
      return [
        prefixCls,
        {
          [`${prefixCls}__${this.size}`]: this.size !== 'default'
        }
      ]
    }
  },
  created () {
    this.quantityChange = _debounce(async (num, item) => {
      let params = []
      this.cartInfo.list.forEach(sp => {
        sp.cartitemlist.forEach(v => {
          params.push({
            cart_id: v.cart_id,
            sku_id: v.sku_id,
            is_checked: v.is_checked,
            selected_promotion:
              v.goodspromotion && v.goodspromotion.promotion_id,
            totalQuantity: v.cart_id === item.cart_id ? num : v.quantity
          })
        })
      })
      // let toast_loading = this.$toast({ loading: true })
      await this.$store.dispatch('cart/updateCart', params)
      // toast_loading.close()
    }, 300)
  },
  mounted () {
    this.initPos()
    if (window.addEventListener) {
      window.addEventListener('scroll', () => {
        this.initPos()
      }, false)
    }
    window.onresize = this.initPos()
    this.$EventBus.$on('show-minicart', () => {
      if (!this.show) {
        this.show = true
        // 没有mouseover， 3秒后关闭
        setTimeout(() => {
          if (!this.isMouseOver) {
            this.show = false
          }
        }, 3000)
      }
    })
  },
  methods: {
    initPos () {
      if (document.documentElement.scrollTop < 76) {
        this.right = 0
        this.fixed = false
      } else {
        this.fixed = true
        let width = document.getElementsByClassName('container')[0].clientWidth
        let right = (document.body.clientWidth - width) / 2
        this.right = right > 0 ? right : 0
      }
    },
    checkLogin () {
      // 干掉离线购物车功能
      const auth_token = S.getAuthToken()
      if (!auth_token) {
        this.$router.push('/auth/login')
      } else {
        this.$router.push('/cart')
      }
      return !!auth_token
    },
    goCart () {
      // this.$router.push('/cart')
      this.$track('header', this.$t('mini-cart.index.927209-7'))
    },
    handleClickNav () {
      this.show = true
      this.checkLogin()
    },
    handleMouseover () {
      this.show = true
    },
    cartBodyMouseOver () {
      this.isMouseOver = true
      // console.log('cartBodyMouseOver')
    },
    cartBodyMouseLeave () {
      this.isMouseOver = false
      this.show = false
      // console.log('cartBodyMouseLeave')
    },
    handleClickDeleteCart (item) {
      this.$Modal.confirm({
        title: this.$t('mini-cart.index.927209-8'),
        content: '<p>请确认是否移除该商品?</p>',
        onOk: async () => {
          await this.$store.dispatch('cart/delCartInfo', { cart_id: item.cart_id })
          this.$Message.success(this.$t('mini-cart.index.927209-10'))
        }
      })
    },
    handleClickItem (item) {
      this.$router.push(`/items/${item.item_id}`)
    },
    handleQuantityChange (num, item) {
      this.quantityChange(num, item)
      this.handleClickNumInput(num, item)
    },
    away: function () {
      this.show = false
    },
    // 查看购物车
    viewCart () {
      this.away()
      lockScreen(false)
      this.$router.push('/cart')
    },
    // 转到结算
    async checkout () {
      this.away()
      lockScreen(false)
      if (this.cartInfo.total.number == 0) {
        this.$router.push('/cart')
        return
      }
      try {
        if (!S.getAuthToken()) {
          analytics.event({
            checkoutStepName: 'login'
          }, 'checkoutStepProgress')
        }
        await this.$api.cart.cartCheck({ mode: 'cart' })
        this.$router.push('/cart/checkout?mode=cart')
      } catch (e) {

      }
    },
    // 立即选购
    viewBuy () {
      this.away()
      this.$router.push(this.$t('mini-cart.index.927209-11'))
    },
    handleGoodsData (item) {
      return {
        ...item,
        color: item.spec_info.color,
        size: item.spec_info.size,
        promotions: item.goodspromotion ? [item.goodspromotion] : []
      }
    },
    handleClickNumInput (e, item, type) {
      let tipmsg
      if (e === 1) {
        if (item.store == 1 && type == 'increase') {
          tipmsg = this.$t('mini-cart.index.927209-12')
        } else if (type == 'decrease') {
          tipmsg = this.$t('mini-cart.index.927209-13')
        }
      } else if (e === item.store && type == 'increase') {
        tipmsg = this.$t('mini-cart.index.927209-14', [item.store])
      } else {
        tipmsg = ''
      }
      tipmsg && this.$Message.error(tipmsg)

      if (!e) {
        // let params = {
        //   id: item.item_id,
        //   style: item.style,
        //   name: item.title,
        //   quantity: this.quantity,
        //   price: item.price,
        //   sku: item.bn,
        //   discountAmount: item.discount_price,
        //   discountCode: ''
        // }
        // cartAddQuantity
        let eventName = ''
        if (type == 'increase') {
          eventName = 'PDPaddQuantity'
        } else if (type == 'decrease') {
          eventName = 'PDPReduceQuantity'
        }
        if (eventName) {
          analytics.event({
            qauantity: this.quantity.toString()
          }, eventName)
        }
      } else {
        this.quantity = e
      }
    }
  }
}
</script>
