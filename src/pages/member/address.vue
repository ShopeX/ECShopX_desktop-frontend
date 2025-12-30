/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
@import './member.scss';
.page-member-address {
  background: #f9f9f9;
  border: 1px solid transparent;
  .member-content-right {
    .form {
      width: 600px;
      margin: 0;
      .form-item {
        margin-bottom: 15px;
      }
    }

    // background: #fff;
    // padding-left: 30px;

    .member-content-right-body {
      padding: 20px;
      .tips {
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
      }
    }
  }
  &__title {
    font-size: 16px;
    letter-spacing: 2px;
    color: $color-secondary-text;
    padding-top: 27px;
  }
  &__list {
    font-size: 16px;
    margin-top: 7px;
  }
}
.address-add {
  padding: 30px;
}
.address-add-title {
  width: 100%;
  height: 40px;
  background-color: #eeeeee;
  border-radius: 8px 8px 0 0;
  line-height: 40px;
  padding: 0 20px;
}
.address-list {
  .address-item {
    border: 1px solid #e8e8e8;
    border-top: 1px solid #e43838;
    padding: 13px 13px 0px 5px;
    margin-bottom: 20px;
  }
  h2 {
    padding: 5px;
    margin-bottom: 0;
  }
  .address-item-div {
    color: #666666;
    font-size: 14px;
    padding: 3px;
  }
  .address-item-crtl {
    position: relative;
    top: -25px;
    text-align: right;
    span {
      padding: 10px;
    }
  }
}
.add-btn {
  display: inline-block;
  border-radius: 3px;
  width: 105px;
  height: 34px;
  border: 1px solid $color-border-gray-light;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    border: 1px solid #e43838;
    color: #e43838;
  }
}
.tips {
  display: inline-block;
  margin-left: 20px;
}
</style>
<template>
  <div class="page-member-address">
    <div class="page-container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="phone" active="address"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">{{ $t('member.address.908954-0') }}</div>
          <div class="member-content-right-body">
            <div @click="() => (dailogVisible = true)" class="add-btn">{{ $t('member.address.908954-1') }}</div>
            <div class="tips">{{ $t('member.address.908954-2') }}{{ addressList.length }}{{ $t('member.address.908954-3') }}</div>
            <!-- <div class="address-add">
            <addressItemAdd @onClick="addAddressSumbit" :type="addType" @clickCancel="clickCancel" :addressInfoFrom="addressInfoFrom"></addressItemAdd>
          </div> -->

            <div class="address-list">
              <template v-for="item in addressList">
                <div class="address-item">
                  <h2>{{ item.username }} {{ item.province }}</h2>
                  <div class="address-item-div">{{ $t('member.address.908954-4') }} {{ item.username }}</div>
                  <div class="address-item-div">
                    {{ $t('member.address.908954-5') }}
                    {{ `${item.province}/${item.city}/${item.county}/${item.adrdetail}` }}
                  </div>
                  <div class="address-item-div">{{ $t('member.address.908954-6') }} {{ item.postalCode }}</div>
                  <div class="address-item-div">{{ $t('member.address.908954-7') }} {{ item.telephone }}</div>
                  <div class="address-item-crtl">
                    <span
                      class="ly-fn-a"
                      :class="item.is_def ? 'ly-fn-a-red' : ''"
                      @click.stop="hendelClick($t('member.address.908954-8'), item)"
                      >{{ item.is_def ? $t('member.address.908954-9') : $t('member.address.908954-10') }}</span
                    >
                    <span class="ly-fn-a" @click.stop="hendelClick($t('member.address.908954-11'), item)">{{ $t('member.address.908954-11') }}</span>
                    <span class="ly-fn-a" @click.stop="hendelClick($t('member.address.908954-12'), item)">{{ $t('member.address.908954-12') }}</span>
                  </div>
                </div>
              </template>
              <!-- <table cellspacing="0" cellpadding="0" border="0" class="table-address-list">
              <colgroup>
                <col name="address-name" style="width: 80px" />
                <col name="address" style="width: 270px" />
                <col name="address-no" style="width: 80px" />
                <col name="address-phone" style="width: 100px" />
                <col name="address-ctrl" style="width: 180px" />
              </colgroup>
              <thead>
                <tr>
                  <td class="address-name">收货人</td>
                  <td class="address">地址</td>
                  <td class="address-no">邮编</td>
                  <td class="address-phone">手机</td>
                  <td class="address-ctrl">操作</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in addressList">
                  <tr>
                    <td>{{ item.username }}</td>
                    <td>{{ `${item.province}/${item.city}/${item.county}/${item.adrdetail}` }}</td>
                    <td>{{ item.postalCode }}</td>
                    <td>{{ item.telephone }}</td>
                    <td>
                      <div>
                        <span class="ly-fn-a" @click.stop="hendelClick($t('member.address.908954-11'), item)">{{ $t('member.address.908954-11') }}</span>
                        <span class="ly-fn-a" :class="item.is_def ? 'ly-fn-a-red' : ''" @click.stop="hendelClick($t('member.address.908954-8'), item)">{{ item.is_def ? $t('member.address.908954-9') : $t('member.address.908954-10') }}</span>
                        <span class="ly-fn-a" @click.stop="hendelClick($t('member.address.908954-12'), item)">{{ $t('member.address.908954-12') }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table> -->
            </div>
          </div>

          <!-- <div class="member-content-right-limit">
          <p class="page-address__title">您可在此新增和编辑收货地址</p>
          <div class="page-address__list">
            <div class="page-address__list">
              <AddressItem
                v-for="item in defAddress"
                :key="item.addr_id"
                :addressInfo="item"
                @edit="handleJumpEdit"
                @delete="handleDeleteAddress"
                @setDef="handleSetDefAddress"
              />
            </div>
          </div>
          <div class="btn-container-member">
            <SpButton class="button-dark" @click="handleJumpAdd">添加新地址</SpButton>
          </div>
          <div class="page-address__list">
            <AddressItem
              v-for="item in filterAddress"
              :key="item.addr_id"
              :addressInfo="item"
              @edit="handleJumpEdit"
              @delete="handleDeleteAddress"
              @setDef="handleSetDefAddress"
            />
          </div>
        </div>-->
        </div>
      </div>
      <SpModal v-model="dailogVisible" :width="600">
        <div slot="title" class="address-add-title">{{ $t('member.address.908954-13') }}</div>
        <div class="address-add">
          <addressItemAdd
            @onClick="addAddressSumbit"
            @clickCancel="clickCancel"
            :type="addType"
            :addressInfoFrom="addressInfoFrom"
          ></addressItemAdd>
        </div>
      </SpModal>
    </div>
  </div>
</template>

<script>
import smenu from './../member/comps/smenu'
import AddressItem from './comps/address-item'
import addressItemAdd from '@/pages/member/address-item-add'
import { addressList, addressUpdate } from '@/api/member'

export default {
  // middleware: 'authenticated',
  // async asyncData ({ app, route }) {
  //   let { region } = await app.$api.member.areaList()
  //   return {
  //     region
  //   }
  // },

  // head () {
  //   return {
  //     title: '会员中心_Aigle官方网站',
  //     meta: [
  //       {
  //         hid: 'keywords',
  //         name: 'keywords',
  //         content: '我的账户_Aigle官方网站'
  //       },
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: '我的账户_Aigle官方网站'
  //       }
  //     ]
  //   }
  // },
  components: { smenu, addressItemAdd },
  data() {
    return {
      addressList: [],
      addressInfoFrom: {},
      // 新增还是更新地址。post新增，put更新
      addType: 'post',
      bool: false,
      dailogVisible: false
    }
  },
  computed: {
    // defAddress: function () {
    //   return this.addressList.filter(item => item.def_addr === 1)
    // },
    // filterAddress: function () {
    //   return this.addressList.filter(item => item.def_addr === 0)
    // }
  },
  mounted() {
    this.getAddressList()
  },
  methods: {
    async getAddressList() {
      const { list } = await addressList()
      this.addressList = list
      // let item = list.find((item) => item.is_def)
      // if (item) {
      //   this.clickAddress(item, 'click')
      // }
    },
    addAddressSumbit() {
      this.getAddressList()
      this.dailogVisible = false
    },
    hendelClick(type, item) {
      let _item = JSON.parse(JSON.stringify(item))
      switch (type) {
        case this.$t('member.address.908954-11'):
          this.addressInfoFrom = _item
          this.addType = 'put'
          this.dailogVisible = true
          break
        case this.$t('member.address.908954-8'):
          {
            _item.is_def = true
            let obj = {
              id: _item.address_id,
              method: 'put'
            }
            addressUpdate(_item, obj).then((res) => {
              this.getAddressList()
            })
          }
          break
        case this.$t('member.address.908954-12'):
          {
            let obj = {
              id: _item.address_id,
              method: 'delete'
            }
            addressUpdate(_item, obj).then((res) => {
              this.getAddressList()
            })
          }
          break
      }
    },
    clickCancel() {
      this.addType = 'post'
      this.addressInfoFrom = {}
      this.dailogVisible = false
    }
  },
  watch: {
    dailogVisible(newValue, oldValue) {
      if (!newValue) {
        this.addressInfoFrom = {}
      }
    }
  }
}
</script>
