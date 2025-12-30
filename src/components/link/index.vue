/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
// .sp-link {
//   display: inline-block;
// }
</style>

<template>
  <div class="sp-link">
    <a :href="href" target="_blank" v-if="!isNuxtLink" @click="handleClick">
      <slot></slot>
    </a>
    <span v-else-if="href===''">
      <slot></slot>
    </span>
    <nuxt-link :to="href" v-else>
      <slot></slot>
    </nuxt-link>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  name: 'SpLink',
  props: {
    href: String
  },
  computed: {
    isNuxtLink () {
      if (!this.href) return false
      return !/^(https?|http):\/\/.+$/.test(this.href)
    }
  },
  methods: {
    handleClick () {
      analytics.event({}, 'liveChatClick')
    }
  }
}
</script>
