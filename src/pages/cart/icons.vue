/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div>
    <template v-for="icon in icons">
      <div class="div">
        {{ icon }}
        <i class="ec-icon" :class="icon"></i>
      </div>
    </template>
  </div>
</template>

<script>
import { exportIcon } from '@/utils/dom'
let icons = exportIcon()
export default {
  data() {
    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  display: inline-block;
  width: 250px;
  height: 30px;
  border: solid 1px red;
  text-align: center;
}
</style>
