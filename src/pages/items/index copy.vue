/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-item page-body container">
    <div class="page-item__breadcrumb-wraper">
      <SpBreadCrumb :value="breadcrumb" />
      <div class="items-searchbar" v-if="keyword">
        <h3 class="items-searchbar-h">{{ $t('items.index copy.995821-0') }}</h3>
        <div class="items-searchbar-hd">
          <SpInput
            class="items-searchbar-input"
            :value="keywordTemp"
            @input="handleInputKeyword"
          ></SpInput>
          <SpButton class="items-searchbar-btn" type="primary" @click="handleClickSearch"
            >{{ $t('items.index copy.995821-1') }}</SpButton
          >
        </div>
      </div>
    </div>

    <div class="page-item__left">
      <GoodsFilter v-if="showFilter" :data="categorys" :value="filter" @change="handleChangeFilter">
        <!-- <template slot-scope="{ handleChangeSelect }">
        </template> -->
      </GoodsFilter>
    </div>

    <div class="page-item__list">
      <div class="items-toolbar">
        <div class="items-toolbar-tabs">
          <p class="">{{ $t('items.index copy.995821-2') }}{{ count }}{{ $t('items.index copy.995821-3') }}</p>
        </div>

        <div class="items-toolbar-right">
          <div class="items-toolbar-sort">
            <ItemsSort :value="sort" :data="sorts" @change="handleChangeSort" />
          </div>
          <div class="items-toolbar-layout">
            <i
              class="aicon aicon-col-1"
              :class="{ active: curItemLayout === '4col' }"
              @click="handleClickLayout('4col')"
            ></i>
            <i
              class="aicon aicon-col-"
              :class="{ active: curItemLayout === '3col' }"
              @click="handleClickLayout('3col')"
            ></i>
          </div>
        </div>
      </div>

      <div class="items-list" :class="{ 'items-list__col-4': curItemLayout === '4col' }">
        <div id="goods-container" class="items-list__b clearfix" v-if="list">
          <GoodsCardSwitch
            v-for="(item, index) in list"
            class="items-list__goodscard"
            :key="index"
            :value="item"
            ref="goodsItem"
            :paddingSpace="40"
          />
        </div>
        <div class="no-data" v-if="!list">{{ $t('items.index copy.995821-4') }}</div>
      </div>
      <div class="items-list__f">
        <SpPagination
          :total="pageCount"
          :pageSize="pageSize"
          :current="pageCur"
          @on-change="goPage"
        />
      </div>

      <no-ssr>
        <SpModal v-model="modalShow" :width="1000" :height="600">
          <div class="modal-loading" v-if="!info">
            <SpLoading class="modal-loading__t">{{ $t('items.index copy.995821-5') }}</SpLoading>
          </div>
          <GoodsInfo
            isModal
            v-if="info"
            :info="info.item"
            :skucolor="skucolor"
            :promotion="info.promotionDetail"
            :gift="info.giftDetail"
          />
        </SpModal>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import { Page } from '@/mixins'
import { analytics } from '@/plugins/analytics'
import { Analytics } from '@/service'
import { cleanParams } from '@/utils'
import { pickBy } from 'lodash'
import GoodsCardSwitch from './comps/goods-card-switch'
import GoodsInfo from './comps/goods-info'
import GoodsFilter from './comps/goods-filter'
import ColorPicker from './comps/color-picker'
import BtnPicker from './comps/btn-picker'
import ItemsSort from './comps/sort'

const FILTER_KEYS = ['cat_id', 'tag', 'color', 'size', 'price', 'color_system']

function resolveQuery(...args) {
  const query = args.reduce((val, obj) => ({ ...val, ...obj }), {})
  return query
}

function resolveFilter(filter, ...keys) {
  keys = keys || FILTER_KEYS

  const ret = {}
  FILTER_KEYS.forEach((k) => {
    ret[k] = filter[k] || ''
  })
  return ret
}

function resolveSpecProps(props, ...keys) {
  if (keys.length === 0) {
    keys = ['color', 'size', 'color_system']
  }
  const ret = { ...props }
  const modFn = (items) =>
    items.forEach((item) => {
      item.label = item.prop_value
      item.value = item.prop_value_id
    })

  keys.forEach((key) => modFn(ret[key]))
  return ret
}

function resolveCats(catId, categorys) {
  const ids = {}
  const ret = []
  const getCatDict = (node) => {
    const lv = +node.level + 1
    const children = node[`lv${lv}`]
    const { cat_id, cat_name: name, parent_id } = node
    ids[cat_id] = {
      cat_id,
      parent_id,
      name,
      url: `/items?cat_id=${cat_id}`
    }

    if (children) {
      children.forEach((n) => getCatDict(n))
    }
  }
  categorys.forEach((item) => {
    getCatDict(item)
  })
  // getCatDict(categorys[0])
  const curNode = ids[catId]
  if (curNode) {
    ret.unshift(curNode)

    let pId = (curNode || {}).parent_id
    while (pId !== 0 && pId !== undefined) {
      const node = ids[pId]
      ret.unshift(node)
      pId = node.parent_id
    }
  }

  return ret
}

function resolveBreadCrumb(initState, params = {}) {
  let state = [...initState]
  const { categorys = [], keyword, tag, catId } = params
  if (categorys.length > 0) {
    if (catId) {
      // workaround for multi cats
      const cats = resolveCats(catId.split(',')[0], categorys).slice(0, 2)
      state = state.concat(cats)
    } else {
      if (tag) {
        state.push(tag)
      } else if (keyword) {
        state.push(keyword)
      } else {
        state.push(categorys[0].cat_name)
      }
    }
  }

  return state
}

export default {
  components: {
    GoodsCardSwitch,
    GoodsInfo,
    GoodsFilter,
    BtnPicker,
    ItemsSort,
    ColorPicker
  },

  mixins: [Page],

  beforeRouteUpdate(to, from, next) {
    this.init(to, from)
    next()
  },

  async asyncData({ app, route }) {
    const { cat_id = '', tag = '', keyword = '' } = route.query

    let catId = tag ? '' : cat_id
    const { categorys, spec_props: specProps } = await app.$api.item.category()
    const spec_props = resolveSpecProps(specProps)
    const breadcrumb = resolveBreadCrumb([this.$t('items.index copy.995821-6')], {
      categorys,
      tag,
      keyword,
      catId
    })
    const sort = keyword ? 'sold_quantity desc' : 'list_time desc'
    const keep = !!route.meta.isKeepAlive
    const filter = resolveFilter(route.query)
    const keywordTemp = keyword

    return {
      filter,
      keyword,
      categorys,
      spec_props,
      breadcrumb,
      sort,
      keep,
      keywordTemp
    }
  },
  head() {
    const title = this.breadcrumb
      .slice(1)
      .map((n) => {
        if (n.name) return n.name
        return n
      })
      .join(' ')

    return {
      title: `Aigle ${title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `Aigle ${title}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `Aigle ${title}`
        }
      ]
    }
  },
  data() {
    return {
      list: [],
      curItemLayout: '4col',
      curItemType: 'item',
      info: null,
      modalShow: false,
      goods_width: 310,
      sort: 'list_time desc',
      sorts: [
        { label: this.$t('items.index copy.995821-7'), value: 'list_time desc' },
        { label: this.$t('items.index copy.995821-8'), value: 'price desc' },
        { label: this.$t('items.index copy.995821-9'), value: 'price asc' },
        { label: this.$t('items.index copy.995821-10'), value: 'sold_quantity desc' },
        { label: this.$t('items.index copy.995821-11'), value: 'view_count' }
      ],
      // priceList: [
      //   { label: '0-199', value: '0-199' },
      //   { label: '200-299', value: '200-299' },
      //   { label: '300-399', value: '300-399' },
      //   { label: '400-499', value: '400-499' },
      //   { label: '500-599', value: '500-599' },
      //   { label: '600-799', value: '600-799' },
      //   { label: '799以上', value: '799-' }
      // ],
      skucolor: null,
      keywordTemp: '',
      showFilter: true,
      count: 0
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    init(to, from) {
      const { keyword } = to.query
      this.keyword = keyword || ''
      this.keywordTemp = keyword || ''
      this.filter = {
        ...this.filter,
        ...resolveFilter(to.query)
      }

      // 关键字查询默认按销量查询
      if (this.keyword) {
        this.sort = 'sold_quantity desc'
      }

      if (!this.filterChanged || to.fullPath !== from.fullPath) {
        this.fetchCategory(to.query)
      } else {
        this.fetchCategoryProps(to.query)
        this.filterChanged = false
      }

      this.refresh(true)
    },
    // 获取分类
    async fetchCategory({ cat_id, tag, keyword }) {
      // const { categorys, spec_props } = await this.$api.item.category(cat_id)
      const { categorys, spec_props } = await this.$api.item.category()
      this.categorys = categorys
      this.spec_props = resolveSpecProps(spec_props)
      this.breadcrumb = resolveBreadCrumb([this.$t('items.index copy.995821-6')], {
        categorys,
        tag,
        keyword,
        catId: cat_id
      })
    },
    // 分类数据联动
    async fetchCategoryProps({ cat_id }) {
      try {
        // const { spec_props } = await this.$api.item.categoryProps(cat_id)
        const { spec_props } = await this.$api.item.categoryProps()
        this.spec_props = resolveSpecProps(spec_props)
      } catch (e) {}
    },
    resolveSpecs(...args) {
      const specItems = []
      args.forEach((arg) => {
        if (arg) {
          arg.split(',').forEach((item) => {
            item && specItems.push(item)
          })
        }
      })

      return specItems
    },
    async fetch(params) {
      const { sort, keyword: search_keywords } = this
      const { cat_id, tag, color, size, price, color_system } = this.filter
      const spec_index = this.resolveSpecs(color, size)

      params = cleanParams({
        ...params,
        cat_id,
        spec_index,
        price,
        color_system,
        tag_name: tag,
        search_keywords,
        orderBy: sort
      })
      if (Array.isArray(params.spec_index)) {
        params.spec_index = params.spec_index.join(',')
      }

      this.$loading({ background: 'transparent' })

      try {
        this.list = []
        const { list, count } = await this.$api.item.list(params)
        this.list = list
        this.count = count
        this.$loading().close()

        return {
          count
        }
      } catch (e) {
        console.log(e)
      }

      this.$loading().close()
      return {
        total: 0
      }
    },
    handleClickCategory(cat_id) {
      const filter = {
        ...this.filter,
        cat_id
      }

      this.handleChangeFilter(filter)
    },
    handleChangeFilter(filter, ids, name, list) {
      const query = cleanParams(filter)
      // TODO:暂时去掉tag筛选
      delete query.tag

      this.$router.push({
        path: '/items',
        query
      })
      this.filter = filter
      this.filterChanged = true
      Analytics.dispatch('applyFilter', {
        ids,
        name,
        list
      })
    },
    handleInputKeyword(v) {
      const value = v
      this.keywordTemp = value
    },
    handleClickSearch() {
      const keywordTemp = this.keywordTemp
      const path = keywordTemp ? `/items?keyword=${keywordTemp}` : '/items'
      this.$router.push({
        path
      })
      this.$track('search', keywordTemp)
    },
    tiggleShowFilter() {
      this.showFilter = !this.showFilter
    },
    // 排序选择
    handleChangeSort(data) {
      this.sort = data
      this.refresh(true)
      Analytics.dispatch('applySort', {
        sortType: this.sort
      })
    },
    handleClickLayout(layout) {
      this.curItemLayout = layout
      this.$refs.goodsItem.forEach((vm) => this.$nextTick(() => vm.handleResize()))
    },
    // 快速浏览
    async handleFastBrowse(goods_id, woman, skucolor) {
      this.info = null
      this.skucolor = skucolor
      this.modalShow = true

      const info = await this.$api.item.detail(goods_id)
      this.info = info
    }
  }
}
</script>
