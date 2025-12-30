/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="container">
    <div class="review-info">
      <div class="review-info-success">
        <img class="review-img" src="../../assets/imgs/cart-empty.png" alt="" />
        <p class="review-title-head">已提交申请，请耐心等待~</p>
        <p class="review-title-info">预计会在1~5个工作日完成审核</p>
      </div>
      <div class="review-info-fail">
        <img class="review-img" src="../../assets/imgs/cart-empty.png" alt="" />
        <p class="review-title-head">恭喜您已完成入驻!</p>
        <p class="review-title-info">登录地址及账号密码将发送短信至</p>
        <p class="review-title-info">注册手机号,请注意查收</p>
      </div>
      <div class="review-info-loading">
        <img class="review-img" src="../../assets/imgs/cart-empty.png" alt="" />
        <p class="review-title-head">很抱歉! 您的入驻申请未通过</p>
        <div class="review-suggest">
          <p class="review-suggest-title">审批意见:</p>
          <p class="review-suggest-info">· 法人手持身份证照片有误，需重新上传；</p>
          <p class="review-suggest-info">· 审批意见</p>
        </div>
        <SpButton type="primary" @click="handleAgain">重新填写</SpButton>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
export default {
  layout: 'shop_layout',
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    handleAgain() {
      this.$route.push('/shop/settleform?type=return')
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" src="./review.scss"></style>