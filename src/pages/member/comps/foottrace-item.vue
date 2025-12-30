/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$img-ratio: 0.723;
.collector-item {
  position: relative;
  float: left;
  width: 22.8%;
  margin: 10px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 0 10px 10px;
  cursor: pointer;
  .img-wrap {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto;
    border: 0;
    background: #efefef;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    color: #666;
    @include multi-ellipsis(1);
    margin: 5px 0 0 0;
  }
  .sp-price {
    span {
      color: $color-brand-primary;
    }
  }
  @include respond(lg) {
    width: 240px;
  }
}
</style>
<template>
  <div class="collector-item" @click="$router.push({ path: `/items/${info.item_id}` })">
    <div class="img-wrap">
      <img :src="info.pics[0]" v-if="info.pics" />
    </div>
    <div class="name">{{ info.item_name }}</div>
    <SpPrice unit="cent" :value="info.price"></SpPrice>
  </div>
</template>

<script>
import { pickBy } from '@/utils'

export default {
  props: {
    info: Object
  },

  data() {
    return {}
  },

  methods: {}
}
</script>
