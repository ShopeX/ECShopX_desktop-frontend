/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
<div class="goods-acoordion">
  <SpCollapse
    v-for="(item, index) in info"
    :key="index"
    :title="item.title"
    :open="!!opened[index]"
    @change="val => handleItemChange(index, val)"
  >
    <div v-html="item.content"></div>
  </SpCollapse>
</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      curIdx: 0,
      opened: {}
    }
  },

  methods: {
    handleItemChange (idx, val) {
      this.opened[idx] = val
    }
  }
}
</script>

    <style lang="scss" scoped>
.goods-acoordion {
  .acoord-item {
    &-hd {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .mb-iconfont {
    font-size: 20px;
    float: right;
    margin: 0 10px 0 0;
    cursor: pointer;
    transition: all .3s;
  }
  .mb-iconfont-down {
    transform: rotate(-90deg);
  }
  .mb-iconfont-up {
    transform: rotate(-180deg);
  }
  .collapse {
    margin: 0 0 15px;
    &__title {
      height: 36px;
      font-size: 16px;
      font-weight: bold;
      padding: 0;
      line-height: 34px;
      border-bottom: 1px solid $color-border-gray;
    }
    &__panel {
      padding-top: 10px;
    }
  }
}
</style>
