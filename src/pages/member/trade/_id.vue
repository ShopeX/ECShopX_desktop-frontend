/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
@import '../member.scss';
.page-order-detail {
  position: relative;
  margin-bottom: 100px;
  .member-content {
    font-size: 12px;
    @include clearfix();
    &-left {
      float: left;
      width: 215px;
      min-height: 700px;
      border: 1px solid $color-border-gray-light;
      border-radius: 4px;
    }

    &-right {
      min-height: 700px;
      float: left;
      border: 1px solid $color-border-gray-light;
      // // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      // border-radius: 4px;
      &-limit {
        width: 600px;
      }
    }
  }
  .btn {
    background-color: #fff;
    cursor: pointer;
    border-radius: 3px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border: 1px solid $color-border-gray-light;
    &:hover {
      background-color: $color-border-gray-light;
    }
  }
  .btn-primary {
    background-color: $color-brand-primary;
    border: 1px solid $color-brand-primary;
    color: #fff;
    &:hover {
      background-color: $color-brand-primary;
    }
  }
  .func-btn{
    box-shadow: 1px 1px 4px #888888;
    border: none;
  }
  .member-content-right {
    .member-content-right-hd {
      font-size: 14px;
      height: 46px;
      line-height: 45px;
      padding: 0 20px;
      border-bottom: 1px solid $color-border-gray-light;

      .order-id {
      }
      .order-status {
        margin-left: 30px;
      }
      .order-btn {
        // display: inline-block;
        float: right;
        // width: 90px;
      }
    }
    .member-content-right-bd {
      padding: 20px;
      .bd-border {
        margin: 20px 0;
        border-bottom: 1px solid $color-border-gray-light;
      }
      .order_message {
        display: inline-block;
        vertical-align: top;
      }
      .remark_info{
        padding: 0 10px;
        h4{
          font-size: 14px;
          font-weight: bold;
          padding-bottom: 10px;
        }
      }
    }
  }
  .dailog {
    .dailog-hd {
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      padding-left: 15px;
      border-bottom: 1px solid $color-border-gray-light;
    }
    .dailog-bd {
      padding: 20px;
      text-align: center;
    }
    .dailog-ft {
      width: 100%;
      position: absolute;
      bottom: 0;
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .dailog-close {
  }
  .dailog-cancel {
    .dailog-bd-input {
      width: 300px;
      display: inline-block;
    }
  }
  .status-code {
    text-align: center;
    float: left;
    width: 30%;
    padding-top: 15px;
    .status-text {
      padding: 10px;
      color: #f56c6c;
      font-size: 25px;
    }
  }

  .delivery{
    height:260px;
    overflow-y: auto;
    .delivery-title{
      padding:15px 0;
    }
    .delivery-item{
      border-top: 1px dashed rgb(149, 149, 149);
      margin:5px 10px 5px 0;
      padding-top: 3px;
      .delivery-info{
        display:flex;
        position: relative;
        line-height: 30px;
        .delivery-btn{
          position: absolute;
          right:30px;
        }
      }
      .delivery-img{
        width:60px;
        height: 60px;
        margin-right: 7px;
      }
    }
  }

  .timeline {
    padding-left: 150px;
    float: right;
    width: 65%;

    // margin-top: -15px;
    max-height: 250px;
    overflow: auto;
    .timeline-item {
      position: relative;
      padding-bottom: 20px;

      .time-day {
        margin-left: -140px;
        position: relative;
        top: 14px;
      }

      &:nth-last-child(1) {
        .timeline-item__tail {
          display: none;
        }
      }
      .timeline-item__tail {
        position: absolute;
        left: 4px;
        height: 100%;
        border-left: 2px solid #e4e7ed;
      }

      .timeline-item__node {
        position: absolute;
        background-color: #e4e7ed;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        left: -1px;
        width: 12px;
        height: 12px;
        .success {
          color: $color-active;
        }
      }
      .timeline-item__node_color {
        background-color: white;
      }
      .timeline-item__wrapper {
        position: relative;
        padding-left: 28px;
        top: -3px;
      }
    }
  }
  .timelineDetails{
    float: left;
    min-height: 300px;
    background: #fff;
    width: 100%;
    padding-left: 200px;
    padding-top: 30px;
    .timeline-item {
      position: relative;
      padding-bottom: 20px;

      .time-day {
        margin-left: -140px;
        position: relative;
        top: 14px;
      }

      &:nth-last-child(1) {
        .timeline-item__tail {
          display: none;
        }
      }
      .timeline-item__tail {
        position: absolute;
        left: 20px;
        height: 100%;
        border-left: 2px solid #e4e7ed;
      }

      .timeline-item__node {
        position: absolute;
        background-color: #e4e7ed;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 15px;
        width: 12px;
        height: 12px;
        .success {
          color: $color-active;
        }
      }
      .timeline-item__node_color {
        background-color: white;
      }
      .timeline-item__wrapper {
        position: relative;
        padding-left: 43px;
        top: -5px;
      }
    }
  }
  .ziti-warp {
    padding-left: 150px;
    float: right;
    width: 65%;
    padding-top: 15px;
    .ziti-warp-content {
      float: right;
      max-height: 250px;
      overflow: auto;
      width: 85%;
      .ziti-item {
        text-align: left;
        margin-bottom: 25px;
        h4 {
          font-size: 16px;
          font-weight: bold;
        }
        p {
          padding: 5px 0;
        }
      }
    }
  }
  .btn-warp {
    padding: 15px;

    .btn {
      width: 80px;
      height: 35px;
      color: white;
      font-size: 14px;
      background-color: $color-brand-primary;
      &:hover {
        background-color: $color-secondary-text;
      }
    }
  }

  .btn-warp2 {
    display: flex;
    justify-content: center;
    .btn {
      width: auto;
      padding: 0 12px;
      margin-right: 8px;
    }
  }
  .btn-warp-bt {
    // position: relative;
    bottom: -30px;
    cursor: pointer;
    i {
      font-size: 15px;
    }
  }
  .status-log {
  }
}
</style>

<template>
  <!-- <div class="page-order-detail page-member-container">
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="order"></smenu>
      </div> -->
  <div class="page-order page-order-detail page-member-container">
    <div class="container page-member-container">
      <div class="member-content" style="display: flex;">
        <div class="member-content-left">
          <smenu activeTitle="order" active="trade"></smenu>
        </div>
        <div class="member-content-right" style="padding: 15px 0 0 15px;">
          <div class="member-content-right-body">
            <div class="member-content-right-hd clearfix">
              <span style="cursor: pointer" @click="clickToList"
                ><i class="ec-icon ec-icon-back_android"></i>{{ $t('trade._id.035369-0') }}</span
              >
              <span class="order-id">{{ $t('trade._id.035369-1') }}{{ orderInfo.order_id }}</span>
              <!-- <span class="order-status">状态：{{orderStatusText[orderInfo.order_status_des]}}</span> -->
              <!-- <div class="order-btn">

                <button class="btn btn-primary" @click="clickBtn($t('trade._id.035369-4'))" v-if="step == 1">现在付款</button>
                <button class="btn" @click="clickBtn($t('trade._id.035369-8'))" v-if="step == 1 || step == 2">{{ $t('trade._id.035369-8') }}</button>

            </div> -->
          </div>
          <div class="member-content-right-bd">
            <!-- 步骤条 -->
            <!-- <SpSteps :steps="4" :step="step" :stepsText="stepsText" /> -->
            <div class="clearfix status-log">
              <div class="status-code">
                {{ $t('trade._id.035369-2') }}{{ orderInfo.order_id }}
                <div class="status-text">
                  {{orderStatusTextFunc()}}
                </div>
                <!-- <span v-if="orderStatus=='PAYED'&&receiveData.ziti_status=='PENDING'">请尽快前往自提点自提</span> -->
                <span v-if="!(orderStatus=='PAYED'&&receiveData.ziti_status=='PENDING') && orderInfo.order_status_des == 'NOTPAY'">
                  <i class="ec-icon ec-icon-time"></i>{{ $t('trade._id.035369-3') }}{{ cancelTime }}
                </span>
                <div class="btn-warp btn-warp2">
                  <button class="btn func-btn" @click="clickBtn($t('trade._id.035369-4'))" v-if="step == 1 && orderInfo.pay_type != 'point' && orderInfo.offline_pay_check_status != '0'">{{ $t('trade._id.035369-5') }}</button>
                  <button class="btn func-btn" @click="clickBtn($t('trade._id.035369-4'))" v-if="step == 1 && orderInfo.pay_type != 'point' && orderStatus == 'NOTPAY' && orderInfo.offline_pay_check_status == 2"> {{ $t('trade._id.035369-6') }}</button>
                  <button class="btn func-btn" v-if="step == 3" @click="clickBtn($t('trade._id.035369-7'))">{{ $t('trade._id.035369-7') }}</button>
                </div>
                <div class="btn-warp-bt" @click="clickBtn($t('trade._id.035369-8'))" v-if="(step == 1 || step == 2) && orderInfo.offline_pay_check_status != '0'">
                  <i class="ec-icon ec-icon-roundclose"> {{ $t('trade._id.035369-8') }}</i>
                </div>
                <!-- 判断是待提货及有无提货码状态下 -->
                <div v-if="(orderStatus=='PAYED'&&receiveData.ziti_status=='PENDING') && (zitiInfo&&zitiInfo.pickup_code)">
                  <h4 style="font-size:16px;font-weight: bold;">{{ $t('trade._id.035369-9') }}{{ zitiInfo.pickup_code }} </h4>
                  <div style="color:rgb(153 153 153);font-size:12px;font-weight: 400;">{{ $t('trade._id.035369-10') }}</div>
                </div>
                <div v-else-if="(orderStatus=='PAYED'&&receiveData.ziti_status=='PENDING')">
                  <h4 style="font-size:16px;font-weight: bold;">{{ $t('trade._id.035369-11') }}</h4>
                </div>
              </div>

              <div class="timeline" style="position: relative;" v-if="orderInfo.order_status_des==='PAYED_PENDING'">
                <ul>
                  <template>
                    <li class="timeline-item" v-for="(item, index) in activities" :key="index" style="padding-top:15px;">
                      <span class="time-day"> {{ item.AcceptTime | parseTime }}</span>
                      <div class="timeline-item__tail"></div>
                      <div class="timeline-item__node" :class="index == 0 ? 'timeline-item__node_color' : ''">
                        <i class="ec-icon ec-icon-roundcheck success" v-if="index == 0"></i>
                      </div>
                      <div class="timeline-item__wrapper">
                        <div class="el-timeline-item__content">{{ item.AcceptStation }}</div>
                        <div class="el-timeline-item__timestamp is-bottom"></div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <!-- 部分发货判断-----写class不生效，所以用style写样式 -->
              <!-- <div :v-else-if="orderStatusText[orderInfo.order_status_des]==='$t('trade._id.035369-34')' || :(orderStatusText[orderInfo.order_status_des]==='$t('trade._id.035369-30')'&&deliveryLists.length>1)"> 所有拆分发货的数据，改判断-->
              <div v-else-if="deliveryLists.length>1">
                <ul class="delivery">
                  <div class="delivery-title">{{ deliveryGoodsNum.length }}{{ $t('trade._id.035369-12') }}</div>
                  <template>
                    <li class="delivery-item" v-for="(item, index) in deliveryLists" :key="index">
                      <div class="delivery-info">
                        <div>{{item.status_msg}}{{ $t('trade._id.035369-13') }}</div>
                        <div style="margin-left:50px" v-show="item.delivery_corp_name!='' || item.delivery_code!=''">
                          {{item.delivery_corp_name}}：{{item.delivery_code}}
                        </div>
                        <img class="delivery-img" :src="item2.pic" alt="" v-for="(item2, index2) in item.items" :key="index2">
                        <div style="color:rgb(149 149 149);margin-top:8px">{{ $t('trade._id.035369-14') }}{{item.items_num}}{{ $t('trade._id.035369-15') }}</div>
                      </div>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="timeline" style="position: relative;" v-else>
                  <ul class>
                    <template>
                      <li style="position: absolute;left:10px" v-for="(item, index) in deliveryLists" :key="index">
                        {{item.delivery_corp_name}}  {{item.delivery_code}}
                      </li>
                      <li class="timeline-item" v-for="(item, index) in activities" :key="index" style="padding-top:15px;">
                        <span class="time-day"> {{ item.AcceptTime | parseTime }}</span>
                        <div class="timeline-item__tail"></div>
                        <div class="timeline-item__node" :class="index == 0 ? 'timeline-item__node_color' : ''">
                          <i class="ec-icon ec-icon-roundcheck success" v-if="index == 0"></i>
                        </div>
                        <div class="timeline-item__wrapper">
                          <div class="el-timeline-item__content">{{ item.AcceptStation }}</div>
                          <div class="el-timeline-item__timestamp is-bottom"></div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>

              <p class="bd-border"></p>
              <div :style="{ width: orderStatus !== 'CANCEL' ? '45%' : '90%', bordeRight: orderStatus !== 'CANCEL' ? '1px solid #e5e5e5' : 'none' }" class="order_message">
                <!-- 收货人信息 -->
                <Receive :receiveData="receiveData" />
              </div>
              <!-- 付款信息 -->
              <div style="width: 45%;" class="order_message" v-if="orderStatus && orderStatus !== 'CANCEL'">
                <PayInfo :receiveData="receiveData" @viewCertificate="clickBtn($t('trade._id.035369-4'),'isView')"></PayInfo>
              </div>
              <!-- 发票信息 -->
              <div style="width: 100%;" class="order_message" v-if="(receiveData.invoice!=null &&receiveData.invoice.length!=0)">
                <InvoiceInfo :receiveData="receiveData"></InvoiceInfo>
              </div>
              <div style="width: 100%;" class="order_message remark_info" v-if="remark">
                <p class="bd-border"></p>
                <h4>{{ $t('trade._id.035369-16') }}</h4>
                <p>{{remark}}</p>
              </div>

              <p class="bd-border"></p>
              <OrderGood :orderGoodData="orderGoodData" :orderTotalData="orderTotalData" @change="getOrderInfo"/>

            </div>
          </div>
        </div>
      </div>
    </div>
    <SpModal v-model="dailogCancel" :height="200" :width="450">
      <div class="dailog dailog-cancel">
        <div class="dailog-hd">{{ $t('trade._id.035369-8') }}</div>
        <div class="dailog-bd">
          <span>{{ $t('trade._id.035369-2') }}{{ this.$route.params.id }}</span>
          <div style="padding: 20px 0 10px 0">
            <!-- <span style="display:inline-block;width:100px;text-align:right">{{ $t('trade._id.035369-17') }}</span>
            <SpInput :placeholder="$t('trade._id.035369-18')" v-model="cancelMean" class="dailog-bd-input" />-->
            <SpForm ref="form" :model="form" :rules="rules">
              <SpFormItem prop="cancelMean">
                <span style="display: inline-block; width: 80px; text-align: right"
                  >{{ $t('trade._id.035369-17') }}</span
                >
                <SpInput
                  class="dailog-bd-input"
                  v-model="form.cancelMean"
                  :placeholder="$t('trade._id.035369-18')"
                />
              </SpFormItem>
            </SpForm>
          </div>
        </div>

        <div class="dailog-ft">
          <button class="btn btn-primary" @click="clickBtn($t('trade._id.035369-19'))">{{ $t('trade._id.035369-20') }}</button>
          <button class="btn" @click="clickBtn($t('trade._id.035369-21'))">{{ $t('trade._id.035369-22') }}</button>
        </div>
      </div>
    </SpModal>
    <SpModal v-model="dialogLogistics" :height="500" :width="650">
      <div class="dailog dailog-cancel">
        <div class="dailog-hd">{{ $t('trade._id.035369-23') }}</div>
        <div class="timelineDetails" style="height:500px;padding-right:20px;overflow:auto;">
          <ul class>
            <template>
              <li class="timeline-item" v-for="(item, index) in deliveryListsDetails" :key="index" style="padding-top:15px;">
                <span class="time-day"> {{ item.AcceptTime | parseTime }}</span>
                <div class="timeline-item__tail"></div>
                <div class="timeline-item__node" :class="index == 0 ? 'timeline-item__node_color' : ''">
                  <i class="ec-icon ec-icon-roundcheck success" v-if="index == 0"></i>
                </div>
                <div class="timeline-item__wrapper">
                  <div class="el-timeline-item__content">{{ item.AcceptStation }}</div>
                  <div class="el-timeline-item__timestamp is-bottom"></div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import smenu from './../comps/smenu'
import Receive from './comps/receive' //收件人信息。数据key按照接口返回的给，详细看组件
import PayInfo from './comps/payInfo' //收件人信息。数据key按照接口返回的给，详细看组件
import InvoiceInfo from './comps/InvoiceInfo' //发票信息

import OrderGood from './comps/order-good'
import { getOrderInfo, orderCancel, confirmOrder, ziticode } from '@/api/member'
import { deliveryInfo, getdeliveryId} from '@/api/trade'


export default {
  data() {
    return {
      step: 0,
      stepsText: [
        this.$t('trade._id.035369-24'),
        this.$t('trade._id.035369-25'),
        this.$t('trade._id.035369-26'),
        this.$t('trade._id.035369-27')
      ],
      orderInfo: {},
      receiveData: {}, //收货人信息
      orderGoodData: {}, //商品信息
      orderTotalData: {}, //总价信息
      orderStatusText: {
        NOTPAY: this.$t('trade._id.035369-28'),
        PAYED: this.$t('trade._id.035369-29'),
        WAIT_BUYER_CONFIRM: this.$t('trade._id.035369-30'),
        FAIL: this.$t('trade._id.035369-31'),
        CANCEL: this.$t('trade._id.035369-32'),
        PAYED_WAIT_PROCESS: this.$t('trade._id.035369-33'),
        PAYED_PARTAIL: this.$t('trade._id.035369-34'),
        CLOSED: this.$t('trade._id.035369-31'),
        DONE: this.$t('trade._id.035369-35'),
        PAYED_PENDING: this.$t('trade._id.035369-36'),
        // PENDING: this.$t('trade._id.035369-35'),
      }, //状态字典
      orderStatus: '',
      dailogCancel: false,

      form: { cancelMean: '' },
      rules: {
        cancelMean: [{ validate: 'required', message: this.$t('trade._id.035369-37') }]
      },
      activities: [
        {
          AcceptStation: '0',
          AcceptTime: '0'
        }
      ],
      zitiData: [],
      timer: null,
      auto_cancel_seconds: 0,
      cancelTime: '',
      deliveryLists:[],    // 物流列表
      deliveryGoodsNum:[],    // 发货个数
      deliveryListsDetails:[],    // 查看物流详情
      dialogLogistics: false,
      zitiInfo: null,
      remark:''
    }
  },
  computed: {},
  components: {
    smenu,
    Receive,
    OrderGood,
    PayInfo,
    InvoiceInfo
  },
  created() {
    this.getOrderInfo()
  },
  async mounted() {
    this.timer = setInterval(this.timers, 1000)
    let { id } = this.$route.params
    this.zitiInfo = await ziticode({ order_id: id })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async getOrderInfo() {
      let { id } = this.$route.params
      let { orderInfo, distributor, tradeInfo } = await getOrderInfo({ id })

      let {list} =  await getdeliveryId({order_id:id})
      let delivery_id = list[0]&&list[0].delivery_id;
      this.deliveryLists = list
      this.deliveryGoodsNum = []
      list.map(ele=>{
        if(ele.status_msg==this.$t('trade._id.035369-38')){
          this.deliveryGoodsNum.push(ele)
        }
      })

      this.zitiData = [distributor]
      let {
        order_status,
        order_type,
        pay_type,
        point,
        freight_type,
        receipt_type,
        receiver_address,
        receiver_city,
        receiver_district,
        receiver_mobile,
        receiver_name,
        create_time,
        receiver_state,
        receiver_zip,
        item_fee,
        freight_fee,
        total_fee,
        order_status_des,
        delivery_corp_name,
        delivery_code,
        auto_cancel_seconds,
        order_class,
        discount_fee,
        invoice,   //发票信息
        point_fee,   // 积分抵扣金额
        is_invoiced,  //开票状态
        ziti_info,    // 自提信息
        ziti_status,    // 自提状态
        ziti_code,      // 自提码
        end_date,
        offline_pay_name,
        offline_pay_check_status,
        remark ,  // 备注
      } = orderInfo
      this.remark = remark;
      this.orderGoodData = {
        can_apply_aftersales: orderInfo.can_apply_aftersales,
        detail: orderInfo.items,
        pay_type,
        order_class
      }
      let { payDate } = tradeInfo
      this.orderStatus = order_status
      this.receiveData = {
        receipt_type,
        receiver_address,
        receiver_city,
        receiver_district,
        receiver_mobile,
        receiver_name,
        receiver_state,
        receiver_zip,
        delivery_corp_name,
        delivery_code,
        pay_type,
        offline_pay_name,
        offline_pay_check_status,
        create_time,
        payDate,
        invoice,
        is_invoiced,
        ziti_info,
        ziti_status
      }
      // order_status_des='WAIT_BUYER_CONFIRM'
      this.auto_cancel_seconds = auto_cancel_seconds
      this.orderTotalData = {
        create_time,
        item_fee,
        freight_fee,
        total_fee,
        order_status_des,
        pay_type,
        point,
        freight_type,
        point,
        order_class,
        discount_fee,
        point_fee
      }
      this.orderInfo = orderInfo
      let activities
      switch (order_status_des) {
        case 'NOTPAY':
          this.step = 1
          activities = [
            {
              AcceptStation: this.$t('trade._id.035369-39'),
              AcceptTime: create_time
            }
          ]
          break
        case 'PAYED':
          this.step = 2
          activities = [
            {
              AcceptStation: this.$t('trade._id.035369-40'),
              AcceptTime: payDate
            },
            {
              AcceptStation: this.$t('trade._id.035369-39'),
              AcceptTime: create_time
            }
          ]
          break
        case 'WAIT_BUYER_CONFIRM':
          this.step = 3

          break
        case 'DONE':
          this.step = 4
          break
        case 'SUCCESS':
          this.step = 4
          break
        case 'PAYED_WAIT_PROCESS':
          this.step = -1
          break
        case 'CANCEL':
          this.step = -1
          break
        case 'FAIL':
          this.step = -1
          break
        case 'PAYED_PARTAIL': // 部分发货
          // this.step = 2       //状态0可取消订单,部分发货不可取消
          this.step = 0       //状态0不显示任何按钮，包括确认收货+取消订单等
          break
        case 'PAYED_PENDING':   // 待自提
          this.step = 5
          activities = [
            {
              AcceptStation: this.$t('trade._id.035369-40'),
              AcceptTime: payDate
            },
            {
              AcceptStation: this.$t('trade._id.035369-39'),
              AcceptTime: create_time
            }
          ]
          break
        default:
          this.step = 0
          break
      }
      this.activities = activities
      if (this.step == 4 && ziti_code && ziti_code!=0) {
        // 自提完成时间轴
        this.activities = [
          {
            AcceptStation: this.$t('trade._id.035369-35'),
            AcceptTime: end_date
          },
          {
            AcceptStation: this.$t('trade._id.035369-40'),
            AcceptTime: payDate
          },
          {
            AcceptStation: this.$t('trade._id.035369-39'),
            AcceptTime: create_time
          }
        ]
      }else if (this.step == 4 || this.step == 3) {
        deliveryInfo({delivery_id:delivery_id }).then((res) => {
          activities = [
            {
              AcceptStation: this.$t('trade._id.035369-40'),
              AcceptTime: payDate
            },
            {
              AcceptStation: this.$t('trade._id.035369-39'),
              AcceptTime: create_time
            }
          ]
          // this.activities = res.reverse().concat(activities)
          this.activities = res.concat(activities)
        })
      }
    },
    onLogisticsDetails(val){
      console.log(val.delivery_id);
      this.dialogLogistics = true
      deliveryInfo({delivery_id:val.delivery_id }).then((res) => {
        this.deliveryListsDetails = res
      })
    },
    clickBtn(type,isView) {
      switch (type) {
        case this.$t('trade._id.035369-4'):
          let _url = `/cashier?order_id=${this.$route.params.id}&has_check=${this.orderInfo.offline_pay_check_status !== null}`;
          if(isView){
            _url += '&isView=true'
          }
          this.$router.push(_url)
          break
        case this.$t('trade._id.035369-7'):
          confirmOrder({
            order_id: this.$route.params.id
          }).then((res) => {
            this.$Message.success(this.$t('trade._id.035369-41'))
            // this.getTradeList()
            this.getOrderInfo()
          })

          break
        case this.$t('trade._id.035369-8'):
          this.dailogCancel = true
          break
        case this.$t('trade._id.035369-21'):
          this.dailogCancel = false
          break
        case this.$t('trade._id.035369-19'):
          this.$refs['form'].validate((valid, errors) => {
            if (valid) {
              orderCancel({
                order_id: this.$route.params.id,
                cancel_reason: this.form.cancelMean
              }).then(() => {
                this.getOrderInfo()
              })
            }
          })
          break
      }
    },
    orderStatusTextFunc(){
      if(this.orderStatus=='PAYED'&& this.receiveData.ziti_status=='PENDING'){
        return this.$t('trade._id.035369-36')
      }else if(this.orderInfo.offline_pay_check_status == 0){
        return this.$t('trade._id.035369-42')
      }else{
        return this.orderStatusText[this.orderInfo.order_status_des]
      }

    },
    timers() {
      let theTime = parseInt(this.auto_cancel_seconds) // 需要转换的时间秒
      let theTime1 = 0 // 分
      let theTime2 = 0 // 小时
      let theTime3 = 0 // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
          if (theTime2 > 24) {
            //大于24小时
            theTime3 = parseInt(theTime2 / 24)
            theTime2 = parseInt(theTime2 % 24)
          }
        }
      }
      let result = ''
      if (theTime > 0) {
        result = '' + parseInt(theTime) + this.$t('trade._id.035369-43')
      }
      if (theTime1 > 0) {
        result = '' + parseInt(theTime1) + this.$t('trade._id.035369-44') + result
      }
      if (theTime2 > 0) {
        result = '' + parseInt(theTime2) + this.$t('trade._id.035369-45') + result
      }
      if (theTime3 > 0) {
        result = '' + parseInt(theTime3) + this.$t('trade._id.035369-46') + result
      }
      this.cancelTime = result
      this.auto_cancel_seconds--
    },
    clickToList() {
      this.$router.push('/member/trade')
    }
  }
}
</script>
