/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-smenu__sub-title-ul{
  li{
    cursor: pointer;
  }
  .active{
    color: $color-active ;
  }
}
</style>
<template>
  <ul class="sp-smenu__sub-title-ul">
    <li
      v-for="(item, index) in data"
      :key="index"
      :class="{'active': showActive && item.value == value}"
      @click="handleClick(item)"
    >{{item.label}}
    <!-- <span class="active-sign" v-if="showActive && item.value === value"></span> -->
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    data: Array,
    showActive: Boolean
  },
  methods: {
    handleClick (item) {
      this.$emit('input', item.value)
      this.$emit('change', item)
    }
  }
}
</script>
