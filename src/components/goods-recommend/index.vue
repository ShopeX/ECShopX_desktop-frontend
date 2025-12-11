/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-goods-recommend {
  position: relative;
  .good-card__title {
    text-align: center;
    // font-size: 14px;
  }
  .good-card__content {
    text-align: center;
    .number {
      display: none;
    }
    .price {
      text-align: center;
      // font-size: 28px !important;
      font-weight: bold;
      float: none;
      color: #393939;
    }
  }
  .good-card {
    width: 100%;
    // padding: 7px;
  }
  .goods-warp {
    &:hover {
      .goods-img {
        // border: 2px solid $color-brand-primary;
        // img {
        //   max-width: 98%;
        //   max-height: 98%;
        // }
      }
    }
    .goods-img {
      @include pdt-img(296px);
    }
    .goods-title,.goods-sub-title,.goods-price {
      font-size: 16px;
      letter-spacing: 2px;
      color: $color-secondary-text;
      padding: 0 10px;
      text-align: center;
      height: 24px;
      @include text-overflow()
    }
    .goods-title{
      font-weight: 500;
      margin-top: 5px;
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
    .goods-img {
      width: 100% !important;
    }
    .recommend__btn {
      top: 30%;
      &-prev {
        left: -25px;
      }
      &-next {
        right: -25px;
      }
    }
    .goods-warp {
      &:hover {
        .goods-img {
          border-width: 0;
          img {
            max-width: 98%;
            max-height: 98%;
          }
        }
      }
    }
    .good-card__title-name {
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div class="sp-goods-recommend">
    <div class="card-list__cont" ref="mySwiper" v-swiper:recSwiper="swiperOptions">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in localData" :key="item.item_id">
          <div class="goods-warp" @mouseover="handlehover(item)" @mouseout="handleOut(item)" >
            <NuxtLink :to="`/items/${item.item_id}`" @click.native="$track('index_recommend', `/items/${item.item_id}`, item.title)">
              <div
                class="goods-img"
                :style="{'width' : '100%'}"
              >
                <img :src="resolveImgPath(item.img, 's')" alt="recommend-pic" />
              </div>
              <div class="goods-title">{{item.sub_title}}</div>
              <div class="goods-sub-title">{{item.title}}</div>
              <div class="goods-price">
                <SpPrice :value="item.price"></SpPrice>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- <a
      href="javascript:;"
      class="card-list__btn card-list__btn-prev recommend__btn recommend__btn-prev"
    ></a>
    <a
      href="javascript:;"
      class="card-list__btn card-list__btn-next recommend__btn recommend__btn-next"
    ></a> -->
  </div>
</template>

<script>
import { resolveImgPath, isArray } from '@/utils'

export default {
  name: 'SpGoodsRecommend',
  props: {
    data: [Object, Array],
    slidesPerView: {
      type: Number,
      default: 3
    },
    spaceBetween: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      localData: JSON.parse(JSON.stringify(this.data)),
      width: 0,
      swiperOptions: {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        // spaceBetween: 70,
        // slidesPerGroup: 3,
        observer: true,
        observerParents: true,
        navigation: {
          nextEl: '.recommend__btn-next',
          prevEl: '.recommend__btn-prev'
        },
        lazy: {
          loadPrevNext: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2
          }
        }
      }
    }
  },
  // computed: {
  //   swiper () {
  //     return this.$refs.mySwiper.swiper
  //   }
  // },
  mounted () {
    let count = 4
    this.width = (this.$el.clientWidth + this.spaceBetween) / count - this.spaceBetween
    window.onresize = () => {
      this.width = (this.$el.clientWidth + this.spaceBetween) / count - this.spaceBetween
    }

    for (let key in this.localData) {
      let { image_default_id, front_list_images } = this.localData[key]
      if (isArray(front_list_images) && front_list_images.length > 1) {
        this.$set(this.localData[key], 'img', front_list_images[0])
      } else {
        this.$set(this.localData[key], 'img', image_default_id)
      }
    }
  },
  methods: {
    // handleNavigation (url) {
    //   this.$router.push(url)
    // },
    resolveImgPath (url, size) {
      return resolveImgPath(url, size)
    },
    handlehover (item) {
      const { item_id } = item
      const { front_list_images } = this.localData[item_id]
      if (isArray(front_list_images) && front_list_images.length > 1) {
        this.localData[item_id].img = front_list_images[1]
      }
    },
    handleOut (item) {
      const { item_id } = item
      const { front_list_images } = this.localData[item_id]
      if (isArray(front_list_images) && front_list_images.length > 1) {
        this.localData[item_id].img = front_list_images[0]
      }
    }
  }
}
</script>
