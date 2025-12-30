/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
<div class="vip-card" v-if="info" :style="{'background-image':'url(' + vip_bg + ')'}">
  <div class="vip-card__hd">
    <span>{{info.username || info.mobile}}</span>
    <nuxt-link to="/member/rights">
      <span class="vip-card__rights">{{ $t('comps.vip-card.642296-0') }}</span>
    </nuxt-link>
  </div>
  <p class="vip-card__code">{{info.member_tier}} {{info.member_code}}</p>
  <!-- <div class="progress-bar__wraper">
    <ProgressBar value="70" color="#aabab7"/>
    <p class="progress-bar__text">9000/20000  升级银卡会员</p>
  </div> -->
  <div class="vip-card__logo">
    <i class=""></i>
    <img src="~/assets/imgs/logo-s.png" alt="">
  </div>
</div>
</template>

<script>
import ProgressBar from './progress-bar'

import grade_1 from '~/assets/imgs/grade_1.png'
import grade_2 from '~/assets/imgs/grade_2.png'
import grade_3 from '~/assets/imgs/grade_3.png'
import grade_4 from '~/assets/imgs/grade_4.png'

const GRADE_MAP = {
  '1': grade_1,
  '2': grade_2,
  '3': grade_3,
  '4': grade_4
}

export default {
  components: { ProgressBar },
  props: {
    info: Object
  },
  data () {
    return {
      GRADE_MAP
    }
  },
  computed: {
    vip_bg: function () {
      if (!this.info) return ''

      const { grade_id } = this.info
      return this.GRADE_MAP[grade_id] || this.GRADE_MAP[1]
    }
  }
}
</script>

    <style lang="scss" scoped>
.vip-card{
  position: relative;
  width: 536px;
  height: 295px;
  padding: 25px 30px;
  background-size: cover;
  color: #fff;
  border-radius: 10px;
  &__hd{
    font-size: 24px;
    text-align: left;
    line-height: 30px;
  }
  &__rights{
    font-size: 16px;
    float: right;
    color: #fff;
  }
  &__code{
    font-size: 16px;
    color: #aabab7;
    text-align: left;
  }
  .progress-bar__wraper{
    margin-top: 40px;
    .progress-bar__text{
      font-size: 16px;
      text-align: right;
      color: #aabab7;
      margin-top: 5px;
    }
  }
  &__logo{
    position: absolute;
    left: 40px;
    bottom: 25px;
    width: 93px;
    height: 36px;
  }
}
</style>
