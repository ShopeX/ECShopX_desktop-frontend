/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="header-bar">
    <div class="header-bar__topbar">
      <div class="container clearfix">
        <div class="topbar-login">
          <div class="no-login active">
            <NuxtLink to="/" class="index-link">首页</NuxtLink>
            <NuxtLink to="/auth/login" @click.native="$track('header', '登录')" class="topbar-login__link">登录</NuxtLink>
            <NuxtLink to="/auth/reg" @click.native="$track('header', '注册')" class="topbar-login__link">注册</NuxtLink>
          </div>
          <div class="is-logined">
            <span class="topbar-login__link name">您好admin！</span>
            <a class="topbar-login__link" href="javascript:void(0);" @click="exitSys">退出</a>
          </div>
        </div>
        <div class="topbar-member fr">
          <NuxtLink to="/member/trade" class="topbar-member__link">我的订单</NuxtLink>
          <NuxtLink to="/member/user-info" class="topbar-member__link">会员中心</NuxtLink>
          
        </div>
      </div>
    </div>

    <div class="header-bar__search">
      <div class="container">
        <div class="logo-img" @click="handleClickGoods">
          <img src="http://bbctest.aixue7.com/image/1/2020/05/20/422ffaee0f3df9d49ade7f0f9011a0e0CiQfkvaPKu8v9IM1uzWvAodnukfhsV61" />
        </div>
        <div class="search-wrap">
          <div class="search-bar">
            <SpInput v-model="message" placeholder="输入商品名称..."></SpInput>
            <div class="search-btn">搜索</div>
          </div>
          <div class="minicart">
            <NuxtLink to="/cart" class="index-link">查看购物车</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="header-bar__nav">
      
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { mapState } from 'vuex'
import { lockScreen } from '@/utils/dom'
import S from '@/spx'

export default {
  name: 'Header',
  mixins: [clickaway],
  // serverCacheKey: () => 'block::newwapmall/block/header.html',
  data () {
    return {
      basefile: 'newwapmall/block/header.html',
      fixed: false,
      showSubNav: null,
      message: ''
      //   showMenu: false,
      //   m_index: null,
      //   n_index: null,
      //   sub_index: null,
      //   category: null,
      //   itemSearchData: null,
      //   showSearch: false,
      //   showMbSearch: false,
      //   searchValue: '',
      //   emptySearchValue: '',
      //   showMore: false
    }
  },
  watch: {
    $route () {
      this.sub_index = null
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    styleReversal () {
      const { name } = this.$route
      const isIndex = name === 'index'
      return !((this.fixed || this.showSubNav)) && isIndex
    },
    ...mapState({
      wgts: state => state.commonWgts.header
    })
  },
  mounted () {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    this.fixed = scrollTop > 0
    if (window.addEventListener) {
      window.addEventListener('scroll', () => {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        this.fixed = scrollTop > 0
      }, false)
    }
    this.$EventBus.$on('show-sub-nav', v => {
      this.showSubNav = v
    })
  },
  // components: { minicart },
  methods: {
    async exitSys () {
      await this.$api.auth.logout()
      S.logout()
    },
    handleClickGoods () {
      this.$router.push(`/items`)
    },
    handleCloseMenu (url) {
      if (url) {
        this.closeMenu()
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
      if (this.showMenu) {
        lockScreen()
      } else {
        lockScreen(false)
      }
    },
    closeMenu () {
      this.showMenu = false
      lockScreen(false)
    },
    toggleSubMenu (url, index) {
      if (url) {
        this.sub_index = null
      } else {
        this.sub_index = index
      }
    },
    toggleMenuLevel1 (index) {
      this.m_index = this.m_index === index ? null : index
    },
    toggleMenuLevel2 (index, sindex) {
      this.n_index =
        this.n_index === `${index}_${sindex}` ? null : `${index}_${sindex}`
    },
    async handleChangeSearch (val) {
      this.emptySearchValue = val
      const { category, itemSearchData } = await this.$api.item.microSearch({
        accessToken: S.getAuthToken(),
        search_keywords: val
      })
      this.category = category
      this.itemSearchData = itemSearchData
      if (itemSearchData && itemSearchData.length > 5) {
        this.showMore = true
      } else {
        this.showMore = false
      }

      this.showSearch = true
    },
    away () {
      this.sub_index = null
    },
    searchAway () {
      this.showSearch = false
    }
  }
}
</script>
