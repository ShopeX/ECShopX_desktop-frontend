/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-goods-recommend {
  position: relative;
  .good-card__title {
    text-align: center;
  }
  .good-card__content {
    text-align: center;
    .number {
      display: none;
    }
    .price {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      float: none;
    }
  }
  .good-card {
    width: 100%;
    // padding: 7px;
    // &__img {
    //   border: 1px solid red;
    // }
  }
  &__btn{
    margin-top: 10px;
    text-align: center;
    .sp-btn{
      width: 150px;
      height: 30px;
      font-size: 16px;
      line-height: 1;
      letter-spacing: 2px;
    }
  }
  .recommend__btn {
    display: block;
    position: absolute;
    top: 35%;
    width: 80px;
    height: 70px;
    z-index: 99;
    opacity: 0.5;
    &-prev {
      background: url("~assets/imgs/rec_arr_left.png") no-repeat center center;
      left: -60px;
    }
    &-next {
      background: url("~assets/imgs/rec_arr_right.png") no-repeat center center;
      right: -64px;
    }
  }
  @include respond(sm) {
    .recommend__btn {
      top: 30%;
      &-prev {
        left: -25px;
      }
      &-next {
        right: -25px;
      }
    }
    .swiper-slide {
      &.swiper-slide-active {
        .good-card {
          padding-left: 10px !important;
          padding-right: 5px !important;
        }
      }
      &.swiper-slide-next {
        .good-card {
          padding-left: 5px !important;
          padding-right: 10px !important;
        }
      }
    }
    .good-card {
      // padding-left: 5px !important;
      // padding-right: 5px !important;

      &__img {
        // margin: 0 auto;

      }
      &__title {
        text-align: left !important;
        margin-bottom: 0;
        padding: 0 7.5px;
      }
      &__content {
        padding: 0 7.5px;
        text-align: right !important;
        margin-bottom: 0;
        .number {
          display: inline-block;
          font-size: 12px;
          font-weight: normal;
          padding-left: 4px;
        }
        .price {
          font-size: 12px;
          font-weight: normal;
          float: right;
          padding-right: 2px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="sp-goods-recommend">
    <div class="card-list__cont" v-swiper:recSwiper="swiperOptions">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in data" :key="index">
          <GoodsCard :value="item" :isSwiper="false" :spacewidth="0" @on-select="handleSelect">
            <div class="sp-goods-recommend__btn">
              <nuxt-link :to=resolveLink(item)>
                <SpButton>{{ $t('comps.goods-recommend.495083-0') }}</SpButton>
              </nuxt-link>
            </div>
          </GoodsCard>
        </div>
      </div>
    </div>
    <a
      href="javascript:;"
      class="card-list__btn card-list__btn-prev recommend__btn recommend__btn-prev"
    ></a>
    <a
      href="javascript:;"
      class="card-list__btn card-list__btn-next recommend__btn recommend__btn-next"
    ></a>
  </div>
</template>

<script>
import GoodsCard from './goods-card'
import { analytics } from '@/plugins/analytics'
export default {
  name: 'SpGoodsRecommend',
  props: {
    data: Array,
    slidesPerView: {
      type: Number,
      default: 3
    },
    spaceBetween: {
      type: Number,
      default: 0
    }
  },
  components: { GoodsCard },
  data () {
    return {
      swiperOptions: {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        // spaceBetween: 70,
        // slidesPerGroup: 3,
        navigation: {
          nextEl: '.recommend__btn-next',
          prevEl: '.recommend__btn-prev'
        },
        lazy: {
          loadPrevNext: true
        },
        breakpoints: {
          768: {
            // slidesPerGroup: 2,
            slidesPerView: 2
            // spaceBetween: 7
          }
        }
      }
    }
  },
  methods: {
    handleSelect (info) {
      analytics.event({
        product: [{
          id: info.item_id,
          style: info.bn,
          name: info.title
        }]
      }, 'productRecommendationClick')
    },
    resolveLink (item) {
      const { item_id } = item
      return `/items/${item_id}`
    }
  }
}
</script>
