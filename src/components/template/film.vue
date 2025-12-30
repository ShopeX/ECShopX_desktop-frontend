/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="component-wrap" :class="{'component-padded' : dataForm.base.padded}">
    <div class="current-active"></div>
    <div v-if="dataForm.base.title" class="component-header">
      <div class="component-title">
        <h3>
          {{dataForm.base.title}}
          <span class="subtitle">{{dataForm.base.subtitle}}</span>
        </h3>
      </div>
    </div>
    <div v-if="dataForm.data[0]">
      <video width="100%" controls="controls" :src="dataForm.data[0].media_id"></video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped lang="scss">
.component-padded {
  padding: 10px 0;
}
.component-wrap {
  .subtitle {
    padding-left: 5px;
    font-size: 12px;
    color: #999;
  }
  .component-header {
    padding: 0 10px 10px 10px;
  }
}
</style>
