/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-fastbuy {
  &-hd {
    height: 46px;
    line-height: 46px;
    padding: 0 14px;
    font-size: 14px;
    border-bottom: 1px solid $color-border-gray;
  }
  &-bd {
    padding: 10px 0;
  }
  &-ft {
    height: 40px;
    border-top: 1px solid $color-border-gray;
  }
  .modal-row {
    @include clearfix();
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
    &__title {
      float: left;
      width: 70px;
      text-align: right;
      font-size: 13px;
      margin-right: 10px;
    }
    &__value {
      float: left;
      font-size: 13px;
      .price__symbol,
      .price__int,
      .price__decimal {
        font-weight: normal;
      }
    }
  }
  .goods-sku__wrap {
    margin-top: 0;
  }
  .sku-item__group {
    margin-bottom: 0;
  }
  .sku-item__group-hd {
    width: 70px;
    text-align: right;
    font-size: 13px;
    margin-right: 10px;
    margin-top: 9px;
  }
  .sku-item__group-bd {
    float: left;
    @include clearfix();
    .sku-item {
      height: 32px;
      margin: 0 10px 10px 0;
      line-height: 32px;
      img {
        border-radius: 0;
      }
    }
  }
}
</style>
<template>
  <SpModal class="sp-fastbuy" v-model="showModal" :width="500" :height="400">
    <div class="sp-fastbuy-hd">{{ $t('sp-fastbuy.index.869986-0') }}</div>
    <div class="sp-fastbuy-bd" v-if="info">
      <div class="modal-row">
        <span class="modal-row__title">{{ $t('sp-fastbuy.index.869986-1') }}</span>
        <div class="modal-row__value">{{ info.item_name }}</div>
      </div>
      <div class="modal-row">
        <span class="modal-row__title">{{ $t('sp-fastbuy.index.869986-2') }}</span>
        <div class="modal-row__value">
          <SpPrice :value="info.price" unit="cent"></SpPrice>
        </div>
      </div>
      <SkuSelector v-if="itemInfo" :info="itemInfo" @change="handleChangeSku" />
      <div class="modal-row" v-if="itemInfo">
        <span class="modal-row__title">{{ $t('sp-fastbuy.index.869986-3') }}</span>
        <div class="modal-row__value">
          <SpNumInput
            class="t-num"
            :value="itemInfo.quantity"
            :max="itemInfo.store"
            size="sm"
            @change="handleQuantityChange($event, curItem, 'change')"
          ></SpNumInput>
          <span>{{ $t('sp-fastbuy.index.869986-4') }}{{ itemInfo.store }}</span>
        </div>
      </div>
    </div>
    <div class="sp-fastbuy-ft">
      <div class="goods-btns">
        <!-- <template v-if="props.info.approve_status == 'instock'">
          <SpButton class="btn-buy btn-warning" disabled>商品已下架</SpButton>
        </template>
        <template v-else-if="props.info.is_gift">
          <SpButton class="btn-buy btn-warning" disabled>赠品不可购买</SpButton>
        </template>
        <template v-else>
          <template v-if="props.info.activity_type === 'group' || props.info.activity_type === 'seckill' || props.info.activity_type === 'limited_time_sale'">
            <SpButton class="btn-buy btn-cart" @click="!props.buyLoading && listeners['btn-click']('fastbuy')" v-if="props.info.startActivity">
              {{props.activityText}}
            </SpButton>
            <SpButton class="btn-buy btn-warning" disabled v-else>活动即将开始</SpButton>
          </template>
          <template v-else>
            <SpButton class="btn-buy btn-cart" @click="!props.buyLoading && listeners['btn-click']('cart')">
              {{ $t('sp-fastbuy.index.869986-0') }}
            </SpButton>
            <SpButton
            class="btn-buy btn-fast-buy"
            @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
          >立即购买</SpButton>
          </template>
        </template> -->
      </div>
    </div>
    <!-- <SkuSelector :info="curItem" @change="handleChangeSku" />
      <div class="modal-row">
        <span class="modal-row__title">{{ $t('sp-fastbuy.index.869986-3') }}</span>
        <div class="modal-row__value">
          <SpNumInput class="t-num" :value="curItem.quantity" :max="curItem.store" size="sm" @change="handleQuantityChange($event, curItem, 'change')"></SpNumInput>
          <span>{{ $t('sp-fastbuy.index.869986-4') }}{{ curItem.store }}</span>
        </div>
        <div class="modal-btn" :class="{ disabled: curItem.item_spec_desc&&!curSku}" @click="handleModalAddCart">{{ $t('sp-fastbuy.index.869986-0') }}</div>
      </div>
    </div> -->
  </SpModal>
</template>

<script>
export default {
  name: 'SpFastBuy',
  props: {
    info: Object,
    value: Boolean
  },
  data() {
    return {
      showModal: this.value,
      itemInfo: null
    }
  },
  watch: {
    value(val) {
      this.showModal = val
      if (val) {
        this.getItemDetail()
      }
    },
    showModal(val) {
      this.$emit('input', val)
    }
  },
  created() {
    // this.getItemDetail()
  },
  methods: {
    handleUpdateImgs() {},
    handleChangeSku() {},
    handleQuantityChange() {},
    async getItemDetail() {
      const { item_id, distributor_id } = this.info
      const res = await this.$api.item.detail(item_id, { distributor_id })
      this.itemInfo = res
    }
  }
}
</script>
