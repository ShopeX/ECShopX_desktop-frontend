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
  <div class="block" :class="{ active: isActive(item) }">
    <span class="item" :title="name" @click="handleClick($event, item.attribute_id)">{{
      changeName
    }}</span>
  </div>
</template>
<script>
export default {
  props: ['name', 'imgurl', 'item', 'urlBrandId'],
  data() {
    const self = this
    return {
      changeName: self.changeNameFunc(self.name)
    }
  },
  created() {},
  methods: {
    handleClick(e, attribute_id) {
      if (this.isActive(this.item)) {
        this.handleDeleteBrand(e, this.item)
      } else {
        this.$emit('on-click', attribute_id)
      }
    },
    isActive(item) {
      return this.urlBrandId && item.attribute_id == this.urlBrandId
    },
    changeNameFunc(name) {
      let newVal
      if (name && name.length > 7) {
        newVal = name.substring(0, 6) + '...'
      } else {
        newVal = name
      }
      return newVal
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

.block {
  height: 30px;
  padding: 0;
  /* border: 1px solid #dcdcdc; */
  /* margin: -1px -1px 0 0; */
  background: #fff;
  text-align: left;
  width: 100px;
  overflow: hidden;
  cursor: pointer;

  &:hover,
  &.active {
    // position: relative;
    // z-index: 5;
    // border-color: $color-brand-primary;
    color: $color-brand-primary;
    // border-width:2px;
    // box-shadow: 2px 2px 3px rgba(0,0 ,0 , 0.12);

    .item {
      color: $color-brand-primary;
      text-align: left;
    }
  }

  .item {
    font-size: 12px;
    line-height: 30px;
  }
}
</style>
