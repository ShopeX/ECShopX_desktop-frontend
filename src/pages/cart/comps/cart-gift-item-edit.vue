/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-gift-item-edit">
    <SpGoodsItem :info="info" :item_ts="false">
      <slot class="specs">
        <SkuSelector :info="info" :value="cartGiftInfo.sku_id" @change="handleChangeSku" />
      </slot>
    </SpGoodsItem>
    <div class="cart-gift-item-edit-actions">
      <span @click="handleClose">{{ $t('comps.cart-gift-item-edit.650824-0') }}</span>
    </div>
    <slot name="btns">
      <div class="cart-gift-item-edit-btns">
        <SpButton type="primary" @click="handleClickBtn('confirm')">{{ $t('comps.cart-gift-item-edit.650824-1') }}</SpButton>
      </div>
    </slot>
  </div>
</template>

<script>
import { SpGoodsItem } from '@/components'
import SkuSelector from '@/components/sku-selector'

export default {
  components: { SpGoodsItem, SkuSelector },

  props: {
    info: Object, // 包括sku的商品信息
    cartGiftInfo: Object // 购物车中的信息
  },

  data() {
    return {
      curSku: null
    }
  },

  methods: {
    handleClose() {
      this.$emit('close', this.cartGiftInfo)
    },

    handleChangeSku(curSku, curSkuInfo) {
      this.curSku = curSku
      this.$emit('change', curSku)
    },

    async handleClickBtn() {
      if (!this.curSku) {
        this.$Message.error(this.$t('comps.cart-gift-item-edit.650824-2'))
        return
      }
      this.$emit('confirm', this.curSku)
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-gift-item-edit {
  background: $color-bg-gray;
  position: relative;
  z-index: 5;
  &-actions {
    position: absolute;
    top: 16px;
    right: 10px;
    font-size: 14px;
    color: #525252;
    cursor: pointer;
  }
  &-btns {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 76%;
    text-align: right;
    .sp-btn {
      width: 200px;
      margin: 0 10px;
      font-size: $font-size-large;
    }
  }

  .goods-sku__wrap {
    width: 70%;
  }
}
</style>
