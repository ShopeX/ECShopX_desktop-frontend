/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./goods-info.scss"></style>

<template>
  <div class="goods-info-pointitem-detail">
    <div class="goods-imgs" v-if="images">
      <div class="goods-imgs__pan">
        <SpPhotoZoomPoint :url="curImg"></SpPhotoZoomPoint>
      </div>

      <div class="goods-imgs__slider-wrap">
        <div class="goods-imgs__slider" v-swiper:imgs="swiperOptions" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, idx) in images" :key="idx">
              <div
                class="slider-item"
                :class="{ 'is-active': curImgIdx === idx }"
                @click="handleClickImg(idx)"
              >
                <img class="slider-item__img" :src="img" />
              </div>
            </div>
          </div>
        </div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-back" v-show="images.length > 1"></div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-right" v-show="images.length > 1"></div>
      </div>
    </div>

    <div class="goods-info__cont">
      <div class="goods-title__wrap">
        <h2 class="goods-title">{{ info.item_name }}</h2>
        <!-- <div class="collect-wrap">
          <div class="collect-btn" v-if="!collected" @click="handleClickCollect('collect')">
            <i class="ec-icon ec-icon-favor"></i>
            <span>收藏</span>
          </div>
          <div class="collect-btn cancel" v-else @click="handleClickCollect('cancel')">
            <i class="ec-icon ec-icon-favorfill"></i>
            <span>取消收藏</span>
          </div>
        </div> -->
      </div>

      <div class="tag-wrap" v-if="activityText">
        <span class="goods-tag">{{ activityText }}</span>
        <span class="goods-tag" v-if="info.activity_type == 'group'"
          >{{ info.activity_info.person_num }}{{ $t('comps.goods-info.282870-0') }}</span
        >
      </div>

      <div class="goods-prices__wrap">
        <div class="goods-prices__wrap_title">
          {{ $t('comps.goods-info.282870-1') }}
        </div>
        <div class="goods-prices" v-show="showprice">
          <template v-if="curSkuInfo">
            <div>
              <span class="price-text">{{ $t('comps.goods-info.282870-2') }}</span>
              <span class="sale-price">{{ curSkuInfo | priceFilter }}</span>
            </div>
            <div style="margin-top:20px">
              <span class="price-text">{{ $t('comps.goods-info.282870-3') }}</span>
              <span>{{ curSkuInfo.store }}{{ $t('comps.goods-info.282870-4') }}</span>
            </div>
          </template>
          <template v-else>
            <div>
              <span class="price-text">{{ $t('comps.goods-info.282870-2') }}:</span>
              <span class="sale-price">{{ info | priceFilter }}</span>
            </div>
            <!-- <SpPrice class="price-primary" :value="info.price" /> -->
            <!-- 原价: -->
            <!-- <span class="price-mkt-box" v-if="info.price != info.market_price">
              
              {{ info | marketPriceFilter }}
             
            </span> -->
          </template>
        </div>

        <no-ssr>
          <!-- 促销信息 -->
          <div
            class="goods-promotion__wrap clearfix"
            v-if="info.promotion_activity || info.vipgrade_guide_title"
          >
            <span class="goods-promotion__title">{{ $t('comps.goods-info.282870-6') }}</span>
            <div class="goods-promotion__info">
              <div class="vip-guide" v-if="info.vipgrade_guide_title">
                <SpPrice
                  class="vip-guide__price"
                  :value="info.vipgrade_guide_title.memberPrice"
                  v-if="info.vipgrade_guide_title.memberPrice"
                ></SpPrice>
                <span class="vip-guide__discount" v-if="info.vipgrade_guide_title.gradeDiscount"
                  >{{ info.vipgrade_guide_title.gradeDiscount }}{{ $t('comps.goods-info.282870-7') }}</span
                >
                <span class="vip-guide__tag" v-if="info.vipgrade_guide_title.gradeDiscount">{{
                  info.vipgrade_guide_title.vipgrade_desc
                }}</span>
                <span class="vip-guide__desc">{{
                  info.vipgrade_guide_title.guide_title_desc
                }}</span>
                <span class="icon-wrap"><i class="ec-icon ec-icon-playfill"></i></span>
              </div>

              <div class="goods-promotion" v-if="info.promotion_activity">
                <i class="ec-icon ec-icon-unfold" v-if="info.promotion_activity.length > 2"></i>
                <i
                  class="ec-icon ec-icon-unfold down"
                  v-if="info.promotion_activity.length > 2"
                ></i>
                <div
                  class="goods-promotion__item"
                  @click="linkPromotion(item.marketing_id)"
                  v-for="item in info.promotion_activity"
                  :key="item.marketing_id"
                >
                  <SpLabel>{{ item.promotion_tag }}</SpLabel>
                  <span class="goods-promotion__name">{{ item.marketing_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </no-ssr>
      </div>

      <div class="goods-selector">
        <!-- sku选择 -->
        <SkuSelector
          :info="info"
          @selection="handleUpdateImgs"
          @change="handleChangeSku"
          :isDetail="true"
        />
      </div>

      <!-- 数量选择 -->
      <div class="goods-num clearfix">
        <!-- <div class="goods-num__hd">数量</div> -->
        <div class="goods-num__bd">
          <SpPointNumPoint
            :max="curSkuInfo ? curSkuInfo.store : info.store"
            v-model="quantity"
            @increase="handleClickNumInput($event, 'increase')"
            @decrease="handleClickNumInput($event, 'decrease')"
            @change="handleClickNumInput($event, 'change')"
          />

          <span v-if="purchaseLimitCheck" class="limit-buy"
            >{{ $t('comps.goods-info.282870-8') }}{{ info.activity_info.describe }}</span
          >
          <BuyToolbar
            :info="info"
            :activity-text="activityText"
            :buyLoading="buyLoading"
            :collected="collected"
            @btn-click="(type) => handleClickBuyBtn(type)"
            class="goods-buybar"
          />
        </div>
      </div>
      <div class="tip-msg" v-if="tipMsg">
        <i class="ec-icon ec-icon-info"></i>
        <span>{{ tipMsg }}</span>
      </div>

      <!-- <GoodsAccordion
      @btn-click-collect="(type) => handleClickCollect(type)"
      v-if="info.paragraphs && info.paragraphs.length > 0"
      :info="info.paragraphs"
    /> -->
    </div>

    <transition name="fade">
      <div class="size-guide" v-if="showSizeChart">
        <span class="btn-close" @click="showSizeChart = false">{{ $t('comps.goods-info.282870-9') }}</span>
        <div class="size-guide__inner">
          <img :src="info.size_guide" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { SpNumInput, SpSocialShare, SpPointNumPoint } from '@/components'
import SkuSelector from '@/components/sku-point-selector'
import SpPhotoZoom from '@/components/sp-photo-zoom'
import SpPhotoZoomPoint from '@/components/point-photo-zoom'
import BuyToolbar from './buy-toolbar'
import GoodsAccordion from './goods-accordion'
import store from 'store'
import { mixins, resolveLazyLoadImg, log, calcTimer, formatTime } from '@/utils'
import { Analytics } from '@/service'
import S from '@/spx'
import { lockScreen } from '@/utils/dom'

export default {
  // 抽屉类型
  ctype: 'drawer',
  components: {
    SpNumInput,
    SpSocialShare,
    BuyToolbar,
    SkuSelector,
    SpPhotoZoom,
    GoodsAccordion,
    SpPointNumPoint,
    SpPhotoZoomPoint
  },
  props: {
    isModal: Boolean,
    info: {
      type: Object,
      default: {}
    },
    from: String,
    showprice: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const swiperOptions = {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '.ec-icon-right',
        prevEl: '.ec-icon-back'
      },
      lazy: {
        loadPrevNext: true
      },
      breakpoints: {
        768: {
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    }

    return {
      images: [],
      swiperOptions,
      curImgIdx: 0,
      shareInfo: null,
      localCollect: false,
      quantity: 1,
      buyLoading: false,
      curSku: null,
      selection: null,
      tipMsg: '',
      showSizeChart: false,
      activityText: '',
      specImagesObj: {},
      btn_disabled: false,
      curImg: '',
      collected: false,
      purchaseLimitCheck: false,
      purchaseLimitListId: [],
      couponList: [],
      showCoupon: false,
      isAnimating: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    swiper() {
      return this.$refs.swiper.swiper
    },
    curSkuInfo() {
      if (!this.curSku) return null
      return this.curSku
    }
  },
  filters: {
    priceFilter(info) {
      let timer = null,
        price = ''
      if (info.activity_type === 'group') {
        timer = calcTimer(info.activity_info.remaining_time)
      }
      if (info.activity_type === 'seckill' || info.activity_type === 'limited_time_sale') {
        timer = calcTimer(info.activity_info.last_seconds)
      }

      if (timer) {
        price = info.act_price
      } else {
        price = info.member_price && info.is_vip_grade ? info.member_price : info.price
        if (price == 0) price = info.point
      }

      return this.$t('comps.goods-info.282870-10', [price])
    },
    marketPriceFilter(info) {
      let timer = null,
        price = ''
      if (info.activity_type === 'group') {
        timer = calcTimer(info.activity_info.remaining_time)
      }
      if (info.activity_type === 'seckill' || info.activity_type === 'limited_time_sale') {
        timer = calcTimer(info.activity_info.last_seconds)
      }

      if (timer) {
        price = info.price
      } else {
        price = info.market_price
      }
      return this.$t('comps.goods-info.282870-11', [price])
    }
  },
  created() {
    const { item_id, item_name, brief: description, pics, price } = this.info

    const shareInfo = {
      item_id,
      title: item_name,
      description,
      image: pics && pics.length > 0 ? pics[0] : '',
      price
    }
    this.shareInfo = shareInfo
    const { user } = this.$store.state
    if (user && user.userInfo && user.userInfo.memberInfo && user.userInfo.memberInfo.user_id) {
      // this.getCollectInfo(item_id, user.userInfo.memberInfo.user_id)
      this.getCollectionList()
    }
  },
  mounted() {
    const {
      item_id,
      pics,
      activity_type,
      spec_images,
      spec_items,
      nospec,
      activity_info
    } = this.info

    if (activity_type === 'group') {
      this.activityText = this.$t('comps.goods-info.282870-12')
    } else if (activity_type === 'seckill') {
      this.activityText = this.$t('comps.goods-info.282870-13')
    } else if (activity_type === 'limited_time_sale') {
      this.activityText = this.$t('comps.goods-info.282870-14')
    }

    // 图片规格
    if (spec_images.length > 0) {
      let specImages = {}
      spec_images.forEach((item) => {
        specImages[item.spec_value_id] = {
          url: item.spec_image_url,
          urlList: item.item_image_url
        }
      })
      this.specImagesObj = specImages
    }
    this.images = pics
    this.curImg = pics[this.curImgIdx]
    if (nospec) {
      this.curSku = this.info
    }

    //获取限制购买商品id
    if (activity_info && activity_info.describe) {
      let purchaseLimitListId = []
      activity_info.items.forEach((item) => {
        purchaseLimitListId.push(item.itemId)
      })
      this.purchaseLimitListId = purchaseLimitListId
      //判断当前商品是否限购
      this.purchaseLimitCheck = this.purchaseLimitListId.includes(item_id)
    }
    log.debug('[item detail fetched]', this.info)
  },
  methods: {
    handleDatetime(timestamp) {
      return formatTime(timestamp * 1000)
    },
    // 新打开页面 跳转到活动详情页
    linkPromotion(id) {
      // let marketing_id = id || this.productMsg.promotion_activity[0].marketing_id
      // window.open("//" + window.location.host + `/#/promotion?id=${marketing_id}`)
    },
    // 收藏
    async getCollectionList() {
      const { list } = await this.$api.member.getCollectionList({
        distributor_id: this.info.distributor_id || 0
      })
      list.map((item) => {
        if (item.item_id == this.info.item_id) {
          this.collected = true
        }
      })
      this.localCollect = list
    },
    async getCollectInfo(item_id, userId) {
      if (!item_id || !userId) {
        return
      }
      const { list } = await this.$api.item.fav({
        item_id,
        userId
      })
      this.localCollect = list
    },
    handleClickImg(idx) {
      this.curImgIdx = idx
      this.curImg = this.images[idx]
      Analytics.event({}, 'pdpImageClick')
    },

    handleClickImgNext() {
      let next = this.curImgIdx + 1
      const len = this.images.length
      if (next > len - 1) next = len - 1

      this.handleClickImg(next)
    },

    handleClickImgPrev() {
      let next = this.curImgIdx - 1
      if (next < 0) next = 0

      this.handleClickImg(next)
    },

    handleClickShowPanel(type) {
      this.buyType = type
    },

    async handleToggleFav(item_id, status) {
      let token = S.getAuthToken()
      if (!token && !this.localCollect) {
        Analytics.dispatch('addToWishlist', this.info)
      }
      try {
        await this.$api.member.favoriteItemAdd({ item_id: item_id })
        status = status === undefined ? this.localCollect : status
        // const itemCollect = 1 - status
        if (status) {
          await this.$api.member.favoriteItemRemove({ item_id: item_id })
          this.$Message.success(this.$t('comps.goods-info.282870-15'))
        } else {
          Analytics.event(
            {
              product: [
                {
                  id: this.info.item_id,
                  name: this.info.item_name,
                  price: this.info.price,
                  style: this.info.bn,
                  discountAmount: '',
                  discountCode: ''
                }
              ]
            },
            'addToWishlist'
          )
          await this.$api.member.favoriteItemAdd({ item_id: item_id })
          this.$Message.success(this.$t('comps.goods-info.282870-16'))
        }

        this.localCollect = !status
      } catch (error) {}
    },
    handleChangeSku(sku, selection, specSkuList) {
      this.curSku = sku
      this.selection = selection
      let key = selection.join('-')
      // 判断当前规格商品是否有限购
      if (specSkuList[key]) {
        this.purchaseLimitCheck = this.purchaseLimitListId.includes(specSkuList[key].item_id)
      }
    },
    handleUpdateImgs(item, idx, selection) {
      // 图片workaround
      if (idx > 0) return
      let currentRule = this.specImagesObj[item.spec_value_id]
      if (currentRule) {
        this.curImg = currentRule.url
        this.images = currentRule.urlList
        this.curImgIdx = 0
      }
    },
    handleClickNumInput(val, type) {
      if (val === 1) {
        if (this.curSkuInfo && this.curSkuInfo.store == 1 && type == 'increase') {
          this.tipMsg = this.$t('comps.goods-info.282870-17')
        } else if (type == 'decrease') {
          this.tipMsg = this.$t('comps.goods-info.282870-18')
        }
      } else if (this.curSkuInfo && val === this.curSkuInfo.store && type == 'increase') {
        this.tipMsg = this.$t('comps.goods-info.282870-19', [this.curSkuInfo.store])
      } else {
        this.tipMsg = ''
      }

      if (!val) {
        if (type == 'increase') {
          Analytics.event(
            {
              quantity: this.quantity.toString()
            },
            'PDPaddQuantity'
          )
        } else if (type == 'decrease') {
          Analytics.event(
            {
              quantity: this.quantity.toString()
            },
            'PDPreduceQuantity'
          )
        }
      }
    },
    handleSelectGoodsColor(idx) {
      this.swiper.slideTo(idx, 1000, false)
    },
    async handleClickBuyBtn(mode) {
      if (this.buyLoading) {
        return
      }
      const { curSku, selection } = this
      if (!curSku) {
        return this.$Message.error(this.$t('comps.goods-info.282870-20'))
      }
      if (!curSku.nospec) {
        if (!selection || (!selection[0] && !selection[1])) {
          return this.$Message.error(this.$t('comps.goods-info.282870-21'))
        }
        if (selection.length) {
          if (!selection[0]) {
            return this.$Message.error(this.$t('comps.goods-info.282870-22'))
          }
          if (selection.length == 2 && !selection[1]) {
            return this.$Message.error(this.$t('comps.goods-info.282870-23'))
          }
        }
      }

      this.buyLoading = true
      try {
        let params = {
          item_id: curSku.item_id,
          shop_type: 'pointsmall',
          cart_type: mode == 'cart' ? 'cart' : 'fastbuy',
          sid: store.get('user_session_id'),
          distributor_id: curSku.distributor_id || 0,
          isAccumulate: true,
          user_id: this.userInfo ? this.userInfo.userId : -1
        }

        const info = await this.$store.dispatch('cart/addCart', {
          ...params,
          quantity: this.quantity
        })
        if (!info) {
          return
        }

        this.$emit('done', mode, info)
        /* update vuex cart info */

        if (mode !== 'fastbuy') {
          this.$EventBus.$emit('show-minicart')
          this.$Message.success(this.$t('comps.goods-info.282870-24'))
          this.handleAnalytics('addToCart', info)
          // this.$store.dispatch('cart/getCartCount')
          this.buyLoading = false
        } else {
          // await this.$api.cart.cartCheck({ mode: 'fastbuy' })
          this.$router.push('/pointitems/checkout?mode=fastbuy&order_type=normal_pointsmall')
          this.buyLoading = false
        }
      } catch (e) {
        console.log(e)
        this.buyLoading = false
      }
    },
    async handleClickCollect(type) {
      try {
        let token = S.getAuthToken()
        if (!token && !this.localCollect) {
          Analytics.dispatch('addToWishlist', this.info)
        }
        let params = {
          distributor_id: this.info.distributor_id || 0
        }
        if (type == 'collect') {
          await this.$api.member.addCollection(params, this.info.item_id)
          this.$Message.success(this.$t('comps.goods-info.282870-16'))
          this.collected = true
        } else {
          params['item_ids'] = [this.info.item_id]
          params['is_empty'] = false
          await this.$api.member.removeCollection(params)
          this.$Message.success(this.$t('comps.goods-info.282870-15'))
          this.collected = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleAnalytics() {},
    handleShowSizeChart() {
      this.showSizeChart = true
    },
    handleOpenDrawer() {
      this.showCoupon = true
      lockScreen()
      setTimeout(() => {
        this.isAnimating = true
      }, 1)
    },
    handleClose() {
      this.isAnimating = false
      lockScreen(false)
      setTimeout(() => {
        this.showCoupon = false
      }, 299)
    }
  }
}
</script>
