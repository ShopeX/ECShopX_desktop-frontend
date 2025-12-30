/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='./goods-info.scss'></style>

<template>
  <div class="goods-info">
    <div class="goods-imgs" v-if="images">
      <div class="goods-imgs__pan">
        <SpPhotoZoom :url="curImg"></SpPhotoZoom>
      </div>

      <div class="goods-imgs__slider-wrap">
        <div class="goods-imgs__slider" v-swiper:imgs="swiperOptions" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, idx) in images" :key="idx">
              <div class="slider-item" :class="{ 'is-active': curImgIdx === idx }" @click="handleClickImg(idx)">
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
        <div class="collect-wrap">
          <div class="collect-btn" v-if="!collected" @click="handleClickCollect('collect')">
            <i class="ec-icon ec-icon-favor"></i>
            <span>{{ $t('comps.goods-info.991145-0') }}</span>
          </div>
          <div class="collect-btn cancel" v-else @click="handleClickCollect('cancel')">
            <i class="ec-icon ec-icon-favorfill"></i>
            <span>{{ $t('comps.goods-info.991145-1') }}</span>
          </div>
        </div>
      </div>
      <div class="goods-brief">{{ info.brief }}</div>

      <div class="tag-wrap" v-if="activityText">
        <span class="goods-tag">{{ activityText }}</span>
        <span class="goods-tag" v-if="info.activity_type == 'group'">{{ info.activity_info.person_num }}{{ $t('comps.goods-info.991145-2') }}</span>
      </div>

      <div class="goods-prices__wrap">
        <div class="goods-prices" v-show="showprice">
          <template v-if="curSkuInfo">
            <span class="price-text">{{ $t('comps.goods-info.991145-3') }}</span>
            <span class="sale-price">{{ curSkuInfo | priceFilter }}</span>
            <!-- <SpPrice class="price-primary" :value="curSkuInfo.price" /> -->
            <span class="price-mkt-box" v-if="curSkuInfo.price != curSkuInfo.market_price">
              <!-- 原价: -->
              {{ curSkuInfo | marketPriceFilter }}
              <!-- <span class="mkt-price">{{curSkuInfo | marketPriceFilter}}</span> -->
              <!-- <SpPrice class="mktprice-primary" :value="curSkuInfo.market_price" /> -->
            </span>
          </template>
          <template v-else>
            <span class="price-text">{{ $t('comps.goods-info.991145-3') }}:</span>
            <span class="sale-price">{{ info | priceFilter }}</span>
            <!-- <SpPrice class="price-primary" :value="info.price" /> -->
            <span class="price-mkt-box" v-if="info.price != info.market_price">
              <!-- 原价: -->
              {{ info | marketPriceFilter }}
              <!-- <span class="mkt-price">{{info | marketPriceFilter}}</span> -->
              <!-- <SpPrice class="mktprice-primary" :value="info.market_price" /> -->
            </span>
          </template>
        </div>

        <div class="goods-coupon clearfix">
          <span class="goods-coupon__title">{{ $t('comps.goods-info.991145-5') }}</span>
          <div class="goods-coupon__list" :class="{ 'has-more': couponList.length > 3 }">
            <SpLabel v-for="(coupon, index) in couponList" :key="coupon.card_id" v-if="index < 3">{{ coupon.title }}</SpLabel>
            <span class="more" @click="handleOpenDrawer">{{ $t('comps.goods-info.991145-6') }}>></span>
          </div>
        </div>

        <no-ssr>
          <!-- 促销信息 -->
          <div class="goods-promotion__wrap clearfix" v-if="info.promotion_activity || info.vipgrade_guide_title">
            <span class="goods-promotion__title">{{ $t('comps.goods-info.991145-7') }}</span>
            <div class="goods-promotion__info">
              <div class="vip-guide" v-if="info.vipgrade_guide_title">
                <SpPrice class="vip-guide__price" :value="info.vipgrade_guide_title.memberPrice" v-if="info.vipgrade_guide_title.memberPrice"></SpPrice>
                <span class="vip-guide__discount" v-if="info.vipgrade_guide_title.gradeDiscount">{{ info.vipgrade_guide_title.gradeDiscount }}{{ $t('comps.goods-info.991145-8') }}</span>
                <span class="vip-guide__tag" v-if="info.vipgrade_guide_title.gradeDiscount">{{ info.vipgrade_guide_title.vipgrade_desc }}</span>
                <span class="vip-guide__desc">{{ info.vipgrade_guide_title.guide_title_desc }}</span>
                <span class="icon-wrap"><i class="ec-icon ec-icon-playfill"></i></span>
              </div>

              <div class="goods-promotion" v-if="info.promotion_activity">
                <i class="ec-icon ec-icon-unfold" v-if="info.promotion_activity.length > 2"></i>
                <i class="ec-icon ec-icon-unfold down" v-if="info.promotion_activity.length > 2"></i>
                <div class="goods-promotion__item" @click="linkPromotion(item.marketing_id)" v-for="item in info.promotion_activity" :key="item.marketing_id">
                  <SpLabel>{{ item.promotion_tag }}</SpLabel>
                  <span class="goods-promotion__name">{{ item.marketing_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </no-ssr>
      </div>
      <!-- 秒杀相关倒计时 一期搁置-->
  <!-- <div class="">
        <p v-if="info.activity_info.status === 'in_the_notice'||info.activity_info.show_status === 'nostart'">
          距开始还剩 <Timer :timer='timer'></Timer>
        </p>
        <p v-if="info.activity_info.status === 'in_sale'||info.activity_info.show_status === 'noend'">
          距结束还剩
        </p>
          <Timer :timer='timer'></Timer>
      </div> -->
      <div class="goods-selector">
        <!-- sku选择 -->
        <SkuSelector :info="info" @selection="handleUpdateImgs" @change="handleChangeSku" />
        <!-- <div class="goods-fav" v-if="info.product_type!='lucky' && info.approve_status!='instock'">
        <a href="javascript:;" @click="handleToggleFav(info.item_id)">
          <template v-if="localCollect">
            <i class="mb-iconfont mb-iconfont-heart"></i><span>已收藏</span>
          </template>
          <template v-else>
            <i class="mb-iconfont mb-iconfont-heart-o"></i><span>立即收藏</span>
          </template>
        </a>
      </div> -->
      </div>

      <!-- 数量选择 -->
      <div class="goods-num clearfix">
        <!-- <div class="goods-num__hd">数量</div> -->
        <div class="goods-num__bd">
          <SpNumInput :max="curSkuInfo ? curSkuInfo.store : info.store" v-model="quantity" @increase="handleClickNumInput($event, 'increase')" @decrease="handleClickNumInput($event, 'decrease')" @change="handleClickNumInput($event, 'change')" />
          <div class="goods-stock" >
            <template v-if="curSkuInfo">
                <span v-if="curSkuInfo.store > 0">{{ $t('comps.goods-info.991145-9') }}{{ curSkuInfo.store }}</span>
              <span v-else>{{ $t('comps.goods-info.991145-10') }}</span>
            </template>
              
            </te>
          </div>
          <span v-if="purchaseLimitCheck" class="limit-buy">{{ $t('comps.goods-info.991145-11') }}{{ info.activity_info.describe }}</span>
          <BuyToolbar :info="info" :activity-text="activityText" :buyLoading="buyLoading" :collected="collected" @btn-click="(type) => handleClickBuyBtn(type)"  class="goods-buybar"/>
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
        <span class="btn-close" @click="showSizeChart = false">{{ $t('comps.goods-info.991145-12') }}</span>
        <div class="size-guide__inner">
          <img :src="info.size_guide" />
        </div>
      </div>
    </transition>

    <div class="sp-drawer" :class="{ show: isAnimating }" v-if="showCoupon">
      <div class="sp-drawer__cover"></div>
      <div class="sp-drawer__content">
        <div class="sp-drawer__header">
          <span>{{ $t('comps.goods-info.991145-5') }}</span>
          <i class="ec-icon ec-icon-close" @click="handleClose"></i>
        </div>
        <div class="coupon-list">
          <div class="coupon-item" v-for="item in couponList" :key="item.card_id">
            <div class="coupon-price" v-if="item.card_type == 'discount'">{{ (100 - item.discount) / 10 }}<span class="text">{{ $t('comps.goods-info.991145-8') }}</span></div>
            <div class="coupon-price" v-if="item.card_type == 'cash'">
              <SpPrice class="coupon-price__num" unit="cent" :value="item.reduce_cost"></SpPrice>
              <span class="text">{{ $t('comps.goods-info.991145-5') }}</span>
            </div>
            <div class="coupon-price" v-if="item.card_type == 'gift'">{{ $t('comps.goods-info.991145-13') }}</div>
            <div class="coupon-title">{{ item.title }}</div>
            <div class="coupon-time">{{ $t('comps.goods-info.991145-14') }}{{ handleDatetime(item.begin_date) }}{{ $t('comps.goods-info.991145-15') }}{{ handleDatetime(item.end_date) }}</div>
            <div class="option-btn" :class="{ invalid: item.getted > 0 }" @click="handleClickCoupon(item)">
              <span v-if="item.getted == 0">{{ $t('comps.goods-info.991145-16') }}</span>
              <span v-if="item.getted == 1">{{ $t('comps.goods-info.991145-17') }}</span>
              <span v-if="item.getted == 2">{{ $t('comps.goods-info.991145-18') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition> </transition>
  </div>
</template>

<script>
// import { SpNumInput, SpSocialShare } from '@/components'
// import SkuSelector from '@/components/sku-selector'
// import SpPhotoZoom from '@/components/photo-zoom'
import BuyToolbar from './buy-toolbar'
import GoodsAccordion from './goods-accordion'
import Timer from './timerIndex'

import store from 'store'
import { mixins, resolveLazyLoadImg, log, calcTimer, formatTime } from '@/utils'
import { Analytics } from '@/service'
import S from '@/spx'
import { lockScreen } from '@/utils/dom'

export default {
  // 抽屉类型
  ctype: 'drawer',
  components: {
    BuyToolbar,
    GoodsAccordion,
    Timer
  },
  props: {
    isModal: Boolean,
    info: {
      type: Object,
      default: {},
    },
    from: String,
    showprice: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const swiperOptions = {
      slidesPerView: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '.ec-icon-right',
        prevEl: '.ec-icon-back',
      },
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        768: {
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
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
      isAnimating: false,
      timer: {},
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
    },
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
      }

      return `￥${(price / 100).toFixed(2)}`
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
      return `￥${(price / 100).toFixed(2)}`
    },
  },
  created() {
    const { item_id, item_name, brief: description, pics, price } = this.info

    const shareInfo = {
      item_id,
      title: item_name,
      description,
      image: pics && pics.length > 0 ? pics[0] : '',
      price,
    }
    this.shareInfo = shareInfo
    const { user } = this.$store.state
    if (user && user.userInfo && user.userInfo.memberInfo && user.userInfo.memberInfo.user_id) {
      // this.getCollectInfo(item_id, user.userInfo.memberInfo.user_id)
      this.getCollectionList()
    }
    this.getCardList()
  },
  created () {
   const { item_id, pics, activity_type, spec_images, spec_items, nospec, activity_info } = this.info
    let timer
    if (activity_type === 'group') {
      timer = calcTimer(activity_info.remaining_time)
    }
    if (activity_type === 'seckill' ||activity_type === 'limited_time_sale') {
      timer = calcTimer(activity_info.last_seconds)
    }
    this.timer = timer
    if (activity_type === 'group') {
      this.activityText = this.$t('comps.goods-info.991145-19')
      this.info.startActivity = activity_info.show_status === 'noend'
    } else if (activity_type === 'seckill') {
      this.activityText = this.$t('comps.goods-info.991145-20')
      this.info.startActivity = activity_info.status === 'in_sale'
    } else if (activity_type === 'limited_time_sale') {
      this.activityText = this.$t('comps.goods-info.991145-21')
      this.info.startActivity = activity_info.status === 'in_sale'
    }
    // 图片规格
    if (spec_images.length > 0) {
      let specImages = {}
      spec_images.forEach((item) => {
        specImages[item.spec_value_id] = {
          url: item.spec_image_url,
          urlList: item.item_image_url,
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
  },
  mounted() {
    
  },
  methods: {
    async getCardList() {
      let params = {
        page_no: 1,
        page_size: 1000,
        end_date: 1,
        distributor_id: this.info.distributor_id,
        item_id: this.info.item_id,
      }
      const { list } = await this.$api.cart.cardList(params)
      list.map((item) => {
        if (item.get_limit - item.user_get_num <= 0) {
          item.getted = 1
        } else if (item.quantity - item.get_num <= 0) {
          item.getted = 2
        } else {
          item.getted = 0
        }
      })
      this.couponList = list
    },
    async handleClickCoupon(item) {
      if (item.getted > 0) {
        return
      }
      let params = {
        card_id: item.card_id,
      }
      const data = await this.$api.cart.receiveCard(params)
      this.$Message.success(this.$t('comps.goods-info.991145-22'))
      this.getCardList()
    },
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
      const { list } = await this.$api.member.getCollectionList({ distributor_id: this.info.distributor_id || 0 })
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
        userId,
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
          this.$Message.success(this.$t('comps.goods-info.991145-23'))
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
                  discountCode: '',
                },
              ],
            },
            'addToWishlist'
          )
          await this.$api.member.favoriteItemAdd({ item_id: item_id })
          this.$Message.success(this.$t('comps.goods-info.991145-24'))
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
          this.tipMsg = this.$t('comps.goods-info.991145-25')
        } else if (type == 'decrease') {
          this.tipMsg = this.$t('comps.goods-info.991145-26')
        }
      } else if (this.curSkuInfo && val === this.curSkuInfo.store && type == 'increase') {
        this.tipMsg = this.$t('comps.goods-info.991145-27', [this.curSkuInfo.store])
      } else {
        this.tipMsg = ''
      }

      if (!val) {
        if (type == 'increase') {
          Analytics.event(
            {
              quantity: this.quantity.toString(),
            },
            'PDPaddQuantity'
          )
        } else if (type == 'decrease') {
          Analytics.event(
            {
              quantity: this.quantity.toString(),
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
        return this.$Message.error(this.$t('comps.goods-info.991145-28'))
      }
      if (!curSku.nospec) {
        if (!selection || (!selection[0] && !selection[1])) {
          return this.$Message.error(this.$t('comps.goods-info.991145-29'))
        }
        if (selection.length) {
          if (!selection[0]) {
            return this.$Message.error(this.$t('comps.goods-info.991145-30'))
          }
          if (selection.length == 2 && !selection[1]) {
            return this.$Message.error(this.$t('comps.goods-info.991145-31'))
          }
        }
      }

      this.buyLoading = true
      try {
        let params = {
          item_id: curSku.item_id,
          shop_type: 'distributor',
          cart_type: mode == 'cart' ? 'cart' : 'fastbuy',
          sid: store.get('user_session_id'),
          distributor_id: curSku.distributor_id || 0,
          isAccumulate: true,
          user_id: this.userInfo ? this.userInfo.userId : -1,
        }

        // 离线购物车
        // const info = await this.$api.cart.add(
        //   params,
        //   this.quantity
        // )
        const info = await this.$store.dispatch('cart/addCart', { ...params, quantity: this.quantity })
        
        if (!info) {
          return
        }

        this.$emit('done', mode, info)
        /* update vuex cart info */
        this.$store.commit('user/setUserSessionId', info.user_ident)
        this.$store.dispatch('cart/getCartInfo')

        if (mode !== 'fastbuy') {
          this.$EventBus.$emit('show-minicart')
          this.$Message.success(this.$t('comps.goods-info.991145-32'))
          // this.handleAnalytics('addToCart', info)
          this.$store.dispatch('cart/CART_GETINFO')
          this.buyLoading = false
        } else {
          // await this.$api.cart.cartCheck({ mode: 'fastbuy' })
          let url='/cart/checkout?mode=fastbuy'
          if(this.info.activity_type === 'seckill'){
            this.$api.cart.geticket({
              item_id:params.item_id,
              seckill_id:this.info.activity_info.seckill_id,
              num:this.quantity
            }).then(res=>{
              url=`${url}&seckill_id=${this.info.activity_info.seckill_id}&ticket=${res.ticket}&order_type=normal_seckill`
              this.$router.push(url)
            })
            
          }else{
            this.$router.push(url)
          }
          
          this.handleAnalytics('buyNow', info)
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
          distributor_id: this.info.distributor_id || 0,
        }
        if (type == 'collect') {
          await this.$api.member.addCollection(params, this.info.item_id)
          this.$Message.success(this.$t('comps.goods-info.991145-24'))
          this.collected = true
        } else {
          params['item_ids'] = [this.info.item_id]
          params['is_empty'] = false
          await this.$api.member.removeCollection(params)
          this.$Message.success(this.$t('comps.goods-info.991145-23'))
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
    },
  },
}
</script>
