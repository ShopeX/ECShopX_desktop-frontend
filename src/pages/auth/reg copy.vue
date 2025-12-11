/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./reg.scss"></style>
<style lang="scss" src="./auth-common.scss"></style>

<template>
  <div class="page-reg page-body">
    <div class="auth reg">
      <p class="auth-title">{{ $t('auth.reg copy.315610-0') }}</p>
      <div class="clearfix">
        <div class="auth-form reg-form">
          <!-- <p class="reg-form_prompt">创建账户可获得500积分和100元现金券，完善资料更可再获得500积分!</p> -->
          <SpForm ref="form-reg" :model="info" :rules="rules">
            <SpFormItem prop="account">
              <span class="label-text">{{ $t('auth.reg copy.315610-1') }}</span>
              <SpInput v-model="info.account" />
            </SpFormItem>
            <SpFormItem prop="username">
              <span class="label-text">{{ $t('auth.reg copy.315610-2') }}</span>
              <SpInput v-model="info.username" />
            </SpFormItem>
            <SpFormItem prop="sex">
              <span class="label-text">{{ $t('auth.reg copy.315610-3') }}</span>
              <SpSelect v-model="info.sex" :data="sexOpt"></SpSelect>
            </SpFormItem>
            <SpFormItem prop="birthday">
              <span class="label-text">{{ $t('auth.reg copy.315610-4') }}</span>
              <datepicker v-model="info.birthday"></datepicker>
            </SpFormItem>
            <SpFormItem prop="yzm">
              <span class="label-text">{{ $t('auth.reg copy.315610-5') }}</span>
              <div class="yzm-img" @click="handleClickImgcode">
                <img :src="imgInfo.base64Image" alt />
              </div>
              <SpInput v-model="info.yzm" />
            </SpFormItem>
            <SpFormItem prop="vcode">
              <span class="label-text">{{ $t('auth.reg copy.315610-6') }}</span>
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
            <SpFormItem prop="password">
              <span class="label-text">{{ $t('auth.reg copy.315610-7') }}</span>
              <SpInput v-model="info.password" type="password" />
            </SpFormItem>
            <SpFormItem prop="password2">
              <span class="label-text">{{ $t('auth.reg copy.315610-8') }}</span>
              <SpInput v-model="info.password2" type="password" />
            </SpFormItem>
            <SpFormItem class="clearfix mb22">
              <div>
                <SpRadio type="checkbox" size="small" v-model="license"></SpRadio>
                <span class="license-info"
                  >{{ $t('auth.reg copy.315610-9') }}
                  <nuxt-link to="/article/detail/19">{{ $t('auth.reg copy.315610-10') }}</nuxt-link> 、<nuxt-link
                    to="/article/detail/17"
                    >{{ $t('auth.reg copy.315610-11') }}</nuxt-link
                  >{{ $t('auth.reg copy.315610-12') }}<nuxt-link to="/article/detail/20">{{ $t('auth.reg copy.315610-13') }}</nuxt-link>。</span
                >
              </div>
            </SpFormItem>
            <SpFormItem class="btn-container">
              <div class="btn-container__login">
                <SpButton class="button-dark" :disabled="!license" @click="regBtn('form-reg')"
                  >{{ $t('auth.reg copy.315610-14') }}</SpButton
                >
              </div>
            </SpFormItem>
          </SpForm>
        </div>
        <div class="auth-pic">
          <img src="~/assets/imgs/reg-brand.jpg" alt />
        </div>
      </div>
      <ModalTips v-if="showModal" @close="handleModalClose">
        <SpButton class="button-dark" @click="handleJumpProfile">{{ $t('auth.reg copy.315610-15') }}</SpButton>
        <SpButton class="button-dark ml20" @click="handleJumpIndex">{{ $t('auth.reg copy.315610-16') }}</SpButton>
      </ModalTips>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from 'store'
import S from '@/spx'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'

import ModalTips from './comps/modal-tips'
import datepicker from './comps/datepicker'

const sexOpt = [
  {
    label: this.$t('auth.reg copy.315610-17'),
    value: this.$t('auth.reg copy.315610-17')
  },
  {
    label: this.$t('auth.reg copy.315610-18'),
    value: this.$t('auth.reg copy.315610-18')
  }
]
export default {
  beforeRouteEnter(to, from, next) {
    let redirectUrl = from.fullPath
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  components: { ModalTips, datepicker },
  data() {
    return {
      info: {
        account: '',
        username: '',
        sex: '',
        birthday: '',
        password: '',
        password2: '',
        yzm: '',
        vcode: ''
      },
      sexOpt,
      rules: {
        account: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePhone(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                this.$api.auth
                  .regAccount(
                    {
                      account: this.info.account,
                      type: 'mobile'
                    },
                    {
                      showError: false
                    }
                  )
                  .then(() => {
                    callback()
                  })
                  .catch((err) => {
                    callback(err.msg)
                  })
              }
            },
            trigger: 'blur'
          }
        ],
        username: [{ validate: 'required', message: this.$t('auth.reg copy.315610-19'), trigger: 'blur' }],
        sex: [{ validate: 'required', message: this.$t('auth.reg copy.315610-20'), trigger: 'blur' }],
        birthday: [{ validate: 'required', message: this.$t('auth.reg copy.315610-21'), trigger: 'blur' }],
        password: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                if (this.info.password2) {
                  this.$refs['form-reg'].validateField('password2')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        password2: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass2(value, this.info.password)
              if (valid_res) {
                callback(valid_res)
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        yzm: [
          {
            validate: (rule, value, callback) => {
              if (value) {
                // eslint-disable-next-line standard/no-callback-literal
                callback()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                callback(this.$t('auth.reg copy.315610-22'))
              }
            },
            trigger: 'blur'
          }
        ],
        // vcode: [{
        //   validate: (rule, value, callback) => {
        //     if (value) {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       callback()
        //     } else {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       callback('手机短信验证码错误')
        //     }
        //   },
        //   trigger: 'blur'
        // }]
        vcode: [{ validate: 'required', message: this.$t('auth.reg copy.315610-22'), trigger: 'blur' }]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.reg copy.315610-23'),
      license: false,
      showModal: false
    }
  },
  mounted() {
    this.yzmImg()
    analytics.pageReady({
      page: {
        pageName: this.$t('auth.reg copy.315610-24'),
        pageType: this.$t('auth.reg copy.315610-24'),
        breadcrumb: ''
      }
    })
  },
  methods: {
    ...mapActions(['initStore']),
    async regBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.authRegsiter()
        }
      })
    },
    redirect() {
      const { redirect } = this.$route.query
      let url = '/'
      if (redirect) {
        url = decodeURIComponent(redirect)
      }
      this.$router.push(url)
    },
    async sendMsg() {
      const query = {
        account: this.info.account,
        vcode_type: 'register',
        verifycode: this.info.yzm,
        sess_id: this.imgInfo.sess_id
      }
      // 验证账号
      let res_verify
      try {
        res_verify = await this.$api.auth.regAccountVerify(query)
      } catch (e) {
        this.$Message.error(e.msg)
        this.handleClickImgcode()
      }

      const query_sms = {
        mobile: this.info.account,
        type: 'signup',
        send_sms_token: res_verify.verifyAccount_token
      }
      // 发送短信
      try {
        await this.$api.auth.regSmsCode(query_sms)
        this.$Message.success(this.$t('auth.reg copy.315610-25'))
      } catch (error) {
        return false
      }
    },
    async authRegsiter() {
      let query = {
        account: this.info.account,
        username: this.info.username,
        sex: this.info.sex,
        birthday: this.info.birthday,
        password: this.info.password,
        password_confirmation: this.info.password2,
        deviceid: 'pc',
        vcode_type: 'signup',
        vcode: this.info.vcode
      }
      const { sess_id, redirect } = this.$route.query
      if (sess_id) {
        query = {
          ...query,
          sess_id
        }
        await this.$api.auth.bindSignupUser(query)
        let url = '/auth/login'
        if (redirect) {
          url = decodeURIComponent(redirect)
        }
        this.$redirect.push(url)
      } else {
        const { accessToken } = await this.$api.auth.reg(query)
        S.setAuthToken(accessToken)
        this.initStore()
        // this.$Message.success('注册成功')
        this.showModal = true
        analytics.event({}, 'newAccountCreated')
        // setTimeout(() => {
        //   this.$redirect({ key: 'auth_redirect' })
        // }, 2000)
      }
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        vcode_type: 'register'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const query = {
        account: this.info.account,
        vcode_type: 'register',
        verifycode: this.info.yzm,
        sess_id: this.imgInfo.sess_id
      }
      // 验证账号
      let res_verify
      try {
        res_verify = await this.$api.auth.regAccountVerify(query)
      } catch (e) {
        this.$Message.error(e.msg)
        this.handleClickImgcode()
      }

      const query_sms = {
        mobile: this.info.account,
        type: 'signup',
        send_sms_token: res_verify.verifyAccount_token
      }
      await this.$api.auth.regSmsCode(query_sms)
      this.$Message.success(this.$t('auth.reg copy.315610-25'))
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('auth.reg copy.315610-26', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.reg copy.315610-27')
    },
    handleClickBindAccount() {
      this.$router.push('/auth/bind')
    },
    handleModalClose() {
      this.showModal = false
    },
    handleJumpProfile() {
      this.$router.push('/auth/profile')
    },
    handleJumpIndex() {
      this.$router.push('/')
    }
  }
}
</script>
