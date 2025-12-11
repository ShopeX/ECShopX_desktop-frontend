/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-w0008" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0008-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0008-body widget-body" :style="[widgetBodyStyle, focusStyleBody]">
        <!-- {{widgetBodyStyle}} -->
        <div class="widget-w0008__wrap" :style="{ borderColor: getThemeColor }">
          <!-- value: {{value.width}} -->
          <i class="espier-icon espier-icon-sousuo-01"></i>
          <input
            class="search-input"
            v-model="keyword"
            :placeholder="value.placeholder"
            type="text"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup.enter="handleClickSearch"
          />
          <div
            class="search-icon"
            :style="{
              backgroundColor: getThemeColor,
              color: value.wgtTextColor,
              background: `linear-gradient(90deg, ${value.wgtTextColor1} 0%, ${value.wgtTextColor2} 100%)`
            }"
            @click="handleClickSearch"
            v-if="value.isShowBtn"
          >
            {{ $t('W0008.index.695137-0') }}
          </div>
        </div>
        <div class="hot-keyword" v-if="value.data.length > 0">
          <!-- <span :style="{ color: getThemeColor }">热门搜索：</span> -->
          <linkPage
            class="hot-keyword__item"
            v-for="(item, idx) in value.data"
            :key="`hotsearch-item__${idx}`"
            :mode="mode"
            :to="handleLinkPage(item.pathData)"
            :ctitleColor="item.wgtHotKeywordTextColor"
            >{{ item.title }}</linkPage
          >
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
import { mapMutations } from 'vuex'
const WIDGET_NAME = 'W0008'

export default {
  name: WIDGET_NAME,
  icon: 'icon-sousuo',
  title: '搜索',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '搜索',
    alias: '搜索',
    text: '搜索',
    type: WIDGET_NAME,
    ...attrs,
    proportion: 'disabled',
    height: 38,
    heightDisabled: true,
    // height: 'disabled',
    wgtTheme: '#000000ff',
    wgtTextColor: '#ffffffff',
    wgtTextColor1: '#FF5A00',
    wgtTextColor2: '#FF8600',
    placeholder: '搜索',
    focusWidth: 100,
    isShowBtn: true
  },
  data() {
    return {
      keyword: '',
      focusStatus: false,
      wgtHotKeywordTextColor: '#8C8C8C'
    }
  },
  computed: {
    // focusStyle() {
    //   const { value, translatePx2Device, focusStatus } = this
    //   if (focusStatus) { 
    //     value.x = value.x - 100
    //     return {
    //       left: translatePx2Device(value.x)
    //     }
    //   } else {
    //     value.x = value.x + 100
    //     return {
    //       left: translatePx2Device(value.x)
    //     }
    //   }
    // },

    focusStyleBody() {
      const { value, translatePx2Device, focusStatus } = this
      if (focusStatus) {
        return {
          // width: translatePx2Device(value.width + value.focusWidth),
          // position: 'relative',
          // left: translatePx2Device(-value.focusWidth)
        }
      } else {
        return {
          width: translatePx2Device(value.width),
          position: 'relative',
          left: ''
        }
      }
    }
  },
  components: {
    linkPage
  },
  mounted() {},
  watch: {
    'value.data': function (nval, oval) {
      if (nval.length == 0) {
        this.value.height = 38
      } else {
        this.value.height = 66
      }
    }
  },
  methods: {
    handleFocus() {
      if (!this.isDesignMode()) {
        this.focusStatus = true
      }
    },
    handleBlur() {
      if (!this.isDesignMode()) {
        this.focusStatus = false
      }
    },
    handleClickSearch() {
      if (this.isRenderMode()) {
        console.log(this.keyword)
        this.$emit('callback', {
          wgt: WIDGET_NAME,
          data: {
            keyword: this.keyword
          }
        })
      }
    }
  }
}
</script>
