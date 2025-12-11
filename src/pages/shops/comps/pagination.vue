/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.mini-pagination {
  display: inline-block;
  line-height: 14px;
  &__text{
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 1px;
    color: $color-secondary-text;
  }
  &__icon{
    cursor: pointer;
  }
}
</style>

<template>
<div class="mini-pagination">
  <span class="mini-pagination__icon" @click="prev" v-if="currentPageIndex > 1"> &lt; </span>
  <span class="mini-pagination__text">{{currentPageIndex}}</span>
  <span>/</span>
  <span class="mini-pagination__text">{{pages}}</span>
  <span class="mini-pagination__icon" @click="next" v-if="currentPageIndex < pages"> &gt; </span>
</div>
</template>

<script>
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
