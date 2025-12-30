/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="staff-address-picker address-picker">
    <div
      :class="['address-item', { 'is-active': item.addr_id === value }]"
      v-for="item in list"
      :key="item.addr_id"
      @click="handleSelectItem(item)"
    >
      <label>
        <input name="staff-address" type="radio" v-model="item.addr_id === value" />
        {{ item.name }} {{ item.area }} {{ item.addr }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffAddressPicker',

  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: String
  },

  methods: {
    handleSelectItem(item) {
      const { addr_id } = item

      this.$emit('change', item)
      this.$emit('input', addr_id)
    }
  }
}
</script>
