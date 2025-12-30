/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-smenu {
  padding: 20px;
  padding-left: 42px;
  min-height: 600px;
  // border: 1px solid $color-border-gray;
  border-radius: 4px;
  .menu-block {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
    .submenu-title {
      font-size: 15px;
      font-weight: 600;
      color: #3b3b3b;
      .new_iconfont {
        color: #8a8a8a;
        font-size: 18px;
        margin-left: -24px;
        margin-right: 8px;
      }
    }
    .submenu-con {
      margin-top: 6px;
    }
    .submenu-item {
      &:not(:last-child) {
        margin-bottom: 6px;
      }
      a {
        font-size: 13px;
      }
    }
  }
}
</style>

<template>
  <ul class="sp-smenu">
    <li class="menu-block">
      <p class="submenu-title"><i class="new_iconfont icon-new-pc-huiyuanxinxi"></i>{{ $t('comps.smenu.182568-0') }}</p>
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/user-info" :style="getActiveColor('user-info')"
            >{{ $t('comps.smenu.182568-1') }}</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/change-password" :style="getActiveColor('change-password')"
            >{{ $t('comps.smenu.182568-2') }}</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/address" :style="getActiveColor('address')">{{ $t('comps.smenu.182568-3') }}</nuxt-link>
        </li>
      </ul>
    </li>
    <li class="menu-block">
      <p class="submenu-title"><i class="new_iconfont icon-new-pc-dingdan"></i>{{ $t('comps.smenu.182568-4') }}</p>
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/trade" :style="getActiveColor('trade')">{{ $t('comps.smenu.182568-5') }}</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/trade/aftersale-list" :style="getActiveColor('aftersale')"
            >{{ $t('comps.smenu.182568-6') }}</nuxt-link
          >
        </li>
      </ul>
    </li>
    <li class="menu-block">
      <!-- <p class="submenu-title"><i class="new_iconfont icon-new-pc-youhuiquan"></i>{{ $t('comps.smenu.182568-7') }}</p> -->
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/coupon" :style="getActiveColor('coupon')">{{ $t('comps.smenu.182568-7') }}</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/collector" :style="getActiveColor('collector')"
            >{{ $t('comps.smenu.182568-8') }}</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/foottrace" :style="getActiveColor('foottrace')"
            >{{ $t('comps.smenu.182568-9') }}</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/point" :style="getActiveColor('point')">{{ $t('comps.smenu.182568-10') }}</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/follow" :style="getActiveColor('follow')">{{ $t('comps.smenu.182568-11') }}</nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mixin } from '@/mixins'
import tabs from './tabs'

const SHOW_TABS_MAP = ['member-trade', 'member-coupon']

export default {
  mixins: [mixin],
  components: { tabs },
  props: {
    activeTitle: String,
    active: String
  },
  data() {
    return {
      SHOW_TABS_MAP,
      orderType: '',
      tabs: [
        { label: this.$t('comps.smenu.182568-5'), value: '' },
        { label: this.$t('comps.smenu.182568-6'), value: 's' }
      ],
      couponType: '',
      couponTabs: [
        { label: this.$t('comps.smenu.182568-12'), value: '1' },
        { label: this.$t('comps.smenu.182568-13'), value: '2' }
      ],
      showTabs: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newV) {
        const { name } = this.$route
        const { type, coupon_type } = this.$route.query
        this.orderType = type || ''
        this.couponType = coupon_type
        this.showTabs = SHOW_TABS_MAP.indexOf(name) !== -1 ? name : ''
      }
    }
  },
  methods: {
    getActiveColor(name) {
      const { themeColor } = this.pageConfig
      if (this.active == name) {
        return {
          color: themeColor
        }
      }
    },
    handleOrderChangeTab(e) {
      let url = e.value ? `/member/trade?type=${e.value}` : `/member/trade`
      this.$router.replace(url)
    },
    handleCouponChangeTab(e) {
      let url = e.value ? `/member/coupon?coupon_type=${e.value}` : `/member/coupon`
      this.$router.replace(url)
    }
  }
}
</script>
