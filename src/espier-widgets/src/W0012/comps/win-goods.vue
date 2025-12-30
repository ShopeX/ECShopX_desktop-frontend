/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.win-goods {
  width: 350px;
  .goods-con {
    width: 350px;
    position: relative;
    &:after {
      content: '\0020';
      display: block;
      height: 0;
      clear: both;
      // visibility: hidden;
      // overflow: hidden;
    }
  }
  .goods-item__wrap {
    float: left;
    // box-sizing: border-box;
    width: 174px;
    height: 180px;
    &:nth-child(2n + 1) {
      margin-right: 2px;
    }
    &:nth-child(1) {
      margin-bottom: 2px;
    }
    img {
      object-fit: cover;
    }
  }

  .wingoods-info {
    text-align: center;
  }
  .goods-title {
    font-size: 13px;
    color: #333;
    text-align: center;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .goods-price {
    .price__symbol {
      margin-top: -1px;
      font-weight: bold;
      font-size: 13px;
    }
    .price__int {
      font-size: 12px;
    }
    .price__decimal {
      font-size: 12px;
    }
  }
  .win-goods__swiper-button-prev {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 999;
    opacity: 0.6;
    transform: translate(0, -50%);
    &:focus {
      outline: none;
    }
    &.swiper-button-disabled {
      display: none;
    }
  }
  .win-goods__swiper-button-next {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
    opacity: 0.6;
    transform: translate(0, -50%);
    &:focus {
      outline: none;
    }
    &.swiper-button-disabled {
      display: none;
    }
  }
}
</style>
<template>
  <div class="win-goods">
    <div class="goods-con" v-if="value.length == 1">
      <div
        class="goods-item__wrap"
        v-for="(sitem, sindex) in [1, 2, 3, 4]"
        :key="`swiper-item__${sindex}`"
      >
        <linkPage :mode="mode" :to="handleLinkPage(sitem.pathData)">
          <ImgWrap :src="value[0].data[sindex].goods_pic" :width="174" :height="140" />
          <div class="wingoods-info">
            <div class="goods-title">
              {{ `${value[0].data[sindex].goods_name}` }}
            </div>
            <goodsPrice
              class="goods-price"
              :value="`${value[0].data[sindex].price / 100}`"
            ></goodsPrice>
          </div>
        </linkPage>
      </div>
    </div>

    <div class="swiper-container" v-else>
      <swiper class="swiper-wrap" v-if="reloadSwiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) in value" :key="index">
          <div
            class="goods-item__wrap"
            v-for="(sitem, sindex) in [1, 2, 3, 4]"
            :key="`swiper-item__${sindex}`"
          >
            <linkPage :mode="mode" :to="handleLinkPage(sitem.pathData)">
              <ImgWrap :src="value[index].data[sindex].goods_pic" :width="174" :height="140" />
              <div class="wingoods-info">
                <div class="goods-title">
                  {{ `${value[index].data[sindex].goods_name}` }}
                </div>
                <goodsPrice
                  class="goods-price"
                  :value="`${value[index].data[sindex].price / 100}`"
                ></goodsPrice>
              </div>
            </linkPage>
          </div>
        </swiper-slide>
        <!-- <div
          class="swiper-pagination"
          :class="[value.styleType]"
          :style="paginationAlign"
          slot="pagination"
        ></div> -->
      </swiper>
      <div class="win-goods__swiper-button-prev">
        <img src="../img/left.jpg" width="15" />
      </div>
      <div class="win-goods__swiper-button-next">
        <img src="../img/right.jpg" width="15" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import linkPage from '../../../common/linkpage'
import ImgWrap from '../../../common/img-wrap'
import { goodsPrice } from '../../../common/comps'
import mixins from '../../../mixins'
export default {
  name: 'WinGoods',
  mixins: [mixins],
  props: {
    value: Array
  },
  data() {
    return {
      swiperOption: {
        // autoplay: _autoplay,
        loop: false,
        navigation: {
          nextEl: '.win-goods__swiper-button-next',
          prevEl: '.win-goods__swiper-button-prev'
        }
      },
      reloadSwiper: true
    }
  },
  watch: {
    'value': {
      handler: function (nval, oval) {
        this.reloadSwiper = false
        this.$nextTick((vm) => {
          this.reloadSwiper = true
        })
      },
      deep: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    linkPage,
    ImgWrap,
    goodsPrice
  },
  created() {},
  methods: {}
}
</script>
