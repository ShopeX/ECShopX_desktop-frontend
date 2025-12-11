/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
$radio-size: 16px;
$radio-color: #ccc;

.sp-radio {
  &__label {
    cursor: pointer;
    display: inline-block;
    &.disabled {
      .sp-radio__rect {
        border: 1px solid #cad3e3;
        background: #f9f9f9;
      }
    }
  }
  &__rect {
    width: $radio-size;
    height: $radio-size;
    border: 1px solid $radio-color;
    cursor: pointer;
    transition: all 0.3s;
    &.radio {
      border-radius: $radio-size;
      &.checked {
        background: #fff;
        position: relative;
        // &:after {
        //   content: "";
        //   width: 3px;
        //   height: 6px;
        //   position: absolute;
        //   top: 0;
        //   left: 3px;
        //   border: 2px solid $radio-color;
        //   border-top: 0;
        //   border-left: 0;
        //   transform: rotate(45deg) scale(1);
        // }

        // &:after {
        //   content: '';
        //   width: 6px;
        //   height: 6px;
        //   position: absolute;
        //   top: 4px;
        //   left: 4px;
        //   background: #525252;
        //   border-radius: 50%;
        // }
      }
    }
    .radio-checked {
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 50%;
      position: relative;
      top: -5px;
      left: 4px;
    }
    &.checkbox {
      &.checked {
        // background: #fff;
        background: #e43838;
        position: relative;
        &:after {
          content: '';
          width: 4px;
          height: 7px;
          position: absolute;
          top: 0;
          left: 3px;
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transform: rotate(45deg) scale(1);
        }
      }
    }
  }
  &__icon {
    display: inline-block;
    vertical-align: middle;
  }
  &__text {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    // padding-left: 5px;
    // font-weight: bold;
    // position: relative;
    // top: -5px;
    cursor: pointer;
  }
  &__small {
    .sp-radio__label-radio {
      // display: inline-block;
      // width: 16px;
    }
    .sp-radio__rect {
      transform: scale(0.7);
    }
  }
}
</style>

<template>
  <label :class="wrapClasses">
    <div class="sp-radio__icon" :class="radioClasses">
      <span :class="innerClasses"></span>
      <div
        class="sp-radio__rect"
        :class="{
          'checked': currentValue,
          'checkbox': type == 'checkbox',
          'radio': type == 'radio'
        }"
        :style="{
          background: currentValue && type == 'checkbox' ? theme : '',
          borderColor: currentValue ? theme : ''   
        }"
      >
        <span class="radio-checked" v-if="currentValue && type == 'radio'" 
          :style="{
            background: currentValue ? theme : ''
          }"
        ></span>
      </div>
      <input
        :type="type"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        v-show="false"
        @change="change"
      />
    </div>
    <div class="sp-radio__text">
      <slot></slot>
    </div>
  </label>
</template>

<script>
import { oneOf, findComponentUpward } from '@/utils'
import Emitter from '../emitter'

const prefixCls = 'sp-radio'
export default {
  name: 'SpRadio',
  mixins: [Emitter],
  props: {
    type: {
      validator(value) {
        return oneOf(value, ['radio', 'checkbox'])
      },
      default() {
        return 'radio'
      }
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    theme: {
      type: String
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default() {
        return 'default'
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      groupName: this.name,
      parent: findComponentUpward(this, 'SpRadioGroup')
    }
  },
  computed: {
    wrapClasses() {
      return [
        `sp-radio__label`,
        {
          [`checked`]: this.currentValue,
          [`${prefixCls}__${this.size}`]: this.size !== 'default',
          [`disabled`]: this.disabled
        }
      ]
    },
    radioClasses() {
      return 'sp-radio__label-radio'
    },
    innerClasses() {
      return []
    },
    inputClasses() {
      return []
    }
  },
  mounted() {
    if (this.parent) {
      this.group = true
      if (this.name && this.name !== this.parent.name) {
        /* eslint-disable no-console */
        if (console.warn) {
          console.warn('[radio] Name does not match Radio Group name.')
        }
        /* eslint-enable no-console */
      } else {
        this.groupName = this.parent.name
      }
    }

    if (this.group) {
      this.parent.updateValue()
    } else {
      this.updateValue()
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false
      }
      const checked = event.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)

      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change({
            value: this.label,
            checked: this.value
          })
        }
      } else {
        this.$emit('change', value)
      }
    },
    updateValue() {
      this.currentValue = this.value === this.trueValue
    },
    onFocus() {},
    onBlur() {}
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue()
      } else {
        // eslint-disable-next-line no-throw-literal
        throw 'Value should be trueValue or falseValue.'
      }
    }
  }
}
</script>
