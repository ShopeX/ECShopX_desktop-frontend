/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0003-props {
  // .point-style {
  //   .attr-field__label {
  //     margin-top: 30px;
  //   }
  // }
  // .delete-btn {
  //   float: right;
  //   margin-right: 10px;
  // }
  .hot-link__item {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="widget-w0003-props">
    <Tabs value="name1" :animated="false">
      <TabPane :label="`${activeElement.name}[${activeElement.type}]`" name="name1">
        <panelBar title="展示图：">
          <imgPicker v-model="activeElement.imgUrl" :path="false" />
        </panelBar>

        <panelBar title="热区：">
          <hotzone
            v-if="hackReset"
            :image="activeElement.imgUrl"
            :zonesInit="activeElement.data"
            @change="handleChange"
            @remove="handleRemove"
          />
          <div
            class="hot-link__item"
            v-for="(item, idx) in activeElement.data"
            :key="`hot-link__item-${idx}`"
          >
            <dataBind v-model="item.pathData" :imgPicker="false" />
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
import Vue from 'vue'
import hotzone from 'vue-hotzone'
import { panelBar, imgPicker, dataBind } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0003Props',
  props: ['activeElement'],
  data() {
    return {
      zonesList: [],
      hackReset: false
    }
  },
  components: {
    panelBar,
    basicSet,
    imgPicker,
    hotzone,
    dataBind
  },
  watch: {
    'activeElement.imgUrl': {
      handler: function (nval, oval) {
        if (!nval) {
          this.activeElement.data.splice(0, this.activeElement.data.length)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.hackReset = false
    this.$nextTick(() => {
      this.hackReset = true // 重建组件
    })
  },
  methods: {
    handleChange(data) {
      console.log('activeElement.data:', this.activeElement.data)
      console.log('handleChange:', JSON.stringify(data))
      const { activeElement } = this
      data.forEach((item, index) => {
        console.log(JSON.stringify(item))
        // const obj = item.pathData
        //   ? item
        //   : {
        //       ...item,
        //       pathData: {}
        //     }
        const obj = {
          pathData: {},
          ...this.activeElement.data[index],
          heightPer: item.heightPer,
          leftPer: item.leftPer,
          topPer: item.topPer,
          widthPer: item.widthPer
        }
        Vue.set(activeElement.data, index, obj)
      })
    },
    handleRemove(index) {
      console.log('handleRemove:', index)
      this.activeElement.data.splice(index, 1)
    }
  }
}
</script>
