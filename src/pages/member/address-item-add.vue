/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.address-item-add {
  .form {
    .label-text {
      display: inline-block;
      font-size: 13px;
      width: 90px;
      text-align: right;
      position: relative;
      top: 2px;
      color: #888;
    }
    .input-text {
      display: inline-block;
      width: calc(100% - 100px);
      .sp-address-picker {
        width: calc(100% - 10px);
      }
    }
    .form-item {
      margin-bottom: 20px;
      width: 500px;
      position: relative;
      top: -1px;
    } 
    .set-default-addr {
      font-size: 12px;
      color: #888;
    }
    .form-item__error-message {
      right: auto;
      left: 93px;
    }
  }
  .btns {
    border-top: 1px solid #ececec;
    padding: 10px 20px;
    text-align: right;
    .btn {
      display: inline-block;
      border-radius: 3px;
      width: 105px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
    }
    .btn-ok {
      margin-right: 10px;
    }
  }
}
</style>
<template>
  <div class="address-item-add">
    <SpForm ref="form" :model="addressInfo" :rules="addressInfoRules">
      <SpFormItem prop="username">
        <span class="label-text">{{ $t('member.address-item-add.704004-0') }}</span>
        <SpInput class="input-text" v-model="addressInfo.username" />
      </SpFormItem>
      <SpFormItem prop="telephone">
        <span class="label-text">{{ $t('member.address-item-add.704004-1') }}</span>
        <SpInput class="input-text" v-model="addressInfo.telephone" />
      </SpFormItem>
      <SpFormItem prop="tmp_code">
        <span class="label-text">{{ $t('member.address-item-add.704004-2') }}</span>
        <SpAddressPicker
          class="input-text"
          v-model="addressInfo.tmp_code"
          @onChange="addressChange"
        />
      </SpFormItem>
      <SpFormItem prop="adrdetail">
        <span class="label-text">{{ $t('member.address-item-add.704004-3') }}</span>
        <SpInput class="input-text" v-model="addressInfo.adrdetail" />
      </SpFormItem>
      <SpFormItem prop="postalCode">
        <span class="label-text">{{ $t('member.address-item-add.704004-4') }}</span>
        <SpInput class="input-text" v-model="addressInfo.postalCode" />
      </SpFormItem>
      <SpFormItem>
        <span class="label-text"></span>
        <SpRadio type="checkbox" :theme="theme" v-model="addressInfo.is_def">
          <span class="set-default-addr">{{ $t('member.address-item-add.704004-5') }}</span>
        </SpRadio>
      </SpFormItem>
    </SpForm>
    <div class="btns">
      <div class="btn btn-ok" @click="clickSumbit">{{ $t('member.address-item-add.704004-6') }}</div>
      <div class="btn" @click="clickCancel">{{ $t('member.address-item-add.704004-7') }}</div>
    </div>
  </div>
</template>

<script>
import { addressUpdate } from '@/api/member'
import { mapActions, mapState } from 'vuex'

export default {
  
  data() {
    
    console.log('this',this)
    return {
      addressInfo: {
        username: '',
        telephone: '',
        tmp_code: [],
        adrdetail: '',
        is_def: false,
        postalCode: ''
      },
      addressInfoRules: null
    }
  },
  props: {
    // 父组件传过来的默认数据
    addressInfoFrom: {
      type: Object,
      default: null
    },
    type: {
      // 新增还是更新
      type: String,
      default: 'post' //post新增 put更新
    },
    theme: String
  },
  computed: {
    ...mapState('address', ['region'])
  },
  watch: {
    addressInfoFrom: {
      handler(val) {
        if (this.type == 'put') {
          if (this.addressInfoFrom.tmp_code) {
            this.addressInfo = this.addressInfoFrom
          } else {
            let { province, city, county } = this.addressInfoFrom
            this.formatAddress(province, city, county).then((res) => {
              this.addressInfo = this.addressInfoFrom
              this.addressInfo.tmp_code = res
            })
          }
        } else {
          Object.assign(this.$data, this.$options.data())
        }
      },
      immediate: true
    }
  },
  created() {
    this.addressInfoRules = {
        username: [{ validate: 'required', message: this.$t('member.address-item-add.704004-8') }],
        telephone: [{ validate: 'required', message: this.$t('member.address-item-add.704004-9') }],
        tmp_code: [{ validate: 'required', message: this.$t('member.address-item-add.704004-10') }],
        adrdetail: [{ validate: 'required', message: this.$t('member.address-item-add.704004-11') }],
        postalCode: [{ validate: 'required', message: this.$t('member.address-item-add.704004-12') }]
      }
  },
  mounted() {
    // if (this.type == 'put') {
    //   if (this.addressInfoFrom.tmp_code) {
    //     this.addressInfo = this.addressInfoFrom
    //   } else {
    //     let { province, city, county } = this.addressInfoFrom
    //     this.formatAddress(province, city, county).then((res) => {
    //       this.addressInfo = this.addressInfoFrom
    //       this.addressInfo.tmp_code = res
    //     })
    //   }
    // }
  },
  methods: {
    ...mapActions('address', ['getRegion']),
    // 提交并发送给父组件
    clickSumbit() {
      this.$refs['form'].validate((valid, errors) => {
        if (valid) {
          let obj = {
            method: this.type
          }
          if (obj.method == 'put') {
            obj.id = this.addressInfo.address_id
          }
          let params = {
            ...this.addressInfo,
            is_def: this.addressInfo.is_def ? 1 : 0
          }
          addressUpdate(params, obj).then((res) => {
            let message = obj.method == 'post' ? this.$t('member.address-item-add.704004-13') : this.$t('member.address-item-add.704004-14')
            this.$Message.success(message)
            this.$options.data()
            this.$emit('onClick')
          })
        }
      })
    },
    clickCancel() {
      this.$emit('clickCancel')
    },
    addressChange(arr) {
      this.addressInfo.province = arr[0]
      this.addressInfo.city = arr[1]
      this.addressInfo.county = arr[2]
    },
    // 后端传过来的是汉字地址，转换成code码
    async formatAddress(province, city, county) {
      let region = await this.getRegion()
      let code = []
      if (region != '') {
        let pItem = this.region.find((item) => item.label == province)
        code.push(pItem.value)
        let cItem = pItem.children.find((item) => item.label == city)
        code.push(cItem.value)
        let cyItem = cItem.children.find((item) => item.label == county)
        if (cyItem) {
          code.push(cyItem.value)
        }
      }
      return code
    }
  }
}
</script>
