/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.filter-container {
  border-radius: 3px;
  font-size: 12px;
  .title {
    background: #fff;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    .highlight {
      color: $color-brand-primary;
    }
  }
  .brand-wrap {
    // border: 1px solid #e8e8e8;
    color: #333;
    .brand-title {
      float: left;
      width: 10%;
      height: 100%;
      width: 80px;
      margin-top: 16px;
      font-size: 14px;
    }
    .brand-list {
      position: relative;
      float: left;
      padding: 10px 0;
      background: #fff;
      overflow: hidden;
      width: 1068px;
      &__link {
        display: inline-block;
        cursor: pointer;
        padding: 0 5px;
        margin-right: 10px;
        line-height: 30px;
        border-radius: 3px;
        // &.active,
        // &:hover {
        //   background: $color-brand-primary;
        //   .name {
        //     color: $color-primary-text;
        //   }
        // }
        &.active {
          .ec-icon-close {
            display: inline-block;
          }
        }
        .name {
          padding: 0 5px;
          display: inline-block;
          font-size: 14px;
          color: inherit;
        }
        .ec-icon-close {
          height: 100%;
          display: none;
          color: $color-primary-text;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="filter-container">
    <div class="brand-wrap clearfix">
      <div class="brand-title">{{ $t('comps.goods-filter.752935-0') }}</div>
      <div class="brand-list">
        <a
          class="brand-list__link"
          :style="{
            color: value == item.attribute_id ? theme : ''
          }"
          :key="index"
          v-for="(item, index) in data"
        >
          <span class="name" @click="handleClick(item.attribute_id)">{{
            item.attribute_name
          }}</span>
          <!-- <i class="ec-icon ec-icon-close" @click="handleDeleteBrand()" /> -->
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    theme: {
      type: String
    },
    value: String
  },
  methods: {
    handleClick(attribute_id) {
      if (this.value && this.value == attribute_id) {
        this.$emit('onChange', '')
      } else {
        this.$emit('onChange', attribute_id)
      }
    }
  }
}
</script>
