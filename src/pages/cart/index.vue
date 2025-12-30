/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-cart container">
    <div class="cart-hd">
      <div class="hd-item name">{{ $t('cart.index.281938-0') }}</div>
      <div class="hd-item price">{{ $t('cart.index.281938-1') }}</div>
      <div class="hd-item num">{{ $t('cart.index.281938-2') }}</div>
      <div class="hd-item amount">{{ $t('cart.index.281938-3') }}</div>
      <div class="hd-item action">{{ $t('cart.index.281938-4') }}</div>
    </div>
    <div class="cart-bd">
      <div class="cart-shop" v-for="(shop, index) in list" :key="`cart-shop__${index}`">
        <div class="cart-shop-hd" :style="{ borderBottomColor: themeColor }">
          <div class="shop-name" v-if="shop.shop_name">{{ $t('cart.index.281938-5') }}{{ shop.shop_name || '' }}</div>
          <div class="shop-coupon">
            <CouponPicker :info="shop" :theme="themeColor" />
          </div>
          <div class="g-count"></div>
        </div>
        <div class="shop-goods-item" v-for="(item, sindex) in shop.list" :key="`shop-item__${sindex}`">
          <SpRadio type="checkbox" :theme="themeColor" :value="item.is_checked"
            @change="(val) => handleOnChangeCheck(val, item.cart_id)" />
          <div class="g-wrap">
            <nuxt-link :to="`/items/${item.item_id}`">
              <SpImg class="spimg" noSize :src="item.pics" />
            </nuxt-link>
            <div class="goods-name">{{ item.item_name }}</div>
            <div class="goods-spec">{{ item.item_spec_desc }}</div>
          </div>
          <div class="goods-price">
            <SpPrice :value="item.price / 100"></SpPrice>
          </div>
          <div class="goods-num">
            <SpNumInput size="sm" width="50" @change="handleQuantityChange($event, item.cart_id)" :value="item.num" />
          </div>
          <div class="goods-amount">
            <SpPrice :value="item.total_fee / 100"></SpPrice>
          </div>
          <div class="goods-action">
            <span class="delete-text" @click="handleRemove(item.cart_id)">{{ $t('cart.index.281938-6') }}</span>
          </div>
        </div>

        <div class="cart-ft">
          <div class="cart-ft-hd">
            <div class="left-con">
              <SpRadio type="checkbox" :theme="themeColor" :value="shop.is_checked"
                @change="(val) => handleOnChangeAllCheck(val, index)">{{ $t('cart.index.281938-7') }}</SpRadio>
              <div class="text-grel-all" @click="handleRemoveAll">{{ $t('cart.index.281938-8') }}</div>
            </div>
            <div class="right-con">
              <div class="cart-col-sl">
                {{ $t('cart.index.281938-9') }}<span class="checknum" :style="{ color: themeColor }">{{ shop.goodsCheckNum }}</span>{{ $t('cart.index.281938-10') }}
              </div>
              <div class="diss-count">
                {{ $t('cart.index.281938-11') }}
                <SpPrice :value="shop.discountFee / 100" />
                <span class="text-grel">{{ $t('cart.index.281938-12') }}</span>
              </div>
              <div class="total-price">
                {{ $t('cart.index.281938-13') }}
                <SpPrice size="large" :value="shop.totalFee / 100" />
              </div>
            </div>
          </div>
          <div class="calc-btn" :class="{ disabled: shop.goodsCheckNum == 0 }" :style="{ backgroundColor: themeColor }"
            @click="handleClickSubmit(shop)">
            {{ $t('cart.index.281938-14') }}
          </div>
        </div>
      </div>

      <div class="loading-container" v-if="!list">
        <SpLoading class="modal-loading__t" color="#c3c3c3" v-if="!list"></SpLoading>
      </div>

      <div class="cart-empty" v-if="list && list.length == 0 && invalid_list && invalid_list.length == 0">
        <div class="cart-empty-con">
          <img class="cart-empty-img" src="@/assets/imgs/cart-empty.png" alt="" />
          <div class="cart-empty-info">
            <div class="txt">{{ $t('cart.index.281938-15') }}</div>
            <nuxt-link to="/items">
              <span :style="{
                  color: themeColor
                }">{{ $t('cart.index.281938-16') }}<i class="ec-icon ec-icon-right"></i></span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 无效商品 -->
    <div class="cart-bd invalid-cart">
      <div class="shop-goods-item" v-for="(item, index) in invalid_list" :key="`shop-item__${index}`">
        <div class="invalid-text">{{ $t('cart.index.281938-17') }}</div>
        <div class="g-wrap">
          <SpImg class="spimg" noSize :src="item.pics" />
          <div class="goods-name">{{ item.item_name }}</div>
          <div class="goods-spec">{{ item.item_spec_desc }}</div>
        </div>
        <div class="goods-price">
          <SpPrice :value="item.price / 100"></SpPrice>
        </div>
        <div class="goods-action">
          <span class="delete-text" @click="handleRemove(item.cart_id)">{{ $t('cart.index.281938-6') }}</span>
        </div>
      </div>
    </div>

    <div class="cart-recommend">
      <CartRecommend />
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    mixin
  } from '@/mixins'
  import CartRecommend from './comps/cart-recommend'
  import CouponPicker from './comps/coupon-picker'
  export default {
    middleware: 'authenticated',
    mixins: [mixin],
    components: {
      CartRecommend,
      CouponPicker
    },
    head() {
      return {
        title: this.$t('cart.index.281938-18'),
      }
    },
    data() {
      return {
        // list: null,
        // totalFee: 0,
        // discountFee: 0,
        // goodsCheckNum: 0,
        // allCheck: false
        // invalid_list: []
      }
    },
    computed: {
      ...mapState({
        list: (state) => {
          const {
            cartInfo
          } = state.cart
          if (!cartInfo) {
            return null
          } else {
            return cartInfo.valid_cart
          }
        },
        invalid_list: (state) => {
          const {
            cartInfo
          } = state.cart
          if (!cartInfo) {
            return null
          } else {
            return cartInfo.invalid_cart
          }
        }
      })
    },
    watch: {
      list: {
        handler() {
          this.calcCartTotal()
        },
        deep: true
      }
    },
    created() {
			this.CART_GETINFO()
		},
    mounted() {
      // this.refreshCart()
      if (this.list) {
        this.calcCartTotal()
      }
    },
    methods: {
      ...mapActions({
        CART_GETINFO: 'cart/CART_GETINFO'
      }),
      async handleOnChangeCheck(val, cart_id) {
        await this.$api.cart.updateCheckStatus({
          cart_id,
          is_checked: val
        })
        this.CART_GETINFO()
      },
      // 全选
      async handleOnChangeAllCheck(val, index) {
        console.log(val, index, '-----------val')

        let cartIds = []
        this.list[index].list.forEach((sitem) => {
          cartIds.push(sitem.cart_id)
        })
        /* this.list.forEach((item) => {
          item.list.forEach((sitem) => {
            cartIds.push(sitem.cart_id)
          })
        }) */
        await this.$api.cart.updateCheckStatus({
          cart_id: cartIds,
          is_checked: val
        })
        this.CART_GETINFO()
      },
      // 计算购物车
      calcCartTotal() {
        let total = 0,
          discount = 0,
          allCheck = true,
          goodsCheckNum = 0
        this.list.forEach((item) => {
          allCheck = true,
          total = 0
          discount = 0
          goodsCheckNum = 0
          item.list.forEach((sitem) => {
            if (sitem.is_checked) {
              total += Number(sitem.total_fee)
              discount += sitem.discount_fee
              goodsCheckNum++
            } else {
              allCheck = allCheck && false
            }
          })
          item.totalFee = total
          item.discountFee = discount
          item.goodsCheckNum = goodsCheckNum
          item.is_checked = allCheck
        })
      },
      // 数量修改
      async handleQuantityChange(val, id) {
        await this.$api.cart.cartNumChange({
          cart_id: id,
          num: val
        })
        this.CART_GETINFO()
      },
      // 删除
      async handleRemove(cart_id) {
        await this.$api.cart.cartDelete({
          cart_id
        })
        this.CART_GETINFO()
      },
      // 全部删除
      async handleRemoveAll() {
        let cartIds = []
        this.list.forEach((item) => {
          item.list.forEach((sitem) => {
            if (sitem.is_checked) {
              cartIds.push(sitem.cart_id)
            }
          })
        })
        await this.$api.cart.cartDelete({
          cart_id: cartIds
        })
        this.CART_GETINFO()
      },
      // 去结算
      handleClickSubmit(shop) {
        if (shop.goodsCheckNum > 0) {
          this.$router.push(`cart/checkout?mode=cart&id=${shop.shop_id}`)
        }
      }
    }
  }
</script>
