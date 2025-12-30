/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='./apply-refund.scss'></style>

<template>
  <div class="page-apply-refund member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">{{ $t('aftersales.apply-refund.521937-0') }}</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="order" active="all-order"></smenu>
      </div>
      <div class="member-content-right">
        <div>
          <div class="page-apply-refund__status border-top">
            <p class="page-apply-refund__status-text">{{ $t('aftersales.apply-refund.521937-1') }}</p>
            <p class="page-apply-refund__status-order">{{ $t('aftersales.apply-refund.521937-2') }}{{tid}}</p>
          </div>
          <ul class="page-apply-refund__refund-item-list">
            <li class="refund-item"
              v-for="(item,index) in goodsList"
              :key="index">
              <SpRadio
                type="checkbox"
                :value="item.isChecked"
                :disabled="item.aftersales_num < 1 || aftersales_type=='only_refund'"
                @change="handleSelectionChange(index, item)"
              />
              <SpGoodsItem
                :info="item"
                :showPromotion="false"
              >
                <div class="goods-item__actions">
                  <span v-if="aftersales_type=='only_refund'">{{item.num}}</span>
                  <SpNumInput
                    v-else
                    size="sm"
                    :value="item.num"
                    :max="item.aftersales_num"
                    :diabled="item.aftersales_num < 1 || aftersales_type=='only_refund'"
                    @change="val => handleQuantityChange(index, val)"
                  />
                </div>
              </SpGoodsItem>
            </li>
          </ul>
          <SpForm>
            <!-- <SpFormItem>
              <span class="label-text"><span class="label-required red"></span>退款/退货原因</span>
              <SpSelect
                class="member-select"
                v-model="reason"
                :data="reasonList"
              ></SpSelect>
            </SpFormItem> -->
            <SpFormItem>
              <span class="label-text">{{ $t('aftersales.apply-refund.521937-3') }}</span>
              <div class="page-apply-refund__explain">
                <textarea class="textarea" v-model="reason" cols="30" rows="10"></textarea>
              </div>
            </SpFormItem>
            <SpFormItem class="mb20">
              <div class="label-text">
                <p>{{ $t('aftersales.apply-refund.521937-4') }}</p>
                <p class="label-tips">{{ $t('aftersales.apply-refund.521937-5') }}</p>
              </div>
              <div>
                <ul class="img-list" v-if="imageList.length">
                  <li v-for="(url, index) in imageList" :key="index">
                    <img :src="url" alt=""/>
                  </li>
                </ul>
                <div class="file-input">
                  <input type="file" name="image" ref="imageInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                </div>
              </div>
            </SpFormItem>
          </SpForm>
          <div class="btn-container-member border-top">
            <SpButton
              :loading="loading"
              class="button-dark"
              @click="handleSubmit"
            >{{ $t('aftersales.apply-refund.521937-6') }}</SpButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SpGoodsItem } from '@/components'
import smenu from '../comps/smenu'
import _debounce from 'lodash/debounce'
import { pickBy, debounce } from '@/utils'

const resolveList = (orders, aftersales_type) => {
  const items = pickBy(orders, {
    title: 'title',
    item_id: 'item_id',
    oid: 'oid',
    aftersales_num: 'aftersales_num',
    bn: 'bn',
    image_default_id: 'pic_path',
    color: 'color',
    size: 'size',
    price: 'price',
    valid_lucky: ({ valid_lucky }) => valid_lucky || null
  })

  items.forEach(item => {
    if (aftersales_type === 'only_refund') {
      if (item.aftersales_num < 1) {
        item.num = 0
        item.isChecked = false
      } else {
        item.num = item.aftersales_num
        item.isChecked = true
      }
    } else {
      item.isChecked = item.aftersales_num > 0
      item.num = Math.max(0, item.aftersales_num)
    }
  })

  return items
}

export default {

  data () {
    return {
      goodsList: [],
      loading: false,
      tid: '',
      reason: '',
      imageList: [],
      maxSize: 1024000, // 图片限制为1M内
      aftersales_type: '',
      reasonList: [
        { label: this.$t('aftersales.apply-refund.521937-7'), value: this.$t('aftersales.apply-refund.521937-7') },
        { label: this.$t('aftersales.apply-refund.521937-8'), value: this.$t('aftersales.apply-refund.521937-8') },
        { label: this.$t('aftersales.apply-refund.521937-9'), value: this.$t('aftersales.apply-refund.521937-9') },
        { label: this.$t('aftersales.apply-refund.521937-10'), value: this.$t('aftersales.apply-refund.521937-10') },
        { label: this.$t('aftersales.apply-refund.521937-11'), value: this.$t('aftersales.apply-refund.521937-11') },
        { label: this.$t('aftersales.apply-refund.521937-12'), value: this.$t('aftersales.apply-refund.521937-12') },
        { label: this.$t('aftersales.apply-refund.521937-13'), value: this.$t('aftersales.apply-refund.521937-13') },
        { label: this.$t('aftersales.apply-refund.521937-14'), value: this.$t('aftersales.apply-refund.521937-14') }
      ]
    }
  },
  components: { smenu },
  created () {
    const { tid, aftersales_type } = this.$route.query
    this.tid = tid
    this.aftersales_type = aftersales_type
    this.getAftersalesInfo()
  },
  methods: {
    async getAftersalesInfo () {
      const { tradeInfo } = await this.$api.aftersales.info({
        tid: this.tid,
        aftersales_type: this.aftersales_type
      })
      this.goodsList = resolveList(tradeInfo.orders)
    },

    handleSelectionChange (idx, item) {
      item.isChecked = !item.isChecked
      this.$set(this.goodsList, idx, item)
    },

    goBack () {
      this.$router.push('/member/trade')
    },

    changeImage (e) {
      if (this.imageList.length > 5) {
        this.$Message.error(this.$t('aftersales.apply-refund.521937-15'))
        return
      }
      let file = e.target.files[0]
      if (file.size > this.maxSize) {
        this.$Message.error(this.$t('aftersales.apply-refund.521937-16'))
        return
      }
      if (file) {
        let reader = new FileReader()
        let that = this
        reader.readAsDataURL(file)
        reader.onloadend = async e => {
          const { url } = await that.$api.aftersales.uploadPic({
            evidence_pic: e.target.result
          })
          that.imageList.push(url)
        }
      }
    },

    handleQuantityChange (idx, num) {
      const item = this.goodsList[idx]
      item.num = num
      this.$set(this.goodsList, idx, item)
    },

    async handleSubmit () {
      let params = {
        tid: this.tid,
        aftersales_type: this.aftersales_type
      }
      const goodsList = this.goodsList

      const hasSelect = goodsList.some(item => item.isChecked == true)
      if (!hasSelect) {
        this.$Message.error(this.$t('aftersales.apply-refund.521937-17'))
        return
      }

      if (!this.reason) {
        this.$Message.error(this.$t('aftersales.apply-refund.521937-18'))
        return
      } else {
        params.reason = this.reason
      }
      let img_ids = []
      if (this.imageList.length > 0) {
        this.imageList.map(item => {
          img_ids.push(item)
        })
        params.evidence_pic = img_ids
      }

      for (let item of goodsList) {
        if (item.isChecked) {
          let data = {
            ...item,
            ...params
          }
          this.submitApply(data)
        }
      }
    },

    async submitApply (params) {
      this.loading = true

      try {
        await this.$api.aftersales.apply(params)
        this.$router.push('/member/trade')
      } catch (e) {
        console.log(e)
      }

      this.loading = false
    }
  }
}
</script>
