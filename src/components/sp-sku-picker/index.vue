/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="sp-sku-picker">
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
              :style="{
                borderColor: spec.spec_value_id === selection[idx] ? theme : ''
              }"
              :title="spec.spec_value"
              @click.prevent="handleSelectSpec(spec, idx)"
            >
              <img v-if="spec.spec_image_url" :src="spec.spec_image_url" />
              <div class="sku-name">{{ spec.spec_value_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SpSkuPicker',
  props: {
    info: Object,
    theme: String,
    value: [String, Number] // sku_id
  },

  data() {
    return {
      selection: [],
      disabledDict: {},
      specSkus: {}
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
      for (let key in this.specSkus) {
        if (this.specSkus[key].store <= 0) {
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
    this.initSpecSku()
    let selection = this.resolveSelection()
    const { spec_items } = this.info
    const defaultSpec = spec_items.find(spec => spec.store > 0)
    const specIds = defaultSpec.item_spec.map(item => item.spec_value_id)
    selection = [...specIds]
    this.updateCurSku(selection)
  },
  // mounted() {
  //   console.log(this.info.nospec, this.isOutStock)
  // },
  methods: {
    // 初始化多规格sku
    initSpecSku() {
      const { spec_items } = this.info
      spec_items.forEach(spec => {
        const specIds = spec.item_spec.map(item => item.spec_value_id)
        this.specSkus[specIds.join('-')] = spec
      })
    },
    resolveSelection() {
      let selection = Array(this.info.item_spec_desc.length).fill(null)
      return selection
    },
    calcDisabled(selection) {
      const skus = this.specSkus
      const disabledDict = {}
      const makeReg = (sel, row, val) => {
        const tSel = sel.slice()
        const regStr = tSel.map((s, idx) => (row === idx ? val : !s ? '(\\d+)' : s)).join('-')
        return new RegExp(`^${regStr}$`)
      }

      const isNotDisabled = (sel, row, val) => {
        const reg = makeReg(sel, row, val)
        for (let key in this.specSkus) {
          if (key.match(reg)) {
            return this.specSkus[key].store > 0
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
      console.log()
      this.disabledDict = disabledDict
    },
    handleSelectSpec(item, idx, init) {
      if(this.disabledDict[item.spec_value_id]) {
        return
      }

      const specValId = item.spec_value_id
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
        const sku = this.specSkus[selection.join('-')]
        curSku = sku
      }
      this.selection = selection
      this.$emit('change', curSku, selection )
      // console.log('updateCurSku', selection, curSku)
      // this.$emit('input', curSku)

      // let curImg = null

      // if (curSku) {
      //   let curItem = curSku
      //     ? curSku.item_spec.find(
      //         (item) =>
      //           item.item_image_url &&
      //           Array.isArray(item.item_image_url) &&
      //           item.item_image_url.length > 0
      //       )
      //     : {}
      //   curImg = curItem ? curItem.spec_image_url : null
      // }

      
    }
  }
}
</script>

<style lang="scss">
.sp-sku-picker {
  .sku-item {
    &__group {
      margin-bottom: 20px;
      &-hd {
        width: 70px;
        float: left;
        margin-top: 5px;
        color: #888;
      }
      &-bd {
        .sku-item {
          background: #fff;
          font-size: 12px;
          margin: 0 10px 6px 0;
          cursor: pointer;
          text-align: center;
          float: left;
          border: 1px solid #ddd;
          height: 32px;
          padding: 1px;
          line-height: 32px;
          @include clearfix();
          img {
            float: left;
          }
          .sku-name {
            float: left;
            margin: 0 10px;
          }
        }
      }
    }
    &.is-active {
      border-width: 2px;
      color: #fff;
      padding: 0;
    }
    &.is-disabled {
      opacity: 0.3;
      cursor: default;
    }
    img {
      height: 100%;
    }
    &__img {
      height: 36px;
      position: relative;
      line-height: 32px;
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
    }
  }
}
</style>
