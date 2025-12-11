/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0016 {
  .card-hd {
    // height: 60px;
    padding: 0 20px;
    // border: 1px solid red;
    .link-page {
      margin-top: 22px;
      display: inline-block;
      width: 100%;
    }
    .title {
      font-weight: 800;
      display: inline-block;
      margin-right: 12px;
      padding: 1px 20px;
      line-height: 27px;
      font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
    }
    .t-icon {
      vertical-align: middle;
      position: relative;
    }
    .subtitle {
      float: right;
      font-size: 14px;
      color: #999;
      display: inline-block;
      position: relative;
      right: 10px;
      top: 3px;
    }
  }
  .card-bd {
    padding: 22px 21px;
  }
}
</style>
<template>
  <div class="widget-w0016" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0016-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0016-body widget-body" :style="widgetBodyStyle">
        <div class="card-hd">
          <linkPage :mode="mode" :to="handleLinkPage(value.linkPath)">
            <span
              class="title"
              :style="{
                backgroundColor: value.wgtBackgroundColor,
                borderRadius: `${value.wgtBorderRadius ? '15px' : '0px'}`,
                color: value.wgtTitleColor,
                fontSize: value.wgtTitleFontSize + 'px'
              }"
              >{{ value.mainTitle }}</span
            >
            <span class="subtitle">{{ value.subTitle }}</span>
          </linkPage>
        </div>
        <div class="card-bd">
          <WinDisplay1 v-if="value.styleType == 0" v-model="value.data[0]" :mode="mode" />
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
import WinDisplay1 from './comps/win-display-1'

const WIDGET_NAME = 'W0016'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '营销橱窗',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '营销橱窗',
    alias: '营销橱窗',
    text: '营销橱窗 >',
    type: WIDGET_NAME,
    ...attrs,
    width: 384,
    height: 422,
    widthDisabled: true,
    heightDisabled: true,
    wgtBackgroundColor: '#33C900',
    mainTitle: '营销橱窗',
    wgtTitleFontSize: 18,
    wgtTitleColor: '#FFFFFF',
    wgtSubTitleFontSize: 16,
    wgtSubTextColor: '#8C8C8C',

    subTitle: '看新奇好物',
    linkPath: '', // 标题链接
    styleType: 0, // 0=橱窗1；1=橱窗2；3=橱窗3；4=商品；5=优惠券
    data: [
      [
        { imgUrl: '', pathData: {} },
        { imgUrl: '', pathData: {} }
      ]
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
    WinDisplay1
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
