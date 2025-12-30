/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
  .footer-links {
    ul {
      text-align: center;
      a{
        font-size: 12px;
        letter-spacing: 1px;
        color: $color-secondary-text;
      }
    }
  }
</style>

<template>
  <div class="footer-links">
    <ul>
      <li v-for="(item, index) in params.urls" :key="index">
        <a :href="item.link" v-if="item.link">{{item.title}}</a>
        <span v-else>{{item.title}}</span>
      </li>
    </ul>
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
