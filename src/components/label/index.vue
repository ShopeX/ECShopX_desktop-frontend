/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-label {
  // font-size: $font-size;
  display: inline-block;
  // padding: 3px 5px;
  vertical-align: middle;
  font-size: 14px;
  background: #c51333;
  color: #fff;
  text-align: center;
  padding: 2px 4px;
  margin: 0 6px 0 0;
}
</style>

<template>
  <div class="sp-label">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpLabel'
}
</script>
