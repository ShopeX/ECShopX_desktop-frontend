/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="vip-page container">
    <div class="hd">
      <template v-for="item in vipData"
        ><div
          class="hd-item"
          :class="item.vip_grade_id == select ? 'select' : ''"
          @click="handelClick(item.vip_grade_id)"
        >
          {{ item.grade_name }}
        </div></template
      >
    </div>
    <div class="bd">
      <template v-for="item in list">
        <div
          class="bd-item"
          :class="item.name == name ? 'select' : ''"
          @click="handelDay(item.name)"
        >
          <span class="h-text">{{ item.price }}</span
          ><span>{{ $t('member.vip.041323-0') }}{{ item.desc }}</span>
          <div class="ellipsis">{{ $t('member.vip.041323-1') }}</div>
          <p class="tips">{{ $t('member.vip.041323-2') }}</p>
        </div>
      </template>
    </div>
    <div class="ft">
      <div class="btn" @click="submit">{{ $t('member.vip.041323-3') }}</div>
    </div>
  </div>
</template>

<script>
import { getVipgradesNewlist, vipgradesBuy } from '@/api/member'

export default {
  data() {
    return {
      list: [],
      vipData: [],
      select: 0,
      name: 'monthly'
    }
  },
  methods: {
    handelClick(id) {
      this.select = id
      let item = this.vipData.find((i) => i.vip_grade_id == id)
      this.list = item.price_list
    },
    handelDay(name) {
      this.name = name
    },
    submit() {
      let obj = {
        card_type: this.name,
        vip_grade_id: this.select,
        pay_type: 'wxpaypc',
        distributor_id: ''
      }

      vipgradesBuy(obj).then((res) => {
        let order_id = res.trade_info.order_id
        this.$router.push({ path: '/cashier', query: { order_id: `${order_id}` } })
      })
    }
  },
  mounted() {
    getVipgradesNewlist().then((res) => {
      this.vipData = res.list
      this.handelClick(this.vipData[0].vip_grade_id)
    })
  }
}
</script>

<style lang="scss" scoped>
.vip-page {
  background-color: #fff;
  min-height: 400px;
  .hd {
    display: flex;
    padding: 10px 20px 0;
    margin-top: 50px;
    justify-content: space-around;
    .hd-item {
      box-sizing: border-box;
      // display: inline-block;
      // vertical-align: top;
      width: 150px;
      text-align: center;
      cursor: pointer;
    }
    .select {
      border-bottom: 2px solid #e43838;
    }
  }
  .bd {
    display: flex;
    padding: 40px 20px 0;
    justify-content: space-between;
    .h-text {
      font: 25px bold;
    }
    .bd-item {
      width: 200px;
      height: 150px;
      padding: 15px;
      text-align: center;
      border: 1px solid #dadada;
      cursor: pointer;
    }
    .select {
      border: 1px solid #e43838;
    }
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 15px 0;
      color: #bdbdbd;
      border-bottom: 1px dashed #dadada;
    }
    .tips {
      padding-top: 15px;
    }
  }
  .ft {
    padding: 25px 15px;
    // text-align: center;
    .btn {
      width: 90px;
      height: 40px;
      cursor: pointer;
      background-color: #e43838;
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
