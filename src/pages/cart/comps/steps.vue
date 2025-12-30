/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-steps">
    <ul class="steps-list">
      <li class="step-item">{{ $t('comps.steps.003931-0') }}</li>
      <li class="step-item">{{ $t('comps.steps.003931-1') }}</li>
      <li class="step-item">{{ $t('comps.steps.003931-2') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-steps {
  padding: 20px 0;
  font-size: $font-size-large;
  .step-item {
    display: inline-block;
    padding: 0 20px 0 0;
    &.is-active {
      font-weight: bold;
    }
  }
}
</style>
