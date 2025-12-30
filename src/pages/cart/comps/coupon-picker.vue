/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.coupon-picker {
  position: relative;
  height: 33px;
  &:hover {
    .coupon-picker-con {
      display: block;
    }
  }
  &-label {
    width: 70px;
    height: 24px;
    border-width: 1px;
    border-style: solid;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    .ec-icon-unfold {
      font-size: 12px;
      font-weight: 600;
    }
  }
  &-con {
    position: absolute;
    background: #fff;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 0px 10px 0px #e3e3e3;
    z-index: 100;
    top: 35px;
    border-radius: 2px;
    display: none;
    &::before {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 10px solid #e3e3e3;
      content: '';
      display: inline-block;
      position: absolute;
      top: -10px;
      left: 10px;
    }
    &::after {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 10px solid #fff;
      content: '';
      display: inline-block;
      position: absolute;
      top: -9px;
      left: 10px;
    }
  }
  .coupon-list {
    overflow: auto;
    height: 214px;
    padding: 10px 0;
  }
  .coupon-item {
    width: 410px;
    margin: 0 10px;
    @include clearfix();
    &.disabled {
      .coupon-item-hd {
        border-color: $color-disabled-text !important;
        color: $color-disabled-text !important;
      }
      .btn-coupon {
        background-color: $color-disabled-text !important;
      }
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &-hd {
      float: left;
      width: 60px;
      height: 30px;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
      border-width: 1px;
      border-style: solid;
    }
    &-bd {
      float: left;
      width: 300px;
      line-height: 15px;
      .name {
        color: #333;
        font-size: 12px;
      }
      .desc {
        font-size: 12px;
        color: #888;
        padding-left: 6px;
      }
    }
    &-ft {
      float: left;
      .btn-coupon {
        width: 50px;
        height: 24px;
        color: #fff;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        cursor: default;
      }
    }
  }
}
</style>
<template>
  <div class="coupon-picker" v-if="list.length > 0">
    <div
      class="coupon-picker-label"
      :style="{
        borderColor: theme,
        color: theme
      }"
    >
      {{ $t('comps.coupon-picker.184020-0') }}
      <i
        class="ec-icon ec-icon-unfold"
        :style="{
          color: theme
        }"
      ></i>
    </div>
    <SpDpTransition>
      <div class="coupon-picker-con">
        <div class="coupon-list">
          <div
            class="coupon-item"
            v-for="(coupon, index) in list"
            :key="`coupon-item-${index}`"
          >
            <div
              class="coupon-item-hd"
              :style="{
                borderColor: theme,
                color: theme
              }"
            >
              {{ getCouponTitle(coupon) }}
            </div>
            <div class="coupon-item-bd">
              <div class="name">
                {{ getCouponName(coupon) }}
              </div>
              <div class="desc">
                {{ getCouponValidateTime(coupon) }}
              </div>
            </div>
            <div class="coupon-item-ft">
              <div
                class="btn-coupon"
                :style="{
                  backgroundColor: theme
                }"
                @click="handleClickGetCoupon(coupon)"
              >
                {{ $t('comps.coupon-picker.184020-1') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpDpTransition>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: '',
  props: {
    info: Object,
    theme: String
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    async getCardList() {
      const { shop_id, list } = this.info
      const itemIds = list.map((item) => item.item_id)
      const coupons = await this.$api.cart.cardList({
        distributor_id: shop_id,
        end_date: 1,
        item_id: itemIds,
        page_size: 999
      })
      this.list = coupons.list
    },
    getCouponTitle(item) {
      let title = ''
      if (item.card_type == 'cash') {
        title = `￥${item.reduce_cost / 100}`
      } else if (item.card_type == 'gift') {
        title = this.$t('comps.coupon-picker.184020-2')
      } else if (item.card_type == 'discount') {
        title = this.$t('comps.coupon-picker.184020-3', [(100 - item.discount) / 10])
      }
      return title
    },
    getCouponName(item) {
      let couponType = '',
        couponDesc = ''
      if (item.card_type == 'cash') {
        couponType = this.$t('comps.coupon-picker.184020-4')
        couponDesc = this.$t('comps.coupon-picker.184020-5', [item.least_cost > 0 ? item.least_cost / 100 : 0.01])
      } else if (item.card_type == 'gift') {
        couponType = this.$t('comps.coupon-picker.184020-2')
      } else if (item.card_type == 'discount') {
        couponType = this.$t('comps.coupon-picker.184020-6')
        couponDesc = this.$t('comps.coupon-picker.184020-5', [item.least_cost > 0 ? item.least_cost / 100 : 0.01])
      }
      return `【${couponType}】${item.title} ${couponDesc}`
    },
    getCouponValidateTime(item) {
      return `${moment(parseInt(item.begin_date) * 1000).format('YYYY.M.D')}--${moment(parseInt(item.end_date) * 1000).format(
        'YYYY.M.D'
      )}`
    },
    // 领取优惠券
    async handleClickGetCoupon(coupon) {
      await this.$api.cart.receiveCard({
        card_id: coupon.card_id
      })
      this.$Message.success(this.$t('comps.coupon-picker.184020-7'))
    }
  }
}
</script>
