/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="receive-wrap">
    <h4>{{ $t('comps.payInfo.590028-0') }}</h4>
    <div>
      {{ $t('comps.payInfo.590028-1') }}{{ name }}
      <span class="view-certificate" v-if="receiveData.offline_pay_check_status == 1" @click="handleViewCertificate">{{ $t('comps.payInfo.590028-2') }}</span>
    </div>
    <div>{{ $t('comps.payInfo.590028-3') }}{{ receiveData.payDate }}</div>
    <!-- <div>收货地址:{{receiveData.receiver_state}} {{receiveData.receiver_city}} {{receiveData.receiver_district}} {{receiveData.receiver_address}}</div> -->
    <!-- <p class="bd-border"></p>
    <h4>物流信息</h4>
    <p>物流：{{receiveData.delivery_corp_name}}</p>
    <p>运单号：{{receiveData.delivery_code}}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => {
        pay_type: 'wxpay'
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    name() {
      let typeText = {
        point: this.$t('comps.payInfo.590028-4'),
        wxpaypc: this.$t('comps.payInfo.590028-5'),
        alipay: this.$t('comps.payInfo.590028-6'),
        offline_pay: this.receiveData.offline_pay_name
      }
      return (this.receiveData.pay_type && typeText[this.receiveData.pay_type]) || this.$t('comps.payInfo.590028-5')
    }
  },
  methods:{
    handleViewCertificate(){
      this.$emit('viewCertificate')
    }
  }
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  padding: 0 10px 0 20px;
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
  .view-certificate{
    margin-left: 8px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
