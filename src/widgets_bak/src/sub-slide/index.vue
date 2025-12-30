/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sub-slide {
  &__img-warp {
    width: 50%;
    font-size: 0;
  }
  @include respond(sm) {
    &__img-warp {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="sub-slide index-banner">
    <div class="wdget-smbanner clearfix banner-sm pc">
      <div class="sub-slide__img-warp fl" v-for="item in params.pic" :key="item.id">
        <SpLink :href="item.linktarget">
          <img v-lazy="item.pc_link" width="100%" height="100%" alt="sub-slide"/>
        </SpLink>
      </div>
    </div>
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
