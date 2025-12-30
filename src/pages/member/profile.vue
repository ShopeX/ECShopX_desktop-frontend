/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./profile.scss"></style>

<template>
  <div class="page-profile page-body">
    <div class="page-profile__b clearfix container-member">
      <div class="left">
        <smenu active="profile"></smenu>
      </div>
      <div class="right">
        <no-ssr>
          <div class="h-title" v-if="userInfo && userInfo.is_staff != 0">{{ $t('member.profile.365116-0') }}</div>
        </no-ssr>
        <no-ssr>
          <div class="h-title" v-if="userInfo && userInfo.is_staff === 0">{{ $t('member.profile.365116-1') }}</div>
        </no-ssr>
        <no-ssr>
          <SpForm v-if="userInfo && userInfo.is_staff != 0">
            <SpFormItem>
              <div>{{ $t('member.profile.365116-2') }} {{ userInfo.work_id }}</div>
              <div>{{ $t('member.profile.365116-3') }} {{ userInfo.work_name }}</div>
              <div>{{ $t('member.profile.365116-4') }} {{ userInfo.work_mobile }}</div>
              <div>
                {{ $t('member.profile.365116-5') }}{{ userInfo.surplus }}{{ $t('member.profile.365116-6') }}{{
                  userInfo.amount.total_money
                }}{{ $t('member.profile.365116-7') }}
              </div>
            </SpFormItem>
          </SpForm>
        </no-ssr>
        <no-ssr>
          <div class="profile-container-member" v-if="userInfo && userInfo.is_staff === 0">
            <SpForm ref="form-info1" :model="info" :rules="rules1">
              <!-- {{ $t('member.profile.365116-1') }}：用户名 -->
              <div v-show="!loginInfoEdit && !passWordEdit && !mobileInfoEdit">
                <SpFormItem>
                  <div>{{ $t('member.profile.365116-8') }} {{ info.login_account }}</div>
                  <div>{{ $t('member.profile.365116-4') }} {{ mobile }}</div>

                  <div
                    class="other-account-info"
                    v-if="accountInfo.weixin.nickname || trustLogins.weixin"
                  >
                    <i class="mb-iconfont mb-iconfont-weixin2"></i>
                    <span class="account">{{ accountInfo.weixin.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.weixin.nickname"
                      @click="unBindAccount(accountInfo.weixin)"
                      >({{ $t('member.profile.365116-9') }})</a
                    >
                    <a
                      class="bind-btn"
                      :href="trustLogins.weixin"
                      v-if="trustLogins.weixin && !accountInfo.weixin.nickname"
                      >({{ $t('member.profile.365116-10') }})</a
                    >
                  </div>
                  <div class="other-account-info">
                    <i class="mb-iconfont mb-iconfont-weibo2"></i>
                    <span class="account">{{ accountInfo.weibo.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.weibo.nickname"
                      @click="unBindAccount(accountInfo.weibo)"
                      >({{ $t('member.profile.365116-9') }})</a
                    >
                    <a class="bind-btn" :href="trustLogins.weibo" v-else>({{ $t('member.profile.365116-10') }})</a>
                  </div>
                  <div class="other-account-info">
                    <i class="mb-iconfont mb-iconfont-QQ"></i>
                    <span class="account">{{ accountInfo.qq.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.qq.nickname"
                      @click="unBindAccount(accountInfo.qq)"
                      >({{ $t('member.profile.365116-9') }})</a
                    >
                    <a class="bind-btn" :href="trustLogins.qq" v-else>({{ $t('member.profile.365116-10') }})</a>
                  </div>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c" v-if="!mobile">
                    <SpButton type="warning" size="large" long @click="mobileInfoEdit = true"
                      >{{ $t('member.profile.365116-11') }}</SpButton
                    >
                  </div>
                  <div class="btn-c" v-if="!info.login_account">
                    <SpButton type="primary" size="large" long @click="loginInfoEdit = true"
                      >{{ $t('member.profile.365116-12') }}</SpButton
                    >
                  </div>
                  <div class="btn-c" v-if="userInfo.password_reset == 1">
                    <SpButton type="warning" size="large" long @click="passWordEdit = true"
                      >{{ $t('member.profile.365116-13') }}</SpButton
                    >
                  </div>
                  <div class="btn-c" v-else>
                    <SpButton type="warning" size="large" long @click="passWordEdit = true"
                      >{{ $t('member.profile.365116-14') }}</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!-- {{ $t('member.profile.365116-1') }}：{{ $t('member.profile.365116-12') }} -->
              <div v-show="loginInfoEdit && !passWordEdit">
                <SpFormItem prop="login_account" class="form-item__email">
                  <SpInput
                    v-model="info.login_account"
                    :disabled="info_disabled.login_account"
                    :placeholder="$t('member.profile.365116-15')"
                  />
                </SpFormItem>
                <SpFormItem>
                  <div>{{ $t('member.profile.365116-4') }} {{ mobile }}</div>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="cancelFormInfo1"
                      >{{ $t('member.profile.365116-16') }}</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'login_account')"
                      >{{ $t('member.profile.365116-17') }}</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!-- {{ $t('member.profile.365116-1') }}：修改密码FORM -->
              <div v-show="passWordEdit">
                <SpFormItem prop="old_password" v-show="isModifyPassword">
                  <SpInput v-model="info.old_password" type="password" :placeholder="$t('member.profile.365116-18')" />
                </SpFormItem>
                <SpFormItem prop="password">
                  <SpInput v-model="info.password" type="password" :placeholder="$t('member.profile.365116-19')" />
                </SpFormItem>
                <SpFormItem prop="password2">
                  <SpInput
                    v-model="info.password2"
                    type="password"
                    :placeholder="$t('member.profile.365116-20')"
                  />
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="passWordEdit = false"
                      >{{ $t('member.profile.365116-16') }}</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'password')"
                      >{{ $t('member.profile.365116-17') }}</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!--{{ $t('member.profile.365116-11') }}-->
              <div v-show="mobileInfoEdit">
                <SpFormItem prop="mobile">
                  <SpInput
                    v-model="info.mobile"
                    :disabled="info_disabled.mobile"
                    :placeholder="$t('member.profile.365116-21')"
                  />
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="mobileInfoEdit = false"
                      >{{ $t('member.profile.365116-16') }}</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'mobile')"
                      >{{ $t('member.profile.365116-17') }}</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
            </SpForm>
          </div>
        </no-ssr>
        <no-ssr>
          <div v-if="userInfo && userInfo.is_staff === 0">
            <div class="h-title">{{ $t('member.profile.365116-22') }}</div>
            <div class="profile-container-member">
              <SpForm ref="form-info2" :model="info" :rules="rules2">
                <div v-show="!profileInfoEdit">
                  <SpFormItem>
                    <div>{{ $t('member.profile.365116-3') }} {{ info.username }}</div>
                    <div>{{ $t('member.profile.365116-23') }} {{ info.email }}</div>
                    <div>{{ $t('member.profile.365116-24') }} {{ info.sex }}</div>
                    <div>{{ $t('member.profile.365116-25') }} {{ info.birthday }}</div>
                    <!-- <div>{{ $t('member.profile.365116-33') }} {{info.vocation}}</div> -->
                  </SpFormItem>
                  <SpFormItem class="btn-warp clearfix">
                    <div class="btn-c">
                      <SpButton type="warning" size="large" long @click="profileInfoEdit = true"
                        >{{ $t('member.profile.365116-26') }}</SpButton
                      >
                    </div>
                  </SpFormItem>
                </div>
                <div v-show="profileInfoEdit">
                  <SpFormItem prop="username">
                    <SpInput
                      v-model="info.username"
                      :disabled="info_disabled.username"
                      :placeholder="$t('member.profile.365116-27')"
                    />
                  </SpFormItem>
                  <SpFormItem prop="email">
                    <SpInput
                      v-model="info.email"
                      :disabled="info_disabled.email"
                      :placeholder="$t('member.profile.365116-28')"
                    />
                  </SpFormItem>
                  <SpFormItem class="sms-info clearfix">
                    <div class="left fl">
                      <SpSelect
                        v-model="info.sex"
                        :data="sexDs"
                        :placeholder="$t('member.profile.365116-29')"
                        :disabled="info_disabled.sex"
                      ></SpSelect>
                    </div>
                    <div class="right fl clearfix">
                      <div class="y-label">{{ $t('member.profile.365116-30') }}</div>
                      <datapicker
                        v-model="info.birthday"
                        :disabled="info_disabled.birthday"
                      ></datapicker>
                      <div class="tip">{{ $t('member.profile.365116-29') }}，生日只能修改一次</div>
                    </div>
                  </SpFormItem>
                  <SpFormItem class="btn-warp clearfix">
                    <div class="btn-c">
                      <SpButton type="primary" size="large" long @click="cancelFormInfo2"
                        >{{ $t('member.profile.365116-16') }}</SpButton
                      >
                    </div>
                    <div class="btn-c">
                      <SpButton
                        type="warning"
                        size="large"
                        long
                        @click="SubmitFormInfo2('form-info2')"
                        >{{ $t('member.profile.365116-17') }}</SpButton
                      >
                    </div>
                  </SpFormItem>
                </div>
              </SpForm>
            </div>

            <div class="h-title">{{ $t('member.profile.365116-32') }}</div>
            <div class="profile-container-member hobby-list">
              <SpForm ref="form-info3" :model="info" :rules="rules3">
                <div v-show="!hobbyEdit">
                  <SpFormItem>
                    <div>{{ $t('member.profile.365116-33') }} {{ info.vocation }}</div>
                  </SpFormItem>
                </div>
                <div v-show="hobbyEdit">
                  <SpFormItem>
                    <SpSelect
                      v-model="info.vocation"
                      :disabled="info_disabled.vocation"
                      :data="occupationDs"
                      :placeholder="$t('member.profile.365116-34')"
                    ></SpSelect>
                  </SpFormItem>
                </div>
                <SpFormItem>
                  <div>{{ $t('member.profile.365116-35') }}</div>
                  <SpRadioGroup type="checkbox" class="hobby-list-group" v-model="info.hobby">
                    <div class="hobby-list__item" v-for="(item, index) in hobbyDs" :key="index">
                      <SpRadio
                        type="checkbox"
                        size="small"
                        :label="item.label"
                        :disabled="!hobbyEdit"
                        >{{ item.label }}</SpRadio
                      >
                    </div>
                  </SpRadioGroup>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix" v-show="!hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="warning" size="large" long @click="hobbyEdit = true"
                      >{{ $t('member.profile.365116-36') }}</SpButton
                    >
                  </div>
                </SpFormItem>
                <!-- <SpFormItem class="btn-warp clearfix" v-if="!hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="warning" size="large" long @click="hobbyEdit = true">修改兴趣爱好</SpButton>
                  </div>
                </SpFormItem>-->
                <SpFormItem class="btn-warp clearfix" v-show="hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="cancelFormInfo3"
                      >{{ $t('member.profile.365116-16') }}</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo3('form-info3')"
                      >{{ $t('member.profile.365116-17') }}</SpButton
                    >
                  </div>
                </SpFormItem>
              </SpForm>
            </div>
          </div>
        </no-ssr>
      </div>
    </div>
    <Recommend />
  </div>
</template>

<script>
import datapicker from './../auth/comps/datepicker'
import smenu from './../member/comps/smenu'
import Recommend from './../items/comps/recommend'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'
import api from '@/api'
import store from 'store'

export default {
  head() {
    return {
      title: this.$t('member.profile.365116-37'),
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.$t('member.profile.365116-38') },
        { hid: 'description', name: 'description', content: this.$t('member.profile.365116-38') }
      ]
    }
  },
  data() {
    return {
      info: {
        login_account: '',
        username: '',
        old_password: '',
        password: '',
        password2: '',
        email: '',
        mobile: '',
        sex: '',
        birthday: '',
        vocation: '',
        hobby: []
      },
      info_disabled: {
        login_account: false,
        password: false,
        email: false,
        mobile: false,
        sex: false,
        birthday: false,
        vocation: false,
        hobby: false
      },
      // rules: {},
      rules1: {},
      rules2: {},
      rules3: {},
      mobile: '',
      loginInfoEdit: false,
      mobileInfoEdit: false,
      passWordEdit: false,
      profileInfoEdit: false,
      hobbyEdit: false,
      sexDs: [],
      occupationDs: [],
      hobbyDs: [],
      isModifyPassword: false,
      orgin_info: {},
      accountInfo: {
        weixin: {},
        weibo: {},
        qq: {}
      },
      trustLogins: {}
    }
  },
  components: { datapicker, smenu, Recommend },
  created() {
    // this.$store.dispatch('user/getUserInfo')
    this.getAttrData('init')
    // 检查用户是否重置过密码
    this.checkResetLoginPassword()
  },
  mounted() {
    this.getTrustLogins()
  },
  computed: {
    userInfo() {
      if (this.$store.state.user.userInfo && this.$store.state.user.userInfo.bind_info) {
        let obj = {
          weixin: {},
          weibo: {},
          qq: {}
        }
        for (let item of this.$store.state.user.userInfo.bind_info) {
          obj[item.flag] = item
        }
        this.accountInfo = obj
      }
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async getTrustLogins() {
      const res = await this.$api.user.trustLoginList({ view: 'web' })
      let obj = {}
      for (let item in res) {
        if (res[item].flag == 'wapweixin') {
          obj['weixin'] = res[item].url
        } else {
          obj[res[item].flag] = res[item].url
        }
      }
      this.trustLogins = obj
    },
    async getAttrData(type) {
      const { user_attr, mobile } = await this.$api.user.userAttr()
      user_attr.forEach((item) => {
        this.info_disabled[item.attr_column] = item.editable !== 1

        if (item.attr_required === 1) {
          if (item.attr_column === 'email') {
            this.rules1[item.attr_column] = [{ validate: 'required', message: this.$t('member.profile.365116-39') }]
          } else if (item.attr_column !== 'hobby') {
            this.rules2[item.attr_column] = [{ validate: 'required', message: this.$t('member.profile.365116-39') }]
          } else {
            this.rules3[item.attr_column] = [{ validate: 'required', message: this.$t('member.profile.365116-39') }]
          }
        }

        // 性别
        if (item.attr_column === 'sex') {
          let sexDs = []
          item.attr_option.forEach((sitem) => {
            sexDs.push({ label: sitem, value: sitem })
          })
          this.sexDs = sexDs
        }

        // 职业
        if (item.attr_column === 'vocation') {
          let occupationDs = []
          item.attr_option.forEach((sitem) => {
            occupationDs.push({ label: sitem, value: sitem })
          })
          this.occupationDs = occupationDs
        }

        // 爱好
        if (item.attr_column === 'hobby') {
          let hobbyDs = []
          item.attr_option.forEach((sitem) => {
            hobbyDs.push({ label: sitem, value: sitem })
          })
          this.hobbyDs = hobbyDs
        }

        this.info[item.attr_column] = item.attr_value
          ? item.attr_value
          : item.attr_column === 'hobby'
          ? []
          : ''
      })
      this.orgin_info = { ...this.info }
      this.orgin_info.hobby = [...this.info.hobby]
      this.mobile = mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

      if (type == 'init') {
        analytics.pageReady({
          page: {
            pageName: 'My Account',
            pageType: 'My Account',
            breadcrumb: ''
          }
        })
      }
    },
    // 修改邮件
    SubmitFormInfo1(form, type) {
      if (type === 'login_account') {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            const { login_account } = this.info
            let params = {
              login_account
            }
            await this.$api.user.userAttrSave({
              module: 'account',
              user_attr: JSON.stringify(params)
            })
            this.$Message.success(this.$t('member.profile.365116-40'))
            this.loginInfoEdit = false
            this.orgin_info.login_account = login_account
            this.$store.dispatch('user/getUserInfo')
          }
        })
      } else if (type === 'password') {
        // 修改密码
        if (this.isModifyPassword) {
          if (!this.info.old_password) {
            return this.$Message.error(this.$t('member.profile.365116-41'))
          }
        }
        if (!this.info.password) {
          return this.$Message.error(this.$t('member.profile.365116-42'))
        }
        if (!this.info.password2) {
          return this.$Message.error(this.$t('member.profile.365116-43'))
        }
        if (this.info.password !== this.info.password2) {
          return this.$Message.error(this.$t('member.profile.365116-44'))
        }
        if (this.isModifyPassword) {
          this.resetLoginPassword()
        } else {
          this.editPassWord()
        }
      } else {
        let valid_res = validate.validatePhone(this.info.mobile)
        if (valid_res) {
          return this.$Message.error(valid_res)
        }
        this.addMobile()
      }
    },
    cancelFormInfo1() {
      this.loginInfoEdit = false
      this.info.login_account = this.orgin_info.login_account
    },
    async addMobile() {
      let params = {
        mobile: this.info.mobile
      }
      await this.$api.user.userAttrSave({
        module: 'account',
        user_attr: JSON.stringify(params)
      })
      this.$Message.success(this.$t('member.profile.365116-40'))
      this.mobileInfoEdit = false
      this.getAttrData()
    },
    async resetLoginPassword() {
      await this.$api.member.resetLoginPassword({
        password: this.info.old_password,
        new_pwd: this.info.password,
        new_pwd_confirmation: this.info.password2
      })
      this.$Message.success(this.$t('member.profile.365116-45'))
      this.passWordEdit = false
    },
    async checkResetLoginPassword() {
      const res = await this.$api.member.checkResetLoginPassword()
      // 重置过密码
      this.isModifyPassword = res === 1
    },
    async editPassWord() {
      await this.$api.member.updateLoginPassword({
        password: this.info.password,
        password_confirmation: this.info.password2
      })
      this.$Message.success(this.$t('member.profile.365116-45'))
    },
    // 修改个人信息
    async SubmitFormInfo2(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const { username, email, sex, birthday } = this.info
          let params = {
            username,
            email,
            sex,
            birthday
          }
          // if (!login_account) {
          //   params['login_account'] = login_account
          // }
          await this.$api.user.userAttrSave({
            module: 'user',
            user_attr: JSON.stringify(params)
          })
          this.orgin_info.username = this.info.username
          this.orgin_info.email = this.info.email
          this.orgin_info.sex = this.info.sex
          this.orgin_info.birthday = this.info.birthday
          this.$Message.success(this.$t('member.profile.365116-40'))
          this.profileInfoEdit = false
          this.getAttrData()
        }
      })
    },
    cancelFormInfo2() {
      this.profileInfoEdit = false
      this.info.username = this.orgin_info.username
      this.info.email = this.orgin_info.email
      this.info.sex = this.orgin_info.sex
      this.info.birthday = this.orgin_info.birthday
    },
    // 修改兴趣爱好
    async SubmitFormInfo3() {
      const { vocation, hobby } = this.info
      let params = {
        vocation,
        hobby
      }
      await this.$api.user.userAttrSave({
        module: 'other',
        user_attr: JSON.stringify(params)
      })
      this.orgin_info.vocation = this.info.vocation
      this.orgin_info.hobby = [...this.info.hobby]
      this.$Message.success(this.$t('member.profile.365116-40'))
      this.hobbyEdit = false
    },
    cancelFormInfo3() {
      this.hobbyEdit = false
      this.info.vocation = this.orgin_info.vocation
      this.info.hobby = [...this.orgin_info.hobby]
    },
    async unBindAccount(info) {
      let params = {
        trust_id: info.trust_id,
        flag: info.flag,
        user_id: this.userInfo.userId
      }
      await this.$api.user.unbindLogin(params)
      this.$store.dispatch('user/getUserInfo')
      this.$Message.success(this.$t('member.profile.365116-46'))
    }
  }
}
</script>
