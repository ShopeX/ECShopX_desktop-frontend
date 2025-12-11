/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sortbar {
  line-height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: #e8e8e8;
  border-radius: 3px;
  font-size: 12px;
  .sort-list {
    margin: 10px 0;
    // display: flex;
    // flex: 1;
    // justify-content: space-between;

    &.pointitem {
      display: flex;
      .sort-item {
        height: 34px;
        border-radius: 3px;
        border: 1px solid $color-brand-primary;
        margin-right: 10px;
        background: #fff;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: $color-brand-primary;

        &.small {
          width: 60px;
        }

        &.big {
          width: 100px;
        }

        &.active {
          background: $color-brand-primary;
          color: $color-primary-text;
          border-color: $color-brand-primary;
          .ec-icon-refresharrow {
            color: $color-primary-text;
          }
        }
        .ec-icon-refresharrow {
          color: $color-brand-primary;
        }
        .arrow-icon {
          display: inline-block;
          height: 100%;
          vertical-align: top;
          color: $color-brand-primary;
          &.up {
            transform: rotateX(180deg);
          }
        }
      }
      .price-wrap {
        display: inline-block;
        margin-left: -4px;
        vertical-align: top;
        .price-input {
          width: 80px;
          vertical-align: top;
          border-width: 0;
          .sp-input__input {
            border-radius: 3px;
            border: 1px solid #ccc;
            background: #fff;
            height: 34px;
            color: #333;
          }
        }
        .price-btn {
          display: inline-block;
          background: $color-brand-primary;
          color: $color-primary-text;
          width: 50px;
          text-align: center;
          border-radius: 3px;
          margin-left: 6px;
          cursor: pointer;
        }
      }
    }
  }
  .total {
    flex-basis: 80px;
    text-align: right;

    .highlight {
      color: $color-brand-primary;
    }
  }
}
</style>

<template>
  <div class="sortbar">
    <div class="sort-list pointitem">
      <div>
        <span>{{ $t('comps.goods-sort.643792-0') }}</span>
        <div
          class="sort-item"
          :class="{ active: sort == item.value, small: index < 3, big: index > 2 }"
          v-for="(item, index) in data"
          :key="index"
          @click="selectSort(item.value)"
        >
          {{ item.label }}
          <span
            class="arrow-icon"
            :class="{ up: item.value == '3' }"
            v-if="item.value == '2' || item.value == '3'"
          >
            <i class="ec-icon ec-icon-refresharrow"></i>
          </span>
        </div>
      </div>
      <SearchPointKeyword @search-point="handleSearchPoint" />
    </div>
    <!-- <div class="total">
      共<span class="highlight">{{ total }}</span
      >件商品
    </div> -->
  </div>
</template>

<script>
import SearchPointKeyword from './search-point-keyword'
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
    }
  },
  data() {
    return {
      sort: this.value,
      start_price: null,
      end_price: null
    }
  },
  components: {
    SearchPointKeyword
  },
  methods: {
    selectSort(val) {
      this.sort = val
      this.$emit('change', val)
    },
    submitPrice() {
      this.$emit('change-price', this.start_price, this.end_price)
    },
    handleSearchPoint(keywords) {
      this.$emit('search-keyword', keywords)
    }
  }
}
</script>
