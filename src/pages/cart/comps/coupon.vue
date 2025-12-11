/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="coupons">
    <template v-for="i in list">
      <div :key="i.card_id" class="coupon clearfix">
        <div class="left clearfix">
          <div v-if="i.card_type === 'cash'" class="left-bd">
            <!-- <span class="text">{{i.title}}</span> -->
            <span :class="i.getted === 1 || i.getted === 2 ? 'text-title-g' : 'text-title'"
              >￥{{ i.reduce_cost | formatPriceToHundred }}</span
            >
            <div class="text-time">
              <span class="text">{{ $t('comps.coupon.291157-0') }}{{ i.least_cost > 0 ? i.least_cost / 100 : 0.01 }}{{ $t('comps.coupon.291157-1') }}</span>
              <span class="time"
                >{{ i.begin_date | parseTime('{y}-{m}-{d}') }}—{{
                  i.end_date | parseTime('{y}-{m}-{d}')
                }}</span
              >
            </div>
          </div>
          <div v-else-if="i.card_type === 'gift'" class="left-bd">
            <!-- <span class="text">{{i.title}}</span> -->
            <span :class="i.getted === 1 || i.getted === 2 ? 'text-title-g' : 'text-title'">{{
              i.title
            }}</span>
            <div class="text-time">
              <span class="text">{{ $t('comps.coupon.291157-2') }}</span>
              <span class="time"
                >{{ i.begin_date | parseTime('{y}-{m}-{d}') }}—{{
                  i.end_date | parseTime('{y}-{m}-{d}')
                }}</span
              >
            </div>
          </div>
          <div v-else-if="i.card_type === 'discount'" class="left-bd">
            <!-- <span class="text">{{i.title}}</span> -->
            <span :class="i.getted === 1 || i.getted === 2 ? 'text-title-g' : 'text-title'"
              >{{ (100 - i.discount) / 10 }}{{ $t('comps.coupon.291157-3') }}</span
            >
            <div class="text-time">
              <span class="text">{{ $t('comps.coupon.291157-0') }}{{ i.least_cost > 0 ? i.least_cost / 100 : 0.01 }}{{ $t('comps.coupon.291157-1') }}</span>
              <span class="time"
                >{{ i.begin_date | parseTime('{y}-{m}-{d}') }}—{{
                  i.end_date | parseTime('{y}-{m}-{d}')
                }}</span
              >
            </div>
          </div>
          <div v-else class="left-bd">{{ $t('comps.coupon.291157-4') }}</div>
          <!-- <span class="time">{{i.begin_date|parseTime('{y}-{m}-{d}')}}~{{i.end_date|parseTime('{y}-{m}-{d}')}}</span> -->
        </div>
        <div class="right">
          <div v-if="i.getted === 1" class="btn-disable">{{ $t('comps.coupon.291157-5') }}</div>
          <div v-else-if="i.getted === 2" class="btn-disable">{{ $t('comps.coupon.291157-6') }}</div>
          <div v-else class="btn" @click="handelClick(i)">{{ $t('comps.coupon.291157-7') }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { receiveCard, cardList } from '@/api/cart'

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
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
      let item_id = []
      this.item.children.forEach((element) => {
        item_id.push(element.item_id)
      })
      let obj = {
        distributor_id: this.item.shopId,
        end_date: 1,
        item_id,
        page_size: 999
      }
      let { list } = await cardList(obj)
      // list[0].getted = 1
      // list[1].getted = 2

      this.list = list
    },
    handelClick(item) {
      let obj = {
        card_id: item.card_id
      }
      receiveCard(obj).then((res) => {
        this.$Message.success(this.$t('comps.coupon.291157-8'))
        this.getCardList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupons {
  .coupon {
    margin-top: 10px;
    padding: 0 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      // float: left;
      width: 425px;
      .text-title {
        display: inline-block;
        border: 1px solid #f2cccc;
        color: #e43838;
        width: 80px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        overflow: hidden;
      }
      .text-title-g {
        display: inline-block;
        border: 1px solid #e3e3e3;
        color: #888;
        width: 80px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        overflow: hidden;
      }

      padding: 0 10px;

      // .left-bd{
      // 	line-height: 28px;
      // }
      .text {
        // line-height: 22px;
        font-size: 12px;
        display: inline-block;
        vertical-align: top;
        // height: 22px;
      }
      .text-time {
        width: 295px;
        display: inline-block;
        vertical-align: top;
        height: 30px;
      }
      .time {
        line-height: 15px;
        display: block;
        font-size: 10px;
        color: #888888;
      }
      // span {
      //   color: #fff;
      // }
    }
    .right {
      // float: right;
      width: 55px;
      // height: 90px;
      // line-height: 88px;
    }
  }
  .btn {
    display: inline-block;
    width: 50px;
    height: 24px;
    line-height: 24px;
    border: 1 solid $color-brand-primary;
    background-color: $color-brand-primary;
    color: #fff;
    text-align: center;
    // border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rgba(245, 108, 108, 1);
    }
  }
  .btn-disable {
    // background-color: rgba(245, 108, 108, 1);
    cursor: default;
    color: #888;
  }
}
</style>
