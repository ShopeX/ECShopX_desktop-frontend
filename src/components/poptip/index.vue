/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-poptip {
  display: inline-block;
  &-rel {
    position: relative;
  }
  &-popper {
    position: absolute;
    will-change: top, left;
    top: -70px;
    left: 8px;

    min-width: 150px;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    position: absolute;
    z-index: 1060;
  }
}
</style>

<template>
  <div>
    <div class="sp-poptip">
      <div :class="[prefixCls + '-rel']" @click="handleClick">
        <slot></slot>
      </div>
      <transition name="fade">
        <div :class="popperClasses" v-show="visible" x-placement="top">
          <div :class="[prefixCls + '-content']">
            <div :class="[prefixCls + '-arrow']"></div>
            <div :class="[prefixCls + '-inner']" v-if="confirm">
              <div :class="[prefixCls + '-body']">
                <i class="ivu-icon ivu-icon-ios-help-circle"></i>
                <div :class="[prefixCls + '-body-message']">
                  <slot name="title">{{ title }}</slot>
                </div>
              </div>
              <div :class="[prefixCls + '-footer']">
                <SpButton type="text" @click.native="cancel">{{ $t('poptip.index.416903-0') }}</SpButton>
                <SpButton type="text" @click.native="ok">{{ $t('poptip.index.416903-1') }}</SpButton>
              </div>
            </div>
            <div :class="[prefixCls + '-inner']" v-if="!confirm">
              <div
                :class="[prefixCls + '-title']"
                :style="contentPaddingStyle"
                v-if="showTitle"
                ref="title"
              >
                <slot name="title">
                  <div :class="[prefixCls + '-title-inner']">{{ title }}</div>
                </slot>
              </div>
              <div :class="[prefixCls + '-body']" :style="contentPaddingStyle">
                <div :class="contentClasses">
                  <slot name="content">
                    <div :class="[prefixCls + '-body-content-inner']">{{ content }}</div>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
const prefixCls = 'sp-poptip'
export default {
  name: 'SpPoptip',
  props: {
    title: {
      type: [String, Number]
    },
    confirm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      visible: true
    }
  },
  computed: {
    popperClasses () {
      return [
        `${prefixCls}-popper`,
        {
          [`${prefixCls}-confirm`]: this.transfer && this.confirm,
          [`${this.popperClass}`]: !!this.popperClass
        }
      ]
    },
    styles () {
      let style = {}
      if (this.width) {
        style.width = `${this.width}px`
      }
      if (this.transfer) style['z-index'] = 1060 + this.tIndex
      return style
    }
  },
  methods: {
    handleClick () {
      if (this.confirm) {
        this.visible = !this.visible
        return true
      }
    },
    cancel () {
      this.visible = false
      this.$emit('cancel')
    },
    ok () {
      this.visible = false
      this.$emit('ok')
    }
  }
}
</script>
