/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<!--
 * @Author: your name
 * @Date: 2021-02-03 14:27:08
 * @LastEditTime: 2021-02-22 14:31:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/components/sp-header/index.vue
-->
<style lang="scss" src="./index.scss"></style>
<template>
  <div class="header-bar" >
    <div class="header-bar__topbar">
      <div class="container container-shop" >
        <span>{{ $t('shop-header.index.645099-0') }}</span>
        <span class="exit-btn" @click="handleLogout()">{{ $t('shop-header.index.645099-1') }}</span>
      </div>
    </div>

    
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { mapState } from 'vuex'
import { lockScreen } from '@/utils/dom'
import S from '@/spx'

export default {
  name: 'ShopHeader',
  mixins: [clickaway],
  data() {
    return {
      message: '',
      basefile: 'newwapmall/block/header.html',
      fixed: false,
      showSubNav: null,
    }
  },
  methods: {
    handleLogout() {
      this.$cookies.remove('ECSHOPX_STORE_TOKEN')
      S.logoutShop()
    },
    handleCallback(params) {
      if (params) {
        let keywords = params.data.keyword
        this.$router.push(`/items?keywords=${keywords}`)
      }
    }
  }
}
</script>
<style lang="sass" scoped>

</style>