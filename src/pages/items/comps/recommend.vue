/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
  .comps-recommend {
    border: 1px solid #ddd;
    .recommend-header {
      background-color: #f5f5f5;
      color: #646464;
      font-size: 18px;
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
    }
    .recommend-list {
      padding: 10px;
      .recommend-item {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        &__ft {
          @include clearfix();
          .recommend-item__title {
            width: 190px;
            float: left;
            color: #888;
            @include multi-ellipsis(2);
          }
          .sp-price {
            float: right;
          }
        }
      }
    }
    

  }
</style>

<template>
  <div class="comps-recommend">
    <div class="recommend-header">
      <span class="recommend-header__title">{{ $t('comps.recommend.573213-0') }}</span>
    </div>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in recommendList" :key="`recommend-item__${index}`">
        <nuxt-link :to="`/items/${item.item_id}`">
          <div class="recommend-item__img">
            <img :src="item.pics[0]" v-if="item.pics && item.pics.length>0" width="100%" />
          </div>
        </nuxt-link>
        <div class="recommend-item__ft">
          <div class="recommend-item__title">{{item.item_name}}</div>
          <SpPrice :value="item.price / 100"></SpPrice>
        </div>
      </div>
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
      recommendList: []
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    async getRecommend () {
      let params = {
        page: 1,
        pageSize: 5
      }
      // TODO:暂时为当季主推  接口完成之后改为 相似单品
      let { list } = await this.$api.item.recommend(params)
      this.recommendList = list
    },
    clickeTo(item){
      this.$router.push(`/items/${item.itemId}`)
    }
  }
}
</script>
