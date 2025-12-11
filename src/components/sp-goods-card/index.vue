/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-goods-card {
  .goods-card {
    &-hd {
      border: 1px solid #DDD;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &-bd {
      margin: 10px 0;
      .name {
        color: #666;
        height: 40px;
        @include multi-ellipsis(2);
      }
    }
    &-ft {
      @include clearfix();
      .btn-cart {
        float: right;
        width: 100px;
        height: 40px;
        text-align: center;
        color: #fff;
        line-height: 38px;
        cursor: default;
      }
      .ec-icon-cart {
        color: #fff;
      }
      .price-wrap {
        float: left;
        margin-top: 10px;
        @include clearfix();
        .price-label {
          float: left;
          font-size: 12px;
          color: #fff;
          border-radius: 2px;
          padding: 0 2px;
          margin-right: 4px;
        }
        .sp-price {
          float: left;
        }
        .market-price {
          float: left;
          margin-left: 2px;
          margin-top: 1px;
          .price__symbol,
          .price__int,
          .price__decimal {
            font-size: 14px !important;
            font-family: Arial Microsoft Yahei;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="sp-goods-card">
    <nuxt-link :to="`/items/${info.item_id}?distributor_id=${info.distributor_id}`">
      <div class="goods-card-hd">
        <img :src="info.imgUrl" alt="" width="100%">
      </div>
    </nuxt-link>
    <div class="goods-card-bd">
      <div class="name">{{info.item_name}}</div>
    </div>
    <div class="goods-card-ft">
      <div class="price-wrap">
        <div class="price-label" v-if="info.member_price || info.activity_price" :style="{
          backgroundColor: theme
        }">{{FilterPriceLabel(info)}}</div>
        <SpPrice :value="info | FilterPrice"/>
        <SpPrice class="market-price" :value="info.market_price / 100" />
      </div>
      <!-- <nuxt-link :to="`/items/${info.item_id}?distributor_id=${info.distributor_id}`">
        <div class="btn-cart" :style="{
          backgroundColor: theme
        }">
          <i class="ec-icon ec-icon-cart"></i>
          加入购物车
        </div>
      </nuxt-link> -->
    </div>
  </div>
</template>

<script>
// import i18n from '@/i18n'
export default {
  name: 'SpGoodsCard',
  props: {
    info: Object,
    theme: String
  },
  data() {
    return {

    }
  },
  methods: {
    FilterPriceLabel(info) {
      const { activity_price, member_price } = info
      if(activity_price) {
        return this.$t('sp-goods-card.index.699394-0')
      } else if(member_price) {
        return this.$t('sp-goods-card.index.699394-1')
      }
    },
  },
  filters: {

    FilterPrice(info) {
      const { activity_price, member_price,  price } = info
      if(activity_price) {
        return activity_price / 100
      } else if(member_price) {
        return member_price / 100
      } else {
        return price / 100
      }
    }
  }
}
</script>

