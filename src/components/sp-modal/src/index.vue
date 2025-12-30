/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: $z-index-level-10;
  margin: 0;
  width: 100%;
  height: 100%;

  &__mask {
    // position: fixed;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // background-color: rgba(#000, 0.7);
    // height: 100%;
    // z-index: $z-index-level-10;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color: rgba(#000, 0.7);
    z-index: $z-index-level-9;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  &__wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index-level-10;
    -webkit-overflow-scrolling: touch;
    background-color: rgba(#000, 0.7);
    outline: 0;
  }
  &__content {
    position: relative;
    display: block;
    // position: fixed;
    margin: 0 auto 50px;
    // top: 50%;
    // left: 50%;
    z-index: $z-index-level-10;
    box-shadow: 2px 2px 8px #333, -2px -2px 8px #333;
    background-color: #fff;
    // border-radius: 4px;    //边框因和下方内容衔接显示问题所以圆角去除
    margin-top: 15vh;
  }
  &__close {
    position: absolute;
    // right: -20px;
    // top: -20px;
    top: 13px;
    right: 13px;
    z-index: 1102;
    cursor: pointer;

    &.top16 {
      top: 16px;
      color: #fff;
    }

    .ec-icon-close {
      font-size: 20px;
    }
  }
  &__header {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ececec;
  }
  &__body {
    // overflow: hidden;
    &.confirm {
      padding: 20px;
    }
  }
  &__footer {
    padding: 10px;
    text-align: right;
  }
  &-confirm {
    &-head {
      &-title {
        font-weight: bold;
      }
    }
    &-body {
      padding-left: 20px;
      margin: 20px 0;
      font-size: 14px;
    }
    &-footer {
      margin-top: 20px;
      text-align: right;
      .sp-btn {
        margin-left: 10px;
      }
    }
  }
  @include respond(sm) {
    .sp-modal__close {
      right: -14px;
      top: -8px;
    }
  }
}
</style>

<template>
  <div class="sp-modal" v-if="visible" @click="handleMaskClose">
    <div class="sp-modal__mask" @click="handleMaskClose"></div>
    <!-- <div class="sp-modal__wrap" @click="handleMaskClose"> -->
    <div class="sp-modal__content" :style="{ width: contentWidth }">
      <div
        class="sp-modal__close"
        :class="{ top16: top16 }"
        @click="close"
        v-if="!confirm && !maskClose && closeIconVisible"
      >
        <!-- <img src="~/assets/imgs/close-btn.png" :width="54" :height="54"> -->
        <div class="ec-icon ec-icon-close"></div>
      </div>
      <div class="sp-modal__header" v-if="title">{{ title }}</div>
      <slot name="title"></slot>
      <div class="sp-modal__body" :class="{ confirm: confirm }">
        <slot></slot>
      </div>
      <div class="sp-modal__footer" v-if="showFooter">
        <SpButton @click="cancel">{{ $t('src.index.522104-0') }}</SpButton>
        <SpButton type="primary" @click="ok">{{ $t('src.index.522104-1') }}</SpButton>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { lockScreen } from '@/utils/dom'
export default {
  name: 'SpModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    confirm: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: false
    },
    // for instance
    showHeader: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    closeIconVisible: {
      type: Boolean,
      default: true
    },
    gradualTitleBackground: {
      type: Boolean,
      default: false
    },
    top16: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    }
  },
  mounted() {
    // console.log(this)
  },
  computed: {
    contentStyle() {
      let width = this.width
      let height = this.height
      if (this.confirm) {
        return {
          width: width + 'px',
          marginLeft: -width / 2 + 'px',
          top: '30%'
        }
      } else {
        return {
          width: width + 'px',
          height: height + 'px',
          marginLeft: -width / 2 + 'px',
          marginTop: -height / 2 + 'px'
        }
      }
    },
    contentWidth() {
      return `${this.width}px`
    },
    bodyStyle() {
      if (this.confirm) {
        return ''
      } else {
        let height = this.height - (this.showHeader ? 41 : 0) - (this.showFooter ? 53 : 0)
        return `height: ${height}px`
      }
    }
  },
  watch: {
    value(val) {
      this.visible = val
      this.lock()
    }
    // visible(val) {
    //   this.lock()
    // },
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('input', false)
      this.$emit('Cancel')
    },
    cancel() {
      this.close()
    },
    ok() {
      this.visible = false
      this.$emit('input', false)
      this.$emit('Ok')
    },
    lock() {
      // let body = document.getElementsByTagName('body')
      if (this.visible) {
        // body[0].style.overflow = 'hidden'

        lockScreen()
      } else {
        // body[0].style.overflow = ''
        lockScreen(false)
      }
    },
    handleMaskClose() {
      if (this.maskClose) {
        this.close()
      }
    }
  }
}
</script>
