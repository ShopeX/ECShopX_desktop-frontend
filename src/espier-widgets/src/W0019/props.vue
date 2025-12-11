/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-W0019-props {
  .wgt-props {
    display: flex;
    align-items: center;
    margin: 20px 0 10px;

    &_img {
      flex: 0;
      width: 60px;
      height: 60px;
      cursor: pointer;

      img {
        width: 60px;
        height: 60px;
      }
    }

    &_delete {
      flex: 0;
      width: 30px;
      cursor: pointer;
      padding-top: 5px;
      text-align: center;

      .icon-shanchu {
        color: #3091f2;
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

  .tip {
    margin-top: 8px;
    color: #d01717;
  }
}
</style>
<template>
  <div class="widget-W0019-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="基本设置">
          <attr-field label="标题：">
            <Input v-model="activeElement.text" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtTitleBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attrField label="标题圆角：">
            <iSwitch size="small" v-model="activeElement.wgtTitleBorderRadius" />
          </attrField>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtTitleTextColor"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="标设置">
          <Button type="primary" style="width: 100%; margin: 0 auto" @click="tatListOnChange">
            选择标签</Button
          >
        </panelBar>
        <panelBar title="更多 标题设置">
          <attr-field label="标题：">
            <Input v-model="activeElement.moreText" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtMoreTitleFontSize"
              size="small"
              :min="10"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtMoreTitleColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="右边距：">
            <InputNumber
              v-model="activeElement.wgtMoreRightMargin"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
        </panelBar>

        <panelBar title="商家设置">
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtShopNameColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体大小：">
            <InputNumber
              v-model="activeElement.wgtShopNameFontSize"
              size="small"
              :min="14"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attrField label="边框">
            <iSwitch size="small" v-model="activeElement.wgtShopBorder" />
          </attrField>
          <div class="division"></div>
          <attr-field label="边框颜色：">
            <color-picker v-model="activeElement.wgtShopBorderColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="边框宽度：">
            <InputNumber
              v-model="activeElement.wgtShopBorderWidth"
              size="small"
              :min="0"
              :max="5"
            ></InputNumber>
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
import { panelBar, attrField, dataBind, colorPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0019Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    colorPicker,
    basicSet
  },
  methods: {
    //选择标签
    async tatListOnChange() {
      let selectList = JSON.parse(JSON.stringify(this.activeElement.selectTagList))

      const { data } = await this.$picker('shop-tag', {
        data: [],
        allList: JSON.parse(JSON.stringify(this.activeElement.allTagList)),
        selectList: selectList.slice(1, selectList.length),
        multiple: true
      })
      data.unshift({ 'tag_id': -1, 'tag_name': '全部' })
      this.activeElement.selectTagList = data
    }
  }
}
</script>
