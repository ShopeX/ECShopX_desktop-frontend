/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.float-menus__item {
  .sp-float-menu {
    &-item {
      background: #fff;
      color: #212322;
      width: 50px;
      // height: 60px;
      box-sizing: border-box;
      // margin: 0 0 4px;
      margin-bottom: 2px;
      padding: 13px 0 5px;
      position: relative;
      &__icon {
        font-size: 35px;
        margin: 0 auto 6px;
        display: block;
        color: #000;
      }
      &__text {
        display: inline-block;
        width: 16px;
        font-size: 16px;
      }
    }
  }
  .mb-iconfont-up {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @include respond(sm) {
    // .sp-float-menu {
    //   bottom: 60px;
    //   &-item {
    //     width: 40px;
    //     height: 40px;
    //     margin: 0 0 1px;
    //     padding: 3px 0 0;
    //     &__icon {
    //       font-size: 18px;
    //       margin: 0 auto 2px;
    //     }
    //     &__text {
    //       font-size: 8px;
    //     }
    //   }
    // }
  }
}
</style>

<template>
<div class="float-menus__item">
  <SpWidgetPanel base-slot="5" base-id="float-menu" :base-file="basefile" :info="wgts"></SpWidgetPanel>
  <!-- <SpFloatMenu>
    <SpFloatMenuItem
      iconPrefix="mb-iconfont"
      icon="kefu"
      title="在线客服"
      target="blank"
      to="https://care60.live800.com/live800/chatClient/chatbox.jsp?companyID=80001524&configID=794"
    ></SpFloatMenuItem>
    <SpFloatMenuItem
      iconPrefix="mb-iconfont"
      icon="faq"
      title="常见问题"
      to="/article/faqs/4"
    ></SpFloatMenuItem>
    <SpFloatMenuItem
      iconPrefix="mb-iconfont"
      icon="up"
      @click="handleClickBackToTop"
    ></SpFloatMenuItem>
  </SpFloatMenu> -->
</div>
</template>

<script>
import SpFloatMenu from './index'
import SpFloatMenuItem from './item'

export default {
  name: 'SpFloatMenuInfo',
  components: { SpFloatMenu, SpFloatMenuItem },

  methods: {
    handleClickBackToTop () {
      if (process.client) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
