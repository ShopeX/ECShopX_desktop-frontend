/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="@/style/index.scss"></style>

<template>
  <LayoutHoc>
  <div class="system-container">
    <SpHeader />
    <div class="page-body">
      <Nuxt />
    </div>
    <SpFooter />
  </div>
</LayoutHoc>
</template>

<script>
import '@/main'
import { mapActions, mapState } from 'vuex'
// import { Header, Footer } from "@/components";
import { Tracker } from '@/service'
import { isNativeBrower } from '@/utils'
import { mixin } from '@/mixins'

export default {
  mixins: [mixin],
  head() {
    return {
      // title: this.pageSeo.title,
      title: "首页",
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.pageSeo.mate_keywords },
        { hid: 'description', name: 'description', content: this.pageSeo.mate_description }
      ]
    }
  },
  computed: {
    ...mapState({
      pageSeo: (state) => {
        return state.pageSeo
      }
    })
  },
  data() {
    return {
      pageOptions: {}
    }
  },
  watch: {
    $route(to, from) {
      this.changeRoute(to.name)
      // 对路由变化作出响应...
      if (!isNativeBrower()) {
        window.location.href = location.origin + to.fullPath
      }
    }
  },
  created() {
    this.initStore()
  },
  mounted() {
    this.changeRoute(this.$route.name)
  },
  methods: {
    // ...mapActions(["initStore"])
    changeRoute(to) {
      if (to === 'cart') {
        document.title = "购物车"
      } else if (to === 'member-trade') {
        document.title = "我的订单"
      } else if (to === 'member-user-info') {
        document.title = "会员中心"
      } else if (to === 'member-change-password') {
        document.title = "更改密码"
      } else if (to === 'member-address') {
        document.title = "收货地址"
      } else if (to === 'member-trade') {
        document.title = "所有订单"
      } else if (to === 'member-trade-id') {
        document.title = "订单详情"
      } else if (to === 'cart-checkout') {
        document.title = "订单信息"
      } else if (to === 'member-trade-aftersale-list') {
        document.title = "售后订单"
      } else if (to === 'member-trade-aftersale') {
        document.title = "售后详情"
      } else if (to === 'member-coupon') {
        document.title = "优惠券"
      } else if (to === 'member-collector') {
        document.title = "我的收藏"
      } else if (to === 'member-foottrace') {
        document.title = "我的足迹"
      } else if (to === 'member-point') {
        document.title = "我的积分"
      }
    }
  }
}
</script>
