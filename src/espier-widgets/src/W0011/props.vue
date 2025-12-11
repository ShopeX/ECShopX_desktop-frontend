/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss"></style>

<template>
  <div class="widget-0011-props">
    <Tabs value="name1" :animated="false">
      <TabPane :label="`${activeElement.name}[${activeElement.type}]`" name="name1">
        <panelBar title="文本内容">
          <Input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            @on-change="handleInputChange"
            @on-focus="handleInputFocus"
            @on-blur="handleInputBlur"
            v-model="activeElement.text"
          ></Input>
        </panelBar>
        <panelBar title="属性">
          <attrField label="大小：">
            <Select
              v-model="activeElement.fontSize"
              :transfer="true"
              size="small"
              style="width: 82px"
              @on-change="handleOnChangeFontSize"
              @on-open-change="handldeOnOpenChange"
            >
              <Option v-for="item in fontSizeList" :value="item.value" :key="item.value">{{
                item.label
              }}</Option>
            </Select>
          </attrField>
          <div class="division"></div>
          <attrField label="对齐：">
            <ButtonGroup size="small">
              <Button
                :type="activeElement.textAlign == 'left' ? 'primary' : 'default'"
                @click="activeElement.textAlign = 'left'"
              >
                <SpIcon icon="icon-editor-align-left"></SpIcon>
              </Button>
              <Button
                :type="activeElement.textAlign == 'center' ? 'primary' : 'default'"
                @click="activeElement.textAlign = 'center'"
              >
                <SpIcon icon="icon-editor-align-center"></SpIcon>
              </Button>
              <Button
                :type="activeElement.textAlign == 'right' ? 'primary' : 'default'"
                @click="activeElement.textAlign = 'right'"
              >
                <SpIcon icon="icon-editor-align-right"></SpIcon>
              </Button>
            </ButtonGroup>
          </attrField>
          <div class="division"></div>
          <attrField label="字重：">
            <ButtonGroup size="small">
              <Button
                :type="activeElement.fontWeight == 'bold' ? 'primary' : 'default'"
                @click="
                  activeElement.fontWeight =
                    activeElement.fontWeight === 'normal' ? 'bold' : 'normal'
                "
              >
                <SpIcon icon="icon-editor-bold"></SpIcon>
              </Button>
              <Button
                :type="activeElement.fontStyle == 'italic' ? 'primary' : 'default'"
                @click="
                  activeElement.fontStyle =
                    activeElement.fontStyle === 'normal' ? 'italic' : 'normal'
                "
              >
                <SpIcon icon="icon-editor-italic"></SpIcon>
              </Button>
              <Button
                :type="activeElement.textDecoration == 'underline' ? 'primary' : 'default'"
                @click="
                  activeElement.textDecoration =
                    activeElement.textDecoration === 'none' ? 'underline' : 'none'
                "
              >
                <SpIcon icon="icon-editor-underline"></SpIcon>
              </Button>
            </ButtonGroup>
          </attrField>
          <div class="division"></div>
          <attrField label="颜色：">
            <colorPicker v-model="activeElement.color"></colorPicker>
          </attrField>
        </panelBar>
        <panelBar title="链接">
          <dataBind v-model="activeElement.data" :imgPicker="false"></dataBind>
        </panelBar>
      </TabPane>
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { panelBar, attrField, dataBind, colorPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
import { fontSizeList, fontFamilyList } from '../../mixins/common-props'
export default {
  name: 'W0011Props',
  props: ['activeElement'],
  components: {
    panelBar,
    attrField,
    basicSet,
    dataBind,
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
