/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
    .good-type-picker {
      margin-bottom: 10px;
      &__title {
        height: 46px;
        line-height: 46px;
        font-size: 18px;
        background: $color-brand-primary;
        border: 1px solid $color-brand-primary;
        color: #fff;
        padding-left: 20px;
        cursor: pointer;
        .mb-iconfont-jiansvg {
          float: right;
          margin-right: 10px;
          font-weight: bold;
        }
      }
      &__content {
        width: 100%;
        border: 1px solid $color-brand-primary;
        li {
          padding-left: 20px;
          margin: 10px 0;
        }
        li:hover {
          span {
            border-bottom: 1px solid $color-brand-primary;
          }
        }
      }
    }
</style>

<template>
    <div class="good-type-picker">
        <div class="good-type-picker__title">
          {{title}}
          <i class="mb-iconfont mb-iconfont-jiansvg"></i>
        </div>
        <ul class="good-type-picker__content">
            <li v-for="(item, index) in value" :key="index">
              <span>{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Array
    }
  }
}
</script>
