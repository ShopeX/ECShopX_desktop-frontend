/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
<SpDpTransition>
  <div class="page-item__filter">
    <div class="filter-item" v-for="(item, index) in data" :key="index">
      <!-- <div class="item-header">{{item.cat_name}}</div> -->
      <!-- <SpCollapse
        v-for="(sitem, sindex) in item.lv2"
        :key="sindex"
        :title="sitem.cat_name"
        :open="false"
      >
        <BtnPicker
          :value="value.cat_id"
          :data="handleBtnValue(sitem.lv3)"
          @change="val => handleChangeSelect(val, 'cat_id', sitem.cat_name, handleBtnValue(sitem.lv3))"
        ></BtnPicker>
      </SpCollapse> -->
      <SpCollapse
        :title="item.cat_name"
        :open="false"
      >
        <BtnPicker
          :value="value.cat_id"
          :data="handleBtnValue(item.lv2)"
          @change="val => handleChangeSelect(val, 'cat_id', item.cat_name, handleBtnValue(item.lv2))"
        ></BtnPicker>
      </SpCollapse>
    </div>
    <slot :handleChangeSelect="handleChangeSelect"></slot>
  </div>
</SpDpTransition>
</template>

<script>
import { pull } from 'lodash'
import BtnPicker from './btn-picker'

export default {
  components: { BtnPicker },

  props: {
    value: Object,
    data: Array
  },

  methods: {
    // 分类数据格式化
    handleBtnValue (items) {
      return items.map(t => ({
        label: t.cat_name,
        value: t.cat_id
      }))
    },
    handleChangeSelect (val, key, name, list) {
      const query = { ...this.value }
      const catOneId = this.data[0].cat_id.toString()

      // url cat_id 处理，非标签查询，cat_id分类选择为空时，默认选择一级分类的cat_id
      if (val) {
        if (key === 'cat_id') {
          val = pull(val.split(','), catOneId)
            .join(',')
        }
        query[key] = val
      } else {
        // 反选，分类未选择
        // 有标签参数（全部商品、新品等）
        if (!query.tag && key === 'cat_id') {
          query[key] = catOneId
        } else {
          delete query[key]
        }
      }
      this.$emit('change', query, query[key], name, list)
    }
  }
}
</script>
