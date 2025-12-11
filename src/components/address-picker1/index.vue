/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped src="./index.scss"></style>

<template>
<div class="sp-address-picker">
  <div
    :class="['address-item', { 'is-active': item.addr_id === value }]"
    v-for="item in list"
    :key="item.addr_id"
    @click="curAddress = item"
  >
    <label><input name="address" type="radio" v-model="item.addr_id === value"> {{ item.name }} {{ item.area }} {{ item.addr }}</label>
  </div>
  <div class="address-picker__btns">
    <SpButton type="primary" @click="setValue()">{{ $t('address-picker1.index.033322-0') }}</SpButton>
  </div>
</div>
</template>

<script>
function resolveCurAddr (list, id) {
  return list.find(t => t.addr_id === id)
}

export default {
  name: 'SpAddressPicker',

  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: String
  },

  data () {
    const curAddress = resolveCurAddr(this.list, this.value)

    return {
      curAddress
    }
  },

  watch: {
    value (val) {
      const curAddress = resolveCurAddr(this.list, val)
      this.curAddress = curAddress
    }
  },

  methods: {
    setValue (val) {
      const { addr_id } = this.curAddress
      this.$emit('change', this.curAddress, addr_id)
      this.$emit('input', addr_id)
    }
  }
}
</script>
