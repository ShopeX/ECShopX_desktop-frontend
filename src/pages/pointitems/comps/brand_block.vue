/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<!--
 * @Author: your name
 * @Date: 2021-02-23 19:53:15
 * @LastEditTime: 2021-02-25 16:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/pages/pointitems/comps/brand_block.vue
-->
<template>
  <div class="block" @click="handleClick(item.attribute_id)" :class="{ 'active': isActive(item) }">
    <div class="item item1">
      <div class="column1">{{ $t('comps.brand_block.500640-0') }}</div>
      <div class="column2">{{ name }}</div>
    </div>
    <div class="item item2">
      <div class="column1">{{ $t('comps.brand_block.500640-1') }}</div>
      <div class="column2"><img :src="imgurl || ''" /></div>
    </div>
    <div class="close">
      <i class="ec-icon ec-icon-close" @click="handleDeleteBrand($event, item)" />
    </div>
  </div>
</template>
<script>
export default {
  props: ['name', 'imgurl', 'item', 'urlBrandId'],
  data() {
    return {}
  },
  methods: {
    handleClick(attribute_id) {
      this.$emit('on-click', attribute_id)
    },
    isActive(item) {
      return this.urlBrandId && item.attribute_id == this.urlBrandId
    },
    handleDeleteBrand(e, item) {
      this.$emit('on-delete', item)
      e.stopPropagation()
    }
  }
}
</script>
<style scoped lang="scss">
$border-color: #dcdcdc;
@mixin flexbox() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  border: 1px solid $border-color;
  width: 120px;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;

  .close {
    display: none;
  }

  &.active {
    border: 1px solid #ea2329;

    .close {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
      display: block;
    }
  }

  .item {
    display: flex;
    .column1 {
      width: 40px;
      height: 40px;
      flex-grow: 0;
      flex-shrink: 0;
      @include flexbox();
    }
    .column2 {
      width: 160px;
      flex: 1;
      @include flexbox();
      img {
        height: 30px;
        width: auto;
      }
    }
  }
  .item1 {
    .column1 {
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
    }
    .column2 {
      border-bottom: 1px solid $border-color;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-height: 38px;
      word-break: break-all;
      text-align: center;
      border-bottom: 1px solid #dcdcdc;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .item2 {
    .column1 {
      border-right: 1px solid $border-color;
    }
  }
}
</style>
