/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="component-wrap" :class="{'component-padded' : dataForm.base.padded}">
    <div
      class="content"
      :class="{
        'bold' : dataForm.config.bold,
        'italic' : dataForm.config.italic
        }"
      :style="{
        color: dataForm.config.color,
        fontSize: dataForm.config.size + 'px',
        textAlign: dataForm.config.align}"
    >{{ dataForm.data[0].content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      base: {},
      config: {},
      data: []
    };
  }
};
</script>

<style scoped lang="scss">
.component-padded {
  padding: 10px 0;
}
.content {
  padding: 0 15px;
}
.bold {
  font-weight: bolder;
}
.italic {
  font-style: italic;
}
</style>
