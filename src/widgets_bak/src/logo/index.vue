/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-logo {
  img {
    width: 100%;
  }
  @include respond(sm) {
    img {
      width: 110px;
    }
  }
}
</style>

<template>
  <div class="widget-logo">
    <NuxtLink to="/">
      <img class="logo" :src="params.logo_image" @click="handleCloseMenu" alt="logo"/>
    </NuxtLink>
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
    handleCloseMenu () {
      this.$EventBus.$emit('close-menu')
    }
  }
}
</script>
