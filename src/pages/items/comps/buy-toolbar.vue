/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template functional>
  <div class="goods-btns">
    <template v-if="props.info.approve_status == 'instock'">
      <SpButton class="btn-buy btn-warning" disabled>商品已下架</SpButton>
      <!-- <SpButton class="btn-buy" disabled>到货通知</SpButton> -->
    </template>
    <template v-else-if="props.info.is_gift">
      <SpButton class="btn-buy btn-warning" disabled>赠品不可购买</SpButton>
    </template>
    <template v-else>
      <template
        v-if="
          props.info.activity_type === 'group' ||
            props.info.activity_type === 'seckill' ||
            props.info.activity_type === 'limited_time_sale'
        "
      >
        <SpButton
          class="btn-buy btn-cart"
          @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
          v-if="props.info.startActivity"
        >
          {{ props.activityText }}
        </SpButton>
        <SpButton class="btn-buy btn-warning" disabled v-else>活动即将开始</SpButton>
      </template>
      <template v-else>
        <SpButton
          class="btn-buy btn-cart"
          @click="!props.buyLoading && listeners['btn-click']('cart')"
        >
          加入购物车
        </SpButton>
        <SpButton
          class="btn-buy btn-fast-buy"
          @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
          >立即购买</SpButton
        >
      </template>
    </template>
    <!-- <div class="btn-collect" v-if="!props.collected" @click="!props.buyLoading && listeners['btn-click-collect']('collect')">
      <i class="ec-icon ec-icon-like"></i>
      <i class="ec-icon ec-icon-favor"></i>
      <span>收藏</span>
    </div>
    <div class="btn-collect cancel" v-else @click="!props.buyLoading && listeners['btn-click-collect']('cancel')">
      <i class="ec-icon ec-icon-likefill"></i>
      <i class="ec-icon ec-icon-favorfill"></i>
      <span>取消收藏</span>
    </div> -->
  </div>
</template>
