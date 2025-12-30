/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="invoice-editor">
    <div class="form-group form-group-type">
      <SpForm ref="form-submit" :rules="rules" :model="value">
        <label
          ><input type="radio" v-model="value.title" value="individual" /> <span>{{ $t('comps.invoice-editor.536909-0') }}</span></label
        >
        <label><input type="radio" v-model="value.title" value="unit" /> <span>{{ $t('comps.invoice-editor.536909-1') }}</span></label>

        <template v-if="value.title === 'individual'">
          <SpFormItem prop="content" key="content">
            <span class="label-text label-required">{{ $t('comps.invoice-editor.536909-2') }}</span>
            <SpInput class="input-text" v-model="value.content" />
          </SpFormItem>
        </template>

        <template v-if="value.title === 'unit'">
          <SpFormItem prop="company_name" key="company_name">
            <span class="label-text label-required">{{ $t('comps.invoice-editor.536909-3') }}</span>
            <SpInput class="input-text" v-model="value.company_name" />
          </SpFormItem>
          <SpFormItem prop="registration_number" key="registration_number">
            <span class="label-text label-required">{{ $t('comps.invoice-editor.536909-4') }}</span>
            <SpInput class="input-text" v-model="value.registration_number" />
          </SpFormItem>
          <SpFormItem prop="company_address" key="company_address">
            <span class="label-text">{{ $t('comps.invoice-editor.536909-5') }}</span>
            <SpInput class="input-text" v-model="value.company_address" />
          </SpFormItem>
          <SpFormItem prop="company_phone" key="company_phone">
            <span class="label-text">{{ $t('comps.invoice-editor.536909-6') }}</span>
            <SpInput class="input-text" v-model="value.company_phone" />
          </SpFormItem>
          <SpFormItem prop="bankname" key="bankname">
            <span class="label-text">{{ $t('comps.invoice-editor.536909-7') }}</span>
            <SpInput class="input-text" v-model="value.bankname" />
          </SpFormItem>
          <SpFormItem prop="bankaccount" key="bankaccount">
            <span class="label-text">{{ $t('comps.invoice-editor.536909-8') }}</span>
            <SpInput class="input-text" v-model="value.bankaccount" />
          </SpFormItem>
        </template>
      </SpForm>
    </div>
  </div>
</template>

<script>
const defaultModel = () => ({
  'title': 'individual',
  'content': '',
  'company_name': '',
  'company_address': '',
  'company_phone': '',
  'registration_number': '',
  'bankname': '',
  'bankaccount': ''
})

const rules1 = {
  content: [{ validate: 'required', message: this.$t('comps.invoice-editor.536909-9') }]
}

const rules2 = {
  company_name: [{ validate: 'required', message: this.$t('comps.invoice-editor.536909-10') }],
  registration_number: [{ validate: 'required', message: this.$t('comps.invoice-editor.536909-11') }]
}

export default {
  props: {
    value: {
      type: Object,
      default() {
        return this.defaultModel()
      }
    }
  },

  computed: {
    rules: function() {
      return this.value.title === 'unit' ? rules2 : rules1
    }
  },

  created() {
    const initVal = defaultModel()
    const value = this.value
    const assignVal = { ...initVal, ...value }
    this.$emit('input', assignVal)
  }
}
</script>

    <style lang="scss" scoped>
.invoice-editor {
  .form-group {
    margin: 0 0 4px;
    .form-item {
      margin-bottom: 6px;
    }
    .label-text {
      font-size: 14px;
      color: $color-primary-text;
      line-height: 26px;
      margin: 0;
    }
    .input-text {
      width: 100%;
      height: 32px;
      line-height: 32px;
      .sp-input__input {
        background: #fff;
      }
    }
  }
  .form-group-type {
    label {
      display: inline-block;
      width: 45%;
    }
  }
}
</style>
