/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-toast {
  position: fixed;
  left: 0;
  right: 0;
  top: 106px;
  background: #fff;
  z-index: $z-index-toast;
  text-align: center;
  padding: 10px;
  &__default {
    left: 50%;
    top: 50%;
    right: auto;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    transform: translate(-50%, -50%);
    color: #fff;
  }
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
  <div v-if="showWrap" :class="[classes, showContent ?'fadein':'fadeout']">
    <SpLoading class="modal-loading__t" color="#fff" v-if="loading"></SpLoading>
    <!-- {{text}} -->
    <span v-html="text"></span>
  </div>
</template>

<script>
const prefixCls = 'sp-toast'
export default {
  name: 'SpToast',
  computed: {
    classes () {
      return [`${prefixCls}`, `${prefixCls}__${this.type}`]
    }
  }
}
</script>
