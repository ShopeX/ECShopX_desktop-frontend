/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-address {
  .address-body {
    padding: $edge-size $edge-margin;
    .address-list {
      padding-bottom: 10px;
      margin-top: 10px;
      border-bottom: 1px solid $color-divider;
      .left {
        display: inline-block;
        width: calc(100% - 50px);
      }
      .right {
        display: inline-block;
        vertical-align: top;
        padding-top: 8px;
      }
    }
  }
  .btn-container {
    padding: $edge-size $edge-margin;
  }
}
</style>

<template>
  <div class="page-address page-body">
    <div class="address-body">
      <div class="address-list clearfix" v-for="(item, index) in list" :key="index">
        <div class="left">
          <span>{{ item.name }}</span>
          <span>{{ item.mobile }}</span>
          <div>
            <span>{{ item.area }}</span>
            <span>{{ item.addrdetail }}</span>
          </div>
        </div>
        <div class="right">
          <SpButton type="text">{{ $t('cart.address.280777-0') }}</SpButton>
        </div>
      </div>
    </div>

    <div class="btn-container">
      <SpButton type="primary" long size="large" @click="addAddress">{{ $t('cart.address.280777-1') }}</SpButton>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'header'
  data() {
    return {
      list: []
    }
  },
  created() {
    this.addressList()
  },
  methods: {
    async addressList() {
      const { list } = await this.$api.member.addressList()
      this.list = list
    },
    addAddress() {
      this.$router.push('/cart/addAddress')
    }
  }
}
</script>
