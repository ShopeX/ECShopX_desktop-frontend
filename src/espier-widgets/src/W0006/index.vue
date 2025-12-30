/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="widget-w0006" :style="widgetStyle">
    <slot></slot>
    <div class="widget-w0006-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-w0006-body widget-body" :style="widgetBodyStyle">
        <div class="empty-container" v-if="value.childWidgets.length === 0">
          <div>拖拽组件到自由面板</div>
          <div>{{ `${widgetBodyStyle.width} * ${widgetBodyStyle.height}` }}</div>
        </div>
        <!-- {{vLine}} -->

        <!-- <vue-draggable-resizable
        :w="200"
        :h="200"
        :parent="true"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :snapTolerance="10"
        @refLineParams="getRefLineParams"
        class="test1">
        </vue-draggable-resizable>

        <vue-draggable-resizable
        :w="200"
        :h="200"
        :parent="true"
        :x="210"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :snapTolerance="10"
        @refLineParams="getRefLineParams"
        class="test2">
      </vue-draggable-resizable>

      <vue-draggable-resizable
        :w="200"
        :h="200"
        :parent="true"
        :x="420"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :snapTolerance="10"
        @refLineParams="getRefLineParams"
        class="test3">
      </vue-draggable-resizable> -->
        <span
          class="ref-line v-line"
          v-for="(item, index) in vLine"
          v-show="item.display"
          :key="`vline_${index}`"
          :style="{ left: item.position, top: item.origin, height: item.lineLength }"
        />
        <span
          class="ref-line h-line"
          v-for="(item, index) in hLine"
          v-show="item.display"
          :key="`hline_${index}`"
          :style="{ top: item.position, left: item.origin, width: item.lineLength }"
        />
        <template v-for="(child, index) in value.childWidgets">
          <vue-draggable-resizable
            v-if="mode === 'design'"
            class="draggable-resizable"
            :key="index"
            :x="child.x"
            :y="child.y"
            :w="child.width + child.paddingLeft + child.paddingRight"
            :h="child.height + child.paddingTop + child.paddingBottom"
            :z="value.zindex ? value.zindex : 10000"
            :parent="true"
            :debug="false"
            :isConflictCheck="true"
            :snap="true"
            :snapTolerance="10"
            @click.native.stop="handleOnSelect(child.uuid)"
            @keyup.native.up="handleKeyPressUp(child.uuid)"
            @resizing="
              (left, top, width, height) => onResizingChild(child, left, top, width, height)
            "
            @dragging="(left, top) => onDrag(child, left, top)"
            @refLineParams="getRefLineParams"
          >
            <component
              :is="child.type"
              :data-type="child.type"
              :data-uuid="child.uuid"
              :in-layout="true"
              :page-props="pageProps"
              :value="child"
              :mode="mode"
              :key="child.uuid"
            >
              <i
                class="mshopdesign icon-shanchudelete31 deletechildwidget"
                @click.stop="deleteWidget(child.uuid)"
              ></i>
            </component>
          </vue-draggable-resizable>
          <component
            style="position: absolute"
            v-if="mode !== 'design'"
            :is="child.type"
            :data-type="child.type"
            :data-uuid="child.uuid"
            :in-layout="true"
            :value="child"
            :page-props="pageProps"
            :key="child.uuid"
            :rendertype="rendertype"
            :mode="mode"
            :style="{
              top: translatePx2Device(child.y),
              left: translatePx2Device(child.x)
            }"
            @callback="handleCallback"
          ></component>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
// import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
// import ImgWrap from '../../common/img-wrap'
import { log, CreateID } from '@/utils'
import Widgets from '../../src'
// import resizable from '../../common/resizable'
import { mapMutations, mapState } from 'vuex'

// import { mixin as clickaway } from 'vue-clickaway'
const WIDGET_NAME = 'W0006'
const WIDGET_IN_LAYOUT = [
  'W0001',
  'W0003',
  'W0011',
  'W0007',
  'W0008',
  'W0010',
  'W0012',
  'W0013',
  ,
  'W0014',
  'W0015',
  'W0016',
  'W0017',
  'W0018',
  'W0019',
  ,
  'W0020',
  'W0021',
  'W0022'
]

export default {
  name: WIDGET_NAME,
  icon: 'icon-ziyoumianban',
  title: '自由面板',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav1', 'nav1-1'],
  setting: {
    name: '自由面板',
    alias: '自由面板',
    text: '自由面板',
    type: WIDGET_NAME,
    ...attrs,
    height: 400,
    // 自由面板类型： header、body、footer
    comptyle: 'body',
    childWidgets: [],
    grid: false,
    zindex: 1000
  },
  data() {
    return {
      activeChildId: null,
      vLine: [],
      hLine: []
      // hackReset: true
    }
  },
  components: {
    // resizable,
    // VueDraggableResizable
  },
  computed: {
    ...mapState({
      activeEleId: (state) => state.activeEleId
    })
  },
  mounted() {
    if (this.isDesignMode()) {
      this.$el.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()
        let widgetName = e.dataTransfer.getData('Name')

        log.debug(`[widget-w0006] mindex drop name:`, widgetName)
        if (WIDGET_IN_LAYOUT.indexOf(widgetName) > -1) {
          const { left, top } = this.$el.getBoundingClientRect()
          const uuid = CreateID()
          console.log(Widgets[widgetName].setting)

          this.value.childWidgets.push({
            ...JSON.parse(JSON.stringify(Widgets[widgetName].setting)),
            x: e.x - left,
            y: e.y - top,
            uuid: uuid,
            leaf: true
          })
          this.SELECT_ELE(uuid)
        } else {
          console.log(`widgetName: ${widgetName}`)
          if (widgetName != 'null' && widgetName != 'W0006') {
            this.$Message.warning('不可放入自由面板')
          }
        }
      })
    }
  },
  methods: {
    ...mapMutations(['SELECT_ELE']),
    // 删除面板内部元件
    deleteWidget(uuid) {
      log.debug('[plugins panel] deleteWidget', uuid)
      // 不在元件组件内操作vuex
      // test
      // this.dispatch( 'viewport', 'widgetpanel.component.mouseenter', this.uuid )
      // this.$store.commit('MSHOPDESIGN_DELETE_IN_PANEL', { puuid, cuuid })

      this.value.childWidgets.forEach((item, index) => {
        if (item.uuid === uuid) {
          this.value.childWidgets.splice(index, 1)
        }
      })
      this.SELECT_ELE(this.value.uuid)
    },
    handleOnSelect(uuid) {
      this.SELECT_ELE(uuid)
    },
    handleCallback(params) {
      this.$emit('callback', params)
    },
    onResizingChild(child, left, top, width, height) {
      const { paddingTop, paddingRight, paddingBottom, paddingLeft } = child
      child.width = width - paddingRight - paddingLeft
      child.height = height - paddingTop - paddingBottom
    },
    // 元件拖动
    onDrag(child, left, top) {
      child.x = left
      child.y = top
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
      console.log(`getRefLineParams: `, JSON.stringify(params))
    },
    handleKeyPressUp(uuid) {
      console.log(uuid)
    }
  }
}
</script>
