/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0016-props {
  .point-style {
    .attr-field__label {
      margin-top: 30px;
    }
  }
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .style-picker {
    display: flex;
    flex-wrap: wrap;
  }
  .goods-con {
    .wgt-props {
      display: flex;
      margin: 20px 0 10px;
      &_img {
        flex: 0;
        width: 60px;
        height: 60px;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
      }
      &_delete {
        flex: 0;
        width: 30px;
        cursor: pointer;
        padding-top: 5px;
        text-align: center;
        .ivu-icon {
          font-size: 20px;
          color: #f56c6c;
        }
      }
      &_content {
        flex: 1;
        padding: 5px 10px;
        .title {
          font-size: 12px;
          font-weight: 400;
          @include mult-ellipsis(2);
        }
        .tag {
          .tag-item {
            padding: 2px 3px;
            // border: 1px solid rgba(247, 137, 137, 1);
            border-radius: 3px;
            font-size: 12px;
            color: #f56c6c;
            background-color: rgba(254, 240, 240, 1);
            margin-right: 3px;
            // @include mult-ellipsis(1)
          }
        }
      }
    }
  }

  .coupon-con {
    .wgt-props {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .img-picker {
        width: 80px;
        height: 80px;
      }
      &_img {
        margin-right: 10px;
      }
    }
  }
  .picker-coupon__btn {
    position: relative;
    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -8px;
      z-index: 800;
      color: #3091f2;
      cursor: default;
    }
  }
}
</style>

<template>
  <div class="widget-w0016-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="基本设置">
          <attr-field label="主标题：">
            <Input v-model="activeElement.mainTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体颜色：">
            <color-picker v-model="activeElement.wgtTitleColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="圆角：">
            <iSwitch size="small" v-model="activeElement.wgtBorderRadius" />
          </attr-field>

          <div class="division"></div>
          <attr-field label="副标题：">
            <Input v-model="activeElement.subTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtSubTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体颜色：">
            <color-picker v-model="activeElement.wgtSubTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>

          <div class="division"></div>
          <attr-field label="链接：" labelTop>
            <dataBind v-model="activeElement.linkPath" :imgPicker="false"></dataBind>
          </attr-field>
        </panelBar>
        <panelBar title="排版">
          <attr-field label="样式：" labelTop>
            <select-picker
              :data="styleList"
              v-model="activeElement.styleType"
              label="label"
              icon="img"
            ></select-picker>
          </attr-field>
        </panelBar>
        <panelBar :title="styleTitle">
          <!-- 橱窗一 -->
          <div v-if="activeElement.styleType == 0">
            <template v-for="(item, index) in activeElement.data[0]">
              <dataBind
                :imgData="activeElement.data[0][index].imgUrl"
                :pathData="activeElement.data[0][index].pathData"
                :key="`path-item-0-0__${index}`"
                :imgOnChange="handleImgOnChange.bind(this, 0, index)"
                :pathOnChange="handlePathOnChange.bind(this, 0, index)"
              >
              </dataBind>
              <div class="division" :key="`path-item-0-1__${index}`"></div>
            </template>
          </div>
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
import selectPicker from '../../common/select-picker'
import img10 from './img/10.png'
export default {
  name: 'W0016Props',
  props: ['activeElement'],
  data() {
    return {
      test: '',
      styleList: [{ img: img10, label: '商品图片', value: 0 }]
    }
  },
  computed: {
    styleTitle() {
      const fd = this.styleList.find((item) => item.value == this.activeElement.styleType)
      return fd ? fd.label : ''
    }
  },
  components: {
    panelBar,
    attrField,
    basicSet,
    dataBind,
    selectPicker,
    colorPicker
    // imgPicker
  },
  methods: {
    // 图片改变
    handleImgOnChange(didx, index, item) {
      this.activeElement.data[didx][index].imgUrl = item
    },
    handlePathOnChange(didx, index, item) {
      this.activeElement.data[didx][index].pathData = item
    }
  }
}
</script>
