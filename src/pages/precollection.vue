/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-precollection {
  // padding-bottom: 100px;
  &__nav {
    text-align: left;
    margin: 48px 0 38px;
    .title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  .precollection-wall {
    max-width: 1150px;
    font-size: 0;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .swiper-pagination-bullet {
    background: transparent;
    border: 1px solid #000;
  }
  .swiper-pagination-bullet-active {
    background: #000;
  }
}
</style>

<template>
  <div class="page-precollection page-body">
    <div class="page-precollection__nav article-title">
      <div class="title">SS//20 PRE COLLECTION</div>
    </div>
    <div class="precollection-wall pc">
      <div class="swiper swiperBox" v-swiper:recSwiper="swiperOptions">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/prec/prec1.jpg" alt />
          </div>
          <div class="swiper-slide">
            <nuxt-link :to="`/items/179`">
              <img src="~/assets/imgs/resource/201911/pc/prec/prec2.jpg" alt />
            </nuxt-link>
          </div>
          <div class="swiper-slide">
            <nuxt-link :to="`/items/182`">
              <img src="~/assets/imgs/resource/201911/pc/prec/prec3.jpg" alt />
            </nuxt-link>
          </div>
          <div class="swiper-slide">
            <nuxt-link :to="`/items/181`">
              <img src="~/assets/imgs/resource/201911/pc/prec/prec4.jpg" alt />
            </nuxt-link>
          </div>
          <div class="swiper-slide">
            <nuxt-link :to="`/items/183`">
              <img src="~/assets/imgs/resource/201911/pc/prec/prec5.jpg" alt />
            </nuxt-link>
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-black"></div>
        <div class="swiper-button-next swiper-button-black"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {
      swiperOptions: {
        // slidesPerView: 1,
        // spaceBetween: 0,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        lazy: {
          loadPrevNext: true
        }
      },
      picLen: 2
    }
  },
  components: {},
  mounted() {
    // analytics.pageReady({
    //   page: {
    //     pageName: '法式风格',
    //     pageType: 'content',
    //     breadcrumb: '法式风格'
    //   }
    // })
  },
  methods: {}
}
</script>
