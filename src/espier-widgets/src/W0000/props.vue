/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0000-props {
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    &-item {
      height: 36px;
      line-height: 36px;
      border: 1px solid $color-border-gray-light;
      padding: 0 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .ivu-icon-ios-trash-outline {
        cursor: pointer;
      }
    }
  }
}
</style>
<template>
  <div class="widget-w0000-props">
    <Tabs value="name1" :animated="false">
      <TabPane label="页面配置" name="name1" style="overflow: auto">
        <panelBar title="设置">
          <attrField label="背景：">
            <colorPicker v-model="activeElement.backgroundColor"></colorPicker>
          </attrField>
          <div class="division"></div>
          <attrField label="主题：">
            <!-- {{activeElement}} -->
            <colorPicker v-model="activeElement.themeColor"></colorPicker>
          </attrField>
        </panelBar>
        <panelBar title="挂件">
          <!-- <div v-for="(widget, index) in widgets" :key="`widget-${index}`">
            {{ `${widget.type}（${widget.name}）` }}
          </div> -->

          <draggable
            :list="widgets"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @end="draggableEnd"
          >
            <div
              class="list-group-item"
              v-for="(widget, index) in widgets"
              :key="`widget-${index}`"
              @click="handleWidgetClick(widget)"
            >
              {{ `【${index + 1 < 10 ? '0' : ''}${index + 1}】${widget.type}（${widget.name}）` }}
              <Icon type="ios-trash-outline" size="16" @click.stop="handleDelete(widget)" />
            </div>
          </draggable>

          <!-- <attrField label="背景：">
            <colorPicker v-model="activeElement.backgroundColor"></colorPicker>
          </attrField> -->
        </panelBar>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
import { mapMutations, mapState } from 'vuex'
import { panelBar, attrField, colorPicker } from '../../common/comps'
export default {
  name: 'W0000Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      widgets: (state) => {
        return state.pagedata.widgets.filter((item) => item.type != 'W0000')
      }
    })
  },
  components: {
    panelBar,
    attrField,
    colorPicker
    // draggable
  },
  methods: {
    ...mapMutations(['DELETE_WIDGET', 'CHANGE_WIDGET_SORT', 'SELECT_ELE']),
    checkMove(e) {
      console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    handleDelete(item) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该挂件？',
        onOk: () => {
          this.DELETE_WIDGET(item.uuid)
          this.$Message.success('删除成功！')
        }
      })
    },
    draggableEnd(e) {
      console.log('draggableEnd:', e)
      this.CHANGE_WIDGET_SORT({ index1: e.oldIndex + 1, index2: e.newIndex + 1 })
    },
    handleWidgetClick(item) {
      this.SELECT_ELE(item.uuid)
    }
  }
}
</script>
