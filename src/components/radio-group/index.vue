/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.radio-group {
  &__warp {
    // display: inline-block;
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      overflow: hidden;
    }
    .sp-radio__label {
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div :class="classes" :name="name">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf, findComponentsDownward } from '@/utils'
let seed = 0
const now = Date.now()
const getUuid = () => `RadioGroup_${now}_${seed++}`

export default {
  name: 'SpRadioGroup',
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['radio', 'checkbox'])
      },
      default () {
        return 'radio'
      }
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    name: {
      type: String,
      default: getUuid
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  computed: {
    classes () {
      return [`radio-group__warp`]
    }
  },
  mounted () {
    this.updateValue()
  },
  methods: {
    updateValue () {
      this.childrens = findComponentsDownward(this, 'SpRadio')
      if (this.childrens) {
        this.childrens.forEach(child => {
          if (this.type === 'checkbox') {
            child.currentValue = this.currentValue.indexOf(child.label) > -1
          } else {
            child.currentValue = this.currentValue === child.label
          }
          child.group = true
        })
      }
    },
    change (data) {
      if (this.type === 'checkbox') {
        let index = this.currentValue.indexOf(data.value)
        if (index > -1) {
          this.currentValue.splice(index, 1)
        } else {
          this.currentValue.push(data.value)
        }
      } else {
        this.currentValue = data.value
      }
      this.updateValue()
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
      //   this.dispatch('FormItem', 'on-form-change', data.value)
    }
  },
  watch: {
    value () {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value
        this.$nextTick(() => {
          this.updateValue()
        })
      }
    }
  }
}
</script>
