/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.form-item {
  margin-bottom: 30px;
  position: relative;
  &__input {
    padding: 8px 10px;
    border: 1px solid $color-border-gray-light;
    border-radius: $border-radius;
    // height: 32px;
    width: 100%;
    font-size: 14px;
    // line-height: 32px;
    display: inline-block;
    box-sizing: border-box;
    transition: all 0.2s;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
      border-color: #57a3f3;
    }
  }
  &__error {
    input,
    .sort-select__value {
      // border: 1px solid $color-invalid !important;
    }
  }
  &__error-message {
    padding: 0 10px;
    font-size: 12px;
    color: $color-invalid;
    position: absolute;
    i {
      position: relative;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div class="form-item" :class="{ 'form-item__error': validateMessage != '' }">
    <slot></slot>
    <div class="form-item__error-message">
      <!-- <i class="mb-iconfont mb-iconfont-jinggao1" v-if="validateMessage"></i> -->
      {{ validateMessage }}
    </div>
  </div>
</template>

<script>
import Emitter from './../emitter'
import { isFunction, validate } from '@/utils'
export default {
  name: 'SpFormItem',
  mixins: [Emitter],
  props: {
    prop: {
      type: String
    },
    errorMessage: {
      type: String
    }
  },
  inject: ['form'],
  mounted() {
    if (this.prop) {
      this.dispatch('SpForm', 'on-form-item-add', this)

      this.setRules()
    }
  },
  data() {
    return {
      validateMessage: ''
    }
  },
  methods: {
    setRules() {
      this.$off('on-form-blur', this.onFieldBlur)
      this.$on('on-form-blur', this.onFieldBlur)
    },
    getRules() {
      let formRules = this.form.rules
      const selfRules = this.rules

      formRules = formRules ? formRules[this.prop] : []

      return [].concat(selfRules || formRules || [])
    },
    onFieldBlur() {
      this.validate('blur')
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        if (!this.required) {
          callback()
          return true
        } else {
          rules = [{ required: true }]
        }
      }
      this.validateState = 'validating'

      let descriptor = {}
      descriptor[this.prop] = rules
      let fieldValue = this.form.model[this.prop]
      this.valid = true
      rules.forEach((rule) => {
        if (isFunction(rule.validate)) {
          rule.validate(rule, fieldValue, (error) => {
            this.valid && this.handleError(error, callback)
          })
        } else {
          switch (rule.validate) {
            case 'required':
              let error = validate.isRequired(fieldValue) ? rule.message : ''
              this.valid && this.handleError(error, callback)
              break

            default:
              break
          }
        }
      })
    },
    handleError(error, callback) {
      if (error) {
        this.valid = false
        this.validateMessage = error
        callback(this.validateMessage, this.prop)
      } else {
        this.validateMessage = ''
        callback()
      }
    }
  }
}
</script>
