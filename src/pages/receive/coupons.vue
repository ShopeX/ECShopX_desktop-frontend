/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="coupons-list">
    <img class="bg-img1" src="@/assets/imgs/coupons/bg1.png" alt="" />
    <img class="bg-img2" src="@/assets/imgs/coupons/bg2.png" alt="" />
    <div class="header">
      <h2 class="coupons-title">{{ $t('receive.coupons.213323-0') }}</h2>
      <div class="coupons-subtitle">
        <img class="coupons-title-img" src="@/assets/imgs/coupons/subtitle.png" alt="" />
        <span>{{ $t('receive.coupons.213323-1') }}</span>
      </div>
      <NuxtLink to="/member/coupon" class="coupons-link">
        <span>{{ $t('receive.coupons.213323-2') }}</span>
      </NuxtLink>
    </div>
    <div class="lists">
      <div v-for="(item,index) in statusList" :key="index">
        <img v-show="item==0" src="@/assets/imgs/coupons/vouchers-no.png" alt="" />
        <img v-show="item==1" src="@/assets/imgs/coupons/vouchers-already.png" alt="" />
        <img v-show="item==2" src="@/assets/imgs/coupons/vouchers-end.png" alt="" />
        <div class="list-item">
          <div class="list-money">
            $100
            <img :src="$t('receive.coupons.213323-3')" alt="" />
            <span class="list-money-text">{{ $t('receive.coupons.213323-4') }}</span>
          </div>
          <div class="list-text">{{ $t('receive.coupons.213323-5') }}</div>
          <div class="list-time">
            2022.06.17-2022.08.30
            <span class="list-time-text">{{ $t('receive.coupons.213323-6') }}</span>
          </div>
        </div>
        <div v-show="item==0" class="list-right">{{ $t('receive.coupons.213323-7') }}</div>
        <div v-show="item==1" class="list-right1">{{ $t('receive.coupons.213323-8') }}</div>
        <div v-show="item==2" class="list-right1 right2">{{ $t('receive.coupons.213323-9') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('receive.coupons.213323-0')
    }
  },
  data() {
    return {
        statusList:[0,1,2]
    }
  }
}
</script>

<style lang="scss" scoped>
.coupons-list {
  margin: 63px 20%;
  overflow: hidden;
  & > img {
    width: 615px;
    height: 279px;
    top: 30px;
  }
  .bg-img1 {
    position: absolute;
    left: 66px;
  }
  .bg-img2 {
    position: absolute;
    right: 66px;
  }
  .header {
    width: 100%;
    position: relative;
    .coupons-link {
      position: absolute;
      top: 20px;
      right: 0px;
      width: 116px;
      height: 36px;
      background: url('~assets/imgs/coupons/圆角矩形.png');
      background-size: 100% 100%;
      padding-top: 6px;
      & > span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fb4d4e;
        line-height: 24px;
        margin-left: 23px;
      }
    }
  }
  .coupons-title {
    height: 30px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 30px;
    text-align: center;
  }
  .coupons-subtitle {
    text-align: center;
    padding-top: 10px;
    position: relative;
    width: 211px;
    margin: 0 auto;
    & > span {
      position: absolute;
      left: 29%;
      line-height: 37px;
      color: #e9f0be;
    }
  }
  .lists {
    margin-top: 67px;
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // align-content:flex-start;
    // flex-grow:1;
    z-index: 10;
    & > div {
      width: 330px;
      margin-top: 20px;
      position: relative;
      & > img {
        width: 100%;
      }
      .list-item {
        position: absolute;
        top: 0;
        z-index: 2;
        padding: 5px 20px;
        color: #ffffff;
        .list-money {
          width: 175px;
          height: 35px;
          font-size: 32px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          display: flex;
          position: relative;
          & > img {
            width: 80px;
            margin-left: 10px;
            margin-top: 15px;
            height: 22px;
          }
          .list-money-text {
            position: absolute;
            right: 15px;
            bottom: 1px;
            width: 60px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #d21c0c;
          }
        }
        .list-text {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0px 3px 7px rgba(255, 255, 255, 0.35);
          margin: 10px 0 5px 0;
        }
        .list-time {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: #ffffff;
          text-shadow: 0px 3px 7px rgba(255, 255, 255, 0.35);
          .list-time-text {
            margin-left: 20px;
            width: 65px;
            height: 17px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            text-decoration: underline;
            color: #ffffff;
            text-shadow: 0px 3px 7px rgba(255, 255, 255, 0.35);
            cursor: pointer; /*鼠标变小手*/
          }
        }
      }
      .list-right {
        width: 36px;
        height: 42px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #e83637;
        line-height: 24px;
        position: absolute;
        top: 25px;
        right: 13px;
      }
      .list-right1{
        width: 53px;
        height: 17px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        color: #E83637;
        line-height: 24px;
        position: absolute;
        top: 35px;
        right: 3px;
      }
      .right2{
        color: #858585;
      }
    }
  }
}
</style>