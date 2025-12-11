/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0014" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0014-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0014-body widget-body" :style="widgetBodyStyle">
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
                <div class="goods-image">
                  <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                    <ImgWrap
                      :src="sitem.goods_pic"
                      :width="sindex == 0 ? 290 : 90"
                      :height="sindex == 0 ? 200 : 90"
                    />
                  </linkPage>
                </div>
                <div class="goods-wrap__info">
                  <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`">
                    <div class="goods-title">
                      {{ sitem.goods_name }}
                    </div>
                    <div
                      class="goods-subtitle"
                      :style="{ color: sindex == 0 ? '#8C8C8C' : '#009EFF' }"
                    >
                      {{ sitem.brief }}
                    </div>
                  </linkPage>
                  <div v-if="sindex == 0" class="word23">
                    <linkPage :mode="mode" :to="`/items/${sitem.goods_id}`" ctitleColor="#FFFFFF;"
                      >点击查看</linkPage
                    >
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
// import { goodsPrice } from '../../common/comps'
import braidStyle from './props'
import mixins from '../../mixins'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'
import { attrs, LinkMaps } from '../../mixins/common-props'

const WIDGET_NAME = 'W0014'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '主图橱窗',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '主图橱窗',
    alias: '主图橱窗',
    text: '主图橱窗 >',
    type: WIDGET_NAME,
    ...attrs,
    widthDisabled: false,
    height: 462,
    heightDisabled: false,
    wgtTextColor: '#ffffffff',
    wgtBackgroundColor: '#FF5D02',
    wgtBorderRadius: false,
    data: [
      {
        text: 'tab1',
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 123,
            goods_name: '产品标题文案0',
            brief:
              '副标题文案最多控制副标题文案最多控制副标题文案最多控制副标题文行内副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1231,
            goods_name: '产品标题文案1',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 4234,
            goods_name: '产品标题文案2',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 68.9,
            goods_name: '产品标题文案3',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 220,
            goods_name: '产品标题文案4',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 320,
            goods_name: '产品标题文案5',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 99.99,
            goods_name: '产品标题文案6',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 22.22,
            goods_name: '产品标题文案7',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1230,
            goods_name: '产品标题文案8',
            brief: '副标题文案最多控制2行内',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 320,
            goods_name: '产品标题文案9',
            brief: '副标题文案最多控制2行内',
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
    // goodsPrice,
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
    qwert(goods_id) {
      console.log(goods_id)
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
