/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-layer {
  background: rgba(#000, 0.6);
  z-index: $z-index-modal;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__transparent {
    background: rgba(#000, 0);
  }

  &__transition {
    &-enter-active, &-leave-active {
      transition: opacity .2s;
    }
    &-enter, &-leave-to {
      opacity: 0;
    }
  }
}
</style>

<template>
<transition name="sp-layer__transition">
  <div
    :class="classes"
    v-show="value"
  >
    <slot></slot>
  </div>
</transition>
</template>

<script>
export default {
  name: 'SpLayer',

  props: {
    transparent: Boolean,
    value: Boolean
  },

  computed: {
    classes () {
      return [
        'sp-layer',
        { 'sp-layer__transparent': this.transparent }
      ]
    }
  }
}
</script>