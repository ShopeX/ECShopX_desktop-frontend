/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="cart-item" :class="{ 'has-selection': hasSelection, 'novalid': !valid }">
    <div class="cart-item-selection" v-if="hasSelection">
      <div class="lose-eff" v-if="!valid">{{ $t('comps.cart-item.988097-0') }}</div>
      <SpRadio
        v-else
        type="checkbox"
        :value="isSelect"
        :disabled="!info.valid"
        @change="handleSelection"
      />
    </div>
    <div class="cart-item-cont">
      <slot>
        <SpGoodsItem :info="info" :show-promotion="false" @click="handleClickItem" />
      </slot>
    </div>
    <div class="cart-item-actions" v-if="!noActions">
      <slot name="actions">
        <span href="javascript:;" @click="handlePerformAct('edit')">{{ $t('comps.cart-item.988097-1') }}</span><span>/</span
        ><span href="javascript:;" @click="handlePerformAct('remove')">{{ $t('comps.cart-item.988097-2') }}</span>
      </slot>
    </div>
    <div class="cart-item-promos">
      <SpItemPromo v-for="promo in info.promotions" :key="promo.promotion_id" :info="promo" />
    </div>
  </div>
</template>

<script>
import { SpGoodsItem } from '@/components'

export default {
  components: { SpGoodsItem },

  props: {
    hasSelection: {
      type: Boolean,
      default: true
    },
    isSelect: Boolean,
    noActions: Boolean,
    info: Object
  },

  computed: {
    valid: function() {
      // 当且仅当valid == false时置灰
      const { valid } = this.info
      if (valid == undefined) {
        return true
      }
      return valid
    }
  },

  methods: {
    handleSelection(e) {
      const { cart_id, is_checked } = this.info
      this.$emit('selection', cart_id, !is_checked)
    },
    handleClickItem() {
      const { item_id } = this.info
      this.$router.push(`/items/${item_id}`)
    },
    handlePerformAct(action) {
      this.$emit(action, this.info)
    }
  }
}
</script>

<style lang="scss" scoped>

$img-ratio: 0.723;

.cart-item {
  position: relative;
  &.novalid {
    opacity: 0.4;
  }
  .lose-eff {
    padding: 1px 5px;
    color: #fff;
    background: #232323;
  }
  &.has-selection {
    padding-left: 50px;
    .cart-item-selection {
      position: absolute;
      top: 50%;
      margin: -10px 0 0 -50px;
    }
  }
  &-cont {
    position: relative;
  }
  .goods-item {
    padding-left: 180px;
    min-height: 210px;
    margin: 0 0 20px;
    @include clearfix();
    &__img {
      @include pdt-img(152px);
      height: calc(152 / #{$img-ratio}) + px;
      border: 1px solid #ccc;
      position: absolute;
      float: left;
      margin-left: -180px;
    }
    &__right {
      width: auto;
      float: none;
      font-size: 16px;
      line-height: 1.5;
    }
    &__title {
      color: #232323;
      margin: 0 0 12px;
      padding: 16px 0 0;
    }
    &__specs {
      &-bn,
      &-color,
      &-size {
        display: block;
        margin: 0 0 5px;
      }
    }
    &__price {
      position: absolute;
      bottom: 10px;
    }
  }

  &-actions {
    position: absolute;
    top: 18px;
    right: 10px;
    font-size: 14px;
    color: #525252;
    span {
      cursor: pointer;
    }
  }
}
</style>
