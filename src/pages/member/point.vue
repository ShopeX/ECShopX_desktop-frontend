/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="page-point">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="point" active="point"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">{{ $t('member.point.216312-0') }}</div>

          <div class="hd">
            <div class="hd-kyong">
              <img src="~/assets/imgs/score.png" />
              <div class="wrapper">
                <h4>{{ $t('member.point.216312-1') }}</h4>
                <div class="kyong-num">{{ mypoint }}</div>
              </div>
            </div>
            <!-- <div class="hd-tongji"> -->
            <!-- <div class="tongji-hd">
                <h4 class="tongji-hd-h4">最近三个月积分统计</h4>
                <div class="hd-tips">
                  <i class="ec-icon ec-icon-question"></i> 积分规则
                  <div class="tip">
                    <h4>近三个月内积分统计数据</h4>
                    <p>1.下单获取积分</p>
                    <p>2.评价获取积分（无该功能，暂时不做）</p>
                    <p>3.{{ $t('member.point.216312-11') }}（新用户注册，售后返，管理端手动调整）</p>
                    <p>积分抵扣节省：积分抵扣部分金额（现金积分抵扣部分，不包含积分商城）</p>
                  </div>
                </div>
              </div>
              <div class="item-warp">
                <div class="item" v-for="item in itemNum">
                  <p>{{ item.name }}</p>
                  <h4 class="num">+{{ item.num }}</h4>
                </div>
              </div>
              <div class="item-dikou">
                <p>积分抵扣节省</p>
                <h4 class="num">50.0元</h4>
              </div> -->
            <!-- </div> -->
          </div>
          <div class="bd">
            <!-- <div v-if="!loading" class="collect-list clearfix">

            </div> -->
            <div class="bd-hd">
              <h4>{{ $t('member.point.216312-2') }}({{ $t('member.point.216312-3') }})</h4>
              <div>{{ $t('member.point.216312-4') }}{{ total }}{{ $t('member.point.216312-5') }}</div>
            </div>
            <table class="table-body">
              <colgroup>
                <col class="time" />
                <col class="fee" />
                <col class="remark" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('member.point.216312-6') }}</th>
                  <th>{{ $t('member.point.216312-7') }}</th>
                  <th>{{ $t('member.point.216312-8') }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in list">
                  <tr class="sep-row">
                    <td>{{ item.updated | parseTime }}</td>
                    <td>
                      <span v-if="item.outin_type == 'in'">+{{ item.income }}</span>
                      <span v-else>-{{ item.outcome }}</span>
                    </td>
                    <td>{{ item.point_desc }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="collector__blank" v-if="list == ''">
              <Tips :tips="$t('member.point.216312-9')" />
            </div>
            <div class="pagination-wrap">
              <SpPagination
                :total="total"
                :pageSize="pageSize"
                :current="page"
                @on-change="changePage"
                :maxPage="5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import smenu from './../member/comps/smenu'
import Tips from './comps/tips'
import { getPointMember, getPointMemberInfo } from '@/api/member'

export default {
  components: {
    smenu,

    Tips
  },
  data() {
    return {
      itemNum: {
        gouwujifen: {
          name: this.$t('member.point.216312-10'),
          num: 0
        },
        pingjiajifen: {
          name: this.$t('member.point.216312-10'),
          num: 0
        },
        qitajifen: {
          name: this.$t('member.point.216312-11'),
          num: 0
        }
      },
      list: [],
      loading: false,
      page: 1,
      pageSize: 20,
      total: 0,
      mypoint: 0
    }
  },
  computed: {},
  created() {
    this.fetch()
    this.getInfo()
  },
  methods: {
    async fetch() {
      let params = {
        page_no: this.page,
        page_size: this.pageSize
      }
      getPointMember(params).then((res) => {
        let { list, total_count } = res
        this.list = list
        this.total = total_count
      })
    },
    getInfo() {
      getPointMemberInfo().then((res) => {
        this.mypoint = res.point
      })
    },
    changePage(val) {
      this.page = val
      this.fetch()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './member.scss';
.page-point {
      background: #f5f5f5;
  overflow: hidden;
  .container {
    background: transparent;
  }
  .hd {
    display: flex;
    background-color: #fff;
    .hd-kyong {
      // width: 380px;
      margin: 10px 0 20px;
      padding: 10px 60px 0 20px;
      height: 200px;
      flex: 1;
      text-align: center;
      margin-bottom: 0;

      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        h4 {
          line-height: 50px;
          font-size: 20px;
          margin: 0;
        }
      }

      img {
        width: 100px;
        height: 100px;
      }
      // border-right: 1px solid #ddd;
      h4 {
        line-height: 50px;
      }
      .kyong-num {
        //   text-align: center;
        padding: 10px;
        font-size: 36px;
        line-height: 32px;
        font-weight: 500;
      }
    }
    .hd-tongji {
      width: 600px;
      padding: 10px 20px 0 60px;

      .tongji-hd {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px 10px 0;
        .tongji-hd-h4 {
          font-size: 14px;
          font-weight: bold;
        }
        .hd-tips {
          position: relative;
          .ec-icon {
            color: #e6c06f;
            cursor: pointer;
          }
          .tip {
            position: absolute;
            right: 0;
            background: #fff;
            min-width: 200px;
            border-radius: 4px;
            border: 1px solid #ebeef5;
            padding: 12px;
            z-index: 2000;
            color: #606266;
            line-height: 1.4;
            text-align: justify;
            font-size: 14px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            word-break: break-all;
            display: none;
            p {
              font-size: 12px;
              line-height: 20px;
            }
          }
          &:hover {
            .tip {
              display: block;
            }
          }
        }
      }
      .item-warp {
        display: flex;
        border-bottom: 1px solid #ddd;
        .item {
          width: 30%;
          height: 70px;
          p {
            line-height: 35px;
          }
        }
      }
      .item-dikou {
        padding-top: 10px;
        width: 30%;
        height: 70px;
        p {
          line-height: 35px;
        }
      }
      .num {
        font-size: 16px;
        font-weight: bold;
        color: #e6c06f;
      }
    }
  }
  .member__tips {
    text-align: center;
  }
  .bd {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    min-height: 300px;
    .bd-hd {
      padding: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      h4 {
        line-height: 30px;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .table-body {
      padding: 10px;

      width: 100%;
      text-align: left;
      border-collapse: collapse;
      thead {
        line-height: 40px;
        background-color: #f7f7f7;
      }
      td {
        padding: 10px;
        line-height: 25px;
      }
      th {
        padding: 10px;
      }
      .time {
      }
    }
  }
}
</style>
