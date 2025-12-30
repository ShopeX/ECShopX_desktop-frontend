/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0022-props {
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .navs__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .nav-input {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class="widget-w0022-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="属性">
          <attr-field label="常开：">
            <iSwitch size="small" v-model="activeElement.hover" />
          </attr-field>
          <!-- <div class="division"></div>
          <attr-field label="相对位置：">
            <InputNumber v-model="activeElement.menuTop" size="small" :min="0"></InputNumber>
          </attr-field> -->
        </panelBar>
        <panelBar title="颜色">
          <attr-field label="商品分类背景：">
            <color-picker v-model="activeElement.wgtTypeBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="商品分类字体：">
            <color-picker v-model="activeElement.wgtTypeLabelColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="选中颜色：">
            <color-picker v-model="activeElement.wgtSelectColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="副标题颜色：">
            <color-picker v-model="activeElement.wgtSubTextColor"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="分类">
          <attr-field label="分类链接：">
            <dataBind
              :filterMenu="['maincategory']"
              v-model="activeElement.categoryData"
              :multiple="true"
              :imgPicker="false"
              :customPath="false"
              activeKey="category_id"
            ></dataBind>
          </attr-field>
        </panelBar>
        <panelBar title="菜单">
          <Button type="primary" @click="handleAddNav" long>添加菜单</Button>
          <div class="division"></div>
          <div
            class="navs__item"
            v-for="(item, idx) in activeElement.data"
            :key="`hotsearch-item__${idx}`"
          >
            <Collapse>
              <Panel :name="idx.toString()">
                菜单{{ Number(idx) + 1 }}
                <span class="delete-btn">
                  <Icon type="ios-trash-outline" size="16" @click.stop="handleDelete(idx)" />
                </span>
                <div slot="content">
                  <Input class="nav-input" v-model="item.title" placeholder="菜单名称" />
                  <attr-field label="字体颜色：">
                    <color-picker v-model="item.wgtHotKeywordTextColor"></color-picker>
                  </attr-field>

                  <div class="division"></div>
                  <dataBind v-model="item.pathData" :imgPicker="false"></dataBind>
                </div>
              </Panel>
            </Collapse>
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
export default {
  name: 'W0022Props',
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
    handleAddNav() {
      this.activeElement.data.push({
        title: '',
        pathData: {},
        wgtHotKeywordTextColor: '#333333'
      })
    },
    handleDelete(idx) {
      if (this.activeElement.data.length > 0) {
        this.activeElement.data.splice(idx, 1)
        this.$Message.success('删除成功！')
      }
    }
  }
}
</script>
