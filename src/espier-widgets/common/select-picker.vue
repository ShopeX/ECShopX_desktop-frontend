/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.select-picker {
  display: flex;
  flex-wrap: wrap;
  // .picker-item {
  //   width
  // }
  .picker-item {
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    // padding: 4px;
    // position: relative;
    border: 1px solid #e5e5e5;
    width: 28%;
    // padding: 2px;

    position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    &.is-active {
      border: 1px solid #2d8cf0;
    }
    &::before {
      display: block;
      content: '';
      padding-top: 100%;
      // border: 1px solid red;
    }
    .item-wrap {
      position: absolute;
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
    }
    .label {
      position: relative;
      top: -3px;
      font-size: 12px;
    }
  }
}
</style>
<template>
  <div class="select-picker">
    <div
      class="picker-item"
      :class="{ 'is-active': select == item.value }"
      v-for="(item, index) in data"
      :key="`picker-item__${index}`"
      @click="handleClick(item)"
    >
      <div class="item-wrap">
        <img class="icon" v-if="icon" :src="item[icon]" :width="iconSize" />
        <div class="label">{{ item[label] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectPicker',
  props: {
    value: Number,
    data: Array,
    label: String,
    icon: String,
    iconSize: {
      type: Number,
      default: 46
    }
  },
  data() {
    return {
      multiple: false,
      select: this.value
    }
  },
  created() {},
  methods: {
    handleClick(item) {
      this.select = item.value
      this.$emit('input', item.value)
    }
  }
}
</script>
