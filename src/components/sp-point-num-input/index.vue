/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div :class="classes">
    <span
      class="sp-point-num-input__btn"
      :class="{ 'is-disabled': value <= min }"
      @click="decrease"
      @mousedown="startTick('decrease')"
      @mouseup="stopTick()"
      >-</span
    >
    <input
      class="sp-point-num-input__input"
      autocomplete="off"
      :disabled="disabledInput || disabled"
      :value="localValue"
      :style="inputStyles"
      @focus="onFocus"
      @blur="onBlur"
      @input="setValue($event.target.value)"
    />
    <span
      class="sp-point-num-input__btn"
      :class="{ 'is-disabled': value >= max }"
      @click="increase"
      @mousedown="startTick('increase')"
      @mouseup="stopTick()"
      >+</span
    >
  </div>
</template>

<script>
export default {
  name: 'SpPointNumInput',

  props: {
    value: {},
    max: {
      type: [Number, String],
      default: 99999
    },
    min: {
      type: [Number, String],
      default: 1
    },
    step: {
      type: [Number, String],
      default: 1
    },
    width: {},
    size: {
      type: String
    },
    disabled: Boolean,
    disabledInput: Boolean
  },

  data() {
    return {
      focus: false,
      localValue: this.value
    }
  },

  computed: {
    minVal() {
      const min = Number(this.min)

      return min
    },

    maxVal() {
      const max = Number(this.max)
      const step = Number(this.step)

      return Math.min(Math.floor(max / step) * step, max)
    },

    precision() {
      const pairs = String(this.step).split('.')
      return pairs[1] ? pairs[1].length : 0
    },

    classes() {
      return [
        'sp-point-num-input',
        this.size ? `sp-num-input__size-${this.size}` : '',
        { 'is-disabled': this.disabled },
        { 'is-focus': this.focus }
      ]
    },

    inputStyles() {
      return {
        'width': /(%|px)$/.test(this.width) ? this.width : this.width + 'px'
      }
    }
  },

  watch: {
    // value: {
    //   immediate: false,
    //   handler (val) {
    //     this.setValue(val)
    //   }
    // }
    value(val) {
      this.localValue = val
    }
  },

  created() {
    // this.setValue(this.value)
  },

  methods: {
    setValue(val) {
      val = Number(val) || 0
      if (!val || isNaN(val)) val = this.minVal
      if (val === this.localValue) return

      if (val > this.maxVal) val = this.maxVal
      if (val < this.minVal) val = this.minVal

      if (this.precision <= 0) val = parseInt(val, 10)
      else val = Number((+val).toFixed(this.precision))

      this.localValue = val
      this.$emit('input', val)
      this.$emit('change', val)
    },

    increase() {
      if (this.disabled || this.localValue >= this.maxVal) {
        this.$emit('increase', this.localValue)
        return
      }

      let val = this.localValue + Number(this.step)
      if (val > this.maxVal) val = this.max

      this.setValue(val)
      this.$emit('increase')
    },

    decrease() {
      if (this.disabled || this.localValue <= this.minVal) {
        this.$emit('decrease', this.localValue)
        return
      }

      let val = this.localValue - Number(this.step)
      if (val < this.minVal) val = this.minVal

      this.setValue(val)
      this.$emit('decrease')
    },

    startTick(method) {
      if (this._timer) {
        clearTimeout(this._timer)
      }
      this._timer = setInterval(() => {
        this[method]()
      }, 200)
    },

    stopTick() {
      if (this._timer) {
        clearTimeout(this._timer)
      }
    },

    onFocus(e) {
      this.focus = true
      this.$emit('focus', e)
    },

    onBlur(e) {
      this.focus = false
      this.$emit('blur', e)
    }
  }
}
</script>
