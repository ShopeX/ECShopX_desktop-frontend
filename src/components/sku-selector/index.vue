/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="goods-sku__wrap">
    <template v-if="!info.nospec">
      <div class="goods-sku__body">
        <div
          class="sku-item__group clearfix"
          v-for="(group, idx) in info.item_spec_desc"
          :key="idx"
        >
          <div class="sku-item__group-hd">{{ `${group.spec_name}:` }}</div>
          <div class="sku-item__group-bd">
            <div
              v-for="spec in group.spec_values"
              :key="spec.spec_value_id"
              :class="[
                'sku-item',
                {
                  'sku-item__img': !!spec.spec_image_url,
                  'is-active': spec.spec_value_id === selection[idx],
                  'is-disabled': disabledDict[spec.spec_value_id]
                }
              ]"
              :title="spec.spec_value"
              @click.prevent="handleSelectSpec(spec, idx)"
            >
              <img v-if="spec.spec_image_url" :src="spec.spec_image_url" />
              <!-- <img v-if="spec.spec_image_url" :src="spec.spec_image_url" /> -->
              <span>{{ spec.spec_value_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SkuSelector',
  props: {
    info: Object,
    value: [String, Number] // sku_id
  },

  data() {
    return {
      selection: [],
      disabledDict: {},
      specSkuList: []
    }
  },

  computed: {
    hiddenSkcs() {
      const info = this.info
      // return resolveHiddenSkcs(info)
    },
    isOutStock() {
      let status = true
      const info = this.info
      // return resolveHiddenSkcs(info)
    },
    isOutStock() {
      let status = true
      for (let key in this.specSkuList) {
        if (this.specSkuList[key].store <= 0) {
          status = false
        }
      }
      return !status
    }
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler (val) {
  //       if (this.info && this.info.sku && val) {
  //         const curSku = this.info.sku[val]
  //         this.curSku = curSku
  //       }
  //     }
  //   }
  // },
  created() {
    let list = this.initSpecSku(this.info.spec_items)
    console.log('---SkuSelectorinfo----', this.info)
    this.specSkuList = list
    console.log('---specSkuList----', this.specSkuList)
    const selection = this.resolveSelection()
    this.updateCurSku(selection, true)
  },
  mounted() {
    console.log(this.info.nospec, this.isOutStock)
  },
  methods: {
    // 初始化多规格sku
    initSpecSku(data) {
      let tmp = []
      data.forEach((v) => {
        let skuKeyArray = []
        let skuValueArray = []
        v.item_spec.forEach((vv) => {
          skuKeyArray.push(vv.spec_value_id)
          skuValueArray.push(vv.spec_value_name)
        })
        tmp[skuKeyArray.join('-')] = {
          ...v,
          text: skuValueArray.join(','),
          store: Number(v.store)
        }
      })
      return tmp
    },
    resolveSelection() {
      let selection = Array(this.info.item_spec_desc.length).fill(null)
      return selection
    },
    calcDisabled(selection) {
      const skus = this.specSkuList
      const disabledDict = {}
      const makeReg = (sel, row, val) => {
        const tSel = sel.slice()
        const regStr = tSel.map((s, idx) => (row === idx ? val : !s ? '(\\d+)' : s)).join('-')
        return new RegExp(`^${regStr}$`)
      }

      const isNotDisabled = (sel, row, val) => {
        const reg = makeReg(sel, row, val)
        for (let key in this.specSkuList) {
          if (key.match(reg)) {
            return this.specSkuList[key].store > 0
          }
        }
      }

      const info = this.info
      let rIdx = 0
      for (let index in info.item_spec_desc) {
        let specItem = info.item_spec_desc[index]
        for (let subIndex in specItem.spec_values) {
          let specVal = specItem.spec_values[subIndex]
          const id = specVal.spec_value_id
          if (!disabledDict[id] && !isNotDisabled(selection, rIdx, id)) {
            disabledDict[id] = 1
          }
        }
        rIdx++
      }

      this.disabledDict = disabledDict
    },
    handleSelectSpec(item, idx, init) {
      const specValId = item.spec_value_id
      // if (this.disabledDict[specValId]) return

      const selection = [...this.selection]
      selection[idx] = selection[idx] === specValId ? null : specValId

      this.updateCurSku(selection)
      this.$emit('selection', item, idx, selection)
    },
    updateCurSku(selection, silent) {
      // 单规格商品
      if (selection.length == 0) {
        return
      }
      this.calcDisabled(selection)
      let curSku
      if (selection.some((s) => !s)) {
        curSku = null
      } else {
        const sku = this.specSkuList[selection.join('-')]
        curSku = sku
      }

      this.selection = selection
      this.$emit('input', curSku)

      let curImg = null

      if (curSku) {
        let curItem = curSku
          ? curSku.item_spec.find(
              (item) =>
                item.item_image_url &&
                Array.isArray(item.item_image_url) &&
                item.item_image_url.length > 0
            )
          : {}
        curImg = curItem ? curItem.spec_image_url : null
      }

      if (!silent) {
        this.$emit('change', curSku, selection, this.specSkuList, curImg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-sku__wrap {
  margin-top: 28px;
  .sku-item {
    background: #fff;
    font-size: 12px;
    margin: 0 14px 6px 0;
    display: inline-block;
    vertical-align: middle;
    padding: 1px;
    border: 1px solid #999;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    transition: all 0.2s;
    font-family: Arial;
    font-size: 12px;
    margin-right: 14px;
    padding: 1px;
    border: 1px solid #999;
    cursor: pointer;
    min-width: 26px;
    /* line-height: 22px; */
    white-space: nowrap;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    padding: 0px 13px;
    background: #ffffff;
    border-radius: 4px;
    line-height: 33px;
    border: 1px solid #dddddd;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 34px;

    &__group {
      margin-bottom: 20px;
      &-hd {
        font-size: 14px;
        display: inline-block;
        width: 70px;
        line-height: 1;
        float: left;
        margin-top: 5px;
      }
    }
    &.is-active {
      color: $color-brand-primary;
      border-color: $color-brand-primary;
    }
    &.is-disabled {
      opacity: 0.3;
      cursor: default;
    }

    img {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 50%;
      left: 0px;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    > span {
      display: inline-block;
      margin: 0 10px;
    }
    &__img {
      position: relative;
      padding-left: 38px;
      &.is-active {
        .sku-item__color-text {
          opacity: 1;
        }
      }
      &-text {
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: -26px;
        margin-left: -30px;
        min-width: 60px;
        display: block;
        text-align: center;
        color: $color-gray-light;
        opacity: 0;
      }
      span {
        display: inline-block;
        // margin: 0 10px;
        vertical-align: top;
      }
    }
  }
}
</style>
