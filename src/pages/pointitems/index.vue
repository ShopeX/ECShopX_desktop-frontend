/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
@import './index.scss';
.wrapper_point_good_card {
  display: flex;
  justify-content: flex-start;
}
</style>

<template>
  <div class="page-item container pointitem">
    <Slider :value="config.banners" v-show="config.banners && config.banners.length" />

    <SpBreadCrumb :value="breadcrumb" v-if="breadcrumb.length > 1" />

    <!-- <div class="search-shop clearfix">
      <NuxtLink to="/store" class="shop-img">
        <img src="http://bbc.market.demo.shopex.cn/images/33/48/60/222f805830e43bd134832f2398e1e715bf2dacda.png" />
      </NuxtLink>
      <div class="shop-info">
        <div class="shop-type">{{ $t('pointitems.index.871104-0') }}</div>
        <div>TEST SHOP</div>
      </div>
      <NuxtLink class="shop-link" to="/store">{{ $t('pointitems.index.871104-1') }} ></NuxtLink>
    </div> -->

    <GoodsFilter
      :data="brand_list"
      :keyword="keywords"
      :urlBrandId="urlBrandId"
      :scoreInterval="config.score_interval"
      :config="config"
      :categoryList="category"
      :currentCategoryId="currentCategoryId"
      :currentPointIndex="currentPointIndex"
      @on-click="handleClickBrand"
      @on-click-cat="handleClickCategory"
      @on-delete-cat="handleDeleteCategory"
      @on-delete-brand="handleDeleteBrand"
      @on-click-point="handleClickPoint"
      @on-delete-point="handleDeletePoint"
      @on-submit-point="handleSubmitPoint"
    />

    <!-- <div class="tab-wrap">
      <div class="tab-list clearfix">
        <div class="tab-item active">商品</div>
      </div>
    </div> -->

    <GoodSort
      :data="sorts"
      :value="sort"
      :total="total"
      @change="changeSort"
      @change-price="changeSortPrice"
      @search-keyword="search"
    >
    </GoodSort>

    <div
      class="goods-list clearfix pointitems"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="10"
    >
      <!-- <div v-for="(witem, windex) in chunkList"  :key='windex' class='wrapper_point_good_card' :class="{flexStart:witem.length<}"> -->
      <GoodCard
        v-for="(item, index) in list"
        :key="index"
        :value="item"
        @on-add-cart="addCart"
        @on-select="handleClickGoods"
      />
    </div>
    <!--       
    </div> -->

    <div class="loading-data" v-if="loading">{{ $t('pointitems.index.871104-2') }}</div>
    <div class="no-data" v-if="!loading && noMore">
      <span v-if="list.length == 0">{{ $t('pointitems.index.871104-3') }}</span>
      <span v-if="list.length > pageSize">{{ $t('pointitems.index.871104-4') }}</span>
    </div>

    <!-- <div class="pagination-wrap" v-if="total > 0">
      <SpPagination
        :total="total"
        :pageSize="pageSize"
        :current="page"
        @on-change="goPage"
      />
    </div> -->

    <PointCart
      :value="showModal"
      :info="curItem"
      @on-add-cart="handleModalAddCart"
      @on-close="handleClose"
    />
  </div>
</template>

<script>
// import { analytics } from "@/plugins/analytics";
// import { Analytics } from "@/service";
import GoodsFilter from './comps/goods-filter'
import GoodCard from './comps/goods-card'
import GoodSort from './comps/goods-sort'
import FastCart from './comps/fast-cart'
import PointCart from './comps/point-cart'
import Slider from './comps/slider'
import { fetchHead } from '@/mixins'
import S from '@/spx'

export default {
  components: {
    GoodsFilter,
    GoodCard,
    GoodSort,
    FastCart,
    Slider,
    PointCart
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  async asyncData({ app, route }) {},
  data() {
    return {
      keywords: '',
      list: [],
      breadcrumb: [],
      sort: 'all',
      sorts: [
        { label: this.$t('pointitems.index.871104-5'), value: 'all' },
        { label: this.$t('pointitems.index.871104-6'), value: '1' },
        { label: this.$t('pointitems.index.871104-7'), value: '4' },
        { label: this.$t('pointitems.index.871104-8'), value: '2' },
        { label: this.$t('pointitems.index.871104-9'), value: '3' }
      ],
      category: [],
      start_price: null,
      end_price: null,
      start_point: null,
      end_point: null,
      total: 0,
      pageSize: 20,
      page: 1,
      brand_list: [],
      showModal: false,
      curItem: {},
      loading: false,
      urlBrandId: undefined,
      config: {
        banners: [],
        score_interval: []
      },
      currentId: undefined,
      //积分区间
      flag: false,
      currentCategoryId: undefined,
      currentPointIndex: undefined
    }
  },
  created() {
    this.pageType = 'pointitem'
  },
  computed: {
    noMore() {
      return (
        (this.list.length == 0 && this.total == 0) ||
        (this.list.length > 0 && this.list.length == this.total)
      )
    },
    disabled() {
      return this.loading || this.noMore
    },
    chunkList() {
      console.log(this.chunk(this.list, 5))
      console.log('---chunkList---')
      return this.chunk(this.list, 5)
    }
  },
  mounted() {
    const { keywords, brand_id, category_id, point_index } = this.$route.query
    this.breadcrumb = [this.$t('pointitems.index.871104-10')]
    if (keywords) {
      this.keywords = keywords
      this.breadcrumb.push(this.keywords)
    }
    //如果地址栏存在brand_id
    if (brand_id) {
      this.urlBrandId = Number(brand_id)
    } else {
      this.urlBrandId = undefined
    }
    if (category_id) {
      this.currentCategoryId = Number(category_id)
    } else {
      this.currentCategoryId = undefined
    }
    if (point_index || point_index == 0) {
      this.currentPointIndex = Number(point_index)
    }
    this.fetch()
    this.getShopConfig()
    this.fetchCategory()
  },
  mixins: [fetchHead],
  methods: {
    async fetchCategory() {
      const data = await this.$api.pointitem.getCategory({
        have_items: true
      })
      this.category = this.getLeafChild(data)
      this.category = this.category
    },
    async getShopConfig() {
      const {
        pc_banner,
        screen: { point_section, brand_openstatus, cat_openstatus, point_openstatus },
        entrance
      } = await this.$api.pointitem.getTemplateConfig()
      this.config = {
        ...this.config,
        banners: pc_banner,
        score_interval: point_section,
        brand_openstatus: brand_openstatus,
        cat_openstatus: cat_openstatus,
        point_openstatus: point_openstatus
      }
      console.log(this.config)
      sessionStorage.setItem('SCORE_INTERVAL', JSON.stringify(point_section))
    },
    handleSubmitPoint(start, end) {
      this.start_point = start
      this.end_point = end
      if (Number(this.start_point) || Number(this.end_point)) {
        this.handleDeletePoint()
        return
      }
      this.updateList()
    },
    getLeafChild(list) {
      //获取分类的叶子节点
      function queryList(json, arr) {
        for (var i = 0; i < json.length; i++) {
          var sonList = json[i].children || []
          if (sonList.length == 0) {
            arr.push(json[i])
          } else {
            queryList(sonList, arr)
          }
        }
        return arr
      }
      return queryList(list, [])
    },
    init(to) {
      let { query } = to
      this.keywords = query.tag
      this.breadcrumb = [this.$t('pointitems.index.871104-10')]
      if (query.tag) {
        this.breadcrumb.push(this.keywords)
      }
      this.updateList()
    },
    nextPage() {
      this.page += 1
      this.fetch()
    },

    handleDeleteCategory() {
      this.currentCategoryId = undefined
      const { fullPath } = this.$route
      let reg = /category_id/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/[\&]*category_id=[0-9]+/, ``)
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    handleDeletePoint() {
      this.currentPointIndex = undefined
      const { fullPath } = this.$route
      let reg = /point_index/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/[\&]*point_index=[0-9]+/, ``)
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    handleDeleteBrand() {
      this.urlBrandId = undefined
      const { fullPath } = this.$route
      let reg = /brand_id/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/[\&]*brand_id=[0-9]+/, ``)
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    async fetch() {
      this.loading = true
      // this.$loading({ background: "transparent" });
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        item_type: 'normal'
      }
      if (this.keywords) {
        params.keywords = this.keywords
      } else {
        delete params.keywords
      }
      if (this.currentCategoryId) {
        params.category_id = this.currentCategoryId
      }
      if (this.sort != 'all') {
        params.goodsSort = this.sort
      }
      if (this.start_price) {
        params.start_price = this.start_price
      }
      if (this.end_price) {
        params.end_price = this.end_price
      }
      if (this.currentPointIndex || this.currentPointIndex == 0) {
        console.log('---this.currentPointIndex---', this.currentPointIndex)
        params.start_price = (this.config.score_interval[this.currentPointIndex] ||
          JSON.parse(sessionStorage.getItem('SCORE_INTERVAL'))[this.currentPointIndex])[0]
        params.end_price = (this.config.score_interval[this.currentPointIndex] ||
          JSON.parse(sessionStorage.getItem('SCORE_INTERVAL'))[this.currentPointIndex])[1]
      }

      if (!this.currentPointIndex && this.currentPointIndex !== 0) {
        if (this.start_point) {
          params.start_price = this.start_point
        }
        if (this.end_point) {
          params.end_price = this.end_point
        }
      }

      if (this.urlBrandId) {
        params.brand_id = this.urlBrandId
      }

      try {
        const { list, total_count, brand_list } = await this.getListAndSetSeo(params)
        // const { list, total_count, brand_list } = await ({
        //   ...params,
        //   is_tdk: 1
        // })
        list.map((item) => {
          item.imgUrl = ''
          if (item.pics.length > 0) {
            item.imgUrl = item.pics[0]
          }
        })
        this.list = [...this.list, ...list]
        this.total = parseInt(total_count)
        if (brand_list && brand_list.total_count > 0) {
          brand_list.list.map((item) => {
            item.selected = false
          })
          this.brand_list = brand_list.list
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
        // this.$loading().close();
      }
    },
    handleClickBrand(val) {
      this.urlBrandId = val
      const { fullPath } = this.$route
      let reg = /brand_id/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/brand_id=[0-9]+/, `brand_id=${val}`)
      } else if (replaceUrl.indexOf('?') == -1) {
        //如果路径没有参数
        replaceUrl += `?brand_id=${val}`
      } else {
        replaceUrl += `&brand_id=${val}`
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    handleClickPoint(val) {
      this.currentPointIndex = val.index
      const { fullPath } = this.$route
      let reg = /point_index/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/point_index=[0-9]+/, `point_index=${val.index}`)
      } else if (replaceUrl.indexOf('?') == -1) {
        //如果路径没有参数
        replaceUrl += `?point_index=${val.index}`
      } else {
        replaceUrl += `&point_index=${val.index}`
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    handleClickCategory(val) {
      this.currentCategoryId = val
      const { fullPath } = this.$route
      let reg = /category_id/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/category_id=[0-9]+/, `category_id=${val}`)
      } else if (replaceUrl.indexOf('?') == -1) {
        //如果路径没有参数
        replaceUrl += `?category_id=${val}`
      } else {
        replaceUrl += `&category_id=${val}`
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    updateList() {
      this.page = 1
      this.list = []
      this.fetch()
    },
    changeSort(val) {
      this.sort = val
      this.updateList()
    },
    changeSortPrice(start_price, end_price) {
      this.start_price = start_price
      this.end_price = end_price
      this.updateList()
    },
    addCart(item) {
      const { item_id, distributor_id, nospec } = item
      const { fullPath } = this.$route
      const token = S.getAuthToken()
      if (!token) {
        this.$router.push(`/auth/login?redirectUrl=${encodeURIComponent(fullPath)}`)
        return
      }
      this.currentId = item_id
      this.getItemDetail(item_id, distributor_id)

      // if (!nospec) {
      //   this.getItemDetail(item_id, distributor_id);
      // } else {
      //   const params = {
      //     item_id,
      //     num: 1,
      //     shop_type: "pointsmall",
      //     cart_type: "fastbuy",
      //     distributor_id: distributor_id || 0,
      //   };
      //   this.handleAddCart(params);
      // }
    },
    handleModalAddCart(num, sku) {
      const params = {
        item_id: sku ? sku.item_id : this.currentId,
        num,
        cart_type: 'fastbuy',
        shop_type: 'pointsmall',
        distributor_id: sku ? sku.distributor_id : 0
      }
      this.handleAddCart(params, true)
    },
    getItemDetail(item_id, distributor_id) {
      this.$api.item.pointsmallDetail(item_id, { distributor_id }).then((info) => {
        console.log(info)
        this.curItem = info
        this.showModal = true
      })
    },
    handleAddCart(params, status) {
      console.log(params)
      this.$api.cart.add(params, params.num).then((res) => {
        this.$router.push('/pointitems/checkout?mode=fastbuy&order_type=normal_pointsmall')
      })

      this.showModal = false
    },
    handleClickGoods(item_id, distributor_id) {
      this.$router.push(`/pointitems/` + item_id + '?id=' + distributor_id)
    },
    goPage(val) {
      this.page = val
      this.fetch()
    },
    search(keywords) {
      this.keywords = keywords
      this.updateList()
    },
    handleQuantityChange(val, type) {
      this.curItem.quantity = val
    },
    handleClickNumInput(val, type) {
      if (val) {
        this.curItem.quantity = val
      }
    },
    handleClose() {
      this.showModal = false
    },
    specBtnClick(attr_id, index) {
      this.$set(this.selectedAttr, index, attr_id)
    },
    chunk(list, size) {
      return list.reduce((arr, item, idx) => {
        return idx % size === 0
          ? [...arr, [item]]
          : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
      }, [])
    }
    // startObserver(){
    //   const resizeObserver = new ResizeObserver(entries => {
    //     for (let entry of entries) {

    //     }
    //   });
    //   resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
    // }
  }
}
</script>
