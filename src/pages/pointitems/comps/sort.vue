/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="items-sort" v-on-clickaway="handleClose">
    <div class="items-sort__value" @click="handleClickLabel"><i class="aicon aicon-jiantou"></i>{{sort_label}}</div>
    <ul class="items-sort__radio" v-if="showOptions">
      <li v-for="(item,index) in data" :key="index" @click="handleChangeSort(item)">
        <span v-if="!index">
          <i class="aicon aicon-jiantou"></i>{{item.label}}
        </span>
        <span v-else>
          {{item.label}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  props: {
    data: Array,
    value: String
  },
  mixins: [clickaway],
  data () {
    return {
      showOptions: false
    }
  },
  computed: {
    sort_label: function () {
      let label = ''
      const sort = this.value
      const sorts = this.data || []
      sorts.forEach(t => {
        if (t.value === sort) {
          label = t.label
        }
      })
      return label
    }
  },
  methods: {
    handleChangeSort (item) {
      this.showOptions = false
      this.$emit('change', item.value)
    },
    handleClose () {
      this.showOptions = false
    },
    handleClickLabel () {
      this.showOptions = !this.showOptions
    }
  }
}
</script>

    <style lang="scss" scoped>
.items-sort{
  position: relative;
  .aicon-jiantou {
    margin-right: 10px;
  }
  &__value{
    text-align: right;
    cursor: pointer;
  }
  &__radio{
    position: absolute;
    top: -21px;
    width: 130px;
    padding: 20px 20px 20px 0;
    background: #fff;
    border: 1px solid $color-primary-text;
    z-index: 1000;
    li{
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
