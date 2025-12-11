/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./coupon-center.scss"></style>

<template>
  <div class="page-coupon-center">
    <img class="coupon-center-img1 back-img" src="~assets/imgs/coupons/bg1.png" alt="">
    <img class="coupon-center-img2 back-img" src="~assets/imgs/coupons/bg2.png" alt="">
    <div class="container page-member-container">
      <div class="member-content-center">
        <!-- <div class="member-content-left">
          <!~~ <smenu activeTitle="coupon-center" active="coupon-center"></smenu> ~~>
        </div> -->
        <div class="member-content-right">
          <div class="title-group">
            <div></div>
            <div class="coupon-center">
              <div class="coupon-center-title">{{ $t('member.coupon-center.473557-0') }}</div>
              <div class="coupon-center-title-recommend">       
                <div class="triangle-left"></div>
                <div class="triangle-right"></div>
                {{ $t('member.coupon-center.473557-1') }}
              </div>
            </div>
            <nuxt-link class="coupon-my" to="/member/coupon">
              <img src="@/assets/imgs/coupons/quan (5).png" alt="">
              <span class="vip-desc"
                >{{ $t('member.coupon-center.473557-2') }}
              </span>
            </nuxt-link>
          </div>

          <div class="page-coupon-center__content">
            <!-- <div class="coupon-toolbar">
              <a class="coupon-type" javascript="void(0)">
                <span class="coupon-type__current">
                  {{ couponType[curTypeIndex].name }}({{ total }})
                  <i class="ec-icon ec-icon-unfold"></i>
                </span>
                <div class="coupon-type__cover">
                  <span
                    class="coupon-type__cover-item"
                    v-for="(type, index) in couponType"
                    :key="index"
                    @click="changeCouponType(index)"
                    >{{ type.name }}</span
                  >
                </div>
              </a>
            </div> -->

            <div class="page-coupon-center__block" :class="{ 'invalid': couponType === '2' }">
              <div class="coupon-list" v-if="list">
                <div class="coupon-item" v-for="(item, index) in list" :key="`coupon-item__${index}`">
                  <coupon-center-item
                    :info="item"
                    :key="index"
                    @receive="handleReceiveCoupon"
                    :valid="curTypeIndex == 0 ? true : false"
                  />
                </div>
              </div>
              <div class="loading-container" v-if="!list">
                <SpLoading class="modal-loading__t" color="#c3c3c3" v-if="!list"></SpLoading>
              </div>
              <div class='no-coupon' v-if="list && list.length == 0">
                {{ $t('member.coupon-center.473557-3') }}
              </div>
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
import { mapState } from 'vuex'

import smenu from './comps/smenu'
import couponCenterItem from './comps/coupon-center-item'
import Tips from './comps/tips'

export default {
  components: { smenu, couponCenterItem, Tips },
  data() {
    return {
      // recommendBg: require('~assets/imgs/coupons/suitable.png'),
      list: null,
      page: 1,
      pageSize: 12,
      total: 0,
      curTypeIndex: 0,
      couponType: [
        {
          id: 1,
          name: this.$t('member.coupon-center.473557-4')
        },
        {
          id: 2,
          name: this.$t('member.coupon-center.473557-5')
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler: function (newV) {
  //       const { coupon_type } = this.$route.query
  //       if (this.couponType != coupon_type) {
  //         this.couponType = coupon_type || '1'
  //         this.getCouponList()
  //       }
  //     }
  //   }
  // },
  mounted() {
    this.getCouponList()
  },
  methods: {
    async getCouponList() {
      let params = {
        page_no: this.page,
        page_size: this.pageSize,
        valid: this.curTypeIndex == 0 ? true : false
      }
      const { list, total_count } = await this.$api.cart.cardList(params)
      list.map((item,index) => {
        if (item.get_limit - item.user_get_num <= 0) {
          list[index].getted = 1
        } else if (item.quantity - item.get_num <= 0) {
          list[index].getted = 2
        } else {
          list[index].getted = 0
        }
      })
      this.list = list || []
      this.total = total_count != undefined ? parseInt(total_count) : 0
    },
    changePage(val) {
      this.page = val
      this.getCouponList()
    },
    changeCouponType(index) {
      if (this.curTypeIndex != index) {
        this.curTypeIndex = index
        this.page = 1
        this.getCouponList()
      }
    },
    async handleReceiveCoupon(info) {
      let nowDate = parseInt(new Date().getTime()/1000) ;
      if (info.quantity == 0  || info.end_date < nowDate) {
        return;  
      }
      await this.$api.cart.receiveCard({
        card_id: info.card_id
      })
      this.$Message.success(this.$t('member.coupon-center.473557-6'))
      this.getCouponList();
    }
  }
}
</script>
