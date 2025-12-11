/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-article-node {
  // padding: 50px 30px;
  &__nav {
    text-align: left;
    padding: 48px 0 38px;
    .article-title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  .article-wall {
    max-width: 1150px;
    margin: 0 auto;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
}
</style>

<template>
  <div class="page-article-node page-body container">
    <div class="page-article-node__nav">
      <div class="article-title">{{ info.title }}</div>
    </div>
    <div class="article-wall pc">
      <div v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {
      info: ''
    }
  },
  created() {
    const { id } = this.$route.params
    this.getNewsDetail(id)
  },
  methods: {
    async getNewsDetail(article_id) {
      const res = await this.$api.content.contentDetail({ article_id })
      this.info = res
      analytics.pageReady({
        page: {
          pageName: res.title,
          pageType: 'content',
          breadcrumb: res.node_name
        }
      })
    }
  }
}
</script>
