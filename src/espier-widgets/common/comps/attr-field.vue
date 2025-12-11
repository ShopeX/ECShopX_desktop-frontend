/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.attr-field {
  display: flex;
  align-items: center;
  &__label {
    width: 70px;
    font-size: 12px;
    padding-left: 2px;
    // text-align: right;
    // margin-top: 4px;
    &.tag {
      text-align: left;
      span {
        background: #cdcdcd;
        padding: 3px 5px;
      }
    }
  }
  &__content {
    flex: 1;
  }
  &.align-item-top {
    align-items: flex-start;
  }
  // &.align-item-top {
  //   display: flex;
  //   align-items: flex-end;
  //   .attr-field-label {
  //     margin-top: 3px;
  //   }
  // }
}
</style>

<template>
  <div class="attr-field" :class="{ 'align-item-top': labelTop }">
    <div class="attr-field__label" :class="{ tag: tag }" :style="{ width: `${width}px` }">
      <span>{{ label }}</span>
    </div>
    <div class="attr-field__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attrField',
  props: {
    label: {
      type: String
    },
    tag: {
      type: Boolean,
      default: false
    },
    labelTop: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 70
    }
  },
  data() {
    return {}
  }
}
</script>
