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
      <div class="login-title ">
        商家登录
      </div>
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
            placeholder="手机号"
            @keyup.enter.native="handleSubmit('mobile_login')"
          />
        </SpFormItem>
        <SpFormItem prop="yzm" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-tuxingyanzhengma"
            class="yzm-text"
            v-model="yzmLogin.yzm"
            placeholder="图形验证码"
          />
          <div class="yzm-img" @click="handleClickImgcode('merchant_login')">
            <img :src="imgInfo.imageData" alt />
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-yanzhengma"
            v-model="yzmLogin.vcode"
            placeholder="验证码"
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
            <SpButton long type="primary" @click="handleSubmit('mobile_login')">登录</SpButton>
          </div>
        </SpFormItem>
      </SpForm>
      <div class="form-link">
        <SpRadio type="checkbox" size="small" v-model="checkLabel"></SpRadio>
        <p>
          阅读并同意
          <span class="link" @click="protocolHandle">隐私协议</span>
        </p>
        <!-- <NuxtLink class="link" to="/auth/forget-password">忘记密码</NuxtLink> -->
        <!-- <NuxtLink class="register-link" to="/auth/reg?fromlogin=true">
        立即注册<i class="ec-icon ec-icon-right"></i>
      </NuxtLink> -->
      </div>
    </div>
    <SpModal v-model="visiableProtocolDialog" :width="600">
      <div slot="title" class="protocol-title">提示</div>
      <div class="protocol-info">
        <p class="dialog-info">{{ baseContent }}</p>
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
      title: '登录/注册'
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
        mobile: [{ validate: 'required', message: '请输入手机号' }],
        vcode: [{ validate: 'required', message: '验证码不能为空' }]
      },
      imgInfo: {},
      timerMsg: '发送验证码'
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
        this.$Message.error('请输入正确的手机号')
        return false
      }
      if (!yzm) {
        this.$Message.error('请输入图形验证码')
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
        this.$Message.success('发送成功')
        cb()
      } catch (e) {
        this.yzmImg('merchant_login')
        return
      }
    },
    handleUpdateTimer(e) {
      this.timerMsg = `${e}秒后重发`
    },
    handleTimerStop() {
      this.timerMsg = `重发验证码`
    },
    async login() {
      let params = {}
      const { mobile, vcode } = this.yzmLogin
      if (!this.checkLabel) {
        this.$Message.error('请查看并勾选入驻协议')
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

        this.$Message.success('登录成功')
        this.initStore()
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