/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="shop-settle-login container">
    <!-- <div class="login-logo">
      <img referrerpolicy="no-referrer" src="../../assets/imgs/login_logo.png" />
    </div> -->
    <div class="login-main">
      <img src="../../assets/imgs/black.png" alt="" />
      <!-- <div class="login-title ">
        商家登录
      </div> -->
      <!-- 账号登录 -->
      <SpForm
        class="login-con__form"
        ref="mobile_login"
        v-if="isYzmLogin"
        :model="yzmLogin"
        :rules="yzmRules"
        style="{height: 426px;}"
      >
        <SpFormItem prop="mobile">
          <SpInput
            icon="new_iconfont icon-new-pc-zhanghu"
            v-model="yzmLogin.mobile"
            :placeholder="$t('shop.index.963066-0')"
          />
          <!-- @keyup.enter.native="handleSubmit('mobile_login')" -->
        </SpFormItem>
        <SpFormItem prop="yzm" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-tuxingyanzhengma"
            class="yzm-text"
            v-model="yzmLogin.yzm"
            :placeholder="$t('shop.index.963066-1')"
          />
          <div class="yzm-img" @click="handleClickImgcode('merchant_login')">
            <img :src="imgInfo.imageData" alt />
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-yanzhengma"
            v-model="yzmLogin.vcode"
            :placeholder="$t('shop.index.963066-2')"
            class="yzm-text"
            @keyup.enter.native="handleSubmit('merchant_login')"
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
            <SpButton long type="primary" @click="handleSubmit('mobile_login')">{{ $t('shop.index.963066-3') }}</SpButton>
          </div>
        </SpFormItem>
        <div class="form-link">
          <SpRadio type="checkbox" size="small" v-model="checkLabel"></SpRadio>
          <p>
            {{ $t('shop.index.963066-4') }}
            <span class="link" @click="protocolHandle">{{ $t('shop.index.963066-5') }}</span>
          </p>
        </div>
      </SpForm>
    </div>
    <SpModal v-model="visiableProtocolDialog" :width="600">
      <div slot="title" class="protocol-title">{{ $t('shop.index.963066-5') }}</div>
      <div class="protocol-info">
        <p class="dialog-info" v-html="baseContent"></p>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { merchantLogin } from '@/api/user'
import S from '@/spx'
import _debounce from 'lodash/debounce'
import { mixin } from '@/mixins'
import { YZM_LOGIN, ACCOUNT_LOGIN } from '@/consts'
import { validate } from '@/utils'
import { getBasesetting } from '@/api/store'

export default {
  head() {
    return {
      title: this.$t('shop.index.963066-6')
    }
  },
  components: {},
  layout: 'shop_layout',
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
      loginType: YZM_LOGIN,
      visiableProtocolDialog: false,
      checkLabel: false,
      baseContent: '',
      yzmLogin: {
        mobile: '',
        yzm: '',
        vcode: ''
      },
      yzmRules: {
        mobile: [{ validate: 'required', message: this.$t('shop.index.963066-7') }],
        vcode: [{ validate: 'required', message: this.$t('shop.index.963066-8') }]
      },
      imgInfo: {},
      timerMsg: this.$t('shop.index.963066-9')
    }
  },
  created() {
    if (this.$cookies.get('ECSHOPX_STORE_TOKEN')) {
      this.$router.push('/shop/settleform')
    }
    this.handleSubmit = _debounce((e) => {
      this.$refs[e].validate(async (valid, errors) => {
        if (valid) {
          this.login()
        }
      })
    }, 300)
  },
  mounted() {
    this.yzmImg('merchant_login')
  },
  methods: {
    handleToggleLogin(type) {
      if (type == 'account') {
        this.loginType = ACCOUNT_LOGIN
      } else {
        this.loginType = YZM_LOGIN
      }
    },
    // 第三方登录
    // handleClickTrustLogin(item) {
    //   const { type, status } = item
    //   if (status) {
    //     if (type == 'weixin') {
    //       merchantLogin().then(({ redirect_url, config_info: { app_id, secret } }) => {
    //         this.$nextTick((_) => {
    //           localStorage.setItem('APP_ID', app_id)
    //           localStorage.setItem('LOGIN_WECHAT_SECRET', secret)
    //           const val = `${redirect_url}`
    //           window.location.href = val
    //         })
    //       })
    //     }
    //   }
    // },
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
      const { mobile, yzm, vcode } = this.yzmLogin
      const { imageToken } = this.imgInfo
      console.log(imageToken)
      if (!validate.validatePhone(mobile)) {
        this.$Message.error(this.$t('shop.index.963066-10'))
        return false
      }
      if (!yzm) {
        this.$Message.error(this.$t('shop.index.963066-11'))
        return false
      }
      try {
        const params = {
          type: 'merchant_login',
          mobile,
          // vcode,
          yzm: yzm,
          token: imageToken
        }
        const { status_code, message } = await this.$api.auth.regSmsCode(params)
        if (status_code == 422) {
          this.$Message.error(message)
          return false
        }
        this.$Message.success(this.$t('shop.index.963066-12'))
        cb()
      } catch (e) {
        this.yzmImg('merchant_login')
        return
      }
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('shop.index.963066-13', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('shop.index.963066-14')
    },
    async login() {
      let params = {}
      const { mobile, vcode } = this.yzmLogin
      if (!this.checkLabel) {
        this.$Message.error(this.$t('shop.index.963066-15'))
        return
      }
      params = {
        mobile,
        vcode
      }
      const { token, message } = await merchantLogin(params)

      if (token) {
        S.setAuthToken(token)
        this.$cookies.set('ECSHOPX_STORE_TOKEN', token)

        this.$Message.success(this.$t('shop.index.963066-16'))
        // this.initStore()
        const { redirectUrl } = this.$route.query
        if (redirectUrl) {
          this.$router.push(decodeURIComponent(redirectUrl))
        } else {
          this.$router.push('/shop/settleform')
        }
      } else {
        this.$Message.error(message)
      }
    },
    // 打开协议
    protocolHandle() {
      this.visiableProtocolDialog = true
      if (!this.baseContent) {
        this.getBasesetInfo()
      }
    },
    // 获取商户入驻协议
    getBasesetInfo() {
      getBasesetting().then((res) => {
        console.log(res)
        this.baseContent = res.content
      })
    }
  }
}
</script>