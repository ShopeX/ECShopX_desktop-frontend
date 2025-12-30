/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="page-order page-body container-member">
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="order" active="trade"></smenu>
      </div>
      <div class="member-content-right">
        <div class="member-content-right-list-header">
          {{ $t('trade.index-ol.632202-0') }}
          <!-- <span style="display:inline-block;width:350px">商品</span>
          <span style="display:inline-block;width:85px">单价</span>
          <span style="display:inline-block;width:80px">数量</span>
          <span style="display:inline-block;width:100px">商品操作</span>
          <span style="display:inline-block;width:90px">订单总金额</span>
          <span style="display:inline-block;width:100px">交易订单状态</span>
          <span style="display:inline-block;width:65px">操作</span> -->
        </div>
        <div class="member-content-right-list-body">
          <div class="tabs-status">
            <template >
              <div v-for="(tab,index) in tabs" :key="index" class="tab" @click="handelClick(tab.value)" :class="{ active: tab.value == status }">
                {{ tab.label }}
              </div>
            </template>
          </div>

          <div class="member-content-right-list-body-content">
            <div class="list-table">
              <template>
                <table class="table-body">
                  <colgroup>
                    <col class="number-col" />
                    <col class="consignee-col" />
                    <col class="amount-col" />
                    <col class="status-col" />
                    <col class="operate-col" />
                  </colgroup>
                  <colgroup>
                    <col name="product-img" style="width: 90px" />
                    <col name="product-name-warp" style="width: 270px" />
                    <col name="product-price-warp" style="width: 85px" />
                    <col name="product-status-warp" style="width: 100px; text-align: center" />
                    <col name="product-ctrl-warp" style="width: 90px" />
                    <col name="product-num-warp" style="width: 89px" />
                    <col name="product-price-warp" style="width: 110px" />
                  </colgroup>
                  <tbody v-for="child in list">
                    <template v-for="(item, index) in child.children">
                      <div class="list-table-header">
                        <span>{{ child.date }}</span>
                        {{ $t('trade.index-ol.632202-1') }}
                        <span class="ly-fn-a" @click.stop="clickLink(child.order)">{{
                          child.order
                        }}</span>
                      </div>
                      <tr class="table__row">
                        <td rowspan="1" colspan="1" class="product-img">
                          <SpImg style="width: 70px; height: 70px" :src="item.pic" no-size />
                        </td>
                        <td rowspan="1" colspan="1" class="product-name-warp">
                          <div class="product-name">
                            <div class="ly-fn-a" @click="clickGoodsName(item)">
                              <!-- <span class="order-tag">团购</span> -->
                              {{ item.item_name }}
                            </div>
                            <div>{{ item.item_spec_desc }}</div>
                          </div>
                        </td>
                        <td rowspan="1" colspan="1" class="product-price-warp">
                          <div class="product-price">￥{{ item.price | formatPriceToHundred }}</div>
                        </td>
                        <td rowspan="1" colspan="1" class="product-num-warp">
                          <div class="product-num">{{ item.num }}</div>
                        </td>
                        <td
                          rowspan="1"
                          colspan="1"
                          class="product-ctrl-warp"
                          style="border-right: 1px solid #e5e5e5"
                        >
                          <div
                            v-if="child.orderStatus === 'WAIT_BUYER_CONFIRM'"
                            style="text-align: center"
                          >
                            <!--  -->
                            <span
                              class="ly-fn-a"
                              @click="clickBtn($t('trade.index-ol.632202-2'), item)"
                              v-if="!item.aftersales_status"
                              >{{ $t('trade.index-ol.632202-2') }}</span
                            >
                            <span
                              class="ly-fn-a"
                              v-if="item.aftersales_status"
                              @click="clickBtn($t('trade.index-ol.632202-3'), item)"
                              >{{ $t('trade.index-ol.632202-3') }}</span
                            >
                          </div>
                        </td>
                        <td
                          v-if="index == 0"
                          :rowspan="child.children.length || 2"
                          colspan="1"
                          class="product-price-warp"
                        >
                          <span class="product-price"
                            >￥{{ child.total_fee | formatPriceToHundred }}</span
                          >
                        </td>
                        <td
                          :rowspan="child.children.length || 2"
                          v-if="index == 0"
                          colspan="1"
                          class="product-status-warp"
                        >
                          <div class="product-status" style="text-align: center">
                            {{ orderStatusText[child.orderStatus] }}
                          </div>
                          <div
                            class="ly-fn-a"
                            @click="clickLink(child.order)"
                            style="text-align: center"
                          >
                            {{ $t('trade.index-ol.632202-4') }}
                          </div>
                        </td>

                        <td
                          :rowspan="child.children.length || 2"
                          v-if="index == 0"
                          colspan="1"
                          class="product-ctrl-warp"
                        >
                          <div class="product-ctrl">
                            <!-- <div>等待卖家发货</div> -->
                            <div
                              class="ly-fn-a btn"
                              @click="clickBtn($t('trade.index-ol.632202-5'), child)"
                              v-if="child.orderStatus == 'NOTPAY'"
                            >
                              {{ $t('trade.index-ol.632202-5') }}
                            </div>
                            <div
                              class="ly-fn-a"
                              @click="clickBtn($t('trade.index-ol.632202-6'), child)"
                              v-if="child.orderStatus == 'WAIT_BUYER_CONFIRM'"
                            >
                              {{ $t('trade.index-ol.632202-6') }}
                            </div>
                            <!-- <div
                              class="ly-fn-a"
                              @click="clickBtn($t('trade.index-ol.632202-7'),child)"
                              v-if="child.orderStatus == 'WAIT_BUYER_CONFIRM' || child.orderStatus == 'DONE' || child.orderStatus == 'SUCCESS'"
                            >{{ $t('trade.index-ol.632202-7') }}</div> -->
                            <div
                              class="ly-fn-a"
                              @click="clickBtn($t('trade.index-ol.632202-7'), child)"
                              v-if="child.orderStatus == 'SUCCESS' || child.orderStatus == 'DONE'"
                            >
                              {{ $t('trade.index-ol.632202-8') }}
                            </div>
                            <div
                              class="ly-fn-a"
                              @click="clickBtn($t('trade.index-ol.632202-9'), child)"
                              v-if="child.orderStatus == 'NOTPAY' || child.orderStatus == 'PAYED'"
                            >
                              {{ $t('trade.index-ol.632202-9') }}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </template>
            </div>
          </div>
        </div>
        <SpModal v-model="dailogCancel" :height="200" :width="450">
          <div class="dailog dailog-cancel">
            <div class="dailog-hd">{{ $t('trade.index-ol.632202-9') }}</div>
            <div class="dailog-bd">
              <span>{{ $t('trade.index-ol.632202-10') }}{{ selectItem.order }}</span>
              <div style="padding-top: 20px">
                <!-- <span style="display:inline-block;width:100px;text-align:right">{{ $t('trade.index-ol.632202-11') }}</span>
                <SpInput :placeholder="$t('trade.index-ol.632202-12')" v-model="cancelMean" class="dailog-bd-input" />-->
                <SpForm ref="form" :model="form" :rules="rules">
                  <SpFormItem prop="cancelMean">
                    <span style="display: inline-block; width: 80px; text-align: right"
                      >{{ $t('trade.index-ol.632202-11') }}</span
                    >
                    <SpInput
                      class="dailog-bd-input"
                      v-model="form.cancelMean"
                      :placeholder="$t('trade.index-ol.632202-12')"
                    />
                  </SpFormItem>
                </SpForm>
              </div>
            </div>

            <div class="dailog-ft">
              <button class="btn btn-primary" @click="clickBtn($t('trade.index-ol.632202-13'))">{{ $t('trade.index-ol.632202-14') }}</button>
              <button class="btn" @click="clickBtn($t('trade.index-ol.632202-15'))">{{ $t('trade.index-ol.632202-16') }}</button>
            </div>
          </div>
        </SpModal>
        <SpModal v-model="dailogClose" :height="320" :width="520">
          <div class="dailog dailog-close">
            <div class="dailog-hd">{{ $t('trade.index-ol.632202-3') }}</div>
            <div class="dailog-bd">
              <!-- <span>{{ $t('trade.index-ol.632202-10') }}{{this.$route.params.id}}</span> -->
              <div>
                <SpForm ref="formClose" :model="formClose" :rules="rulesClose">
                  <SpFormItem prop="type">
                    <span style="display: inline-block; width: 90px; text-align: right"
                      >{{ $t('trade.index-ol.632202-17') }}</span
                    >
                    <SpSelect
                      style="width: 350px"
                      :data="typeData"
                      v-model="formClose.type"
                      :placeholder="$t('trade.index-ol.632202-18')"
                    ></SpSelect>
                  </SpFormItem>
                  <SpFormItem prop="reason">
                    <span style="display: inline-block; width: 90px; text-align: right"
                      >{{ $t('trade.index-ol.632202-19') }}</span
                    >
                    <SpSelect
                      style="width: 350px"
                      :data="reasonData"
                      v-model="formClose.reason"
                      :placeholder="$t('trade.index-ol.632202-20')"
                    ></SpSelect>
                  </SpFormItem>
                  <SpFormItem prop="description">
                    <span style="display: inline-block; width: 90px; text-align: right"
                      >{{ $t('trade.index-ol.632202-21') }}</span
                    >
                    <SpInput
                      style="width: 350px"
                      v-model="formClose.description"
                      :placeholder="$t('trade.index-ol.632202-22')"
                    />
                  </SpFormItem>
                </SpForm>
              </div>
            </div>
            <div class="dailog-ft">
              <button class="btn btn-primary" @click="clickBtn($t('trade.index-ol.632202-23'))">{{ $t('trade.index-ol.632202-24') }}</button>
              <button class="btn" @click="clickBtn($t('trade.index-ol.632202-15'))">{{ $t('trade.index-ol.632202-15') }}</button>
            </div>
          </div>
        </SpModal>
        <template>
          <div style="width: 300px; margin: 50px auto">
            <Tips v-if="list.length == 0" :tips="$t('trade.index-ol.632202-25')" />
          </div>
        </template>
        <div>
          <SpPagination
            :total="page.total"
            :pageSize="page.pageSize"
            :current="page.page"
            @on-change="changePage"
            :maxPage="5"
          />
        </div>
        <SpModal :title="$t('trade.index-ol.632202-26')" v-model="dialogLogistics" :height="320" :width="520">
          <div class="dailog">
            <div class="dailog-hd">{{ $t('trade.index-ol.632202-26') }}</div>
            <div class="dailog-bd" style="padding-right: 0">
              <Logistics :id="selectItem.order" :height="240"></Logistics>
            </div>
          </div>
        </SpModal>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from './comps/order-item'
import smenu from './../comps/smenu'
import Tips from '../comps/tips'
import { mapState } from 'vuex'
import page from '@/mixins/page'
import Logistics from '@/pages/member/comps/logistics'
import { orderCancel, creatAftersales, confirmOrder, aftersaleList } from '@/api/member'

// let cache = false

export default {
  // middleware: 'authenticated',
  // beforeRouteEnter (to, from, next) {
  //   if (
  //     from.matched.length > 0 &&
  //     (from.matched[0].path === '/trade/:id' ||
  //       from.matched[0].path === '/aftersales' ||
  //       from.matched[0].path === '/aftersales/:id' ||
  //       from.matched[0].path === '/items/:id' ||
  //       from.matched[0].path === '/aftersales/apply-refund')
  //   ) {
  //     cache = true
  //   } else {
  //     cache = false
  //   }
  //   next()
  // },
  // mixins: [page],
  data() {
    return {
      tabs: [
        { label: this.$t('trade.index-ol.632202-27'), value: '0' },
        { label: this.$t('trade.index-ol.632202-28'), value: '5' },
        { label: this.$t('trade.index-ol.632202-29'), value: '6' },
        { label: this.$t('trade.index-ol.632202-30'), value: '1' },
        { label: this.$t('trade.index-ol.632202-31'), value: '3' }
        // { label: this.$t('trade.index-ol.632202-3'), value: '10' },
        // { label: '已完成', value: '11' },
      ],
      list: [],
      logisticsList: [],
      intervalTime: '',
      loading: true,
      name: '',
      page: {
        pageSize: 20,
        page: 1,
        total: 0
      },
      orderStatusText: {
        NOTPAY: this.$t('trade.index-ol.632202-32'),
        PAYED: this.$t('trade.index-ol.632202-33'),
        WAIT_BUYER_CONFIRM: this.$t('trade.index-ol.632202-34'),
        FAIL: this.$t('trade.index-ol.632202-35'),
        CLOSED: this.$t('trade.index-ol.632202-35'),
        CANCEL: this.$t('trade.index-ol.632202-36'),
        PAYED_WAIT_PROCESS: this.$t('trade.index-ol.632202-37'),
        PAYED_PARTAIL: this.$t('trade.index-ol.632202-38'),
        SUCCESS: this.$t('trade.index-ol.632202-39'),
        DONE: this.$t('trade.index-ol.632202-39')
      },
      dailogCancel: false,
      selectItem: {},
      form: { cancelMean: '' },
      rules: {
        cancelMean: [{ validate: 'required', message: this.$t('trade.index-ol.632202-40') }]
      },
      dailogClose: false,
      formClose: {
        type: '',
        reason: '',
        description: ''
      },
      rulesClose: {
        type: [{ validate: 'required', message: this.$t('trade.index-ol.632202-41') }],
        reason: [{ validate: 'required', message: this.$t('trade.index-ol.632202-42') }]
      },
      typeData: [
        { label: this.$t('trade.index-ol.632202-43'), value: 'ONLY_REFUND' },
        { label: this.$t('trade.index-ol.632202-44'), value: 'REFUND_GOODS' }
      ],
      reasonData: [
        { label: this.$t('trade.index-ol.632202-45'), value: this.$t('trade.index-ol.632202-45') },
        { label: this.$t('trade.index-ol.632202-46'), value: this.$t('trade.index-ol.632202-46') },
        { label: this.$t('trade.index-ol.632202-47'), value: this.$t('trade.index-ol.632202-47') },
        { label: this.$t('trade.index-ol.632202-48'), value: this.$t('trade.index-ol.632202-48') }
      ],
      selectItemClose: {},
      dialogLogistics: false,
      status: '0'
    }
  },
  components: { smenu, OrderItem, Tips, Logistics },
  computed: mapState({
    // tradeCache: state => state.tradeCache,
    // position: state => state.position,
    userInfo: (state) => state.user.userInfo,
    orderType: function() {
      return this.$route.query.type || ''
    }
  }),
  watch: {
    orderType: function() {
      // this.refresh()
    }
  },
  mounted() {
    // this.refresh()
    // this.getLogisticsList()
    this.getTradeList()
  },
  methods: {
    async getTradeList() {
      this.loading = true
      let params = {
        pageSize: this.page.pageSize,
        page: this.page.page,
        order_type: 'normal',
        status: this.status
      }
      let { list, pager } = await this.$api.trade.list(params)
      // list.push(list[0])
      list = list.map((item) => {
        let obj = {
          date: item.create_date,
          order: item.order_id,
          children: item.items,
          orderStatus: item.order_status_des,
          total_fee: item.total_fee,
          distributor_name: item.distributor_name
        }
        return obj
      })
      // console.log(list,'list');
      // list[0].orderStatus='WAIT_BUYER_CONFIRM'
      list[0].orderStatus = 'SUCCESS'
      list[1].orderStatus = 'NOTPAY'

      this.list = list
      this.page.total = pager.count
    },
    async getAftersalesList() {
      this.loading = true
      let params = {
        pageSize: this.page.pageSize,
        page: this.page.page,
        order_type: 'normal'
        // status: this.status,
      }
      let { list = [], total_count = 0 } = await aftersaleList(params)
      // list.push(list[0])

      list = list.map((item) => {
        let obj = {
          date: item.create_date,
          order: item.order_id,
          children: [].push(item.item),
          orderStatus: item.order_status_des
        }
        return obj
      })
      console.log(list, 'list')
      // console.log(list,'list');
      // list[0].orderStatus='WAIT_BUYER_CONFIRM'
      this.list = list
      this.page.total = total_count
    },
    clickLink(id) {
      this.$router.push(`/member/trade/${id}`)
    },
    handelClick(val) {
      if (val == 10 || val == 11) {
        this.page.page = 1
        // this.getAftersalesList()

        // this.$router.push(`/member/trade/aftersale-list`)
      } else {
        this.status = val
        this.page.page = 1
        this.getTradeList()
      }
    },
    clickBtn(type, item) {
      switch (type) {
        case this.$t('trade.index-ol.632202-5'):
          this.$router.push(`/cashier?order_id=${item.order}`)
          break
        case this.$t('trade.index-ol.632202-6'):
          confirmOrder({
            order_id: item.order
          }).then((res) => {
            this.$Message.success(this.$t('trade.index-ol.632202-49'))
            this.getTradeList()
          })
          break
        case this.$t('trade.index-ol.632202-7'):
          this.selectItem = item
          this.dialogLogistics = true
          break

        case this.$t('trade.index-ol.632202-9'):
          this.selectItem = item
          this.dailogCancel = true
          break
        case this.$t('trade.index-ol.632202-15'):
          this.dailogCancel = false
          this.dailogClose = false
          break
        case this.$t('trade.index-ol.632202-13'):
          this.$refs['form'].validate((valid, errors) => {
            if (valid) {
              orderCancel({
                order_id: this.selectItem.order,
                cancel_reason: this.form.cancelMean
              }).then(() => {
                this.$Message.success(this.$t('trade.index-ol.632202-50'))
                this.getTradeList()
              })
            }
          })
          break
        case this.$t('trade.index-ol.632202-3'):
          this.$router.push(
            `/member/trade/aftersale?orderId=${item.order_id}&itemId=${item.item_id}`
          )
          break
        case this.$t('trade.index-ol.632202-2'):
          this.selectItemClose = item
          this.dailogClose = true

          break

        case this.$t('trade.index-ol.632202-23'):
          this.$refs['formClose'].validate((valid, errors) => {
            if (valid) {
              let params = {
                order_id: this.selectItemClose.order_id,
                item_id: this.selectItemClose.item_id,
                distributor_id: this.selectItemClose.distributor_id,
                aftersales_type: this.formClose.type,
                reason: this.formClose.reason,
                description: this.formClose.description
              }
              params.return_type = this.formClose.type=="REFUND_GOODS"? "logistics": ""
              creatAftersales(params).then(() => {
                this.$Message.success(this.$t('trade.index-ol.632202-50'))
                this.dailogClose = false
                this.getTradeList()
              })
            }
          })
          break
        case this.$t('trade.index-ol.632202-8'):
          console.log(1231, this.$t('trade.index-ol.632202-8'))
          break
      }
    },
    changePage(page) {
      this.page.page = page
      this.getTradeList()
    },
    clickGoodsName(item) {
      this.$router.push(`/items/${item.item_id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-order {
  position: relative;
  margin-bottom: 100px;
  .member-content {
    font-size: 12px;
    @include clearfix();
    margin-top: 20px;
    &-left {
      float: left;
      width: 215px;
      min-height: 700px;
      border: 1px solid $color-border-gray-light;
      border-radius: 4px;
    }

    &-right {
      margin-left: 220px;
      min-height: 700px;
      border: 1px solid $color-border-gray-light;
      // // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      // border-radius: 4px;
      &-limit {
        width: 600px;
      }
    }
  }
  .order-tag {
    display: inline-block;
    height: 20px;
    padding: 0 8px;
    margin-right: 5px;
    line-height: 20px;
    color: #ffffff;
    text-align: center;
    background-color: red;
  }
  .member-content-right {
    background: #fff;
    .member-content-right-list-header {
      // display: flex;
      border-bottom: 1px solid $color-border-gray-light;
      height: 45px;
      line-height: 45px;
      padding: 0 20px;
      font-size: 14px;
      // color: $color-primary-text;
    }
    .member-content-right-list-body {
      padding: 20px;
      .tabs-status {
        height: 30px;
        .tab {
          display: inline-block;
          padding-right: 20px;
          cursor: pointer;
        }
        .active {
          color: $color-brand-primary;
        }
      }
      .member-content-right-list-body-search {
        padding-top: 20px;
        // display: flex;
        height: 55px;

        .search-lfet {
          width: 300px;
          padding-left: 10px;
          float: left;
          // display: flex;
          align-items: center;
          .btn {
            display: inline-block;
            margin-left: 10px;
            width: 70px;
            height: 28px;
            line-height: 28px;
            border: 1px solid $color-border-gray;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            &:hover {
              background-color: $color-border-gray-light;
            }
          }
        }
        .search-bar {
          float: right;
          width: 350px;
          height: 30px;
          // display: flex;
        }
        .sp-input {
          display: inline-block;
          width: 180px;
          height: 30px;
          border: 1px solid $color-border-gray-light;
          &__input {
            background: #fff;
            height: 100%;
          }
        }
        .search-btn {
          display: inline-block;
          margin-left: 15px;
          width: 120px;
          background: $color-brand-primary;
          color: $color-primary-text;
          border-radius: 3px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
      .member-content-right-list-body-content {
        .list-table {
          border: 1px solid $color-border-gray-light;
          width: 100%;
          margin-top: 10px;
          .list-table-header {
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid $color-border-gray-light;
            & > span {
              margin-right: 10px;
            }
          }
          .table-body {
            border-collapse: collapse;
            border-spacing: 0;
            tr {
              border-bottom: 1px solid #efefef;

              // &:nth-last-child(1){
              //   border-bottom:none
              // }
            }
            td {
              padding: 10px;
            }
            tbody {
              // border: 1px solid #efefef;
              // tr {
              //   border-bottom: 1px solid #efefef;
              // }
            }
            .product-ctrl {
              text-align: center;
            }
          }
          // .list-table-body {
          //   width: 100%;
          //   // display: flex;
          //   .list-table-body-left {
          //     height: 100%;
          //     float: left;
          //     //  display: block;
          //     // display: inline-block;
          //     width:580px;
          //     .list-table-body-left-item{
          //       padding: 10px 0;
          //       &:nth-child(1){
          //         border-top:none;
          //       }
          //       border-top: 1px solid $color-border-gray-light;;
          //       // display: flex;
          //       border-right: 1px solid $color-border-gray-light;
          //     img {
          //       width: 70px;
          //       height: 70px;
          //       float: left;
          //     }
          //     .product-name {
          //       display: inline-block;
          //       padding-left: 5px;
          //       // line-height: 18px;
          //       vertical-align: middle;
          //       height: 100%;
          //       width: 280px;
          //     }
          //     .product-price {
          //       display: inline-block;
          //       color: var(--color-primary);
          //       padding-left: 5px;
          //       width: 100px;
          //     }
          //     .product-num {
          //       display: inline-block;
          //       padding-left: 5px;
          //     }
          //     .product-ctrl {
          //       display: inline-block;
          //       padding-left: 5px;
          //       width: 85px;
          //     }
          //   }
          //   }
          //   .list-table-body-right {
          //     float: left;
          //     // height: 100%;
          //     width: 300px;
          //     // position: relative;
          //     // transform: translateY(50%);
          //     .product-price {
          //       color: var(--color-primary);
          //       width: 80px;
          //       display: inline-block;

          //     }
          //     .product-status{
          //       height: 100%;
          //       vertical-align: middle;
          //       display: inline-block;
          //       width: 100px;
          //     }
          //     .product-ctrl{
          //       height: 100%;
          //       display: inline-block;
          //       width: 110px;
          //     }
          //   }
          // }
        }
      }
    }
  }
  &__b {
    padding-top: 40px;
  }
  .member__tips {
    font-size: 16px;
    // color: $color-secondary-text;
    font-weight: bold;
    margin-top: 26px;
  }
  .mb20 {
    margin-bottom: 20px;
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
.dailog-cancel {
  .dailog-bd-input {
    width: 300px;
    display: inline-block;
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
</style>
