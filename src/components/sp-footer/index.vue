/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-footer {
  // Footer样式
}
</style>

<template>
  <div class="sp-footer">
    <!-- 挂件 -->
    <!-- <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
    ></component> -->
    
    <!-- 开源标识 -->
    <OpenSourceBadge />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OpenSourceBadge from '@/components/open-source-badge'

export default {
  name: 'SpFooter',
  components: {
    OpenSourceBadge
  },
  data() {
    return {
      index: 0
    }
  },

  computed: {
    ...mapState({
      // wgts: (state) => {
      //   const res = state.footerTemplate
      //   return res ? JSON.parse(res.params) : []
      // },
      pageConfig: (state) => {
        return state.pageConfig
      }
    })
  },

  methods: {
    toggleMenu(m) {}
  }
}
</script>
