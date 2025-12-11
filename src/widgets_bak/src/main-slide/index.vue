/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.main-slide {
  position: relative;
  .img-warp {
    font-size: 0;
    // max-height: 870px;
    img {
      width: 100%;
      height: 100%;
    }
    img[lazy=loading] {
      height: 300px;
    }
    img[lazy=error] {
      height: 300px;
    }
    .item-content{
      position: absolute;
      @include position();
      top: 46%;
      margin: auto;
      text-align: center;
      &__title{
        font-size: 60px;
        font-weight: 300;
        letter-spacing: 6px;
        color: #ffffff;
        height: 84px;
      }
      &__s-title{
        font-size: 20px;
        letter-spacing: 4px;
        color: #ffffff;
        height: 28px;
      }
      .item-btns-wraper{
        margin-top: 15px;
        height: 31px;
        .sp-link{
          display: inline-block;
          margin-right: 20px;
          &:last-child{
            margin-right: 0;
          }
        }
        .sp-btn {
          background: rgba($color: #fff, $alpha: .2);
          width: 150px;
          border-color: #fff;
        }
        .black-t {
          border-color: #000;
          color: #212322;
        }
      }
    }
  }
  // .banner__btn {
  //   display: block;
  //   position: absolute;
  //   top: 40%;
  //   width: 80px;
  //   height: 70px;
  //   z-index: 99;
  //   opacity: 0.7;
  //   &-prev {
  //     background: url("~assets/imgs/banner_arr_left.png") no-repeat center center;
  //     left: 0px;
  //   }
  //   &-next {
  //     background: url("~assets/imgs/banner_arr_right.png") no-repeat center center;
  //     right: 0px;
  //   }
  // }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    bottom: 18px;
  }
  .swiper-pagination-bullet{
    background: transparent;
    border: 1px solid #fff;
  }
  .swiper-pagination-bullet-active {
    background: #fff;
  }
}
</style>

<template>
<div class="main-slide index-banner" style="min-height:500px">
  <no-ssr>
    <div class="swiper swiperBox" v-swiper:swiper="swiperOption" ref="swiperBox">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="item in params.pic"
          :key="item.id"
        >
          <div class="img-warp">
            <nuxt-link :to="replaceUrl(item.linktarget)" @click.native="$track('index_banner', replaceUrl(item.linktarget))" v-if="item.linktarget">
              <img v-lazy="item.pc_link" alt="main-slide"/>
              <div class="item-content">
                <p class="item-content__s-title">{{item.sub_title}}</p>
                <p class="item-content__title">{{item.title}}</p>
                <div class="item-btns-wraper">
                  <nuxt-link class="sp-link" v-for="(m,i) in item.btns" :key="i" :to="replaceUrl(m.linktarget)" @click.native.stop="$track('index_banner', replaceUrl(m.linktarget), m.text)">
                    <SpButton type="primary" :style="{color:m.color, borderColor:m.color}">{{m.text}}</SpButton>
                  </nuxt-link>
                </div>
              </div>
            </nuxt-link>
            <div v-else>
              <img v-lazy="item.pc_link" alt="main-slide"/>
              <div class="item-content">
                <p class="item-content__s-title">{{item.sub_title}}</p>
                <p class="item-content__title">{{item.title}}</p>
                <div class="item-btns-wraper">
                  <nuxt-link class="sp-link" v-for="(m,i) in item.btns" :key="i" :to="replaceUrl(m.linktarget)"  @click.native.stop="$track('index_banner', replaceUrl(m.linktarget), m.text)">
                    <SpButton type="primary" :style="{color:m.color, borderColor:m.color}">{{m.text}}</SpButton>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </no-ssr>
</div>
</template>

<script>
import { replaceUrl } from '@/utils'

export default {
  name: 'main-slide',
  props: {
    params: Object
  },
  data () {
    return {
      // btns: [],
      swiperOption: {
        // navigation: {
        //   nextEl: '.banner__btn-next',
        //   prevEl: '.banner__btn-prev'
        // },
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        }
      },
      picLen: 0
    }
  },

  computed: {
  },
  mounted () {
    this.picLen = Object.keys(this.params.pic).length || 0
    console.info(this.params.pic)
    this.$nextTick(() => {
      const els = this.$el.querySelectorAll('.swiper-pagination-bullet')
      Array.prototype.slice.call(els).forEach((el, idx) => {
        el.addEventListener('click', () => {
          this.$track('index_banner', 'dot', idx)
        })
      })
    })
  },
  methods: {
    replaceUrl
    // repalceurl (url) {
    //   return url.replace('http://qa-api.dickies.com.cn', 'https://shopex-demo.shopex.cn')
    // }
  }
}
</script>
