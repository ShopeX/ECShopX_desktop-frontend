/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.size-picker {
    &__item {
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-weight: bold;
    }
    &__border {
        float: left;
        margin: 0 15px 15px 0;
        padding: 2px;
        cursor: pointer;
        border: 1px solid #cecece;
        &.active {
            // border: 1px solid $color-brand-primary;
        }
    }
}
</style>

<template>
    <ul class="size-picker clearfix">
        <li class="size-picker__border active" v-for="(item, index) in value" :key="index" @click="change(item)">
            <div class="size-picker__item">{{item.label}}</div>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change (item) {

    }
  }
}
</script>
