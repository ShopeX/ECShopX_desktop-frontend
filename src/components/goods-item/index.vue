/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="goods-item" :class="{'invalid': info.valid_lucky == 1}">
    <div class="goods-item__img" @click.stop="handleClick">
      <SpImg :src="info.image_default_id" size="t"></SpImg>
    </div>

    <div class="goods-item__right">
      <div class="goods-item__title" :title="info.title">
        <span>{{ info.title }}</span>
      </div>
      <div class="goods-item__sub-title">
        <span>{{ info.sub_title }}</span>
      </div>
      <slot name="specs">
        <div class="goods-item__specs" v-if="item_ts">
          <span class="goods-item__specs-color">{{ info.color }}</span>
          <span class="goods-item__specs-size">{{ info.size }}</span>
        </div>
      </slot>
      <slot name="price">
        <div class="goods-item__price">
          <SpPrice  :value="info.price"></SpPrice>
          <span v-if="info.quantity" class="goods-item__quantity">x {{info.quantity}}</span>
        </div>
      </slot>
      <slot></slot>
    </div>

    <template v-if="showPromotion">
      <div class="goods-item__promo" v-for="(item, index) in info.promotions" :key="index">
        <SpLabel>{{item.promotion_tag}}</SpLabel>
        <span class="goods-item__promo-name">{{item.promotion_name}}</span>
      </div>
    </template>
    <!-- <div class="goods-item__gifts" v-if="info.gift">
      <div class="goods-item__gifts-hd">
        <span class="gift">[赠品]</span>
        {{ info.gift.promotion_name }}
      </div>
      <div class="goods-item__gifts-bd">
        <div class="gifts-list">
          <span class="gift-item" v-for="(gift, idx) in info.gift.gift_item" :key="idx">
            <span class="gift-item__title">{{ gift.title }}{{idx < info.gift.gift_item.length - 1 ? ';' : ''}}</span>
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import SpStaffBadge from './../staff-badge'
import { resolveImgPath } from '@/utils'
export default {
  name: 'SpGoodsItem',
  props: {
    click: Function,
    info: null,
    item_ts: {
      type: Boolean,
      default: true
    },
    showPromotion: {
      type: Boolean,
      default: true
    }
  },
  components: { SpStaffBadge },
  methods: {
    handleClick () {
      this.$emit('click', this.info)
      const { item_id } = this.info
      this.$router.push(`/items/${item_id}`)
    },
    resolveImgPath (url, size) {
      return (resolveImgPath(url, size))
    }
  }
}
</script>

<style lang="scss" scoped>

$img-ratio:0.723;
.goods-item {
  width: 100%;
  // min-height: 100px;
  margin: 5px 0;
  &__right {
    width: calc(100% - 110px);
    float: right;
  }
  &.invalid {
    color: #9ea7b4;
    .goods-item__img {
      opacity: 0.5;
    }
  }
  @include clearfix();
  &__title {
    @include multi-ellipsis(1);
    .sp-staff-badge {
      margin-right: 2px;
    }
  }
  &__sub-title{
    @include multi-ellipsis(1);
    font-size: 16px;
  }
  &__img {
    @include pdt-img(100px);
          height: calc(100 / #{$img-ratio})+px;
    border: 1px solid $color-brand-primary;
    float: left;
    margin-right: 10px;
    cursor: pointer;
    // position: absolute;
    // margin-left: -110px;
    // width: 100px;
    // height: 100px;
    // line-height: 100px;
    // text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  &__specs {
    &-bn, &-size {
      font-weight: bold;
      margin-right: 10px;
    }
    &-color {
      margin-right: 10px;
    }
    &-num {
      margin: 5px 0;
    }
  }
  &__promo {
    color: $color-active;
  }
  &__staff {
    &-icon {
      display: inline-block;
      height: 20px;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      margin-right: 5px;
      background: $color-active;
      padding: 0 8px;
      color: #fff;
      font-size: $font-size-small;
    }
  }
  &__gifts {
    .gift {
      color: $color-active;
    }
    .gifts-list {
      @include multi-ellipsis(1);
    }
  }
  &__ts {
    margin-top: 5px;
    .quantity {
      width: 60px;
      display: inline-block;
    }
    .price {
      .sp-price {
        font-family: Helvetica;
        font-size: 100%;
      }
      color: $color-invalid;
    }
  }
  &__option {
    float: right;
    .status {
      width: 60px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      background: #b22630;
      display: inline-block;
    }
  }
  .br {
    display: none;
  }
  &__quantity{
    margin-left: 20px;
    vertical-align: middle;
  }
  &__actions {
    position: absolute;
    right: 10px;
    bottom: 0;
    .sp-btn {
      min-width: 130px;
    }
  }
  @include respond(sm) {
    font-size: 14px;
    &__img {
      @include pdt-img(100px);
      margin-right: 5px;
    }
    .br {
      display: block;
    }
    &__right {
      width: calc(100% - 105px);
    }
    &__promo, &__gifts {
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
