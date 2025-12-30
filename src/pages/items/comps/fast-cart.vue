/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="fast-cart">
    <SpModal class="add-cart-modal" v-model="showModal" :width="400" @Cancel="handleClose">
      <div class="header-title">{{ $t('comps.fast-cart.338393-0') }}</div>
      <div class="modal-goods">
        <div class="modal-row">
          <span class="modal-row__title">{{ $t('comps.fast-cart.338393-1') }}</span>
          <div class="modal-row__value">
            <span class="name">{{ info.item_name }}</span>
          </div>
        </div>
        <div class="modal-row">
          <span class="modal-row__title">{{ $t('comps.fast-cart.338393-2') }}</span>
          <div class="modal-row__value">
            <SpPrice :value="info.price" unit="cent"></SpPrice>
          </div>
        </div>
        <!-- 规格 -->
        <SkuSelector :info="info" @change="handleChangeSku" />
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
        <div class="modal-row">
          <span class="modal-row__title">{{ $t('comps.fast-cart.338393-3') }}</span>
          <div class="modal-row__value">
            <SpNumInput
              class="t-num"
              :value="quantity"
              :max="info.store"
              size="sm"
              @increase="handleClickNumInput($event, info, 'increase')"
              @decrease="handleClickNumInput($event, info, 'decrease')"
              @change="handleQuantityChange($event, info, 'change')"
            ></SpNumInput>
            <span>{{ $t('comps.fast-cart.338393-4') }}{{ info.store }}</span>
          </div>
          <div
            class="modal-btn"
            :class="{ 'disabled': info.item_spec_desc && !curSku }"
            @click="handleModalAddCart()"
          >
            {{ $t('comps.fast-cart.338393-0') }}
          </div>
        </div>
      </div>
    </SpModal>
  </div>
</template>

<script>
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
      curSku: {}
    }
  },
  watch: {
    value(val) {
      if (val == true) {
        this.selectedAttr = []
        this.quantity = 1
      }
      if (val != this.showModal) {
        this.showModal = val
      }
    }
  },
  mounted() {
    this.showModal = this.value
  },
  methods: {
    handleClose() {
      this.showModal = false
      this.$emit('on-close', false)
    },
    specBtnClick(attr_id, index) {
      this.$set(this.selectedAttr, index, attr_id)
    },
    handleChangeSku(sku, selection, specSkuList) {
      this.curSku = sku
    },
    handleModalAddCart() {
      if (this.selectedAttr.length == 0) {
        return
      }

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
  .header-title {
    line-height: 24px;
    font-size: 18px;
    color: #666;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #d8d8d8;
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
        margin-right: 15px;
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
        span {
          color: $color-brand-primary;
          font-size: 24px;
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
