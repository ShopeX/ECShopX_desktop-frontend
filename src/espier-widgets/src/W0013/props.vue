/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0013-props {
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
  <div class="widget-w0013-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="颜色">
          <attr-field label="菜单选中：">
            <color-picker v-model="activeElement.wgtTheme"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体：">
            <color-picker v-model="activeElement.wgtTextColor"></color-picker>
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
  name: 'W0013Props',
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
        pathData: {}
      })
    },
    handleDelete(idx) {
      this.activeElement.data.splice(idx, 1)
    }
  }
}
</script>
