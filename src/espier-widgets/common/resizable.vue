/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss"></style>

<template>
  <VueDraggableResizable
    :parent="true"
    class="layout-child"
    @click.native.stop="handleClickComponent(val.uuid)"
    @mouseenter.native.stop="handleMouseEnter"
    @mouseleave.native.stop="handleMouseLeave"
    @activated="onActivated(val)"
    @deactivated="onDeactivated"
    @resizing="onResize"
    @dragging="onDrag"
    :resizable="false"
    :x="val.x"
    :y="val.y"
    :z="zindex"
    :w="val.width"
    :h="val.height"
    :resizableAxis="val.resizableAxis"
  >
    <slot></slot>
  </VueDraggableResizable>
</template>

<script>
import mixins from './../mixins'
import VueDraggableResizable from './draggable-resizable'
import { log } from '@/utils'
export default {
  name: '',
  mixins: [mixins],
  components: { VueDraggableResizable },
  props: ['val', 'puuid'],
  data() {
    return {
      zindex: 100 // 全局索引
    }
  },
  methods: {
    // 选中面板中的元件
    handleClickComponent(uuid) {
      log.debug('[plugins panel] handleClickComponent', uuid)
      this.$emit('on-select', uuid)
    },
    handleMouseEnter() {
      // this.dispatch('viewport', 'widgetpanel.component.mouseevent', null)
    },
    handleMouseLeave() {
      // this.dispatch('viewport', 'widgetpanel.component.mouseevent', this.puuid)
    },
    // 选中元件
    onActivated(child) {
      // this.$store.commit('MSHOPDESIGN_SET_PANEL_ACTIVE_ELE', child.uuid)
    },
    // 取消选中元件
    onDeactivated() {
      log.debug('[plugins panel] onDeactivated')
    },
    // 元件拉伸
    onResize(x, y, width, height) {
      this.val.x = x
      this.val.y = y
      this.val.width = width
      this.val.height = height
    },
    // 元件拖动
    onDrag(x, y) {
      this.val.x = x
      this.val.y = y
    }
  }
}
</script>
