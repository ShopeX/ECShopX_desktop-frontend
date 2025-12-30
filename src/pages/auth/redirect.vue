/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.page-auth-redirct {
  .error {
    text-align: center;
    font-size: 16px;
  }
  .bind-cont {
    text-align: center;
    padding: 60px 0;
  }
}
</style>

<template>
  <div class="page-auth-redirct page-body">
    <div class="container">
      <div class="bind-cont" v-if="!loading">
        <div class="error" v-if="error">
          {{ error.msg || error.message }}
        </div>
        <div class="bind" v-else-if="!isBind">
          <!-- <SpButton type="primary" @click="bindUser('exist')">老用户绑定</SpButton>
        <SpButton type="primary" @click="bindUser('signup')">新用户绑定</SpButton> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {
      loading: false,
      isBind: false,
      error: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions(['initStore']),
    bindUser(type) {
      const { sess_id } = this.$route.query
      const search = `?type=trust&sess_id=${sess_id}`
      const url = type === 'exist' ? `/auth/bind${search}` : `/auth/reg${search}`

      this.$router.replace(url)
    },

    async fetch() {
      this.loading = true
      const { sess_id, login_type } = this.$route.query
      analytics.event(
        {
          login_type
        },
        'newLogin'
      )

      try {
        const { accessToken } = await this.$api.user.trustLoginBind({
          sess_id,
          accessToken: S.getAuthToken()
        })
        if (accessToken) {
          S.setAuthToken(accessToken)
          this.initStore()
          this.isBind = true
          this.$redirect({ key: 'auth_redirect' })
          return
        } else {
          // 临时更改
          // this.$router.push('/items?cat_id=8')
          this.isBind = false
          this.bindUser('exist')
        }
      } catch (e) {
        this.error = e
      }

      this.loading = false
    }
  }
}
</script>
