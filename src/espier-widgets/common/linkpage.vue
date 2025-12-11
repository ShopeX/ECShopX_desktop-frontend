/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
// 添加z-index防止:after元素盖住跳转
a {
  position: relative;
  z-index: 999;
}
</style>

<template>
  <span class="link-page">
    <a
      class="link-page__a"
      :style="{ color: ctitleColor }"
      v-if="mode == 'design' || mode == 'preview'"
      ><slot></slot
    ></a>
    <template v-else>
      <!-- 使用 router.push 进行跳转 -->
      <a 
        class="link-page__a" 
        v-if="to" 
        :style="{ color: ctitleColor }" 
        @click="handleClick"
        href="javascript:void(0)"
      >
        <slot></slot>
      </a>
      <!-- 自定义连接 -->
      <a 
        class="link-page__a" 
        v-if="!to" 
        :style="{ color: ctitleColor }"
        @click="handleClick"
        href="javascript:void(0)"
      >
        <slot></slot>
      </a>
    </template>
  </span>
</template>
<script>
import mixins from '../mixins'
export default {
  name: 'linkPage',
  mixins: [mixins],
  props: {
    to: String,
    ctitleColor: {
      type: String,
      default: '#333333'
    }
  },
  data() {
    return {}
  },
  methods: {
    isTargetLink(to) {
      if (/^(http|https)/.test(to)) {
        return true
      } else {
        return false
      }
    },
    handleClick() {
      if (this.to) {
        if (this.isTargetLink(this.to)) {
          // 外部链接，使用 window.open 打开
          window.open(this.to, '_blank')
        } else {
          // 内部路由，使用 router.push
          this.$router.push(this.to)
        }
      }
    }
  }
}
</script>
