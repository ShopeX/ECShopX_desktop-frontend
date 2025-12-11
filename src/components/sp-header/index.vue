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
      <div class="container ">
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
            <div class="language-selector" v-on-clickaway="closeLanguageDropdown">
              <span
                class="language-selector__current"
                @click="toggleLanguageDropdown"
                style="cursor: pointer;"
              >
                {{ getCurrentLanguageName() }}
                <i class="ec-icon ec-icon-unfold" :class="{ 'active': showLanguageDropdown }"></i>
              </span>
              <ul
                class="language-selector__dropdown"
                v-if="showLanguageDropdown"
                v-show="showLanguageDropdown"
              >
                <li
                  v-for="lang in availableLanguages"
                  :key="lang.code"
                  :class="{ 'active': lang.code === $i18n.locale }"
                  @click="handleChangeLanguage(lang.code)"
                >
                  {{ lang.name }}
                </li>
              </ul>
            </div>
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
  mounted() {
    // 验证指令是否注册
    console.log('SpHeader mounted')
    console.log('Available directives:', Object.keys(this.$options.directives || {}))
    console.log('onClickaway directive:', this.$options.directives?.onClickaway)
    console.log('closeLanguageDropdown method:', typeof this.closeLanguageDropdown)

    // 检查元素是否存在
    this.$nextTick(() => {
      const selector = this.$el.querySelector('.language-selector')
      const current = this.$el.querySelector('.language-selector__current')
      console.log('Language selector element:', selector)
      console.log('Language selector current element:', current)

      if (current) {
        // 添加原生事件监听器测试
        current.addEventListener('click', (e) => {
          console.log('Native click event on language selector!', e)
          this.toggleLanguageDropdown(e)
        }, true) // 使用捕获阶段
      }
    })
  },
  data() {
    return {
      message: '',
      basefile: 'newwapmall/block/header.html',
      fixed: false,
      showSubNav: null,
      showLanguageDropdown: false
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
    }),
    availableLanguages() {
      return [
        { code: 'zh', name: '中文' },
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' }
      ]
    }
  },
  methods: {
    getCurrentLanguageName() {
      if (!this.$i18n || !this.$i18n.locale) {
        return '中文'
      }
      const currentLocale = this.$i18n.locale
      const lang = this.availableLanguages.find(l => l.code === currentLocale)
      return lang ? lang.name : '中文'
    },
    toggleLanguageDropdown(e) {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      this.showLanguageDropdown = !this.showLanguageDropdown

      // 计算下拉菜单位置
      if (this.showLanguageDropdown) {
        this.$nextTick(() => {
          const current = this.$el.querySelector('.language-selector__current')
          const dropdown = this.$el.querySelector('.language-selector__dropdown')
          if (current && dropdown) {
            const rect = current.getBoundingClientRect()
            dropdown.style.top = `${rect.bottom + 5}px`
            dropdown.style.left = `${rect.left}px`
          }
        })
      }
    },
    closeLanguageDropdown() {
      this.showLanguageDropdown = false
    },
    handleChangeLanguage(locale) {
      if (locale === this.$i18n.locale) {
        this.closeLanguageDropdown()
        return
      }

      this.$store.commit('SET_LANG', locale)
      this.$i18n.setLocale(locale)

      // 更新路由路径
      const currentPath = this.$route.path
      const pathLang = this.getlanguageByPath(currentPath)
      let newPath = currentPath

      if (pathLang) {
        // 替换路径中的语言代码
        newPath = currentPath.replace(`/${pathLang}`, `/${locale}`)
      } else {
        // 如果路径中没有语言代码，添加语言前缀
        newPath = `/${locale}${currentPath === '/' ? '' : currentPath}`
      }

      this.closeLanguageDropdown()
      this.$router.push({ path: newPath, query: this.$route.query })
    },
    getlanguageByPath(path) {
      if (path.includes('/zh')) return 'zh'
      if (path.includes('/en')) return 'en'
      if (path.includes('/ar')) return 'ar'
      return ''
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
