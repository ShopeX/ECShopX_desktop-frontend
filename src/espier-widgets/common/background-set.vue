/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div>
    <attr-field :label="name" :tag="true" style="margin-bottom: 10px">
      <RadioGroup v-model="t_radio">
        <Radio label="color">
          <span>纯色</span>
        </Radio>
        <Radio label="img" v-if="showImg">
          <span>图片</span>
        </Radio>
      </RadioGroup>
    </attr-field>
    <attr-field label v-if="t_radio == 'img'">
      <!-- {{t_imgUrl}} -->
      <Row :gutter="12">
        <Col span="24">
          <!-- <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg','png']"
                    :max-size="3072"
                    :before-upload="handleUpload"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :action="baseUrl + '/formImgUpload'"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;text-align: center;
    border: 1px dashed #cdcdcd;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
                <div style="display: inline-block;
                    position: relative;
                    top: 20px;
                    left: 5px;
                }">
                    小于3M（jpg、png）
                </div> -->
          <!-- vans 修改，取消图片图库选择 -->
          <!-- <div style="width: 100px;height:100px;line-height: 100px;background: transparent"
                 class="ivu-upload ivu-upload-drag"
                 @click="modal1 = true">
                    <img :src="t_imgUrl" alt="" style="width:100%;height:100%">
                    <Icon v-if="!t_imgUrl" type="camera" size="30"></Icon>
                </div> -->
          <m-upload v-model="t_imgUrl"></m-upload>
        </Col>
      </Row>
      <attr-field label="透明度:" v-if="showOpacity">
        <Slider v-model="t_opacity" show-input input-size="small"></Slider>
      </attr-field>
    </attr-field>
    <attr-field label v-if="t_radio == 'color'">
      <Row :gutter="12">
        <Col span="12">
          <attr-field label="纯色:">
            <color-picker v-model="t_backgroundColor"></color-picker>
          </attr-field>
        </Col>
      </Row>
      <attr-field label="透明度:" v-if="showOpacity">
        <Slider v-model="t_opacity" show-input input-size="small"></Slider>
      </attr-field>
    </attr-field>
    <!-- <image-pickers :showModal.sync="modal1" :imgUrl.sync="t_imgUrl"></image-pickers> -->
  </div>
</template>

<script>
import attrField from './comps/attr-field'
import colorPicker from './comps/color-picker'
import mixins from './../mixins'
import mUpload from './../../components/mUpload'

export default {
  name: 'background',
  mixins: [mixins],
  components: {
    attrField,
    colorPicker,
    mUpload
  },
  props: {
    backgroundColor: {
      type: String
    },
    opacity: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    type: {
      type: String,
      default: '纯色'
    },
    showOpacity: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: '背景'
    },
    radioImg: {
      type: String,
      defalut: 'color'
    },
    showImg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      t_radio: this.radioImg,
      t_backgroundColor: this.backgroundColor,
      t_opacity: this.opacity * 100,
      modal1: false,
      t_imgUrl: this.imgUrl
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    t_backgroundColor(newVal, oldVal) {
      this.$emit('update:backgroundColor', newVal)
    },
    t_opacity(newVal, oldVal) {
      this.$emit('update:opacity', newVal / 100)
    },
    t_radio(newVal, oldVal) {
      this.$emit('update:radioImg', newVal)
    },
    t_imgUrl(newVal, oldVal) {
      this.$emit('update:imgUrl', newVal)
    }
  },
  methods: {
    handleSelect(item) {
      this.defaultList.forEach((v) => {
        v.isActive = false
      })
      item.isActive = !item.isActive
      this.choosenId = item.id
    },
    handleSuccess(res, file) {
      console.log(res, file)
      this.msg()
      if (res.code === 0) {
        this.t_imgUrl = res.result.url
      }
    },
    handleFormatError(file) {
      this.msg()
      this.$Message.warning('请选择jpg、png格式')
    },
    handleMaxSize(file) {
      this.msg()
      this.$Message.warning('图片文件不能超过3M')
    },
    handleUpload() {
      this.msg = this.$Message.loading({
        content: '图片上传中',
        duration: 0
      })
    }
  }
}
</script>

<style lang="less">
.ivu-input-number-handler-wrap {
  opacity: 1 !important;
}
</style>
