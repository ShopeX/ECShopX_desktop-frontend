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
      <SpFormItem prop="companyName" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传营业执照照片</span>
        <div class="upload">
          <template>
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.license_url"  @click="clickUpLoad('license_url')" :src="info.license_url" no-size />
              <SpImg class="spimg1" v-if="!info.license_url"  @click="clickUpLoad('license_url')" :src="defaultImg" no-size />
            </div>
          </template>
          <input type="file" ref="license_url" class="input" @change="(e)=>changeUpload(e,'license_url')"></input>
          <div class="input-icon">
            <p v-if="!info.license_url">上传营业执照</p>
            <p v-if="info.license_url"  @click="clickUpLoad('license_url')">重新上传</p>
          </div>
          <div v-if="!info.license_url && rulesShow" class="form-item__error-message">请上传营业执照照片</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="unifiedCode" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传法人手持身份证照片</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1"  v-if="info.legal_certid_front_url" @click="clickUpLoad('legal_certid_front_url')" :src="info.legal_certid_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')" :src="defaultImg" no-size />
            </div>
          </template>
          <input type="file" ref="legal_certid_front_url" class="input" @change="(e)=>changeUpload(e,'legal_certid_front_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_certid_front_url">上传身份证正面图片</p>
            <p v-if="info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')">重新上传</p>
          </div>
        </div>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.legal_cert_id_back_url" @click="clickUpLoad('legal_cert_id_back_url')" :src="info.idCardFront" no-size />
              <SpImg class="spimg1" v-if="!info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')" :src="defaultImg" no-size />
            </div>
          </template>
          <input type="file" ref="legal_cert_id_back_url" class="input" @change="(e)=>changeUpload(e,'legal_cert_id_back_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_cert_id_back_url">上传身份证反面图片</p>
            <p v-if="info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')">重新上传</p>
          </div>
          <div v-if="(!info.legal_cert_id_back_url || !info.legal_certid_front_url) && rulesShow" class="form-item__error-message">请上传手持身份证正反面照片</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="area" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传结算银行卡正面照片</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')" :src="info.bank_card_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.bank_card_front_url"  @click="clickUpLoad('bank_card_front_url')" :src="defaultImg" no-size />
            </div>
          </template>
          <input type="file" ref="bank_card_front_url" class="input" @change="(e)=>changeUpload(e,'bank_card_front_url')"></input>
          <div class="input-icon">
            <p v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')">重新上传</p>
            <p v-else>上传银行卡正面照片</p>
          </div>
        </div>
        <div v-if="!info.bank_card_front_url && rulesShow" class="form-item__error-message">请上传银行卡正面照片</div>
      </SpFormItem>
    </SpForm>
    <p class="tips">• 图片类型位JPG/PNG，大小在2M以内</p>
  </div>
</template>

<script>
import uploadImageFn from '@/utils/upload'
export default {
  components: {},
  props: {},
  data() {
    var businessLicenseImg = (rule, value, callback) => {
      if (!value) {
        callback('请选择请选择结算银行类型所在省市')
      }
      callback()
    }
    return {
      defaultImg: require('@/assets/imgs/cart-empty.png'),
      rulesShow: false,
      info: {
        license_url: '',
        legal_certid_front_url: '',
        legal_cert_id_back_url: '',
        bank_card_front_url: ''
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
      accountRules: {
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    check() {
      console.log(this.info);
      if (!this.info.license_url ||
          !this.info.legal_certid_front_url ||
          !this.info.legal_cert_id_back_url ||
          !this.info.bank_card_front_url) {
        this.rulesShow = true;
        return;
      }
      this.$emit('resule', true, this.info)
    },
    // 上传图片
    clickUpLoad(index) {
      this.$refs[index].value = null
      this.$refs[index].click()
    },
    changeUpload(e, index) {
      let files = e.target.files
      if (files.length > 1) {
        this.$Message.error('最多上传1张图片')
        return false
      }
      //  上传图片
      uploadImageFn(e.target.files).then((imgs) => {
        console.log(imgs)
        // this.info.index = this.list[index].pics.concat(imgs)
        if (index == 'license_url') {
          this.info.license_url = imgs[0].url
        } else if (index == 'legal_certid_front_url') {
          this.info.legal_certid_front_url = imgs[0].url
        } else if (index == 'legal_cert_id_back_url') {
          this.info.legal_cert_id_back_url = imgs[0].url
        } else if (index == 'bank_card_front_url') {
          this.info.bank_card_front_url = imgs[0].url
        }
      })
    },
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>
