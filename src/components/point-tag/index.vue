/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.point-tag {
  position: absolute;
  width: 24px;
  text-align: center;
  height: 24px;
  border-radius: 4px;
  border: 1px solid red;
  color: red;
  line-height: 21px;
  display: inline-block;
}
</style>

<template>
  <div class="point-tag">{{ $t('point-tag.index.265385-0') }}</div>
</template>

<script>
export default {
  name: 'PointTag'
}
</script>
