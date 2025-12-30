/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.win-coupon {
  width: 350px;
  height: 362px;
  .coupon-item {
    background: url(../img/coupon.png);
    background-size: 100% 100%;
    height: 110px;
    margin-bottom: 1px;
    position: relative;
    &__img {
      position: absolute;
      top: 20px;
      width: 68px;
      height: 68px;
      left: 12px;
      border-radius: 34px;
      background: #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
    }
    &__info {
      position: absolute;
      width: 124px;
      height: 50px;
      top: 30px;
      left: 95px;
      // background: #fff;
      .title {
        color: #333;
        font-size: 14px;
        @include mult-ellipsis(1);
      }
      .desc {
        color: #999;
        font-size: 13px;
        @include mult-ellipsis(2);
      }
    }
    &__desc {
      position: absolute;
      top: 30px;
      right: 8px;
      width: 100px;
      height: 50px;
      text-align: center;
      // background: #fff;
      .widgets-goods-price {
        margin-top: 4px;
      }
      .price__symbol {
        font-size: 16px;
        margin-top: 15px;
      }
      .price__int {
        font-size: 32px;
      }
      .price__decimal {
        font-size: 30px;
      }
    }
  }
  .default-img {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .discount-wrap {
    text-align: center;
    margin-top: 6px;
    .discount-amount {
      font-size: 32px;
      color: #e1251b;
      font-weight: bold;
      font-family: arial, sans-serif;
    }
    .discount-unit {
      font-size: 18px;
      color: #e1251b;
    }
  }
  .swiper-wrap {
    height: 100%;
  }
  .swiper-pagination {
    position: relative;
    top: -20px;
  }
  .swiper-pagination-bullet-active {
    background: #e1251b;
  }
}
</style>
<template>
  <div class="win-coupon">
    <swiper class="swiper-wrap" v-if="reloadSwiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in value" :key="index">
        <div
          class="goods-item__wrap"
          v-for="(sitem, sindex) in [1, 2, 3]"
          :key="`swiper-item__${sindex}`"
        >
          <!-- <linkPage :mode="mode" :to="handleLinkPage(sitem.pathData)"> -->
          <div
            class="coupon-item"
            v-if="value[index].data[sindex]"
            @click="handleClickGetCoupon(value[0].data[sindex])"
          >
            <div class="coupon-item__img">
              <!-- imgUrl: {{value[index].data[sindex]}} -->
              <div class="default-img" v-if="value[index].data[sindex].imgUrl == ''"></div>
              <img v-else :src="value[index].data[sindex].imgUrl" alt="" />
            </div>
            <div class="coupon-item__info">
              <div class="title">{{ value[index].data[sindex].title }}</div>
              <div class="desc">{{ value[index].data[sindex].description }}</div>
            </div>
            <div class="coupon-item__desc">
              <goodsPrice
                :value="value[0].data[sindex].reduce_cost / 100"
                noDecimal
                v-if="value[0].data[sindex].card_type == 'cash'"
              />
              <div class="discount-wrap" v-if="value[0].data[sindex].card_type == 'discount'">
                <span class="discount-amount">{{
                  `${(100 - value[0].data[sindex].discount) / 10}`
                }}</span>
                <span class="discount-unit">折</span>
              </div>
            </div>
          </div>
          <!-- </linkPage> -->
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
        pagination: {
          el: '.swiper-pagination'
          // type: 'custom',
          // renderCustom: (swiper, current, total) => {
          //   const { styleType, pointDefaultColor, pointActiveColor } = this.value
          //   let html = ''
          //   switch (styleType) {
          //     case 'style1':
          //       html = `<span class="pag-style1">${current}/${total}</span>`
          //       break
          //     case 'style2':
          //       html = `<span class="pag-style2">${current}/${total}</span>`
          //       break
          //     case 'style3':
          //       for (let i = 1; i <= total; i++) {
          //         html += `<span class="pag-style3" style="background: ${
          //           i === current ? pointDefaultColor : pointActiveColor
          //         }"></span>`
          //       }
          //       break
          //     case 'style4':
          //       for (let i = 1; i <= total; i++) {
          //         html += `<span class="pag-style4" style="background: ${
          //           i === current ? pointDefaultColor : pointActiveColor
          //         }"></span>`
          //       }
          //       break
          //     default:
          //       break
          //   }
          //   return html
          // }
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
  methods: {
    async handleClickGetCoupon(coupon) {
      if (this.isRenderMode()) {
        await this.$api.cart.receiveCard({
          card_id: coupon.card_id
        })
        this.$Message.success('领取成功')
      }
    }
  }
}
</script>
