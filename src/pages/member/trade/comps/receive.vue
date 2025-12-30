/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div>
    <div class="receive-wrap" v-if="receiveData.receipt_type=='ziti'">
      <h4>{{ $t('comps.receive.780323-0') }}</h4>
      <span v-if="receiveData.ziti_info">
        <div>{{ $t('comps.receive.780323-1') }}
          <span>{{ receiveData.ziti_info.name }}</span>
        </div>
        <div>{{ $t('comps.receive.780323-2') }}
          <span>{{ receiveData.ziti_info.city }} {{ receiveData.ziti_info.area }} {{ receiveData.ziti_info.address }}</span>
        </div>
        <div>{{ $t('comps.receive.780323-3') }}
          <span>{{ receiveData.ziti_info.contract_phone }}</span>
        </div>
        <div>{{ $t('comps.receive.780323-4') }}
          <span>{{ receiveData.ziti_info.pickup_date }} {{ receiveData.ziti_info.pickup_time[0] }} - {{ receiveData.ziti_info.pickup_time[1] }}</span>
        </div>
      </span>
      <div>{{ $t('comps.receive.780323-5') }}{{receiveData.receiver_name}}</div>
      <div>{{ $t('comps.receive.780323-6') }}{{receiveData.receiver_mobile}}</div>
    </div>
    <div class="receive-wrap" v-else>
      <h4>{{ $t('comps.receive.780323-7') }}</h4>
      <div>{{ $t('comps.receive.780323-8') }}{{receiveData.receiver_name}}</div>
      <div>{{ $t('comps.receive.780323-9') }}{{receiveData.receiver_mobile}}</div>
      <div>{{ $t('comps.receive.780323-10') }}{{receiveData.receiver_state}} {{receiveData.receiver_city}} {{receiveData.receiver_district}} {{receiveData.receiver_address}}</div>
      <!-- <p class="bd-border"></p>
      <h4>物流信息</h4>
      <p>物流：{{receiveData.delivery_corp_name}}</p>
      <p>运单号：{{receiveData.delivery_code}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  padding: 0 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  div {
    padding-bottom: 10px;
  }
  .bd-border {
    margin: 20px 0;
    border-bottom: 1px solid $color-border-gray-light;
  }
}
</style>