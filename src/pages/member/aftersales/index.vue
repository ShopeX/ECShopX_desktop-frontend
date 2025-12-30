/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='./index.scss'></style>

<template>
<div class="page-refund member page-body container-member">
  <div class="member-top">
    <p class="member-top-title">{{ $t('aftersales.index.616149-0') }}</p>
  </div>
  <div class="member-content">
    <div class="member-content-left">
      <smenu activeTitle="order" active="all-order"></smenu>
    </div>

    <div class="member-content-right">
      <h3 class="page-refund__title">{{ $t('aftersales.index.616149-1') }}</h3>
      <div class="refund-list" v-if="total">
        <div class="refund-list__header clearfix">
          <div class="refund-id">{{ $t('aftersales.index.616149-2') }}</div>
          <div class="refund-reason">{{ $t('aftersales.index.616149-3') }}</div>
          <div class="refund-time">{{ $t('aftersales.index.616149-4') }}</div>
          <div class="refund-status">{{ $t('aftersales.index.616149-5') }}</div>
          <div class="refund-action">{{ $t('aftersales.index.616149-6') }}</div>
        </div>
        <div class="refund-list__body">
          <div class="refund-list__body-c" v-for="(item, index) in list" :key="index">
            <div class="refund-list__body-b">
              <div class="refund-id">{{item.aftersales_bn}}</div>
              <div class="refund-reason">
                <span>{{item.reason}}</span>
              </div>
              <div class="refund-time">{{handleDatetime(item.created_time)}}</div>
              <div class="refund-status">{{item.progress_val}}</div>
              <div class="refund-btn">
                <SpButton class="btn-wrap" type="text" @click="goRefundDetail(item.aftersales_bn)">{{ $t('aftersales.index.616149-7') }}</SpButton>
              </div>
            </div>

            <div class="refund-list__body-mb">
              <div>{{ $t('aftersales.index.616149-8') }}{{item.aftersales_bn}}</div>
              <div>{{ $t('aftersales.index.616149-4') }}：{{handleDatetime(item.created_time)}}</div>
              <div>{{ $t('aftersales.index.616149-10') }}{{item.progress_val}}</div>
              <div class="refund-reason"><span>{{ $t('aftersales.index.616149-3') }}：{{item.reason}}</span></div>
              <div class="view-btn">
                <SpButton type="text" @click="goRefundDetail(item.aftersales_bn)">{{ $t('aftersales.index.616149-7') }}</SpButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpTipMessage
        loading
        :loadingText="$t('aftersales.index.616149-12')"
        :isLoading="loading"
        v-model="tip"
        :tipText="$t('aftersales.index.616149-13')"
        :tipLink="$t('aftersales.index.616149-14')"
        to="/items"
      ></SpTipMessage>
    </div>
  </div>
</div>
</template>

<script>
import smenu from '../comps/smenu'
import { formatDataTime } from '@/utils'

export default {
  data () {
    return {
      orderType: '',
      keyword: '',
      page_no: 1,
      page_size: 100,
      total: 0,
      list: null,
      loading: false,
      tip: false,
      tid: null
    }
  },
  components: { smenu },
  created () {
    const { tid } = this.$route.query
    this.tid = tid
    this.refundList()
  },
  methods: {
    async refundList () {
      if (this.loading) {
        return
      }
      this.loading = true
      let params = {
        page_no: this.page_no,
        page_size: this.page_size,
        tid: this.tid
      }
      const { list, total_found } = await this.$api.aftersales.list(params)
      this.list = list
      this.total = total_found
      this.loading = false
      this.tip = total_found === 0
    },
    goBack () {
      this.$router.back()
    },
    goRefundDetail (id) {
      this.$router.push(`/member/aftersales/${id}`)
    },
    handleDatetime (timestamp) {
      return formatDataTime(timestamp * 1000)
    },
    handleChangePage (page) {
      this.page_no = page
      this.refundList()
    }
  }
}
</script>
