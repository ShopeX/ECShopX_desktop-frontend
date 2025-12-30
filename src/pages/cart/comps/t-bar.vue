/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.t-bar {
  &__header {
    background: #efefef;
    height: 48px;
    line-height: 48px;
    // padding-left: 14px;
  }
  &__content {
    background: #fff;
    .container {
      padding: 20px 0;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: bold;
  }
  @include respond(sm) {
    &__header {
      padding: 0 15px;
    }
    &__content {
      .container {
        padding: 10px 15px;
      }
    }
  }
}
</style>

<template>
  <div class="t-bar">
    <div class="t-bar__header">
      <div class="container">
        <span class="t-bar__title">{{ title }}</span>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="t-bar__content">
      <div class="container">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {}
}
</script>
