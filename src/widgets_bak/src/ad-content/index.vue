/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */


<style lang="scss">
.wdget-pinpai {
  text-align: center;
  margin-bottom: 50px;
  .wdget-title {
    margin-bottom: 10px !important;
  }
  ul {
    display: inline-block;
    li {
      float: left;
      // width: 254px;
      width: 220px;
      padding: 0 5px;
      .pinpai-desc {
        font-size: 14px;
        margin: 10px 0 5px;
        @include text-overflow();
      }
    }
  }
  .img-list {
    // width: 254px;
    // height: 254px;
    margin: 0 auto;
    width: 210px;
    height: 262px;
    text-align: center;
    position: relative;
    overflow: hidden;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .img-warp {
    text-align: center;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .swiperBox_pinpai {
    display: none;
  }
  @include respond(sm) {
    .pc {
      display: none;
    }
    .swiperBox_pinpai {
      display: block;
      position: relative;
      .goodsstory__btn {
        position: absolute;
        top: 35%;
        width: 80px;
        height: 70px;
        z-index: 99;
        opacity: 0.7;
      }
    }
    .wdget-title {
      margin-bottom: 25px !important;
    }
    .pinpai-desc {
      font-size: 14px;
      margin: 10px auto 5px;
      @include text-overflow();
    }
    .goodsstory__btn-prev {
      background: url("~assets/imgs/banner_arr_left.png") no-repeat center center;
      left: -25px;
    }
    .goodsstory__btn-next {
      background: url("~assets/imgs/banner_arr_right.png") no-repeat center center;
      right: -25px;
    }
  }
}
</style>

<template>
  <div class="wdget-pinpai">
    <div class="wdget-title">
      <nuxt-link to="/news">品牌动态</nuxt-link>
    </div>
    <ul class="clearfix pc">
      <li v-for="item in params.data.articleList" :key="item.article_id">
        <nuxt-link :to="`/article/detail/${item.article_id}`">
          <div class="img-list" :style="{'height': width_pc * 1.2825 + 'px'}">
            <img v-lazy="item.article_logo" alt="ad-content" />
          </div>
          <div class="pinpai-desc">{{item.title}}</div>
        </nuxt-link>
      </li>
    </ul>
    <div
      class="wdget-banner swiper swiperBox_pinpai"
      v-swiper:pinpaiSwiper="swiperOption_pinpai"
      v-if="renderSwiper"
      ref="swiperBox_pinpai"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          ref="s_img"
          v-for="item in params.data.articleList"
          :key="item.article_id"
        >
          <!-- <div class=""> -->
          <nuxt-link :to="`/article/detail/${item.article_id}`">
            <div
              class="img-warp"
              :style="{'width' : width_mb + 'px', 'height': width_mb * 1.2825 + 'px'}"
            >
              <img :src="item.article_logo" alt="ad-content" />
            </div>
            <div class="pinpai-desc" :style="{'width' : width_mb + 'px'}">{{item.title}}</div>
          </nuxt-link>
          <!-- </div> -->
        </div>
      </div>
      <a
        href="javascript:;"
        class="card-list__btn card-list__btn-prev goodsstory__btn goodsstory__btn-prev"
      ></a>
      <a
        href="javascript:;"
        class="card-list__btn card-list__btn-next goodsstory__btn goodsstory__btn-next"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  data () {
    return {
      width_pc: 210,
      width_mb: 180,
      renderSwiper: false,
      swiperOption_pinpai: {
        centeredSlides: true,
        slidesPerView: 2,
        loop: true,
        navigation: {
          nextEl: '.goodsstory__btn-next',
          prevEl: '.goodsstory__btn-prev'
        }
      }
    }
  },
  mounted () {
    // console.log(window.document.clientWidth)
    this.width_mb = document.body.clientWidth / 2 - 10
    console.log(this.width_mb)
    this.renderSwiper = false
    this.$nextTick(() => {
      this.renderSwiper = true
    })
    // this.width = this.$refs.s_img.length > 0 ? this.$refs.s_img[0].clientWidth : 0
    // window.onresize = () => {
    //   this.width = this.$refs.s_img.length > 0 ? this.$refs.s_img[0].clientWidth : 0
    // }
    // console.log(this.width)
  }
}
</script>
