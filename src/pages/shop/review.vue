/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="container">
    <div class="review-info">
      <div class="review-info-success" v-if="audit_status == 1">
        <img class="review-img" src="../../assets/imgs/review-submit.png" alt="" />
        <p class="review-title-head">{{ $t('shop.review.121498-0') }}</p>
        <p class="review-title-info">{{ $t('shop.review.121498-1') }}</p>
      </div>
      <div class="review-info-fail" v-if="audit_status == 2">
        <img class="review-img" src="../../assets/imgs/review-success.png" alt="" />
        <p class="review-title-head">{{ $t('shop.review.121498-2') }}</p>
        <p class="review-title-info">{{ $t('shop.review.121498-3') }}</p>
        <p class="review-title-info">{{ $t('shop.review.121498-4') }}</p>
      </div>
      <div class="review-info-loading" v-if="audit_status == 3">
        <img class="review-img" src="../../assets/imgs/review-pass.png" alt="" />
        <p class="review-title-head">{{ $t('shop.review.121498-5') }}</p>
        <div class="review-suggest" v-if="audit_memo">
          <p class="review-suggest-title">{{ $t('shop.review.121498-6') }}</p>
          <p class="review-suggest-info">· {{ audit_memo }}</p>
        </div>
        <SpButton type="primary" @click="handleAgain">{{ $t('shop.review.121498-7') }}</SpButton>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import { settlementAuditstatus } from '@/api/store'
export default {
  layout: 'shop_layout',
  components: {},
  props: {},
  data() {
    return {
      audit_status: '',
      audit_memo: ''
    }
  },
  created() {
    this.getAuditstatus()
  },
  computed: {},
  methods: {
    handleAgain() {
      this.$router.push('/shop/settleform?type=return')
    },
    // 获取商户入驻信息审核结果
    getAuditstatus() {
      settlementAuditstatus().then((res) => {
        this.audit_status = res.audit_status
        this.audit_memo = res.audit_memo
      })
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" src="./review.scss"></style>