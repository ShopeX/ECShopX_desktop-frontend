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
      <SpFormItem prop="shopType" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformOne.524219-0') }}</span>
        <SpInputSelect
          v-model="info.merchant_type_parent_id"
          @change="chooseShopType"
          :data="shopTypeList"
          @inputChange="changeInput"
          :placeholder="$t('comp.settleformOne.524219-1')"
        ></SpInputSelect>
      </SpFormItem>
      <SpFormItem prop="bussinessScope" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformOne.524219-2') }}</span>
        <SpInputSelect
          v-model="info.merchant_type_id"
          :data="bussinessScopeList"
          @change="chooseShopList"
          @inputChange="changeInputBussiness"
          :placeholder="$t('comp.settleformOne.524219-1')"
        ></SpInputSelect>
      </SpFormItem>
      <SpFormItem prop="settled_type" class="form-select ">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformOne.524219-3') }}</span>
        <SpRadioGroup v-model="info.settled_type">
          <SpRadio label="enterprise" :theme="themeColor">{{ $t('comp.settleformOne.524219-4') }}</SpRadio>
          <SpRadio label="soletrader" :theme="themeColor">{{ $t('comp.settleformOne.524219-5') }}</SpRadio>
        </SpRadioGroup>
        <div v-if="!info.settled_type && rulesShow" class="form-item__error-message">
          {{ $t('comp.settleformOne.524219-6') }}
        </div>
      </SpFormItem>
    </SpForm>
  </div>
</template>

<script>
import { getMerchantType } from '@/api/store'
export default {
  components: {},
  props: { formInfo: Object },
  data() {
    return {
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        merchant_type_parent_id: '',
        merchant_type_parent_name: '',
        merchant_type_id: '',
        merchant_type_name: '',
        settled_type: ''
      },
      shopTypeList: [],
      bussinessScopeList: [],
      typeParams: {
        page: 1,
        page_size: 10,
        parent_id: 0,
        name: ''
      },
      accountRules: {
        settled_type: [{ required: true, validate: 'required', message: this.$t('comp.settleformOne.524219-7') }]
      }
    }
  },
  created() {
    console.log(window.location)
    console.log(this.$route)
    console.log('this.formInfo*****', this.formInfo)
    console.log(this.formInfo)
    this.getStoreTypeList()
  },
  methods: {
    // 获取 商户类型列表
    async getStoreTypeList(type = '', data) {
      await getMerchantType(this.typeParams).then((res) => {
        let data = []
        res.list.forEach((item) => {
          data.push({
            label: item.name,
            value: item.id,
            company_id: item.company_id,
            parent_id: item.parent_id
          })
        })
        console.log(data);
        console.log(type);
        if (!type) {
          this.shopTypeList = data
        } else if (type == 'bussiness') {
          this.bussinessScopeList = data
        }
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        console.log("valid----",valid);
        if (!valid) {
          console.log();
          this.$emit('resule', valid)
        } else {
          let data = {
            settled_type: this.info.settled_type,
            merchant_type_id: this.info.merchant_type_id
              ? this.info.merchant_type_id
              : this.info.merchant_type_parent_id
          }
          this.$emit('resule', valid, data)
        }
      })
    },
    // 获取选中的商户类型
    chooseShopType(item) {
      this.typeParams.parent_id = item.value;
      this.info.merchant_type_parent_id = item.value;
      this.getStoreTypeList('bussiness')
    },
    // 选中的经营范围
    chooseShopList(item) {
      this.info.merchant_type_id = item.value
    },
    // 商户下拉框输入的信息
    changeInput(e) {
      this.typeParams.name = e
      this.getStoreTypeList()
    },
    // 商户下拉框输入的信息
    changeInputBussiness(e) {
      this.typeParams.name = e
      this.getStoreTypeList('bussiness',1212)
    },
    async getDetailInfo() {
      if (this.formInfo) {
        const {
          merchant_type_parent_id,
          merchant_type_parent_name,
          merchant_type_id,
          merchant_type_name,
          settled_type
        } = this.formInfo
        this.info = {
          merchant_type_parent_id,
          merchant_type_parent_name,
          merchant_type_id,
          merchant_type_name,
          settled_type
        }
        this.typeParams.parent_id = merchant_type_parent_id
        this.getStoreTypeList('bussiness',4545);
      }
    }
  },
  mounted() {},
  watch: {
    formInfo: {
      handler(newValue, oldValue) {
        this.getDetailInfo()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped></style>