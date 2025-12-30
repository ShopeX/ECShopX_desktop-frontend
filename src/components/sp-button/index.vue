/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <component :is="tagName" :class="classes" :type="buttonType" @click="handleClickLink">
    <SpLoading v-if="loading" size="16" stroke="1"></SpLoading>
    <span class="sp-btn__txt">
      <slot></slot>
    </span>
  </component>
</template>

<script>
import { oneOf } from '@/utils'
const prefixCls = 'sp-btn'
export default {
  name: 'SpButton',
  props: {
    type: {
      validator(value) {
        return oneOf(value, [
          'default',
          'primary',
          'dashed',
          'text',
          'info',
          'success',
          'warning',
          'error'
        ])
      },
      default: 'default'
    },
    long: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return 'default'
      }
    },
    buttonType: String,
    loading: Boolean,
    disabled: Boolean,
    to: String,
    link: Boolean
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      return [
        prefixCls,
        `${prefixCls}__${this.type}`,
        {
          'is-disabled': this.disabled,
          [`${prefixCls}__${this.size}`]: this.size !== 'default',
          [`${prefixCls}__long`]: this.long
        }
      ]
    },
    tagName() {
      return 'button'
    }
  },
  methods: {
    handleClickLink(event) {
      if (this.disabled) return
      if (this.link) {
        this.$router.push(this.to)
      }
      this.$emit('click', event)
    }
  }
}
</script>
