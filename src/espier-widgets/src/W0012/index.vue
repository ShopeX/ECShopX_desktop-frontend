/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0012 {
  .card-hd {
    height: 60px;
    padding: 0 20px;
    // border: 1px solid red;
    .link-page {
      margin-top: 16px;
      display: inline-block;
    }
    .title {
      font-size: 24px;
      color: #333;
      font-weight: 600;
      display: inline-block;
      margin-right: 2px;
    }
    .t-icon {
      vertical-align: middle;
      position: relative;
      top: -5px;
    }
    .subtitle {
      font-size: 14px;
      color: #999;
      display: inline-block;
      margin-left: 2px;
      position: relative;
      top: -2px;
    }
  }
  .card-bd {
    padding: 0 20px 20px;
  }
}
</style>
<template>
  <div class="widget-w0012" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0012-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0012-body widget-body" :style="widgetBodyStyle">
        <div class="card-hd">
          <linkPage :mode="mode" :to="handleLinkPage(value.linkPath)">
            <h3 class="title">{{ value.mainTitle }}</h3>
            <img class="t-icon" src="./img/arrow.png" width="26" />
            <span class="subtitle">{{ value.subTitle }}</span>
          </linkPage>
        </div>
        <div class="card-bd">
          <WinDisplay1 v-if="value.styleType == 0" v-model="value.data[0]" :mode="mode" />
          <WinDisplay2 v-if="value.styleType == 1" v-model="value.data[1]" :mode="mode" />
          <WinDisplay3 v-if="value.styleType == 2" v-model="value.data[2]" :mode="mode" />
          <WinGoods v-if="value.styleType == 3" v-model="value.data[3]" :mode="mode" />
          <WinCoupon v-if="value.styleType == 4" v-model="value.data[4]" :mode="mode" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'
import WinGoods from './comps/win-goods'
import WinCoupon from './comps/win-coupon'
import WinDisplay1 from './comps/win-display-1'
import WinDisplay2 from './comps/win-display-2'
import WinDisplay3 from './comps/win-display-3'

const WIDGET_NAME = 'W0012'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '橱窗卡',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '橱窗卡',
    alias: '橱窗卡',
    text: '橱窗卡',
    type: WIDGET_NAME,
    ...attrs,
    width: 390,
    height: 450,
    widthDisabled: true,
    heightDisabled: true,
    mainTitle: '新品首发',
    subTitle: '看新奇好物',
    linkPath: '', // 标题链接
    styleType: 0, // 0=橱窗1；1=橱窗2；3=橱窗3；4=商品；5=优惠券
    data: [
      [
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} }
      ],
      [
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} }
      ],
      [
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} }
      ],
      // 商品分组
      [
        {
          type: 'goods',
          data: [
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            }
          ]
        }
      ],
      // 优惠券分组
      [{ type: 'coupon', data: [] }]
    ]
  },
  provide() {
    return {
      mode: this.mode,
      handleLinkPage: this.handleLinkPage
    }
  },
  data() {
    return {}
  },
  components: {
    linkPage,
    WinGoods,
    WinCoupon,
    WinDisplay1,
    WinDisplay2,
    WinDisplay3
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
