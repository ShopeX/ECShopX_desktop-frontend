/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-W0015" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0015-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0015-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-goodstab_tab">
          <div
            class="title"
            :style="{
              backgroundColor: value.wgtBackgroundColor,
              borderRadius: `${value.wgtBorderRadius ? '15px' : '0px'}`
            }"
          >
            <span class="title-span" :style="{ color: value.wgtTextColor }">{{ value.text }}</span>
          </div>
          <ul class="tabList">
            <a
              class="tabItem"
              v-for="(tab, index) in value.data"
              :key="`tabitem__${index}`"
              @mouseover="handleOverShow(index)"
              :class="{ active: index == tabIndex }"
              >{{ tab.text }}</a
            >
          </ul>
        </div>
        <div class="wgt-goodstab_goods">
          <div class="wgt-goodstab_goods_scroll">
            <div
              v-for="(item, index) in value.data"
              :class="[`goods-wrap`, { active: index == tabIndex }]"
              :id="`goods-wrap__${value.uuid}_${index}`"
              :key="`goods-wrap__${index}`"
            >
              <div
                class="goods-list-wrap"
                v-for="(sitem, sindex) in item.data"
                :key="`goods-list-wrap__${sindex}`"
              >
                <div class="goods-wrap__info">
                  <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                    <div
                      class="goods-title"
                      :style="{
                        color: value.wgtTitleColor,
                        fontSize: value.wgtTitleFontSize + (sindex == 0 ? +2 : +0) + 'px'
                      }"
                    >
                      {{ sitem.goods_name }}
                    </div>
                  </linkPage>
                  <goodsPrice
                    class="goods-price"
                    size="large"
                    :value="sitem.price / 100"
                    :theme="value.wgtPriceColor"
                    :afontSize="value.wgtPriceFontSize"
                    :toFixed="value.wgtToFixed"
                  ></goodsPrice>
                  <div class="goods-image">
                    <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                      <ImgWrap
                        :src="sitem.goods_pic"
                        :width="sindex == 10 ? 122 : sindex == 0 ? 290 : 90"
                        :height="sindex == 10 ? 122 : sindex == 0 ? 160 : 90"
                      />
                    </linkPage>
                  </div>
                </div>
              </div>

              <!-- <div class="goods-wrap__right">
                <div
                  class="goods-wrap__item"
                  v-for="(sitem, idx) in item.data"
                  :key="`goods-wrap__right__${idx}`"
                  v-if="idx > 0"
                >
                  <div class="goods-image">
                    <linkPage
                      :mode="mode"
                      :to="`/items/${sitem.goods_id}`"
                    >
                      <ImgWrap
                        :src="item.goods_pic"
                        :width="200"
                        :height="200"
                      />
                    </linkPage>
                  </div>
                  <div class="goods-wrap__info">
                    <div class="goods-title">
                      {{ item.goods_name }}
                    </div>
                    <div class="goods-tags">
                      <span
                        class="tag-item"
                        v-for="tag in item.tagList"
                        :key="tag.tag_id"
                        :style="{ 'color': tag.font_color, 'background': tag.tag_color }"
                        >{{ tag.tag_name }}
                      </span>
                    </div>
                    <goodsPrice
                      size="large"
                      :value="item.price / 100"
                    ></goodsPrice>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { goodsPrice } from '../../common/comps'
import braidStyle from './props'
import mixins from '../../mixins'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'
import { attrs, LinkMaps } from '../../mixins/common-props'

const WIDGET_NAME = 'W0015'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '精品橱窗',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '精品橱窗',
    alias: '精品橱窗',
    text: '精品橱窗 >',
    type: WIDGET_NAME,
    ...attrs,
    widthDisabled: true,
    height: 462,
    heightDisabled: true,
    wgtTextColor: '#ffffffff',
    wgtBackgroundColor: '#FF5D02',
    wgtPriceColor: '#FF0036',
    wgtTitleColor: '#3B3B3B',
    wgtBorderRadius: false,
    wgtTitleFontSize: 18,
    wgtPriceFontSize: 18,
    wgtToFixed: 2,
    data: [
      {
        text: 'tab1',
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 123,
            goods_name: '产品标题文案0',
            subTitle: '副标题文案最多控制副标题文案最多控制副标题文案最多控制副标',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
            goods_name: '产品标题文案1',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 4234,
            goods_name: '产品标题文案2',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 68.9,
            goods_name: '产品标题文案3',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 220,
            goods_name: '产品标题文案4',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 320,
            goods_name: '产品标题文案5',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 99.99,
            goods_name: '产品标题文案6',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 22.22,
            goods_name: '产品标题文案7',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1230,
            goods_name: '产品标题文案8',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 320,
            goods_name: '产品标题文案9',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 22.22,
            goods_name: '产品标题文案10',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          }
        ]
      }
    ],
    foregroundColor: '#ffffffff',
    imgWidth: 200,
    imgHeight: 200
  },
  data() {
    return {
      defaultImg: '',
      tabIndex: 0,
      imgWidth: 0,
      imgHeight: 0,
      leftWidth: 0.3333
    }
  },
  components: {
    goodsPrice,
    ImgWrap,
    linkPage
  },
  computed: {
    goodsImageStyle() {
      const { value } = this
      return {
        // width: Math.floor((value.width * (1 - this.leftWidth)) / 2),
        // height: Math.floor((value.width * (1 - this.leftWidth)) / 2)
        width: 200,
        height: 200
      }
    }
  },
  created() {
    // 数据兼容处理
    if (this.isRenderMode()) {
      const { data } = this.value
      data.forEach((item) => {
        item.data.forEach((goods) => {
          if (!goods.goods_id) {
            goods = {
              goods_id: '',
              goods_pic: '',
              title: '',
              price: 0,
              goods_name: '商品名称',
              tagList: [],
              linkPage: 'goods',
              linkPageLabel: '商品'
            }
          }
        })
      })
      // console.log(JSON.stringify(data))
      // this.getGoodsItems()
    }
  },
  methods: {
    callback() {},
    handleOverShow(index) {
      this.tabIndex = index
    },
    handleClickGoodsItem(item) {
      if (this.isRenderMode()) {
        this.$router.push(LinkMaps[item.linkPage](item))
      }
    }
  }
}
</script>
