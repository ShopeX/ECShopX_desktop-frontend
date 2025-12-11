/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.border-set {
}
</style>

<template>
  <div class="border-set">
    <panelBar title="边框设置">
      <attr-field label="边框" :tag="true">
        <Row :gutter="12">
          <Col span="11">
            <attr-field label="粗细：">
              <InputNumber v-model="value.borderWidth" size="small"></InputNumber>
            </attr-field>
          </Col>
          <Col span="11" offset="2">
            <attr-field label="样式：">
              <Select v-model="value.borderStyle" :transfer="true" size="small" placeholder>
                <Option v-for="item in borderStyleList" :value="item.value" :key="item.value">{{
                  item.label
                }}</Option>
              </Select>
            </attr-field>
          </Col>
        </Row>
      </attr-field>
      <div class="division"></div>
      <attr-field>
        <Row :gutter="12">
          <Col span="11">
            <attr-field label="颜色：">
              <colorPicker v-model="value.borderColor"></colorPicker>
            </attr-field>
          </Col>
        </Row>
      </attr-field>
      <div class="division"></div>
      <attr-field label="效果" :tag="true">
        <RadioGroup v-model="value.borderEffect">
          <Radio label="none">
            <span>无效果</span>
          </Radio>
          <Radio label="effect">
            <span>阴影</span>
          </Radio>
        </RadioGroup>
      </attr-field>
      <template v-if="value.borderEffect == 'effect'">
        <div class="division"></div>
        <attr-field>
          <Row :gutter="12">
            <Col span="11">
              <attr-field label="半径：">
                <InputNumber v-model="value.boxShadowBlur" size="small"></InputNumber>
              </attr-field>
            </Col>
            <Col span="11" offset="2">
              <attr-field label="颜色：">
                <color-picker v-model="value.boxShadowColor"></color-picker>
              </attr-field>
            </Col>
          </Row>
        </attr-field>
        <div class="division"></div>
        <attr-field>
          <Row :gutter="12">
            <Col span="11">
              <attr-field label="X偏移：">
                <InputNumber v-model="value.boxShadowH" size="small"></InputNumber>
              </attr-field>
            </Col>
            <Col span="11" offset="2">
              <attr-field label="Y偏移：">
                <InputNumber v-model="value.boxShadowW" size="small"></InputNumber>
              </attr-field>
            </Col>
          </Row>
        </attr-field>
      </template>
      <div class="division"></div>
      <attr-field label="样式" :tag="true">
        <Row :gutter="12">
          <Col span="11">
            <attr-field label="圆角：">
              <InputNumber v-model="value.borderRadius" size="small" :min="0"></InputNumber>
            </attr-field>
          </Col>
        </Row>
      </attr-field>
    </panelBar>
  </div>
</template>

<script>
import { attrField, panelBar, colorPicker } from './comps'

export default {
  name: 'borderSet',
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
      borderStyleList: [
        { value: 'normal', label: '无' },
        { value: 'dotted', label: '点线' },
        { value: 'solid', label: '实线' },
        { value: 'dashed', label: '虚线' }
      ]
    }
  }
}
</script>
