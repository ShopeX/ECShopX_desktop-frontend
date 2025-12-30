/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="shopWidgets_panel"
  :base_id="baseId"
  :base_slot="baseSlot"
  :base_file="baseFile">
    <slot>
      <SpWidget v-for="wgt in slotInfo.widgets" :key="wgt.widgets_id" :info="wgt"></SpWidget>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SpWidgetPanel',

  props: {
    baseSlot: String,
    baseId: String,
    baseFile: String,
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    slotInfo () {
      // if (window.__shopex_widgets_env) {
      //   return window.__shopex_widgets_env.baseFile
      // } else {
      //   return null
      // }
      // return window.__shopex_widgets_env.baseFile || '';
      return this.info[this.baseId] || {}
    }
    // widgets () {
    //   return this.info[this.baseId] || {}
    // }
  }
}
</script>
