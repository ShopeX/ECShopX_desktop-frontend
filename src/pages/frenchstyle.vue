/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-story {
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
  .story-wall {
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
  <div class="page-story page-body">
    <div class="page-story__nav article-title">
      <div class="title">{{ $t('pages.frenchstyle.559828-0') }}</div>
    </div>
    <div class="story-wall pc">
      <div class="swiper swiperBox" v-swiper:recSwiper="swiperOptions">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_1.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_2.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_3.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_4.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_5.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_6.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_7.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_8.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_9.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_10.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_11.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_12.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_13.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_14.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_15.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_16.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_17.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_18.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_19.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_20.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img src="~/assets/imgs/resource/201911/pc/fsfg/2020SS_LOOKBOOK_21.jpg" alt />
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
    //     pageName: this.$t('pages.frenchstyle.559828-0'),
    //     pageType: 'content',
    //     breadcrumb: this.$t('pages.frenchstyle.559828-0')
    //   }
    // })
  },
  methods: {}
}
</script>
