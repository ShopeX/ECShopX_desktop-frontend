/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="component-wrap" :class="{'component-padded' : base.padded}">
    <div class="current-active"></div>
    <div v-if="base.title" class="component-header">
      <div class="component-title">
        <h3>
          {{base.title}}
          <span class="subtitle">{{base.subtitle}}</span>
        </h3>
      </div>
      <div class="component-more">
        <div class="three-dot"></div>
      </div>
    </div>
    <div class="content" :style="{textAlign: config.align}">
      <p class="paragraph" v-for="(item, index) in content" :key="index">{{item}}</p>
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
  },

  data() {
    return {
      base: {},
      config: {},
      data: []
    };
  },
  computed: {
    content() {
      get: {
        if (this.data[0].content) {
          return this.data[0].content.split("\n");
        }
      }
    }
  },

  created() {
    this.base = this.dataForm.base;
    this.config = this.dataForm.config;
    this.data = this.dataForm.data;
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
.content {
  padding: 0 15px;
}
.paragraph {
  margin-bottom: 5px;
  min-height: 6px;
  word-break: break-all;
  line-height: 1.5;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
