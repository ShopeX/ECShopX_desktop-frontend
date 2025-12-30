/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-gift">
    <div class="cart-gift__hd" :class="{ 'hasSelection': hasSelection }">
      <SpItemPromo :info="info" />
    </div>
    <div
      class="cart-gift__item-wraper"
      v-for="(item, index) in info.gifts"
      v-loading="!!giftLoadingIds[item.item_id]"
      :key="index"
    >
      <CartGiftItem
        :info="item"
        :hasSelection="hasSelection"
        @selection="handleSelection"
        @edit="handleEditGiftItem(item)"
      >
        <CartGiftItemEdit
          v-if="giftItemEdits[item.item_id] !== undefined"
          :info="giftItemEdits[item.item_id]"
          :cart-gift-info="item"
          @confirm="handleSkuChange"
          @close="handleCloseGiftItem(item.item_id)"
        />
      </CartGiftItem>
    </div>
  </div>
</template>

<script>
import CartGiftItem from './cart-gift-item'
import CartGiftItemEdit from './cart-gift-item-edit'

export default {
  components: { CartGiftItem, CartGiftItemEdit },
  props: {
    info: {
      type: Object,
      default: function() {
        return {}
      }
    },
    hasSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      giftItemEdits: {},
      giftLoadingIds: {}
    }
  },
  methods: {
    async updateGift(id, sku) {
      const { rel_promotion_id } = this.info
      const item_id = id || sku.item_id
      // 合并传入的sku信息
      const gift = {
        ...this.info.gifts.find((m) => m.item_id === item_id),
        ...sku,
        rel_promotion_id
      }
      await this.$store.dispatch('cart/addGift', gift)
    },

    handleCloseGiftItem(id) {
      const items = { ...this.giftItemEdits }
      delete items[id]
      this.giftItemEdits = items
    },

    handleSkuChange(sku) {
      this.updateGift(sku.item_id, sku)
      this.handleCloseGiftItem(sku.item_id)
    },

    handleSelection(item) {
      this.updateGift(item.item_id)
    },

    toggleItemLoading(item_id) {
      const giftLoadingIds = {
        ...this.giftLoadingIds
      }
      giftLoadingIds[item_id] = !giftLoadingIds[item_id]
      this.giftLoadingIds = giftLoadingIds
    },

    async handleEditGiftItem(item) {
      let { item_id } = item
      const items = { ...this.giftItemEdits }
      if (items[item_id]) {
        return
      }
      this.toggleItemLoading(item_id)
      const { item: info } = await this.$api.item.detail(item_id)
      items[item_id] = info
      this.giftItemEdits = items
      this.toggleItemLoading(item_id)
    }
  }
}
</script>

    <style lang="scss" scoped>
.cart-gift {
  &__hd {
    margin-bottom: 15px;
    height: 20px;
    &.hasSelection {
      padding-left: 50px;
    }
    .sp-btn {
      padding: 0 5px;
    }
    &-text {
      font-size: 14px;
      line-height: 1;
      vertical-align: middle;
      margin-left: 50px;
    }
  }
  .cart-gift__item-wraper {
    position: relative;
  }
  &__selection {
    position: absolute;
    top: 50%;
    left: 0;
    margin: -10px 0 0 0;
  }
  .cart-item {
    margin-left: 50px;
  }
}
</style>
