/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./detail.scss"></style>

<template>
  <div class="page-item-detail-pointitem">
    <div class="container">
      <SpBreadCrumb :value="breadcrumb" />

      <GoodsInfo
        v-if="info"
        :info="info"
        :promotion="info.promotionDetail"
        :showprice="showprice"
      />

      <div class="goods-details clearfix">
        <!-- <Recommend /> -->

        <div class="goods-details__main test">
          <div class="tab-wrap">
            <div class="tab-list clearfix">
              <div
                class="tab-item"
                :class="{ active: index == curTabIdx }"
                v-for="(tab, index) in tabList"
                :key="index"
                @click="changeTab(index)"
              >
                {{ tab }}
              </div>
            </div>
          </div>

          <div class="goods-parameter" v-if="curTabIdx == 0 && info && info.item_params.length > 0">
            <ul class="goods-parameter__list clearfix">
              <li class="goods-parameter__item">{{ $t('pointitems._id.032647-0') }}{{ info.goods_brand }}</li>
              <li
                class="goods-parameter__item"
                v-for="(item, index) in info.item_params"
                :key="index"
              >
                <span>{{ item.attribute_name }}</span>
                ： {{ item.attribute_value_name | textSubstringFilter }}
              </li>
            </ul>
            <div class="more-wrap">
              <span class="more-text" @click="changeTab(1)">{{ $t('pointitems._id.032647-1') }}</span>
            </div>
          </div>

          <div
            class="goods-parameter-more"
            v-if="curTabIdx == 1 && info && info.item_params.length > 0"
          >
            <ul class="goods-parameter-more__list">
              <li
                class="goods-parameter-more__item clearfix"
                v-for="(item, index) in info.item_params"
                :key="index"
              >
                <p class="p-key">{{ item.attribute_name }}</p>
                <p class="p-value">{{ item.attribute_value_name }}</p>
              </li>
            </ul>
          </div>

          <div class="goods-intro" v-if="curTabIdx == 0">
            <div v-if="desc">
              <div v-if="Array.isArray(desc)">
                <template>
                  <div v-for="(item, index) in desc" :key="index">
                    <Film v-if="item.name === 'film'" :dataForm="item"></Film>
                    <Heading v-if="item.name === 'heading'" :dataForm="item"></Heading>
                    <Slider v-if="item.name === 'slider'" :dataForm="item"></Slider>
                    <Writing v-if="item.name === 'writing'" :dataForm="item"></Writing>
                  </div>
                </template>
              </div>
              <div
                class="goods-intro__detail"
                v-else
                v-html="desc"
                v-lazy-container="{ selector: 'img' }"
              >
                {{ $t('pointitems._id.032647-2') }}
              </div>
            </div>
            <div class="no-info" v-else>{{ $t('pointitems._id.032647-3') }}</div>
          </div>

          <div
            class="goods-evaluation"
            v-if="curTabIdx == 1"
            v-infinite-scroll="nextPage"
            infinite-scroll-disabled="disabled"
            infinite-scroll-distance="10"
          >
            <div class="goods-evaluation__list">
              <GoodsEvaluation
                :info="item"
                v-for="(item, index) in evaluationList"
                @on-show-reply="showReply(item, index)"
                @on-open-comment="openComment(index)"
                @on-reply="handleReply(item, index)"
                :key="index"
              >
              </GoodsEvaluation>
            </div>
            <div class="loading-data" v-if="loading">{{ $t('pointitems._id.032647-4') }}</div>
            <div class="loading-data" v-if="!loading && noMore">
              <span v-if="evaluationList.length == 0">{{ $t('pointitems._id.032647-5') }}</span>
              <span v-if="evaluationList.length > pageSize">{{ $t('pointitems._id.032647-6') }}</span>
            </div>
          </div>
        </div>
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
import { fetchHead } from '@/mixins'

export default {
  // async asyncData ({ app, route, req, params, query }) {
  //   let info
  //   try {
  //     let param = {
  //       // page_url: process.env.VUE_APP_HOST + route.fullPath,
  //       distributor_id: query.id
  //     }
  //     info = await app.$api.item.detail(params.id, param)
  //     info.intro = resolveLazyLoadImg(info.intro)
  //   } catch (e) {}

  //   return {
  //     info
  //   }
  // },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

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
  mixins: [fetchHead],
  created() {
    this.pageType = 'pointitemDetail'
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
      tabList: [this.$t('pointitems._id.032647-7'), this.$t('pointitems._id.032647-8')],
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
          name: this.$t('pointitems._id.032647-9'),
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
    let { user } = this.$store.state

    const { id } = this.$route.params
    this.itemId = id
    const { keyword, id: did } = this.$route.query
    this.keyword = keyword
    let param = {
      // page_url: window.location.href,
      distributor_id: did
    }

    this.fetch(id, param)

    this.$api.item
      .getGuessLikeGoods({
        item_id: id
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
    this.fetchEvaluationList(id)
  },

  methods: {
    async fetch(id, param) {
      const info = await this.getListAndSetSeo(param, id)
      this.info = info
      this.desc = Array.isArray(info.intro) ? info.intro : resolveLazyLoadImg(info.intro)
    },
    nextPage() {
      this.page += 1
      this.fetchEvaluationList()
    },
    async fetchEvaluationList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        item_id: this.itemId,
        order_type: 'pointsmall'
      }
      let { list, total_count } = await this.$api.item.evaluationList(params)
      if (list.length > 0) {
        list.map((item) => {
          item.showComment = false
          item.showReply = false
          item.reply_list = []
          item.reply_comment = ''
        })
      }
      this.evaluationList = list.map((item) => ({
        ...item,
        rate_pic: hasValue(item.rate_pic) ? item.rate_pic.split(',') : []
      }))
      this.evaluationTotal = total_count
      this.loading = false
    },
    async showReply(item, index, status) {
      if (item.reply_list.length == 0 || status) {
        let params = {
          item_id: this.itemId,
          rate_id: item.rate_id,
          page: 1,
          pageSize: 100
        }
        let { list } = await this.$api.item.getreplyRateList(params)
        this.evaluationList[index].reply_list = list
      }
      this.evaluationList[index].showReply = true
    },
    openComment(index) {
      this.evaluationList[index].showComment = true
      this.evaluationList[index].reply_comment = ''
    },
    async handleReply(item, index) {
      if (!item.reply_comment) {
        return
      }
      await this.$api.item.replyRate({
        rate_id: item.rate_id,
        content: item.reply_comment
      })
      // let { user } = this.$store.state
      // this.evaluationList[index].reply_list.push({
      //   username: user.userInfo && user.userInfo.memberInfo && user.userInfo.memberInfo.username || '',
      //   content: item.reply_comment
      // })
      this.showReply(item, index, true)
      this.evaluationList[index].showComment = false
    },
    changeTab(index) {
      if (index == 1) {
        this.page = 1
        this.evaluationList = []
        this.fetchEvaluationList()
      }
      this.curTabIdx = index
    },
    // syncViewed() {
    //   let items = gstore.get(VIEWED_ITEMS_KEY)
    //   items = items ? items.split(',') : []
    //   const { id } = this.$route.params
    //   const itemsMax = 10

    //   const idx = items.indexOf(id)
    //   if (idx >= 0) {
    //     items.splice(idx, 1)
    //   }

    //   items.unshift(id)
    //   items = items.slice(0, itemsMax)

    //   if (items.length > 0) {
    //     gstore.set(VIEWED_ITEMS_KEY, items.join(','))
    //   }
    // },
    handleAnalytics(action) {
      const { item } = this.info

      let ecommerce = {
        category: {
          primaryCategory:
            this.info.category && this.info.category.lv1 ? this.info.category.lv1.cat_name : '',
          subCategory1:
            this.info.category && this.info.category.lv2 ? this.info.category.lv2.cat_name : '',
          subCategory2:
            this.info.category && this.info.category.lv3 ? this.info.category.lv3.cat_name : ''
        },
        product: [
          {
            id: item.item_id,
            name: item.title,
            badge: item.product_type,
            ratingAvg: '',
            ratingCount: '',
            price: item.price,
            style: item.bn,
            discountAmount: '',
            discountCode: ''
          }
        ]
      }
      let page_params = {
        page: {
          pageName: this.$t('pointitems._id.032647-10'),
          pageType: 'pdp',
          breadcrumb: ''
        },
        ecommerce
      }
      analytics.pageReady(page_params)
    },
    setStorageSecretCode(secret_code, type) {
      if (secret_code && type) {
        const params = { secret_code, type }
        sessionStorage.setItem('secret', JSON.stringify(params))
        // gstore.set('secret', { secret_code, type })
      }
    }
  }
}
</script>
