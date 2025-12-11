/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.topbar-links {
  ul {
    li {
      display: inline-block;
      color: #000;
      font-size: 14px;
      margin-left: 40px;
      .sp-link {
        display: inline-block;
      }
      .img-box {
        height: 20px;
        width: 20px;
        position: relative;
        display: inherit;
        img {
          position: absolute;
          top: 1px;
        }
      }
    }
  }
  // &__icon {
  //   position: relative;
  //   top: 6px;
  // }
  @include respond(sm) {
    ul {
      background: #000;
      li {
        display: block;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        // padding: 10px;
        margin-left: 0;
        .sp-link {
          display: block;
        }
        a {
          color: #fff;
        }
        img {
          display: none;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #2d2d2d;
        }
      }
    }
  }
}
</style>

<template>
  <div class="topbar-links">
    <ul class="clearfix">
      <li v-for="(item, index) in params.urls" :key="index" @click="handleClick">
        <SpLink :href="item.link">{{item.title}}</SpLink>
        <div class="img-box"  v-if="item.icon">
          <img
            class="topbar-links__icon"
            :src="item.icon"
            alt="topbar-link"
            width="24"
            height="24"
          />
        </div>
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

  methods: {
    handleClick () {
    }
  }
}
</script>
