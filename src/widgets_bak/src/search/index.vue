/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-search {
  position: relative;
  .menus__search{
  }
  .sp-search__default {
    box-sizing: border-box;
    input{
      background: transparent;
      padding: 0 0 10px 0;
    }
  }
  .keyword-error {
    color: #c41230;
  }
  .search-result {
    position: absolute;
    background: #fff;
    // width: max-content;
    // min-width: 350px;
    min-width: 240px;
    right: 0;
    top: 40px;
    padding: 20px 0;
    border: 1px solid;
    z-index: $z-index-level-11;
    font-size: 14px;
    display: block;
    .empty-text {
      text-align: center;
      margin: 0 20px 10px;
      width: 300px;
    }
    &__title {
      font-weight: bold;
    }
    &__category {
      // width: 37%;
      padding-left: 30px;
      margin-right: 60px;
      ul {
        margin-top: 10px;
        li {
          margin-bottom: 15px;
        }
      }
    }
    &__itemSearchData {
      // width: 63%;
      padding: 0 20px;
      ul {
        li {
          margin-bottom: 10px;
          width: 380px;
          .img-wrap {
            width: 64px;
            height: 80px;
            float: left;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .item-info {
            width: 303px;
            float: left;
            font-size: 14px;
            color: #6a6a6a;
            padding: 10px 0 0 15px;
            .item-title {
              text-decoration: underline;
            }
            .item-price {
              margin-top: 5px;
              .sp-price {
                font-size: 14px !important;
                font-family: normal !important;
              }
            }
          }
        }
      }
    }
    .item-more {
      margin-top: 10px;
      cursor: pointer;
      color: #00397e;
    }

    .hot-search {
      padding: 0 15px;
      text-align: left;
      &__title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      &__list {
        li {
          margin-top: 10px;
          a {
            color: #000;
          }
        }
      }
    }
  }
  .search-keyword {
    text-align: left;
    &__title {
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .search-category {
    margin: 0 0 15px;
  }
  .search-items {
    margin-top: 10px;
    li {
      margin-bottom: 10px;
      .img-wrap {
        // width: 64px;
        // height: 80px;
        width: 48px;
        height: 60px;
        float: left;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .item-info {
        text-align: left;
        width: calc(100% - 64px);
        float: left;
        font-size: 14px;
        color: #6a6a6a;
        padding: 0 20px 0 15px;
        .item-title {
          text-decoration: underline;
        }
        .item-price {
          .sp-price {
            font-size: 14px !important;
          }
        }
      }
    }
  }
  .item-more {
    color: #00397e;
  }
  .modal-loading__t {
    display: block;
    text-align: center;
    svg {
      display: inline-block;
    }
    .sp-loading__cont {
      display: inline-block;
      margin-left: 8px;
      font-size: 14px;
      position: relative;
      top: -2px;
    }
  }
  .item-total {
    margin-bottom: 5px;
  }
  .item-more {
    margin-bottom: 5px;
  }
  @include respond(sm) {
    .search-result-mb {
      padding: 20px 15px;
    }
    .search-keyword {
      font-size: 14px;
      &__title {
        font-size: 15px;
        margin: 0 0 5px;
      }
    }
  }
}
</style>

<template>
  <div class="widget-search" v-on-clickaway.mousedown="searchAway">
    <SpSearch
      class="menus__search"
      placeholder=""
      v-model="searchValue"
      :height="30"
      @change="handleChangeSearch"
      @search="handleSearch"
      @focus="showSearch = true"
    >
      <i class="aicon aicon-search" slot="icon" @click="handleSearch"></i>
    </SpSearch>
    <div class="search-result" :style="resultWidth" v-if="showSearch">
      <div v-if="searchValue">
        <SpLoading class="modal-loading__t" :size="18" v-if="loading">搜索中...</SpLoading>
        <div class="empty-text" v-if="category.length == 0 && itemSearchCount == 0 && !loading">非常抱歉，没有找到“<span class="keyword-error">{{searchValue}}</span>”相关的商品。</div>
        <div class="clearfix catedata" v-if="(category.length > 0 || itemSearchCount > 0) && !loading">
          <div class="search-result__category fl" v-if="category.length > 0">
            <div class="search-result__title">关联词</div>
            <ul>
              <template v-for="item in category">
                <li
                  v-for="sitem in item.associate"
                  :key="item.cat_id + '-' + sitem.cat_id"
                  @click="closeSearch(sitem.cat_name+'>'+item.cat_name, 'category')"
                >
                  <nuxt-link :to="`/items?cat_id=${item.cat_id}`">
                    <b>{{item.cat_name}}</b>
                    <i class="mb-iconfont mb-iconfont-right"></i>
                    {{sitem.cat_name}}
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </div>
          <div class="search-result__itemSearchData fl" v-if="itemSearchCount > 0">
            <div class="search-result__title" v-if="itemSearchData">产品</div>
            <ul style="margin-top: 10px;">
              <template v-for="(item, index) in itemSearchData">
                <li
                  class="clearfix"
                  :key="index"
                  @click="closeSearch(item.title)"
                >
                  <nuxt-link :to="`/items/${item.item_id}`">
                    <div class="img-wrap">
                      <img :src="resolveImgPath(item.image_default_id, 't')" alt="search-pro"/>
                    </div>
                    <div class="item-info">
                      <div class="item-title">{{item.title}}</div>
                      <div class="item-price">
                        <SpPrice :value="item.price" />
                      </div>
                    </div>
                  </nuxt-link>
                </li>
              </template>
            </ul>
            <!-- <div class="item-total">总数：{{itemSearchCount}}</div> -->
            <div class="item-more" @click="showMorePage" v-if="itemSearchCount > 5">显示更多</div>
          </div>
        </div>
      </div>

      <div class="hot-search" v-if="!searchValue || (category.length == 0 && itemSearchCount == 0 && !loading)">
        <div class="hot-search__title">热门搜索</div>
        <ul class="hot-search__list">
          <li v-for="(item, key) in params.urls" :key="key" v-if="params && params.urls" @click="hotSearchClick(item)">
            <nuxt-link :to="item.link">{{item.title}}</nuxt-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import _debounce from 'lodash/debounce'
import { analytics } from '@/plugins/analytics'
import { resolveImgPath } from '@/utils'

export default {
  mixins: [clickaway],
  props: {
    params: Object
  },

  data () {
    return {
      category: [],
      itemSearchData: null,
      itemSearchCount: 0,
      showSearch: false,
      showMbSearch: false,
      searchValue: '',
      showMore: false,
      loading: false
    }
  },

  computed: {
    resultWidth () {
      let style = {
        // width: '240px'
      }

      if (this.searchValue == '') {
        delete style.width
      } else {
        if (this.category.length == 0 && this.itemSearchCount == 0) {
          delete style.width
        } else {
          let w = (this.category.length == 0 ? 0 : 240) + (this.itemSearchCount == 0 ? 0 : 400)
          style = {
            ...style,
            width: w + 'px'
          }
        }
      }

      return style
    }
  },
  watch: {
    showSearch (val, oldVal) {
      if (this.showSearch && (!this.searchValue || (this.category.length == 0 && this.itemSearchCount == 0 && !this.loading))) {
        let searchSuggestion = []
        for (let key in this.params.urls) {
          searchSuggestion.push(this.params.urls[key].title)
        }
        analytics.event({
          searchSuggestion
        }, 'hotSearch')
      }
    }
  },
  created () {
    this.getSearchInfo = _debounce(async val => {
      if (!val) {
        this.category = []
        this.itemSearchData = null
        return
      }
      const { category, itemSearchData, itemSearchCount } = await this.$api.item.microSearch({
        search_keywords: val
      })

      this.category = category
      this.itemSearchData = itemSearchData
      this.itemSearchCount = itemSearchCount
      this.loading = false

      let categoryList = []
      if (this.category) {
        for (let item of this.category) {
          for (let sitem of item.associate) {
            categoryList.push(sitem.cat_name + '>' + item.cat_name)
          }
        }
      }
      let product = []
      if (itemSearchData) {
        for (let item of itemSearchData) {
          product.push({
            id: item.item_id,
            name: item.title,
            badge: item.product_type,
            ratingAvg: '',
            ratingCount: '',
            price: item.price,
            style: item.bn,
            discountAmount: '',
            discountCode: ''
          })
        }
      }
      let page_params = {
        page: {
          pageName: 'search',
          pageType: 'search',
          breadcrumb: 'Search'
        },
        searchResults: {
          searchTerm: val,
          Results: {
            category: categoryList,
            product
          },
          totalResultCount: itemSearchCount || 0
        },
        ecommerce: { product }
      }
      analytics.pageReady(page_params)

      analytics.event({
        searchResults: {
          searchTerm: this.searchValue,
          Results: {
            category: categoryList,
            product
          }
        }
      }, 'searchKeyword')
    }, 500)
  },
  methods: {
    handleFocusInput () {
      this.searchFocus = true
    },
    async handleChangeSearch (val) {
      this.showSearch = true
      this.loading = true
      this.getSearchInfo(val.trim())
    },
    async handleSearch () {
      let searchValue = this.searchValue.trim()
      if (!searchValue) {
        this.category = []
        this.itemSearchData = null
        this.searchValue = ''
        this.$router.push('/result')
        return
      }
      this.searchAway()
      const { category, itemSearchCount } = await this.$api.item.microSearch({
        search_keywords: searchValue
      })
      this.searchValue = ''
      if (category.length === 0 && itemSearchCount === 0) {
        this.$router.push({ path: '/result', query: { name: searchValue } })
      } else {
        this.$router.push({ path: '/items', query: { keyword: searchValue } })
      }
      this.$track('header', '搜索')
    },
    searchAway () {
      this.showSearch = false
      this.showMbSearch = false
    },
    showMorePage () {
      analytics.event({
        searchResults: {
          searchTerm: this.searchValue,
          totalResultCount: this.itemSearchCount
        }
      }, 'searchLoadMoreClick')
      this.$router.push({ path: '/items', query: { keyword: this.searchValue } })
      this.searchAway()
    },
    handleShowMbSearch () {
      this.$EventBus.$emit('close-menu')
      this.showMbSearch = !this.showMbSearch
    },
    closeSearch (name, type) {
      this.showSearch = false
      if (type == 'category') {
        analytics.event({
          searchResults: {
            searchTerm: this.searchValue,
            searchCategory: name
          }
        }, 'searchCategoryClick')
      } else {
        analytics.event({
          searchResults: {
            searchTerm: this.searchValue,
            searchSuggestionName: name
          }
        }, 'searchSuggestionClick')
      }
    },
    closeMbSearch (name, type) {
      this.showMbSearch = false
      if (type == 'category') {
        analytics.event({
          searchResults: {
            searchTerm: this.searchValue,
            searchCategory: name
          }
        }, 'searchCategoryClick')
      } else {
        analytics.event({
          searchResults: {
            searchTerm: this.searchValue,
            searchSuggestionName: name
          }
        }, 'searchSuggestionClick')
      }
    },
    resolveImgPath (url, size) {
      return (resolveImgPath(url, size))
    },
    hotSearchClick (item) {
      analytics.event({
        searchSuggestionClicked: item.title
      }, 'hotSearchSuggestionClick')
      this.showSearch = false
      this.showMbSearch = false
    }
  }
}
</script>
