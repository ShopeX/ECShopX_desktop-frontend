/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./bindwechat.scss"></style>

<template>
  <div class="page-reg page-body">
    <div class="auth reg">
      <div class="auth-form reg-form">
        <SpForm ref="form-reg" :model="info" :rules="rules">
          <template v-if="step == '1'">
            <SpFormItem prop="mobile">
              <span class="label-text">{{ $t('auth.bindwechat.454774-0') }}</span>
              <SpInput v-model="info.mobile" />
            </SpFormItem>

            <SpFormItem prop="password">
              <span class="label-text">{{ $t('auth.bindwechat.454774-1') }}</span>
              <SpInput
                v-model="info.password"
                type="password"
                @keyup.enter.native="loginSubmit('form-login')"
              />
            </SpFormItem>

            <SpFormItem prop="yzm" class="yzm-feild graphics-code">
              <span class="label-text">{{ $t('auth.bindwechat.454774-2') }}</span>
              <SpInput v-model="info.yzm" />
              <div class="yzm-img vcode-btn" @click="handleClickImgcode('mobile_login')">
                <img :src="imgInfo.imageData" alt />
              </div>
            </SpFormItem>

            <SpFormItem prop="vcode" class="yzm-feild">
              <span class="label-text">{{ $t('auth.bindwechat.454774-3') }}</span>
              <SpInput v-model="info.vcode" />
              <div class="vcode-btn">
                <SpTimer
                  :onStart="handleTimerStart"
                  @UpdateTimer="handleUpdateTimer"
                  @Stop="handleTimerStop"
                  :timerMsg="timerMsg"
                  :duration="120"
                ></SpTimer>
              </div>
            </SpFormItem>
          </template>

          <template v-if="step == '2'">
            <SpFormItem prop="password">
              <span class="label-text">{{ $t('auth.bindwechat.454774-4') }}</span>
              <SpInput
                v-model="info.password"
                type="password"
                :placeholder="$t('auth.bindwechat.454774-5')"
              />
            </SpFormItem>
            <SpFormItem prop="password2">
              <span class="label-text">{{ $t('auth.bindwechat.454774-6') }}</span>
              <SpInput v-model="info.password2" type="password" :placeholder="$t('auth.bindwechat.454774-7')" />
            </SpFormItem>

            <div class="dash-line"></div>

            <template v-for="(item, name) in registerParam">
              <SpFormItem :prop="name" v-if="item.is_open" :key="name">
                <span class="label-text">{{ item.name }}</span>
                <SpInput
                  v-model="info[name]"
                  :placeholder="
                    item.name == 'username' ? $t('auth.bindwechat.454774-8') : ''
                  "
                />
              </SpFormItem>
              <SpFormItem
                :prop="name"
                v-if="item.is_open && name == 'sex'"
                :key="name"
                class="form-select select"
              >
                <span class="label-text">{{ $t('auth.bindwechat.454774-9') }}</span>
                <SpSelect v-model="info.sex" :data="sexOpt" :placeholder="$t('auth.bindwechat.454774-10')"></SpSelect>
              </SpFormItem>
              <SpFormItem
                :prop="name"
                v-if="item.is_open && name == 'birthday'"
                :key="name"
                class="form-select"
              >
                <span class="label-text">{{ $t('auth.bindwechat.454774-11') }}</span>
                <datepicker v-model="info.birthday"></datepicker>
              </SpFormItem>
            </template>
            <!-- <SpFormItem prop="sex" class="form-select select">
              <span class="label-text">家庭成员</span>
              <SpSelect
                v-model="info.family"
                :data="familyOpt"
                placeholder="请选择家庭成员情况"
              ></SpSelect>
            </SpFormItem> -->
            <!-- <SpFormItem class="clearfix mb22">
              <div>
                <SpRadio type="checkbox" size="small" v-model="license"></SpRadio>
                <span class="license-info">您接受并同意遵守AIGLE的 <nuxt-link to="/article/detail/19">条款与细则</nuxt-link> 、<nuxt-link to="/article/detail/17">隐私政策</nuxt-link>、以及<nuxt-link to="/article/detail/20">个人敏感信息政策</nuxt-link>。</span>
              </div>
            </SpFormItem> -->
          </template>
          <SpFormItem class="btn-container">
            <SpButton long type="primary" @click="regBtn('form-reg')">{{ $t('auth.bindwechat.454774-12') }}</SpButton>
          </SpFormItem>
          <SpFormItem class="btn-container-reg">
            <SpButton long type="primary" @click="handleReg">{{ $t('auth.bindwechat.454774-13') }}</SpButton>
          </SpFormItem>
        </SpForm>
      </div>

      <div class="reg-complete" v-if="step == '3'">
        <img class="reg-img" src="~/assets/imgs/reg-img.svg" />
        <div class="name">{{ $t('auth.bindwechat.454774-14') }} {{ this.info.username }}</div>
        <div class="vip">{{ $t('auth.bindwechat.454774-15') }}{{ website_name }}{{ $t('auth.bindwechat.454774-16') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from 'store'
import S from '@/spx'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'
import { bindWechatPhone } from '@/api/auth'

import ModalTips from './comps/modal-tips'
import datepicker from './comps/datepicker'

const sexOpt = [
  {
    label: this.$t('auth.bindwechat.454774-17'),
    value: this.$t('auth.bindwechat.454774-17')
  },
  {
    label: this.$t('auth.bindwechat.454774-18'),
    value: this.$t('auth.bindwechat.454774-18')
  }
]
const familyOpt = [
  {
    label: '1',
    value: this.$t('auth.bindwechat.454774-19')
  },
  {
    label: '2',
    value: this.$t('auth.bindwechat.454774-20')
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
  created() {
    const { open_id, unionid } = this.$route.query
    console.log('created')
    console.log(open_id)
    console.log(unionid)
    this.routeObject = {
      ...this.routeObject,
      openId: open_id,
      unionId: unionid
    }
  },
  data() {
    return {
      info: {
        mobile: '',
        password: '',
        password2: '',
        yzm: '',
        vcode: ''
      },
      routeObject: {
        openId: '',
        unionId: ''
      },
      sexOpt,
      familyOpt,
      rules: {
        // mobile: [
        //   {
        //     validate: (rule, value, callback) => {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       let valid_res = validate.validatePhone(value)
        //       if (valid_res) {
        //         callback(valid_res)
        //       } else {
        //         this.$api.auth
        //           .regAccount(
        //             {
        //               mobile: this.info.mobile,
        //               type: 'mobile'
        //             },
        //             {
        //               showError: false
        //             }
        //           )
        //           .then(() => {
        //             callback()
        //           })
        //           .catch(err => {
        //             callback(err.msg)
        //           })
        //       }
        //     },
        //     trigger: 'blur'
        //   }
        // ],
        mobile: [{ validate: 'required', message: this.$t('auth.bindwechat.454774-21'), trigger: 'blur' }],
        // username: [
        //   { validate: 'required', message: '请输入姓名', trigger: 'blur' }
        // ],
        // sex: [
        //   { validate: 'required', message: '请输入选择性别', trigger: 'blur' }
        // ],
        // birthday: [
        //   { validate: 'required', message: '请选择生日', trigger: 'blur' }
        // ],
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
                callback(this.$t('auth.bindwechat.454774-22'))
              }
            },
            trigger: 'blur'
          }
        ],
        vcode: [{ validate: 'required', message: this.$t('auth.bindwechat.454774-23'), trigger: 'blur' }]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.bindwechat.454774-24'),
      license: false,
      showModal: false,
      step: '1',
      registerParam: [],
      website_name: ''
    }
  },
  mounted() {
    window.addEventListener('click', this.test)
    this.website_name = process.env.VUE_APP_TITLE
    this.yzmImg()
    this.getRegisterParam()

    analytics.pageReady({
      page: {
        pageName: this.$t('auth.bindwechat.454774-13'),
        pageType: this.$t('auth.bindwechat.454774-13'),
        breadcrumb: ''
      }
    })
  },
  methods: {
    test() {
      console.log('test')
    },
    async getRegisterParam() {
      const res = await this.$api.auth.getRegisterParam()
      this.registerParam = res
      for (let key in res) {
        let item = res[key]
        if (item.is_open && item.is_required) {
          this.info[key] = ''
          this.rules[key] = [
            {
              validate: 'required',
              message: `${item.element_type == 'input' ? this.$t('auth.bindwechat.454774-25') : this.$t('auth.bindwechat.454774-26')}${item.name}`,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    async regBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.authRegsiter()
        }
      })
    },
    handleReg() {
      this.$router.push('/auth/reg')
    },
    redirect() {
      const { redirect } = this.$route.query
      let url = '/'
      if (redirect) {
        url = decodeURIComponent(redirect)
      }
      this.$router.push(url)
    },
    async authRegsiter() {
      let query = {
        username: this.info.mobile,
        vcode: this.info.vcode,
        check_type: 'login',
        password: this.info.password,
        union_id: this.routeObject.unionId,
        open_id: this.routeObject.openId
      }
      const { token } = await this.$api.auth.bindwechat(query)
      if (token) {
        this.handleLoginSuccess(token)
      }
    },
    handleLoginSuccess(token) {
      S.setAuthToken(token)
      this.$Message.success(this.$t('auth.bindwechat.454774-27'))
      this.$store.dispatch('user/getUserInfo')
      // this.$store.dispatch('cart/getCartCount')
      const { redirectUrl } = this.$route.query
      if (redirectUrl) {
        this.$router.push(decodeURIComponent(redirectUrl))
      } else {
        this.$router.push('/')
      }
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'login'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const query = {
        mobile: this.info.mobile,
        type: 'login',
        yzm: this.info.yzm,
        token: this.imgInfo.imageToken
      }
      // 验证账号
      // let res_verify
      // try {
      //   res_verify = await this.$api.auth.regAccountVerify(query)
      // } catch (e) {
      //   this.$Message.error(e.msg)
      //   this.handleClickImgcode()
      // }

      // const query_sms = {
      //   mobile: this.info.mobile,
      //   type: 'signup',
      //   send_sms_token: res_verify.verifyAccount_token
      // }
      await this.$api.auth.regSmsCode(query)
      this.$Message.success(this.$t('auth.bindwechat.454774-28'))
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('auth.bindwechat.454774-29', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.bindwechat.454774-30')
    }
  }
}
</script>
