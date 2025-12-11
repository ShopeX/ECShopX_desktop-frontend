/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-item">
    <!-- <SpBreadCrumb :value="breadcrumb" v-if="breadcrumb.length > 1" /> -->
    <div class="container">
      <div class="search-con">
        <GoodsFilter
          :data="brand_list"
          :theme="themeColor"
          :value="brandId"
          @onChange="onChangeFilterBrand"
        />

        <GoodSort
          :data="sorts"
          :value="sort"
          :total="total"
          :startPrice="start_price"
          :endPrice="end_price"
          :theme="themeColor"
          @change="changeSort"
          @change-price="changeSortPrice"
        />
      </div>

      <div class="goods-list clearfix" v-infinite-scroll="nextPage" infinite-scroll-distance="10">
        <div class="goods-item-wrap" v-for="(item, index) in list" :key="`goods-item__${index}`">
          <SpGoodsCard :info="item" :theme="themeColor" />
        </div>
      </div>

      <div class="goods-list-empty" v-if="list.length == 0">
        <div class="empty-con">
          <img class="empty-img" src="~/assets/imgs/empty.png" alt="" />
          <div class="empty-info">
            <div class="txt">{{ $t('items.index.172234-0') }}</div>
          </div>
        </div>
      </div>

      <SpScrollLoading
        :theme="themeColor"
        :loading="loading"
        :noMore="list.length == total && total > 0"
      />

      <!-- <FastCart
        :value="showModal"
        :info="curItem"
        @on-add-cart="handleModalAddCart"
        @on-close="handleClose"
      /> -->
    </div>
  </div>
</template>

<script>
import GoodsFilter from './comps/goods-filter'
import GoodCard from './comps/goods-card'
import GoodSort from './comps/goods-sort'
import FastCart from './comps/fast-cart'
import qs from 'qs'
import { mixin } from '@/mixins'
import S from '@/spx'

const pageIndex = 1
const pageSize = 20

export default {
  mixins: [mixin],
  async asyncData({ app, route }) {
    const {
      keywords,
      cat_id,
      main_category,
      brand_id,
      goodsSort,
      start_price,
      end_price
    } = route.query
    const params = {
      page: pageIndex,
      pageSize: pageSize,
      item_type: 'normal',
      keywords,
      category_id: cat_id,
      main_category, 
      brand_id,
      goodsSort,
      start_price,
      end_price,
      is_tdk: 1,
      // 普通商品；过滤跨境商品用
      type: 0
    }
    const { list, total_count, brand_list, tdk_data } = await app.$api.item.list(params)
    list.forEach((item) => {
      item['imgUrl'] = item.pics.length > 0 ? item.pics[0] : ''
    })

    return {
      keywords,
      brandId: brand_id,
      sort: goodsSort || 'all',
      start_price,
      end_price,
      tdk_data,
      list,
      total: total_count,
      brand_list: typeof brand_list != 'undefined' ? brand_list.list : [],
      pageIndex,
      pageSize
    }
  },
  head() {
    return {
      // title: this.tdk_data ? this.tdk_data.title : '',
      title: this.$t('items.index.172234-1'),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.tdk_data ? this.tdk_data.mate_keywords : ''
        },
        {
          hid: 'description',
          name: 'description',
          content: this.tdk_data ? this.tdk_data.mate_description : ''
        }
      ]
    }
  },
  components: {
    GoodsFilter,
    GoodCard,
    GoodSort,
    FastCart
  },
  beforeRouteUpdate(to, from, next) {
    this.pageIndex = 1
    this.fetch(to.query)
    next()
  },
  data() {
    return {
      keywords: '',
      list: [],
      breadcrumb: [],
      sort: 'all',
      sorts: [
        { label: this.$t('items.index.172234-2'), value: 'all' },
        { label: this.$t('items.index.172234-3'), value: '1' },
        { label: this.$t('items.index.172234-4'), value: '4' },
        { label: this.$t('items.index.172234-5'), value: '2' },
        { label: this.$t('items.index.172234-6'), value: '3' }
      ],
      start_price: null,
      end_price: null,
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      brand_list: [],
      brandId: null,
      showModal: false,
      curItem: {},
      loading: false,
      tdk_data: null
    }
  },
  computed: {
    // noMore() {
    //   return (
    //     (this.list.length == 0 && this.total == 0) ||
    //     (this.list.length > 0 && this.list.length == this.total)
    //   )
    // },
    // disabled() {
    //   return this.loading || this.noMore
    // }
  },
  // created() {
  //   const { keywords, brand_id, goodsSort, start_price, end_price } = this.$route.query
  //   this.brandId = brand_id
  //   this.sort = goodsSort || 'all'
  //   this.start_price = start_price
  //   this.end_price = end_price
  //   this.keywords = keywords
  //   this.fetch(this.$route.query)
  // },
  methods: {
    onChangeFilterBrand(val) {
      this.brandId = val
      this.replaceUrl({
        brand_id: val
      })
    },
    replaceUrl(params) {
      let query = this.$route.query
      query = {
        ...query,
        ...params
      }
      const _query = JSON.parse(
        JSON.stringify(query, (key, value) => {
          if (!value) {
            return undefined
          }
          return value
        })
      )
      this.$router.replace(`/items?${qs.stringify(_query)}`)
    },
    nextPage() {
      this.pageIndex++
      if (this.pageIndex <= Math.ceil(this.total / this.pageSize)) {
        this.fetch(this.$route.query)
      }
    },
    async fetch(query) {
      this.loading = true
      // this.$loading({ background: "transparent" });
      const { keywords, cat_id, main_category, brand_id, goodsSort, start_price, end_price } = query
      const params = {
        page: this.pageIndex,
        pageSize: this.pageSize,
        item_type: 'normal',
        keywords,
        category_id: cat_id,
        main_category,
        brand_id,
        goodsSort,
        start_price,
        end_price,
        is_tdk: 1,
        // 普通商品；过滤跨境商品用
        type: 0
      }

      try {
        // const { list, total_count, brand_list } = await this.getListAndSetSeo(params)
        const { list, total_count, brand_list } = await this.$api.item.list(params)
        const newList = list.map((item) => {
          return {
            ...item,
            imgUrl: item.pics.length > 0 ? item.pics[0] : ''
          }
        })
        if (this.pageIndex == 1) {
          this.list = newList
        } else {
          this.list = [...this.list, ...newList]
        }
        this.total = total_count
        if (brand_list && brand_list.total_count > 0) {
          this.brand_list = brand_list.list
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    // 排序
    changeSort(val) {
      this.sort = val
      this.replaceUrl({
        goodsSort: val == 'all' ? '' : val
      })
    },
    // 价格区间排序
    changeSortPrice(start_price, end_price) {
      this.start_price = start_price
      this.end_price = end_price
      this.replaceUrl({
        start_price,
        end_price
      })
    }
  }
}
</script>