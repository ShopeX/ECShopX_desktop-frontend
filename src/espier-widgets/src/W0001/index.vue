/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="widget-w0001" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0001-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0001-body widget-body" :style="widgetBodyStyle">
        <swiper class="swiper-container" v-if="reloadSwiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in value.data" :key="index">
            <template v-if="item.imgUrl">
              <linkPage :mode="mode" :to="handleLinkPage(item.pathData)">
                <img :src="item.imgUrl" alt="" width="100%" height="100%" />
              </linkPage>
            </template>
            <template v-else>
              <div class="default-bg">
                {{ `${widgetBodyStyle.width} * ${widgetBodyStyle.height}` }}
              </div>
            </template>
          </swiper-slide>
          <div
            class="swiper-pagination"
            :class="[value.styleType]"
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
import 'swiper/css/swiper.css'

const WIDGET_NAME = 'W0001'

export default {
  name: WIDGET_NAME,
  icon: 'icon-lunbo',
  title: '轮播',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav1', 'nav1-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    name: '轮播',
    alias: '轮播',
    text: '轮播',
    type: WIDGET_NAME,
    ...attrs,
    height: 200,
    proportion: 'disabled',
    // 指示点样式
    styleType: 'style1',
    pointAlign: 'right',
    pointDefaultColor: '#000000ff',
    pointActiveColor: '#ff0000ff',
    data: [
      {
        imgData: '',
        pathData: {}
      },
      {
        imgData: '',
        pathData: {}
      },
      {
        imgData: '',
        pathData: {}
      }
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    dots: 'none',
    radiusDot: false,
    trigger: 'click',
    arrow: 'never',
    color: '#ffffff',
    activeColor: '#8391a5'
  },
  // props: ['value', 'hover', 'kindex', 'mode'],
  components: {
    Swiper,
    SwiperSlide,
    linkPage
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
