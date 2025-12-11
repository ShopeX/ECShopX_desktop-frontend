
<template>
  <div class="page-index">
    this is custome pages

  </div>
</template>

<script>
import { WidgetsEdit } from "@/mixins";
import seo from "@/consts/seo";
import { mapState } from "vuex";
import { analytics } from "@/plugins/analytics";


export default {
  mixins: [WidgetsEdit],
  async asyncData({ app }) {
    // let wgts = {};
    // try {
    //   wgts = await app.$api.theme.getThemeWidgets({
    //     template_name: "pc",
    //     version: "v1.0.1",
    //     page_name: "index"
    //   });
    // } catch (e) {}

    // return {
    //   wgts
    // };
  },

  head() {
    return {
      title: "espier-pc-v2",
      meta: [
        { hid: "keywords", name: "keywords", content: seo.keywords },
        { hid: "description", name: "description", content: seo.description }
      ]
    };
  },
  data() {
    return {
      recList: [],
      bannerParams: {},
      basefile: "newwapmall/index.html"
    };
  },
  created() {},
  computed: {
    ...mapState({
      wgts: state => {
        const { list } = state.commonWgts.templateIndex
        return list
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
  },
  methods: {
    handleRecommendClick(recommend) {
      this.recommend = recommend;
    }
  }
};
</script>
