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
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformThree.659476-0') }}</span>
        <div class="upload">
          <template>
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.license_url"  @click="clickUpLoad('license_url')" :src="info.license_url" no-size />
              <SpImg class="spimg1" v-if="!info.license_url"  @click="clickUpLoad('license_url')" :src="defaultImg1" no-size />
            </div>
          </template>
          <input type="file" ref="license_url" class="input" @change="(e)=>changeUpload(e,'license_url')"></input>
          <div class="input-icon">
            <p v-if="!info.license_url">{{ $t('comp.settleformThree.659476-1') }}</p>
            <p v-if="info.license_url"  @click="clickUpLoad('license_url')">{{ $t('comp.settleformThree.659476-2') }}</p>
          </div>
          <div v-if="!info.license_url && rulesShow" class="form-item__error-message">{{ $t('comp.settleformThree.659476-0') }}</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="unifiedCode" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformThree.659476-3') }}</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1"  v-if="info.legal_certid_front_url" @click="clickUpLoad('legal_certid_front_url')" :src="info.legal_certid_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')" :src="defaultImg3" no-size />
            </div>
          </template>
          <input type="file" ref="legal_certid_front_url" class="input" @change="(e)=>changeUpload(e,'legal_certid_front_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_certid_front_url">{{ $t('comp.settleformThree.659476-4') }}</p>
            <p v-if="info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')">{{ $t('comp.settleformThree.659476-2') }}</p>
          </div>
        </div>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.legal_cert_id_back_url" @click="clickUpLoad('legal_cert_id_back_url')" :src="info.legal_cert_id_back_url" no-size />
              <SpImg class="spimg1" v-if="!info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')" :src="defaultImg3" no-size />
            </div>
          </template>
          <input type="file" ref="legal_cert_id_back_url" class="input" @change="(e)=>changeUpload(e,'legal_cert_id_back_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_cert_id_back_url">{{ $t('comp.settleformThree.659476-5') }}</p>
            <p v-if="info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')">{{ $t('comp.settleformThree.659476-2') }}</p>
          </div>
          <div v-if="(!info.legal_cert_id_back_url || !info.legal_certid_front_url) && rulesShow" class="form-item__error-message">{{ $t('comp.settleformThree.659476-6') }}</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="area" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>{{ $t('comp.settleformThree.659476-7') }}</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')" :src="info.bank_card_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.bank_card_front_url"  @click="clickUpLoad('bank_card_front_url')" :src="defaultImg2" no-size />
            </div>
          </template>
          <input type="file" ref="bank_card_front_url" class="input" @change="(e)=>changeUpload(e,'bank_card_front_url')"></input>
          <div class="input-icon">
            <p v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')">{{ $t('comp.settleformThree.659476-2') }}</p>
            <p v-else>{{ $t('comp.settleformThree.659476-8') }}</p>
          </div>
        </div>
        <div v-if="!info.bank_card_front_url && rulesShow" class="form-item__error-message">{{ $t('comp.settleformThree.659476-9') }}</div>
      </SpFormItem>
    </SpForm>
    <p class="tips">{{ $t('comp.settleformThree.659476-10') }}</p>
  </div>
</template>

<script>
import uploadImageFn from '@/utils/upload'
export default {
  components: {},
  props: { formInfo: Object },
  data() {
    var businessLicenseImg = (rule, value, callback) => {
      if (!value) {
        callback(this.$t('comp.settleformThree.659476-11'))
      }
      callback()
    }
    return {
      defaultImg1: require('@/assets/imgs/bussiness-license.png'),
      defaultImg2: require('@/assets/imgs/bank-card.png'),
      defaultImg3: require('@/assets/imgs/id-card.png'),
      rulesShow: false,
      info: {
        license_url: '',
        legal_certid_front_url: '',
        legal_cert_id_back_url: '',
        bank_card_front_url: ''
      },
      accountRules: {}
    }
  },
  created() {
  },
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
      console.log(files[0]);
      if (files.length > 1) {
        this.$Message.error(this.$t('comp.settleformThree.659476-12'))
        return false
      }
      let fileEnd = files[0].type
      // 类型
      if (fileEnd != 'image/jpg' && fileEnd != 'image/png' && fileEnd != 'image/jpeg') {
        this.$Message.error(this.$t('comp.settleformThree.659476-13'))
        return false;
      }
      // 大小
      let size = files[0].size /1024 ;
      console.log(size);
      if (size > 2*1024) {
        this.$Message.error(this.$t('comp.settleformThree.659476-14'))
        return false;
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
    async getDetailInfo() {
      if (this.formInfo) {
        const {
          license_url,
          legal_certid_front_url,
          legal_cert_id_back_url,
          bank_card_front_url
        } = this.formInfo
        this.info = {
          license_url,
          legal_certid_front_url,
          legal_cert_id_back_url,
          bank_card_front_url
        }
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
    }}
}
</script>
<style lang="scss" scoped></style>
