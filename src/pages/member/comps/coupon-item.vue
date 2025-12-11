/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$color-coupon-text: #1f201f;
.comps-coupon-item {
  position: relative;
  width: 260px;
  @include clearfix();
  &__up {
    position: relative;
    width: 100%;
    height: 140px;
    position: relative;
    background: radial-gradient(transparent 0, transparent 5px, #ffb937 5px);
    background-size: 15px 15px;
    background-position: 0px 14px;
    .semicircle {
      position: absolute;
      top: 63px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      border: 1px solid #e7e5df;
      &-l {
        left: -11px;
      }
      &-r {
        right: -11px;
      }
    }
  }
  &__desc {
    padding: 3px 15px 0px 15px;
    text-align: center;
    line-height: 22px;
    background-color: #ffb937;
    height: 55px;
    .title {
      color: #fff;
      span {
        color: #ba7723;
      }
    }
    .time {
      font-size: 12px;
      color: #ba7723;
    }
  }
  &__down {
    background-color: #f5f5f5;
    position: relative;
    text-align: center;
    overflow: hidden;
    .code {
      padding: 10px 0;
      color: #666;
    }
    .use-goods {
      margin-bottom: 10px;
      font-size: 12px;
      color: #888;
    }
    .btn-wrap {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 10px;
      .btn-text {
        height: 32px;
        line-height: 32px;
        color: #e6a23c;
        font-size: 12px;
        &.btn {
          cursor: pointer;
          display: inline-block;
          color: #f0c78a;
          background-color: #fdf6ec;
          border: 1px solid #faecd8;
          line-height: 30px;
          padding: 0 9px;
          border-radius: 3px;
        }
        &.disabled {
          cursor: not-allowed;
        }
      }
    }
    .shop {
      text-align: center;
      color: #666;
      margin-bottom: 10px;
      &-title {
        display: inline-block;
        vertical-align: top;
        color: #666;
      }
      ul {
        display: inline-block;
        text-align: left;
      }
      li {
        width: 160px;
        color: #66b1ff;
        cursor: pointer;
        @include multi-ellipsis(1);
        margin-bottom: 2px;
      }
      li:hover {
        color: #409eff;
      }
    }
    .use {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 20px;
      p {
        height: 32px;
        line-height: 32px;
        color: #e6a23c;
      }
    }
  }
  &__left{
    position: relative;
    width: 138px;
    height: 100%;
    float: left;
  }
  &__right  {
    width: calc(100% - 138px);
    height: 100%;
    color: #fff;
    padding: 0 20px 0 26px;
    margin-left: 138px;
  }
  &__logo{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &__price {
    font-size: 35px;
    margin-top: 30px;
    font-style: oblique;
    color: #fff;
    &-num {
      line-height: 1;
      font-size: 35px;
      span {
        color: #fff;
      }
    }
    &-wrap {
      line-height: 40px;
      padding: 8px 15px 0px 15px;
      color: #fff !important;
      text-align: center;
      background-color: #ffb937;
    }
    // text-align: right;
    // padding-top: 12px;
    // &-top{
    // }
    // &-unit {
    //   font-size: 20px;
    //   vertical-align: bottom;
    // }
    // &-num {
    //   font-size: 49px;
    //   line-height: 1;
    //   letter-spacing: -2px;
    //   color: #fff;
    // }
    // &-text{
    //   font-size: 16px;
    //   letter-spacing: 1px;
    //   color: #fff;
    // }
  }
  &__rule{
    text-align: left;
    margin-top: 18px;
    &-hd{
      font-size: 12px;
    }
    &-text{
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
  &.invalid {
    .coupon-item__up {
      background: #ccc;
    }
    .coupon-item__price-wrap, .coupon-item__desc {
      background: #ccc;
      .title {
        span {
          color: #fff;
        }
      }
      .time {
        color: #fff;
      }
    }
  }
}
</style>
<template>
<div class="comps-coupon-item" :class="{'invalid' : !valid}">
  <div class="comps-coupon-item__up">
    <span class="semicircle semicircle-l"></span>
    <span class="semicircle semicircle-r"></span>
    <div class="comps-coupon-item__price-wrap">
      <div class="comps-coupon-item__price" v-if="info.card_type == 'discount'">{{ (100 - info.discount)/10 }}{{ $t('comps.coupon-item.071194-0') }}</div>
      <div class="comps-coupon-item__price" v-if="info.card_type == 'cash'">
        <SpPrice class="comps-coupon-item__price-num" unit="cent" :value="info.reduce_cost"></SpPrice>
      </div>
      <div class="comps-coupon-item__price" v-if="info.card_type == 'gift'">{{ $t('comps.coupon-item.071194-1') }}</div>
    </div>
    <div class="comps-coupon-item__desc">
      <div class="title" v-if="info.card_type != 'gift'">
        【{{info.title}}】
        <span>{{ $t('comps.coupon-item.071194-2') }}{{info.least_cost > 0 ? info.least_cost/100 : 0.01}}{{ $t('comps.coupon-item.071194-3') }}</span>
      </div>
      <div class="time">{{info.begin_date}} {{ $t('comps.coupon-item.071194-4') }} {{info.end_date}}</div>
    </div>
  </div>
  <div class="comps-coupon-item__down">
    <div class="code">{{info.code}}</div>
    <div class="use-goods">{{waresGoods(info)}}</div>
    <!-- <div v-if="info.use_platform != 'store'">
      <div class="shop" v-if="!info.distributor_info && info.use_all_items">全部商品适用</div>
      <div v-if="(info.use_all_distributor || !info.distributor_info) && !info.use_all_items" class="shop">部分商品适用</div>
      <div class="shop" v-if="info.distributor_info && !info.use_all_distributor">
        <div class="shop-title">店铺名称：</div>
        <ul>
          <li
            v-for="(row,i) in info.distributor_info"
            :key="i"
            @click="toShop(row)"
          >{{ row.store_name }}</li>
        </ul>
      </div>
    </div> -->
  </div>
</div>
</template>

<script>
import { formatDataTime } from '@/utils'
import { WARE_GOODS } from '@/consts'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    valid: {
      type: Boolean
    }
  },
  methods: {
    handleDatetime (timestamp) {
      return formatDataTime(timestamp * 1000, 'YYYY.M.D')
    },
    waresGoods(info) {
      return WARE_GOODS[info.use_bound]
    },
    openPreferential () {
      if (!this.valid) {
        return
      }
      let type = 0
      if (!this.info.distributor_info && this.info.use_all_items) {
        //全部商品适用
        type = 1
      } else if (this.info.use_all_distributor) {
        //所有店铺适用
        type = 2
      } else if (!this.info.distributor_info && !this.info.use_all_items) {
        //部分商品适用
        type = 3
      } else if (this.info.distributor_info && !this.info.use_all_distributor) {
        //部分店铺适用
        type = 4
      }
      window.open("//" + window.location.host + `/#/preferential?type=${type}&id=${this.info.card_id}`)
    },
    toShop (row) {
      window.open(
        "//" + window.location.host + `/#/store/home?id=${row.distributor_id}`
      )
    }
  }
}
</script>
