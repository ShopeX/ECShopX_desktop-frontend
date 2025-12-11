/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0008-props {
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .hot-keyword__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .hotword-input {
    margin-bottom: 10px;
  }
  .tip {
    margin-left: 10px;
    font-size: 12px;
    color: red;
  }
}
</style>
<template>
  <div class="widget-w0008-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="基本设置">
          <attr-field label="搜索显示：">
            <iSwitch size="small" v-model="activeElement.isShowBtn" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="搜索占位：">
            <Input v-model="activeElement.placeholder" placeholder="搜索placeholder"></Input>
          </attr-field>

          <!-- <attr-field label="自定义主题：">
            <iSwitch size="small" v-model="activeElement.isShowBtn"/>
          </attr-field>
          <div class="division"></div> -->
          <!-- customerThemeEnabled: {{activeElement.customerThemeEnabled}} -->
          <div class="division"></div>
          <attr-field label="主题：" labelTop>
            <iSwitch size="small" v-model="activeElement.customerThemeEnabled" />
            <div class="division"></div>
            <color-picker v-model="activeElement.wgtTheme"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="按钮字体：">
            <color-picker v-model="activeElement.wgtTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="按钮背景：">
            <color-picker v-model="activeElement.wgtTextColor1"></color-picker>
            <color-picker v-model="activeElement.wgtTextColor2"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="热门搜索">
          <Button type="primary" @click="handleAddHotSearch" long>添加热门搜索</Button>
          <div class="division"></div>
          <div
            class="hot-keyword__item"
            v-for="(item, idx) in activeElement.data"
            :key="`hotsearch-item__${idx}`"
          >
            <Collapse>
              <Panel :name="idx.toString()">
                热门关键词{{ Number(idx) + 1 }}
                <span class="delete-btn">
                  <Icon type="ios-trash-outline" size="16" @click.stop="handleDelete(idx)" />
                </span>
                <div slot="content">
                  <Input class="hotword-input" v-model="item.title" placeholder="热门关键字" />
                  <attr-field label="字体颜色：">
                    <color-picker v-model="item.wgtHotKeywordTextColor"></color-picker>
                  </attr-field>
                  <dataBind v-model="item.pathData" :imgPicker="false"></dataBind>
                </div>
              </Panel>
            </Collapse>
          </div>
          <!-- <attr-field label="价格颜色：">
            <InputNumber
              v-model="activeElement.columnNums"
              size="small"
              :max="5"
              :min="2"
            ></InputNumber>
          </attr-field> -->
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
  name: 'W0008Props',
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
    handleAddHotSearch(val) {
      this.activeElement.data.push({
        title: '',
        pathData: {},
        wgtHotKeywordTextColor: '#8C8C8C'
      })
    },
    handleDelete(idx) {
      this.activeElement.data.splice(idx, 1)
    }
  }
}
</script>
