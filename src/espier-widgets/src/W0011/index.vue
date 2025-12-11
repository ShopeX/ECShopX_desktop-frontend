/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-0011 {
  &-body {
    padding: 2px;
  }
  .text-content {
    white-space: pre-wrap;
  }
}
</style>

<template>
  <div class="widget-0011" :style="widgetStyle">
    <slot></slot>
    <div class="widget-0011-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-0011-body widget-body" :style="[widgetBodyStyle, widgetAlignStyle]">
        <linkPage :mode="mode" :to="handleLinkPage(value.data)">
          <span
            class="text-content"
            :id="`widget-0011_${value.uuid}`"
            :style="widgetTextStyle"
            v-text="value.text"
          ></span>
        </linkPage>
      </div>
    </div>
  </div>
</template>

<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'
const WIDGET_NAME = 'W0011'

export default {
  name: WIDGET_NAME,
  icon: 'icon-wenben1',
  title: '文本',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav1', 'nav1-1'],
  setting: {
    // 元件名称
    name: '文本',
    alias: '文本',
    text: '文本',
    type: WIDGET_NAME,
    ...attrs,
    fontSize: 14,
    width: 52,
    height: 20,
    heightDisabled: true,
    data: {},
    foregroundColor: '#ffffff00',
    backgroundColor: '#ffffff00'
  },
  components: {
    linkPage
  },
  computed: {
    widgetTextStyle() {
      const { value } = this
      return {
        fontSize: this.translatePx2Device(value.fontSize),
        // lineHeight: `${value.height}px`,
        fontWeight: value.fontWeight,
        fontStyle: value.fontStyle,
        textDecoration: value.textDecoration,
        color: value.color
      }
    },
    widgetAlignStyle() {
      const { value } = this
      return {
        textAlign: value.textAlign
      }
    }
  },
  mounted() {
    // inLayout
    if (this.inLayout) {
      this.value.heightDisabled = true
      this.value.widthDisabled = true
    }
  },
  methods: {}
}
</script>
