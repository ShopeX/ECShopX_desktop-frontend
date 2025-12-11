/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="fast-cart">
    <SpModal
      class="add-cart-modal"
      v-model="showModal"
      :width="520"
      @Cancel="handleClose"
      :gradualTitleBackground="true"
      :top16="true"
    >
      <div class="header-title" :class="{ gradualTitleBackground: true }">
        {{ $t('comps.point-cart.059340-0') }}
      </div>
      <div class="modal-goods point-goods">
        <div class="modal-row flexbox">
          <div class="goods_img">
            <img :src="curImg" />
          </div>
          <div class="column2">
            <div class="column_name">
              {{ info.item_name }}
            </div>
            <div class="column2_div">
              <span class="modal-row__title">{{ $t('comps.point-cart.059340-1') }}</span>
              <div class="modal-row__value">
                <SpPrice
                  :defaultValue="$t('comps.point-cart.059340-2', [curSku.point])"
                  unit=""
                  symbol=""
                  v-if="curSku"
                ></SpPrice>
                <SpPrice :defaultValue="$t('comps.point-cart.059340-3', [info.point])" unit="" symbol="" v-else></SpPrice>
              </div>
            </div>
            <div v-if="curSku || info.nospec" class="column2_div">
              <span class="modal-row__title">{{ $t('comps.point-cart.059340-4') }}</span>
              <div class="modal-row__value">
                <span class="name">{{ curSku ? curSku.store : info.store }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 规格 -->
        <SkuSelector :info="info" @change="handleChangeSku" :showDetail="true" />

        <!-- <div v-if="!info.nospec">
            <div
                class="modal-row"
                v-for="(item, index) in info.item_spec_desc"
                :key="index"
            >
                <span class="modal-row__title">{{item.spec_name}}：</span>
                <div class="modal-row__value">
                    <template v-for="attr in item.spec_values">
                    <div
                        :class="{'active': attr.spec_value_id == selectedAttr[index]}"
                        @click="specBtnClick(attr.spec_value_id, index)"
                        :key="attr.spec_value_id"
                        class="spec-item"
                    >
                        <span class="label">{{attr.spec_value_name}}</span>
                    </div>
                    </template>
                </div>
            </div>
        </div> -->
        <div class="modal-row bottom">
          <div class="modal-row__value">
            <SpNumInput
              class="t-num"
              :value="quantity"
              :max="info.store"
              @increase="handleClickNumInput($event, info, 'increase')"
              @decrease="handleClickNumInput($event, info, 'decrease')"
              @change="handleQuantityChange($event, info, 'change')"
            ></SpNumInput>
          </div>
          <div class="modal-btn" :class="{ disabled: isDisabled }" @click="handleModalAddCart()">
            {{ $t('comps.point-cart.059340-5') }}
          </div>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import SkuSelector from '@/components/sku-point-selector'
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    value: Boolean
  },
  data() {
    return {
      quantity: 1,
      selectedAttr: [],
      showModal: false,
      curSku: null,
      curImg: ''
    }
  },
  components: {
    SkuSelector
  },
  computed: {
    isDisabled() {
      if (!this.info.nospec) {
        return this.info.item_spec_desc && !this.curSku
      } else {
        console.log('nospec')
        console.log(this.quantity)
        return this.quantity < 0
      }
    }
  },
  watch: {
    value(val) {
      if (val == true) {
        this.selectedAttr = []
        this.quantity = 1
        console.log('--watch value---', this.info)
        this.curImg = this.info && this.info.pics && this.info.pics[0] ? this.info.pics[0] : ''
      }
      if (val != this.showModal) {
        this.showModal = val
        this.curSku = null
      }
    }
  },
  mounted() {
    this.showModal = this.value
  },
  updated() {},
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('on-close', false)
    },
    specBtnClick(attr_id, index) {
      this.$set(this.selectedAttr, index, attr_id)
    },
    handleChangeSku(sku, selection, specSkuList, curImg) {
      // this.selectedAttr =selection.filters(item=>item!='')
      this.curSku = sku

      console.log('---handleChangeSku-----')
      console.log('----sku---', sku)
      console.log('----curImg---', curImg)
      if (curImg) {
        this.curImg = curImg
      } else {
        this.curImg = this.info && this.info.pics && this.info.pics[0] ? this.info.pics[0] : ''
      }
    },
    handleModalAddCart() {
      // if (!this.curSku) {
      //   return;
      // }
      if (this.isDisabled) {
        return
      }
      this.showModal = false
      this.$emit('input', false)
      this.$emit('on-add-cart', this.quantity, this.curSku)
    },
    handleClickNumInput(val, type) {
      if (val) {
        this.quantity = val
      }
    },
    handleQuantityChange(val) {
      this.quantity = val
    }
  }
}
</script>

    <style lang="scss" scoped>
.add-cart-modal {
  .modal-btn {
    line-height: 36px !important;
  }
  .sp-num-input__btn {
    line-height: 40px !important;
  }
  .sku-item {
    line-height: 32px !important;
  }
  .goods-sku__wrap {
    .sku-item {
      padding: 0 16px;
      border-radius: 3px;
      background: #f5f5f5;
      span {
      }
    }
  }
  .header-title {
    line-height: 24px;
    font-size: 20px;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #d8d8d8;

    &.gradualTitleBackground {
      background: linear-gradient(to right, #d50028, #e0b5fd);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: white;
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      padding-top: 15px;
    }
  }

  .modal-goods {
    padding: 30px 20px;

    .modal-row {
      margin-bottom: 10px;
      &__title {
        font-size: 14px;
        color: #666;
        word-break: break-all;
        display: inline-block;
        width: 90px;
        line-height: 36px;
      }
      &__value {
        font-size: 14px;
        color: #666;
        word-break: break-all;
        display: inline-block;
        width: calc(100% - 110px);
        vertical-align: middle;
        .name {
          @include multi-ellipsis(2);
        }
        .sp-num-input {
          margin-right: 10px;
        }
        .spec-item {
          line-height: 30px;
          height: 30px;
          cursor: pointer;
          position: relative;
          display: inline-block;
          padding: 0 12px;
          font-size: 14px;
          color: #666;
          border: 1px solid #ddd;
          margin: 0 10px 10px 0;
          &.active {
            border-color: $color-brand-primary;
          }
        }
      }
      .sp-price {
        color: $color-brand-primary;
        font-size: 24px;
      }
    }
    &.point-goods {
      .modal-row {
        .goods_img {
          width: 230px;
          height: 230px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .flexbox {
        display: flex;
        .column2 {
          padding: 2px 15px;
          flex: 1;

          display: flex;
          //justify-content: center;
          /* align-items: center; */
          flex-direction: column;

          .column2_div {
            line-height: 36px;
            .modal-row__title {
              @include pointitem-detail-title();
            }
          }
          .column_name {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 30px;
            @include multi-ellipsis(2);
            min-height: 60px;
            word-break: break-word;
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        .modal-btn {
          margin: 0;
        }
      }
    }
  }

  .modal-btn {
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 30px;
    margin: 30px auto 10px;
    width: 100px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background-color: $color-brand-primary;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      background-color: #a9a9a9;
    }
  }
}
</style>
