/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='./logistics.scss'></style>

<template>
  <div class="page-logistics page-order-detail member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">{{ $t('trade.logistics.931328-0') }}</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="order" active="all-order"></smenu>
      </div>
      <div class="member-content-right">
      <!-- <div class="page-logistics__title">物流详情</div> -->

        <div class="page-logistics__address" v-if="address">
          <p>{{ $t('trade.logistics.931328-1') }}</p>
          <p>{{address.receiver_state + address.receiver_city + address.receiver_district}}</p>
          <p>{{address.receiver_address}}</p>
        </div>

        <ul class="logistics-list" v-if="tracker && tracker.list > 0">
          <li v-for="(item,index) in tracker" :key="index">
            <span class="logistics-list__circle"></span>
            <div class="logistics-list__placeholder" v-if="index === 0"></div>
            <div class="logistics-list__placeholder last" v-if="index === tracker.length - 1"></div>
            <p>{{item.AcceptStation}}</p>
            <p>{{item.AcceptTime}}</p>
          </li>
        </ul>

        <Tips v-else :tips="$t('trade.logistics.931328-2')"/>

      </div>
    </div>
  </div>
</template>

<script>
import smenu from '../comps/smenu'
import Tips from '../comps/tips'

export default {

  data () {
    return {
      tracker: [],
      address: null
    }
  },
  components: { smenu, Tips },
  created () {
    this.getLogistics()
  },
  methods: {
    async getLogistics () {
      const { id, corp_code } = this.$route.query
      const { tracker, address } = await this.$api.trade.logistics({ logi_no: id, corp_code })
      if (tracker) {
        this.tracker = tracker
      }
      if (address) {
        this.address = address
      }
    }
  }
}
</script>
