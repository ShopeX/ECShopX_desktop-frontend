/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.panel-bar {
  &__title {
    padding: 6px 10px;
    background: #f3f3f3;
  }
  &__container {
    padding: 10px;
  }
}
</style>

<template>
  <div class="panel-bar">
    <div class="panel-bar__title">{{ title }}</div>
    <div class="panel-bar__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sPanelBar',
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
