/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="price-point-wrap-keyword">
    <input type="text" placeholder="" v-model="keywords" autocomplete="off" class="search-input" />
    <div class="search-click" @click="search">{{ $t('comps.search-point-keyword.802752-0') }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: null
    }
  },
  methods: {
    search() {
      this.$emit('search-point', this.keywords)
    }
  }
}
</script>

    <style lang="scss" scoped>
.price-point-wrap-keyword {
  display: inline-block;
  .search-label {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .search-input {
    height: 34px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ea2329;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: #fff;
    height: 100%;
    color: #333;
    padding: 0;
    width: 160px;
  }
  .search-click {
    display: inline-block;
    vertical-align: middle;
    /* margin-left: -5px; */
    background: #ea2329;
    color: #fff;
    line-height: 34px;
    text-align: center;
    width: 60px;
    cursor: pointer;
    border-radius: 3px;
  }
}
</style>
