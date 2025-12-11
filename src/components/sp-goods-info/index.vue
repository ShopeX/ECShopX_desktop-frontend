/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-goods-info {
  @include clearfix();
  .goodsinfo-left {
    float: left;
    width: 410px;
    .goods-imgs {
      width: 410px;
      height: 410px;
    }
    .goods-img-swiper {
      margin: 10px 0;
      width: 410px;
      padding: 0 20px;
      position: relative;
      .goods-imgs__slider {
        // margin-left: 30px;
      }
      .ec-icon-back {
        position: absolute;
        left: 0;
        top: 32px;
      }
      .ec-icon-right {
        position: absolute;
        right: 0;
        top: 32px;
      }
      .swiper-button-disabled {
        color: #d8d8d8;
      }
    }
  }
  .slider-item {
    overflow: hidden;
    height: 85px;
  }
  .goodsinfo-right {
    float: left;
    width: 765px;
    margin-left: 10px;
    .goodsinfo-hd {
      margin-bottom: 10px;
      @include clearfix();
    }
  }
  .goods-title {
    font-size: 18px;
    color: #646464;
    @include multi-ellipsis(2);
    width: 600px;
    float: left;
  }
  .btn-collect {
    float: right;
    cursor: default;
  }
  .goodsinfo-f {
    background-color: #f5f5f5;
    padding: 20px 15px;
    margin-bottom: 20px;
    .r-w {
      @include clearfix();
      height: 30px;
      line-height: 30px;
    }
    .r-c-label {
      float: left;
      color: #888;
      margin-right: 10px;
      background: #fa5eef;
      color: #fff;
      font-size: 12px;
      border-radius: 2px;
      height: 20px;
      line-height: 20px;
      margin-top: 4px;
      padding: 0 2px;
    }
    .sp-price {
      float: left;
      .price__symbol {
        font-size: 20px;
      }
      .price__int {
        font-size: 26px;
      }
      .price__decimal {
        font-size: 26px;
      }
    }
    .market-price {
      margin-left: 10px;
      margin-top: 3px;
    }
    .open-vip {
      font-size: 12px;
      margin-top: 4px;
      .vip-name {
        padding: 2px;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
      }
      .vip-discount {
        padding: 2px;
        color: #fff;
        border-radius: 4px;
      }
      .vip-desc {
        color: #888;
      }
      .espier-icon-xiangyou-01 {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .promation {
    @include clearfix();
    margin-top: 20px;
    &-label {
      float: left;
      width: 68px;
      color: #888;
    }
    &-values {
      float: left;
    }
    .promat-item {
      @include clearfix();
      margin-bottom: 12px;
    }
    .promat-label {
      float: left;
      width: 40px;
      height: 15px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      margin-right: 15px;
      line-height: 15px;
      margin-top: 2px;
    }
    .promat-name {
      float: left;
      font-size: 12px;
      color: #888;
      margin-top: 1px;
    }
  }
  .goodsinfo-coupons {
    display: flex;
    margin-bottom: 30px;
    padding: 20px 52px 10px 24px;
    background: linear-gradient(to bottom, #ffeff3 74%, #fffcfd);
    .coupons-item_hd {
      width: 70px;
      float: left;
      color: #888;
    }
    .coupons-item_bd {
      width: 100%;
      &-info {
        display: flex;
        align-items: center;
        position: relative;
      }
      .coupongBtn {
        margin-top: 40px;
        cursor: pointer;
        text-align: center;
        color: #e7777f;
      }
      &-img {
        width: 90px;
      }
      &-content {
        display: flex;
        margin: 0 10px;
        .discount_title_price {
          display: flex;
        }
      }
      .center-coupon-item__price-num {
        font-family: PingFang SC, Microsoft YaHei, '微软雅黑', Hiragino Sans GB, sans-serif;
        .price__int {
          color: #000;
          font-size: 14px !important;
          font-weight: normal !important;
        }
        .price__decimal {
          color: #000;
          font-size: 14px !important;
          font-weight: normal !important;
        }
      }
      &-footer {
        color: #d9001b;
        text-decoration: underline;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
      .receive {
        color: #ec808d;
      }
    }
  }
  .goodsinfo-skus {
    margin-top: 20px;
  }
  .goodsinfo-ft {
    @include clearfix();
    margin-bottom: 20px;
    .sp-num-input {
      float: left;
      margin-right: 15px;
      height: 40px !important;
      &__input {
        height: 40px;
      }
      &__btn {
        height: 40px;
        line-height: 40px;
      }
    }
    .buy-toolbar {
      float: left;
    }
  }
}
</style>
<template>
  <div class="sp-goods-info">
    <div class="goodsinfo-left">
      <div class="goods-imgs">
        <SpPhotoZoom :url="info.pics[curImgIndex]" />
      </div>
      <div class="goods-img-swiper">
        <div class="goods-imgs__slider" v-swiper:imgs="swiperOptions" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img, idx) in info.pics" :key="idx">
              <div
                class="slider-item"
                :class="{ 'is-active': curImgIndex === idx }"
                @click="handleClickImg(idx)"
              >
                <img class="slider-item__img" :src="img" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-back"></div>
        <div class="goods-imgs__slider-btn ec-icon ec-icon-right"></div>
      </div>
    </div>
    <div class="goodsinfo-right">
      <div class="goodsinfo-hd">
        <div class="goods-title">{{ info.item_name }}</div>
        <div class="btn-collect" @click="handleClickCollect">
          <i
            class="ec-icon"
            :class="collected ? 'ec-icon-favorfill' : 'ec-icon-favor'"
            :style="{
              color: theme
            }"
          ></i>
          <span>{{ collected ? $t('sp-goods-info.index.091195-1') : $t('sp-goods-info.index.091195-2') }}</span>
        </div>
      </div>
      <div class="goodsinfo-f">
        <div class="r-w">
          <div class="r-c-label">{{ FilterPriceLabel(info) }}</div>
          <SpPrice :value="filterPrice(info)" size="large" />
          <SpPrice class="market-price" :value="(curSku ? curSku.market_price : info.market_price) / 100" />
        </div>
        <div class="r-w open-vip" v-if="info.vipgrade_guide_title">
          {{ $t('sp-goods-info.index.091195-3') }}
          <span class="vip-name">{{ info.vipgrade_guide_title.vipgrade_name }}</span>
          <span
            class="vip-discount"
            :style="{
              backgroundColor: theme
            }"
            >{{ $t('sp-goods-info.index.091195-4') }}{{ info.vipgrade_guide_title.gradeDiscount }}{{ $t('sp-goods-info.index.091195-5') }}</span
          >
          <nuxt-link to="/member/vip">
            <span class="vip-desc"
              >{{ info.vipgrade_guide_title.guide_title_desc }}
              <i class="espier-icon espier-icon-xiangyou-01"></i>
            </span>
          </nuxt-link>
        </div>
      </div>
      <div class="goodsinfo-coupons" v-if="showCouponsList.length > 0">
        <div class="coupons-item_hd">{{ $t('sp-goods-info.index.091195-6') }}</div>
        <div class="coupons-item_bd">
          <div v-for="(item, index) in showCouponsList" :key="index" class="coupons-item_bd-info">
            <img
              class="coupons-item_bd-img"
              v-if="item.card_type == 'cash'"
              src="@/assets/imgs/conpon_cash.png"
              alt=""
            />
            <img
              class="coupons-item_bd-img"
              v-if="item.card_type == 'discount'"
              src="@/assets/imgs/conpon_discount.png"
              alt=""
            />
            <div class="coupons-item_bd-content">
              <p v-if="item.card_type == 'discount'" class="discount_title_price">
                {{ 10 - item.discount / 10 }}{{ $t('sp-goods-info.index.091195-7') }}
              </p>
              <p v-if="item.card_type == 'cash'" class="discount_title_price">
                <SpPrice
                  class="center-coupon-item__price-num"
                  unit="cent"
                  :symbol="''"
                  :value="item.reduce_cost"
                ></SpPrice
                >{{ $t('sp-goods-info.index.091195-8') }}
              </p>
              <p v-if="item.least_cost > 0">
                {{ $t('sp-goods-info.index.091195-9') }}<SpPrice
                  class="center-coupon-item__price-num"
                  unit="cent"
                  :symbol="''"
                  :value="item.least_cost"
                ></SpPrice
                >{{ $t('sp-goods-info.index.091195-10') }}
              </p>
              <p v-if="item.least_cost < 0 || item.least_cost == 0">{{ $t('sp-goods-info.index.091195-11') }}</p>
            </div>
            <p
              class="coupons-item_bd-footer "
              v-if="info.getted != 1 && info.getted != 2"
              @click="handleReceive(item)"
            >
              {{ $t('sp-goods-info.index.091195-12') }}
            </p>
            <p class="coupons-item_bd-footer receive" v-else-if="info.getted == 1">{{ $t('sp-goods-info.index.091195-13') }}</p>
          </div>
          <div v-if="couponsList.length > 4">
            <p @click="handleOpenCoupon" class="coupongBtn">
              {{ couponsBtn ? $t('sp-goods-info.index.091195-14') : $t('sp-goods-info.index.091195-15') }}
              <i v-if="couponsBtn" class="espier-icon espier-icon-xiangxia-01"></i>
              <i v-else class="espier-icon espier-icon-xiangshang-01"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="promation" v-if="info.promotion_activity">
        <div class="promation-label">{{ $t('sp-goods-info.index.091195-16') }}</div>
        <div class="promation-values">
          <div
            class="promat-item"
            v-for="(promat, index) in info.promotion_activity"
            :key="`promat-item__${index}`"
          >
            <div
              class="promat-label"
              :style="{
                backgroundColor: theme
              }"
            >
              {{ promat.promotion_tag }}
            </div>
            <div class="promat-name">{{ promat.marketing_name }}</div>
          </div>
        </div>
      </div>
      <div class="goodsinfo-skus" v-if="!info.nospec">
        <SpSkuPicker :info="info" :theme="theme" @change="handleChangeSku" />
      </div>
      <!-- <div>
        库存
      </div> -->
      <div class="goodsinfo-ft">
        <SpNumInput size="sm" width="50" v-model="quantity" />
        <BuyToolbar :info="info" :theme="theme" @onAddToCart="handleClickAddCart" />
      </div>
    </div>
  </div>
</template>

<script>
const swiperOptions = {
  slidesPerView: 4,
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
import S from '@/spx'
import BuyToolbar from './buy-toolbar'
export default {
  name: 'SpGoodsInfo',
  props: {
    info: Object,
    theme: String
  },
  components: {
    BuyToolbar
  },
  data() {
    return {
      curImg: null,
      curImgIndex: 0,
      swiperOptions,
      quantity: 1,
      curSku: null,
      selection: null,
      collected: false,
      couponsList: [],
      couponsBtn: true
    }
  },
  filters: {
   
    FilterPrice(info) {
      const { act_price, activity_info, member_price, price } = info
      if (activity_info) {
        return act_price / 100
      } else if (member_price) {
        return member_price / 100
      } else {
        return price / 100
      }
    }
  },
  created() {
    const { nospec } = this.info
    if (nospec) {
      this.curSku = this.info
    }
    this.getConponList()
  },
  mounted() {
    if (S.getAuthToken()) {
      this.getCollectionList()
    }
  },
  computed: {
    showCouponsList: {
      get() {
        if (this.couponsBtn) {
          if (this.couponsList.length < 4) {
            return this.couponsList
          }
          let newArr = []
          for (let i = 0; i < 4; i++) {
            newArr.push(this.couponsList[i])
          }
          return newArr
        }
        return this.couponsList
      },
      set(val) {
        this.showCouponsList = val
      }
    }
  },
  methods: {
    FilterPriceLabel(info) {
      const { act_price, member_price } = info

      if (act_price) {
        return this.$t('sp-goods-info.index.091195-17')
      } else if (member_price) {
        return this.$t('sp-goods-info.index.091195-18')
      } else {
        return this.$t('sp-goods-info.index.091195-19')
      }
    },
    async handleClickCollect() {
      const { distributor_id, item_id } = this.info
      if (this.collected) {
        await this.$api.member.removeCollection({
          distributor_id,
          item_ids: [item_id],
          is_empty: false
        })
        this.$Message.success(this.$t('sp-goods-info.index.091195-20'))
        this.collected = false
      } else {
        await this.$api.member.addCollection(
          {
            distributor_id
          },
          item_id
        )
        this.$Message.success(this.$t('sp-goods-info.index.091195-21'))
        this.collected = true
      }
    },
    filterPrice() {
      const { activity_info } = this.info
      console.log('this.curSku', this.curSku)
      const { price, member_price, act_price } = this.curSku || {}
      if (activity_info && act_price) {
        return act_price / 100
      } else if (member_price) {
        return member_price / 100
      } else {
        return price / 100
      }
    },
    handleClickImg(index) {
      this.curImgIndex = index
    },
    handleChangeSku(sku, selection) {
      this.curSku = sku
      this.selection = selection
    },
    async getCollectionList() {
      const { distributor_id, item_id } = this.info
      const { list } = await this.$api.member.getCollectionList({
        distributor_id
      })
      const fd = list.find((item) => item.item_id == item_id)
      if (fd) {
        this.collected = true
      }
    },
    async handleClickAddCart(mode) {
      if (!this.curSku) {
        this.$Message.error(this.$t('sp-goods-info.index.091195-22'))
        return
      }
      const { distributor_id } = this.info
      const { item_id } = this.curSku
      await this.$store.dispatch('cart/CART_ADD', {
        item_id,
        shop_type: 'distributor',
        cart_type: mode,
        distributor_id,
        quantity: this.quantity
      })
      if (mode == 'cart') {
        this.$Message.success(this.$t('sp-goods-info.index.091195-23'))
      } else {
        // this.$router.push('/cart/checkout?mode=fastbuy')
        let url = `/cart/checkout?mode=fastbuy&id=${distributor_id}`
        if (this.info.activity_type === 'seckill') {
          this.$api.cart
            .geticket({
              item_id: item_id,
              seckill_id: this.info.activity_info.seckill_id,
              num: this.quantity
            })
            .then((res) => {
              url = `${url}&seckill_id=${this.info.activity_info.seckill_id}&ticket=${res.ticket}&order_type=normal_seckill`
              this.$router.push(url)
            })
        } else {
          this.$router.push(url)
        }
      }
    },
    async getConponList() {
      const { distributor_id, itemId } = this.info
      const coupons = await this.$api.cart.cardList({
        distributor_id,
        end_date: 1,
        item_id: itemId,
        page_size: 999
      })
      coupons.list.forEach((item, index) => {
        if (item.get_limit - item.user_get_num <= 0) {
          coupons.list[index].getted = 1
        } else if (item.quantity - item.get_num <= 0) {
          coupons.list[index].getted = 2
        } else {
          coupons.list[index].getted = 0
        }
      })
      this.couponsList = coupons.list
      console.log('this.couponsList+++++', this.couponsList)
    },
    // 领取优惠券
    async handleReceive(item) {
      await this.$api.cart.receiveCard({
        card_id: item.card_id
      })
      this.$Message.success(this.$t('sp-goods-info.index.091195-24'))
      this.getConponList()
    },
    // 展开优惠券
    async handleOpenCoupon() {
      this.couponsBtn = !this.couponsBtn
    }
  }
}
</script>