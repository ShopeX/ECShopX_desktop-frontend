/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.member-address-picker {
  &__list {
    height: 60px;
  }
  .sp-radio {
    &__text {
      display: inline-block;
      margin-left: 10px;
      vertical-align: top;
      font-weight: normal;
      font-size: 14px;
      padding-top: -2px;
      position: relative;
      top: -1px;
    }
  }
  .name-label {
    display: inline-block;
    width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: text-bottom;
  }
  .new-address__wrap {
    width: 500px;
    padding: 0 30px;
    margin-bottom: 30px;
    .form-item {
      margin-bottom: 20px;
      .form-label {
        float: left;
        font-size: 14px;
        line-height: 30px;
        letter-spacing: 2px;
        color: $color-primary-text;
      }
      .form-value {
        margin-left: 100px;
        width: calc(100% - 100px);
      }
    }
    .filed-name-phone {
      > div {
        width: 50%;
        float: left;
        &:not(:last-child) {
          padding-right: 2px;
        }
      }
    }
  }
  .use-new-address {
    .sp-radio__text {
      position: relative;
      top: 2px;
    }
    margin-bottom: 20px;
  }
  .required-icon {
    position: absolute;
    left: -10px;
    top: 50%;
    margin-top: -10px;
    color: #c51333;
  }
  .sort-select__dropdown-list {
    li {
      @include text-overflow();
    }
  }
}
</style>

<template>
  <div class="member-address-picker address-picker">
    <SpRadioGroup class="pay-cont__radio" v-model="addrId">
      <div class="member-address-picker__list" v-for="item in list" :key="item.addr_id">
        <SpRadio type="checkbox" :label="item.addr_id">
          <span v-if="!isBag">
            <div>{{ item.addrdetail }}</div>
            <div>
              (
              <span>{{ $t('comps.member-address-picker.617682-0') }}</span>
              <span class="name-label">{{ item.name }}</span>
              <span>{{ $t('comps.member-address-picker.617682-1') }}</span>
              <span>{{ item.mobile }}</span>
              )
            </div>
          </span>
          <span v-else>
            <div>{{ item.addrdetail }}</div>
            <div>
              (
              <span>{{ $t('comps.member-address-picker.617682-2') }}</span>
              <span>{{ item.storename }}</span>
              )
            </div>
          </span>
        </SpRadio>
      </div>
      <template v-if="!isBag">
        <SpRadio type="checkbox" class="use-new-address" :label="-1">{{ $t('comps.member-address-picker.617682-3') }}</SpRadio>
      </template>
      <div class="new-address__wrap">
        <SpForm ref="form-address" :model="info" :rules="rules">
          <template v-if="addrId == -1 && !isBag">
            <SpFormItem prop="name">
              <p class="form-label">{{ $t('comps.member-address-picker.617682-4') }}</p>
              <div class="form-value">
                <SpInput v-model="info.name" :placeholder="$t('comps.member-address-picker.617682-5')" />
              </div>
            </SpFormItem>
            <SpFormItem prop="phone">
              <p class="form-label">{{ $t('comps.member-address-picker.617682-6') }}</p>
              <div class="form-value">
                <SpInput
                  v-model="info.phone"
                  :placeholder="$t('comps.member-address-picker.617682-7')"
                  :maxlength="11"
                />
              </div>
            </SpFormItem>
            <SpFormItem>
              <p class="form-label">{{ $t('comps.member-address-picker.617682-8') }}</p>
              <div class="form-value">
                <SpAddressPicker v-model="info.address"></SpAddressPicker>
              </div>
            </SpFormItem>
            <SpFormItem prop="address">
              <p class="form-label">{{ $t('comps.member-address-picker.617682-9') }}</p>
              <div class="form-value">
                <SpInput v-model="info.addressdetail" :placeholder="$t('comps.member-address-picker.617682-10')" />
              </div>
            </SpFormItem>
            <SpFormItem>
              <p class="form-label">{{ $t('comps.member-address-picker.617682-11') }}</p>
              <div class="form-value">
                <SpInput v-model="info.zcode" :placeholder="$t('comps.member-address-picker.617682-12')" />
              </div>
            </SpFormItem>
          </template>
          <SpFormItem class="btn-wrap clearfix">
            <div class="btn-c">
              <SpButton
                type="primary"
                :disabled="!addrId"
                long
                @click="addressSubmit('form-address')"
                >{{ $t('comps.member-address-picker.617682-13') }}</SpButton
              >
            </div>
          </SpFormItem>
        </SpForm>
      </div>
    </SpRadioGroup>
  </div>
</template>

<script>
import { SpAddressPicker } from '@/components'
import _find from 'lodash/find'
import { analytics } from '@/plugins/analytics'

export default {
  name: 'MemberAddressPicker',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: [String, Number, Object],
    data: Array,
    // 是否福袋、福袋不能添加地址
    isBag: Boolean
  },
  components: { SpAddressPicker },
  data() {
    return {
      info: {
        name: '',
        phone: '',
        address: [],
        addressdetail: '',
        zcode: ''
      },
      rules: {
        name: [{ validate: 'required', message: this.$t('comps.member-address-picker.617682-14') }],
        phone: [
          { validate: 'required', message: this.$t('comps.member-address-picker.617682-15') },
          {
            validate: (rule, val, cb) => cb(!/\d{11}/.test(val) ? rule.message : ''),
            message: this.$t('comps.member-address-picker.617682-15')
          }
        ],
        address: [{ validate: 'required', message: this.$t('comps.member-address-picker.617682-10') }]
      },
      pay_type: '',
      addrId: this.value ? this.value.addr_id : -1
    }
  },
  // watch: {
  //   addrId (val) {
  //     let address = _find(this.list, { addr_id: val })
  //     this.$emit('input', address)
  //   }
  // },
  methods: {
    addressSubmit(name) {
      let address
      // 已有地址
      if (this.addrId !== -1) {
        address = _find(this.list, { addr_id: this.addrId })
        this.$emit('change', address, this.list)
      } else {
        // 新增地址
        this.$refs[name].validate((valid, errors) => {
          if (valid) {
            this.handleSaveAddress()
          } else {
          }
        })
      }
    },
    // async setDefaultAddress () {
    //   // 设置默认地址
    //   await this.$api.member.addressSetDefault({ addr_id: this.addrId })
    // },
    async handleSaveAddress() {
      // 修改保存
      let params = {
        name: this.info.name,
        mobile: this.info.phone,
        area: this.info.address.join(','),
        addr: this.info.addressdetail,
        zip: this.info.zcode,
        def_addr: 1
      }
      await this.$api.member.addressCreate(params)
      const { list, count } = await this.$api.member.addressList()
      let address = list[count.nowcount - 1]
      this.$emit('change', address, list)
      analytics.event({}, 'addNewAddressSuccess')
    }
  }
}
</script>
