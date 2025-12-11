/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="wdget-more" style="min-height:200px">
    <p class="wdget-more__title">{{params.title || '探索更多'}}</p>
    <div class="wdget-more__content">
      <div class="card-list__cont" v-swiper:recSwiper="swiperOptions">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in params.pic" :key="index">
          <nuxt-link :to="replaceUrl(item.link)" v-if="item.link" @click.native="$track('index_explore', replaceUrl(item.link))">
            <div class="img-list" :style="{'height': width_pc * 1.357 + 'px'}">
              <img v-lazy="item.pc_link" alt="more" />
            </div>
            <div class="box-inner">
              <p>{{item.title}}</p>
              <p>{{item.sub_title}}</p>
            </div>
          </nuxt-link>
          <div v-else>
            <div class="img-list" :style="{'height': width_pc * 1.357 + 'px'}">
              <img v-lazy="item.pc_link" alt="more" />
            </div>
            <div class="box-inner">
              <p>{{item.title}}</p>
              <p>{{item.sub_title}}</p>
            </div>
          </div>

          </div>
        </div>
      </div>
      <!-- <a
        href="javascript:;"
        class="card-list__btn card-list__btn-prev wdget-more__btn wdget-more__btn-prev"
      ></a>
      <a
        href="javascript:;"
        class="card-list__btn card-list__btn-next wdget-more__btn wdget-more__btn-next"
      ></a> -->
    </div>
  </div>
</template>

<script>
import { replaceUrl } from '@/utils'

export default {
  name: 'ad-more',
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    slidesPerView: {
      type: Number,
      default: 4
    },
    spaceBetween: {
      type: Number,
      default: 18
    }
  },
  data () {
    return {
      width_pc: 280,
      swiperOptions: {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        // navigation: {
        //   nextEl: '.wdget-more__btn-next',
        //   prevEl: '.wdget-more__btn-prev'
        // },
        lazy: {
          loadPrevNext: true
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    replaceUrl
  }
}
</script>

<style lang="scss">
.wdget-more {
  padding-top: 50px;
  &__title{
    text-align: center;
    font-size: 40px;
    font-weight: 300;
    letter-spacing: 2px;
    color: $md-black;
    margin-bottom: 50px;
  }
  &__content{
    position: relative;
  }
  .img-list{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .box-inner{
    position: absolute;
    text-align: center;
    @include position(50%,0,auto,0);
    transform: translateY(-50%);
    font-size: 20px;
    line-height: 26px;
    color: #fefefe;
  }
  .wdget-more__btn {
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
    .wdget-more__btn {
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
  }
}
</style>
