/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.input-sort-select {
  display: inline-block;
  position: relative;
  width: 100%;

  &.disabled {
    .input-sort-select {
      &__value {
        background: #f3f3f3;
        border-color: #ccc;
      }
      &__value-input {
        color: #ccc;
      }
    }
    .ec-icon {
      color: #ccc;
    }
  }
  &__value {
    padding: 0;
    position: relative;
    height: 40px;
    cursor: pointer;
    border: none;
    &-input {
      display: inline-block;
      font-size: 14px;
      width: 100%;
      color: #666;
      &.placeholder {
        color: #bdbdbd !important;
        font-size: 12px !important;
      }
    }
    .ec-icon {
      position: absolute;
      // font-size: 28px;
      right: 14px;
      top: 10px;
      color: #bdbdbd;
      transition: transform 0.2s ease-in;
      transform: rotate(0deg);
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  &__dropdown-list {
    // display: none;
    border-left: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
    position: absolute;
    width: 100%;
    z-index: $z-index-dropdown;
    background: #fff;
    max-height: 300px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      padding: 0 14px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      &.active {
        background: $color-bg-gray;
      }
      &:hover {
        background: $color-bg-gray;
      }
    }
  }
}
</style>

<template>
  <div class="input-sort-select" :class="{ 'disabled': disabled }" v-on-clickaway="away">
    <div class="input-sort-select__value" @click="handleClickDropDown">
      <!-- class="input-sort-select__value" -->
      <!-- <span class="input-sort-select__value-input" :class="currentLabel ? '' : 'placeholder'">{{
        currentLabel ? currentLabel : placeholder
      }}</span> -->
      <SpInput
        class="input-sort-select__value-input"
        v-model="currentLabel"
        @input="valueChange"
      ></SpInput>
      <i class="ec-icon ec-icon-unfold" :class="dropVisible ? 'active' : ''"></i>
    </div>
    <SpDpTransition>
      <ul class="input-sort-select__dropdown-list" v-if="dropVisible && showList">
        <li
          :class="{ 'active': item.value == value }"
          v-for="(item, index) in data"
          :key="index"
          @click="change(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </SpDpTransition>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import _find from 'lodash/find'
export default {
  name: 'SpInputSelect',
  mixins: [clickaway],
  props: {
    data: {
      type: Array
    },
    value: {
      type: [Number, String]
    },
    showList: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    disabled: Boolean
  },
  data() {
    return {
      currentValue: this.value,
      dropVisible: false
    }
  },
  computed: {
    currentLabel() {
      let cur = _find(this.data, { value: this.value })
      if (cur) {
        return cur.label
      } else {
        return null
      }
    }
  },
  methods: {
    handleClickDropDown() {
      if (this.disabled) return
      this.dropVisible = !this.dropVisible
      this.$emit('click', this.dropVisible)
    },
    change(item) {
      console.log(item)
      this.dropVisible = false
      this.currentValue = item.label
      this.$emit('input', item)
      this.$emit('change', item)
    },
    away: function() {
      if (this.showList) {
        this.dropVisible = false
      }
    },
    closeDropDown() {
      this.dropVisible = false
    },
    valueChange(e) {
      this.$emit('inputChange', e)
    }
  }
}
</script>