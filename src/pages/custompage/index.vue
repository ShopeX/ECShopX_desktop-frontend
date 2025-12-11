/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-index" :style="{ backgroundColor: backgroundColor }">
    <!-- 挂件 -->
    <component
      mode="render"
      v-for="(wgt, index) in wgts"
      :is="wgt.type"
      :value="wgt"
      :page-props="pageConfig"
      :key="`wgt-${index}`"
      @callback="handleCallback"
    ></component>
  </div>
</template>

<script>
// import { WidgetsEdit } from "@/mixins";
import { mapState } from 'vuex'

// import IndexMore from "../widgets/src/more/index.vue";
// import Banner from "../widgets/src/main-slide/index.vue";

export default {
  // mixins: [WidgetsEdit],
  async asyncData({ app, query, store }) {
    let { pageid } = query
    let res = []
    let wgts = []
    if (pageid) {
      res = await app.$api.theme.getTemplateContent({
        theme_pc_template_id: pageid
      })
      // const wpage = res.find((item) => item.config.type == 'W0000')
      // if (wpage) {
      //   store.commit('setPageConfig', wpage)
      // }

      res.forEach((item) => {
        const config = JSON.parse(item.config)
        if (config.type != 'W0000') {
          wgts.push(config)
        } else {
          store.commit('setPageConfig', config)
        }
      })
    }
    return {
      wgts
    }
  },
  data() {
    return {
      recList: [],
      bannerParams: {},
      basefile: 'newwapmall/index.html'
    }
  },
  components: {
    // IndexMore,
    // Banner
  },
  created() {},
  computed: {
    ...mapState({
      // wgts: (state) => {
      //   const res = state.commonWgts.bodyTemplate
      //   return res
      // },
      pageConfig: (state) => {
        return state.pageConfig
      },
      backgroundColor: (state) => {
        return state.pageConfig.backgroundColor
      }
    })
  },
  mounted() {
    // analytics.pageReady({
    //   page: {
    //     pageName: "Home",
    //     pageType: "home",
    //     breadcrumb: "Home"
    //   }
    // });
    // this.$api.theme.getTemplateContent({
    //   company_id: 1
    // })
    console.log(this.wgts, 'pageid')
  },
  methods: {
    handleRecommendClick(recommend) {
      this.recommend = recommend
    },
    handleCallback(params) {
      if (params) {
        this.$router.push(`/items?keyword=${params}`)
      }
    }
  }
}
</script>
