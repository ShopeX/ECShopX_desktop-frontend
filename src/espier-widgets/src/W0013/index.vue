/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0013" :style="widgetStyle">
    <slot></slot>
    <!-- {{value.categoryData}} -->
    <div class="widget-w0013-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0013-body widget-body" :style="widgetBodyStyle">
        <div class="navs-con" :id="`navs-con__${value.uuid}`" :style="scrollStyle">
          <div
            class="nav-item-bar"
            :id="`nav-item-bar__${value.uuid}`"
            :style="{ backgroundColor: value.wgtTheme }"
          ></div>
          <linkPage
            class="nav-item"
            :ctitleColor="value.wgtTextColor"
            v-for="(item, idx) in value.data"
            :key="`nav-item__${idx}`"
            :mode="mode"
            :to="handleLinkPage(item.pathData)"
            :ref="`link-item__${idx}`"
            @click.native="handleClickLink(idx)"
            >{{ item.title }}</linkPage
          >
        </div>
        <div class="arrow-btn">
          <i
            class="espier-icon espier-icon-xiangzuo-01"
            :class="{ disabled: scrollIndex == 0 }"
            @click="handlePrev"
          ></i>
          <i
            class="espier-icon espier-icon-xiangyou-01"
            :class="{ disabled: nextDisabled }"
            @click="handleNext"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs, LinkMaps } from '../../mixins/common-props'
import linkPage from '../../common/linkpage'

// 头部导航挂件
const WIDGET_NAME = 'W0013'

export default {
  name: WIDGET_NAME,
  icon: 'icon-caidan1',
  title: '导航菜单',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '导航菜单',
    alias: '导航菜单',
    text: '导航菜单',
    type: WIDGET_NAME,
    ...attrs,
    proportion: 'disabled',
    height: 40,
    heightDisabled: true,
    wgtTheme: '#000000ff',
    wgtTextColor: '#000000ff'
  },
  data() {
    return {
      btnHover: true,
      translatex: 0,
      scrollIndex: 0
    }
  },
  components: {
    linkPage
  },
  computed: {
    scrollStyle() {
      return {
        transform: `translateX(${this.translatex}px)`
      }
    },
    nextDisabled() {
      const { value, translatex } = this
      const ele = document.querySelector(`#navs-con__${value.uuid}`)

      return ele && ele.clientWidth + translatex < value.width
    }
  },
  mounted() {
    const { path } = this.$route
    const { value } = this
    const index = value.data.findIndex((item) => LinkMaps(item.pathData) == path)
    if (index > -1) {
      this.handleClickLink(index)
      // 计算translatex
      // 当前激活的菜单
      const { offsetLeft } = this.$refs[`link-item__${index}`][0].$el
      // const ele = document.querySelector(`#navs-con__${value.uuid}`)
      for (var i = 0; i < value.data.length; i++) {
        const templeft = this.$refs[`link-item__${i}`][0].$el.offsetLeft
        if (offsetLeft > value.width && offsetLeft - templeft < value.width) {
          this.scrollIndex = i + 1
          this.translatex = 0 - this.$refs[`link-item__${this.scrollIndex}`][0].$el.offsetLeft + 50
          break
        }
      }
    }
  },
  methods: {
    handleMainBtnHover() {
      this.btnHover = true
    },
    handleClickLink(idx) {
      const { clientWidth, offsetLeft } = this.$refs[`link-item__${idx}`][0].$el
      const { uuid } = this.value
      console.log('clientWidth:', clientWidth)
      const ele = document.querySelector(`#nav-item-bar__${uuid}`)
      ele.style.width = `${clientWidth}px`
      ele.style.left = `${offsetLeft}px`
    },
    handlePrev() {
      if (this.scrollIndex > 0) {
        this.scrollIndex--
        const { offsetLeft } = this.$refs[`link-item__${this.scrollIndex}`][0].$el
        this.translatex = 0 - offsetLeft + 50
      }
    },
    handleNext() {
      if (!this.nextDisabled) {
        this.scrollIndex++
        const { offsetLeft } = this.$refs[`link-item__${this.scrollIndex}`][0].$el
        this.translatex = 0 - offsetLeft + 50
      }
    }
  }
}
</script>
