/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.staff-label {
  color: #fff;
  background-color: $color-invalid;
  font-size: 12px;
  border-radius: 10px;
  display: inline-block;
  padding: 0 5px;
}
</style>

<template>
  <div class="staff-label">
    {{ $t('comps.staff-label.919533-0') }}
  </div>
</template>

<script>
export default {
  name: 'StaffLabel'
}
</script>
