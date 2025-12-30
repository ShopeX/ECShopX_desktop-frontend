/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.basic-set {
  .icon-link {
    cursor: pointer;
    &.proportion {
      color: #4575dd;
    }
  }
  .ivu-row {
    margin-right: 16px;
  }
  .ivu-slider-wrap {
    margin: 8px 0;
  }
}
</style>

<template>
  <div class="basic-set">
    <panelBar title="位置" v-if="value.leaf">
      <attrField label="X：">
        <InputNumber size="small" v-model="value.x"></InputNumber>
      </attrField>
      <div class="division"></div>
      <attrField label="Y：">
        <InputNumber size="small" v-model="value.y"></InputNumber>
      </attrField>
    </panelBar>

    <panelBar title="大小">
      <attrField label="等比例：">
        <iSwitch size="small" :disabled="value.proportionDisabled" v-model="value.proportion" />
      </attrField>
      <div class="division"></div>

      <attrField label="宽度：">
        <!-- width: {{value.width}};  height: {{value.height}} -->
        <Row>
          <Col span="12">
            <InputNumber
              v-model="value.width"
              @on-change="onChangeWidth"
              @on-blur="onBlurWidth"
              :disabled="value.widthDisabled"
              size="small"
              :min="0"
              :max="pageWidth"
            ></InputNumber>
          </Col>
          <Col span="12"
            ><Slider v-model="sliderWidth" :disabled="value.widthDisabled" :max="pageWidth"></Slider
          ></Col>
        </Row>
      </attrField>
      <div class="division"></div>

      <attrField label="高度：">
        <Row>
          <Col span="12">
            <InputNumber
              v-model="value.height"
              @on-change="onChangeHeight"
              @on-blur="onBlurHeight"
              :disabled="value.heightDisabled"
              :min="0"
              size="small"
            ></InputNumber>
          </Col>
          <!-- <Col span="12">
            <Slider v-model="sliderHeight" v-if="value.height != 'auto'" :max="1000"></Slider>
            <Slider v-else :disabled="value.height == 'auto'" :max="1000"></Slider>
          </Col> -->
        </Row>
      </attrField>
    </panelBar>

    <panelBar title="外边距">
      <attrField label="上边：">
        <InputNumber v-model="value.marginTop" size="small"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="下边：">
        <InputNumber v-model="value.marginBottom" size="small"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="右边：">
        <InputNumber
          v-if="value.marginRight != 'auto'"
          v-model="value.marginRight"
          size="small"
        ></InputNumber>
        <InputNumber v-else :disabled="value.marginRight == 'auto'" size="small"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="左边：">
        <InputNumber
          v-if="value.marginLeft != 'auto'"
          v-model="value.marginLeft"
          size="small"
        ></InputNumber>
        <InputNumber v-else :disabled="value.marginLeft == 'auto'" size="small"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="位置：">
        <RadioGroup v-model="position" @on-change="handleChangeAlign">
          <Radio label="left">
            <span>居左</span>
          </Radio>
          <Radio label="center">
            <span>居中</span>
          </Radio>
          <Radio label="right">
            <span>居右</span>
          </Radio>
        </RadioGroup>
      </attrField>
    </panelBar>

    <panelBar title="内边距">
      <attrField label="上边：">
        <InputNumber v-model="value.paddingTop" size="small" :min="0"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="右边：">
        <InputNumber v-model="value.paddingRight" size="small" :min="0"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="下边：">
        <InputNumber v-model="value.paddingBottom" size="small" :min="0"></InputNumber>
      </attrField>
      <div class="division"></div>

      <attrField label="左边：">
        <InputNumber v-model="value.paddingLeft" size="small" :min="0"></InputNumber>
      </attrField>
    </panelBar>

    <panelBar title="边框">
      <attrField label="上边：">
        <Row>
          <Col span="12"
            ><InputNumber v-model="value.borderTopWidth" :min="0" size="small"></InputNumber
          ></Col>
          <Col span="12"><color-picker v-model="value.borderTopColor"></color-picker></Col>
        </Row>
      </attrField>
      <div class="division"></div>
      <attrField label="右边：">
        <Row>
          <Col span="12"
            ><InputNumber v-model="value.borderRightWidth" :min="0" size="small"></InputNumber
          ></Col>
          <Col span="12"><color-picker v-model="value.borderRightColor"></color-picker></Col>
        </Row>
      </attrField>
      <div class="division"></div>
      <attrField label="下边：">
        <Row>
          <Col span="12"
            ><InputNumber v-model="value.borderBottomWidth" :min="0" size="small"></InputNumber
          ></Col>
          <Col span="12"><color-picker v-model="value.borderBottomColor"></color-picker></Col>
        </Row>
      </attrField>
      <div class="division"></div>
      <attrField label="左边：">
        <Row>
          <Col span="12"
            ><InputNumber v-model="value.borderLeftWidth" :min="0" size="small"></InputNumber
          ></Col>
          <Col span="12"><color-picker v-model="value.borderLeftColor"></color-picker></Col>
        </Row>
      </attrField>
    </panelBar>

    <panelBar title="颜色">
      <attrField label="前景：">
        <color-picker v-model="value.foregroundColor"></color-picker>
      </attrField>
      <div class="division"></div>
      <attrField label="背景：">
        <color-picker v-model="value.backgroundColor"></color-picker>
      </attrField>
    </panelBar>
  </div>
</template>

<script>
import { attrField, panelBar, colorPicker } from './comps'
import { log } from '@/utils'
import { mapState } from 'vuex'
export default {
  name: 'basicSet',
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
      position: null,
      // 等比例显示
      // proportion: this.value.proportion,
      imgWidth: 15, // 默认比例
      imgHeight: 8,
      sliderWidth: this.value.width,
      sliderHeight: this.value.height
    }
  },
  computed: {
    ...mapState({
      pageWidth: (state) => state.pageWidth
    })
  },
  watch: {
    'value.imgUrl': async function (nval, oval) {
      const { width, height } = await this.readImgData()
      console.log(`img info width: ${width}, height: ${height}`)
      this.imgWidth = width
      this.imgHeight = height
      if (this.value.proportion) {
        this.value.height = this.getImageHeightByWidth()
      }
    },
    // 'value.widthFull': async function(nval, oval) {
    //   if (nval) {
    //     this.value.width = 'auto'
    //     this.value.height = 'auto'
    //   }
    // },
    sliderWidth: {
      handler: function (nval, oval) {
        if (nval != oval) {
          this.value.width = nval
          this.onChangeWidth()
        }
      },
      deep: true
    },
    sliderHeight: {
      handler: function (nval, oval) {
        if (nval != oval) {
          this.value.height = nval
          this.onChangeHeight()
        }
      },
      deep: true
    }
  },
  async mounted() {
    // marginLeft: auto | number
    if (this.value.marginLeft === 'auto' && this.value.marginRight === 'auto') {
      this.position = 'center'
    } else if (this.value.marginLeft === 0 && this.value.marginRight === 'auto') {
      this.position = 'left'
    } else if (this.value.marginLeft === 'auto' && this.value.marginRight === 0) {
      this.position = 'right'
    }
    if (this.value.imgUrl) {
      const { width, height } = await this.readImgData()
      this.imgWidth = width
      this.imgHeight = height
    }
  },
  methods: {
    // 根据宽度求高度
    getImageHeightByWidth() {
      const { width = 0 } = this.value
      return Math.floor((this.imgHeight * width) / this.imgWidth)
    },
    // 根据高度求宽度
    getImageWidthByHeight() {
      const { height = 0 } = this.value
      return Math.floor((this.imgWidth * height) / this.imgHeight)
    },
    onBlurWidth() {
      this.sliderWidth = this.value.width
    },
    onBlurHeight() {
      this.sliderHeight = this.value.height
    },
    handleChangeAlign() {
      switch (this.position) {
        case 'left':
          this.value.marginRight = 'auto'
          this.value.marginLeft = 0
          break
        case 'center':
          this.value.marginRight = 'auto'
          this.value.marginLeft = 'auto'
          break
        case 'right':
          this.value.marginRight = 0
          this.value.marginLeft = 'auto'
          break
      }
    },
    onChangeWidth() {
      if (this.value.proportion && this.value.proportion != 'disabled') {
        const height = this.getImageHeightByWidth()
        this.value.height = height
        // this.sliderHeight = height
      }
    },
    onChangeHeight() {
      if (this.value.proportion && this.value.proportion != 'disabled') {
        const width = this.getImageWidthByHeight()
        this.value.width = width
        // this.sliderWidth = width
      }
    },
    readImgData() {
      return new Promise((resolve) => {
        var image = new Image()
        image.src = this.value.imgUrl
        image.onload = function () {
          log.debug('[plugin styleWhHeight] readImgData', this.width, this.height)
          resolve({ width: this.width, height: this.height })
        }
      })
    }
  }
}
</script>
