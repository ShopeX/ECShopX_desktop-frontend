/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div>
    <div class="template-edit" v-if="type == 'edit'">
      <div class="template-body">
        <div
          v-for="wgt in contentComps"
          :key="wgt.uuid"
          class="wgt-render-item"
          :data-uuid="wgt.uuid"
        >
          <component :is="wgt.name" :value="wgt" />
          <div v-show="type == 'edit'" class="wgt-render-mark" @click="handleClick"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="wgt in contentComps"
        :key="wgt.uuid"
        class="wgt-render-item"
        :data-uuid="wgt.uuid"
      >
        <component :is="wgt.name" :value="wgt"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ACTIONS, SOURCE } from './util'
import PostMessage from './postmessage'
import wgtArr from './comps'
export default {
  name: 'SpTemplate',
  componentName: 'SpTemplate',
  props: {
    className: String,
    type: String,
    list: {
      default: () => [],
      type: [Array]
    }
  },
  computed: {
    contentComps() {
      const allowTemplates = [
        "imgHotzone"
      ]
      return this.list.filter((item) => {
          //过滤h5同步过来的模版
          // return !!item.name && item.name != 'page'
        return allowTemplates.includes(item.name)
      })
    }
  },
  created() {
    this.regsiterWgts()
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
    },
    regsiterWgts() {
      wgtArr.forEach((item) => {
        Vue.component(item.name, item)
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .wgt-render-item {
    position: relative;
    .wgt-render-mark {
      z-index: 100;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
