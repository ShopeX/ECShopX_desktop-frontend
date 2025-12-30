/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./reg.scss"></style>
<template>
  <div class="page-auth-reg container">
    <!-- <div class="reg-logo">
      <img
        referrerpolicy="no-referrer"
        src="../../assets/imgs/login_logo.png"
      />
    </div> -->
    <div class="reg-main">
      <div class="reg-title">{{ $t('auth.reg.399355-0') }}</div>
      <div class="auth reg">
        <!-- <div class="reg-process" v-if="step != '3'">
            <div class="process-item active">
              <div class="status">
                <span class="num">1</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="line" :class="{ active: step != '1' }"></div>
              <div class="text">验证手机号</div>
            </div>
            <div class="process-item" :class="{ active: step != '1' }">
              <div class="status">
                <span class="num">2</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="line" :class="{ active: step == '3' }"></div>
              <div class="text">填写账号信息</div>
            </div>
            <div class="process-item" :class="{ active: step == '3' }">
              <div class="status">
                <span class="num">3</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="text">注册成功</div>
            </div>
          </div> -->

        <div class="auth-form reg-form" v-if="!regSuccess">
          <SpForm ref="form-reg" :model="info" :rules="rules">
            <!-- <template v-if="step == '1'"> -->
            <SpFormItem prop="mobile">
              <SpInput v-model="info.mobile" :placeholder="$t('auth.reg.399355-1')" />
            </SpFormItem>
            <SpFormItem prop="yzm" class="yzm-feild">
              <SpInput v-model="info.yzm" :placeholder="$t('auth.reg.399355-2')" />
              <div class="yzm-img" @click="handleClickImgcode">
                <img :src="imgInfo.imageData" alt />
              </div>
            </SpFormItem>
            <SpFormItem prop="vcode" class="vcode-feild">
              <SpInput v-model="info.vcode" :placeholder="$t('auth.reg.399355-3')" />
              <div class="vcode-btn">
                <SpTimer :onStart="handleTimerStart" @UpdateTimer="handleUpdateTimer" @Stop="handleTimerStop"
                  :timerMsg="timerMsg" :duration="120"></SpTimer>
              </div>
            </SpFormItem>
            <!-- </template> -->

            <!-- <template v-if="step == '2'"> -->
            <SpFormItem prop="password">
              <SpInput v-model="info.password" type="password" :placeholder="$t('auth.reg.399355-4')" />
            </SpFormItem>
            <SpFormItem prop="password2">
              <SpInput v-model="info.password2" type="password" :placeholder="$t('auth.reg.399355-5')" />
            </SpFormItem>
            <!-- <div class="dash-line"></div> -->
            <template v-for="(item, name) in registerParam">
              <SpFormItem :prop="name" :key="name" v-if="item.is_open && name == 'sex'">
                <SpSelect v-model="info.sex" :data="sexOpt" :placeholder="$t('auth.reg.399355-6')"></SpSelect>
              </SpFormItem>
              <SpFormItem :prop="name" :key="name" v-if="item.is_open && name == 'birthday'">
                <SpDatePicker v-model="info.birthday"></SpDatePicker>
                <div class="form-item-desc">{{ $t('auth.reg.399355-7') }}</div>
              </SpFormItem>
              <SpFormItem :prop="name" v-if="item.is_open && name != 'sex' && name != 'birthday'" :key="name">
                <SpInput v-model="info[name]" :placeholder="item.name" />
              </SpFormItem>
            </template>
            <div class="reg-protocol">
              <SpRadio type="checkbox" size="small" v-model="isCkeckTips" theme="#337ab7" />
              {{ $t('auth.reg.399355-8') }}<span class="protocol" @click="handleShowModal('register')">{{
                $t('auth.reg.399355-9')
                }}</span>{{ $t('auth.reg.399355-10') }}<span class="protocol" @click="handleShowModal('privacy')">{{
                  $t('auth.reg.399355-11') }}</span>
            </div>
            <!-- </template> -->
            <SpFormItem class="btn-container" style="margin-top: 10px;">
              <!-- <SpButton long type="primary" @click="regBtn('form-reg')" v-if="step == '1'" >下一步</SpButton >
                <SpButton long type="primary" @click="regBtn('form-reg')" v-if="step == '2'">{{ $t('auth.reg.399355-12') }}</SpButton
                > -->
              <SpButton long type="primary" @click="regBtn('form-reg')">{{ $t('auth.reg.399355-12') }}</SpButton>
            </SpFormItem>
          </SpForm>
        </div>

        <div class="reg-complete" v-if="regSuccess">
          <img class="reg-img" src="~/assets/imgs/reg-img.svg" />
          <div class="name">{{ $t('auth.reg.399355-13') }} {{ this.info.username }}</div>
          <div class="vip">{{ $t('auth.reg.399355-14') }}{{ website_name }}{{ $t('auth.reg.399355-15') }}</div>
          <!-- <SpButton class="go-to-login" long type="primary" @click="regBtn('form-reg')" v-if="step == '3'" >{{ $t('auth.reg.399355-16') }}</SpButton> -->
          <SpButton class="go-to-login" long type="primary" @click="regBtn('form-reg')">{{ $t('auth.reg.399355-16') }}
          </SpButton>
        </div>
      </div>
    </div>
    <SpModal v-model="showModal" @Cancel="handleCloseModal" :width="600">
      <div class="protocol-title">{{ protocolType == 'register' ? $t('auth.reg.399355-9') : $t('auth.reg.399355-11') }}
      </div>
      <div class="protocol-body">
        <div class="protocol-content">
          <div v-if="protocolType == 'register'" v-html="registerContent" v-lazy-container="{ selector: 'img' }"></div>
          <div v-else v-html="privacyContent" v-lazy-container="{ selector: 'img' }"></div>
        </div>
      </div>
    </SpModal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from 'store'
import S from '@/spx'
import { validate } from '@/utils'

import ModalTips from './comps/modal-tips'

export default {
  layout: 'auth_layout',
  beforeRouteEnter(to, from, next) {
    let redirectUrl = from.fullPath
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  components: { ModalTips },
  data() {
    return {
      info: {
        mobile: '',
        password: '',
        password2: '',
        yzm: '',
        vcode: '',
        birthday: '',
        sex: ''
      },
      sexOpt: [
        {
          label: this.$t('auth.reg.399355-17'),
          value: this.$t('auth.reg.399355-17')
        },
        {
          label: this.$t('auth.reg.399355-18'),
          value: this.$t('auth.reg.399355-18')
        }
      ],
      rules: {
        mobile: [
          { validate: 'required', message: this.$t('auth.reg.399355-19'), trigger: 'blur' },
          {
            validate: (rule, value, callback) => {
              const valid = validate.validatePhone(value)
              if (valid) {
                callback()
              } else {
                callback(this.$t('auth.reg.399355-20'))
              }
            }
          }
        ],
        password: [
          {
            validate: (rule, value, callback) => {
              const valid_res = validate.validatePass(value)
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
                callback(this.$t('auth.reg.399355-21'))
              }
            },
            trigger: 'blur'
          }
        ],
        vcode: [{ validate: 'required', message: this.$t('auth.reg.399355-22'), trigger: 'blur' }]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.reg.399355-23'),
      license: false,
      showModal: false,
      // step: '1',
      registerParam: [],
      website_name: process.env.VUE_APP_TITLE,
      regSuccess: false,
      isCkeckTips: false,
      showModal: false,
      protocolType: "register",
      registerContent: "",
      privacyContent: "",
    }
  },
  mounted() {
    this.yzmImg()
    this.getRuleInfo()
    // this.getRegisterParam()
  },
  methods: {
    async getRuleInfo() {
      const { content: registerContent } = await this.$api.auth.getRuleInfo({
        type: 'member_register'
      })
      const { content: privacyContent } = await this.$api.auth.getRuleInfo({
        type: 'privacy'
      })
      this.registerContent = registerContent;
      this.privacyContent = privacyContent;
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
              message: `${item.element_type == 'input' ? this.$t('auth.reg.399355-24') : this.$t('auth.reg.399355-25')}${item.name}`,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    // 注册
    async regBtn(name) {
      if (!this.isCkeckTips) {
        this.$Message.error(this.$t('auth.reg.399355-26'));
        return
      }
      this.$refs[name].validate((valid, errors) => {
        if (!valid) return

        this.authRegsiter();
      })
    },
    handleShowModal(type) {
      this.protocolType = type;
      this.showModal = true;
    },
    handleCloseModal() {
      this.showModal = false;
    },
    redirect() {
      const { redirectUrl, fromlogin } = this.$route.query
      if (fromlogin) {
        //如果是从登陆跳转过来的
        this.$router.push('/')
        return
      }
      if (redirectUrl) {
        this.$router.push(decodeURIComponent(redirectUrl))
      } else {
        this.$router.go(-1)
      }
    },
    async authRegsiter() {
      let query = {
        ...this.info,
        user_type: 'local'
      }
      const { token } = await this.$api.auth.reg(query)
      if (token) {
        S.setAuthToken(token)
        this.regSuccess = true;
        this.$cookies.set('ECSHOPX_TOKEN', token)
        this.$Message.success(this.$t('auth.reg.399355-27'))
        this.$router.push('/')
      } else {
        this.$Message.error(message)
      }
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'sign'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const { mobile, yzm } = this.info
      const { imageToken } = this.imgInfo
      if (!validate.validatePhone(mobile)) {
        this.$Message.error(this.$t('auth.reg.399355-20'))
        return false
      }
      if (!yzm) {
        this.$Message.error(this.$t('auth.reg.399355-21'))
        return false
      }
      const query = {
        mobile: mobile,
        type: 'sign',
        yzm: yzm,
        token: imageToken
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
      const { status_code, message } = await this.$api.auth.regSmsCode(query)
      if (status_code == 422) {
        this.$Message.error(message)
        return false
      }

      this.$Message.success(this.$t('auth.reg.399355-28'))
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('auth.reg.399355-29', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.reg.399355-30')
    }
  }
}
</script>
