/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="header-bar">
    <div class="header-bar__topbar">
      <div class="container clearfix">
        <div class="topbar-login fl">
          <div class="no-login active">
            <!-- <NuxtLink to="/" class="index-link">首页</NuxtLink> -->
            <template v-if="!userInfo">
              <NuxtLink
                to="/auth/login"
                class="topbar-login__link"
                >{{ $t('sp-header.index copy.249207-0') }}</NuxtLink
              >
              <NuxtLink
                to="/auth/reg"
                class="topbar-login__link"
                >{{ $t('sp-header.index copy.249207-1') }}</NuxtLink
              >
            </template>
            <template v-else>
              <span class="sys-hello">{{ $t('sp-header.index copy.249207-2') }}</span>
              <span class="member-phone">{{ userInfo.memberInfo.mobile }}</span>
              <span class="exit-btn" @click="handleLogout()">{{ $t('sp-header.index copy.249207-3') }}</span>
            </template>
          </div>
        </div>
        <div class="topbar-member fr">
          <NuxtLink to="/cart" style="margin-right:0;">{{ $t('sp-header.index copy.249207-4') }}</NuxtLink>
          <span>|</span>
          <NuxtLink to="/member/user-info">{{ $t('sp-header.index copy.249207-5') }}</NuxtLink>
          <span>|</span>
          <!-- 隐藏商家中心 -->
          <!-- <NuxtLink to="/member/user-info">商家中心</NuxtLink> -->
          <NuxtLink to="/member/trade">{{ $t('sp-header.index copy.249207-6') }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="header-bar__search">
      <div class="container">
        <div class="logo-con">
          <NuxtLink to="/">
            <img
              src="http://bbctest.aixue7.com/image/1/2020/05/20/422ffaee0f3df9d49ade7f0f9011a0e0CiQfkvaPKu8v9IM1uzWvAodnukfhsV61"
              height="50"
            />
          </NuxtLink>
        </div>
        <div class="search-con">
          <SpSearch type="primary" />
        </div>
        <div class="cart-con">
          <!-- <NuxtLink to="/cart" class="cart-link">
            <div class="cart-icon" v-if="cartCount > 0">
              <i class="ec-icon ec-icon-cart"></i>
              <span class="count">{{ cartCount }}</span>
            </div>
            {{ $t('sp-header.index copy.249207-7') }}
          </NuxtLink> -->
          <minicart :title="$t('sp-header.index copy.249207-7')"></minicart>
        </div>
      </div>
    </div>

    <div class="header-bar__nav">
      <div class="container clearfix">
        <div class="all-category">
          <div class="all-category__btn">{{ $t('sp-header.index copy.249207-8') }}</div>
          <div class="category-list">
            <div class="category-main" v-for="item in category" :key="`category-${item.category_id}`">
              <div class="category-main__btn">{{ item.category_name }}</div>
              <template v-if="item.children">
                <div class="category-main__con">
                  <div class="category-child" v-for="(sitem, sindex) in item.children" :key="`scategory-${sindex}`">
                    <div class="category-child__btn">{{ sitem.category_name }}</div>
                    <template v-if="sitem.children">
                      <div class="category-subchild" v-for="(titem, tindex) in sitem.children" :key="`tcategory-${tindex}`">
                        <div class="category-subchild__btn">{{ titem.category_name }}</div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
            <div></div>
          </div>
        </div>
        <ul class="navs-con">
          <li class="nav-item" v-for="item in navs" :key="`navs-item__${item.id}`">
            <nuxt-link to="/items">{{ item.tab }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "@/plugins/clickaway";
import { mapState } from "vuex";
import { lockScreen } from "@/utils/dom";
import S from "@/spx";
import minicart from './minicart'

export default {
  name: "Header",
  mixins: [clickaway],
  // serverCacheKey: () => 'block::newwapmall/block/header.html',
  data() {
    return {
      message: "",
      basefile: "newwapmall/block/header.html",
      fixed: false,
      showSubNav: null,
      message: ""
    };
  },
  watch: {
    $route() {
      this.sub_index = null;
    }
  },
  computed: {
    ...mapState({
      navs: state => {
        const { config } = state.commonWgts.templateIndex
        const navs = config.length > 0 ? config.find(item => item.name == 'nav').data : []
        return navs
      },
      userInfo: state => state.user.userInfo,
      cartCount: state => state.cart.cartCount,
      category: ({ category }) => {
        if(category.length > 10) {
          category = category.slice(0, 10)
        } 
        return category
      }
    })
  },
  mounted() {
    // let scrollTop =
    //   document.body.scrollTop || document.documentElement.scrollTop;
    // this.fixed = scrollTop > 0;
    // if (window.addEventListener) {
    //   window.addEventListener(
    //     "scroll",
    //     () => {
    //       let scrollTop =
    //         document.body.scrollTop || document.documentElement.scrollTop;
    //       this.fixed = scrollTop > 0;
    //     },
    //     false
    //   );
    // }
    // this.$EventBus.$on("show-sub-nav", v => {
    //   this.showSubNav = v;
    // });
  },
  components: { minicart },
  methods: {
    handleLogout() {
      S.logout()
      // this.$router.push('/')
    }
  }
};
</script>
