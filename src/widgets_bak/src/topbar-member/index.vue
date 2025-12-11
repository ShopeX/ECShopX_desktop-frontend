/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.topbar-member__exit-btn{
  margin-left: 40px;
}
</style>

<template>
  <no-ssr class="topbar-member">
    <span v-if="userInfo">
      <nuxt-link
        to="/member/user-info"
      >
      <!-- {{userInfo.is_staff === '1' ? (userInfo.work_name || userInfo.work_mobile || userInfo.email) : (userInfo.login_account || userInfo.mobile || userInfo.email)}} -->
      我的账户
      </nuxt-link>
      <a class="topbar-member__exit-btn" href="javascript:void(0);" @click="exitSys">退出</a>
      <!-- <img class="icon" src="~/assets/imgs/user.png" @click="userClick" width="20" height="20" alt="topbar-member"/> -->
    </span>
    <span v-else>
      <nuxt-link to="/auth/login" @click.native="$track('header', '登录')">登录</nuxt-link> <span>/</span>
      <nuxt-link to="/auth/reg" @click.native="$track('header', '注册')">注册</nuxt-link>
      <!-- <nuxt-link to="/auth/login">
        <img class="icon" src="~/assets/imgs/user.png" @click="handleClick" width="20" height="20" alt="topbar-member"/>
      </nuxt-link> -->
    </span>
  </no-ssr>
</template>

<script>
import S from '@/spx'
export default {
  props: {
    params: Object
  },

  data () {
    return {}
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async exitSys () {
      await this.$api.auth.logout()
      S.logout()
    },
    userClick () {
      this.$router.push('/member/trade')
    },
    handleClick () {
      this.$EventBus.$emit('close-menu')
    }
  }
}
</script>
