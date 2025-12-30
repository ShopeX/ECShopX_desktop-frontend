/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template functional>
  <div class="goods-btns">
    <template v-if="props.info.approve_status == 'instock'">
      <SpButton class="btn-buy btn-warning" disabled>{{$t('comps.buy-toolbar.593094-0')}}</SpButton>
    </template>
    <template v-else>
      <SpButton
        class="btn-buy btn-fast-buy custom-button"
        @click="!props.buyLoading && listeners['btn-click']('fastbuy')"
        ><span class="text">{{$t('comps.buy-toolbar.593094-1')}}</span><span class="ec-icon2 ec-icon2-anniu-01"></span
      ></SpButton>
    </template>
  </div>
</template>
