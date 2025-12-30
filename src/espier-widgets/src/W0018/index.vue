/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="widget-W0018" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0018-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0018-body widget-body" :style="widgetBodyStyle">
        <span class="swiper-container-title">{{ value.mainTitle }}</span>
        <swiper class="swiper-container" v-if="reloadSwiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in value.data" :key="index">
            <div class="goods-list-wrap" v-for="(sitem, sindex) in item.data">
              <div class="goods-wrap__info">
                <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                  <div
                    class="goods-title"
                    :style="{ color: value.wgtTitleColor, fontSize: value.wgtTitleFontSize + 'px' }"
                  >
                    {{ sitem.goods_name }}
                  </div>
                  <div class="goods-item_price">
                    <goodsPrice
                      class="mkt-price"
                      :theme="value.wgtPriceColor"
                      :value="sitem.price / 100"
                      :afontSize="value.wgtPriceFontSize"
                      marginTop="1"
                      :toFixed="value.wgtToFixed"
                    ></goodsPrice>
                    <goodsPrice
                      class="mkt-original-price"
                      theme="#8C8C8C"
                      :value="sitem.market_price / 100"
                      :afontSize="value.wgtPriceFontSize - 4"
                      marginTop="1"
                      :toFixed="value.wgtToFixed"
                    ></goodsPrice>
                  </div>
                  <!-- <div class="goods-image"> -->
                  <ImgWrap :src="sitem.goods_pic" :width="90" :height="90" />
                  <!-- </div> -->
                </linkPage>
              </div>
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination"
            :class="[value.styleType, paginationAlign.textAlign]"
            :style="paginationAlign"
            slot="pagination"
          ></div>
        </swiper>
        <div
          class="custom-pagination"
          :class="[paginationAlign.textAlign]"
          v-if="value.styleType == 'style5'"
        >
          <img
            :class="{ active: swiperActiveIndex == index }"
            :src="item.imgUrl"
            v-for="(item, index) in value.data"
            :key="`pg-img__${index}`"
            width="100"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import braidStyle from './props'
// import hoverStyle from './../../common/hoverStyle'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'
import ImgWrap from '../../common/img-wrap'
import { goodsPrice } from '../../common/comps'

import 'swiper/css/swiper.css'

const WIDGET_NAME = 'W0018'

export default {
  name: WIDGET_NAME,
  icon: 'icon-lunbo',
  title: '热卖橱窗',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    name: '热卖橱窗',
    alias: '热卖橱窗',
    text: '热卖橱窗',
    type: WIDGET_NAME,
    ...attrs,
    width: 307,
    height: 593,
    widthDisabled: true,
    heightDisabled: true,
    proportion: 'disabled',
    // 指示点样式
    styleType: 'style1',
    pointAlign: 'right',
    pointDefaultColor: '#000000ff',
    pointActiveColor: '#ff0000ff',
    data: [
      {
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
            market_price: 3333,
            goods_name: '流行饰品1',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 4234,
            market_price: 3333,
            goods_name: '大牌腕表2',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 68.9,
            market_price: 3333,
            goods_name: '眼镜烟具3',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 220,
            market_price: 3333,
            goods_name: '黄金珠宝4',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          }
        ]
      },
      {
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
            market_price: 3333,
            goods_name: '流行饰品1',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 4234,
            market_price: 3333,
            goods_name: '大牌腕表2',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 68.9,
            market_price: 3333,
            goods_name: '眼镜烟具3',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 220,
            market_price: 3333,
            goods_name: '黄金珠宝4',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          }
        ]
      },
      {
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
            market_price: 3333,
            goods_name: '流行饰品1',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 4234,
            market_price: 3333,
            goods_name: '大牌腕表2',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 68.9,
            market_price: 3333,
            goods_name: '眼镜烟具3',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 220,
            market_price: 3333,
            goods_name: '黄金珠宝4',
            brief: '璀璨夺目甄选好礼',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          }
        ]
      }
    ],
    autoplay: false,
    autoplaySpeed: 2000,
    dots: 'none',
    radiusDot: false,
    trigger: 'click',
    arrow: 'never',
    wgtTitleFontSize: 14,
    wgtTitleColor: '#3B3B3B',
    mainTitle: '最新热卖',
    wgtPriceFontSize: 20,
    wgtPriceColor: '#FF0036',
    wgtToFixed: 2,
    color: '#ffffff',
    activeColor: '#8391a5'
  },
  // props: ['value', 'hover', 'kindex', 'mode'],
  components: {
    Swiper,
    SwiperSlide,
    linkPage,
    ImgWrap,
    goodsPrice
  },
  data() {
    const { autoplay, autoplaySpeed } = this.value
    const _autoplay = autoplay ? { delay: autoplaySpeed } : false
    const _self = this
    return {
      swiperOption: {
        autoplay: _autoplay,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            const { styleType, pointDefaultColor, pointActiveColor, customerThemeEnabled } =
              this.value
            let html = ''
            switch (styleType) {
              case 'style1':
                html = `<span class="pag-style1">${current}/${total}</span>`
                break
              case 'style2':
                html = `<span class="pag-style2">${current}/${total}</span>`
                break
              case 'style3':
                for (let i = 1; i <= total; i++) {
                  html += `<span class="pag-style3" style="background: ${
                    i != current
                      ? pointDefaultColor
                      : customerThemeEnabled
                      ? pointActiveColor
                      : this.pageProps
                      ? this.pageProps.themeColor
                      : 'inherit'
                  }"></span>`
                }
                break
              case 'style4':
                for (let i = 1; i <= total; i++) {
                  html += `<span class="pag-style4" style="background: ${
                    i != current
                      ? pointDefaultColor
                      : customerThemeEnabled
                      ? pointActiveColor
                      : this.pageProps
                      ? this.pageProps.themeColor
                      : 'inherit'
                  }"></span>`
                }
                break
              // case 'style5':
              //   for (let i = 0; i < total; i++) {
              //     // html += `<div class="pag-style4" style="background: ${
              //     //   i === current ? pointDefaultColor : pointActiveColor
              //     // }"></div>`

              //     html += `<img class="pag-style5 ${i == current ? 'active' : ''}"  src=${
              //       data[i].imgUrl
              //     } />`
              //   }
              //   break
              default:
                break
            }
            return html
          }
        },
        on: {
          slideChange: function () {
            // console.log('this.activeIndex: ', this.activeIndex)
            // 索引问题
            if (this.activeIndex == _self.value.data.length + 1) {
              _self.swiperActiveIndex = 0
            } else if (this.activeIndex == 0) {
              _self.swiperActiveIndex = _self.value.data.length - 1
            } else {
              _self.swiperActiveIndex = this.activeIndex - 1
            }
          }
        }
      },
      swiperActiveIndex: 0,
      reloadSwiper: true
    }
  },
  computed: {
    swiperObj() {
      return this.$refs.mySwiper.swiper
    },
    paginationAlign() {
      return {
        textAlign: this.value.pointAlign
      }
    }
  },
  watch: {
    value: {
      handler: function (nval, oval) {
        this.reloadSwiper = false
        const { autoplay, autoplaySpeed } = this.value
        const _autoplay = autoplay ? { delay: autoplaySpeed } : false
        this.swiperOption.autoplay = _autoplay
        this.$nextTick((vm) => {
          console.log(`reloadSwiper...`)
          this.reloadSwiper = true
        })
      },
      deep: true
    }
  },
  methods: {
    callback() {}
  }
}
</script>
