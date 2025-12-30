/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./forget-password.scss"></style>

<template>
  <div class="page-password container">
    <!-- <div class="form-logo">
      <img
        referrerpolicy="no-referrer"
        src="../../assets/imgs/login_logo.png"
      />
    </div> -->
    <div class="form-main">
      <div class="form-title">{{ $t('auth.forget-password.651974-0') }}</div>
      <SpForm ref="form-forget-password" :model="info" :rules="rules">
        <SpFormItem prop="username">
          <SpInput
            icon="new_iconfont icon-new-pc-zhanghu"
            v-model="info.username"
            :placeholder="$t('auth.forget-password.651974-1')"
            />
        </SpFormItem>
        <SpFormItem prop="yzm" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-tuxingyanzhengma"
            v-model="info.yzm"
            :placeholder="$t('auth.forget-password.651974-2')"
            />
          <div class="yzm-img" @click="handleClickImgcode">
            <img :src="imgInfo.imageData" alt />
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-yanzhengma"
            v-model="info.vcode"
            :placeholder="$t('auth.forget-password.651974-3')"
            />
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
        <SpFormItem prop="password">
          <SpInput
            icon="new_iconfont icon-new-pc-mima"
            v-model="info.password"
            type="password"
            :placeholder="$t('auth.forget-password.651974-4')"
          />
        </SpFormItem>
        <SpFormItem prop="password1">
          <SpInput
            icon="new_iconfont icon-new-pc-mima"
            v-model="info.password1"
            type="password"
            :placeholder="$t('auth.forget-password.651974-5')"
             />
        </SpFormItem>
        <SpFormItem class="btn-container">
          <SpButton long type="primary" @click="modifyPasswordBtn('form-forget-password')"
            >{{ $t('auth.forget-password.651974-6') }}</SpButton
          >
        </SpFormItem>
      </SpForm>
    </div>
  </div>
</template>
<script>
import { validate } from '@/utils'

export default {
  layout: 'auth_layout',
  data() {
    return {
      info: {
        username: '',
        yzm: '',
        vcode: '',
        password: '',
        password1: ''
      },
      rules: {
        username: [{ validate: 'required', message: this.$t('auth.forget-password.651974-7') }],
        yzm: [{ validate: 'required', message: this.$t('auth.forget-password.651974-8') }],
        vcode: [{ validate: 'required', message: this.$t('auth.forget-password.651974-9') }],
        password: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                if (this.info.password1) {
                  this.$refs['form-forget-password'].validateField('password1')
                }
                callback()
              }
            }
          }
        ],
        password1: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass2(value, this.info.password)
              if (valid_res) {
                callback(valid_res)
              } else {
                callback()
              }
            }
          }
        ]
      },
      imgInfo: {},
      timerMsg: this.$t('auth.forget-password.651974-10'),
      forgot_token: null
    }
  },
  mounted() {
    this.yzmImg()
  },
  methods: {
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'forgot_password'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const { username, yzm } = this.info
      const { imageToken } = this.imgInfo
      if (!validate.validatePhone(username)) {
        this.$Message.error(this.$t('auth.forget-password.651974-11'))
        return false
      }
      if(!yzm) {
        this.$Message.error(this.$t('auth.forget-password.651974-8'))
        return false
      }
      const query = {
        mobile: username,
        type: 'forgot_password',
        yzm: yzm,
        token: this.imgInfo.imageToken
      }
      const { status_code ,message} = await this.$api.auth.regSmsCode(query)
      if(status_code == 422){
        this.$Message.error(message)
        return false
      }
      this.$Message.success(this.$t('auth.forget-password.651974-12'))
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = this.$t('auth.forget-password.651974-13', [])
    },
    handleTimerStop() {
      this.timerMsg = this.$t('auth.forget-password.651974-14')
    },
    modifyPasswordBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.modifyPassword()
        }
      })
    },
    async modifyPassword() {
      let query = {
        mobile: this.info.username,
        password: this.info.password,
        vcode: this.info.vcode
      }
      await this.$api.auth.modifyPassword(query)
      this.$Message.success(this.$t('auth.forget-password.651974-15'))
      setTimeout(() => {
        this.$router.push('/auth/login')
      }, 3000)
    }
  }
}
</script>
