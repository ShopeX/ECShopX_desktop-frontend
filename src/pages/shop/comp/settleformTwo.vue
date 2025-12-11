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
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-0') }}</span>
        <SpInput v-model="info.merchant_name" />
      </SpFormItem>
      <SpFormItem prop="social_credit_code_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-1') }}</span>
        <SpInput v-model="info.social_credit_code_id" />
      </SpFormItem>
      <SpFormItem prop="regions_id" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-2') }}</span>
        <div class="member-input-text">
          <SpAddress v-model="info.regions_id" @onChange="changeRegions" />
        </div>
      </SpFormItem>
      <SpFormItem prop="address" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-3') }}</span>
        <SpInput class="address-input" v-model="info.address" />
      </SpFormItem>
      <SpFormItem prop="legal_name" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{nameTip}}{{ $t('comp.settleformTwo.800885-4') }}</span>
        <SpInput v-model="info.legal_name" />
      </SpFormItem>
      <SpFormItem prop="legal_cert_id" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-5') }}</span>
        <SpInput v-model="info.legal_cert_id" />
      </SpFormItem>
      <SpFormItem prop="legal_mobile" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-6') }}</span>
        <SpInput v-model="info.legal_mobile" />
      </SpFormItem>
      <SpFormItem prop="bank_acct_type" class="form-select ">
        <span class="label-text">
          <span class="must-icon">*</span>
          {{ $t('comp.settleformTwo.800885-7') }}
        </span>
        <SpRadioGroup v-model="info.bank_acct_type">
          <SpRadio label="1" :theme="themeColor">{{ $t('comp.settleformTwo.800885-8') }}</SpRadio>
          <SpRadio label="2" :theme="themeColor">{{ $t('comp.settleformTwo.800885-9') }}</SpRadio>
        </SpRadioGroup>
      </SpFormItem>
      <SpFormItem prop="card_id_mask" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-10') }}</span>
        <SpInput v-model="info.card_id_mask" />
      </SpFormItem>
      <SpFormItem prop="bank_name" v-if="info.bank_acct_type == 1" class="form-select bank_info">
        <span class="label-text"> <span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-11') }}</span>
        <div @click="showBank" class="bank_input">
          <SpInput v-model="info.bank_name" class="bank_input" :placeholder="$t('comp.settleformTwo.800885-12')" />
        </div>
        <div v-if="!info.bank_name && rulesShow" class="form-item__error-message">
          {{ $t('comp.settleformTwo.800885-13') }}
        </div>
      </SpFormItem>
      <SpFormItem prop="bank_mobile	" v-if="info.bank_acct_type == 2" class="form-select">
        <span class="label-text"> <span class="must-icon">*</span>{{ $t('comp.settleformTwo.800885-14') }}</span>
        <SpInput v-model="info.bank_mobile" />
        <div v-if="!info.bank_mobile && rulesShow" class="form-item__error-message">
          {{ $t('comp.settleformTwo.800885-15') }}
        </div>
      </SpFormItem>
    </SpForm>
    <p class="tips">{{ $t('comp.settleformTwo.800885-16') }}{{nameTip}}{{ $t('comp.settleformTwo.800885-17') }}</p>
    <!-- 银行弹出框 -->
    <SpModal v-model="dailogVisible" :width="600">
      <div slot="title" class="confirm-title">{{ $t('comp.settleformTwo.800885-18') }}</div>
      <div class="confirm-info">
        <SpInput v-model="searchBank.bank_name" @input="changeSearch" />
        <!-- <div class="chooseBanck" @click="changeSearch">{{searchBank.bank_name}}</div> -->
        <div class="bank-list">
          <SpRadioGroup v-model="info.bank_name" v-if="loading">
            <div v-for="(item, index) in bankList" :key="index" class="bank-list-info">
              <SpRadio size="small" :label="item.label" :theme="themeColor">{{
                item.label
              }}</SpRadio>
            </div>
          </SpRadioGroup>
        </div>
        <div class="pagination-wrap">
          <SpPagination
            :total="total"
            :pageSize="searchBank.page_size"
            :current="searchBank.page"
            @on-change="changePage"
            :maxPage="5"
          />
        </div>
        <div class="btns">
          <div class="btn" @click="clickCancel">{{ $t('comp.settleformTwo.800885-19') }}</div>
          <div class="btn btn-ok" @click="clickSumbit">{{ $t('comp.settleformTwo.800885-20') }}</div>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { getBank } from '@/api/store'
export default {
  components: {},
  props: { formInfo: Object, typeName:String },
  data() {
    var unifiedCode = (rule, value, callback) => {
      let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-21'))
      } else if (!reg.test(value)) {
        callback(this.$t('comp.settleformTwo.800885-22'))
      }
      callback()
    }
    var idCard = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-23'))
      } else if (!reg.test(value)) {
        callback(this.$t('comp.settleformTwo.800885-24'))
      }
      callback()
    }
    var mobile = (rule, value, callback) => {
      let reg = /^1\d{10}$/
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-25'))
      } else if (!reg.test(value)) {
        callback(this.$t('comp.settleformTwo.800885-26'))
      }
      callback()
    }
    var area = (rule, value, callback) => {
      if (value.length == 0) {
        callback(this.$t('comp.settleformTwo.800885-27'))
      }
      callback()
    }
    var companyName = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-28'))
      }
      callback()
    }
    var address = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-29'))
      }
      callback()
    }
    var nameInput = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-30'))
      }
      callback()
    }
    var bankType = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-31'))
      }
      callback()
    }
    var bankCardId = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformTwo.800885-32'))
      }
      callback()
    }
    return {
      dailogVisible: false,
      disabled: true,
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        merchant_name: '',
        social_credit_code_id: '',
        regions_id: [],
        regions: [],
        address: '',
        legal_name: '',
        legal_cert_id: '',
        legal_mobile: '',
        bank_acct_type: '1',
        card_id_mask: '',
        bank_name: '',
        bank_mobile: ''
      },
      bankList: [],
      loading: true,
      searchBank: {
        bank_name: '',
        page: 1,
        page_size: 20
      },
      chooseBanks: '',
      total: 0,
      nameTip: this.$t('comp.settleformTwo.800885-33'),
      accountRules: {
        merchant_name: [{ validate: companyName, message: this.$t('comp.settleformTwo.800885-28') }],
        social_credit_code_id: [{ validate: unifiedCode }],
        regions_id: [{ validate: area, message: this.$t('comp.settleformTwo.800885-27') }],
        address: [{ validate: address, message: this.$t('comp.settleformTwo.800885-29') }],
        legal_name: [{ validate: nameInput, message: this.$t('comp.settleformTwo.800885-30') }],
        legal_cert_id: [{ validate: idCard, message: this.$t('comp.settleformTwo.800885-23') }],
        legal_mobile: [{ validate: mobile, message: this.$t('comp.settleformTwo.800885-25') }],
        bank_acct_type: [{ validate: bankType, message: this.$t('comp.settleformTwo.800885-34') }],
        card_id_mask: [{ validate: bankCardId, message: this.$t('comp.settleformTwo.800885-32') }]
        // bank_name: [{ validate: bankName, message: '请选择结算银行' }]
      }
    }
  },
  created() {
    if (this.typeName == 'enterprise') {
      this.nameTip = this.$t('comp.settleformTwo.800885-35');
    } else if (this.typeName == 'soletrader') {
      this.nameTip = this.$t('comp.settleformTwo.800885-33');
    }
    console.log('this.formInfo',this.formInfo);

    this.getBankList()
  },
  computed: {},
  methods: {
    // 获取结算银行
    getBankList() {
      this.loading = false
      // 将已保存的银行信息赋值给表单
      this.info.bank_name = this.chooseBanks
      getBank(this.searchBank).then((res) => {
        this.bankList = []
        let num = 0
        res.list.forEach((item) => {
          // 判断表单已选中的是否是在此次列表中
          if (this.info.bank_name == item.bank_name) {
            num++
          }
          this.bankList.push({
            label: item.bank_name,
            value: item.bank_code,
            id: item.id
          })
        })
        if (num <= 0) {
          this.info.bank_name = ''
        }
        this.loading = true
        this.total = res.total_count
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        if (!valid) {
          if (
            (this.info.bank_acct_type == '1' && !this.info.bank_name) ||
            (this.info.bank_acct_type == '2' && !this.info.bank_mobile)
          ) {
            this.rulesShow = true
          }
          this.$emit('resule', valid)
        } else {
          this.$emit('resule', valid, this.info)
        }
      })
    },
    // 获取所在省市
    changeRegions(name, ids) {
      this.info.regions_id = ids
      this.info.regions = name
    },
    // 选择银行
    chooseBank(item) {
      this.info.bank_name = item.label
    },
    changeInput(e) {
      this.searchBank.bank_name = e
      this.getBankList()
    },
    showBank() {
      this.dailogVisible = true
    },
    // 关闭弹出框
    clickCancel() {
      this.info.bank_name = this.info.bank_name ? this.info.bank_name : this.chooseBanks;
      this.dailogVisible = false
    },
    clickSumbit() {
      this.clickCancel()
    },
    // 页码变化
    changePage(val) {
      this.searchBank.page = val
      this.getBankList()
    },
    // 搜索框变化
    changeSearch(val) {
      this.searchBank.bank_name = val
      this.searchBank.page = 1
      this.getBankList()
    },
    getDetailInfo() {
      if (this.formInfo) {
        const {
          merchant_name,
          social_credit_code_id,
          regions_id,
          province,
          city,
          area,
          address,
          legal_name,
          legal_cert_id,
          legal_mobile,
          bank_acct_type,
          card_id_mask,
          bank_name,
          bank_mobile
        } = this.formInfo
        let regions = province + '-' + city + '-' + area
        regions = regions.split('-')
        // 保存已选中银行信息
        this.chooseBanks = bank_name
        this.info = {
          merchant_name,
          social_credit_code_id,
          address,
          legal_name,
          legal_cert_id,
          legal_mobile,
          bank_acct_type,
          card_id_mask,
          bank_name,
          bank_mobile,
          regions_id: regions_id ? JSON.parse(regions_id) : [],
          regions: regions
        }
      }
    }
  },
  mounted() {},
  watch: {
    formInfo: {
      handler(newValue, oldValue) {
        console.log(124545);
        this.getDetailInfo()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.bank_input{
  cursor: pointer;
  ::v-deep.sp-input__input {
    cursor: pointer;
  }
}  
</style>