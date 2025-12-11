/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="widget-w0003" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0003-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0003-body widget-body" :style="widgetBodyStyle">
        <!-- {{value.alias}} -->
        <!-- {{value.data}} -->

        <template v-if="value.imgUrl">
          <img :src="value.imgUrl" alt="" width="100%" height="100%" style="display: block" />
        </template>
        <template v-else>
          <div class="default-bg">
            {{ `${widgetBodyStyle.width} * ${widgetBodyStyle.height}` }}
          </div>
        </template>
        <template v-for="(item, index) in value.data">
          <linkPage
            :mode="mode"
            class="img-zone__item"
            :key="`img-zone-item__${index}`"
            :style="{
              width: `${item.widthPer * 100}%`,
              height: `${item.heightPer * 100}%`,
              top: `${item.topPer * 100}%`,
              left: `${item.leftPer * 100}%`
            }"
            :to="handleLinkPage(item.pathData)"
          ></linkPage>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'

const WIDGET_NAME = 'W0003'

export default {
  name: WIDGET_NAME,
  icon: 'icon-requhuizhi',
  title: '热区图',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav1', 'nav1-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    name: '热区图',
    alias: '热区图',
    text: '热区图',
    type: WIDGET_NAME,
    ...attrs,
    height: 200,
    proportion: true,
    proportionDisabled: false,
    data: []
  },
  // props: ['value', 'hover', 'kindex', 'mode', 'zoom'],
  components: {
    linkPage
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    // ["value.imgUrl"]: {
    //   handler: function(nval, oval) {
    //     if (!nval) {
    //       this.value.data.splice(0, this.value.data.length)
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    callback() {}
  }
}
</script>
