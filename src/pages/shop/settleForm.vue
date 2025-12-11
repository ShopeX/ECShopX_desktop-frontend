/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="container">
    <div class="settle_hd">
      <div class="settle_hd-title">
        <p class="settle_hd-title-text" :class="setPage == 1 ? 'active' : ''">
          {{ $t('shop.settleForm.283678-0') }}<span class="cricle"></span>
        </p>
        <p class="settle_hd-title-text" :class="setPage == 2 ? 'active' : ''">
          {{ $t('shop.settleForm.283678-1') }}<span class="cricle"></span>
        </p>
        <p class="settle_hd-title-text" :class="setPage == 3 ? 'active' : ''">
          {{ $t('shop.settleForm.283678-2') }}<span class="cricle"></span>
        </p>
      </div>
      <div
        class="settle_hd-line"
        :class="{ 'line_one': setPage == 1, 'line_two': setPage == 2, 'line_three': setPage == 3 }"
      ></div>
    </div>

    <div class="settle_bd">
      <!-- 账号登录 -->
      <SpForm class="settle__form" ref="form-settle" style="{height: 372px;}">
        <settle-form-one
          ref="settleFormOnes"
          @resule="checkResult(arguments)"
          :formInfo="reviewInfo"
          v-if="setPage == 1"
        ></settle-form-one>

        <settle-form-two
          ref="settleFormTwos"
          @resule="checkResult(arguments)"
          :formInfo="reviewInfo"
          :typeName="nameTip"
          v-if="setPage == 2"
        ></settle-form-two>

        <settle-form-three
          ref="settleFormThrees"
          @resule="checkResult(arguments)"
          :formInfo="reviewInfo"
          v-if="setPage == 3"
        ></settle-form-three>

        <SpFormItem class="btn-container">
          <div @click="protocolHandle" class="protocolLink">
            {{ $t('shop.settleForm.283678-3') }}
          </div>
          <div class="btn-container__login">
            <div
              class="btn btn-fastbuy"
              v-if="setPage != 1"
              :style="{ borderColor: themeColor, color: themeColor }"
              @click="handlePrev"
            >
              {{ $t('shop.settleForm.283678-4') }}
            </div>
            <div
              class="btn btn-fastbuy"
              v-if="setPage != 3"
              :style="{ borderColor: themeColor, color: themeColor }"
              @click="handleNext('form-settle')"
            >
              {{ $t('shop.settleForm.283678-5') }}
            </div>
            <div
              class="btn btn-submit"
              v-if="setPage == 3"
              :style="{ backgroundColor: themeColor, borderColor: themeColor }"
              @click="handleSubmit"
            >
              {{ $t('shop.settleForm.283678-6') }}
            </div>
          </div>
        </SpFormItem>
      </SpForm>
    </div>
    <!-- 提交时提示信息 -->
    <SpModal v-model="dailogVisible" :width="600">
      <div slot="title" class="confirm-title">{{ $t('shop.settleForm.283678-7') }}</div>
      <div class="confirm-info">
        <p class="dialog-info">{{ $t('shop.settleForm.283678-8') }}</p>
        <div class="btns">
          <div class="btn" @click="clickCancel">{{ $t('shop.settleForm.283678-9') }}</div>
          <div class="btn btn-ok" @click="clickSumbit">{{ $t('shop.settleForm.283678-10') }}</div>
        </div>
      </div>
    </SpModal>
    <!-- 退出登录弹出框 -->
    <!-- <SpModal v-model="dailogVisible" :width="600">
      <div slot="title" class="confirm-title">{{ $t('shop.settleForm.283678-7') }}</div>
      <div class="confirm-info">
        <p class="dialog-info">{{ $t('shop.settleForm.283678-8') }}</p>
        <div class="btns">
          <div class="btn" @click="clickCancel">{{ $t('shop.settleForm.283678-9') }}</div>
          <div class="btn btn-ok" @click="clickSumbit">{{ $t('shop.settleForm.283678-10') }}</div>
        </div>
      </div>
    </SpModal> -->
    <!-- 隐私协议弹出框 -->
    <SpModal v-model="visiableProtocolDialog" :width="600">
      <div slot="title" class="protocol-title">{{ $t('shop.settleForm.283678-11') }}</div>
      <div class="protocol-info">
        <p class="dialog-info" v-html="baseContent"></p>
      </div>
    </SpModal>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import settleFormOne from '@/pages/shop/comp/settleformOne'
import settleFormTwo from '@/pages/shop/comp/settleformTwo'
import settleFormThree from '@/pages/shop/comp/settleformThree'
import { saveSettlementInfo, settlementDetail, settlementSet, getBasesetting } from '@/api/store'
export default {
  layout: 'shop_layout',
  components: {
    settleFormOne,
    settleFormTwo,
    settleFormThree
  },
  props: {},
  data() {
    return {
      visiableProtocolDialog: false,
      dailogVisible: false,
      themeColor: '#479EE9', // 单选按钮颜色
      baseContent: '',
      setPage: 1,
      result: false,
      info: {},
      reviewInfo: {},
      nameTip:''
    }
  },
  created() {
    if (!this.$cookies.get('ECSHOPX_STORE_TOKEN')) {
      this.$router.push('/shop')
      return;
    }
    this.getSet(this.$route.query.type)
    this.getBasesetInfo()
  },
  computed: {},
  methods: {
    // 获取信息回传
    checkResult(e) {
      // 表单校验返回值
      this.result = e[0]
      if (e.length == 2) {
        this.info = Object.assign({ ...e[1] })
      }
    },
    // 点击下一页
    handleNext(e) {
      // 保存当前页面信息
      if (this.setPage == 1) {
        this.$refs.settleFormOnes.check()
        this.nameTip = this.info.settled_type
        if (this.result) {
          this.saveInfo();
          this.setPage = 2
          // saveSettlementInfo(this.setPage, this.info)
          //   .then((res) => {
          //     this.getDetail()
          //   })
          //   .catch((err) => {
          //     return
          //   })
        }
      } else if (this.setPage == 2) {
        this.$refs.settleFormTwos.check()
        if (this.result) {
          this.saveInfo();
          this.setPage = 3
          // saveSettlementInfo(this.setPage, this.info)
          //   .then((res) => {
          //     this.getDetail()
          //   })
          //   .catch((err) => {
          //     return
          //   })
        }
      }
    },
    // 点击上一页
    handlePrev() {
      this.getDetail();
      if (this.setPage == 3) {
        // this.$refs.settleFormThrees.check()
        // this.saveInfo();
        this.setPage = 2
      } else if (this.setPage == 2) {
        // this.$refs.settleFormTwos.check()
        // this.saveInfo();
        this.setPage = 1
      }
    },
    // 提交信息
    handleSubmit() {
      this.$refs.settleFormThrees.check()
      if (this.result) {
        this.dailogVisible = true
      }
    },
    // 保存信息
    saveInfo() {
      console.log(this.info);
      saveSettlementInfo(this.setPage, this.info)
        .then((res) => {
          this.getDetail()
        })
        .catch((err) => {
          return
        })
    },
    // 确认提交
    clickSumbit() {
      saveSettlementInfo(this.setPage, this.info)
        .then((res) => {
          this.setPage = 3
          this.$router.push('/shop/review')
          this.$Message.success(this.$t('shop.settleForm.283678-12'))
        })
        .catch((err) => {
          return
        })
      this.clickCancel()
    },
    // 取消提交提示框
    clickCancel() {
      this.dailogVisible = false
    },
    // 打开协议
    protocolHandle() {
      this.visiableProtocolDialog = true
    },
    // 获取商户信息
    getDetail() {
      settlementDetail().then((res) => {
        console.log(res);
        this.reviewInfo = res
      })
    },
    // 获取商户入驻当前步骤
    getSet(type) {
      settlementSet().then((res) => {
        if (res.step != 1) {
          this.getDetail()
        }
        if (res.step != 4) {
          this.setPage = res.step
        } else if (res.step == 4 && !type) {
          this.$router.push('/shop/review')
        } else if (res.step == 4 && type) {
          this.setPage = 1
        }
      })
    },
    // 获取商户入驻协议
    getBasesetInfo() {
      getBasesetting().then((res) => {
        this.baseContent = res.content
      })
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" src="./settleForm.scss"></style>