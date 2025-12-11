/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-point">
    <template v-if="total >= MIN_POINT">
      <div class="cart-point__l1">
        <label>
          <SpRadio type="checkbox" :value="isChecked" @change="this.handleToggleCheck" />
          <span class="cart-point__l1-text">{{ $t('comps.point.775552-0') }}</span>
          <span>{{ $t('comps.point.775552-1') }}</span>
          <span class="cart-point__total">{{ total }}</span>
        </label>
      </div>
      <div class="cart-point__l2" v-show="isChecked">
        <span>{{ $t('comps.point.775552-2') }}</span>
        <SpNumInput
          v-model="localVal"
          :min="10000"
          :max="total"
          :step="10000"
          @change="handleInputChange"
          disabled-input
        />
        <SpButton @click="handleConfirm">{{ $t('comps.point.775552-3') }}</SpButton>
      </div>
    </template>
    <div class="cart-point__l1" v-else>{{ $t('comps.point.775552-4') }}</div>
  </div>
</template>

<script>
const MIN_POINT = 10000

export default {
  props: {
    total: Number,
    value: Object
  },

  data() {
    return {
      MIN_POINT,
      isChecked: true,
      localVal: MIN_POINT
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.localVal = val.value || MIN_POINT
        this.isChecked = val.usePoint
      }
    },
    total: {
      immediate: true,
      handler(val) {
        if (val > MIN_POINT && this.localVal !== MIN_POINT) {
          if (this.localVal > val) {
            this.localVal = MIN_POINT
          }
        }
      }
    }
  },

  methods: {
    updateVal(params) {
      this.$emit('change', params)
    },
    handleInputChange(val) {
      val = Math.floor(val / 10000) * 10000
      this.localVal = val
    },
    handleToggleCheck(val) {
      this.isChecked = val
      this.updateVal({
        usePoint: val
      })
    },
    handleConfirm() {
      const value = this.localVal
      this.updateVal({
        value
      })
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-point {
  &__l1 {
    margin-top: 10px;
    &-text {
      color: $color-primary-text;
    }
  }
  &__l2 {
    margin-top: 10px;
    .sp-input {
      display: inline-block;
      width: 200px;
      border: 1px solid #ccc;
      .sp-input__input {
        background: #fff;
      }
    }
  }
  &__total {
    color: $color-red;
  }
  .sp-num-input {
    height: 30px;
    &__input {
      width: 90px;
      line-height: 28px;
      height: 28px;
    }
    &__btn {
      width: 30px;
      height: 30px;
      line-height: 28px;
    }
  }
}
</style>
