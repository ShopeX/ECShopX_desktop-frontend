/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div>
    <template v-for="i in max">
      <i class="ec-icon" :class="i <= value ? 'ec-icon-favorfill' : 'ec-icon-favor'" :style="selectStyle(i)" @click="handelClick(i)"></i>
    </template>
    <span v-if="showText"> {{text[value]}}</span>
  </div>
</template>

<script>
export default {
  name: 'SpRate',
  props: {
    max: {
      type: Number,
      default: 5,
    },
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#E43838',
    },
    text: {
      type: Array,
      default: ()=>['0','1','2','3','4','5'],
    },
    showText:{
        type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      key: 1,
    }
  },
  computed: {},
  methods: {
    selectStyle(i) {
      if (i <= this.value) {
        return `color:${this.color}`
      }
      return ''
    },
    handelClick(i) {
      this.$emit('input', i)
    },
  },
}
</script>

<style lang="scss" scoped>
.ec-icon {
  color: #aaa;
  cursor: pointer;
  margin: 5px;
}
</style>