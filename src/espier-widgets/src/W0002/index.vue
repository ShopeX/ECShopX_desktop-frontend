/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0002" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0002-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0002-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-goods_title" :id="`wgt-goods_title__${value.uuid}`">
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
        <ul :class="`wgt-goods_list`" :id="`wgt-goods_list__${value.uuid}`">
          <!-- data: {{value.data}} -->
          <!-- <li class="goods-item" v-if="value.data.length == 0">
            <ImgWrap :src="null" :width="300" :height="300" />
          </li> -->
          <li class="goods-item" v-for="(item, index) in value.data" :key="`goods-item__${index}`">
            <linkPage class="goods-item_wrap" :mode="mode" :to="handleLinkPage(item)">
              <div class="goods-item_img">
                <ImgWrap :src="item.goods_pic" :width="214" :height="214" />
              </div>
              <div class="goods-item_title">
                {{ item.goods_name }}
              </div>
              <div class="goods-item_price">
                <goodsPrice
                  class="mkt-price"
                  :theme="value.wgtPriceColor"
                  :value="item.price / 100"
                  :afontSize="value.wgtPriceFontSize"
                ></goodsPrice>
                <goodsPrice
                  class="mkt-original-price"
                  theme="#8C8C8C"
                  :value="item.market_price / 100"
                  :afontSize="value.wgtPriceFontSize - 4"
                ></goodsPrice>
              </div>
            </linkPage>
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

const WIDGET_NAME = 'W0002'

export default {
  name: WIDGET_NAME,
  icon: 'icon-shangpin',
  title: '商品',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '商品',
    alias: '商品',
    text: '商品',
    type: WIDGET_NAME,
    ...attrs,
    showMore: true,
    moreText: '更多',
    moreLinkData: {},
    columnNums: 5,
    widthDisabled: true,
    height: 400,
    heightDisabled: true,
    data: [
      {
        goods_id: '',
        goods_pic: '',
        price: 123,
        market_price: 333,
        goods_name: '商品名5商品名5商品名5商品名5商品名5商品名5',
        linkPage: 'goods',
        linkPageLabel: '商品'
      },
      {
        goods_id: '',
        goods_pic: '',
        price: 123.2,
        market_price: 333,
        goods_name: '商品名称4',
        linkPage: 'goods',
        linkPageLabel: '商品'
      },
      {
        goods_id: '',
        goods_pic: '',
        price: 990,
        market_price: 333,
        goods_name: '商品名称3',
        linkPage: 'goods',
        linkPageLabel: '商品'
      },
      {
        goods_id: '',
        goods_pic: '',
        price: 123,
        market_price: 233,
        goods_name: '商品名称2',
        linkPage: 'goods',
        linkPageLabel: '商品'
      },
      {
        goods_id: '',
        goods_pic: '',
        price: 1230,
        market_price: 4234,
        goods_name: '商品名称1',
        linkPage: 'goods',
        linkPageLabel: '商品'
      }
    ],
    titleAlign: 'center',
    titleBackground: true,
    wgtBackgroundColor1: '#FF5A00',
    wgtBackgroundColor2: '#FF8600',
    wgtTitleFontSize: 28,
    wgtTitleColor: '#FFFFFF',
    wgtPriceFontSize: 18,
    wgtPriceColor: '#FF0036'
  },
  data() {
    return {
      // goodsData:[],
    }
  },
  components: {
    goodsPrice,
    linkPage,
    ImgWrap
  },
  computed: {},
  watch: {
    // 'value.columnNums': {
    //   handler: function(nval, oval) {
    //     setTimeout(() => {
    //       this.changeWgtHeight()
    //     }, 100)
    //   },
    //   deep: true
    // },
    'value.data': {
      handler: function (nval, oval) {
        setTimeout(() => {
          this.changeWgtHeight()
        }, 100)
      },
      deep: true
    }
    // 'value.width': {
    //   handler: function(nval, oval) {
    //     this.changeWgtHeight()
    //     // this.value.height = document.getElementById(`wgt-goods_title__${this.value.uuid}`).clientHeight + document.getElementById(`wgt-goods_list__${this.value.uuid}`).clientHeight
    //     // console.log(document.getElementById(`wgt-goods_list__${this.value.uuid}`).clientHeight)
    //   },
    //   deep: true
    // }
  },
  created() {
    // this.getGoodsItems()
  },
  mounted() {},
  methods: {
    changeWgtHeight() {
      this.value.height =
        document.getElementById(`wgt-goods_title__${this.value.uuid}`).clientHeight +
        document.getElementById(`wgt-goods_list__${this.value.uuid}`).clientHeight +
        20
    },
    async getGoodsItems() {
      if (this.isRenderMode()) {
        const { data } = this.value
        const itemIds = data.map((item) => item.goods_id)
        const { list } = await this.$api.item.list({
          item_id: itemIds,
          page: 1,
          pageSize: itemIds.length,
          distributor_id: 0,
          item_type: 'normal'
        })
        data.forEach((item) => {
          const fd = list.find((li) => li.goods_id == item.goods_id)
          if (fd) {
            item['goods_pic'] = fd.pics.length > 0 ? fd.pics[0] : ''
            item['price'] = fd.price
            item['goods_name'] = fd.item_name
          }
        })
      }
    }
  }
}
</script>
