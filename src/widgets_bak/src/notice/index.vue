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
  <div class="widget-notice">
    <marquee direction="left" scrollamount="4" class="widget-notice__title">
      <span v-for="(item, index) in params.list" :key="index">{{item.content}}</span>
    </marquee>
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

  computed: {}
}
</script>
