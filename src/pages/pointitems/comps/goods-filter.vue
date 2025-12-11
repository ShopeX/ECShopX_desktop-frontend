/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$border-color: #dcdcdc;
.filter-content {
  color: $border-color;

  .scroll-brand {
    display: flex;
    overflow: auto;
    padding-top: 1px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    max-height: 60px;
    width: 100%;
    overflow-x: hidden;
  }

  .filter-item:nth-child(2) {
    &.isNotHaveBrand {
      border-top: 1px solid #dcdcdc;
    }
    &.isOnlyHaveCategory,
    &.isNotHavePoint {
      border-bottom: 1px solid #dcdcdc;
    }
  }

  .filter-item {
    display: flex;

    &_title {
      width: 120px;
      padding: 5px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $border-color;
      width: 120px;
      flex-basis: 120px;
      flex-grow: 0;
      flex-shrink: 0;
    }

    &_content {
      flex: 1;
      padding: 9px;
      border-top: 1px solid #dcdcdc;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      overflow-y: hidden;
      overflow-x: hidden;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
    .filter-item_title {
      background-color: #f1f1f1;
    }
    &:nth-child(n + 2):not(:nth-last-child(-n + 1)) {
      .filter-item_title {
        border-left: 1px solid $border-color;
        border-right: 1px solid $border-color;
        border-top: none;
        border-bottom: none;
      }
    }
    &:nth-child(n + 2):not(:nth-last-child(-n + 1)) {
      .filter-item_content {
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: 1px solid $border-color;
      }
    }
  }
}
.scroll-brand-category {
  display: flex;
  overflow: auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  max-height: 30px;
  width: 100%;
  overflow-x: hidden;
}
.filter-container-pointitem {
  border-radius: 3px;
  //border: 1px solid $border-color;
  color: #e8e8e8;
  font-size: 12px;
  margin-top: 42px;

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
    border-top: 1px solid #e8e8e8;
    color: #666666;
    // background: #f5f8f8;
    .brand-title {
      float: left;
      width: 10%;
      padding: 10px 15px;
      min-height: 30px;
      height: 100%;
    }
    .brand-list {
      position: relative;
      float: left;
      width: 90%;
      padding: 10px;
      background: #fff;
      overflow: hidden;
      &__link {
        display: inline-block;
        cursor: pointer;
        padding: 0 5px;
        margin-right: 10px;
        line-height: 30px;
        border-radius: 3px;
        &.active,
        &:hover {
          background: $color-brand-primary;
          .name {
            color: $color-primary-text;
          }
        }
        &.active {
          .ec-icon-close {
            display: inline-block;
          }
        }
        .name {
          padding: 0 5px;
          display: inline-block;
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
  }
}
.categoryItem {
  display: inline-block;
  cursor: pointer;
  width: 100px;
  line-height: 30px;
  height: 30px;
  border-radius: 3px;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 12px;

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
    font-size: 12px;
    margin-left: 5px;
    line-height: 35px;
  }
}
</style>

<template>
  <div class="filter-container-pointitem" v-show="isHaveFilter">
    <!-- <div class="brand-wrap clearfix">
      <div class="brand-title">{{ $t('comps.goods-filter.039030-0') }}:</div>
      <div class="brand-list">
        <a class="brand-list__link" :class="{'active': isActive(item)}" v-for="(item, index) in data" :key="index">
          <span class="name" @click="handleClick(item.attribute_id)">{{item.attribute_name}}</span>
          <i class="ec-icon ec-icon-close" @click="handleDeleteBrand()" />
        </a>
      </div>
    </div> -->
    <div class="filter-content">
      <div class="filter-item" v-show="isHaveBrand">
        <div class="filter-item_title">{{ $t('comps.goods-filter.039030-0') }}</div>
        <div class="filter-item_content">
          <div class="scroll-brand">
            <BrandBlock
              v-for="(item, index) in data"
              :item="item"
              :key="index"
              :name="item.attribute_name"
              :imgurl="item.image_url"
              @on-click="handleClickBrand"
              @on-delete="handleDeleteBrand"
              :urlBrandId="urlBrandId"
            />
          </div>
          <!-- <BrandBlock
            v-for="(item, index) in data"
            :item="item"
            :key="index"
            :name="item.attribute_name"handleDelete
            :imgurl="item.image_url"
            @on-click="handleClickBrand"
            @on-delete="handleDeleteBrand"
            :urlBrandId="urlBrandId"
          /> -->
        </div>
      </div>
      <div
        class="filter-item"
        v-show="isHaveCategory"
        :class="{
          isNotHaveBrand: !isHaveBrand,
          isOnlyHaveCategory: isOnlyHaveCategory,
          isNotHavePoint: isNotHavePoint
        }"
      >
        <div class="filter-item_title">{{ $t('comps.goods-filter.039030-1') }}</div>
        <div class="filter-item_content">
          <div class="scroll-brand-category">
            <div
              v-for="(item, index) in categoryList"
              :key="index"
              class="categoryItem"
              :title="item.category_name"
              :class="{ active: isCategoryActive(item) }"
            >
              <span class="name" @click="handleClickCategory(item)">{{
                filterSeven(item.category_name)
              }}</span>
              <!-- <i class="ec-icon ec-icon-close" @click="handleDeleteCategory" /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="filter-item" v-show="isHavePoint">
        <div class="filter-item_title">{{ $t('comps.goods-filter.039030-2') }}</div>
        <div class="filter-item_content" style="justify-content: space-between">
          <ScoreBlock
            :data="scoreInterval"
            @on-click="handleClickPoint"
            :currentPointIndex="currentPointIndex"
            @on-delete-point="handleDeletePoint"
          />
          <SearchPointInput @change-point="changePoint" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import BrandBlock from "./brand_block";
import BrandBlock from './brand_block2'
import ScoreBlock from './score_block'
import SearchPointInput from './search-point-input'
export default {
  props: {
    data: Array,
    keyword: String,
    //外部的brandID 优先级低于选择的currAttributeId
    urlBrandId: [Number, String],
    scoreInterval: Array,
    config: Object,
    categoryList: Array,
    currentCategoryId: [Number, String],
    currentPointIndex: [Number, String]
  },
  components: {
    BrandBlock,
    ScoreBlock,
    SearchPointInput
  },
  data() {
    return {}
  },
  computed: {
    isHaveFilter() {
      const { brand_openstatus, cat_openstatus, point_openstatus } = this.config
      return brand_openstatus || cat_openstatus || point_openstatus
    },
    isHaveBrand() {
      return this.config.brand_openstatus
    },
    isHaveCategory() {
      return this.config.cat_openstatus
    },
    isHavePoint() {
      return this.config.point_openstatus
    },

    isNotHavePoint() {
      const { brand_openstatus, cat_openstatus, point_openstatus } = this.config
      return brand_openstatus && cat_openstatus && !point_openstatus
    },
    isOnlyHaveCategory() {
      const { brand_openstatus, cat_openstatus, point_openstatus } = this.config
      return cat_openstatus && !point_openstatus & !brand_openstatus
    }
  },
  methods: {
    filterSeven(name) {
      let newVal
      if (name && name.length > 7) {
        newVal = name.substring(0, 6) + '...'
      } else {
        newVal = name
      }
      return newVal
    },
    handleClickBrand(attribute_id) {
      this.$emit('on-click', attribute_id)
    },
    handleClickPoint(data) {
      this.$emit('on-click-point', data)
    },
    handleDeleteBrand(item) {
      this.$emit('on-delete-brand', item.attribute_id)
    },
    isCategoryActive(item) {
      return this.currentCategoryId && item.category_id == this.currentCategoryId
    },
    handleClickCategory(item) {
      if (this.isCategoryActive(item)) {
        this.handleDeleteCategory()
      } else {
        this.$emit('on-click-cat', item.category_id)
      }
    },
    handleDeleteCategory(item) {
      this.$emit('on-delete-cat')
    },
    handleDeletePoint() {
      this.$emit('on-delete-point')
    },
    changePoint(start, end) {
      this.$emit('on-submit-point', start, end)
    }
  }
}
</script>
