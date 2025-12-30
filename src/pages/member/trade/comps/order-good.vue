/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="order-good">
    <h4>{{ $t('comps.order-good.196783-0') }}</h4>
    <table class="table">
      <colgroup>
        <col name="table-goods-pic" style="width: 85px" />
      </colgroup>
      <thead>
        <tr>
          <td colspan="2">{{ $t('comps.order-good.196783-1') }}</td>
          <!-- <td>单价(元)</td> -->
          <td colspan="1">{{ $t('comps.order-good.196783-2') }}</td>
          <!-- 动态判断colspan否则ui会空出一块 -->
          <td :colspan="!aftersale?'1':'2'">{{ $t('comps.order-good.196783-3') }}</td>
          <td colspan="2" style="text-align: center" v-if="!aftersale">{{ $t('comps.order-good.196783-4') }}</td>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-for="(item,index) in orderGoodData.detail" :key="index">
            <td>
              <div class="table-goods-pic">
                <SpImg style="width: 65px; height: 65px" :src="item.pic || item.item_pic" no-size />
              </div>
            </td>
            <td>
              <p class="">{{ item.item_name }}</p>
              <p>{{ item.item_spec_desc }}</p>
              <p class="giftTag" v-if="item.order_item_type == 'gift'"> {{ $t('comps.order-good.196783-5') }}</p>
            </td>
            <!-- <td>￥{{item.price|formatPriceToHundred}}</td> -->
            <td>{{ item.num }}</td>
            <td>
              <span v-if="orderGoodData.order_class != 'pointsmall'&& !item.aftersales_bn"
                >￥{{ item.item_fee | formatPriceToHundred }}</span
              >
              <span v-else-if="orderGoodData.order_class != 'pointsmall' && item.aftersales_bn"
                >￥{{ item.orderItem.item_fee | formatPriceToHundred }}</span
              >
              <span v-else> {{ item.point }} {{ $t('comps.order-good.196783-6') }} </span>
            </td>
            <td
              style="text-align:center"
            >
              <button
                class="btn btn-primary"
                v-if="
                  orderGoodData.can_apply_aftersales == 1 &&
                    orderGoodData.order_class != 'pointsmall'
                "
                @click="clickBtn($t('comps.order-good.196783-7'), item)"
                size="small"
              >
                {{ $t('comps.order-good.196783-7') }}
              </button>
              <div
                v-if="
                  orderTotalData.order_status_des === 'WAIT_BUYER_CONFIRM' &&
                    !aftersale &&
                    orderGoodData.order_class != 'pointsmall'
                "
                style="text-align: center"
              >
                <!--  -->

                <button
                  class="btn btn-primary"
                  v-if="item.aftersales_status"
                  @click="clickBtn($t('comps.order-good.196783-8'), item)"
                  size="small"
                >
                  {{ $t('comps.order-good.196783-8') }}
                </button>
              </div>
              <!--<div class="ly-fn-a" @click="clickBtn($t('comps.order-good.196783-36'),item)" v-if="(orderTotalData.order_status_des == 'SUCCESS' || orderTotalData.order_status_des == 'DONE')&&!item.is_rate">{{ $t('comps.order-good.196783-36') }}</div> -->
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="order-total clearfix">
      <div class="orderdtl-box-right">
        <div class="text">
          <span class="text-right">{{ $t('comps.order-good.196783-9') }}</span>
          <span>{{ orderTotalData.create_time | parseTime }}</span>
        </div>
        <div class="text">
          <span class="text-right">{{ $t('comps.order-good.196783-10') }}</span>
          <span v-if="orderGoodData.order_class != 'pointsmall'"
            >￥{{ orderTotalData.item_fee | formatPriceToHundred }}</span
          >
          <span v-else>{{ orderTotalData.point }} {{ $t('comps.order-good.196783-6') }}</span>
        </div>
        <div class="text">
          <span class="text-right">{{ $t('comps.order-good.196783-11') }}</span>
          <span class="col-lg-2" v-if="orderTotalData.freight_type == 'cash'"
            >￥{{ orderTotalData.freight_fee | formatPriceToHundred }}</span
          >
          <span class="col-lg-2" v-else>{{ `${orderTotalData.freight_fee} ${$t('comps.order-good.196783-6')}` }}</span>
        </div>
        <div class="text" v-if="orderGoodData.order_class != 'pointsmall'">
          <span class="text-right">{{ $t('comps.order-good.196783-13') }}</span>
          <span class="col-lg-2">￥{{ orderTotalData.discount_fee | formatPriceToHundred }}</span>
        </div>
        <div class="text" v-if="orderGoodData.order_class != 'pointsmall'">
          <span class="text-right">{{ $t('comps.order-good.196783-14') }}</span>
          <span class="col-lg-2">￥{{ orderTotalData.point_fee/100}}</span>
        </div>
        <div class="text-total">
          <span class="text-right">{{ $t('comps.order-good.196783-15') }}</span>
          <span class="ly-text-red" v-if="orderGoodData.order_class != 'pointsmall'"
            >￥{{ orderTotalData.total_fee | formatPriceToHundred }}</span
          >
          <span class="ly-text-red" v-else
            ><h6 class="ly-text-red">{{ orderTotalData.point }} {{ $t('comps.order-good.196783-6') }}</h6>
            <h6 v-if="orderTotalData.total_fee != 0" class="ly-text-red">
              +￥{{ orderTotalData.total_fee | formatPriceToHundred }}
            </h6></span
          >
        </div>
      </div>
    </div>
    <SpModal v-model="dailogClose" :height="320" :width="520">
      <div class="dailog dailog-close">
        <div class="dailog-hd">{{ $t('comps.order-good.196783-8') }}</div>
        <div class="dailog-bd">
          <!-- <span>订单号：{{this.$route.params.id}}</span> -->
          <div>
            <SpForm ref="form" :model="form" :rules="rules">
              <SpFormItem prop="num" v-if="selectItem.num != 1">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('comps.order-good.196783-16') }}</span>
                <SpNumInput
                  style="width: 350px"
                  v-model="form.num"
                  :min="1"
                  :max="selectItem.num"
                  :placeholder="$t('comps.order-good.196783-17')"
                ></SpNumInput>
              </SpFormItem>
              <SpFormItem prop="type">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('comps.order-good.196783-18') }}</span>
                <SpSelect
                  style="width: 350px"
                  :data="typeData"
                  v-model="form.type"
                  :placeholder="$t('comps.order-good.196783-19')"
                ></SpSelect>
              </SpFormItem>
              <SpFormItem prop="reason">
                <span style="display: inline-block; width: 90px; text-align: right">{{ $t('comps.order-good.196783-20') }}</span>
                <SpSelect
                  style="width: 350px"
                  :data="reasonData"
                  v-model="form.reason"
                  :placeholder="$t('comps.order-good.196783-21')"
                ></SpSelect>
              </SpFormItem>
              <SpFormItem prop="description">
                <span style="display: inline-block; width: 90px; text-align: right"
                  >{{ $t('comps.order-good.196783-22') }}</span
                >
                <SpInput
                  style="width: 350px"
                  v-model="form.description"
                  :placeholder="$t('comps.order-good.196783-23')"
                />
              </SpFormItem>
            </SpForm>
          </div>
        </div>
        <div class="dailog-ft">
          <button class="btn btn-primary" @click="clickBtn($t('comps.order-good.196783-24'))">{{ $t('comps.order-good.196783-25') }}</button>
          <button class="btn" @click="clickBtn($t('comps.order-good.196783-26'))">{{ $t('comps.order-good.196783-26') }}</button>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { creatAftersales } from '@/api/member'

export default {
  props: {
    orderGoodData: {
      type: Object,
      default: () => {}
    },
    orderTotalData: {
      type: Object,
      default: () => {}
    },
    aftersale: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dailogClose: false,
      form: {
        num: 1,
        type: '',
        reason: '',
        description: ''
      },
      rules: {
        type: [{ validate: 'required', message: this.$t('comps.order-good.196783-27') }],
        reason: [{ validate: 'required', message: this.$t('comps.order-good.196783-28') }]
      },
      typeData: [
        { label: this.$t('comps.order-good.196783-29'), value: 'ONLY_REFUND' },
        { label: this.$t('comps.order-good.196783-30'), value: 'REFUND_GOODS' }
      ],
      reasonData: [
        { label: this.$t('comps.order-good.196783-31'), value: this.$t('comps.order-good.196783-31') },
        { label: this.$t('comps.order-good.196783-32'), value: this.$t('comps.order-good.196783-32') },
        { label: this.$t('comps.order-good.196783-33'), value: this.$t('comps.order-good.196783-33') },
        { label: this.$t('comps.order-good.196783-34'), value: this.$t('comps.order-good.196783-34') }
      ],
      selectItem: {}
    }
  },

  methods: {
    async reasonList(){
      let list = await this.$api.trade.reasonList()
      if(list.length > 0){
        this.reasonData = []
        list.map(ele=>{
          this.reasonData.push({
            label: ele,
            value: ele
          })
        })
      }
    },
    clickBtn(type, item) {
      switch (type) {
        case this.$t('comps.order-good.196783-7'):
          this.selectItem = item
          this.dailogClose = true
          this.reasonList()
          break
        case this.$t('comps.order-good.196783-8'):
          this.$router.push(
            `/member/trade/aftersale?orderId=${item.order_id}&itemId=${item.item_id}`
          )
          break
        case this.$t('comps.order-good.196783-24'):
          this.$refs['form'].validate((valid, errors) => {
            if (valid) {
              let arr = JSON.stringify([{ id: this.selectItem.id, num: this.form.num }])
              let params = {
                order_id: this.selectItem.order_id,
                detail: arr,
                // item_id: this.selectItem.item_id,
                distributor_id: this.selectItem.distributor_id,
                aftersales_type: this.form.type,
                reason: this.form.reason,
                description: this.form.description
              }
              params.return_type = this.form.type=="REFUND_GOODS"? "logistics": ""
              creatAftersales(params).then(() => {
                this.$Message.success(this.$t('comps.order-good.196783-35'))
                this.$emit('change')
                Object.assign(this.$data, this.$options.data())
              })
            }
          })
          break
        case this.$t('comps.order-good.196783-26'):
          this.dailogClose = false
          break
        case this.$t('comps.order-good.196783-36'):
          this.$router.push(
            `/member/trade/rate?id=${item.order_id}&order_class=${this.orderTotalData.order_class}`
          )
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ly-fn-a {
  text-align: center;
}
.order-good {
  padding: 0 10px;
  h4 {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .table {
    margin-top: 10px;
    width: 100%;
    border: 1px solid $color-border-gray-light;
    border-spacing: 0;
    border-collapse: collapse;

    thead {
      background: #f5f5f5;
      height: 30px;

      line-height: 30px;
      color: #666666;
      border-bottom: 1px solid #efefef;
      td {
        padding: 0 10px;
      }
    }
    tbody {
      tr {
        border: 1px solid $color-border-gray-light;
      }
      td {
        padding: 10px;
        .giftTag{
          width: 32px;
          background: rgb(71, 158, 233);
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .order-total {
    padding: 30px 0 10px 0;
    .orderdtl-box-right {
      float: right;
      text-align: center;
      span {
        display: inline-block;
        width: 140px;
        text-align: left;
      }
      .text-right {
        display: inline-block;
        width: 150px;
        text-align: right;
      }
      .text-total {
        & > span {
          vertical-align: top;
          h6 {
            display: inline-block;
          }
        }
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

  .btn {
    background-color: #fff;
    cursor: pointer;
    border-radius: 3px;
    height: 32px;
    width: 70px;
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
}
</style>
