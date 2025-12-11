/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="page-order">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="order" active="aftersale"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">{{ $t('trade.aftersale-list.245771-0') }}</div>
          <div class="member-content-right-body">
            <div class="tabs-status">
              <template >
                <div v-for="(tab,index) in tabs" :key="index" class="tab" @click="handelClick(tab.value)" :class="{ active: tab.value == status }">
                  {{ tab.label }}
                </div>
              </template>
            </div>

            <div class="member-content-right-list-body-content">
              <div class="list-table">
                <!-- <div class="list-table-header">
                
                  <span>{{child.date|parseTime}}</span>
                  退换货编号：
                  <span
                    class="ly-fn-a"
                    @click.stop="clickLink(child)"
                  >{{child.order}}</span>
                
                </div> -->
                <template>
                  <table class="table-body">
                    <colgroup>
                      <col class="number-col" />
                      <col class="consignee-col" />
                      <col class="amount-col" />
                      <col class="status-col" />
                      <col class="operate-col" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>{{ $t('trade.aftersale-list.245771-1') }}</th>
                        <th>{{ $t('trade.aftersale-list.245771-2') }}</th>
                        <th>{{ $t('trade.aftersale-list.245771-3') }}</th>
                        <th>{{ $t('trade.aftersale-list.245771-4') }}</th>
                        <th>{{ $t('trade.aftersale-list.245771-5') }}</th>
                      </tr>
                    </thead>
                    <tbody v-for="(child,index) in list" :key="index">
                      <tr class="sep-row">
                        <td colspan="5"></td>
                      </tr>
                      <tr class="tr-th">
                        <td colspan="5">
                          <div class="list-table-header">
                            <span>{{ child.date }}</span>
                            {{ $t('trade.aftersale-list.245771-6') }}
                            <span class="ly-fn-a link-black" @click.stop="clickLink(child.order)">{{
                              child.order
                            }}</span>
                            <span>{{ child.distributor_info ? child.distributor_info : $t('trade.aftersale-list.245771-7') }}</span>
                          </div>
                        </td>
                      </tr>
                      <template>
                        <tr class="tr-bd" v-for="(item, index) in child.children" :key="index">
                          <td>
                            <div class="product-name" @click="clickGoodsName(item)">
                              <SpImg class="spimg" :src="item.item_pic" no-size />
                              <div class="td-product-name">
                                <div class="p-name">{{ item.item_name }}</div>
                              </div>
                            </div>
                            <div class="product-num">x {{ item.num }}</div>
                          </td>
                          <td v-if="index == 0" :rowspan="child.children.length || 2" colspan="1">
                            <div class="product-price">￥{{ child.refund_fee | formatPriceToHundred }} </div>
                          </td>
                          <td v-if="index == 0" :rowspan="child.children.length || 2" colspan="1">
                            <div class="product-price">{{ child.refund_point }}</div>
                          </td>
                          <td :rowspan="child.children.length || 2" v-if="index == 0" colspan="1">
                            <div class="product-status-warp">
                              <div class="p-status-text" :class="child.orderStatus == '1' ? 'nopay-color' : ''">
                                {{ afterStatusText[child.orderStatus] }}
                              </div>
                              <div class="ly-fn-a b-color" @click="clickLink(child.order)"> {{ $t('trade.aftersale-list.245771-8') }}</div>
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

                              <!-- <div
                                class="ly-fn-a"
                                @click="clickBtn($t('trade.aftersale-list.245771-45'),child)"
                                v-if="child.orderStatus == 'WAIT_BUYER_CONFIRM' || child.orderStatus == 'DONE' || child.orderStatus == 'SUCCESS'"
                              >{{ $t('trade.aftersale-list.245771-45') }}</div> -->

                              <!--  -->
                              <div
                                class="btn btn-primary"
                                v-if="child.orderStatus === '3'"
                                @click="clickBtn($t('trade.aftersale-list.245771-9'), child)"
                              >
                                {{ $t('trade.aftersale-list.245771-9') }}
                              </div>
                              <div
                                class="btn btn-primary"
                                v-if="child.orderStatus === '1'"
                                @click="clickBtn($t('trade.aftersale-list.245771-10'), child)"
                              >
                                {{ $t('trade.aftersale-list.245771-10') }}
                              </div>

                              <!-- <span class="ly-fn-a" @click="clickBtn('申请售后', item)" v-if="!item.aftersales_status">申请售后</span>
                                <span class="ly-fn-a" v-if="item.aftersales_status" @click="clickBtn($t('trade.aftersale-list.245771-12'), item)">{{ $t('trade.aftersale-list.245771-12') }}</span>
                              -->
                              <!-- <div class="ly-fn-a" @click="clickLink(child.order)">查看详情</div> -->
                            </div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </template>
              </div>
            </div>
            <template>
              <div class="tips" style="width: 300px; margin: 50px auto">
                <Tips v-if="list.length == 0" :tips="$t('trade.aftersale-list.245771-11')" />
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
          </div>

          <SpModal v-model="dailogClose" :height="320" :width="520">
            <div class="dailog dailog-close">
              <div class="dailog-hd">{{ $t('trade.aftersale-list.245771-12') }}</div>
              <div class="dailog-bd">
                <!-- <span>订单号：{{this.$route.params.id}}</span> -->
                <div>
                  <SpForm ref="formClose" :model="formClose" :rules="rulesClose">
                    <SpFormItem prop="type">
                      <span class="type-reason-des">{{ $t('trade.aftersale-list.245771-13') }}</span>
                      <SpSelect
                        style="width: 350px"
                        :data="typeData"
                        v-model="formClose.type"
                        :placeholder="$t('trade.aftersale-list.245771-14')"
                      ></SpSelect>
                    </SpFormItem>
                    <SpFormItem prop="reason">
                      <span class="type-reason-des">{{ $t('trade.aftersale-list.245771-15') }}</span>
                      <SpSelect
                        style="width: 350px"
                        :data="reasonData"
                        v-model="formClose.reason"
                        :placeholder="$t('trade.aftersale-list.245771-16')"
                      ></SpSelect>
                    </SpFormItem>
                    <SpFormItem prop="description">
                      <span class="type-reason-des">{{ $t('trade.aftersale-list.245771-17') }}</span>
                      <SpInput
                        style="width: 350px"
                        v-model="formClose.description"
                        :placeholder="$t('trade.aftersale-list.245771-18')"
                      />
                    </SpFormItem>
                  </SpForm>
                </div>
              </div>
              <div class="dailog-ft">
                <button class="btn btn-primary" @click="clickBtn($t('trade.aftersale-list.245771-19'))">{{ $t('trade.aftersale-list.245771-20') }}</button>
                <button class="btn" @click="clickBtn($t('trade.aftersale-list.245771-21'))">{{ $t('trade.aftersale-list.245771-21') }}</button>
              </div>
            </div>
          </SpModal>

          <SpModal :title="$t('trade.aftersale-list.245771-22')" v-model="dialogLogistics" :height="320" :width="520">
            <div class="dailog">
              <div class="dailog-hd">{{ $t('trade.aftersale-list.245771-22') }}</div>
              <div class="dailog-bd">
                <Logistics :id="selectItem.order" :height="240"></Logistics>
              </div>
            </div>
          </SpModal>
        </div>
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
        { label: this.$t('trade.aftersale-list.245771-23'), value: undefined },
        { label: this.$t('trade.aftersale-list.245771-24'), value: '0' },
        { label: this.$t('trade.aftersale-list.245771-25'), value: '1' },
        { label: this.$t('trade.aftersale-list.245771-26'), value: '2' },
        { label: this.$t('trade.aftersale-list.245771-27'), value: '3' },
        { label: this.$t('trade.aftersale-list.245771-28'), value: '4' }
      ],
      list: [],
      logisticsList: [],
      intervalTime: '',
      loading: true,
      // name: '',
      page: {
        pageSize: 20,
        page: 1,
        total: 0
      },
      orderStatusText: {
        NOTPAY: this.$t('trade.aftersale-list.245771-29'),
        PAYED: this.$t('trade.aftersale-list.245771-30'),
        WAIT_BUYER_CONFIRM: this.$t('trade.aftersale-list.245771-31'),
        FAIL: this.$t('trade.aftersale-list.245771-28'),
        CLOSED: this.$t('trade.aftersale-list.245771-28'),
        CANCEL: this.$t('trade.aftersale-list.245771-32'),
        PAYED_WAIT_PROCESS: this.$t('trade.aftersale-list.245771-33'),
        PAYED_PARTAIL: this.$t('trade.aftersale-list.245771-34'),
        SUCCESS: this.$t('trade.aftersale-list.245771-35'),
        DONE: this.$t('trade.aftersale-list.245771-35')
      },
      afterStatusText: {
        0: this.$t('trade.aftersale-list.245771-24'),
        1: this.$t('trade.aftersale-list.245771-25'),
        2: this.$t('trade.aftersale-list.245771-26'),
        3: this.$t('trade.aftersale-list.245771-27'),
        4: this.$t('trade.aftersale-list.245771-28')
      },
      dailogCancel: false,
      selectItem: {},
      form: { cancelMean: '' },
      rules: {
        cancelMean: [{ validate: 'required', message: this.$t('trade.aftersale-list.245771-36') }]
      },
      dailogClose: false,
      formClose: {
        type: '',
        reason: '',
        description: ''
      },
      rulesClose: {
        type: [{ validate: 'required', message: this.$t('trade.aftersale-list.245771-37') }],
        reason: [{ validate: 'required', message: this.$t('trade.aftersale-list.245771-38') }]
      },
      typeData: [
        { label: this.$t('trade.aftersale-list.245771-39'), value: 'ONLY_REFUND' },
        { label: this.$t('trade.aftersale-list.245771-40'), value: 'REFUND_GOODS' }
      ],
      reasonData: [
        { label: this.$t('trade.aftersale-list.245771-41'), value: this.$t('trade.aftersale-list.245771-41') },
        { label: this.$t('trade.aftersale-list.245771-42'), value: this.$t('trade.aftersale-list.245771-42') },
        { label: this.$t('trade.aftersale-list.245771-43'), value: this.$t('trade.aftersale-list.245771-43') },
        { label: this.$t('trade.aftersale-list.245771-44'), value: this.$t('trade.aftersale-list.245771-44') }
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
    this.getAftersalesList()
  },
  methods: {
    async getAftersalesList() {
      this.loading = true
      let params = {
        pageSize: this.page.pageSize,
        page: this.page.page,
        order_type: 'normal',
        aftersales_status: this.status
      }
      let { list = [], total_count = 0 } = await aftersaleList(params)
      // list.push(list[0])
      list = list.map((item) => {
        // let children = [item.detail]
        let obj = {
          date: item.create_time,
          order: item.aftersales_bn,
          aftersales_type: item.aftersales_type,
          distributor_id: item.distributor_id,
          children: item.detail,
          refund_fee: item.refund_fee,
          refund_point: item.refund_point,
          distributor_info: item.distributor_info.name,
          orderStatus: item.aftersales_status
        }
        return obj
      })

      // list[0].orderStatus = '1'
      // list[1].orderStatus = '2'
      // list[2].orderStatus = '3'

      this.list = list
      this.page.total = total_count
    },
    clickLink(id) {
      this.$router.push(`/member/trade/aftersale?type=1&aftersalesNo=${id}`)
    },
    handelClick(val) {
      if (val == 10 || val == 11) {
        this.page.page = 1
        // this.getAftersalesList()

        // this.$router.push(`/member/trade/aftersale-list`)
      } else {
        this.status = val
        this.page.page = 1
        this.getAftersalesList()
      }
    },
    clickBtn(type, item) {
      switch (type) {
        case this.$t('trade.aftersale-list.245771-45'):
          this.selectItem = item
          this.dialogLogistics = true
          break
        case this.$t('trade.aftersale-list.245771-21'):
          this.dailogCancel = false
          this.dailogClose = false
          this.formClose = {
            type: '',
            reason: '',
            description: ''
          }
          break
        case this.$t('trade.aftersale-list.245771-10'):
          this.selectItem = item
          let formClose = JSON.parse(JSON.stringify(this.formClose))
          formClose.type = item.aftersales_type
          this.formClose = formClose
          this.dailogClose = true
          break
        case this.$t('trade.aftersale-list.245771-12'):
          this.$router.push(
            `/member/trade/aftersale?orderId=${item.order_id}&itemId=${item.item_id}`
          )
          break
        case this.$t('trade.aftersale-list.245771-9'):
          this.selectItemClose = item
          this.dailogClose = true
          break

        case this.$t('trade.aftersale-list.245771-19'):
          this.$refs['formClose'].validate((valid, errors) => {
            if (valid) {
              let params = {
                order_id: this.selectItemClose.children[0].order_id,
                item_id: this.selectItemClose.children[0].item_id,
                distributor_id: this.selectItemClose.distributor_id,
                aftersales_type: this.formClose.type,
                reason: this.formClose.reason,
                description: this.formClose.description
              }
              creatAftersales(params).then(() => {
                this.$Message.success(this.$t('trade.aftersale-list.245771-46'))
                this.dailogClose = false
                Object.assign(this.$data, this.$options.data())
                this.getAftersalesList()
              })
            }
          })
          break
      }
    },
    changePage(page) {
      this.page.page = page
      this.getAftersalesList()
    },
    clickGoodsName(item) {
      this.$router.push(`/items/${item.item_id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../member.scss';
.page-order {
      background: #f5f5f5;
  overflow: hidden;
  .container {
    background: transparent;
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
    .member-content-right-body {
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

      .member-content-right-list-body-content {
        .list-table {
          width: 100%;
          margin-top: 10px;
          .list-table-header {
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            text-align: left;
            color: #aaa;
            & > span {
              color: #aaa;
              margin-right: 10px;
            }
          }
          .table-body {
            width: 100%;
            border-collapse: collapse;
            thead {
              th {
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: #f5f5f5;
                color: #666;
                font-weight: 400;
              }
            }
            tbody {
              td {
                border: 1px solid #e5e5e5;
              }
            }
            .link-black {
              color: black;
            }
            .tr-th {
              background: #f5f5f5;
              height: 31px;
              line-height: 31px;
              color: #aaa;
              overflow: hidden;
            }
            .sep-row {
              td {
                border: 0;
              }
            }
            .sep-row {
              height: 20px;
            }
            .number-col {
              width: 480px;
            }
            .consignee-col {
              width: 115px;
            }
            .amount-col {
              width: 110px;
            }
            .status-col {
              width: 110px;
            }
            .operate-col {
            }
            .tr-bd {
              td {
                padding: 14px 0;
              }
              .product-name {
                width: 280px;
                margin-right: 20px;
                display: inline-block;
                cursor: pointer;
                .td-product-name {
                  vertical-align: top;
                  display: inline-block;
                  width: 160px;
                  .p-name {
                    height: 36px;
                    line-height: 18px;
                    overflow: hidden;
                    color: #333;
                    text-align: left;
                    word-break: break-all;
                  }
                  .p-extra {
                  }
                }
              }
              .product-num {
                width: 70px;
                vertical-align: top;
                display: inline-block;
              }
              .product-status-warp {
                & > div {
                  margin: 6px auto;
                }
                .p-status-text {
                  text-align: center;
                  color: #aaa;
                }
                .nopay-color {
                  color: #e6a23c;
                }
                .b-color {
                  color: rgb(102, 89, 89);
                  text-align: center;
                }
              }
              .p-get-name {
                text-align: center;
                overflow: hidden;
                word-break: break-all;
              }
              .product-price {
                text-align: center;
                overflow: hidden;
              }
              .product-repair {
                width: 100px;
                vertical-align: top;
                display: inline-block;
              }
              .product-ctrl {
                text-align: center;
                & > div {
                  text-align: center;
                  margin: 6px auto;
                }
              }
            }
          }
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
    padding-right: 0;
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

  .tips {
    width: 300px;
    margin: 50px auto;
  }
  .type-reason-des {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.spimg {
  width: 70px;
  height: 70px;
  margin: 0 14px;
}
</style>
