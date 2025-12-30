/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$finish-success-color: rgba(87, 184, 70, 1);
$finish-fail-color: #e23038;

.page-trade-status {
  padding: 20px;
  margin-bottom: 0;
  .trade-status {
    &__title {
      height: 18px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 18px;
    }
    &__content {
      color: #212322;
      font-size: 16px;
      p {
        margin: 0 0 18px;
      }
    }
    &__info {
      font-size: $font-size;
      margin: 0 0 18px;
    }
    &__actions {
      .sp-btn {
        width: 120px;
        margin-right: 15px;
      }
    }
  }

  .container-finish-success {
    background: #ffffff;
    box-shadow: 0px 1px 16px 0px #dddddd;
    padding: 21px 20px;
    display: flex;

    .ec-icon2-chenggong {
      font-size: 40px;
      color: $finish-success-color;
      margin-right: 9px;
    }

    .ec-icon2-shibai {
      font-size: 40px;
      color: $finish-fail-color;
      margin-right: 9px;
    }

    .content-right-wrapper {
      flex: 1;

      .trade-status__title {
        margin-top: 12px;
        margin-bottom: 35px;
        position: relative;

        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #dddddd;
          position: absolute;
          bottom: -35px;
        }
      }

      .trade-status__content {
        padding-top: 19px;
        .trade-status__orderinfo {
          font-size: 12px;
          margin-bottom: 26px;
          .no {
            line-height: 12px;
            margin-bottom: 12px;
          }
          .money {
            line-height: 12px;
          }
        }
      }

      .trade-status__actions {
        font-size: 14px;
        display: flex;

        .view {
          margin-right: 6px;
          position: relative;
          color: rgba(0, 125, 230, 1);
          cursor: pointer;

          &:after {
            content: '';
            display: block;
            position: absolute;
            right: 1px;
            height: 12px;
            width: 1px;
            background: #dddddd;
            bottom: 3px;
            right: -7px;
          }
        }
        .continue {
          color: rgba(0, 125, 230, 1);
          cursor: pointer;
          margin-left: 7px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="page-trade-status page-body">
    <div class="container container-finish-success" v-if="!tradeInfo">
      <SpLoading class="modal-loading__t">{{ $t('finish.result.595530-0') }}</SpLoading>
    </div>
    <div class="container container-finish-success" v-else>
      <div
        v-if="!isOfflinePay"
        :class="{
          'ec-icon2': true,
          'ec-icon2-chenggong': tradeState === 1,
          'ec-icon2-shibai': tradeState === 0
        }"
      ></div>
      <div class="content-right-wrapper">
        <div class="trade-status__title">
          <template v-if="!isOfflinePay">
            {{ $t('finish.result.595530-1') }}{{ tradeState === 1 ? $t('finish.result.595530-2') : $t('finish.result.595530-3') }}{{ $t('finish.result.595530-4') }}
          </template>
          <template v-if="isOfflinePay">
            {{
              offlinePayCheckStatus == 0 ?
              $t('finish.result.595530-5') :
              `${ $t('finish.result.595530-1')}${ tradeState === 1 ? $t('finish.result.595530-2') : $t('finish.result.595530-3') } ${ $t('finish.result.595530-4') }`
            }}
          </template>
        </div>
        <div class="trade-status__content">
          <div class="trade-status__orderinfo">
            <div class="no">{{ $t('finish.result.595530-7') }}{{ orderId }}</div>
            <div class="money">{{ $t('finish.result.595530-8') }} {{ totalFee | formatPriceToHundred }}</div>
          </div>
        </div>
        <div class="trade-status__actions">
          <div class="view" @click="handleNavigate(`/member/trade/`, 'view')">
            {{ $t('finish.result.595530-9') }}
          </div>
          <div class="continue" @click="handleNavigate('/', 'continue')">
            {{ $t('finish.result.595530-10') }}
          </div>
        </div>
      </div>
    </div>
    <!-- <GuessLike :guessLikeList="guessLikeList" /> -->
  </div>
</template>

<script>
import Recommend from './../items/comps/recommend'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'
import { getOrderInfo } from '@/api/member'
import GuessLike from '../pointitems/comps/guess-like'

export default {
  components: { Recommend, GuessLike },
  created() {
    this.setRouteParams()
  },
  mounted() {
    console.log('mounted')
    this.fetch()
  },
  data() {
    return {
      tradeInfo: null,
      //-1 未知 0 失败 1 成功
      tradeState: -1,
      orderId: undefined,
      //1 普通商品 2 积分商品
      orderClass: 1,
      totalFee: 0,
      guessLikeList: [],
      isOfflinePay: false,
      offlinePayCheckStatus: null
    }
  },
  methods: {
    fetchLikeList() {
      this.$api.item
        .getGuessLikeGoods({
          item_id: id
        })
        .then((info) => {
          const { list, total_count, brand_list } = info
          list.map((item) => {
            item.imgUrl = ''
            if (item.pics.length > 0) {
              item.imgUrl = item.pics[0]
            }
          })
          this.guessLikeList = [...this.guessLikeList, ...list]
          this.total = parseInt(total_count)
          if (brand_list && brand_list.total_count > 0) {
            brand_list.list.map((item) => {
              item.selected = false
            })
            this.brand_list = brand_list.list
          }
        })
    },
    handleNavigate(to, type) {
      let path
      if (!this.orderId) {
        this.$Message.error(this.$t('finish.result.595530-11'))
      }
      if (type === 'view') {
        path = to + this.orderId
        this.$router.push(path)
      } else {
        if (this.orderClass === 1) {
          path = to + 'items'
          this.$router.push(path)
        } else {
          path = to + 'pointitems'
          this.$router.push(path)
        }
      }
    },
    async fetch() {
      const { order_id } = this.$route.query
      const { orderInfo, tradeInfo } = await getOrderInfo({ id: order_id })
      const { order_class } = orderInfo
      const { tradeState, orderId } = tradeInfo
      this.tradeState = tradeState === 'SUCCESS' ? 1 : 0
      this.orderId = orderId
      this.tradeInfo = tradeInfo
      this.orderClass = order_class === 'normal' ? 1 : 2
      this.isOfflinePay = orderInfo.pay_type == 'offline_pay'
      this.offlinePayCheckStatus = orderInfo.offline_pay_check_status
    },
    setRouteParams() {
      const { order_id, order_class, total_fee, pay_status } = this.$route.query
      this.orderId = order_id
      this.tradeState = pay_status === 'PAYED' ? 1 : 0
      this.orderClass = order_class === 'normal' ? 1 : 2
      this.totalFee = total_fee
    },
    handleChangeSearch(val) {
      console.log(val)
    }
  }
}
</script>
