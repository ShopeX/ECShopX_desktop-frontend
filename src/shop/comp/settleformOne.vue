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
        <span class="label-text"><span class="must-icon">*</span>商户类型</span>
        <SpInputSelect
          v-model="info.shopType"
          @change="chooseShopType"
          :data="shopTypeList"
          placeholder="请选择"
        ></SpInputSelect>
      </SpFormItem>
      <SpFormItem prop="bussinessScope" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>经营范围</span>
        <SpSelect
          v-model="info.bussinessScope"
          :data="bussinessScopeList"
          placeholder="请选择"
        ></SpSelect>
      </SpFormItem>
      <SpFormItem prop="settled_type" class="form-select ">
        <span class="label-text"><span class="must-icon">*</span>入驻类型</span>
        <SpRadioGroup v-model="info.settled_type">
          <SpRadio label="enterprise" :theme="themeColor">企业</SpRadio>
          <SpRadio label="soletrader" :theme="themeColor">个体户</SpRadio>
        </SpRadioGroup>
        <div v-if="!info.settled_type && rulesShow" class="form-item__error-message">
          请上传银行卡正面照片
        </div>
      </SpFormItem>
    </SpForm>
  </div>
</template>

<script>
import { getMerchantType } from '@/api/store'
export default {
  components: {},
  props: {},
  data() {
    return {
      themeColor: '#479EE9', // 单选按钮颜色
      rulesShow: false,
      info: {
        shopType: '',
        bussinessScope: '',
        settled_type: ''
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
      ],
      typeParams: {
        page: 1,
        page_size: 50,
        parent_id: 0,
        name: ''
      },
      accountRules: {
        settled_type: [{ required: true, validate: 'required', message: '请选择入驻类型' }]
      }
    }
  },
  created() {
    this.getStoreTypeList()
  },
  computed: {},
  methods: {
    // 获取 商户类型列表
    getStoreTypeList() {
      getMerchantType(this.typeParams).then((res) => {
        if (this.typeParams.parent_id == 0) {
          // this.shopTypeList = res.result
        } else {
          this.bussinessScopeList = res.result
        }
      })
    },
    check() {
      this.$refs['form-settle'].validate((valid) => {
        if (!valid) {
          this.$emit('resule', valid)
        } else {
          this.$emit('resule', valid, this.info)
        }
      })
    },
    // 获取经营范围
    chooseShopType() {
      this.typeParams.parent_id = this.info.shopType
      this.typeParams.bussinessScope = ''
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>