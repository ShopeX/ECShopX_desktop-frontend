/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="reg-modal">
    <div class="reg-modal__wraper">
      <div class="reg-modal__hd">
        <i class="aicon aicon-close" @click="handleActions('close')"></i>
      </div>
      <div class="reg-modal__bd">
        <slot name="content">
          <p class="reg-modal__h1">{{ $t('comps.modal-tips.870430-0') }}</p>
          <ul class="reg-modal__p">
            <!-- <li>您已获得500积分奖励，可以到“我的积分”查询</li>
            <li>同时100元优惠券也已放入“我的优惠券”</li>
            <li>现在完善个人信息，更可再获得500积分哦！</li> -->
            <li>{{ $t('comps.modal-tips.870430-1') }}</li>
          </ul>
        </slot>
      </div>
      <div class="reg-modal__actions">
        <slot>
          <SpButton class="button-dark">{{ $t('comps.modal-tips.870430-2') }}</SpButton>
          <SpButton class="button-dark ml20">{{ $t('comps.modal-tips.870430-3') }}</SpButton>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleActions(type) {
      this.$emit(type)
    }
  }
}
</script>

    <style lang="scss" scoped>
.reg-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  &__wraper {
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 10px;
    background-image: url('~assets/imgs/tips-bg.png');
    background-size: cover;
    width: 500px;
    height: 300px;
    text-align: center;
    font-size: 14px;
  }
  &__hd {
    font-size: 16px;
    height: 50px;
    border-bottom: 1px solid #adadad;
  }
  &__bd {
    padding-top: 20px;
    font-size: 14px;
  }
  &__h1 {
    font-size: 16px;
  }
  &__p {
    margin-top: 20px;
    font-size: 14px;
    line-height: 30px;
  }
  &__actions {
    text-align: center;
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .aicon-close {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }
}
</style>
