/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.collapse {
  &__title {
    padding: 10px 0;
    font-size: 15px;
    cursor: pointer;
  }
  .mb-iconfont {
    font-size: 20px;
    float: right;
    margin: 0 10px 0 0;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="collapse">
    <div class="collapse__title" @click="handleClick">
      <i class="mb-iconfont" :class="{ 'mb-iconfont-down': !isShowPanel, 'mb-iconfont-up': isShowPanel  }"></i>
      <span>{{title}}</span>
    </div>
    <SpDpTransition>
      <div class="collapse__panel" v-if="isShowPanel">
        <slot></slot>
      </div>
    </SpDpTransition>
  </div>
</template>

<script>
export default {
  name: 'SpCollapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShowPanel: this.open
    }
  },
  methods: {
    handleClick () {
      this.isShowPanel = !this.isShowPanel
      this.$emit('change', this.isShowPanel)
    }
  }
}
</script>
