/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./auth-common.scss"></style>
<style lang="scss" src="./bind.scss"></style>

<template>
  <div class="page-bind page-body">
    <div class="auth bind">
      <p class="auth-title">{{ $t('auth.bind.050344-0') }}</p>
      <div class="clearfix">
        <div class="auth-form bind-form">
          <SpForm ref="form-bind" :model="info" :rules="rules">
            <SpFormItem prop="account">
              <span class="label-text">{{ $t('auth.bind.050344-1') }}</span>
              <SpInput v-model="info.account" />
            </SpFormItem>
            <SpFormItem prop="yzm">
              <span class="label-text">{{ $t('auth.bind.050344-2') }}</span>
              <div class="yzm-img" @click="handleClickImgcode">
                <img :src="imgInfo.base64Image" alt />
              </div>
              <SpInput v-model="info.yzm" />
            </SpFormItem>
            <SpFormItem prop="vcode">
              <span class="label-text">{{ $t('auth.bind.050344-3') }}</span>
              <div class="vcode-btn">
                <SpTimer
                  :onStart="handleTimerStart"
                  @UpdateTimer="handleUpdateTimer"
                  @Stop="handleTimerStop"
                  :timerMsg="timerMsg"
                  :duration="120"
                ></SpTimer>
              </div>
              <SpInput v-model="info.vcode" />
            </SpFormItem>

            <SpFormItem class="btn-container">
              <div class="btn-container__login">
                <SpButton class="button-dark" @click="loginSubmit('form-bind')">{{ $t('auth.bind.050344-4') }}</SpButton>
              </div>
              <!-- <div class="btn-container__register">
            <SpButton type="primary" size="large" long @click="handleClickBindAccount">绑定已有账户</SpButton>
              </div>-->
            </SpFormItem>
          </SpForm>
        </div>
        <div class="auth-pic">
          <img src alt />
        </div>
      </div>

      <!-- <div class="jump">
        <nuxt-link class="license-content" to="/license">
          点击跳过此步骤
          <i class="mb-iconfont mb-iconfont-right"></i>
        </nuxt-link>
      </div>-->
    </div>
  </div>
</template>

<script>
// import SpTimer from './comps/timer'
// import store from 'store'
import { mapActions } from 'vuex'
import S from '@/spx'

export default {
  data() {
    return {
      info: {
        account: '',
        yzm: '',
        vcode: ''
      },
      rules: {
        account: [{ validate: 'required', message: this.$t('auth.bind.050344-5') }],
        yzm: [{ validate: 'required', message: this.$t('auth.bind.050344-6') }],
        vcode: [{ validate: 'required', message: this.$t('auth.bind.050344-7') }]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.bind.050344-8'),
      license: false,
      message: ''
    }
  },
  created() {
    this.yzmImg()
  },
  methods: {
    ...mapActions(['initStore']),
    loginSubmit(name) {
      // TODO: validate
      this.message = ''
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.bindAccount()
        }
      })
    },

    async bindAccount() {
      const { sess_id } = this.$route.query
      try {
        let query = {
          ...this.info,
          vcode_type: 'signup',
          sess_id,
          deviceid: 'pc'
        }
        const { accessToken } = await this.$api.auth.bindExistsUser(query)
        this.handleLoginSuccess(accessToken)
      } catch (error) {
        console.log(error)
      }
    },
    handleLoginSuccess(accessToken) {
      S.setAuthToken(accessToken)
      this.initStore()
      this.$Message.success(this.$t('auth.bind.050344-9'))
      setTimeout(() => {
        this.$redirect({ key: 'auth_redirect' })
      }, 2000)
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        vcode_type: 'mobile_login'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode(n) {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const query = {
        account: this.info.account,
        vcode_type: 'mobile_login',
        verifycode: this.info.yzm,
        sess_id: this.imgInfo.sess_id
      }
      let res_verify
      try {
        res_verify = await this.$api.auth.regAccountVerify(query)
      } catch (e) {
        this.yzmImg()
        return
      }
      const query_sms = {
        mobile: this.info.account,
        type: 'signup',
        send_sms_token: res_verify.verifyAccount_token
      }
      await this.$api.auth.regSmsCode(query_sms)
      this.$Message.success(this.$t('auth.bind.050344-10'))
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('auth.bind.050344-11', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.bind.050344-12')
    }
  }
}
</script>
