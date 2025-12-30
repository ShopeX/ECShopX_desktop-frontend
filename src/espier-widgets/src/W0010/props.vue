/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss"></style>

<template>
  <div class="widget-0010-props">
    <Tabs value="name1" :animated="false">
      <TabPane :label="`${activeElement.name}[${activeElement.type}]`" name="name1">
        <panelBar title="属性">
          <!-- <attr-field label="主题：">
            <color-picker v-model="activeElement.wgtTheme"></color-picker>
          </attr-field> -->

          <attr-field label="主题：" labelTop>
            <iSwitch size="small" v-model="activeElement.customerThemeEnabled" />
            <div class="division"></div>
            <color-picker v-model="activeElement.wgtTheme"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体：">
            <color-picker v-model="activeElement.wgtTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="边框大小：">
            <InputNumber
              v-model="activeElement.wgtBorderRadius"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="边框颜色：">
            <color-picker v-model="activeElement.wgtAaaa"></color-picker>
          </attr-field>
        </panelBar>
      </TabPane>
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { panelBar, attrField, colorPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
import { fontSizeList, fontFamilyList } from '../../mixins/common-props'
export default {
  name: 'W0010Props',
  props: ['activeElement'],
  components: {
    panelBar,
    attrField,
    basicSet,
    colorPicker
  },
  data() {
    return {
      fontFamilyList: fontFamilyList,
      fontSizeList: fontSizeList
    }
  },
  watch: {
    'value.fontSize': {
      handler: function (nval, oval) {
        this.activeElement.height = Math.floor(this.activeElement.fontSize / 0.6)
      },
      deep: true
    }
  },
  methods: {
    async handleEventClick() {
      const val = await this.$picker('goods-tag', {
        data: ''
      })
      console.log(val)
      // this.demoVal2 = val
    },
    handleInputChange() {
      document.getElementById('wtext-copy').textContent = this.activeElement.text
      this.calcElementSize()
    },
    handleInputFocus() {
      this.copySpanElement()
    },
    handleInputBlur() {
      this.removeSpanElement()
    },
    handldeOnOpenChange(e) {
      if (e) {
        this.copySpanElement()
      }
    },
    handleOnChangeFontSize() {
      document.getElementById('wtext-copy').style.fontSize = this.activeElement.fontSize + 'px'
      this.calcElementSize()
      setTimeout(() => {
        this.removeSpanElement()
      }, 50)
    },
    copySpanElement() {
      const dom = document.createElement('span')
      dom.id = 'wtext-copy'
      dom.style.display = 'inline-block'
      dom.style.whiteSpace = 'pre-wrap'
      dom.style.fontSize = this.activeElement.fontSize + 'px'
      dom.textContent = this.activeElement.text
      document.body.appendChild(dom)
    },
    removeSpanElement() {
      document.getElementById('wtext-copy').remove()
    },
    calcElementSize() {
      const { width, height } = document.getElementById('wtext-copy').getBoundingClientRect()
      this.activeElement.width = width + 20
      this.activeElement.height = height + 4
    }
  }
}
</script>
