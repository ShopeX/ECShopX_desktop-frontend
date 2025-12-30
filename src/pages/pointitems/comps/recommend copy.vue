/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-recommend {
  padding: 70px 0 100px 0;
  .title {
    font-size: 22px;
    letter-spacing: 2px;
    color: #020304;
    margin-bottom: 20px;
  }
  &__warp {
    width: 1190px;
    margin: 0 auto;
    // overflow: hidden;
  }

  @include respond(sm) {
    &__warp {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="sp-recommend">
    <div class="sp-recommend__warp">
      <div class="title">{{ $t('comps.recommend copy.192989-0') }}</div>
      <GoodsRecommend :data="recList" :slidesPerView="5" :spaceBetween="22"></GoodsRecommend>
    </div>
  </div>
</template>

<script>
import GoodsRecommend from './goods-recommend'
export default {
  name: 'SpRecommend',
  props: {},
  components: { GoodsRecommend },
  data () {
    return {
      recList: []
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    async getRecommend () {
      // TODO:暂时为当季主推  接口完成之后改为 相似单品
      const { list } = await this.$api.item.recommend()
      this.recList = list
    }
  }
}
</script>
