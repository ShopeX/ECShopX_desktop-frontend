<style lang="scss" scoped>
.sp-message {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 300px;
  height: 100px;
  border: 1px solid $color-border-gray;
  z-index: $z-index-toast;
  background: #fff;
  text-align: center;
  padding: 10px;
  transform: translate(-50%, -50%);
  &__content {
    margin-top: 15px;
    i {
      font-size: 35px;
      vertical-align: middle;
      margin-right: 5px;
      &.mb-iconfont-chenggong {
        color: $color-success;
      }
      &.mb-iconfont-jinggao1 {
        color: $color-active;
      }
      &.mb-iconfont-icon-yxj-error1 {
        color: $color-warning;
      }
    }
    > span {
      vertical-align: middle;
      position: relative;
      top: 2px;
    }
  }
  &.fadein {
    animation: animate_in 0.25s;
  }
  &.fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
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
  <div class="sp-message" v-if="visible" :class="visible ?'fadein':'fadeout'">
    <div class="sp-message__content">
      <i
        class="mb-iconfont"
        :class="{'mb-iconfont-icon-yxj-error1': type == 'warning', 'mb-iconfont-chenggong': type == 'success', 'mb-iconfont-jinggao1': type == 'error'}">
      </i>
      <span v-html="message"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpMessage',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: String,
    type: String
  },
  data () {
    return {
      visible: this.value
    }
  }
}
</script>
