/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-btn-picker-group {
  @include clearfix();
  .sp-btn-picker {
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="sp-btn-picker-group">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '@/utils'
export default {
  name: 'SpBtnPickerGroup',
  props: {
    value: [Boolean, String, Number],
    theme: String
  },
  data() {
    return {}
  },
  watch: {
    value(nval, oval) {
      this.updateValue()
    }
  },
  created() {},
  methods: {
    onChange(val) {
      this.$emit('input', val)
      this.$emit('onChange')
    },
    updateValue() {
      this.childrens = findComponentsDownward(this, 'SpBtnPicker')
      if (this.childrens) {
        this.childrens.forEach((child) => {
          child.currentValue = this.value
        })
      }
    }
  }
}
</script>