/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-alert {
  position: fixed;
  left: 0;
  right: 0;
  top: 106px;
  z-index: $z-index-toast;
  background: #fff;
  text-align: center;
  padding: 10px;
  &.fadein {
    animation: animate_in 0.25s;
  }
  &.fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  &__success {
    color: $color-success;
  }
  &__warning {
    color: $color-warning;
  }
  &__error {
    color: $color-active;
  }
}

@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<template>
  <div v-if="showWrap" :class="[classes, showContent ? 'fadein' : 'fadeout']">
    <SpLoading class="modal-loading__t" color="#fff" v-if="loading"></SpLoading>
    <span v-html="text"></span>
  </div>
</template>

<script>
const prefixCls = 'sp-alert'
export default {
  name: 'SpAlert',
  computed: {
    classes () {
      return [`${prefixCls}`, `${prefixCls}__${this.type}`]
    }
  }
}
</script>
