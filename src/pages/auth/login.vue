/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./login.scss"></style>

<template>
<div class="page-auth-login ">
  <!--<div class="login-logo">
     <img
      referrerpolicy="no-referrer"
      src="../../assets/imgs/login_logo.png"
    /> 
  </div> -->
  <div class="login-main">
    <div class="login-title ">
      {{ $t('auth.login.961430-0') }}
      </div>
    <div class="tabs">
      <div class="tab-item" :class="{ active: isAccountLogin }" :style="{
        borderBottomColor: isAccountLogin ? '#FF5D02' : ''
      }" @click="handleToggleLogin('account')">{{ $t('auth.login.961430-1') }}</div>
      <div class="tab-item" :class="{ active: isYzmLogin }" :style="{
        borderBottomColor: isYzmLogin ? '#FF5D02' : ''
      }" @click="handleToggleLogin('yzm')">{{ $t('auth.login.961430-2') }}</div>
    </div>
    <!-- {{ $t('auth.login.961430-1') }} -->
    <SpForm
      class="login-con__form"
      ref="form-login"
      v-if="isAccountLogin"
      :model="accountLogin"
      :rules="accountRules"
      style="height: 372px;"
      >
      <SpFormItem prop="account">
        <SpInput
          icon="new_iconfont icon-new-pc-zhanghu"
          v-model="accountLogin.account"
          :placeholder="$t('auth.login.961430-3')"
          @keyup.enter.native="handleSubmit('form-login')"
        />
      </SpFormItem>
      <SpFormItem prop="password">
        <SpInput
          v-model="accountLogin.password"
          icon="new_iconfont icon-new-pc-mima"
          type="password"
          :placeholder="$t('auth.login.961430-4')"
          @keyup.enter.native="handleSubmit('form-login')"
        />
      </SpFormItem>
      <SpFormItem class="btn-container">
        <div class="btn-container__login">
          <SpButton long type="primary" @click="handleSubmit('form-login')">{{ $t('auth.login.961430-5') }}</SpButton>
        </div>
      </SpFormItem>
    </SpForm>
    <!-- {{ $t('auth.login.961430-2') }} -->
    <SpForm
      class="login-con__form"
      ref="mobile_login"
      v-if="isYzmLogin"
      :model="yzmLogin"
      :rules="yzmRules"
      style="height: 426px;"
    >
      <SpFormItem prop="account">
        <SpInput
          icon="new_iconfont icon-new-pc-zhanghu"
          v-model="yzmLogin.account"
          :placeholder="$t('auth.login.961430-3')"
          @keyup.enter.native="handleSubmit('mobile_login')"
        />
      </SpFormItem>
      <SpFormItem prop="yzm" class="yzm-field">
        <SpInput
          icon="new_iconfont icon-new-pc-tuxingyanzhengma"
          class="yzm-text"
          v-model="yzmLogin.yzm"
          :placeholder="$t('auth.login.961430-6')" />
        <div class="yzm-img" @click="handleClickImgcode('login')">
          <img :src="imgInfo.imageData" alt />
        </div>
      </SpFormItem>
      <SpFormItem prop="vcode" class="yzm-field">
        <SpInput
          icon="new_iconfont icon-new-pc-yanzhengma"
          v-model="yzmLogin.vcode"
          :placeholder="$t('auth.login.961430-7')"
          class="yzm-text"
          @keyup.enter.native="handleSubmit('mobile_login')"
        />
        <div class="btn-timer">
          <SpTimer
            :onStart="handleTimerStart"
            @UpdateTimer="handleUpdateTimer"
            @Stop="handleTimerStop"
            :timerMsg="timerMsg"
            :duration="120"
          ></SpTimer>
        </div>
      </SpFormItem>
      <SpFormItem class="btn-container">
        <div class="btn-container__login">
          <SpButton long type="primary" @click="handleSubmit('mobile_login')">{{ $t('auth.login.961430-5') }}</SpButton>
        </div>
      </SpFormItem>
    </SpForm>
    <div class="form-link">
      <NuxtLink class="link" to="/auth/forget-password">{{ $t('auth.login.961430-8') }}</NuxtLink>
      <!-- <NuxtLink class="register-link" to="/auth/reg?fromlogin=true">
        立即注册<i class="ec-icon ec-icon-right"></i>
      </NuxtLink> -->
    </div>
    <!-- <div class="trust-login">
      <div class="trust-item" v-for="(item, index) in trustLogins" :key="`trust-item__${index}`">
        <i class="ec-icon" :class="{
          'ec-icon-weixin1': item.type === 'weixin' && item.status
        }" @click="handleClickTrustLogin(item)"></i>
      </div>
    </div> -->
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getWechatLoginCode } from '@/api/user'
import S from '@/spx'
import _debounce from 'lodash/debounce'
import { mixin } from '@/mixins'
import { YZM_LOGIN, ACCOUNT_LOGIN } from '@/consts'
import { validate } from '@/utils'

export default {
  head() {
    return {
      title: this.$t('auth.login.961430-9'),
    }
  },
  layout: 'auth_layout',
  mixins: [mixin],
  async asyncData({ app, isMobile, req }) {
    const trustLogins = await app.$api.user.getLoginWayList()
    return {
      trustLogins
    }
  },
  computed: {
    isAccountLogin() {
      return this.loginType == ACCOUNT_LOGIN
    },
    isYzmLogin() {
      return this.loginType == YZM_LOGIN
    }
  },
  data() {
    return {
      loginType: ACCOUNT_LOGIN,
      accountLogin: {
        account: '',
        password: ''
      },
      accountRules: {
        account: [{ validate: 'required', message: this.$t('auth.login.961430-10') }],
        password: [{ validate: 'required', message: this.$t('auth.login.961430-11') }]
      },
      yzmLogin: {
        account: '',
        yzm: '',
        vcode: ''
      },
      yzmRules: {
        account: [{ validate: 'required', message: this.$t('auth.login.961430-10') }],
        vcode: [{ validate: 'required', message: this.$t('auth.login.961430-12') }]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.login.961430-13')
    }
  },
  created() {
    this.handleSubmit = _debounce((e) => {
      this.$refs[e].validate(async (valid, errors) => {
        if (valid) {
          this.login()

        }
      })
    }, 300)
  },
  mounted() {
    this.yzmImg('login')
  },
  methods: {
    handleToggleLogin(type) {
      if(type == 'account') {
        this.loginType = ACCOUNT_LOGIN
      } else {
        this.loginType = YZM_LOGIN
      }
    },
    // 第三方登录
    handleClickTrustLogin(item) {
      const { type, status } = item
      if(status) {
        if(type == 'weixin') {
          getWechatLoginCode().then(({ redirect_url, config_info: { app_id, secret } }) => {
            this.$nextTick((_) => {
              localStorage.setItem('APP_ID', app_id)
              localStorage.setItem('LOGIN_WECHAT_SECRET', secret)
              const val = `${redirect_url}`
              window.location.href = val
            })
          })
        }
      }
    },
    async yzmImg(n) {
      const img_res = await this.$api.auth.regImg({
        type: n
      })
      this.imgInfo = img_res
    },
    handleClickImgcode(n) {
      this.yzmImg(n)
    },
    async handleTimerStart(cb, k) {
      const { account, yzm } = this.yzmLogin
      const { imageToken } = this.imgInfo
      if (!validate.validatePhone(account)) {
        this.$Message.error(this.$t('auth.login.961430-14'))
        return false
      }
      if(!yzm) {
        this.$Message.error(this.$t('auth.login.961430-15'))
        return false
      }
      try {
        const params = {
          type: 'login',
          mobile: account,
          yzm: yzm,
          token: imageToken
        }
                
        const { status_code ,message} = await this.$api.auth.regSmsCode(params)
        if(status_code == 422){
          this.$Message.error(message)
          return false
        }
        this.$Message.success(this.$t('auth.login.961430-16'))
        cb()
      } catch (e) {
        this.yzmImg('login')
        return
      }
    },
    handleUpdateTimer(e) {
      console.log('s',e)
      this.timerMsg = this.$t('auth.login.961430-17', [e]) 
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.login.961430-18')
    },
    async login() {
      let params = {}
      if (this.loginType == ACCOUNT_LOGIN) {
        const { account: username, password } = this.accountLogin
        params = {
          username,
          password
        }
      } else {
        const { account: username, vcode } = this.yzmLogin
        params = {
          username,
          vcode,
          check_type: 'mobile'
        }
      }
      const { token ,message} = await this.$api.auth.login(params)

      if(token){
        S.setAuthToken(token)
        this.$cookies.set('ECSHOPX_TOKEN', token)
        this.$Message.success(this.$t('auth.login.961430-19'))
        this.initStore()
        const { redirectUrl } = this.$route.query
        if (redirectUrl) {
          this.$router.push(decodeURIComponent(redirectUrl))
        } else {
          this.$router.push('/')
        }
      }else{
        this.$Message.error(message)
      }


    }
  }
}
</script>
