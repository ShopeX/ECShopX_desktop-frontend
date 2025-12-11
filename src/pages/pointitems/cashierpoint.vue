/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./detail.scss"></style>

<style scoped lang="scss">
.point_wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    background: url('~assets/imgs/pay-success.png') no-repeat center center;
    width: 300px;
    height: 300px;
  }
  .text {
    font-size: 30px;
    color: green;
  }
}
</style>

<template>
  <div class="page-item-detail-pointitem">
    <div class="container">
      <div class="point_wrapper">
        <div class="img"></div>

        <div class="text">{{ $t('pointitems.cashierpoint.173269-0') }}</div>
      </div>
      <GuessLike :guessLikeList="guessLikeList" />
    </div>

    <!-- <Recommend /> -->
  </div>
</template>

<script>
import { log, gstore, resolveLazyLoadImg, hasValue } from '@/utils'
import { analytics } from '@/plugins/analytics'
import GoodsInfo from './comps/goods-info'
import Recommend from './comps/recommend'
import GoodsEvaluation from './comps/goods-evaluation'
import GuessLike from './comps/guess-like'
import { Film, Heading, Slider, Writing } from '@/components'
const VIEWED_ITEMS_KEY = 'viewed_items'

export default {
  components: {
    GoodsInfo,
    Recommend,
    GoodsEvaluation,
    Film,
    Heading,
    Slider,
    Writing,
    GuessLike
  },
  data() {
    return {
      curImgIdx: 0,
      desc: null,
      recList: null,
      viewedItems: null,
      curRecIdx: 0,
      keyword: '',
      showprice: true,
      info: null,
      tabList: [this.$t('pointitems.cashierpoint.173269-1'), this.$t('pointitems.cashierpoint.173269-2')],
      curTabIdx: 0,
      evaluationList: [],
      evaluationTotal: 0,
      page: 1,
      pageSize: 20,
      loading: false,
      itemId: null,
      guessLikeList: []
    }
  },
  filters: {
    textSubstringFilter(val) {
      if (val.length > 20) {
        return val.substring(0, 20) + '...'
      }
      return val
    }
  },
  computed: {
    breadcrumb() {
      if (!this.info) return []
      const { item_category_main } = this.info
      let ret = [
        {
          name: this.$t('pointitems.cashierpoint.173269-3'),
          url: `/`
        }
      ]
      item_category_main.map((item) => {
        ret.push({
          name: item.category_name,
          url: `/pointitems?cat_id=${item.category_id}`
        })
        if (item.children) {
          item.children.map((secbItem) => {
            ret.push({
              name: secbItem.category_name,
              url: `/pointitems?cat_id=${secbItem.category_id}`
            })
            if (secbItem.children) {
              secbItem.children.map((threeItem) => {
                ret.push({
                  name: threeItem.category_name,
                  url: `/pointitems?cat_id=${threeItem.category_id}`
                })
              })
            }
          })
        }
      })
      return ret
    },
    noMore() {
      return (
        (this.evaluationList.length == 0 && this.evaluationTotal == 0) ||
        (this.evaluationList.length > 0 && this.evaluationList.length == this.evaluationTotal)
      )
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.itemId = id
    const { keyword, id: did, item_id } = this.$route.query
    this.keyword = keyword
    this.$api.item
      .getGuessLikeGoods({
        item_id: id || item_id
      })
      .then((info) => {
        const { list, total_count, brand_list } = info
        list.map((item) => {
          item.imgUrl = ''
          if (item.pics.length > 0) {
            item.imgUrl = item.pics[0]
          }
        })
        this.guessLikeList = [...this.guessLikeList, ...list]
        this.total = parseInt(total_count)
        if (brand_list && brand_list.total_count > 0) {
          brand_list.list.map((item) => {
            item.selected = false
          })
          this.brand_list = brand_list.list
        }
      })

    this.loading = true
  },

  methods: {}
}
</script>
