/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
</style>

<template>
<div class="">
  <div class="wdget-title">
    <p class="inner">{{params.texttag}}</p>
  </div>
  <div class="wdget-sub-title">
    <p class="inner">RECOMMEND PRODUCTS</p>
  </div>
  <div class="page-index__container">
    <div class="wdget-recommend">
      <SpGoodsRecommend :data="params.item" :slidesPerView="4" :spaceBetween="15"></SpGoodsRecommend>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    params: Object
  }
}
</script>
