/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="container">
    <div class="settle_hd">
      <div class="settle_hd-title">
        <p class="settle_hd-title-text" :class="setPage == 1 ? 'active' : ''">
          入驻类型<span class="cricle"></span>
        </p>
        <p class="settle_hd-title-text" :class="setPage == 2 ? 'active' : ''">
          商户信息<span class="cricle"></span>
        </p>
        <p class="settle_hd-title-text" :class="setPage == 3 ? 'active' : ''">
          证照信息<span class="cricle"></span>
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
          :formInfo="formInfo"
          @resule="checkResult(arguments)"
          v-if="setPage == 1"
        ></settle-form-one>

        <settle-form-two
          ref="settleFormTwos"
          @resule="checkResult(arguments)"
          v-if="setPage == 2"
        ></settle-form-two>

        <settle-form-three
          ref="settleFormThrees"
          @resule="checkResult(arguments)"
          v-if="setPage == 3"
        ></settle-form-three>

        <SpFormItem class="btn-container">
          <div @click="protocolHandle" class="protocolLink">
            《入驻协议》
          </div>
          <div class="btn-container__login">
            <div
              class="btn btn-fastbuy"
              v-if="setPage != 1"
              :style="{ borderColor: themeColor, color: themeColor }"
              @click="handlePrev"
            >
              上一页
            </div>
            <div
              class="btn btn-fastbuy"
              v-if="setPage != 3"
              :style="{ borderColor: themeColor, color: themeColor }"
              @click="handleNext('form-settle')"
            >
              下一页
            </div>
            <div
              class="btn btn-submit"
              v-if="setPage == 3"
              :style="{ backgroundColor: themeColor, borderColor: themeColor }"
              @click="handleSubmit"
            >
              提交
            </div>
          </div>
        </SpFormItem>
      </SpForm>
    </div>
    <!-- 提交时提示信息 -->
    <SpModal v-model="dailogVisible" :width="600">
      <div slot="title" class="confirm-title">提示</div>
      <div class="confirm-info">
        <p class="dialog-info">请确认是否提交审核</p>
        <div class="btns">
          <div class="btn" @click="clickCancel">取消</div>
          <div class="btn btn-ok" @click="clickSumbit">确认</div>
        </div>
      </div>
    </SpModal>

    <SpModal v-model="visiableProtocolDialog" :width="600">
      <div slot="title" class="protocol-title">提示</div>
      <div class="protocol-info">
        <p class="dialog-info">{{ baseContent }}</p>
      </div>
    </SpModal>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import settleFormOne from '@/pages/shop/comp/settleformOne'
import settleFormTwo from '@/pages/shop/comp/settleformTwo'
import settleFormThree from '@/pages/shop/comp/settleformThree'
import {
  saveSettlementInfo,
  settlementDetail,
  settlementSet,
  getBasesetting
} from '@/api/store'
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
      baseContent:'',
      setPage: 1,
      result: false,
      info: {},
      formInfo: {},
      shopTypeList: [
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        }
      ],
      bussinessScopeList: [
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        },
        {
          label: '测试',
          value: '测试11'
        }
      ]
    }
  },
  created() {
    this.getSet()
    this.getBasesetInfo()
  },
  computed: {},
  methods: {
    // 获取信息回传
    checkResult(e) {
      this.result = e[0]
      if (e.length == 2) {
        this.info = Object.assign({ ...e[1] })
      }
    },
    // 点击下一页
    handleNext(e) {
      console.log(this.info);
      // 保存当前页面信息
      saveSettlementInfo(this.setPage, this.info).then((res) => {
      }).catch((err) => {
        return;
      })
      if (this.setPage == 1) {
        this.$refs.settleFormOnes.check()
        if (this.result) {
          this.setPage = 2
        }
      } else if (this.setPage == 2) {
        this.$refs.settleFormTwos.check()
        if (this.result) {
          this.setPage = 3
        }
      }
      this.getDetail();
    },
    // 点击上一页
    handlePrev() {
      this.getDetail();
      if (this.setPage == 3) {
        this.setPage = 2
      } else if (this.setPage == 2) {
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
    // 确认提交
    clickSumbit() {
      this.$Message.success('提交成功')
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
        this.formInfo = res.data
      })
    },
    // 获取商户入驻当前步骤
    getSet() {
      let params = this.$route.query;
      settlementSet().then((res) => {
        if (res.step == 4 && !params) {
          this.$route.push('/shop/review')
        } else {
          this.setPage = 1
          this.getDetail()
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
<style scoped lang="scss" src="./settleForm.scss"></style>