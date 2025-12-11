/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-notice {
  &__title {
    > span {
      display: inline-block;
      margin-right: 30px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="float-menus__item">
    <SpFloatMenu>
      <template v-for="(item, index) in params.urls">
        <SpFloatMenuItem
          iconPrefix="aicon"
          :icon="item.icon"
          :title="item.title"
          target="blank"
          :to="item.link"
          :key="index"></SpFloatMenuItem>
      </template>
      <SpFloatMenuItem iconPrefix="mb-iconfont" icon="up" @click="handleClickBackToTop"></SpFloatMenuItem>
    </SpFloatMenu>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },

  data () {
    return {}
  },

  computed: {},
  methods: {
    handleClickBackToTop () {
      if (process.client) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
