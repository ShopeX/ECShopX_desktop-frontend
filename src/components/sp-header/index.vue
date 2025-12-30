/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<!--
 * @Author: your name
 * @Date: 2021-02-03 14:27:08
 * @LastEditTime: 2021-02-22 14:31:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/components/sp-header/index.vue
-->
<style lang="scss" src="./index.scss"></style>
<template>
  <div class="header-bar">
    <div class="header-bar__topbar">
      <div class="container clearfix">
        <div class="topbar-login fl">
          <div class="no-login active">
            <NuxtLink to="/" class="index-link">{{ $t('sp-header.index.663900-0') }}</NuxtLink>
            <template v-if="!userInfo">
              <NuxtLink to="/auth/login" class="topbar-login__link " style="color:#FF5D02;">{{
                $t('sp-header.index.663900-1') }}</NuxtLink>
              <NuxtLink to="/auth/reg" class="topbar-login__link topbar-register__link ">{{
                $t('sp-header.index.663900-2') }}</NuxtLink>
              <!-- <img src="../../assets/imgs/top.png" /> -->
            </template>

            <template v-else>
              <span class="sys-hello">{{ $t('sp-header.index.663900-3') }}</span>
              <span class="member-phone">{{ userInfo.memberInfo.mobile }}</span>
              <span class="exit-btn" @click="handleLogout()">{{ $t('sp-header.index.663900-4') }}</span>
            </template>
            <span @click="handleChangeLanguage">
              {{ $t('sp-header.index.061123-0') }}{{ $i18n.locale == 'zh' ? $t('sp-header.index.061123-1') : $t('sp-header.index.061123-2') }}
            </span>
          </div>
        </div>
        <div class="topbar-member fr">
          <NuxtLink to="/cart" style="margin-right:0;">{{ $t('sp-header.index.663900-5') }}</NuxtLink>
          <span>|</span>
          <NuxtLink to="/member/trade" style="margin-right:0;">{{ $t('sp-header.index.663900-6') }}</NuxtLink>
          <span>|</span>
          <NuxtLink to="/member/user-info" style="margin-right:0;">{{ $t('sp-header.index.663900-7') }}</NuxtLink>
          <span>|</span>
          <NuxtLink to="/shop">{{ $t('sp-header.index.663900-8') }}</NuxtLink>
          <!-- 隐藏商家中心 -->
          <!-- <NuxtLink to="/member/user-info">商家中心</NuxtLink> -->

          <!-- <NuxtLink to="/">{{ $t('sp-header.index.663900-0') }}</NuxtLink> -->
          <!-- <NuxtLink to="/pointitems">积分商城</NuxtLink> -->
        </div>
      </div>
    </div>

    <!-- 挂件 -->
    <!-- <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
      @callback="handleCallback"
    ></component> -->
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { mapState } from 'vuex'
import { lockScreen } from '@/utils/dom'
import S from '@/spx'

export default {
  name: 'SpHeader',
  mixins: [clickaway],
  data() {
    return {
      message: '',
      basefile: 'newwapmall/block/header.html',
      fixed: false,
      showSubNav: null,
      message: ''
    }
  },
  watch: {
    $route() {
      this.sub_index = null
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      // wgts: (state) => {
      //   const res = state.headerTemplate
      //   return res ? JSON.parse(res.params) : []
      // },
      pageConfig: (state) => {
        return state.pageConfig
      }
    })
  },
  methods: {
    handleChangeLanguage() {
      this.$store.commit('SET_LANG', this.$i18n.locale == 'zh' ? 'en' : 'zh')
      this.$i18n.setLocale(this.$i18n.locale == 'zh' ? 'en' : 'zh')
    },
    handleLogout() {
      this.$cookies.remove('ECSHOPX_TOKEN')
      S.logout()
    },
    handleCallback(params) {
      if (params) {
        let keywords = params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }
    }
  }
}
</script>