/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="goods-points-sku__wrap">
    <div
      class="spec-modal"
      v-if="isShowSpecModal && modalSpecIndex >= 0"
      :style="{ bottom: `${bottomDistance}px` }"
      ref="modal"
    >
      <div class="title">{{ info.item_spec_desc[modalSpecIndex].spec_name }}</div>
      <div
        v-for="(spec, index) in info.item_spec_desc[modalSpecIndex].spec_values"
        :key="spec.spec_value_id"
        :class="[
          'sku-item',
          {
            'sku-item__img': !!spec.spec_image_url && !showDetail,
            'is-active': spec.spec_value_id === selection[modalSpecIndex],
            'is-disabled': disabledDict[spec.spec_value_id]
          }
        ]"
        :title="spec.spec_value"
        @click.prevent="handleSelectSpec(spec, modalSpecIndex, disabledDict[spec.spec_value_id])"
      >
        <img v-if="spec.spec_image_url && !showDetail" :src="spec.spec_image_url" />
        <span>{{ spec.spec_value_name }}</span>
      </div>
    </div>
    <template v-if="!info.nospec">
      <div class="goods-sku__body" ref="skuSelector">
        <div
          class="sku-item__group clearfix"
          v-for="(group, idx) in info.item_spec_desc"
          :key="idx"
        >
          <div class="sku-item__group-hd">{{ group.spec_name }}</div>
          <div class="sku-item__group-bd" :style="{ overflowX: showDetail ? 'auto' : 'hidden' }">
            <div
              v-for="(spec, index) in group.spec_values"
              :key="spec.spec_value_id"
              :class="[
                'sku-item',
                {
                  'sku-item__img': !!spec.spec_image_url && !showDetail && !isDetail,
                  'is-active': spec.spec_value_id === selection[idx],
                  'is-disabled': disabledDict[spec.spec_value_id],
                  'is-hidden':
                    currentOver &&
                    currentOver[idx] &&
                    currentOver[idx].isOver &&
                    currentOver[idx].overTagIndex === index
                }
              ]"
              :title="spec.spec_value"
              @click.prevent="handleSelectSpec(spec, idx, disabledDict[spec.spec_value_id])"
            >
              <img
                v-if="spec.spec_image_url && !showDetail && !isDetail"
                :src="spec.spec_image_url"
              />
              <span>{{ spec.spec_value_name }}</span>
            </div>

            <div
              :class="[
                'wrapper-icon',
                {
                  'is-active': modalSpecIndex === idx
                }
              ]"
              v-if="currentOver && currentOver[idx] && currentOver[idx].isOver"
              @click="handleShowModal(idx)"
            >
              <div class="ec-icon ec-icon-right"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { log } from '@/utils'

function resolveHiddenSkcs(info) {
  const { spec_desc = {} } = info
  const specDescs = Object.values(spec_desc).map((s) => Object.values(s))
  const ret = {}

  const isAllStockEmpty = (specSku, id) => {
    return Object.keys(specSku).every((key) => {
      const sId = key.split('_')[0]
      if (sId != id) {
        return true
      } else {
        return specSku[key].store <= 0
      }
    })
  }
  if (specDescs[0] && specDescs[0].some((t) => 'spec-colorboxs' in t)) {
    // color specs
    specDescs[0].forEach((t) => {
      const { spec_value_id } = t
      const isEmpty = isAllStockEmpty(info.spec.specSku, spec_value_id)
      if (isEmpty) {
        ret[spec_value_id] = isEmpty
      }
    })
  }

  return ret
}

export default {
  name: 'SkuSelector',
  props: {
    info: Object,
    value: [String, Number], // sku_id
    showDetail: false,
    isDetail: false
  },

  data() {
    return {
      selection: [],
      disabledDict: {},
      specSkuList: [],
      currentOver: [],
      isShowSpecModal: false,
      modalSpecIndex: undefined,
      bottomDistance: 0
    }
  },

  computed: {
    hiddenSkcs() {
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
    this.specSkuList = list

    const selection = this.resolveSelection()
    this.updateCurSku(selection, true)
  },
  mounted() {
    this.computedOverItem()
  },
  methods: {
    //展示模板
    handleShowModal(index) {
      let tagHeight = 34
      let marginBottom = 20
      let specLength = this.info.item_spec_desc.length

      let diffLength = specLength - index - 1

      this.bottomDistance = diffLength * tagHeight + marginBottom

      if (index === specLength - 1) {
        this.bottomDistance = 0
      }

      this.modalSpecIndex = index

      if (this.isShowSpecModal) {
        this.modalSpecIndex = undefined
      }

      this.isShowSpecModal = !this.isShowSpecModal

      // const _this = this

      // this.$nextTick(() => {
      //   console.log(_this.$refs.modal.style)
      //   _this.$refs.modal.style.bottom = _this.bottomDistance
      // })
    },
    //计算规格超出下标
    computedOverItem() {
      if (!this.info.nospec) {
        const childNodes = this.$refs.skuSelector.childNodes

        for (let i = 0; i < childNodes.length; i++) {
          let tagWrap = childNodes[i].children[1]
          let tagLength = tagWrap.children.length
          let measureWidth = 0
          let wrapperWidth = tagWrap.offsetWidth
          for (let j = 0; j <= tagLength - 1; j++) {
            measureWidth += tagWrap.children[j].offsetWidth + 14
            if (measureWidth > wrapperWidth) {
              this.currentOver.push({
                isOver: true,
                overItemIndex: i,
                overTagIndex: j
              })
              break
            } else if (j === tagLength - 1 && measureWidth < wrapperWidth) {
              this.currentOver.push({
                isOver: false,
                overItemIndex: i,
                overTagIndex: undefined
              })
              break
            }
          }
        }
      }

      console.log(this.currentOver)
    },
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
    handleSelectSpec(item, idx, isDisabled) {
      console.log('---handleSelectSpec---', isDisabled)
      if (isDisabled) {
        return
      }
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
      this.selection = selection
      this.$emit('input', curSku)
      if (!silent) {
        this.$emit('change', curSku, selection, this.specSkuList, curImg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #d92128;
.goods-points-sku__wrap {
  margin-top: 28px;

  .spec-modal {
    width: 430px;
    max-height: 325px;
    background: #ffffff;
    box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    padding: 20px;
    z-index: 1;
    overflow: auto;
    right: 22px;

    .title {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #444444;
      line-height: 17px;
      margin-bottom: 15px;
    }

    .sku-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .sku-item {
    background: #fff;
    font-family: Arial;
    font-size: 12px;
    margin-right: 14px;
    /* display: inline-block; */
    /* vertical-align: middle; */
    padding: 1px;
    border: 1px solid #999;
    cursor: pointer;
    min-width: 26px;
    /* line-height: 22px; */
    padding: 1px;
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
    float: left;
    flex-shrink: 0;
    height: 34px;
    &__group {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      &-hd {
        @include pointitem-detail-title();
      }
      &-bd {
        display: flex;
        position: relative;

        .wrapper-icon {
          line-height: 34px;
          position: absolute;
          right: 0;
          width: 13px;
          height: 34px;
          border-radius: 4px;

          &.is-active {
            background: $primary-color;

            .ec-icon-right {
              color: white;

              &:hover {
                color: white;
                cursor: pointer;
              }
            }
          }

          .ec-icon-right {
            position: absolute;
            right: -8px;
            /* right: 0; */
            top: 50%;
            left: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translate(-50%, -50%);

            &:hover {
              color: $primary-color;
              cursor: pointer;
            }

            &.is-active {
            }
          }
        }
      }
    }
    &.is-active {
      color: $primary-color;
      border-color: $primary-color;

      span {
        color: $primary-color;
      }
    }
    &.is-hidden {
      visibility: hidden;
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
        margin: 0 10px;
        vertical-align: top;
      }
    }
  }
}
</style>
