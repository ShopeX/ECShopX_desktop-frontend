/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="sp-input" :class="{'disabled': disabled}">
    <input
      class="sp-input__input"
      v-model="currentValue"
      :disabled="disabled"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
      :style="icon!=''?'':'padding: 10px 14px;'"
      autocomplete="new-password"
    />
    <i :class="icon " class="sp-input__icon"></i>
    <div class="sp-input__line" v-if = "icon!=''"></div>
  </div>
</template>

<script>
import { oneOf } from '@/utils'
import Emitter from './../emitter'
export default {
  name: 'SpInput',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: String,
    type: {
      validator (value) {
        return oneOf(value, ['text', 'password'])
      },
      default () {
        return 'text'
      }
    },
    maxlength: {
      type: Number
    },
    number: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    icon:{
      type:String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  },
  methods: {
    handleBlur (event) {
      this.$emit('blur', event)
      // 触发blur
      this.dispatch('SpFormItem', 'on-form-blur', this.currentValue)
    },
    handleInput (event) {
      let value = event.target.value
      if (this.number && value !== '') {
        value = Number.isNaN(Number(value)) ? value : Number(value)
      }
      value = value ? value.replace(/(^\s*)|(\s*$)/g, '') : value
      this.$emit('input', value)
      this.$emit('change', event)
    },
    handleChange (event) {
      this.$emit('input-change', event)
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    }
  }
}
</script>
