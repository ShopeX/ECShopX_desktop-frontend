/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="index-banner">
    <SpLink :href="params.ad_pic_link">
      <img v-lazy="params.ad_pic_pc" width="100%" height="100%" alt="ad-onepic"/>
    </SpLink>
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
    // repalceurl (url) {
    //   return url.replace('http://qa-api.dickies.com.cn', 'https://shopex-demo.shopex.cn')
    // }
  }
}
</script>

<style lang="scss">
.index-banner {
  position: relative;
  font-size: 0;
}
</style>
