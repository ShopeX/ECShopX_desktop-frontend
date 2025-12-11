/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-recommend">
    <div class="hd">
      {{ $t('comps.cart-recommend.090104-0') }}
    </div>

    <div class="bd">
      <div class="goods-wrap">
        <div class="goods-item" v-for="item in goodslike" :key="item.item_id">
          <GoodItem class="goods-img" :item="item" />
          <div class="goods-item-ft">
            <SpPrice :value="item.price / 100" />
            <div class="goods-buy" @click="handleClickAddToCart(item)">{{ $t('comps.cart-recommend.090104-1') }}</div>
          </div>
        </div>
      </div>

      <div class="hd-point">
        <span
          v-for="i in pages"
          class="hd-point-ch"
          :class="{ active: active == i }"
          :style="active == i && getThemeBackground"
          @click="handleClickTrackerPage(i)"
        ></span>
      </div>
    </div>

    <!-- <SpFastBuy v-model="showFastBuy" :info="goodsInfo" /> -->
  </div>
</template>

<script>
import { mixin } from '@/mixins'
import GoodItem from './good'

export default {
  mixins: [mixin],
  components: {
    GoodItem
  },
  data() {
    return {
      pages: 1,
      active: 1,
      goodslike: [],
      page: {
        page: 1,
        pageSize: 12
      },
      curItem: {},
      showModal: false,
      selectedAttr: [],
      curSku: {},
      showFastBuy: false,
      goodsInfo: null
    }
  },
  created() {
    this.getLikeList()
  },
  methods: {
    async getLikeList() {
      let res = await this.$api.cart.likeList(this.page)
      let { total_count, list } = res
      // list = list.concat(list)
      // total_count = 100
      this.pages = Math.ceil(total_count / this.page.pageSize)
      this.goodslike = list
      if (this.goodslike.length == 0) {
        this.$emit('update:recommendVisiable', false)
      }
    },
    handleChangeSku(sku, selection, specSkuList) {
      this.selectedAttr = selection
      this.curSku = sku
    },
    handleClickTrackerPage(index) {
      if (this.active != index) {
        this.active = index
        this.page.page = index
        this.getLikeList()
      }
    },
    async handleClickAddToCart(item) {
      this.$router.push({
        path: `items/${item.item_id}`
      })
      // const { item_id, nospec, distributor_id } = item
      // // 多规格
      // if (!nospec) {
      //   this.goodsInfo = item
      //   console.log(item)
      //   this.showFastBuy = true
      // } else {
      //   await this.$api.cart.add(
      //     {
      //       item_id,
      //       shop_type: 'distributor',
      //       cart_type: 'cart',
      //       distributor_id: distributor_id || 0
      //     },
      //     1
      //   )

      //   this.$Message.success(this.$t('comps.cart-recommend.090104-2'))
      //   this.$store.dispatch('cart/getCartInfo')
      // }
    },
    handleQuantityChange(val, type) {
      this.sku.quantity = val
    },
    handleModalAddCart() {
      if (!curSku) {
        return
      }
      const params = {
        item_id: this.sku.item_id,
        num: this.sku.quantity,
        shop_type: 'distributor',
        cart_type: 'cart',
        distributor_id: this.sku.distributor_id || 0
      }
      this.handleAddCart(params)
    },
    handleAddCart(params) {
      this.$api.cart.add(params, params.num).then((res) => {
        this.$Message.success(this.$t('comps.cart-recommend.090104-2'))
        this.$store.dispatch('cart/getCartCount')
        this.showModal = false
        this.$emit('change')
      })
    },
    getItemDetail(item_id, distributor_id) {
      this.$api.item.detail(item_id, { distributor_id }).then((info) => {
        this.showModal = true
        this.curItem = info
        this.curItem.quantity = 1
        this.selectedAttr = []
      })
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-recommend {
  .hd {
    height: 45px;
    border: 1px solid $color-border-gray-light;
    padding: 0 20px;
    line-height: 45px;
    color: #888;
  }

  .bd {
    width: 100%;
    margin-top: 20px;
    .goods-wrap {
      @include clearfix();
      .goods-item {
        border: 1px solid #dddddd;
        float: left;
        width: 190px;
        // height: 270px;
        margin: 0 10px 20px 0;
        .goods-img {
          width: 188px;
          .spimg {
            width: 188px;
            height: 188px;
            display: block;
          }
          .text {
            color: #333;
            padding: 0 6px;
          }
        }
        &:nth-child(6n) {
          margin-right: 0;
        }
        &-ft {
          @include clearfix();
          padding: 10px 6px;
          .sp-price {
            float: left;
            margin-top: 6px;
            .price__symbol {
              font-size: 14px;
              color: $color-brand-primary;
            }
            .price__int,
            .price__decimal {
              font-size: 16px;
              color: $color-brand-primary;
            }
          }
          .goods-buy {
            float: right;
            color: #333;
            font-size: 12px;
            width: 80px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #ccc;
            cursor: default;
          }
        }
      }
    }
    .hd-point {
      text-align: center;
      &-ch {
        width: 10px;
        height: 6px;
        background: #999;
        display: inline-block;
        margin: 0 2px;
        &.active {
          width: 18px;
          background: $color-brand-primary;
        }
      }
    }
  }
}

//     .hd-point {
//       height: 45px;
//       line-height: 45px;
//       padding-right: 20px;
//       text-align: center;
//       .hd-point-ch {
//         cursor: pointer;
//         margin-right: 5px;
//         display: inline-block;
//         width: 10px;
//         height: 6px;
//         background: inherit;
//         background-color: #666666;
//         border: none;
//       }
//       .active {
//         background-color: #e43838;
//       }
//     }
//     .goods {
//       height: 100%;
//       .list {
//         height: 100%;
//       }

//       .good-item {
//         border: 1px solid #dddddd;
//         float: left;
//         width: 190px;
//         height: 270px;
//         text-align: center;
//         // padding: 10px 10px;
//         position: relative;
//         margin: 0 10px 20px 0;
//         img {
//           width: 190px;
//           height: 190px;
//         }
//         &:nth-child(6n) {
//           margin-right: 0;
//         }
//         .btn {
//           // height: 50px;
//           // line-height: 50px;
//           // position: absolute;
//           // bottom: 20px;
//           // left: 50%;
//           // transform: translateX(-50%);
//           // display: flex;
//           // justify-content: space-between;
//           margin-top: 10px;
//           .price {
//             display: inline-block;
//             font-size: 14px;
//             color: #e43838;
//             width: 78px;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             vertical-align: middle;
//             text-align: left;
//           }
//           button {
//             display: inline-block;
//             vertical-align: middle;
//             background: #fff;
//             border: 1px solid #cccccc;
//             // border-radius: 3px;
//             width: 80px;
//             height: 30px;
//             cursor: pointer;
//             font-size: 13px;
//             &:hover {
//               border: 1px solid $color-brand-primary;
//             }
//           }
//         }
//       }
//     }
//   }

//   .list-enter-active,
//   .list-leave-active {
//     transition: all 0.3s;
//   }
//   .list-enter, .list-leave-to
// /* .list-leave-active for below version 2.1.8 */ {
//     opacity: 0;
//     transform: translateX(50px);
//   }
//   .add-cart-modal {
//     .header-title {
//       line-height: 24px;
//       font-size: 18px;
//       color: #666;
//       padding: 20px 20px 10px;
//       border-bottom: 1px solid #d8d8d8;
//     }
//     .modal-goods {
//       padding: 30px 20px;
//       .modal-row {
//         margin-bottom: 10px;
//         &__title {
//           font-size: 14px;
//           color: #666;
//           word-break: break-all;
//           display: inline-block;
//           width: 90px;
//           margin-right: 20px;
//           line-height: 36px;
//         }
//         &__value {
//           font-size: 14px;
//           color: #666;
//           word-break: break-all;
//           display: inline-block;
//           .sp-num-input {
//             margin-right: 10px;
//           }
//           .spec-item {
//             line-height: 30px;
//             height: 30px;
//             cursor: pointer;
//             position: relative;
//             display: inline-block;
//             padding: 0 12px;
//             font-size: 14px;
//             color: #666;
//             border: 1px solid #ddd;
//             margin: 0 10px 10px 0;
//             &.active {
//               border-color: $color-brand-primary;
//             }
//           }
//         }
//         .sp-price {
//           span {
//             color: $color-brand-primary;
//             font-size: 24px;
//           }
//         }
//       }
//     }
//     .modal-btn {
//       position: absolute;
//       left: 0;
//       right: 0;
//       bottom: 30px;
//       margin: 0 auto;
//       width: 100px;
//       height: 30px;
//       line-height: 30px;
//       border-radius: 4px;
//       font-size: 14px;
//       color: #fff;
//       text-align: center;
//       background-color: #ff9587;
//       background-image: linear-gradient(180deg, #ff9587, #fa6450);
//       cursor: pointer;
//       &.disabled {
//         cursor: not-allowed;
//         border-radius: 4px;
//         font-size: 14px;
//         color: #fff;
//         background-color: #a9a9a9;
//         background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);
//       }
//     }
//   }
// }
</style>
