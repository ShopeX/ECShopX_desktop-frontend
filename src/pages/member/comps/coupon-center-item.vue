/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$color-coupon-text: #1f201f;
.center-coupon-item {
  position: relative;
  width: 366px;
  display: flex;
  @include clearfix();
  &__up {
    position: relative;
    width: 100%;
    // height: 140px;
    position: relative;
    // background: radial-gradient(transparent 0, transparent 5px, #ffb937 5px);
    background-size: 15px 15px;
    background-position: 0px 14px;
  }
  .semicircle {
    position: absolute;
    // top: 63px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 1px solid #e7e5df;
    &-l {
      z-index: 1;
      right: 64px;
      top: -12px;
    }
    &-r {
      z-index: 1;
      right: 64px;
      bottom: -12px;
    }
  }
  &__up::after {
    content: '';
    width: 0;
    height: 100%;
    position: absolute;
    border-right: 6px dotted white;
    right: -3px;
    top: 0;
  }
  &__desc {
    padding: 3px 15px 0px 15px;
    // text-align: center;
    line-height: 22px;
    background-color: #e83637;
    height: 55px;
    color: #fff;
    .title {
      color: #fff;
      span {
        color: #fff;
      }
    }
    .time {
      font-size: 12px;
      color: #fff;
      display: flex;
      align-items: center;
      .use_rules {
        cursor: pointer;
        margin-left: 25px;
        color: #fff;
        text-decoration: underline;
      }
    }
  }
  &__down::after {
    content: '';
    width: 0;
    height: 100%;
    position: absolute;
    border-right: 6px dotted white;
    left: -3px;
    top: 0;
  }
  &__down {
    background-color: #f9d0a0;
    position: relative;
    text-align: center;
    overflow: hidden;
    width: 92px;
    align-items: center;
    justify-content: center;
    display: flex;
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
    .no-receive {
      color: #e83637;
      width: 50%;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      align-items: center;
    }
    .have-receive {
      color: #e83637;
      background: #ffdede;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      align-items: center;
    }
    .is-end {
      color: #858585;
      background: #eaeaea;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      align-items: center;
    }
  }
  .no-receive-btn {
    background: #f9d0a0;
    cursor: pointer;
  }
  .have-receive-btn {
    background: #ffdede;
  }
  .is-end-btn {
    background: #eaeaea;
  }
  &__left {
    position: relative;
    width: 138px;
    height: 100%;
    float: left;
  }
  &__right {
    width: calc(100% - 138px);
    height: 100%;
    color: #fff;
    padding: 0 20px 0 26px;
    margin-left: 138px;
  }
  &__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &__price {
    font-size: 35px;
    // margin-top: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    &-num {
      line-height: 1;
      font-size: 35px;
      display: flex;
      align-items: flex-end;
      span {
        color: #fff;
      }
      .price__symbol {
        color: #fff;
        font-size: 24px;
        font-family: PingFang SC, Microsoft YaHei, '微软雅黑', Hiragino Sans GB, sans-serif;
      }
      .price__int {
        color: #fff;
        font-size: 40px;
        font-weight: bold;
      }
      .price__decimal {
        color: #fff;
        font-size: 40px;
        font-weight: bold;
      }
    }
    &-num-reduce {
      margin-left: 11px;
      padding: 5px 11px;
      height: 23px;
      line-height: 13px;
      font-size: 12px;
      color: #d21c0c;
      background: #ffe2e2;
      border-radius: 5px;
    }
    &-wrap {
      line-height: 40px;
      padding: 8px 15px 0px 15px;
      color: #fff !important;
      text-align: center;
      background-color: #e83637;
      display: flex;
      align-items: center;
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
  &__rule {
    text-align: left;
    margin-top: 18px;
    min-height: 150px;
    padding: 10px;
    &-hd {
      font-size: 20px;
    }
    &-text {
      font-size: 14px;
      letter-spacing: 1px;
      margin-top: 10px;
    }
  }
  &.invalid {
    .coupon-item__up {
      background: #ccc;
    }
    .coupon-item__price-wrap,
    .coupon-item__desc {
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
  <div class="center-coupon-item" :class="{ 'invalid': !valid }">
    <span class="semicircle semicircle-l"></span>
    <span class="semicircle semicircle-r"></span>
    <div class="center-coupon-item__up">
      <div class="center-coupon-item__price-wrap">
        <div class="center-coupon-item__price" v-if="info.card_type == 'discount'">
          {{ (100 - info.discount) / 10 }}{{ $t('comps.coupon-center-item.982976-1') }}
        </div>
        <div class="center-coupon-item__price" v-if="info.card_type == 'cash'">
          <SpPrice
            class="center-coupon-item__price-num"
            unit="cent"
            :value="info.reduce_cost"
          ></SpPrice>
        </div>
        <p class="center-coupon-item__price-num-reduce">
          {{ $t('comps.coupon-center-item.982976-2') }}{{ info.least_cost > 0 ? info.least_cost / 100 : 0.01 }}{{ $t('comps.coupon-center-item.982976-3') }}
        </p>
        <div class="center-coupon-item__price" v-if="info.card_type == 'gift'">{{ $t('comps.coupon-center-item.982976-4') }}</div>
      </div>
      <div class="center-coupon-item__desc">
        <div class="title" v-if="info.card_type != 'gift'">
          {{ info.title }}
          <!-- <span>{{ $t('comps.coupon-center-item.982976-2') }}{{info.least_cost > 0 ? info.least_cost/100 : 0.01}}{{ $t('comps.coupon-center-item.982976-3') }}</span> -->
        </div>
        <div class="time">
          {{ handleDatetime(info.begin_date) }} - {{ handleDatetime(info.end_date) }}
          <p class="use_rules" @click="showUseRuler(info.description)">{{ $t('comps.coupon-center-item.982976-5') }}</p>
        </div>
      </div>
    </div>
    <div
      class="center-coupon-item__down no-receive-btn"
      v-if="info.getted != 1 && info.getted != 2"
      @click="handleReceive(info)"
    >
      <p class="no-receive">{{ $t('comps.coupon-center-item.982976-6') }}</p>
    </div>
    <div class="center-coupon-item__down have-receive-btn" v-else-if="info.getted == 1">
      <p class="have-receive">{{ $t('comps.coupon-center-item.982976-7') }}</p>
      <!-- <div class="code">{{info.code}}</div>
    <div class="use-goods">{{waresGoods(info)}}</div> -->
    </div>
    <div
      class="center-coupon-item__down is-end-btn"
      v-else-if="info.getted == 2 || info.end_date < nowDate"
    >
      <p class="is-end">{{ $t('comps.coupon-center-item.982976-8') }}</p>
    </div>

    <SpModal v-model="dialogLog" :height="320" :width="520">
      <div class="center-coupon-item__rule">
        <div class="center-coupon-item__rule-hd">{{ $t('comps.coupon-center-item.982976-5') }}</div>
        <div class="center-coupon-item__rule-text">{{ rules }}</div>
      </div>
    </SpModal>
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
  data() {
    return {
      dialogLog: false,
      rules: '',
      nowDate: parseInt(new Date().getTime() / 1000) //当前秒级时间戳
    }
  },
  methods: {
    showUseRuler(item) {
      ;(this.dialogLog = true), (this.rules = item ? item : this.$t('comps.coupon-center-item.982976-9'))
    },
    handleDatetime(timestamp) {
      return formatDataTime(timestamp * 1000, 'YYYY.M.D')
    },
    waresGoods(info) {
      return WARE_GOODS[info.use_bound]
    },
    openPreferential() {
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
      window.open(
        '//' + window.location.host + `/#/preferential?type=${type}&id=${this.info.card_id}`
      )
    },
    // 领取优惠券
    handleReceive(item) {
      this.$emit('receive', item)
    }
  }
}
</script>