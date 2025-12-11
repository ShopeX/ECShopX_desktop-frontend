/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$img-ratio:0.723;
.order-item {
  padding-top: 20px;
  border-top: 1px solid#adadad;
  .goods-item{
    position: relative;
    margin: 0;
    &__img{
      width: (210 * $img-ratio) + px;
      height: 210px;
      background: #fff;
      border: 1px solid #c2baba;
    }
    &__right{
      width: calc(100% - 180px);
      height: 100%;
      padding-top: 16px;
    }
    &__title{
      font-size: 16px;
      color: $color-secondary-text;
      margin-bottom: 8px;
    }
    &__specs-bn{
      font-size: 16px;
      color: $color-primary-text;
      font-weight: normal;
      margin-bottom: 12px;
    }
    &__price{
      position: absolute;
      bottom: 10px;
      font-size: 16px;
      color: $color-secondary-text;
    }
    &__specs{
      &-color{
        display: block;
        font-size: 16px;
        margin-bottom: 8px;
        margin-top: 8px;
      }
      &-size{
        display: block;
        font-size: 16px;
      }
    }
  }

  &__actions {
    position: absolute;
    top: 18px;
    right: 10px;
    font-size: 14px;
    color: #525252;
    span {
      cursor: pointer;
    }
  }
  &__info {
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 1px;
    color: $color-primary-text;
    margin-bottom: 16px;
    &-no {
      margin-left: 35px;
    }
    &-status {
      float: right;
    }
  }
  .countdown{
    color: $md-red;
  }
  &-total {
    font-size: 14px;
    letter-spacing: 2px;
    text-align: right;
    margin-top: 10px;
    .sp-price{
      font-size: 14px;
    }
    &-text {
      color: $color-primary-text;
    }
  }
  &-button-wraper {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
}
</style>
<template>
  <div>
    <div class="order-item mb20">
      <div class="order-item__info">
        <span>{{ $t('comps.order-item.406280-0') }}{{handleDatetime(order.created_time)}}</span>
        <span class="order-item__info-no">{{ $t('comps.order-item.406280-1') }}{{order.tid}}</span>
        <span class="order-item__info-status"> <span class="countdown" v-if="order.status === 'WAIT_BUYER_PAY' && countdown">{{ $t('comps.order-item.406280-2') }}{{countdown}}</span> {{order.status_desc}}</span>
      </div>
      <ul>
        <li class="mb20" v-for="(item,index) in goodList" :key="index">
          <SpGoodsItem
            :info="handleGoodsData(item)"
            :showPromotion="false"
          />
        </li>
        <li v-for="item in giftpromotion" :key="item.item_id">
          <CartGift
            :info="handleGiftData(item)"
            :hasSelection="false"
          />
        </li>
      </ul>
      <div class="order-item-total">
        <span class="order-item-total-text">{{ $t('comps.order-item.406280-3') }}{{order.totalItem}}{{ $t('comps.order-item.406280-4') }}</span>
        <SpPrice class="order-item-total-price-num" :value="order.payment"></SpPrice>
      </div>
      <div class="order-item-button-wraper">
        <slot name="btns">
          <SpButton @click="handleJumpDetail" class="button-dark ml20">{{ $t('comps.order-item.406280-5') }}</SpButton>
          <SpButton @click="goPay()" v-if="btns && btns.btn_pay"          class="button-dark ml20" type="primary">{{ $t('comps.order-item.406280-6') }}</SpButton>
          <SpButton @click="cancelTrade()" v-if="btns && btns.btn_cancel" class="button-dark ml20" type="primary">{{ $t('comps.order-item.406280-7') }}</SpButton>
          <SpButton @click="applyRefund" v-if="btns && btns.btn_refund" class="button-dark ml20" type="primary">{{ $t('comps.order-item.406280-8') }}</SpButton>
          <SpButton @click="confirmTrade()" v-if="btns && btns.btn_confirm" class="button-dark ml20" type="primary">{{ $t('comps.order-item.406280-9') }}</SpButton>
          <!-- <SpButton @click="deleteTrade()" v-if="btns && btns.btn_delete" class="button-dark ml20" type="primary">删除订单</SpButton> -->
          <SpButton @click="returnExchangeTrade('refund_goods')" v-if="btns && btns.btn_refundgoods" class="button-dark ml20"  type="primary">{{ $t('comps.order-item.406280-10') }}</SpButton>
          <!-- <SpButton @click="returnExchangeTrade('only_refund')" v-if="btns && btns.btn_onlyrefund" class="button-dark ml20" type="primary">取消未发货商品</SpButton> -->
          <SpButton @click="linkRefund" v-if="btns && btns.btn_aftersales" class="button-dark ml20" type="primary">{{ $t('comps.order-item.406280-11') }}</SpButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDataTime, pickBy } from '@/utils'
// import { SpGoodsItem } from '@/components'
import CartGift from '../../../cart/comps/cart-gift'
import qs from 'qs'

export default {
  props: {
    order: Object,
    logisticsList: {
      type: Array,
      default: () => ([])
    },
    intervalTime: String
  },
  data () {
    const order = this.order
    return {
      goodList: order.order,
      giftpromotion: order.giftpromotion,
      btns: order.btns || {},
      showLogisticsModal: false,
      countdown: null,
      logisticsInfo: {
        aftersales_bn: null,
        corp_code: '',
        logi_no: ''
      },
      rules: {
        corp_code: [{
          validate: (rule, value, callback) => {
            if (value) {
              // eslint-disable-next-line standard/no-callback-literal
              callback()
            } else {
              // eslint-disable-next-line standard/no-callback-literal
              callback(this.$t('comps.order-item.406280-12'))
            }
          },
          trigger: 'blur'
        }],
        logi_no: [{
          validate: (rule, value, callback) => {
            if (value) {
              // eslint-disable-next-line standard/no-callback-literal
              callback()
            } else {
              // eslint-disable-next-line standard/no-callback-literal
              callback(this.$t('comps.order-item.406280-13'))
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    status: function () {
      return this.order.status
    }
  },
  components: {  CartGift },
  mounted () {
    this.handleCountDownTime()
  },
  methods: {
    handleDatetime (timestamp) {
      return formatDataTime(timestamp * 1000)
    },

    handleCountDownTime () {
      const { order } = this
      setInterval(() => {
        if (order.status == 'WAIT_BUYER_PAY') {
          let createTime = order.created_time
          let endTime = createTime + this.intervalTime * 60
          let clientTime = Date.parse(new Date()) / 1000
          let lastTime = endTime - clientTime
          let int_minute
          if (lastTime > 0) {
            int_minute = Math.floor(lastTime / 60)
            lastTime -= int_minute * 60
            this.countdown = int_minute + this.$t('comps.order-item.406280-14') + lastTime + this.$t('comps.order-item.406280-15')
          } else {
            this.countdown = null
          }
        }
      }, 1000)
    },

    handleGoodsData (item) {
      return pickBy(item, {
        title: 'title',
        sub_title: 'sub_title',
        item_id: 'item_id',
        bn: 'bn',
        image_default_id: 'pic_path',
        color: 'color',
        size: 'size',
        price: 'price',
        quantity: 'num',
        valid_lucky: ({ valid_lucky }) => valid_lucky || null
      })
    },

    handleGiftData (item) {
      return pickBy(item, {
        promotion_tag: 'promotion_tag',
        promotion_name: 'gift_name',
        gifts: ({ gifts }) => [gifts]
      })
    },

    handlePerformAct (act) {
      this.$emit(act)
    },

    handleJumpDetail () {
      const { tid } = this.order
      this.$router.push(`trade/${tid}`)
    },

    goPay () {
      const { tid, payment_id, pay_app_id } = this.order

      const params = {
        tids: tid,
        payment_id,
        pay_app_id
      }
      this.handleClickCheckout(params)
    },

    async handleClickCheckout (params) {
      if (!params.pay_app_id) {
        this.$Message.error(this.$t('comps.order-item.406280-16'))
        return
      }

      let query = {
        ...params,
        platform: 'pc'
      }
      const { openid } = this.$route.query
      if (openid) {
        query = {
          ...query,
          openid
        }
      }

      if (query.pay_app_id === 'alipay') {
        this.$router.push(`/finish?${qs.stringify(query)}`)
        window.open(
          `${window.location.origin}/cashier?${qs.stringify(query)}`,
          '_blank'
        )
      } else {
        this.$router.push(`/cashier?${qs.stringify(query)}`)
      }
    },

    cancelTrade () {
      const { tid } = this.order
      this.$Modal.confirm({
        title: this.$t('comps.order-item.406280-17'),
        content: '<p>请确认是否取消订单?</p>',
        onOk: async () => {
          await this.$api.trade.tradeCancelBuyer({
            tid,
            cancel_reason: this.$t('comps.order-item.406280-7')
          })
          this.handlePerformAct('refresh')
        },
        onCancel: () => {}
      })
    },

    applyRefund () {
      const { tid } = this.order
      this.$Modal.confirm({
        title: this.$t('comps.order-item.406280-17'),
        content: '<p>请确认是否退款?</p>',
        onOk: async () => {
          await this.$api.trade.tradeCancelBuyer({
            tid,
            cancel_reason: this.$t('comps.order-item.406280-7')
          })
          this.handlePerformAct('refresh')
        },
        onCancel: () => {}
      })
    },

    deleteTrade () {
      const { tid } = this.order
      this.$Modal.confirm({
        title: this.$t('comps.order-item.406280-17'),
        content: '<p>确认是否删除?</p>',
        onOk: async () => {
          await this.$api.trade.remove(tid)
          this.handlePerformAct('refresh')
        },
        onCancel: () => {}
      })
    },

    confirmTrade () {
      const { tid } = this.order
      this.$Modal.confirm({
        title: this.$t('comps.order-item.406280-17'),
        content: '<p>请确认是否收货?</p>',
        onOk: async () => {
          await this.$api.trade.tradeConfirmReceipt({
            tid
          })
          // this.$Message.error('1')
          this.handlePerformAct('refresh')
        },
        onCancel: () => {}
      })
    },

    returnExchangeTrade (type) {
      const { tid } = this.order
      this.$router.push(`/member/aftersales/apply-refund?tid=${tid}&aftersales_type=${type}`)
    },

    linkRefund () {
      const order = this.order
      if (order.aftersales_num > 1) {
        this.$router.push(`/member/aftersales?tid=${order.tid}`)
      } else if (order.aftersales_num === 1) {
        this.$router.push(`/member/aftersales/${order.aftersales_bn}`)
      }
    },

    linkLogistics () {
      if (this.showLogisticsModal) {
        this.showLogisticsModal = !this.showLogisticsModal
        return
      }
      const order = this.order
      if (order.aftersales_num > 1) {
        this.$router.push(`/member/aftersales?tid=${order.tid}`)
      } else if (order.aftersales_num === 1) {
        this.showLogisticsModal = true
        this.logisticsInfo.aftersales_bn = order.aftersales_bn
        this.logisticsInfo.corp_code = ''
        this.logisticsInfo.logi_no = ''
      }
    },

    submitLogistics (name, tid) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.sendLogistics(tid)
        }
      })
    },

    async sendLogistics (tid) {
      let logi_name = ''
      this.logisticsList.map(item => {
        if (item.value === this.logisticsInfo.corp_code) {
          logi_name = item.label
        }
      })
      let params = {
        ...this.logisticsInfo,
        logi_name
      }
      await this.$api.aftersales.logistics(params)
      this.$Message.success(this.$t('comps.order-item.406280-22'))
      this.tradeList()
    }

  }
}
</script>
