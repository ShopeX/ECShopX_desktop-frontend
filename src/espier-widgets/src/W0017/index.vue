/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-W0017" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0017-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0017-body widget-body" :style="widgetBodyStyle">
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
          <div class="goods-main-img">
            <linkPage :mode="mode" :to="handleLinkPage(value.pathData)">
              <ImgWrap :src="value.goods_pic" :width="290" :height="480" />
            </linkPage>
          </div>
          <div class="wgt-goodstab_goods_scroll">
            <div
              v-for="(item, index) in value.data"
              :class="[`goods-wrap`, { active: index == tabIndex }]"
              :id="`goods-wrap__${value.uuid}_${index}`"
              :key="`goods-wrap__${index}`"
            >
              <div class="goods-list-wrap" v-for="sitem in item.data">
                <div class="goods-wrap__info">
                  <div
                    class="goods-title"
                    :style="{ color: value.wgtTitleColor, fontSize: value.wgtTitleFontSize + 'px' }"
                  >
                    {{ sitem.goods_name }}
                  </div>
                  <div
                    class="goods-sub-title"
                    :style="{
                      color: value.wgtSubTitleColor,
                      fontSize: value.wgtSubTitleFontSize + 'px'
                    }"
                  >
                    {{ sitem.brief }}
                  </div>

                  <div class="goods-image">
                    <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                      <ImgWrap :src="sitem.goods_pic" :width="190" :height="150" />
                    </linkPage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'
import { attrs, LinkMaps } from '../../mixins/common-props'

const WIDGET_NAME = 'W0017'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '特殊橱窗',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '特殊橱窗',
    alias: '特殊橱窗',
    text: '特殊橱窗 >',
    goods_pic: '',
    pathData: {},
    type: WIDGET_NAME,
    ...attrs,
    width: 882,
    height: 592,
    widthDisabled: true,
    heightDisabled: true,
    wgtTextColor: '#ffffffff',
    wgtBackgroundColor: '#FF5D02',
    wgtBorderRadius: false,
    wgtTitleColor: '#3B3B3B',
    wgtTitleFontSize: 18,
    wgtSubTitleColor: '#8C8C8C',
    wgtSubTitleFontSize: 16,

    data: [
      {
        text: '精选',
        goods_id: '',
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
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
            goods_name: '黄金珠宝4',
            brief: '璀璨夺目甄选好礼',
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
              brief: '副标题文案最多控制2行内',
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
    // async getGoodsItems() {
    //   const { data } = this.value
    //   const itemIds = []
    //   data.forEach(tab => {
    //     tab.data.forEach(item => {
    //       if(item.goods_id)
    //       itemIds.push(item.)
    //     })
    //   })
    //     const itemIds = data.map(item => item.goods_id)
    //     const { list } = await this.$api.item.list({
    //       item_id: itemIds,
    //       page: 1,
    //       pageSize: itemIds.length,
    //       distributor_id: 0,
    //       item_type: 'normal'
    //     })
    //     data.forEach(item => {
    //       const fd = list.find(li => li.goods_id == item.goods_id)
    //       if(fd) {
    //         item['goods_pic'] = fd.pics.length > 0 ? fd.pics[0] : ''
    //         item['price'] = fd.price
    //         item['goods_name'] = fd.item_name
    //       }
    //     })
    //   }
    // }
  }
}
</script>
