/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-checkout {
  margin-top: -20px;
  background-color: #fff;
}
.checkout-title {
  padding: 20px 0;
  font-size: 18px;
  font-weight: bold;
  // color: #606266;
}
.crumbs {
  padding: 20px 0;
  .crumbs-position {
    display: inline-block;
    height: 27px;
    line-height: 27px;
    font-size: 17px;
    font-weight: bold;
    width: 90px;
  }
  .crumbs-right {
    float: right;
    cursor: pointer;
  }
}
.content-body {
  border: 1px solid $color-bg-gray;
  .text-red {
    color: $color-brand-primary;
  }
  .header {
    height: 40px;
    line-height: 40px;
    background-color: $color-border-gray-light;
    padding: 0 10px;
  }
  .content-item {
    padding: 0 0 30px;
    border-bottom: 1px solid $color-border-gray-light;
    &.no-invoice {
      padding-bottom: 0;
      border-bottom-width: 0;
    }
    .content-item-hd {
      height: 40px;
      line-height: 39px;
      padding: 0 20px;
      border-bottom: 1px solid #e5e5e5;
      font-size: 16px;
      .use-invoice {
        float: right;
      }
    }
    .content-item-bd {
      padding: 30px 30px 0 30px;
      &.address {
        .active {
          line-height: 36px;
        }
      }
      .ziti {
        color: #606266;
        &-name {
          font-size: 18px;
          font-weight: bold;
        }
        &-address {
          font-size: 16px;
        }
        &-time,
        &-name,
        &-address {
          margin-bottom: 5px;
        }
      }
      .pick-btn {
        width: 120px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        border: 1px solid $color-border-gray-light;
        display: inline-block;
        cursor: pointer;
        margin-right: 15px;
        position: relative;
        .corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-bottom: 15px solid #ea2329;
          border-left: 15px solid transparent;
          z-index: 10;
          opacity: 0;
          .ec-icon {
            &::before {
              position: absolute;
              font-size: 10px;
              color: #fff;
              // width: 10px;
              // height: 10px;
              top: -6px;
              left: -10px;
            }
          }
        }
      }
      .coupon-item {
        width: 250px;
        height: 100px;
        border: 1px solid $color-border-gray-light;
        display: inline-block;
        padding: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        cursor: pointer;
        vertical-align: top;
        &.empty {
          text-align: center;
          // height: 78px;
          //
          .coupon-title {
            line-height: 78px;
            margin-bottom: 0;
          }
        }
        .coupon-amount,
        .coupon-discount {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
          line-height: 1;
          .symbol {
            font-size: 14px;
            font-weight: normal;
          }
        }
        .coupon-title,
        .coupon-time {
          color: #606266;
        }
        .coupon-title {
          margin-bottom: 2px;
        }
        .corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-bottom: 19px solid #ea2329;
          border-left: 19px solid transparent;
          z-index: 10;
          opacity: 0;
        }
        &.active {
          // padding: 9px;
        }
        .ec-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          &::before {
            position: absolute;
            font-size: 10px;
            color: #fff;
            width: 6px;
            height: 6px;
            bottom: 6px;
            right: 5px;
            z-index: 999;
          }
        }
      }
      .active {
        border: 2px solid $color-brand-primary;
        .corner {
          opacity: 1;
        }
      }
      .invoice-radio {
        margin-right: 30px;
        margin-bottom: 15px;
      }
      .invoice-row {
        width: 30%;
        margin-bottom: 10px;
        &__title {
          margin-bottom: 5px;
        }
        .tip {
          display: none;
          color: $color-brand-primary;
          font-size: 12px;
          text-align: right;
          margin-top: 5px;
        }
        &.invalid {
          .sp-input {
            border-color: $color-brand-primary;
          }
          .tip {
            display: block;
          }
        }
      }
    }
    .coupon-items {
      max-height: 250px;
      overflow: auto;
    }
    .content-item-ft {
      .content-item-f-spinput {
        width: 750px;
        display: inline-block;
      }
      .content-item-ft-btn {
        border-radius: 3px;
        background-color: $color-brand-primary;
        color: #fff;
        width: 105px;
        height: 34px;
        border: 1px solid $color-border-gray-light;
        line-height: 34px;
        text-align: center;
        cursor: pointer;
        margin: 0 0px 20px 20px;
      }
      &-total {
        padding: 40px 30px 0;
        // height: 34px;
        // line-height: 34px;
        font-size: 14px;
        text-align: right;
        .total-row {
          color: #797979;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .text-red {
          display: inline-block;
          width: 100px;
          font-weight: bold;
        }
      }
    }
    .content-item-btn {
      border-radius: 3px;
      margin-left: 40px;
      width: 105px;
      height: 34px;
      border: 1px solid $color-border-gray-light;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
      margin-top: 20px;
    }
  }
  .content-ft {
    padding: 20px;
    text-align: right;
    .actual-total {
      display: inline-block;
      margin-right: 20px;
      color: #606266;
      span {
        color: $color-brand-primary;
        margin-left: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .content-ft-btn {
      border-radius: 3px;
      width: 105px;
      height: 45px;
      border: 1px solid $color-border-gray-light;
      line-height: 45px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      display: inline-block;
      background-color: $color-brand-primary;
    }
  }
  .address-item {
    // height: 34px;
    // line-height: 34px;
    // padding-left: 35px;
    padding: 5px 10px;
    margin-bottom: 10px;
    // border: 1px solid red;
    cursor: pointer;
    &:hover {
      background-color: $color-bg-gray;
    }
    .address {
      display: inline-block;
      width: 60%;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .address-active {
    border: 1px solid $color-brand-primary;
  }
}
.address-add {
  padding: 30px;
}
</style>

<template>
  <div class="page-checkout">
    <div class="container clearfix">
      <div class="checkout-title">{{ $t('pointitems.checkout.946036-0') }}</div>

      <div class="content-body clearfix">
        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('pointitems.checkout.946036-1') }}</h4>
          <div class="content-item-bd address">
            <div
              class="pick-btn"
              :class="{ active: curAddressIndex == index }"
              v-for="(item, index) in addressTabs"
              :key="index"
              @click="changeAddressTab(index)"
            >
              {{ item.name }}
              <span class="corner">
                <i class="ec-icon ec-icon-check"></i>
              </span>
            </div>
          </div>
        </div>
        <!-- 收货地址 -->
        <div class="address-list content-item" v-if="curAddressIndex == 0">
          <h4 class="content-item-hd">{{ $t('pointitems.checkout.946036-2') }}</h4>
          <div class="content-item-bd">
            <template v-for="(item, index) in addressList">
              <div
                class="address-item"
                :class="{
                  'address-active': curAddress && item.address_id == curAddress.address_id
                }"
                @click="clickAddress(item, 'click')"
                :key="index"
              >
                <span class="address">{{ addressItem(item) }}</span>
                <span class="ly-fn-a" @click.stop="clickAddress(item, 'put')">{{ $t('pointitems.checkout.946036-3') }}</span>
                <span v-if="item.is_def" style="display: inline-block; padding-left: 20px"
                  >{{ $t('pointitems.checkout.946036-4') }}</span
                >
              </div>
            </template>
          </div>
          <div class="content-item-btn" @click.stop="clickAddress('', 'post')">{{ $t('pointitems.checkout.946036-5') }}</div>
        </div>
        <div class="content-item" v-if="curAddressIndex == 1">
          <h4 class="content-item-hd">{{ $t('pointitems.checkout.946036-6') }}</h4>
          <div class="content-item-bd ziti" v-if="zitiAddress">
            <div class="ziti-name">{{ zitiAddress.name }}</div>
            <div class="ziti-address">{{ zitiAddress.store_address }}</div>
            <div class="ziti-time">{{ $t('pointitems.checkout.946036-7') }}{{ zitiAddress.hour }}</div>
            <div class="ziti-phone">{{ $t('pointitems.checkout.946036-8') }}{{ zitiAddress.phone }}</div>
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('pointitems.checkout.946036-9') }}</h4>
          <div class="content-item-bd">
            <!-- <h4>onexbbc自营店（自营店铺）自营店</h4> -->
            <table class="table-body">
              <colgroup>
                <col style="width: 80px" />
                <col style="width: 390px" />
                <col style="width: 170px" />
                <col style="width: 170px" />
                <col style="width: 170px" />
                <col style="width: 150px" />
              </colgroup>
              <template v-for="(item, index) in list">
                <tbody :key="index">
                  <tr>
                    <td>
                      <div class="table-goods-pic">
                        <SpImg style="width: 65px; height: 65px" :src="item.pic" no-size />
                      </div>
                    </td>
                    <td class="text-center">
                      <span @click.stop="clickGoodsName(item)" class="ly-fn-a">{{
                        item.item_name
                      }}</span>
                    </td>
                    <td class="text-center">{{ item.item_point }} {{ $t('pointitems.checkout.946036-10') }}</td>
                    <td class="text-center">
                      <span class="text-red">x{{ item.num }}</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </table>
          </div>
        </div>

        <!-- <div class="content-item">
          <h4 class="content-item-hd">积分支付</h4>
          <div class="content-item-bd"></div>
        </div> -->

        <!-- <div class="content-item" :class="{ 'no-invoice': !useInvoice }">
          <h4 class="content-item-hd">
            发票信息
            <SpRadio type="checkbox" class="use-invoice" v-model="useInvoice">需要发票</SpRadio>
          </h4>
          <div class="content-item-bd" v-if="useInvoice">
            <SpRadio class="invoice-radio" v-model="item.checked" v-for="(item, index) in invoiceList" :key="index" @change="changeInvoice(index)">{{ item.name }}</SpRadio>
            <div v-if="invoiceInfo.invoice_content.title == 'individual'">
              <div class="invoice-row" :class="{ invalid: invoiceTip.title1 }">
                <div class="invoice-row__title">发票抬头*</div>
                <SpInput v-model="invoiceInfo.invoice_content.title1" @change="changeInput('title1')"></SpInput>
                <div class="tip">请输入发票抬头</div>
              </div>
            </div>
            <div v-if="invoiceInfo.invoice_content.title == 'unit'">
              <div class="invoice-row" :class="{ invalid: invoiceTip.content }">
                <div class="invoice-row__title">公司名称*</div>
                <SpInput v-model="invoiceInfo.invoice_content.content" @change="changeInput('content')"></SpInput>
                <div class="tip">请输入公司名称</div>
              </div>
              <div class="invoice-row" :class="{ invalid: invoiceTip.registration_number }">
                <div class="invoice-row__title">税号*</div>
                <SpInput v-model="invoiceInfo.invoice_content.registration_number" @change="changeInput('registration_number')"></SpInput>
                <div class="tip">请输入税号</div>
              </div>
              <div class="invoice-row">
                <div class="invoice-row__title">公司地址</div>
                <SpInput v-model="invoiceInfo.invoice_content.company_address"></SpInput>
              </div>
              <div class="invoice-row">
                <div class="invoice-row__title">电话号码</div>
                <SpInput v-model="invoiceInfo.invoice_content.company_phone"></SpInput>
              </div>
              <div class="invoice-row">
                <div class="invoice-row__title">开户银行</div>
                <SpInput v-model="invoiceInfo.invoice_content.bankname"></SpInput>
              </div>
              <div class="invoice-row">
                <div class="invoice-row__title">银行账号</div>
                <SpInput v-model="invoiceInfo.invoice_content.bankaccount"></SpInput>
              </div>
            </div>
          </div>
        </div> -->

        <div class="content-item content-item-ft">
          <!-- <div class="content-item-ft-btn">使用优惠券</div> -->
          <!-- <span>订单备注：</span>
            <SpInput
              placeholder="选填：本次交易的补充说明（所填内容建议已经和商家达成一致意见，85字以内）"
              class="content-item-f-spinput"
          />-->
          <div class="content-item-ft-total">
            <!-- 总重量：
            <span class="text-red">26kg</span>-->
            <div class="total-row">
              {{ orderData.items_count }}{{ $t('pointitems.checkout.946036-11') }}
              <span class="text-red">{{ orderData.item_point }} {{ $t('pointitems.checkout.946036-10') }}</span>
            </div>
            <div class="total-row">
              {{ $t('pointitems.checkout.946036-12') }}
              <span class="text-red" v-if="orderData.freight_type == 'cash'"
                >￥{{ orderData.freight_fee | formatPriceToHundred }}</span
              >
              <span class="text-red" v-else>{{ `${orderData.freight_fee} ${$t('pointitems.checkout.946036-10')}` }}</span>
            </div>
          </div>
        </div>
        <div class="content-ft">
          <div class="actual-total">
            {{ $t('pointitems.checkout.946036-14') }}<span
              >{{ orderData.point }} {{ $t('pointitems.checkout.946036-10') }}<span v-if="orderData.total_fee != 0"
                >+￥{{ orderData.total_fee | formatPriceToHundred }}</span
              ></span
            >
          </div>
          <div class="content-ft-btn" @click="clickSumit()" :style="{
              backgroundColor: themeColor
            }"
          >{{ $t('pointitems.checkout.946036-15') }}</div>
        </div>
      </div>
    </div>

    <SpModal v-model="dailogVisible" :height="520">
      <div class="address-add">
        <addressItemAdd
          @onClick="addAddressSumbit"
          @clickCancel="clickCancel"
          :type="addType"
          :addressInfoFrom="addressInfoFrom"
        ></addressItemAdd>
      </div>
    </SpModal>
  </div>
</template>

<script>
import qs from 'qs'
import { addressList } from '@/api/member'
import { freightFee, creatOrder, cardList } from '@/api/cart'
import addressItemAdd from '@/pages/member/address-item-add'

export default {
  middleware: 'authenticated',
  components: {
    addressItemAdd
  },
  data() {
    return {
      addressList: [],
      orderData: {}, //订单数据
      list: [], //商品数据
      creatData: {}, //
      dailogVisible: false,
      addressInfoFrom: {}, //修改地址信息
      addType: 'post', //修改地址类型，post新增，put更新,
      pickActive: 1,
      params: {},
      addressTabs: [
        { name: this.$t('pointitems.checkout.946036-16'), value: 'logistics' }
        // { name: '自提', value: 'ziti' },
      ],
      curAddressIndex: 0,
      curAddress: null,
      couponList: [],
      curCouponIndex: null,
      zitiAddress: null,
      invoiceInfo: {
        invoice_type: 'normal',
        invoice_content: {
          title: null,
          title1: null,
          content: null,
          company_address: null,
          registration_number: null,
          bankname: null,
          bankaccount: null,
          company_phone: null
        }
      },
      invoiceList: [
        {
          name: this.$t('pointitems.checkout.946036-17'),
          checked: false
        },
        {
          name: this.$t('pointitems.checkout.946036-18'),
          checked: false
        }
      ],
      useInvoice: false,
      invoiceTip: {
        title1: false,
        content: false,
        registration_number: false
      }
    }
  },

  mounted() {
    this.getAddressList()
  },
  computed: {
    // userInfo() {
    //   return this.$store.state.user.userInfo
    // },
    // 员工地址 福袋不可以新增地址
  },
  methods: {
    async getAddressList() {
      const { list } = await addressList()
      this.addressList = list
      let item = list.find((item) => item.is_def)
      if (item) {
        this.clickAddress(item, 'click')
      } else {
        this.getFreightFee()
      }
    },
    changeAddressTab(index) {
      if (index == this.curAddressIndex) {
        return
      }
      this.curAddressIndex = index
      this.getFreightFee()
    },

    getParams() {
      const { id, mode, order_type } = this.$route.query
      let pay_type = this.orderData.total_fee == 0 ? 'point' : 'wxpaypc'
      let data = {
        distributor_id: id || 0,
        cart_type: mode,
        order_type: order_type || 'normal',
        pay_type,
        promotion: 'normal',
        receipt_type: this.addressTabs[this.curAddressIndex].value,
        coupon_discount: 0
      }
      if (this.curCouponIndex != null) {
        let coupon = this.couponList[this.curCouponIndex]
        data.coupon_discount = coupon.code
      } else {
        data.not_use_coupon = 1
        delete data.coupon_discount
      }
      if (this.curAddress) {
        data.receiver_address = this.curAddress.adrdetail
        data.receiver_city = this.curAddress.city
        data.receiver_district = this.curAddress.county
        data.receiver_mobile = this.curAddress.telephone
        data.receiver_name = this.curAddress.username
        data.receiver_state = this.curAddress.province
      }
      this.creatData = data
      return data
    },
    // 获取信息
    async getFreightFee() {
      this.$loading({ background: 'transparent' })
      try {
        let params = this.getParams()
        const res = await freightFee(params)
        let {
          items,
          item_fee,
          discount_fee,
          freight_fee,
          total_fee,
          point,
          freight_type,
          item_point
        } = res
        let items_count = 0
        items.map((goods) => {
          items_count += parseInt(goods.num)
        })
        // freight_type=='cash'

        this.orderData = {
          item_fee,
          discount_fee,
          freight_fee,
          items_count,
          total_fee,
          point,
          freight_type,
          item_point
        }
        this.list = items

        this.$loading().close()
      } catch (error) {
        this.$router.go(-1)
        this.$loading().close()
      }
    },
    // 地址显示
    addressItem(item) {
      return `${item.province} - ${item.city} - ${item.county} ${item.adrdetail} (${item.username} 收) ${item.telephone}`
    },
    // 选择地址
    clickAddress(item, type) {
      if (type == 'click') {
        if (!this.curAddress || item.address_id != this.curAddress.address_id) {
          this.curAddress = item
          this.getFreightFee()
        }
      } else {
        this.dailogVisible = true
        let _item = JSON.parse(JSON.stringify(item))
        if (type == 'put') this.addressInfoFrom = _item
        this.addType = type
        // this.$forceUpdate()
      }
    },
    // 提交订单
    clickSumit() {
      this.invoiceTip = {
        title: false,
        content: false,
        registration_number: false
      }
      let receipt_type = this.addressTabs[this.curAddressIndex].value
      if (receipt_type == 'logistics' && !this.curAddress) {
        this.$Message.error(this.$t('pointitems.checkout.946036-20'))
        return
      }
      let params = {}
      if (this.useInvoice && this.invoiceInfo.invoice_content.title) {
        let invoice = this.invoiceInfo.invoice_content
        if (invoice.title == 'unit') {
          let status = true
          if (!invoice.content) {
            this.invoiceTip.content = true
            status = false
          }
          if (!invoice.registration_number) {
            this.invoiceTip.registration_number = true
            status = false
          }
          if (!status) {
            this.$Message.error(this.$t('pointitems.checkout.946036-21'))
            return
          }
        } else {
          if (!invoice.title1) {
            this.invoiceTip.title1 = true
            this.$Message.error(this.$t('pointitems.checkout.946036-21'))
            return
          }
        }
        params = {
          ...this.creatData,
          ...this.invoiceInfo
        }
      }
      let data = this.getParams()
      params = {
        ...data
      }
      console.log(this.list)
      const item_id = this.list[0].item_id

      this.$loading({ background: 'transparent' })
      creatOrder(params)
        .then((res) => {
          let order_id = res.trade_info.order_id

          if (Number(this.orderData.total_fee)) {
            this.$router.push({ path: '/cashier', query: { order_id: `${order_id}` } })
          } else {
            this.$router.push({ path: '/pointitems/cashierpoint?item_id=' + item_id })
          }

          this.$loading().close()
        })
        .catch((res) => {
          this.$loading().close()
        })
    },
    //跳转到商品详情
    clickGoodsName(item) {
      this.$router.push(`/pointitems/${item.item_id}`)
    },
    // 添加地址子组件发送方法
    addAddressSumbit() {
      this.getAddressList()
      this.dailogVisible = false
    },
    clickCancel() {
      this.dailogVisible = false
    },
    changeInvoice(index) {
      this.invoiceList.map((item, idx) => {
        if (idx != index) {
          item.checked = false
        } else {
          this.invoiceInfo.invoice_content = {
            title: index == 0 ? 'individual' : 'unit'
          }
        }
      })
    },
    changeInput(name) {
      if (!this.invoiceInfo.invoice_content[name]) {
        this.invoiceTip[name] = true
      } else {
        this.invoiceTip[name] = false
      }
    }
  }
}
</script>
