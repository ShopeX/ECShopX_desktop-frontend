/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
  .widget-cart {
    ul {
      li {
        float: left;
      }
    }
  }
</style>

<template>
  <div class="widget-cart">
    <SpMiniCart title="购物袋" to="/cart"></SpMiniCart>
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
