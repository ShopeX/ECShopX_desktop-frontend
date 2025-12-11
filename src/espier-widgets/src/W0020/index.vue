/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-W0020" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0020-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0020-body widget-body" :style="widgetBodyStyle">
        <div
          class="wgt-shop_title"
          :id="`wgt-shop_title__${value.uuid}`"
          v-show="!value.wgtHiddenTitle"
        >
          <div
            class="name"
            :class="{ 'bg-null': !value.titleBackground }"
            :style="{
              textAlign: value.titleAlign,
              background: `linear-gradient(90deg, ${value.wgtBackgroundColor1} 0%, ${value.wgtBackgroundColor2} 100%)`,
              fontSize: value.wgtTitleFontSize + 'px'
            }"
          >
            <linkPage
              class="more"
              :ctitleColor="value.wgtTitleColor"
              :mode="mode"
              :to="handleLinkPage(value.moreLinkData)"
            >
              {{ value.text }}
            </linkPage>
          </div>
        </div>
        <ul :class="`wgt-shop_list`" :id="`wgt-shop_list__${value.uuid}`">
          <li class="shop-item" v-for="(shop, index) in value.data" :key="`shop-item__${index}`">
            <div class="shop-item_wrap">
              <div class="shop-item-top">
                <div class="shop-item-top_img">
                  <ImgWrap :src="shop.shop_pic" :width="583" :height="96" />
                </div>
              </div>
              <div class="shop-item-content">
                <linkPage
                  class="shop-item-content_img"
                  :to="`shops/info?distributor_id=${shop.shop_id}`"
                  :mode="mode"
                >
                  <ImgWrap :src="shop.banner" :width="149" :height="246" />
                </linkPage>
                <linkPage
                  class="shop-item-content_logo"
                  :to="`shops/info?distributor_id=${shop.shop_id}`"
                  :mode="mode"
                >
                  <ImgWrap :borderRadius="40" :src="shop.logo" :width="80" :height="80" />
                </linkPage>
                <div class="shop-item-content_title">
                  {{ shop.shop_name }}
                </div>
                <div class="shop-item-content_tag-list">
                  <span
                    class="shop-item-content_tag-list_text"
                    v-for="(tag, index) in shop.tag_list"
                    :key="`goods-tag__${index}`"
                    >{{ tag.tag_name }}</span
                  >
                </div>
              </div>
              <div class="goods-list">
                <div
                  class="goods-list-item"
                  v-for="(item, idx) in shop.goods_list"
                  :key="`goods-list-item${idx}`"
                >
                  <div class="goods-list-item__warp" v-if="showItem(item)">
                    <linkPage
                      class="goods-list-item__warp_img"
                      :to="`items/${item.goods_id}`"
                      :mode="mode"
                    >
                      <ImgWrap :to="122" :src="item.goods_pic" :width="118" :height="118" />
                    </linkPage>
                    <div class="goods-list-item__warp_title">
                      {{ item.goods_name }}
                    </div>
                    <div class="goods-list-item__warp_price">
                      <goodsPrice
                        class="mkt-price"
                        :afontSize="14"
                        marginTop="1"
                        :theme="value.wgtPriceColor"
                        :value="item.price / 100"
                      ></goodsPrice>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { goodsPrice } from '../../common/comps'
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'

const WIDGET_NAME = 'W0020'

export default {
  name: WIDGET_NAME,
  icon: 'icon-shangpin',
  title: '为你推荐',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '为你推荐',
    alias: '为你推荐',
    text: '为你推荐',
    type: WIDGET_NAME,
    ...attrs,
    showMore: true,
    columnNums: 2,
    widthDisabled: true,
    height: 430,
    heightDisabled: true,
    moreLinkData: {},
    data: [
      {
        shop_id: '',
        shop_name: '小米旗舰店1',
        shop_pic: '',
        pathData: {},
        banner: '',
        logo: '',
        tag_list: [
          {
            tag_id: '',
            tag_name: '店铺标签1'
          },
          {
            tag_id: '',
            tag_name: '店铺标签2'
          }
        ],
        goods_list: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: 'Redmi K40骁龙..',
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: 'Redmi K40骁龙1123123123',
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: 'Redmi K40骁龙..',
            linkPage: '',
            linkPageLabel: '商品'
          }
        ]
      },
      {
        shop_id: '',
        shop_name: '小米旗舰店2',
        shop_pic: '',
        banner: '',
        logo: '',
        pathData: {},
        tag_list: [
          {
            tag_id: '',
            tag_name: '店铺标签1'
          },
          {
            tag_id: '',
            tag_name: '店铺标签2'
          }
        ],
        goods_list: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: '商品名1',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: '商品名2',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799,
            goods_name: '商品名3',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          }
        ]
      }
    ],
    wgtHiddenTitle: false,
    titleAlign: 'center',
    titleBackground: true,
    wgtBackgroundColor1: '#FF5A00',
    wgtBackgroundColor2: '#FF8600',
    wgtTitleFontSize: 28,
    wgtTitleColor: '#FFFFFF',
    wgtPriceFontSize: 18,
    wgtPriceColor: '#FF0036',
    wgtHideUnselectedItems: false
  },
  data() {
    return {}
  },
  components: {
    goodsPrice,
    linkPage,
    ImgWrap
  },
  computed: {},
  watch: {
    'value.data': {
      handler: function (nval, oval) {},
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    showItem(item) {
      if (this.value.wgtHideUnselectedItems) {
        if (item.goods_id != '') {
          return true
        } else {
          return false
        }
      }

      return true
    },
    shopClicked(shop) {
      return '商铺详情'
    }
  }
}
</script>
