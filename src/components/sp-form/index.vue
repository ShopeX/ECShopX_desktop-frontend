/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.form {
  // border: 1px solid $color-border-gray-light;
  margin: 0 auto;
  // padding: 20px 30px;
  box-sizing: border-box;
}
</style>

<template>
  <div class="form" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    width: {
      type: [Number, String],
      default: null
    }
  },
  provide() {
    return { form: this }
  },
  data() {
    return {
      fields: []
    }
  },
  computed: {
    styles() {
      const width = this.width

      return {
        width: typeof width === 'number' ? `${width}px` : width
      }
    }
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
      return false
    })
  },
  methods: {
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        let errors = {}
        this.fields.forEach((field) => {
          field.validate('', (error, props) => {
            if (error) {
              errors[props] = error
              valid = false
            }
            if (++count === this.fields.length) {
              // all finish
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid, errors)
              }
            }
          })
        })
      })
    },
    validateField(prop, cb) {
      const field = this.fields.filter((field) => field.prop === prop)[0]
      if (!field) {
        throw new Error('[warn]: must call validateField with valid prop string!')
      }

      field.validate('', cb)
    }
  }
}
</script>
