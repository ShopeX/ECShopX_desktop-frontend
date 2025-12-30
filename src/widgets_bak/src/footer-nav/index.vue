/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.footer-nav {
  .c-h {
    span {
      vertical-align: top;
    }
  }
  .mb-iconfont {
    display: none;
  }
  @include respond(sm) {
    ul {
      padding-left: 10px;
      margin-top: 15px;
    }
    .mb-iconfont {
      display: block;
    }
  }
}
</style>

<template>
  <div class="footer-nav">
    <div class="c-h">
      <span>{{params.title}}</span>
      <img class="service2" v-if="params.icon" :src="params.icon" alt="service" />
      <i class="mb-iconfont"></i>
    </div>
    <no-ssr>
      <ul>
        <li v-for="(item, index) in params.urls" :key="index">
          <nuxt-link :to="item.link" @click.native="$track('footer_link', item.link, item.title)">{{item.title}}</nuxt-link>
        </li>
      </ul>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  methods: {}
}
</script>
