/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-cart {
  position: relative;
  display: inline-block;
  .cart-link-wrap {
    border: 1px solid #999;
    text-align: center;
    height: 40px;
    line-height: 38px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 5px;
    position: relative;
    // color: #999;
    .cart-icon {
      display: inline-block;
      position: relative;
      margin-right: 5px;
      height: 100%;
      vertical-align: top;
      .ec-icon-cart {
        // color: #999;
        font-size: 20px;
      }
      .count {
        position: absolute;
        top: 0;
        right: 10px;
        transform: translateY(-35%) translateX(100%);
        border: 1px solid $color-brand-primary;
        background: #fff;
        color: $color-brand-primary;
        border-radius: 10px;
        display: inline-block;
        font-size: 12px;
        min-width: 20px;
        height: 20px;
        line-height: 18px;
        padding: 0 5px;
        text-align: center;
        white-space: nowrap;
        z-index: 10;
      }
    }
  }
  .badge {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -5px;
    top: 4px;
    background: $color-invalid;
    border-radius: 20px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  &__list {
    position: absolute;
    top: 50px;
    right: 0px;
    width: 300px;
    background: #fff;
    z-index: $z-index-level-11;
    border: 1px solid $color-divider;
    line-height: initial;
    box-shadow: 1px 3px 5px 0 rgba(0, 0, 0, 0.2);
    &-header {
      margin: 0 10px;
      padding: 10px 0 5px;
      border-bottom: 1px double $color-divider;
      font-weight: bold;
    }
    &-body {
      max-height: 300px;
      overflow-y: auto;
      padding: 20px 15px 5px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 15px;
      .goods {
        margin-bottom: 15px;
        cursor: pointer;
        &__img {
          width: 40px;
          height: 40px;
          overflow: hidden;
          float: left;
          border-radius: 3px;
          img {
            border-radius: 3px;
            width: 100%;
          }
        }
        &__name {
          width: calc(100% - 90px);
          float: left;
          padding-left: 10px;
          text-align: left;
          .name {
            @include multi-ellipsis(1);
          }
          .sp-price {
            font-size: 12px;
          }
        }
        &__num {
          width: 50px;
          float: right;
          text-align: right;
          padding-top: 20px;
          .ec-icon-close {
            font-size: 12px;
          }
        }
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
          position: relative;
          top: 2px;
          font-size: 14px;
        }
      }
    }
    &-footer {
      .total {
        // padding: 10px;
        // background: #efefef;
        // color: #fff;
        text-align: center;
        &-text {
          margin: 0 3px;
        }
      }
      .view-btn {
        text-align: center;
        .sp-btn {
          border-color: #999;
          border-radius: 3px;
          margin: 15px 10px;
          padding: 0 10px;
          &__small {
            height: 30px;
            line-height: 28px;
          }
          span {
            font-size: 12px;
          }
          &:hover {
            background: none;
            color: none;
          }
          &.btn-checkout {
            background: $color-brand-primary;
            border-color: $color-brand-primary;
            span {
              color: $color-primary-text;
            }
          }
        }
      }
      .view-cart {
        text-align: center;
        margin: 20px 0 10px;
      }
      .cart-checkout {
        text-align: center;
        margin: 10px 0;
      }
    }
  }
  .mini-cart {
    .goods-item {
      &__title {
        font-size: 14px;
      }
      &__specs {
        font-size: 12px;
        &-bn {
          display: none;
          font-weight: normal;
        }
      }
      &__gifts {
        font-size: 12px;
      }
    }
  }
  .cart-null {
    text-align: center;
    padding: 40px 0;
    .text {
      margin-bottom: 10px;
      color: $color-disabled-text;
    }
    .sp-btn {
      background: $color-brand-primary;
      border-radius: 3px;
      border-color: $color-brand-primary;
      line-height: 28px;
      height: 30px;
      padding: 0 10px;
      span {
        color: $color-primary-text;
        font-size: 12px;
      }
    }
  }
  // @include respond(sm) {
  //   &__list {
  //     width: 200px;
  //     top: 50px;
  //     &-body {
  //       display: none;
  //       &.mb {
  //         display: block;
  //         .mcart-mb__warp {
  //           text-align: left;
  //           .gn {
  //             font-size: 16px;
  //           }
  //           .gbn {
  //             font-size: 12px;
  //             font-weight: bold;
  //           }
  //           .gs {
  //             font-size: 14px;
  //             &__color {
  //               margin-right: 10px;
  //             }
  //             &__size {
  //               font-weight: bold;
  //             }
  //           }
  //           .t-num {
  //             margin-top: 10px;
  //           }
  //         }
  //       }
  //     }
  //     &-footer {
  //       .total {
  //         display: none;
  //       }
  //     }
  //     .cart-null {
  //       padding: 20px 15px 0;
  //       .text {
  //         margin-bottom: 20px;
  //       }
  //     }
  //   }
  // }
}
</style>

<template>
  <div class="sp-cart" :class="classes" v-on-clickaway="away">
    <!-- <nuxt-link to="/cart" class="cart-link-wrap"> -->
    <a
      href="javascript:void(0);"
      class="cart-link-wrap"
      @mouseover="handleMouseover"
      @click="handleClickNav"
    >
      <div class="cart-icon" @mouseover="handleMouseover" @click="handleClickNav">
        <i class="ec-icon ec-icon-cart"></i>
        <span class="count" v-if="cartInfo.total">{{ cartInfo.total }}</span>
      </div>
      {{ title }}
    </a>
    <!-- </nuxt-link> -->
    <SpDpTransition>
      <div
        class="sp-cart__list"
        v-if="show"
        @mouseover="cartBodyMouseOver"
        @mouseleave="cartBodyMouseLeave"
      >
        <div class="sp-cart__list-body" v-show="cartInfo.list.length > 0">
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
          <!-- <template > -->
          <div
            class="goods clearfix"
            v-for="(item, index) in cartInfo.list"
            :key="index"
            @click="handleClickItem(item)"
          >
            <div class="goods__img">
              <img :src="item.pics" />
            </div>
            <div class="goods__name">
              <span class="name">{{ item.item_name }}-{{ item.price }}</span>
              <SpPrice class="t-price" unit="cent" :value="item.price * item.num" />
            </div>
            <div class="goods__num"><i class="ec-icon ec-icon-close"></i>{{ item.num }}</div>
          </div>
          <!-- <SpGoodsItem
              class="mini-cart"
              :show_promotion="false"
              v-for="(item,idx) in cart.cartitemlist"
              :info="handleGoodsData(item)"
              @click="handleClickItem"
              :item_ts="false"
              :key="idx"
            >
              <div class="t-num-price">
                <SpNumInput
                  class="t-num"
                  :value="item.quantity"
                  size="sm"
                  @change="handleQuantityChange($event, item)"
                ></SpNumInput>
              </div>
            </SpGoodsItem> -->
          <!-- </template> -->
        </div>
        <div class="cart-null" v-if="cartInfo.list.length == 0">
          <div class="text">{{ $t('sp-header.minicart.461304-0') }}</div>
          <SpButton @click="viewBuy">{{ $t('sp-header.minicart.461304-1') }}</SpButton>
        </div>
        <div class="sp-cart__list-footer" v-if="cartInfo.list.length > 0">
          <div class="total">
            <span class="total-text">{{ $t('sp-header.minicart.461304-2') }}{{ cartInfo.count }}{{ $t('sp-header.minicart.461304-3') }}</span>
            <span class="total-text">
              {{ $t('sp-header.minicart.461304-4') }}
              <SpPrice class="t-price" unit="cent" :value="cartInfo.total_price" />
            </span>
          </div>
          <div class="view-btn">
            <SpButton @click="viewCart" size="small">{{ $t('sp-header.minicart.461304-5') }}</SpButton>
            <SpButton class="btn-checkout" @click="checkout" size="small">{{ $t('sp-header.minicart.461304-6') }}</SpButton>
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
import { setTimeout } from 'timers'
import { isArray } from 'util'

const prefixCls = 'sp-minicart'
export default {
  name: 'SpMiniCart',
  mixins: [clickaway],
  props: {
    title: String,
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return 'default'
      }
    }
  },
  data() {
    return {
      show: false,
      isMouseOver: false
    }
  },
  components: { SpGoodsItem },

  computed: {
    cartCount() {
      const { cart } = this.$store.state
      return cart.cartCount
    },
    cartInfo() {
      let cart_info = {
        list: [],
        total: null,
        count: null,
        total_price: null
      }
      const { cart } = this.$store.state
      if (
        cart &&
        cart.cartInfo &&
        !isArray(cart.cartInfo) &&
        cart.cartInfo.valid_cart &&
        cart.cartInfo.valid_cart.length > 0
      ) {
        const {
          list,
          cart_total_num,
          cart_total_count,
          cart_total_price
        } = cart.cartInfo.valid_cart[0]
        cart_info.list = list
        cart_info.total = cart_total_num
        cart_info.count = cart_total_count
        cart_info.total_price = cart_total_price
      }
      return cart_info
    },
    mbCartInfo() {
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
    userInfo() {
      return this.$store.state.user.userInfo
    },
    classes() {
      return [
        prefixCls,
        {
          [`${prefixCls}__${this.size}`]: this.size !== 'default'
        }
      ]
    }
  },
  created() {
    this.quantityChange = _debounce(async (num, item) => {
      let params = []
      this.cartInfo.list.forEach((sp) => {
        sp.cartitemlist.forEach((v) => {
          params.push({
            cart_id: v.cart_id,
            is_checked: v.is_checked,
            selected_promotion: v.goodspromotion && v.goodspromotion.promotion_id,
            totalQuantity: v.cart_id === item.cart_id ? num : v.quantity
          })
        })
      })
      let toast_loading = this.$toast({ loading: true })
      await this.$store.dispatch('cart/updateCart', params)
      toast_loading.close()
    }, 300)
  },
  mounted() {
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
    handleClickNav() {
      this.show = true
      // setTimeout(() => {
      //   this.show = false
      // }, 200)
    },
    handleMouseover() {
      this.show = true
    },
    cartBodyMouseOver() {
      this.isMouseOver = true
      // console.log('cartBodyMouseOver')
    },
    cartBodyMouseLeave() {
      this.isMouseOver = false
      // console.log('cartBodyMouseLeave')
    },
    handleClickItem(item) {
      this.$router.push(`/items/${item.item_id}`)
    },
    handleQuantityChange(num, item) {
      this.quantityChange(num, item)
    },
    closeMiniCart() {
      this.show = false
    },
    viewCart() {
      this.closeMiniCart()
      this.$router.push('/cart')
      let body = document.getElementsByTagName('body')
      body[0].style.overflow = ''
    },
    checkout() {
      this.closeMiniCart()
      this.$router.push('/cart/checkout?mode=cart')
      let body = document.getElementsByTagName('body')
      body[0].style.overflow = ''
    },
    away: function () {
      this.show = false
    },
    viewBuy() {
      this.closeMiniCart()
      this.$router.push(this.$t('sp-header.minicart.461304-7'))
      let body = document.getElementsByTagName('body')
      body[0].style.overflow = ''
    },
    handleGoodsData(item) {
      return {
        ...item,
        color: item.spec_info.color,
        size: item.spec_info.size,
        promotions: item.goodspromotion ? [item.goodspromotion] : []
      }
    }
  }
}
</script>
