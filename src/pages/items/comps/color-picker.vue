/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.color-picker {
  &__item {
    margin: 0 0 8px;
    cursor: pointer;
    &.active {
      .color-picker__img {
        margin: 0;
        &-wrap {
          border: 3px solid $color-brand-primary;
        }
      }
    }
  }
  &__label {
    display: inline-block;
    vertical-align: middle;
  }
  &__img {
    width: 18px;
    height: 18px;
    margin: 2px;
    border-radius: 18px;
    &-wrap {
      width: 24px;
      height: 24px;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid #cecece;
      border-radius: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <ul class="color-picker clearfix">
    <li
      class="color-picker__item"
      :class="{ 'active': selectValue.indexOf(item.value.toString()) > -1 }"
      v-for="(item, index) in data"
      :key="index"
      @click="change(item)"
    >
      <div class="color-picker__img-wrap">
        <div class="color-picker__img" :style="{ background: `url(${item.prop_image})` }"></div>
      </div>
      <div class="color-picker__label">{{ item.prop_value }}</div>
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
    current: {
      type: [Number, String]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function
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
  methods: {
    change(item) {
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

      this.$emit('change', sv)
    }
  }
}
</script>
