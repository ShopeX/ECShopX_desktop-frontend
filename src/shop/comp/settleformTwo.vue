/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="content">
    <SpForm
      class="settle__form"
      ref="form-settle"
      :model="info"
      :rules="accountRules"
      style="{height: 372px;}"
    >
      <SpFormItem prop="merchant_name" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>企业名称</span>
        <SpInput v-model="info.merchant_name" />
      </SpFormItem>
      <SpFormItem prop="social_credit_code_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>统一社会信用代码</span>
        <SpInput v-model="info.social_credit_code_id" />
      </SpFormItem>
      <SpFormItem prop="regions_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>所在省市</span>
        <div class="member-input-text">
          <SpAddress v-model="info.regions_id" @onChange="changeRegions" />
        </div>
      </SpFormItem>
      <SpFormItem prop="address" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>详细地址</span>
        <SpInput class="address-input" v-model="info.address" />
      </SpFormItem>
      <SpFormItem prop="legal_name" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>法人姓名</span>
        <SpInput v-model="info.legal_name" />
      </SpFormItem>
      <SpFormItem prop="legal_cert_id" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>身份证号码</span>
        <SpInput v-model="info.legal_cert_id" />
      </SpFormItem>
      <SpFormItem prop="legal_mobile" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>手机号码</span>
        <SpInput v-model="info.legal_mobile" />
      </SpFormItem>
      <SpFormItem prop="bank_acct_type" class="form-select ">
        <span class="label-text">
          <span class="must-icon">*</span>
          结算银行类型
        </span>
        <SpRadioGroup v-model="info.bank_acct_type">
          <SpRadio label="1" :theme="themeColor">对公</SpRadio>
          <SpRadio label="2" :theme="themeColor">对私</SpRadio>
        </SpRadioGroup>
      </SpFormItem>
      <SpFormItem prop="card_id_mask" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>结算银行账号</span>
        <SpInput v-model="info.card_id_mask" />
      </SpFormItem>
      <SpFormItem prop="bank_name" v-if="info.bank_acct_type == 1" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>结算银行</span>
        <SpSelect
          v-model="info.bank_name"
          :data="bussinessScopeList"
          placeholder="请选择"
        ></SpSelect>
        <div v-if="!info.bank_name && rulesShow" class="form-item__error-message">
          请请选择结算银行
        </div>
      </SpFormItem>
      <SpFormItem prop="bank_mobile	" v-if="info.bank_acct_type == 2" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>绑定手机号</span>
        <SpInput v-model="info.bank_mobile" />
        <div v-if="!info.bank_mobile && rulesShow" class="form-item__error-message">
          请填写绑定手机号
        </div>
      </SpFormItem>
    </SpForm>
    <p class="tips">• 结算银行卡持卡人姓名要与负责人姓名一致</p>
  </div>
</template>

<script>
import { getBank } from '@/api/store'
export default {
  components: {},
  props: {},
  data() {
    var unifiedCode = (rule, value, callback) => {
      let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
      if (!value) {
        callback('请填写统一社会信用代码')
      } else if (reg.test(value)) {
        callback('请填写正确的统一社会信用代码')
      }
      callback()
    }
    var idCard = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        callback('请输入身份证号码')
      } else if (reg.test(value)) {
        callback('请填写正确的身份证号码')
      }
      callback()
    }
    var mobile = (rule, value, callback) => {
      let reg = /^1\d{10}$/
      if (!value) {
        callback('请输入手机号码')
      } else if (reg.test(value)) {
        callback('请填写正确的手机号码')
      }
      callback()
    }
    var area = (rule, value, callback) => {
      if (value.length == 0) {
        callback('请选择所在省市')
      }
      callback()
    }
    var companyName = (rule, value, callback) => {
      if (!value) {
        callback('请填写企业名称')
      }
      callback()
    }
    var address = (rule, value, callback) => {
      if (!value) {
        callback('请输入详细地址')
      }
      callback()
    }
    var nameInput = (rule, value, callback) => {
      if (!value) {
        callback('请输入法人姓名')
      }
      callback()
    }
    var bankType = (rule, value, callback) => {
      if (!value) {
        callback('请选择请选择结算银行类型所在省市')
      }
      callback()
    }
    var bankCardId = (rule, value, callback) => {
      if (!value) {
        callback('请输入结算银行账号')
      }
      callback()
    }
    // var bankName = (rule, value, callback) => {
    //   console.log(this)
    //   if (!value) {
    //     if (this.info.bank_acct_type == 1) {
    //       callback('请选择结算银行')
    //     }
    //   }
    //   callback()
    // }
    return {
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        merchant_name: '',
        social_credit_code_id: '',
        regions_id: [],
        address: '',
        legal_name: '',
        legal_cert_id: '',
        legal_mobile: '',
        bank_acct_type: '1',
        card_id_mask: '',
        bank_name: '',
        bank_mobile: ''
      },
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
      bussinessScopeList: [],
      accountRules: {
        merchant_name: [{ validate: companyName, message: '请填写企业名称' }],
        social_credit_code_id: [{ validate: unifiedCode }],
        regions_id: [{ validate: area, message: '请选择所在省市' }],
        address: [{ validate: address, message: '请输入详细地址' }],
        legal_name: [{ validate: nameInput, message: '请输入法人姓名' }],
        legal_cert_id: [{ validate: idCard, message: '请输入身份证号码' }],
        legal_mobile: [{ validate: mobile, message: '请输入手机号码' }],
        bank_acct_type: [{ validate: bankType, message: '请选择结算银行类型' }],
        card_id_mask: [{ validate: bankCardId, message: '请输入结算银行账号' }]
        // bank_name: [{ validate: bankName, message: '请选择结算银行' }]
      }
    }
  },
  created() {
    this.getBankList()
  },
  computed: {},
  methods: {
    // 获取结算银行
    getBankList() {
      getBank().then((res) => {
        // console.log(result)
        res.list.forEach((item) => {
          this.bussinessScopeList.push({
            label: item.bank_name,
            value: item.bank_code,
            id: item.id
          })
        })
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        console.log(valid)
        if (!valid) {
          this.$emit('resule', valid)
        } else {
          this.$emit('resule', valid, this.info)
        }
        if (
          (this.info.bank_acct_type == '1' && !this.info.bank_name) ||
          (this.info.bank_acct_type == '2' && !this.info.bank_mobile)
        ) {
          this.rulesShow = true
        }
      })
    },
    // 获取所在省市
    changeRegions(name, ids) {
      this.info.regions_id = ids
      this.info.regions = name
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>