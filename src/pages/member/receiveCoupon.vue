/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./receiveCoupon.scss"></style>

<template>
  <div class="page-receive-coupon page-body">
    <div class="page-coupon__b clearfix container-member">
      <div class="left">
        <smenu active="coupon"></smenu>
      </div>
      <div class="right">
        <div class="h-title">
          <span class="back-btn" @click="goBack">{{ $t('member.receiveCoupon.522771-0') }}</span>
          <span>{{ $t('member.receiveCoupon.522771-1') }}</span>
        </div>
        <div class="coupon-container-member coupon-list">
          <div class="coupon-list__warp" v-for="(item, index) in list" :key="index">
            <div class="clearfix">
              <div class="coupon-list__icon">
                <img src="~/assets/imgs/dickies-logo.png" width="120" alt="logo" />
              </div>
              <div class="coupon-list__content">
                <div class="coupon-list__h">
                  <SpPrice class="price" :value="item.deduct_money"></SpPrice>
                  <span class="coupon-d">{{ item.coupon_name }}</span>
                  <span class="coupon-e">{{ $t('member.receiveCoupon.522771-2') }}</span>
                </div>
                <div class="coupon-list__datetime">
                  {{ handleDatetime(item.cansend_start_time) }}-{{
                    handleDatetime(item.cansend_end_time)
                  }}
                </div>
              </div>
              <div class="coupon-list__btn">
                <SpButton
                  type="warning"
                  @click="receiveCoupon(item.coupon_id, item.shop_id)"
                  v-if="item.user_get_times && item.all_use_times && item.get_time"
                  >{{ $t('member.receiveCoupon.522771-3') }}</SpButton
                >
                <SpButton type="primary" disabled v-if="!item.user_get_times">{{ $t('member.receiveCoupon.522771-4') }}</SpButton>
                <SpButton
                  type="primary"
                  disabled
                  v-if="item.user_get_times && (!item.all_use_times || !item.get_time)"
                  >{{ $t('member.receiveCoupon.522771-5') }}</SpButton
                >
              </div>
            </div>
          </div>
        </div>
        <SpTipMessage
          v-model="tip"
          :tipText="$t('member.receiveCoupon.522771-6')"
          :tipLink="$t('member.receiveCoupon.522771-7')"
          :to="$t('member.receiveCoupon.522771-8')"
        ></SpTipMessage>
      </div>
    </div>

    <Recommend />
  </div>
</template>

<script>
import smenu from './../member/comps/smenu'
import Recommend from './../items/comps/recommend'
import { formatDataTime } from '@/utils'

export default {
  data() {
    return {
      list: null,
      tip: false,
      loading: false
    }
  },
  components: { smenu, Recommend },
  created() {
    this.getCouponList()
  },
  methods: {
    async getCouponList() {
      const { shopCouponList } = await this.$api.shop.couponList({ platform: 'app' })
      this.list = shopCouponList
      this.tip = !this.list || !this.list.length
    },
    handleDatetime(timestamp) {
      return formatDataTime(timestamp * 1000, 'YYYY.M.D HH:mm')
    },
    async receiveCoupon(coupon_id, shop_id) {
      if (this.loading) {
        return
      }
      this.loading = true
      let params = {
        coupon_id,
        shop_id
      }
      try {
        await this.$api.shop.receiveCoupon(params)
        this.$Message.success(this.$t('member.receiveCoupon.522771-9'))
        this.getCouponList()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
