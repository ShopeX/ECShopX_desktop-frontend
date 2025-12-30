/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='./login.scss'></style>

<template>
  <div class="page-login-staff page-body">
    <div class="login-container">
      <ul class="login-tab">
        <li>
          <span>{{ $t('staff.login.275114-0') }}</span>
        </li>
      </ul>
      <SpForm ref="form-login" :model="info" :rules="rules">
        <SpFormItem prop="account">
          <SpInput v-model="info.account" :maxlength="6" @change="handleBlurWorkId"
          :placeholder="$t('staff.login.275114-1')"/>
          <span class="mobile">{{mobile}}</span>
        </SpFormItem>
        <SpFormItem prop="yzm" class="sms-yzm">
          <div class="yzm-field">
            <div class="c-yzm">
              <SpInput v-model="info.yzm" :placeholder="$t('staff.login.275114-2')"/>
            </div>
            <div class="c-img" @click="handleClickImgcode">
              <img :src="imgInfo.base64Image" alt height="24">
              <span>{{ $t('staff.login.275114-3') }}<br>{{ $t('staff.login.275114-4') }}</span>
            </div>
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="sms-vcode">
          <div class="vcode-field">
            <div class="c-vcode">
              <SpInput v-model="info.vcode" :placeholder="$t('staff.login.275114-5')"/>
            </div>
            <div class="c-btnvcode">
              <SpTimer
                :onStart="handleTimerStart"
                @UpdateTimer="handleUpdateTimer"
                @Stop="handleTimerStop"
                :timerMsg="timerMsg"
                :duration="120"
              ></SpTimer>
            </div>
          </div>
        </SpFormItem>
        <SpFormItem class="clearfix">
          <SpRadio type="checkbox" size="small" v-model="license">
            <span class="license-info">
              {{ $t('staff.login.275114-6') }}<nuxt-link class="license-content" to="/license/staff">{{ $t('staff.login.275114-7') }}</nuxt-link>
            </span>
          </SpRadio>
        </SpFormItem>
        <SpFormItem class="btn-container">
          <div class="btn-container__login">
            <SpButton type="warning" size="large" long :disabled="!license" @click="login('form-login')">{{ $t('staff.login.275114-0') }}</SpButton>
          </div>
        </SpFormItem>
      </SpForm>
      <div class="jump">
        <nuxt-link class="license-content" to="/auth/login">
            {{ $t('staff.login.275114-8') }}<i class="mb-iconfont mb-iconfont-right"></i><br>
            ({{ $t('staff.login.275114-9') }})
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from 'store'
import _debounce from 'lodash/debounce'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'

export default {
  beforeRouteEnter (to, from, next) {
    let redirectUrl = from.fullPath 
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  data () {
    return {
      info: {
        account: '',
        yzm: '',
        vcode: ''
      },
      rules: {
        account: [
          { validate: 'required', message: this.$t('staff.login.275114-10') },
          {
            validate: (rule, value, callback) => {
              if (value.length !== 6) {
                // eslint-disable-next-line standard/no-callback-literal
                callback(this.$t('staff.login.275114-11'))
              } else {
                callback()
              }
            }
          }
        ],
        yzm: [{ validate: 'required', message: this.$t('staff.login.275114-12') }],
        vcode: [{ validate: 'required', message: this.$t('staff.login.275114-13') }]
      },
      imgInfo: {},
      timerMsg: this.$t('staff.login.275114-14'),
      license: false,
      mobile: ''
    }
  },
  created () {
    this.getStaffMobile = _debounce(async e => {
      const { account } = this.info
      const { result, mobile } = await this.$api.staff.staffMobile(account)
      if (result === 'success') {
        this.mobile = mobile
      } else {
        this.mobile = ''
      }
    }, 300)
  },
  mounted () {
    this.yzmImg()
  },

  methods: {
    ...mapActions(['initStore']),
    handleBlurWorkId (e) {
      this.getStaffMobile()
    },
    async login (name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.authLogin()
        }
      })
    },

    async authLogin () {
      const query = {
        work_id: this.info.account,
        vcode: this.info.vcode,
        license: this.license ? 1 : 0,
        sess_id: this.imgInfo.sess_id
      }
      const { accessToken, activityInfo } = await this.$api.staff.dologin(query)
      // console.log(activityInfo)
      S.setAuthToken(accessToken)
      this.initStore()
      this.$Message.success(this.$t('staff.login.275114-15'))
      analytics.event({
        login_type: 'normal'
      }, 'newLogin')
      setTimeout(() => {
        this.$redirect({ key: 'auth_redirect' })
      }, 2000)
    },
    async yzmImg () {
      const img_res = await this.$api.auth.regImg({ vcode_type: 'staff' })
      this.imgInfo = img_res
    },
    handleClickImgcode () {
      this.yzmImg()
    },
    async handleTimerStart (cb, k) {
      const query = {
        work_id: this.info.account,
        verifycodekey: 'staff',
        vcode: this.info.yzm,
        sess_id: this.imgInfo.sess_id
      }
      try {
        await this.$api.staff.sendVcode(query)
        this.$Message.success(this.$t('staff.login.275114-16'))
        cb()
      } catch (e) {
        this.yzmImg()
      }
    },
    handleUpdateTimer (e) {
      this.timerMsg = this.$t('staff.login.275114-17', [])
    },
    handleTimerStop () {
      this.timerMsg = this.$t('staff.login.275114-18')
    }
  }
}
</script>
