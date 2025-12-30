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
      &-limit {
        width: 600px;
      }
    }
  }
  .btn {
    background-color: #fff;
    cursor: pointer;
    width: 70px;
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
    }
  }
  .dailog {
    .dailog-hd {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding-left: 15px;
      border-bottom: 1px solid $color-border-gray-light;
    }
    .dailog-bd {
      padding: 20px 20px 0;
      text-align: center;
    }
    .dailog-ft {
      width: 100%;
      // position: absolute;
      // bottom: 0;
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
  .aftersales {
    width: 45%;
    display: inline-block;
    vertical-align: top;

    border-right: 1px solid #e5e5e5;
    p {
      padding-bottom: 10px;
    }
  }
  .btns {
    padding-top: 20px;
  }
  .logSpSelect {
    ::v-deep .sort-select__dropdown-list {
      height: 220px !important;
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
  .status-steps {
    float: left;
    width: 70%;
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
        <div class="member-content-right"  style="padding: 15px 0 0 15px;">
          <div class="member-content-right-body">
            <div class="member-content-right-hd clearfix">
              <span style="cursor: pointer;" @click="clickToList"><i class="ec-icon ec-icon-back_android"></i>{{ $t('trade.aftersale.414246-0') }}</span>
              <span class="order-id">{{ $t('trade.aftersale.414246-1') }}{{ orderInfo.order_id }}</span>
            </div>
            <div class="member-content-right-bd">
              <div class="clearfix status-log">
                <div class="status-code">
                  {{ $t('trade.aftersale.414246-2') }}{{ orderInfo.order_id }}
                  <div class="status-text">{{ aftersalesTypeText[aftersalesInfo.progress] }}</div>
                  <div style="color:#797979">
                    {{aftersalesTypeTextContent[aftersalesInfo.progress]}}
                  </div>
                </div>
                <div class="status-steps">
                  <!-- 步骤条 -->
                  <AftersaleSteps :step="Number(aftersalesInfo.aftersales_progress)" :stepsData="stepsData" />
                  <!-- 还未确认字段 -->
                  <!-- <AftersaleSteps :step="Number(aftersalesInfo.aftersales_status)+1" :stepsData="stepsData" /> -->
                  <!-- <AftersaleSteps :step="Number(aftersalesInfo.progress)+1" :stepsData="stepsData" /> -->
                </div>
              </div>
    
              <!-- 步骤条 -->
              <!-- <SpSteps
                :steps="5"
                :step="Number(aftersalesInfo.aftersales_status)+1"
                :stepsText="stepsText"
              /> -->
              <p class="bd-border"></p>
              <div class="aftersales">
                <h4>{{ $t('trade.aftersale.414246-3') }}</h4>
                <p>{{ $t('trade.aftersale.414246-3') }}：{{ aftersalesInfo.reason }}</p>
                <p>{{ $t('trade.aftersale.414246-5') }}{{ aftersalesInfo.description }}</p>
                <p>{{ $t('trade.aftersale.414246-6') }}</p>
                <!-- <p>{{aftersalesTypeText[aftersalesInfo.progress]}}</p> -->
                <!-- <p>退换货类型：{{aftersalesTypeText[aftersalesInfo.aftersales_type]}}</p>
                <p>退换货编号：{{aftersalesInfo.aftersales_bn}}</p>
                <p>申请时间：{{aftersalesInfo.create_time|parseTime}}</p> -->
                <!-- <p
                  v-if="aftersalesInfo.progress === 6"
                >退款金额：{{ orderGoodData[0].items[0].refunded_fee | formatPriceToHundred}}</p> -->
                <div v-if="this.orderInfo.order_status_des !== 'DONE'">
                  <div class="btns" v-if="aftersalesInfo.progress === 0">
                    <!-- <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale.414246-61'))">{{ $t('trade.aftersale.414246-61') }}</button> -->
                    <button class="btn" @click="clickBtn($t('trade.aftersale.414246-7'))">{{ $t('trade.aftersale.414246-7') }}</button>
                  </div>
                  <div class="btns" v-if="aftersalesInfo.progress === 1">
                    <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale.414246-8'))">{{ $t('trade.aftersale.414246-8') }}</button>
                    <button class="btn" @click="clickBtn($t('trade.aftersale.414246-7'))">{{ $t('trade.aftersale.414246-7') }}</button>
                  </div>
                  <div class="btns" v-if="aftersalesInfo.progress === 3 || aftersalesInfo.progress === 5">
                    <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale.414246-9'))">{{ $t('trade.aftersale.414246-9') }}</button>
                    <button class="btn" @click="clickBtn($t('trade.aftersale.414246-7'))">{{ $t('trade.aftersale.414246-7') }}</button>
                  </div>
                </div>
              </div>
              <div style="width: 45%; display: inline-block; vertical-align: top">
                <!-- 收货人信息 -->
                <Receive :receiveData="receiveData" />
              </div>
              <p class="bd-border"></p>
            
              <OrderGood :orderGoodData="orderGoodData" :orderTotalData="orderTotalData" :aftersale="true" @change="getInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <SpModal v-model="dailogClose" :height="320" :width="520">
      <div class="dailog dailog-close">
        <div class="dailog-hd">{{ $t('trade.aftersale.414246-10') }}</div>
        <div class="dailog-bd">
          <!-- <span>订单号：{{this.$route.params.id}}</span> -->
          <div>
            <SpForm ref="formClose" :model="formClose" :rules="rulesClose">
              <SpFormItem prop="type">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('trade.aftersale.414246-11') }}</span>
                <SpSelect style="width: 350px" :data="typeData" v-model="formClose.type" :placeholder="$t('trade.aftersale.414246-12')"></SpSelect>
              </SpFormItem>
              <SpFormItem prop="reason">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('trade.aftersale.414246-13') }}</span>
                <SpSelect style="width: 350px" :data="reasonData" v-model="formClose.reason" :placeholder="$t('trade.aftersale.414246-14')"></SpSelect>
              </SpFormItem>
              <SpFormItem prop="description">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('trade.aftersale.414246-15') }}</span>
                <SpInput style="width: 350px" v-model="formClose.description" :placeholder="$t('trade.aftersale.414246-16')" />
              </SpFormItem>
            </SpForm>
          </div>
        </div>
        <div class="dailog-ft">
          <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale.414246-17'))">{{ $t('trade.aftersale.414246-18') }}</button>
          <button class="btn" @click="clickBtn($t('trade.aftersale.414246-19'))">{{ $t('trade.aftersale.414246-19') }}</button>
        </div>
      </div>
    </SpModal>
    <!-- 填写物流信息 -->
    <SpModal v-model="dialogLog" :height="320" :width="520">
      <div class="dailog dailog-close">
        <div class="dailog-hd">{{ $t('trade.aftersale.414246-8') }}</div>
        <div class="dailog-bd">
          <!-- <span>订单号：{{this.$route.params.id}}</span> -->
          <div>
            <SpForm ref="logisticsForm" :model="logisticsForm" :rules="logisticsRules">
              <SpFormItem prop="corp_code">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('trade.aftersale.414246-20') }}</span>
                <SpSelect style="width: 350px" class="logSpSelect" :data="logisticsText" v-model="logisticsForm.corp_code" :placeholder="$t('trade.aftersale.414246-21')"></SpSelect>
              </SpFormItem>
              <SpFormItem prop="logi_no">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('trade.aftersale.414246-22') }}</span>
                <SpInput style="width: 350px" v-model="logisticsForm.logi_no" :placeholder="$t('trade.aftersale.414246-23')" />
              </SpFormItem>
            </SpForm>
          </div>
        </div>
        <div class="dailog-ft">
          <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale.414246-24'))">{{ $t('trade.aftersale.414246-18') }}</button>
          <button class="btn" @click="clickBtn($t('trade.aftersale.414246-19'))">{{ $t('trade.aftersale.414246-19') }}</button>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import smenu from './../comps/smenu'
import Receive from './comps/receive' //收件人信息。数据key按照接口返回的给，详细看组件
import OrderGood from './comps/order-good'
import AftersaleSteps from './comps/aftersale-steps'

import { aftersalesInfo, creatAftersales, editAftersales, closeAftersales, sendbackAftersales } from '@/api/member'
const LOGISTICS_CODE = {
  SF: '\u987a\u4e30\u5feb\u9012',
  YTO: '\u5706\u901a\u901f\u9012',
  STO: '\u7533\u901a\u5feb\u9012',
  ST: '\u901f\u901a\u7269\u6d41',
  ZTO: '\u4e2d\u901a\u901f\u9012',
  YD: '\u97f5\u8fbe\u5feb\u9012',
  AAE: 'AAE\u5168\u7403\u4e13\u9012',
  ANE: '\u5b89\u80fd\u7269\u6d41',
  ARAMEX: 'Aramex',
  AT: '\u5965\u5730\u5229\u90ae\u653f',
  BALUNZHI: '\u5df4\u4f26\u652f\u5feb\u9012',
  BEL: '\u6bd4\u5229\u65f6\u90ae\u653f',
  BFDF: '\u767e\u798f\u4e1c\u65b9',
  BHT: 'BHT\u5feb\u9012',
  BKWL: '\u5b9d\u51ef\u7269\u6d41',
  BQXHM: '\u5317\u9752\u5c0f\u7ea2\u5e3d',
  BR: '\u5df4\u897f\u90ae\u653f',
  BSWL: '\u90a6\u9001\u7269\u6d41',
  CA: '\u52a0\u62ff\u5927\u90ae\u653f',
  CITY100: '\u57ce\u5e02100',
  COE: 'COE\u4e1c\u65b9\u5feb\u9012',
  CSCY: '\u957f\u6c99\u521b\u4e00',
  D4PX: '\u9012\u56db\u65b9\u901f\u9012',
  DBL: '\u5fb7\u90a6',
  DHL_C: 'DHL(\u4e2d\u56fd\u4ef6)',
  DHL_DE: 'DHL(\u5fb7\u56fd\u4ef6)',
  DHL_GLB: 'DHL\u5168\u7403',
  DHL_USA: 'DHL(\u7f8e\u56fd)',
  DK: '\u4e39\u9ea6\u90ae\u653f',
  DPEX: 'DPEX',
  DSWL: 'D\u901f\u7269\u6d41',
  DTWL: '\u5927\u7530\u7269\u6d41',
  EMS: 'EMS\u56fd\u5185',
  EMSGJ: 'EMS\u56fd\u9645',
  FAST: '\u5feb\u6377\u901f\u9012',
  FEDEX_C: 'FedEx\u8054\u90a6\u5feb\u9012(\u4e2d\u56fd\u4ef6)',
  FKD: '\u98de\u5eb7\u8fbe',
  FKRFD: '\u51e1\u5ba2\u5982\u98ce\u8fbe',
  GHX: '\u6302\u53f7\u4fe1',
  GJYZ: '\u56fd\u9645\u90ae\u653f\u5305\u88f9',
  GSD: '\u5171\u901f\u8fbe',
  GTO: '\u56fd\u901a\u5feb\u9012',
  GTSD: '\u9ad8\u94c1\u901f\u9012',
  HHTT: '\u5929\u5929\u5feb\u9012',
  HOAU: '\u5929\u5730\u534e\u5b87',
  hq568: '\u534e\u5f3a\u7269\u6d41',
  HTKY: '\u767e\u4e16\u6c47\u901a',
  HXLWL: '\u534e\u590f\u9f99\u7269\u6d41',
  HYLSD: '\u597d\u6765\u8fd0\u5feb\u9012',
  IE: '\u7231\u5c14\u5170\u90ae\u653f',
  JD: '\u4eac\u4e1c\u5feb\u9012',
  JGSD: '\u4eac\u5e7f\u901f\u9012',
  JJKY: '\u4f73\u5409\u5feb\u8fd0',
  JLDT: '\u5609\u91cc\u5927\u901a',
  JP: '\u65e5\u672c\u90ae\u653f',
  JTKD: '\u6377\u7279\u5feb\u9012',
  JXD: '\u6025\u5148\u8fbe',
  JYKD: '\u664b\u8d8a\u5feb\u9012',
  JYM: '\u52a0\u8fd0\u7f8e',
  JYWL: '\u4f73\u6021\u7269\u6d41',
  LB: '\u9f99\u90a6\u5feb\u9012',
  LHTEX: '\u8054\u660a\u901a\u901f\u9012',
  NEDA: '\u80fd\u8fbe\u901f\u9012',
  NL: '\u8377\u5170\u90ae\u653f',
  ONTRAC: 'ONTRAC',
  QFKD: '\u5168\u5cf0\u5feb\u9012',
  QRT: '\u5168\u65e5\u901a\u5feb\u9012',
  RDSE: '\u745e\u5178\u90ae\u653f',
  SDWL: '\u4e0a\u5927\u7269\u6d41',

  SFWL: '\u76db\u4e30\u7269\u6d41',
  SHWL: '\u76db\u8f89\u7269\u6d41',
  ST: '\u901f\u901a\u7269\u6d41',

  STSD: '\u4e09\u6001\u901f\u9012',
  SURE: '\u901f\u5c14\u5feb\u9012',
  SWCH: '\u745e\u58eb\u90ae\u653f',
  TSSTO: '\u5510\u5c71\u7533\u901a',
  UAPEX: '\u5168\u4e00\u5feb\u9012',
  UC: '\u4f18\u901f\u5feb\u9012',
  UPS: 'UPS',
  USPS: 'USPS\u7f8e\u56fd\u90ae\u653f',
  XFEX: '\u4fe1\u4e30\u5feb\u9012',
  XYT: '\u5e0c\u4f18\u7279',
  YADEX: '\u6e90\u5b89\u8fbe\u5feb\u9012',
  YAMA: '\u65e5\u672c\u5927\u548c\u8fd0\u8f93(Yamato)',
  YD: '\u97f5\u8fbe\u5feb\u9012',
  YFEX: '\u8d8a\u4e30\u7269\u6d41',
  YFHEX: '\u539f\u98de\u822a\u7269\u6d41',
  YJSD: '\u94f6\u6377\u901f\u9012',

  YZPY: '\u90ae\u653f\u5e73\u90ae/\u5c0f\u5305',
  ZENY: '\u589e\u76ca\u5feb\u9012',
  ZJS: '\u5b85\u6025\u9001',
  ZMKM: '\u829d\u9ebb\u5f00\u95e8',
  ZTE: '\u4f17\u901a\u5feb\u9012',
  ZTKY: '\u4e2d\u94c1\u5feb\u8fd0',
  ZTO: '\u4e2d\u901a\u901f\u9012',
  ZTWL: '\u4e2d\u94c1\u7269\u6d41',
  ZY_AG: '\u7231\u8d2d\u8f6c\u8fd0',
  ZY_AOZ: '\u7231\u6b27\u6d32',
  ZY_AUSE: '\u6fb3\u4e16\u901f\u9012',
  ZY_AXO: 'AXO',
  ZY_AZY: '\u6fb3\u8f6c\u8fd0',
  ZY_BDA: '\u516b\u8fbe\u7f51',
  ZY_BEE: '\u871c\u8702\u901f\u9012',
  ZY_BH: '\u8d1d\u6d77\u901f\u9012',
  ZY_BL: '\u767e\u5229\u5feb\u9012',
  ZY_BM: '\u6591\u9a6c\u7269\u6d41',
  ZY_BOZ: '\u8d25\u6b27\u6d32',
  ZY_BT: '\u767e\u901a\u7269\u6d41',
  ZY_BYECO: '\u8d1d\u6613\u8d2d',
  ZY_CM: '\u7b56\u9a6c\u8f6c\u8fd0',
  ZY_CTM: '\u8d64\u5154\u9a6c\u8f6c\u8fd0',
  ZY_CUL: 'CUL\u4e2d\u7f8e\u901f\u9012',
  ZY_DGHT: '\u5fb7\u56fd\u6d77\u6dd8\u4e4b\u5bb6',
  ZY_DYW: '\u5fb7\u8fd0\u7f51',
  ZY_EFS: 'EFS POST',
  ZY_ETD: 'ETD',
  ZY_FD: '\u98de\u789f\u5feb\u9012',
  ZY_FG: '\u98de\u9e3d\u5feb\u9012',
  ZY_FLSD: '\u98ce\u96f7\u901f\u9012',
  ZY_FX: '\u98ce\u884c\u5feb\u9012',
  ZY_FXSD: '\u98ce\u884c\u901f\u9012',
  ZY_FY: '\u98de\u6d0b\u5feb\u9012',
  ZY_HC: '\u7693\u6668\u5feb\u9012',
  ZY_HCYD: '\u7693\u6668\u4f18\u9012',
  ZY_HDB: '\u6d77\u5e26\u5b9d',
  ZY_HFMZ: '\u6c47\u4e30\u7f8e\u4e2d\u901f\u9012',
  ZY_HJSD: '\u8c6a\u6770\u901f\u9012',
  ZY_HMKD: '\u534e\u7f8e\u5feb\u9012',
  ZY_HTAO: '360hitao\u8f6c\u8fd0',
  ZY_HTCUN: '\u6d77\u6dd8\u6751',
  ZY_HTKE: '365\u6d77\u6dd8\u5ba2',
  ZY_HTONG: '\u534e\u901a\u5feb\u8fd0',
  ZY_HXKD: '\u6d77\u661f\u6865\u5feb\u9012',
  ZY_HXSY: '\u534e\u5174\u901f\u8fd0',
  ZY_HYSD: '\u6d77\u60a6\u901f\u9012',
  ZY_IHERB: 'LogisticsY',
  ZY_JA: '\u541b\u5b89\u5feb\u9012',
  ZY_JD: '\u65f6\u4ee3\u8f6c\u8fd0',
  ZY_JDKD: '\u9a8f\u8fbe\u5feb\u9012',
  ZY_JDZY: '\u9a8f\u8fbe\u8f6c\u8fd0',
  ZY_JH: '\u4e45\u79be\u5feb\u9012',
  ZY_JHT: '\u91d1\u6d77\u6dd8',
  ZY_LBZY: '\u8054\u90a6\u8f6c\u8fd0FedRoad',
  ZY_LPZ: '\u9886\u8dd1\u8005\u5feb\u9012',
  ZY_LX: '\u9f99\u8c61\u5feb\u9012',
  ZY_LZWL: '\u91cf\u5b50\u7269\u6d41',
  ZY_MBZY: '\u660e\u90a6\u8f6c\u8fd0',
  ZY_MGZY: '\u7f8e\u56fd\u8f6c\u8fd0',
  ZY_MJ: '\u7f8e\u5609\u5feb\u9012',
  ZY_MST: '\u7f8e\u901f\u901a',
  ZY_MXZY: '\u7f8e\u897f\u8f6c\u8fd0',
  ZY_MZ: '168 \u7f8e\u4e2d\u5feb\u9012',
  ZY_OEJ: '\u6b27e\u6377',
  ZY_OZF: '\u6b27\u6d32\u75af',
  ZY_OZGO: '\u6b27\u6d32GO',
  ZY_QMT: '\u5168\u7f8e\u901a',
  ZY_QQEX: 'QQ-EX',
  ZY_RDGJ: '\u6da6\u4e1c\u56fd\u9645\u5feb\u7ebf',
  ZY_RT: '\u745e\u5929\u5feb\u9012',
  ZY_RTSD: '\u745e\u5929\u901f\u9012',
  ZY_SCS: 'SCS\u56fd\u9645\u7269\u6d41',
  ZY_SDKD: '\u901f\u8fbe\u5feb\u9012',
  ZY_SFZY: '\u56db\u65b9\u8f6c\u8fd0',
  ZY_SOHO: 'SOHO\u82cf\u8c6a\u56fd\u9645',
  ZY_SONIC: 'Sonic-Ex\u901f\u9012',
  ZY_ST: '\u4e0a\u817e\u5feb\u9012',
  ZY_TCM: '\u901a\u8bda\u7f8e\u4e2d\u5feb\u9012',
  ZY_TJ: '\u5929\u9645\u5feb\u9012',
  ZY_TM: '\u5929\u9a6c\u8f6c\u8fd0',
  ZY_TN: '\u6ed5\u725b\u5feb\u9012',
  ZY_TPAK: 'TrakPak',
  ZY_TPY: '\u592a\u5e73\u6d0b\u5feb\u9012',
  ZY_TSZ: '\u5510\u4e09\u85cf\u8f6c\u8fd0',
  ZY_TTHT: '\u5929\u5929\u6d77\u6dd8',
  ZY_TWC: 'TWC\u8f6c\u8fd0\u4e16\u754c',
  ZY_TX: '\u540c\u5fc3\u5feb\u9012',
  ZY_TY: '\u5929\u7ffc\u5feb\u9012',
  ZY_TZH: '\u540c\u821f\u5feb\u9012',
  ZY_UCS: 'UCS\u5408\u4f17\u5feb\u9012',
  ZY_WDCS: '\u6587\u8fbe\u56fd\u9645DCS',
  ZY_XC: '\u661f\u8fb0\u5feb\u9012',
  ZY_XDKD: '\u8fc5\u8fbe\u5feb\u9012',
  ZY_XDSY: '\u4fe1\u8fbe\u901f\u8fd0',
  ZY_XF: '\u5148\u950b\u5feb\u9012',
  ZY_XGX: '\u65b0\u5e72\u7ebf\u5feb\u9012',
  ZY_XIYJ: '\u897f\u90ae\u5bc4',
  ZY_XJ: '\u4fe1\u6377\u8f6c\u8fd0',
  ZY_YGKD: '\u4f18\u8d2d\u5feb\u9012',
  ZY_YJSD: '\u53cb\u5bb6\u901f\u9012(UCS)',
  ZY_YPW: '\u4e91\u7554\u7f51',
  ZY_YQ: '\u4e91\u9a91\u5feb\u9012',
  ZY_YQWL: '\u4e00\u67d2\u7269\u6d41',
  ZY_YSSD: '\u4f18\u665f\u901f\u9012',
  ZY_YSW: '\u6613\u9001\u7f51',
  ZY_YTUSA: '\u8fd0\u6dd8\u7f8e\u56fd',
  ZY_ZCSD: '\u81f3\u8bda\u901f\u9012',
  ZYWL: '\u4e2d\u90ae\u7269\u6d41',
}

export default {
  data() {
    return {
      step: 0,
      // stepsText: [this.$t('trade.aftersale.414246-39'), '处理中', this.$t('trade.aftersale.414246-43'), this.$t('trade.aftersale.414246-42'), this.$t('trade.aftersale.414246-32')],
      stepsData:[{
        icon:'ec-icon-post',
        text:this.$t('trade.aftersale.414246-25'),
        // time:'2020-10-02 18:15:46'
        time:''
      },{
        icon:'ec-icon-time',
        text:this.$t('trade.aftersale.414246-26'),
        time:''
      },{
        icon:'ec-icon-deliver',
        text:this.$t('trade.aftersale.414246-27'),
        time:''
      },{
        icon:'ec-icon-vipcard',
        text:this.$t('trade.aftersale.414246-28'),
        time:''
      }],
      orderInfo: {},
      receiveData: {}, //收货人信息
      orderGoodData: {}, //商品信息
      orderTotalData: {}, //总价信息
      orderStatusText: {
        NOTPAY: this.$t('trade.aftersale.414246-29'),
        PAYED: this.$t('trade.aftersale.414246-30'),
        WAIT_BUYER_CONFIRM: this.$t('trade.aftersale.414246-31'),
        FAIL: this.$t('trade.aftersale.414246-32'),
        CANCEL: this.$t('trade.aftersale.414246-33'),
        PAYED_WAIT_PROCESS: this.$t('trade.aftersale.414246-34'),
        PAYED_PARTAIL: this.$t('trade.aftersale.414246-35'),
        CLOSED: this.$t('trade.aftersale.414246-32'),
      }, //状态字典
      // aftersalesTypeText: {
      //   ONLY_REFUND: this.$t('trade.aftersale.414246-36'),
      //   REFUND_GOODS: this.$t('trade.aftersale.414246-37'),
      //   EXCHANGING_GOODS: this.$t('trade.aftersale.414246-38'),
      //   0: '等待商家审核',
      //   1: '商家接受申请，等回寄',
      //   2: '消费者回寄，等待商家收货确认',
      //   3: '申请已驳回',
      //   4: '商家已发货',
      //   5: this.$t('trade.aftersale.414246-44'),
      //   6: this.$t('trade.aftersale.414246-58'),
      //   7: '售后关闭',
      // },
      aftersalesTypeText: {
        ONLY_REFUND: this.$t('trade.aftersale.414246-36'),
        REFUND_GOODS: this.$t('trade.aftersale.414246-37'),
        EXCHANGING_GOODS: this.$t('trade.aftersale.414246-38'),
        0: this.$t('trade.aftersale.414246-39'),
        1: this.$t('trade.aftersale.414246-40'),
        2: this.$t('trade.aftersale.414246-41'),
        3: this.$t('trade.aftersale.414246-42'),
        4: this.$t('trade.aftersale.414246-43'),
        5: this.$t('trade.aftersale.414246-44'),
        6: this.$t('trade.aftersale.414246-45'),
        7: this.$t('trade.aftersale.414246-32'),
      },
      aftersalesTypeTextContent: {
        0: this.$t('trade.aftersale.414246-46'),
        1: this.$t('trade.aftersale.414246-40'),
        2: this.$t('trade.aftersale.414246-41'),
        3: this.$t('trade.aftersale.414246-47'),
        4: this.$t('trade.aftersale.414246-48'),
        5: this.$t('trade.aftersale.414246-47'),
        6: this.$t('trade.aftersale.414246-49'),
        7: this.$t('trade.aftersale.414246-50'),
      },
      orderStatus: '',
      aftersalesInfo: {},
      dailogClose: false,
      formClose: {
        type: '',
        reason: '',
        description: '',
      },
      rulesClose: { type: [{ validate: 'required', message: this.$t('trade.aftersale.414246-51') }], reason: [{ validate: 'required', message: this.$t('trade.aftersale.414246-52') }] },
      typeData: [
        { label: this.$t('trade.aftersale.414246-36'), value: 'ONLY_REFUND' },
        { label: this.$t('trade.aftersale.414246-37'), value: 'REFUND_GOODS' },
      ],
      reasonData: [
        { label: this.$t('trade.aftersale.414246-53'), value: this.$t('trade.aftersale.414246-53') },
        { label: this.$t('trade.aftersale.414246-54'), value: this.$t('trade.aftersale.414246-54') },
        { label: this.$t('trade.aftersale.414246-55'), value: this.$t('trade.aftersale.414246-55') },
        { label: this.$t('trade.aftersale.414246-56'), value: this.$t('trade.aftersale.414246-56') },
      ],
      dialogLog: false,
      logisticsForm: {
        corp_code: '',
        logi_no: '',
      },
      logisticsRules: {
        corp_code: [{ validate: 'required', message: this.$t('trade.aftersale.414246-21'), trigger: 'change' }],
        logi_no: [{ validate: 'required', message: this.$t('trade.aftersale.414246-57'), trigger: 'blur' }],
      },
    }
  },
  computed: {},
  components: {
    smenu,
    Receive,
    OrderGood,
    AftersaleSteps
  },
  created() {
    let logisticsText = []
    Object.keys(LOGISTICS_CODE).forEach((key) => {
      logisticsText.push({
        value: key,
        label: LOGISTICS_CODE[key],
      })
    })
    this.logisticsText = logisticsText
    this.getInfo()
  },
  mounted() {},
  methods: {
    async getInfo() {
      let { orderId, itemId, aftersalesNo, type } = this.$route.query
      let obj
      if (type) {
        obj = {
          aftersales_bn: aftersalesNo,
        }
      } else {
        obj = {
          order_id: orderId,
          item_id: itemId,
          aftersales_bn: aftersalesNo,
        }
      }
      let res = await aftersalesInfo(obj)
      let { order_info, aftersales ,detail,aftersales_bn, aftersales_status, aftersales_type, create_time, description, reason, progress}=res
      this.orderGoodData = {...order_info,detail}
      let { receipt_type, receiver_address, receiver_city, receiver_district, receiver_mobile, receiver_name, receiver_state, receiver_zip, item_fee, freight_fee, total_fee, order_status_des, delivery_corp_name, delivery_code, freight_type, point_fee,discount_fee } = order_info
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
      }
  
      //   progress=3
      this.aftersalesInfo = {
        aftersales_bn,
        aftersales_status,
        aftersales_type,
        create_time,
        description,
        reason,
        progress,
      }
      // order_status_des='WAIT_BUYER_CONFIRM'
      this.orderTotalData = {
        create_time,
        item_fee,
        freight_fee,
        total_fee,
        order_status_des,
        freight_type,
        point_fee,
        discount_fee,
      }
      this.orderInfo = order_info
      this.processJudgment()    // 进度
    },
    // 进度处理事件
    processJudgment(){
      let { progress,aftersales_status,aftersales_type } = this.aftersalesInfo

      let stepTextStatus = {
        // 正常退款
        0:[{
          icon:'ec-icon-post',
          text:this.$t('trade.aftersale.414246-25'),
          // time:'2020-10-02 18:15:46'
          time:''
        },{
          icon:'ec-icon-time',
          text:this.$t('trade.aftersale.414246-26'),
          time:''
        },{
          icon:'ec-icon-vipcard',
          text:this.$t('trade.aftersale.414246-58'),//审核驳回
          time:''
        }],
        // 审核驳回
        1:[{
          icon:'ec-icon-post',
          text:this.$t('trade.aftersale.414246-25'),
          time:''
        },{
          icon:'ec-icon-time',
          text:this.$t('trade.aftersale.414246-26'),
          time:''
        },{
          icon:'ec-icon-vipcard',
          text:this.$t('trade.aftersale.414246-59'),
          time:''
        }],
        // 退款退款待寄回
        2:[{
          icon:'ec-icon-post',
          text:this.$t('trade.aftersale.414246-25'),
          time:''
        },{
          icon:'ec-icon-time',
          text:this.$t('trade.aftersale.414246-26'),
          time:''
        },{
          icon:'ec-icon-deliver',
          text:this.$t('trade.aftersale.414246-27'),
          time:''
        },{
          icon:'ec-icon-vipcard',
          text:this.$t('trade.aftersale.414246-28'),
          time:''
        }],
        // 退款退款已寄回之后驳回
        3:[{
          icon:'ec-icon-post',
          text:this.$t('trade.aftersale.414246-25'),
          time:''
        },{
          icon:'ec-icon-time',
          text:this.$t('trade.aftersale.414246-26'),
          time:''
        },{
          icon:'ec-icon-deliver',
          text:this.$t('trade.aftersale.414246-27'),
          time:''
        },{
          icon:'ec-icon-vipcard',
          text:this.$t('trade.aftersale.414246-44'),
          time:''
        }],
        // 用户撤销或关闭
        4:[{
          icon:'ec-icon-post',
          text:this.$t('trade.aftersale.414246-25'),
          time:''
        },{
          icon:'ec-icon-time',
          text:this.$t('trade.aftersale.414246-60'),
          time:''
        }]
      }
      /* ------------progress字段说明：-------------
        0 等待商家处理
        1 商家接受申请，等待消费者回寄
        2 消费者回寄，等待商家收货确认
        8 商家确认收货，等待审核退款
        3 已驳回
        4 已处理
        7 已撤销。已关闭
        9 退款处理中
        5 退款驳回
        6 退款完成
      */
      // 判断售后流程
      if(progress == 3){   // 驳回订单
        this.stepsData = stepTextStatus[1]
      }else if(progress == 5){
        this.stepsData = stepTextStatus[3]
      }else if(progress == 7){
        this.stepsData = stepTextStatus[4]
      }else if(aftersales_type == 'ONLY_REFUND'){     // ONLY_REFUND: this.$t('trade.aftersale.414246-36'),
        this.stepsData = stepTextStatus[0]
      }else if(aftersales_type == 'REFUND_GOODS'){    // REFUND_GOODS: this.$t('trade.aftersale.414246-37'),
        this.stepsData = stepTextStatus[2]
      }

      let aftersales_progress = 0
      // 判断进度
      if(progress<2){
        aftersales_progress = aftersales_status+1
      }else if(progress==2 || progress == 3 || (progress==6&&aftersales_type=='ONLY_REFUND') || progress == 7){
        aftersales_progress = 3
      }else if(progress==5 || progress == 4 || (progress==6&&aftersales_type=='REFUND_GOODS')){
        aftersales_progress = 4
      }
      this.aftersalesInfo.aftersales_progress = aftersales_progress
    },
    clickBtn(type) {
      switch (type) {
        case this.$t('trade.aftersale.414246-19'):
          this.dailogClose = false
          break
        case this.$t('trade.aftersale.414246-61'):
          let formClose = JSON.parse(JSON.stringify(this.aftersalesInfo))
          formClose.type = formClose.aftersales_type
          this.formClose = formClose
          this.dailogClose = true
          break
        case this.$t('trade.aftersale.414246-8'):
          this.dialogLog = true
          break

        case this.$t('trade.aftersale.414246-7'):
          this.$Modal.confirm({
            title: this.$t('trade.aftersale.414246-62'),
            content: '<p>请确认是否撤销?</p>',
            onOk: async () => {
              await closeAftersales({ aftersales_bn: this.aftersalesInfo.aftersales_bn })
              this.getInfo()
            },
            onCancel: () => {},
          })

          break
        case this.$t('trade.aftersale.414246-17'):
          {
            this.$refs['formClose'].validate((valid, errors) => {
              if (valid) {
                let params = {
                  order_id: this.orderGoodData.order_id,
                  detail: this.orderGoodData.detail,
                  distributor_id: this.orderGoodData.distributor_id,
                  aftersales_type: this.formClose.type,
                  reason: this.formClose.reason,
                  description: this.formClose.description,
                }
                if (this.aftersalesInfo.progress == 0) {
                  params.aftersales_bn = this.aftersalesInfo.aftersales_bn
                  editAftersales(params).then(() => {
                    this.$Message.success(this.$t('trade.aftersale.414246-64'))
                    Object.assign(this.$data, this.$options.data())
                    this.getInfo()
                  })
                } else {
                  params.return_type = this.formClose.type=="REFUND_GOODS"? "logistics": ""
                  creatAftersales(params).then(() => {
                    this.$Message.success(this.$t('trade.aftersale.414246-65'))
                    this.getInfo()
                  })
                }
              }
            })
          }
          break
        case this.$t('trade.aftersale.414246-24'):
          {
            // console.log(this.$refs['logisticsForm'],this.$refs['logisticsForm'].validate(),"this.$refs['formClose'].validate")

            this.$refs['logisticsForm'].validate((valid, errors) => {
              if (valid) {
                let params = {
                  aftersales_bn: this.aftersalesInfo.aftersales_bn,
                  logi_no: this.logisticsForm.logi_no,
                  corp_code: this.logisticsForm.corp_code,
                }
                sendbackAftersales(params).then((res) => {
                  this.$Message.success(this.$t('trade.aftersale.414246-66'))
                  this.getInfo()
                  Object.assign(this.$data, this.$options.data())
                  
                })
              }
            })
          }
          //   this.dialogLog = false
          break
      }
    },
    clickToList(){
      this.$router.go(-1)
    }
  },
}
</script>
