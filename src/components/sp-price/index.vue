/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-price {
  display: inline-block;
  vertical-align: middle;
  &__small {
    font-size: $font-size-small;
  }
  &__default {
    font-size: floor($font-size * 1.3);
  }
  &__large {
    font-size: 18px;
  }
  font-family: Arial-BoldMT, Microsoft Yahei, PingFangSC-Medium, sans-serif, serif;
  .price__symbol {
    margin-right: 4px;
    float: left;
    color: $color-brand-primary;
  }
  .price__int,
  .price__decimal,
  .price__append {
    color: $color-brand-primary;
    float: left;
    text-decoration: inherit;
  }
}
</style>

<template>
  <span :class="classes">
    <!-- {{ value < 0 ? '-' : '' }} -->
    <template v-if="isValid">
      <span v-if="!noSymbol" class="price__symbol">{{ symbol }}</span>
      <span class="price__int">{{ priceVals.int }}</span>
      <span class="price__decimal" v-if="!noDecimal && priceVals.decimal !== undefined"
        >.{{ priceVals.decimal }}</span
      >
      <span class="price__append" v-if="appendText">{{ appendText }}</span>
    </template>
    <template v-else>{{ defaultValue }}</template>
  </span>
</template>

<script>
import { oneOf, isNumber } from '@/utils'

const prefixCls = 'sp-price'
const resolveSeparator = (int) => {
  const arr = (int + '').split('')
  const len = arr.length
  const ret = []
  for (let i = len - 1; i >= 0; i--) {
    if ((len - 1 - i) % 3 === 0 && i !== len - 1) {
      ret.unshift(',')
    }
    ret.unshift(arr[i])
  }
  return ret.join('')
}

export default {
  name: 'SpPrice',
  props: {
    symbol: {
      type: String,
      default: '¥'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    defaultValue: {
      type: String,
      default: '-'
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return 'default'
      }
    },
    noSymbol: Boolean,
    noDecimal: Boolean,
    unit: String,
    appendText: String
  },
  computed: {
    isValid() {
      return !isNaN(parseFloat(this.value, 10))
    },
    classes() {
      return `${prefixCls} ${prefixCls}__${this.size} clearfix`
    },
    priceVals() {
      const value = +this.value
      let priceVal = this.unit === 'cent' ? value / 100 : value
      if (isNumber(priceVal)) {
        priceVal = priceVal.toFixed(2)
      }
      const [int, decimal] = (priceVal || '').split('.')
      const intWithSeparator = resolveSeparator(int)
      return {
        int: intWithSeparator,
        decimal
      }
    }
  }
}
</script>
