/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.data-bind {
  display: flex;
  align-items: center;
  &__btn {
    // width: 80px;
    // height: 80px;
    @include pdt-img(64px);
    border: 1px solid $color-divider;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    overflow: inherit;
    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -10px;
      z-index: $z-index-level-8;
      color: $color-active;
      cursor: default;
    }
    .null-picker {
      margin-top: 15px;
      text-align: center;
      .icon {
        font-size: 20px;
      }
    }
  }
  &__path {
    position: relative;
    width: 190px;
    // flex: 1;
    // display: flex;
    // align-items: center;
    .path-wrap {
      flex: 1;
      position: relative;
      margin-top: 6px;
    }
    .custompath-wrap {
      margin-top: 6px;
    }
    .ivu-btn {
      padding: 2px;
    }
    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -8px;
      z-index: $z-index-level-8;
      color: $color-active;
      cursor: default;
    }
    &-con {
      height: 36px;
      line-height: 36px;
      border: 1px solid $color-divider;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
      text-align: center;
      // width: 100%;
      .icon-editor-link {
        margin-right: 4px;
      }
      .text {
        position: relative;
        top: -2px;
      }
    }
  }
  &.path-full {
    .data-bind__path {
      flex: 1;
    }
  }
}
</style>

<template>
  <div :class="`data-bind ${!imgPicker ? 'path-full' : ''}`">
    <div class="data-bind__btn" @click="handleSelectImg" v-if="imgPicker">
      <SpIcon icon="icon-delete1" @click.native.stop="handleDeleteImg" v-if="localImgData"></SpIcon>
      <template v-if="multiple">
        <div class="null-picker" v-if="localImgData.length == 0">
          <div class="icon">+</div>
          <div>选择图片</div>
        </div>
        <div class="null-picker" style="margin-top: 30px" v-if="localImgData.length > 0">
          <div>{{ `已选择(${localImgData.length})` }}</div>
        </div>
      </template>
      <template v-else>
        <img :src="localImgData" alt />
        <div class="null-picker" v-if="!localImgData">
          <div class="icon">+</div>
          <div>选择图片</div>
        </div>
      </template>
    </div>
    <div class="data-bind__path" v-if="pathPicker">
      <RadioGroup v-model="pathRaido" @on-change="handleOnRadioChange" v-if="customPath">
        <Radio label="path">
          <span>选择路径</span>
        </Radio>
        <Radio label="custom-path">
          <span>自定义路由</span>
        </Radio>
      </RadioGroup>
      <div class="path-wrap" @click="handleClickSetPath" v-if="pathRaido == 'path'">
        <SpIcon
          icon="icon-delete1"
          v-if="localPathData"
          @click.native.stop="handleDeletePath"
        ></SpIcon>
        <div class="data-bind__path-con">
          <i class="mshopdesign icon-editor-link"></i>
          <span class="text">{{ pathTitle }}</span>
        </div>
      </div>
      <div class="custompath-wrap" v-if="pathRaido == 'custom-path' && customPath">
        <Input
          v-model="localPathData.href"
          @on-blur="handleOnBlur"
          placeholder="http://www.xxx.com"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgPicker',
  components: {},
  props: {
    value: [Object, String, Array],
    imgData: [String, Array],
    pathData: [Object, Array],
    activeKey: {
      type: String,
      default: ''
    },
    imgOnChange: Function,
    pathOnChange: Function,
    imgPicker: {
      type: Boolean,
      default: true
    },
    pathPicker: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterMenu: Array,
    placeholder: {
      type: String,
      default: '设置路径'
    },
    customPath: {
      type: Boolean,
      default: true
    },
    maxSelsect: {
      type: [String, Number],
      default: 30
    }
  },
  data() {
    const _localImgData = this.imgPicker && this.pathPicker ? this.imgData : this.value
    const _localPathData = this.imgPicker && this.pathPicker ? this.pathData : this.value
    return {
      localImgData: _localImgData,
      localPathData: _localPathData,
      pathRaido:
        Object.keys(_localPathData).length == 0 || _localPathData.linkPage != 'href'
          ? 'path'
          : 'custom-path'
    }
  },
  computed: {
    pathTitle() {
      let _path_title = this.placeholder
      const { multiple, localPathData } = this
      if (multiple) {
        if (localPathData.length > 0) {
          switch (localPathData[0].linkPage) {
            case 'goods':
              _path_title = `${localPathData[0].linkPageLabel}（${localPathData.length}）`
              break
          }
        }
      } else {
        if (Object.getOwnPropertyNames(localPathData).length > 0) {
          switch (localPathData.linkPage) {
            case 'goods':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.itemName}`
              break
            case 'category':
            case 'maincategory':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.category_name}`
              break
            case 'brand':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.attribute_name}`
              break
            case 'tag':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.tag_name}`
              break
            case 'management':
            case 'bring':
            case 'page':
            case 'marketing':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.title}`
              break
            case 'seckill':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.activity_name}`
              break
            case 'customer':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.template_title}`
              break
            case 'live':
              _path_title = `${localPathData.linkPageLabel}: ${localPathData.name}`
              break
          }
        }
      }
      return _path_title
    }
  },
  methods: {
    /** 图片选择 */
    async handleSelectImg() {
      const res = await this.$picker('img', {
        data: {},
        multiple: this.multiple
      })
      let result
      if (this.multiple) {
        result = res.data.map((item) => {
          return item.url
        })
      } else {
        result = res.data.url
      }

      this.localImgData = result
      this.$emit('input', result)
      this.imgOnChange && this.imgOnChange(result)
      this.$emit('imgOnChange', result)
    },
    handleDeleteImg() {
      const result = this.multiple ? [] : ''
      this.localImgData = result
      this.$emit('input', result)
      this.imgOnChange && this.imgOnChange(result)
      this.$emit('imgOnChange', result)
    },
    // 路径选择
    async handleClickSetPath() {
      console.log('handleClickSetPath', this.localPathData)
      const res = await this.$picker('path', {
        data: JSON.parse(JSON.stringify(this.localPathData)),
        multiple: this.multiple,
        filterMenu: this.filterMenu,
        activeKey: this.activeKey
      })
      console.log('$picker component result:', res.data)
      this.localPathData = res.data
      this.$emit('input', res.data)
      this.pathOnChange && this.pathOnChange(res.data)
      this.$emit('pathOnChange', res.data)
    },
    // 自定义路径onchange
    handleOnBlur() {
      this.$emit('input', this.localPathData)
      this.pathOnChange && this.pathOnChange(this.localPathData)
      this.$emit('pathOnChange', this.localPathData)
    },
    handleDeletePath() {
      const result = this.multiple ? [] : {}
      this.localPathData = result
      this.$emit('input', result)
      this.pathOnChange && this.pathOnChange(result)
      this.$emit('pathOnChange', result)
    },
    // 自定义路由、path切换
    handleOnRadioChange() {
      if (this.pathRaido == 'custom-path') {
        const result = {
          linkPage: 'href',
          href: ''
        }
        this.localPathData = result
        this.pathOnChange && this.pathOnChange(result)
        this.$emit('pathOnChange', result)
      } else {
        this.localPathData = {}
        this.pathOnChange && this.pathOnChange({})
        this.$emit('pathOnChange', {})
      }
    }
  }
}
</script>
