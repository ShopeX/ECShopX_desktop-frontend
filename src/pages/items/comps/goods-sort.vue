/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sortbar {
  @include clearfix();
  .sort-list {
    @include clearfix();
    float: left;
    width: 1050px;
    .label {
      font-size: 14px;
      color: #333;
      float: left;
      width: 80px;
    }
    .sort-items {
      float: left;
      @include clearfix();
    }
    .sort-item {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      border: 1px solid #ddd;
      margin-right: 10px;
      cursor: default;
      float: left;
      &.active {
        // background: $color-brand-primary;
        color: $color-primary-text;
        // border-color: $color-brand-primary;
        .ec-icon-refresharrow {
          color: $color-primary-text;
        }
      }
      .arrow-icon {
        display: inline-block;
        height: 100%;
        vertical-align: top;
        &.up {
          transform: rotateX(180deg);
        }
      }
    }
    .price-wrap {
      float: left;
      @include clearfix();
      .price-input {
        width: 80px;
        border-width: 0;
        float: left;
        .sp-input__input {
          border-radius: 2px;
          border: 1px solid #ddd;
          height: 30px;
          color: $color-hint-text;
          font-size: 12px;
          padding: 2px 14px;
        }
      }
      .line {
        float: left;
    margin: 0 4px;
    height: 30px;
    position: relative;
    top: -2px;
      }
      .price-btn {
        float: left;
        // background: $color-brand-primary;
        // color: $color-primary-text;
        border: 1px solid #ddd;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .search-total {
    float: left;
    width: 100px;
    text-align: right;
    color: #888;
    .highlight {
      color: $color-brand-primary;
    }
  }
}
</style>

<template>
  <div class="sortbar clearfix">
    <div class="sort-list">
      <div class="label">{{ $t('comps.goods-sort.235075-0') }}</div>
      <div class="sort-items">
        <div
          class="sort-item"
          :class="{ active: sort == item.value }"
          v-for="(item, index) in data"
          :style="{
            backgroundColor: sort == item.value ? theme : '',
            borderColor: sort == item.value ? theme : ''
          }"
          
          :key="index"
          @click="selectSort(item.value)"
        >
          {{ item.label }}
          <span
            class="arrow-icon"
            :class="{ 'up': item.value == '3' }"
            v-if="item.value == '2' || item.value == '3'"
          >
            <i class="ec-icon ec-icon-refresharrow"></i>
          </span>
        </div>
        <div class="price-wrap">
          <SpInput class="price-input" v-model="start_price" placeholder="￥"></SpInput>
          <div class="line">-</div>
          <SpInput class="price-input" v-model="end_price" placeholder="￥"></SpInput>
          <div class="price-btn" @click="submitPrice()">{{ $t('comps.goods-sort.235075-1') }}</div>
        </div>
      </div>
    </div>
    <div class="search-total">
      {{ $t('comps.goods-sort.235075-2') }}<span class="highlight">{{ total }}</span
      >{{ $t('comps.goods-sort.235075-3') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    total: {
      type: Number
    },
    value: {
      type: String
    },
    theme: {
      type: String
    },
    startPrice: String,
    endPrice: String
  },
  data() {
    return {
      sort: this.value,
      start_price: this.startPrice,
      end_price: this.endPrice
    }
  },
  methods: {
    selectSort(val) {
      this.sort = val
      this.$emit('change', val)
    },
    submitPrice() {
      this.$emit('change-price', this.start_price, this.end_price)
    }
  }
}
</script>
