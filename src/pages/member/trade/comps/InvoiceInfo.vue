/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="receive-wrap">
    <h4>{{ $t('comps.InvoiceInfo.892977-0') }}</h4>
    <div class="invoice">
        <div class="invoice-item">{{ $t('comps.InvoiceInfo.892977-1') }}{{ invoiceInfo.title=='individual'?$t('comps.InvoiceInfo.892977-2'): invoiceInfo.title=='unit'?$t('comps.InvoiceInfo.892977-3'):'' }}</div>
        <div class="invoice-item">{{ $t('comps.InvoiceInfo.892977-4') }}{{ receiveData.is_invoiced==true?$t('comps.InvoiceInfo.892977-5'):receiveData.is_invoiced==false?$t('comps.InvoiceInfo.892977-6'):'' }}</div>
        <!-- {{ $t('comps.InvoiceInfo.892977-2') }} -->
        <div class="invoice-item"  v-if="invoiceInfo.title=='individual'">{{ $t('comps.InvoiceInfo.892977-7') }}{{ invoiceInfo.content }}</div>
        <!-- {{ $t('comps.InvoiceInfo.892977-3') }} -->
        <div v-else-if="invoiceInfo.title=='unit'" class="invoice-list">
            <div>{{ $t('comps.InvoiceInfo.892977-8') }}{{ invoiceInfo.content }}</div>
            <div>{{ $t('comps.InvoiceInfo.892977-9') }}{{ invoiceInfo.registration_number }}</div>
            <div>{{ $t('comps.InvoiceInfo.892977-10') }}{{ invoiceInfo.company_address }}</div>
            <div>{{ $t('comps.InvoiceInfo.892977-11') }}{{ invoiceInfo.company_phone }}</div>
            <div>{{ $t('comps.InvoiceInfo.892977-12') }}{{ invoiceInfo.bankname }}</div>
            <div>{{ $t('comps.InvoiceInfo.892977-13') }}{{ invoiceInfo.bankaccount }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    receiveData: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      invoiceInfo:this.receiveData.invoice||{}
    }
  },
  computed: {
    // name() {
    //   let typeText= {
    //     point:'积分支付',
    //     wxpaypc:'微信支付',
    //     alipay:'支付宝支付'
    //   }
    //   return this.receiveData.pay_type&&typeText[this.receiveData.pay_type]||'微信支付'
    // }
  },
}
</script>

<style lang="scss" scoped>
.receive-wrap {
  
//   padding: 0 10px 0 20px;
  padding: 10px 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  div {
    padding-bottom: 10px;
  }
  .invoice{
    // display: flex;
    width: 100%;
    .invoice-item{
        width: 50%;
        float: left;
    }
    .invoice-list{
        width: 100%;
        &>div{
            width: 50%;
            float: left;
        }
    }
  }
}
</style>