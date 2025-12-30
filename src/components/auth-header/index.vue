/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss" scoped></style>
<template>
  <div class="authcustom-header">
    <div class="login-header-container">
      <NuxtLink to="/" style="display: block;">
        <img class="login-header-logo" referrerpolicy="no-referrer" :src="logo" />
      </NuxtLink>
      <div class="login-header-span">
        <span class="login-header-span1">{{ $t('auth-header.index.243996-0') }}</span>
        <NuxtLink v-if="this.$route.path != '/auth/reg'" to="/auth/reg" class="login-header-span2"
          >{{ $t('auth-header.index.243996-1') }}</NuxtLink
        >
        <NuxtLink v-else to="/auth/login" class="login-header-span2">{{ $t('auth-header.index.243996-2') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { mapState } from 'vuex'
import { lockScreen } from '@/utils/dom'
import S from '@/spx'

export default {
  name: 'AuthHeader',
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
  props: {
    logo: ''
  },
  watch: {
    $route() {
      this.sub_index = null
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      wgts: (state) => {
        const res = state.commonWgts.headerTemplate

        return res.params ? JSON.parse(res.params) : []
      }
    })
  },
  methods: {
    handleLogout() {
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
