/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="page-member-rights member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">{{ $t('member.rights.692011-0') }}</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="account"></smenu>
      </div>

      <div class="member-content-right" v-html="info"></div>
      <!-- <div class=" ">
        <p class="rights__hd">AIGLE 1853 CLUB －会员权益</p>
        <p class="rights__hd">AIGLE 1853 CLUB 会员</p>
        <ul class="rights__bd">
          <li>享有正价8.8 折优惠。</li>
          <li>会员独享生日优惠: 6.6 折生日独享价购任意一件货品。</li>
          <li>可参加积分兑换和VIP赠礼活动。</li>
        </ul>
        <p class="rights__hd">尊贵会员卡申请办法</p>
        <ul class="rights__bd">
          <li>一次性购物满5,000元或以上，可申请成为AIGLE 1853 CLUB会员。</li>
          <li>购物小于5,000元，可获取积分卡一张，每购物1元，积分为1分。</li>
          <li>积分卡于一年内累积满8,000分，便可申请成为AIGLE 1853 CLUB会员。</li>
        </ul>
        <p class="rights__hd">会籍年期</p>
        <ul class="rights__bd">
          <li>AIGLE 1853 CLUB会员会籍有效期为1年，1年内获得2000消费积分，会籍续期1年。</li>
          <li>会员积分有效期限至第三年的12月31日止，逾期失效。</li>
        </ul>
        <p class="rights__hd">尊贵会员条款及细则</p>
        <ul class="rights__bd">
          <li>AIGLE 1853 CLUB 会员卡及积分卡适用于中国大陆所有AIGLE门店。</li>
          <li>会员生日当月（当月最后一天不办理）可享用1件产品 6.6 折优惠。</li>
          <li> 会员需提供电话号码、E-mail等个人信息，已确保获得最新信息的权益。</li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import smenu from './comps/smenu'
export default {
  components: { smenu },
  data() {
    return {
      info: ''
    }
  },
  mounted() {
    this.getUserRights()
  },
  methods: {
    async getUserRights() {
      const { rights } = await this.$api.user.userRights()
      this.info = rights
    }
  }
}
</script>

    <style lang="scss" scoped>
.page-member-rights {
  .member-content-right {
    padding: 40px;
    background: $color-bg-gray;
  }
  .rights__hd {
    font-size: 16px;
    font-weight: bold;
    color: $color-secondary-text;
    margin-top: 20px;
  }
  .rights__bd {
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 2px;
    color: $color-primary-text;
    padding-left: 40px;
    margin: 20px 0;
    li {
      list-style-type: disc;
    }
  }
}
</style>
