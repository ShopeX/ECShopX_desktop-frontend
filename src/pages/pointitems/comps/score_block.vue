/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<!--
 * @Author: your name
 * @Date: 2021-02-23 19:53:15
 * @LastEditTime: 2021-02-24 11:15:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/pages/pointitems/comps/brand_block.vue
-->
<template>
  <div class="block">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="score_item"
      :class="{ 'active': isActive(currentPointIndex, index) }"
      @click="handleClick(index, item[0], item[1], $event)"
    >
      <div class="name">{{ item[0] }}</div>
      <div class="name">~</div>
      <div class="name">{{ item[1] }}</div>
      <div class="name">{{ $t('comps.score_block.523891-0') }}</div>
      <!-- <i class="ec-icon ec-icon-close" @click="handleDelete($event)" /> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ['data', 'currentPointIndex'],
  methods: {
    handleClick(index, start, end, e) {
      if (this.isActive(this.currentPointIndex, index)) {
        this.handleDelete(e)
      } else {
        this.$emit('on-click', { index, start, end })
      }
    },
    handleDelete(e) {
      this.$emit('on-delete-point')
      e.stopPropagation()
    },
    isActive(index1, index2) {
      return index1 == index2
    }
  }
}
</script>
<style scoped lang="scss">
$color: grey;
@mixin flexbox() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  color: $color;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .score_item {
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    line-height: 30px;
    border-radius: 3px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 12px;
    margin-right: 26px;
    /* background: #f5f5f6; */
    //border: 1px solid #ccc;

    div {
      &:nth-child(1) {
        margin-right: 10px;
      }
      &:nth-child(2) {
        margin: 0 10px 0 0;
      }
      &:nth-child(3) {
        margin-right: 10px;
      }
    }

    &.active,
    &:hover {
      //background: $color-brand-primary;
      .name {
        color: $color-brand-primary;
      }
    }

    &.active {
      .ec-icon-close {
        display: inline-block;
      }
    }

    .ec-icon-close {
      height: 100%;
      display: none;
      color: $color-primary-text;
      font-size: 14px;
      line-height: 35px;
      margin-left: 5px;
    }
  }
}
</style>
