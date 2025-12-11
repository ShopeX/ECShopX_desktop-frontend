/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.font-set {
  i {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="font-set">
    <panelBar title="字体设置">
      <attrField label="大小" :tag="true">
        <Select v-model="value.fontSize" :transfer="true" size="small" style="width: 82px">
          <Option v-for="item in fontSizeList" :value="item.value" :key="item.value">{{
            item.label
          }}</Option>
        </Select>
      </attrField>
      <div class="division"></div>
      <attrField label="对齐" :tag="true">
        <ButtonGroup size="small">
          <Button
            :type="value.textAlign == 'left' ? 'primary' : 'default'"
            @click="value.textAlign = 'left'"
          >
            <SpIcon icon="icon-editor-align-left"></SpIcon>
          </Button>
          <Button
            :type="value.textAlign == 'center' ? 'primary' : 'default'"
            @click="value.textAlign = 'center'"
          >
            <SpIcon icon="icon-editor-align-center"></SpIcon>
          </Button>
          <Button
            :type="value.textAlign == 'right' ? 'primary' : 'default'"
            @click="value.textAlign = 'right'"
          >
            <SpIcon icon="icon-editor-align-right"></SpIcon>
          </Button>
        </ButtonGroup>
      </attrField>
      <div class="division"></div>
      <attrField label="字重" :tag="true">
        <ButtonGroup size="small">
          <Button
            :type="value.fontWeight == 'bold' ? 'primary' : 'default'"
            @click="value.fontWeight = value.fontWeight === 'normal' ? 'bold' : 'normal'"
          >
            <SpIcon icon="icon-editor-bold"></SpIcon>
          </Button>
          <Button
            :type="value.fontStyle == 'italic' ? 'primary' : 'default'"
            @click="value.fontStyle = value.fontStyle === 'normal' ? 'italic' : 'normal'"
          >
            <SpIcon icon="icon-editor-italic"></SpIcon>
          </Button>
          <Button
            :type="value.textDecoration == 'underline' ? 'primary' : 'default'"
            @click="
              value.textDecoration = value.textDecoration === 'normal' ? 'underline' : 'normal'
            "
          >
            <SpIcon icon="icon-editor-underline"></SpIcon>
          </Button>
        </ButtonGroup>
      </attrField>
      <div class="division"></div>
      <attrField label="颜色" :tag="true">
        <colorPicker v-model="value.color"></colorPicker>
      </attrField>
    </panelBar>
  </div>
</template>

<script>
import { attrField, panelBar, colorPicker } from './comps'
import { fontSizeList, fontFamilyList } from '../mixins/common-props'
export default {
  name: 'fontSet',
  components: {
    attrField,
    panelBar,
    colorPicker
  },
  props: {
    value: Object
  },
  data() {
    return {
      fontFamilyList: fontFamilyList,
      fontSizeList: fontSizeList
    }
  }
}
</script>
