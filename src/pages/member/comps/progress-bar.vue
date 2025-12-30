/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template functional>
  <div class="vip-progress">
    <div class="vip-progress-inner" :style="{'width':(props.value || '50') + '%','background':props.color || '#aabab7'}"></div>
  </div>
</template>

    <style lang="scss" scoped>
.vip-progress {
  width: 100%;
  height: 7px;
  background-color: #ffffff;
  border-radius: 6px;
  &-inner {
    height: 7px;
    border-radius: 6px;
    opacity: 0.8;
  }
}
</style>
