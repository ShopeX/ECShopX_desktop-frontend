/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.product-swiper {
    position: relative;
    .swiperBox {
        margin: 10px 0;
        .swiper-slide {
        .img-warp {
            display: inline-block;
            border: 1px solid #000;
            font-size: 0;
            img {
            @include pdt-img(100px);
            }
        }
        }
    }
    }
</style>

<template>
    <div class="product-swiper">
        <div class="swiper swiperBox" v-swiper:swiper="swiperOption" ref="swiperBox">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(sitem, sindex) in orders" :key="sindex">
            <div class="img-warp">
                <img :src="resolveImgPath(sitem.pic_path, 't')" />
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { resolveImgPath } from '@/utils'
export default {
  props: {
    value: Array
  },
  data () {
    return {
      orders: this.value,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  },
  methods: {
    resolveImgPath (url, size) {
      return (resolveImgPath(url, size))
    }
  }
}
</script>
