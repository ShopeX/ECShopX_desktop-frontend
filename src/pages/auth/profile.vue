/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./profile.scss"></style>

<template>
  <div class="page-profile page-body">
    <div class="profile-container" v-if="info">
      <div class="profile-reg__success">
        <img src="~/assets/imgs/success.png" width="30" />
        <span>{{ $t('auth.profile.118339-0') }}</span>
      </div>
      <ul class="profile-tab">
        <li>
          <span>{{ $t('auth.profile.118339-1') }}</span>
        </li>
      </ul>

      <SpForm ref="form-profile" :model="info" :rules="rules">
        <template v-for="formItem in user_attr">
          <SpFormItem :prop="formItem.attr_column" :key="formItem.attr_id">
            <span
              class="label-text"
              :class="{ 'label-required-red': formItem.attr_required == 1 }"
              >{{ formItem.attr_name }}</span
            >
            <div class="form-value">
              <SpSelect
                v-if="formItem.attr_type == 'radio'"
                v-model="info[formItem.attr_column]"
                :data="formItem.attr_option"
                class="member-input-sex"
              ></SpSelect>
              <SpRadioGroup
                type="checkbox"
                v-else-if="formItem.attr_type == 'checkbox'"
                v-model="info[formItem.attr_column]"
              >
                <div
                  class="member-input__checkbox"
                  v-for="(item, index) in formItem.attr_option"
                  :key="index"
                >
                  <SpRadio type="checkbox" size="small" :label="item.label">{{
                    item.label
                  }}</SpRadio>
                </div>
              </SpRadioGroup>
              <div class="number-input-wraper" v-else-if="formItem.attr_column == 'birthday'">
                <datepicker
                  v-model="info[formItem.attr_column]"
                  :disabled="formItem.editable == 2"
                ></datepicker>
              </div>
              <div class="number-input-wraper" v-else-if="formItem.attr_column == 'city'">
                <SpAddressPicker
                  v-model="info[formItem.attr_column]"
                  :disabled="formItem.editable == 2"
                />
              </div>
              <SpInput
                v-else
                class="member-input-text"
                v-model="info[formItem.attr_column]"
                :disabled="formItem.editable == 2"
              />
            </div>
          </SpFormItem>
        </template>
        <SpFormItem class="btn-container">
          <SpButton class="button-dark" @click="SubmitFormInfo('form-profile')">{{ $t('auth.profile.118339-2') }}</SpButton>
        </SpFormItem>
      </SpForm>

      <div class="jump">
        <a class="license-content" href="javascript:void(0);" @click="jumpTo()">
          {{ $t('auth.profile.118339-3') }}
          <i class="mb-iconfont mb-iconfont-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from './comps/datepicker'
import { SpAddressPicker } from '@/components'
import { analytics } from '@/plugins/analytics'

export default {
  head() {
    return {
      title: this.$t('auth.profile.118339-4'),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('auth.profile.118339-5')
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('auth.profile.118339-5')
        }
      ]
    }
  },
  components: { SpAddressPicker, datepicker },
  data() {
    return {
      info: null,
      orgin_info: {},
      rules: {},
      user_attr: []
    }
  },
  mounted() {
    this.getAttrData()
  },
  methods: {
    // 修改个人信息
    async SubmitFormInfo(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await this.$api.user.userAttrSave({
            module: 'user',
            user_attr: JSON.stringify(this.info)
          })
          this.orgin_info = { ...this.info }
          this.$Message.success(this.$t('auth.profile.118339-6'))
          this.$router.push('/')
          // this.getAttrData()
        }
      })
    },
    // 获取配置信息
    async getAttrData(type) {
      let { user_attr, mobile } = await this.$api.user.userAttr()
      let info = {}
      user_attr.forEach((item) => {
        // 验证规则
        if (item.attr_required === 1) {
          this.rules[item.attr_column] = [{ validate: 'required', message: this.$t('auth.profile.118339-7') }]
        }

        // 下拉选择
        if (item.attr_type === 'radio' || item.attr_type === 'checkbox') {
          let options = []
          item.attr_option.forEach((sitem) => {
            options.push({ label: sitem, value: sitem })
          })
          item.attr_option = options
        }

        info[item.attr_column] = item.attr_value || ''
        if (item.attr_type === 'checkbox') {
          info[item.attr_column] = item.attr_value || []
        }
        if (item.attr_type === 'checkbox') {
          info[item.attr_column] = Array.isArray(item.attr_value)
            ? item.attr_value
            : item.attr_value
            ? item.attr_value.split(',')
            : []
        }
      })

      this.info = info
      this.user_attr = user_attr

      // 存储原始数据
      this.orgin_info = { ...this.info }
      this.mobile = mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

      if (type === 'init') {
        analytics.pageReady({
          page: {
            pageName: 'My Account',
            pageType: 'My Account',
            breadcrumb: ''
          }
        })
      }
    },
    jumpTo() {
      this.$router.push('/')
    }
  }
}
</script>
