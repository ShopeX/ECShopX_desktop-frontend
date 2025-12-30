/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.btn-picker {
  &__item {
    // float: left;
    // border: 1px solid #cecece;
    // font-weight: bold;
    height: 26px;
    line-height: 26px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    display: block;
    span {
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      display: inline-block;
    }
    &.active {
      color: $color-brand-primary;
      span {
        background: $color-brand-primary;
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <ul class="btn-picker clearfix">
    <li
      class="btn-picker__item"
      v-for="(item, index) in data"
      :class="{ 'active': selectValue.indexOf(item.value.toString()) > -1 }"
      :key="index"
      @click.stop="onChange(item)"
    >
      <span v-if="item.label">{{ item.label }}</span>
    </li>
  </ul>
</template>

<script>
import { isString } from '@/utils'
export default {
  props: {
    data: {
      type: [Array, Function]
    },
    value: {
      type: [Number, String]
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const selectValue = !this.value
      ? []
      : isString(this.value)
      ? this.value.split(',')
      : [this.value]

    return {
      selectValue
    }
  },
  watch: {
    value(val) {
      this.selectValue = val ? val.split(',') : []
    }
  },
  methods: {
    onChange(item) {
      let sv
      let index = this.selectValue.indexOf(item.value.toString())

      if (this.multiple) {
        // 选中/取消
        if (index > -1) {
          this.selectValue.splice(index, 1)
        } else {
          this.selectValue.push(item.value.toString())
        }
        sv = this.selectValue.sort().join(',')
      } else {
        // 选中/取消
        if (index > -1) {
          this.selectValue = []
          sv = ''
        } else {
          this.selectValue = [item.value.toString()]
          sv = item.value.toString()
        }
      }
      this.$emit('input', sv)
      this.$emit('change', sv)
    }
  }
}
</script>
