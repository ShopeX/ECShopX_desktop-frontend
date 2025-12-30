/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
@import '../index.scss';
.search-wrap {
  margin: 10px;
  .search-label {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .search-input {
    height: 34px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid $color-brand-primary;
  }
  .search-click {
    display: inline-block;
    vertical-align: middle;
    margin-left: -5px;
    background: $color-brand-primary;
    color: #fff;
    line-height: 34px;
    text-align: center;
    width: 80px;
    cursor: pointer;
  }
}
.goods_like {
  .goods-card-pointitem {
    &:first-child {
      margin-left: 0 !important;
    }
    &:nth-child(6) {
      margin-left: 0 !important;
    }
    margin-left: 20px;
  }
}
</style>

<template>
  <div class="page-item container">
    <div
      class="goods-list clearfix goods_like"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="10"
    >
      <GoodCard
        v-for="(item, index) in list"
        :key="index"
        :value="item"
        @on-add-cart="addCart"
        @on-select="handleClickGoods"
      />
    </div>

    <div class="loading-data" v-if="loading">{{ $t('comps.goods_like.366072-0') }}</div>
    <div class="no-data" v-if="!loading && noMore">
      <span v-if="list.length == 0">{{ $t('comps.goods_like.366072-1') }}</span>
      <span v-if="list.length > pageSize">{{ $t('comps.goods_like.366072-2') }}</span>
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
import GoodCard from './goods-card'
import PointCart from './point-cart'
import S from '@/spx'

export default {
  components: {
    GoodCard,
    PointCart
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  async asyncData({ app, route }) {},
  props: ['list'],
  data() {
    return {
      keywords: '',
      breadcrumb: [],
      sort: 'all',
      sorts: [
        { label: this.$t('comps.goods_like.366072-3'), value: 'all' },
        { label: this.$t('comps.goods_like.366072-4'), value: '1' },
        { label: this.$t('comps.goods_like.366072-5'), value: '4' },
        { label: this.$t('comps.goods_like.366072-6'), value: '2' },
        { label: this.$t('comps.goods_like.366072-7'), value: '3' }
      ],
      category: [],
      start_price: null,
      end_price: null,
      total: 0,
      pageSize: 20,
      page: 1,
      brand_list: [],
      currAttributeId: null,
      showModal: false,
      curItem: {},
      loading: false,
      urlBrandId: undefined,
      config: {
        banners: [],
        score_interval: []
      },
      currentId: undefined
      //积分区间
    }
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
    }
  },
  watch: {
    list(val) {
      console.log('----val---', val)
      if (val && Array.isArray(val) && val.length > 0) {
        this.loading = false
      }
    }
  },
  mounted() {
    const { keywords, brand_id } = this.$route.query
    this.breadcrumb = [this.$t('comps.goods_like.366072-8')]
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
    this.fetch()
    this.getShopConfig()
    this.fetchCategory()
  },
  methods: {
    async fetchCategory() {
      const data = await this.$api.pointitem.getCategory({
        have_items: true,
        is_main_category: false
      })
      this.category = data
    },
    async getShopConfig() {
      const {
        pc_banner,
        screen: { point_section },
        entrance
      } = await this.$api.pointitem.getTemplateConfig()
      this.config = {
        ...this.config,
        banners: pc_banner,
        score_interval: point_section
      }
    },
    init(to) {
      let { query } = to
      this.keywords = query.tag
      this.breadcrumb = [this.$t('comps.goods_like.366072-8')]
      if (query.tag) {
        this.breadcrumb.push(this.keywords)
      }
      this.updateList()
    },
    nextPage() {
      this.page += 1
      this.fetch()
    },

    async fetch() {
      //this.loading = true;
      // this.$loading({ background: "transparent" });
    },
    handleClickBrand(val) {
      this.currAttributeId = val
      this.urlBrandId = undefined
      const { fullPath } = this.$route
      let reg = /brand_id/
      let replaceUrl = fullPath
      if (reg.test(fullPath)) {
        //如果路径中存在brand_id
        replaceUrl = replaceUrl.replace(/brand_id=[0-9]+/, `brand_id=${val}`)
      } else {
        replaceUrl += `&brand_id=${val}`
      }
      this.$router.replace(replaceUrl)
      this.updateList()
    },
    handleDeleteBrand(val) {
      this.currAttributeId = null
      this.urlBrandId = undefined
      this.updateList()
    },

    updateList() {
      this.page = 1
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
    search() {
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
    }
  }
}
</script>
