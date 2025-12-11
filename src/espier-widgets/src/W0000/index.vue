/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0000"></div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'

const WIDGET_NAME = 'W0000'

export default {
  name: WIDGET_NAME,
  icon: 'icon-shangyi',
  title: '页面配置',
  mixins: [mixins],
  panel: braidStyle,
  navs: [],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '页面配置',
    alias: '页面配置',
    text: '页面配置',
    type: WIDGET_NAME,
    ...attrs,
    themeColor: '#479EE9'
  },
  data() {
    return {}
  },
  computed: {
    widgetGoodsInner() {
      const { value, translatePx2Device } = this
      // console.log('widgetGoodsInner', value)
      return {
        // height: translatePx2Device(value.height),
        // width: translatePx2Device(value.width),
        marginTop: translatePx2Device(value.marginTop),
        marginLeft: translatePx2Device(value.marginLeft),
        marginRight: translatePx2Device(value.marginRight)
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
