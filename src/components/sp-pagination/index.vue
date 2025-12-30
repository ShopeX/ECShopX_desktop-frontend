/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-pagination {
  display: inline-block;
  .mb-iconfont-left,
  .mb-iconfont-right {
    font-size: 26px;
  }
  &__item {
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: #333;
    border: 1px solid #fff;
    border-color: transparent;
    text-align: center;
    border-radius:2px;
    &.active {
      border: 1px solid $color-brand-primary;
      // background: $color-brand-primary;
      color:$color-brand-primary;
    }
  }
  li {
    float: left;
    margin: 0 5px;
    line-height: 28px;
    cursor: pointer;
    .ec-icon-back, .ec-icon-right {
      font-size: 18px;
    }
    &.disable {
      i {
        color: #cdcdcd
      }
    }
  }
}
</style>

<template>
<ul class="sp-pagination clearfix">
  <li :class="{ 'disable' : currentPageIndex == 1}" @click="prev" v-if="total > 0"><i class="ec-icon ec-icon-back"></i></li>
  <li class="sp-pagination__item" :class="{ 'active': n + diffPage === currentPageIndex }"
  v-for="n in pages" :key="n" @click="handleClickItem(n + diffPage)">{{n + diffPage}}</li>
  <li :class="{ 'disable' : currentPageIndex == currentPages}" @click="next" v-if="total > 0"><i class="ec-icon ec-icon-right"></i></li>
</ul>
</template>

<script>
const prefixCls = 'sp-pagination'
export default {
  name: 'SpPagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    maxPage: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      currentPageIndex: this.current,
      currentPageSize: this.pageSize,
      currentPages: Math.ceil(this.total / this.pageSize),
      diffPage: 0,
      pages: Math.ceil(this.total / this.pageSize) > this.maxPage ? this.maxPage : Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    total (val) {
      this.currentPages = Math.ceil(val / this.pageSize)
      this.pages = this.currentPages > this.maxPage ? this.maxPage : this.currentPages
      this.diffPage = this.currentPageIndex - this.pages > 0 ? this.currentPageIndex - this.pages : 0
    },
    current (val) {
      this.currentPageIndex = val
      this.diffPage = this.currentPageIndex - this.pages > 0 ? this.currentPageIndex - this.pages : 0
    }
  },
  methods: {
    prev () {
      if (this.currentPageIndex > 1) {
        this.currentPageIndex--
        this.handleDiffPage()
      }
    },
    next () {
      if (this.currentPageIndex < this.currentPages) {
        this.currentPageIndex++
        this.handleDiffPage()
      }
    },
    handleDiffPage () {
      this.$emit('on-change', this.currentPageIndex)
    },
    handleClickItem (n) {
      this.currentPageIndex = n
      this.$emit('on-change', this.currentPageIndex)
    }
  }
}
</script>
