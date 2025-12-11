/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-tip-message {
  padding: 200px 0;
  font-size: 16px;
  text-align: center;
  img {
    vertical-align: middle;
  }
  > span {
    vertical-align: middle;
  }
  a {
    color: $color-active;
    padding: 0 0 2px 8px;
    border-bottom: 2px solid $color-active;
  }
  &__warp {
    text-align: center;
  }
  @include respond(sm) {
    padding: 100px 0;
  }
}
</style>

<template>
  <div class="sp-tip-message" v-if="isLoading || showTip">
    <div class="sp-tip-message__loading" v-if="loading && isLoading">
      <SpLoading>{{loadingText || $t('tip-message.index.587556-0')}}</SpLoading>
    </div>
    <div class="sp-tip-message__warp" v-if="showTip">
      <img class="sp-tip-message__img" v-if="img" :src="require(`~/assets/imgs/${img}`)" alt>
      <span>
        <span class="sp-tip-message__txt">{{tipText || $t('tip-message.index.587556-1')}}</span>
        <nuxt-link v-if="tipLink" :to="to">{{tipLink}}</nuxt-link>
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SpTipMessage',
  props: {
    loading: Boolean,
    isLoading: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    img: String,
    value: Boolean,
    tipText: {
      type: String,
      default: ''
    },
    tipLink: String,
    to: String
  },
  data () {
    return {
      showTip: this.value
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        this.showTip = false
        this.$emit('input', false)
      }
    },
    value (val) {
      if (val) {
        setTimeout(() => {
          this.showTip = true
        }, 300)
      }
    }
  }

}
</script>
