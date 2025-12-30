/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-address-picker {
  font-size: 0;
  .y-s {
    // float: left;
    display: inline-block;
    width: 33.33%;
    &:not(:first-child) {
      padding-left: 2px;
    }
  }
  &.vertical {
    .y-s {
      float: none;
      width: 100%;
      margin-bottom: 10px;
      &:not(:first-child) {
        padding-left: 0;
      }
    }
  }
}
</style>

<template>
  <div class="sp-address-picker" :class="{ 'vertical': vertical }">
    <div class="y-s">
      <!-- {{this.province}} -->
      <SpSelect
        v-model="province"
        :disabled="disabled"
        :data="provinceDs"
        :placeholder="$t('sp-address.index.346474-0')"
        @change="onChangeProvince"
      ></SpSelect>
    </div>
    <div class="y-s">
      <!-- {{this.city}} -->
      <SpSelect
        v-model="city"
        :disabled="disabled"
        :data="cityDs"
        :value="1"
        :placeholder="$t('sp-address.index.346474-1')"
        @change="onChangeCity"
      ></SpSelect>
    </div>
    <div class="y-s" v-if="showCountry">
      <SpSelect
        v-model="county"
        :disabled="disabled || county_disabled"
        :data="countyDs"
        :value="1"
        :placeholder="$t('sp-address.index.346474-2')"
        @change="onChangeCounty"
      ></SpSelect>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import { mapActions } from 'vuex'

export default {
  name: 'SpAddress',
  props: {
    value: Array,
    vertical: {
      type: Boolean,
      default: false
    },
    showCountry: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
    // valueType: {
    //   validator (value) {
    //     return oneOf(value, ['label', 'value', 'default'])
    //   },
    //   default () {
    //     return 'value'
    //   }
    // }
    // data: Array
  },
  data() {
    return {
      region: null,
      provinceDs: [],
      cityDs: [],
      countyDs: [],
      province: '',
      city: '',
      county: '',
      county_disabled: false
    }
  },
  created() {
    this.getAreaList()
    // this.data.forEach(item => {
    //   this.provinceDs.push({ label: item.value, value: item.id })
    // })
  },
  watch: {
    value: {
      immediate: true, // 监听后立即调用
      handler: function(val) {
        try {
          this.province = ''
          this.city = ''
          this.county = ''
          // [this.province,this.city,this.county]=[...val]
          val.forEach((item, index) => {
            if (index === 0) {
              this.province = item
            }
            if (index === 1) {
              this.city = item
            }
            if (index === 2) {
              this.county = item
            }
          })
          if (this.region) {
            this.setCurrentValue()
          } else {
            this.watchRegion()
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  methods: {
    ...mapActions('address', ['getRegion']),
    async getAreaList() {
      let region = await this.getRegion()
      this.region = region
      region.forEach((item) => {
        this.provinceDs.push({ label: item.label, value: item.id })
      })
    },
    watchRegion() {
      setTimeout(() => {
        if (!this.region) {
          this.watchRegion()
        } else {
          this.setCurrentValue()
        }
      }, 1000)
    },
    setCurrentValue() {
      this.cityDs = []
      this.countyDs = []
      this.region.forEach((item) => {
        if (item.id === this.province) {
          if (item.children) {
            item.children.forEach((sitem, sindex) => {
              this.cityDs.push({ label: sitem.label, value: sitem.id })
              if (sitem.id === this.city) {
                if (sitem.children) {
                  sitem.children.forEach((citem) => {
                    this.countyDs.push({ label: citem.label, value: citem.id })
                  })
                  this.county_disabled = false
                } else {
                  this.county_disabled = true
                }
              }
            })
          }
        }
      })
    },
    onChangeProvince(e) {
      this.cityDs = []
      this.region.forEach((item) => {
        if (item.id === this.province) {
          if (item.children) {
            item.children.forEach((sitem, sindex) => {
              this.cityDs.push({ label: sitem.label, value: sitem.id })
              if (sindex === 0) {
                if (!sitem.children) {
                  this.county_disabled = true
                } else {
                  this.county_disabled = false
                }
              }
            })
          }
        }
      })
      this.city = ''
      this.county = ''
      this.onChange()
    },
    onChangeCity(e) {
      if (!this.county_disabled) {
        this.countyDs = []
        this.region.forEach((item) => {
          if (item.id === this.province) {
            item.children &&
              item.children.forEach((sitem, sindex) => {
                if (sitem.id === this.city) {
                  sitem.children &&
                    sitem.children.forEach((citem) => {
                      this.countyDs.push({
                        label: citem.label,
                        value: citem.id
                      })
                    })
                }
              })
          }
        })
        this.county = ''
      }
      this.onChange()
      this.onSearch()
    },
    onChangeCounty(e) {
      this.onChange()
    },
    onChange() {
      let v = []
      this.province && v.push(this.province)
      this.city && v.push(this.city)
      this.county && v.push(this.county)

      // if (this.valueType === 'label') {
      let name = []
      let value = []
      this.region.forEach((item) => {
        if (item.id === this.province) {
          name.push(item.label)
          value.push(item.value)
          item.children &&
            item.children.forEach((sitem, sindex) => {
              if (sitem.id === this.city) {
                name.push(sitem.label)
                value.push(sitem.value)
                sitem.children &&
                  sitem.children.forEach((citem) => {
                    if (citem.id === this.county) {
                      name.push(citem.label)
                      value.push(citem.value)
                    }
                  })
              }
            })
        }
      })
      this.$emit('onChange', name, value)
      console.log(name, value, 'ddd');
      this.$emit('input', v)
    },
    onSearch() {
      this.$emit('onSearch')
    }
  }
}
</script>