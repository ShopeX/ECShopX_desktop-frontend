/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss" scoped></style>

<template>
<div
  class="sp-float-menu-item"
  @click="handleClickItem"
>
  <i
    class='sp-float-menu-item__icon'
    :class="[iconPrefix, `${iconPrefix}-${icon}`]"
    v-if="icon"
  ></i>
  <img
    class="sp-float-menu-item__img"
    v-else-if="img"
    :src="img"
  >
  <div class="sp-float-menu-item__text"><slot>{{title}}</slot></div>
</div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  name: 'SpFloatMenuItem',
  props: {
    iconPrefix: {
      type: String,
      default: 'iconfont'
    },
    icon: String,
    img: String,
    title: String,
    to: String,
    target: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleClickItem () {
      if (this.to) {
        if (/^(http|https)/.test(this.to)) {
          if (this.target === 'blank') {
            analytics.event({}, 'liveChatClick')
            window.open(this.to, '_blank')
          } else {
            location.href = this.to
          }
        } else {
          this.$router.push(this.to)
        }
      }

      this.$emit('click')
    }
  }
}
</script>
