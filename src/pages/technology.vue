/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-technology {
  // padding-bottom: 100px;
  &__nav {
    text-align: left;
    margin: 48px 0 38px;
    .title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  .story-wall {
    max-width: 1150px;
    font-size: 0;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="page-technology page-body">
    <div class="page-technology__nav">
      <div class="title">{{ $t('pages.technology.568453-0') }}</div>
    </div>
    <div class="story-wall pc">
      <img src="~/assets/imgs/resource/201911/pc/fggy/fgzx-1.jpg" alt />
      <img src="~/assets/imgs/resource/201911/pc/fggy/fgzx-2.jpg" alt />
      <img src="~/assets/imgs/resource/201911/pc/fggy/fgzx-3.jpg" alt />
      <img src="~/assets/imgs/resource/201911/pc/fggy/fgzx-4.jpg" alt />
      <img src="~/assets/imgs/resource/201911/pc/fggy/fgzx-5.jpg" alt />
    </div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {}
  },
  components: {},
  mounted() {
    analytics.pageReady({
      page: {
        pageName: this.$t('pages.technology.568453-0'),
        pageType: 'content',
        breadcrumb: this.$t('pages.technology.568453-0')
      }
    })
  },
  methods: {}
}
</script>
