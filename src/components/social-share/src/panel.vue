/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template functional>
<div class="social-share-panel" :class="{'pinpai': !props.isProduct}">
  <div class="social-share-panel__cont" v-if="props.isProduct">
    <div
      class="social-share-panel__info share-goods"
      v-if="props.info"
    >
      <div class="share-goods__img">
        <img :src="props.info.image">
      </div>
      <div class="share-goods__bd">
        <img class="share-goods__qr" :src="props.info.shareQR">
        <h4 class="share-goods__title">{{ props.info.title }}</h4>
        <SpPrice class="share-goods__price" :value="props.info.price"/>
        <a :href="props.info.downUrl" class="btn-share-download">{{ $t('src.panel.829852-0') }}</a>
      </div>
      <div class="share-goods__line">
        <div class="share-goods__line-hd">{{ $t('src.panel.829852-1') }}</div>
        <div class="share-goods__line-bd"><a :href="props.info.shareUrl">{{ props.info.shareUrl }}</a></div>
      </div>
      <div class="share-goods__line">
        <div class="share-goods__line-hd">{{ $t('src.panel.829852-2') }}</div>
        <div class="share-goods__line-bd">{{ $t('src.panel.829852-3') }}</div>
      </div>
    </div>
    <SpLoading
      v-else
      size="20"
    ></SpLoading>
  </div>

  <div class="social-share-panel__article" v-else>
    <img :src="props.info.qrcodeImage" :width="props.info.size"  v-if="props.info" />
  </div>
</div>
</template>
