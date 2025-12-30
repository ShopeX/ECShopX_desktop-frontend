/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-article page-body container clearfix">
    <div class="article-content">
      <div class="article-title">{{ $t('faqs._id.303628-0') }}</div>
      <div class="article-wrap clearfix">
        <div class="article-common clearfix" v-for="(art, artkey) in articleList" :key="artkey">
          <div class="item" v-for="item in art" :key="item.node_id">
            <h3>{{ item.node_name }}</h3>
            <ul class="text-list">
              <li
                :class="{ 'active': sitem.isOpened }"
                v-for="(sitem, index) in item.articleList"
                :key="index"
              >
                <span class="txt-title" @click.stop="getContentDetail(sitem, index)">{{
                  sitem.title
                }}</span>
                <div class="txt">
                  <p v-html="sitem.info"></p>
                  <div @click.stop="sitem.isOpened = false">{{ $t('faqs._id.303628-1') }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import _groupBy from 'lodash/groupBy'
import { analytics } from '@/plugins/analytics'

export default {
  data() {
    return {
      list: null,
      articleList: [[], []],
      articleContent: {}
    }
  },
  created() {
    const { id } = this.$route.params
    this.getContentNodes(id)
  },
  mounted() {
    analytics.pageReady({
      page: {
        pageName: this.$t('faqs._id.303628-0'),
        pageType: 'content',
        breadcrumb: this.$t('faqs._id.303628-0')
      }
    })
  },
  methods: {
    async getContentDetail(item, index) {
      if (item.isOpened) {
        item.isOpened = false
      } else {
        const { content } = await this.$api.article.getArticleContent({
          article_id: item.article_id
        })
        item.info = content
        item.isOpened = true
      }
    },
    async getContentNodes(id) {
      const { list } = await this.$api.article.getContentNodes({
        parent_id: id,
        orderBy: 'order_sort'
      })

      list.forEach((item, index) => {
        if (index % 2 === 0) {
          item.articleList.forEach((sitem) => {
            sitem.info = ''
            sitem.isOpened = false
          })
          this.articleList[0].push(item)
        } else {
          item.articleList.forEach((sitem) => {
            sitem.info = ''
            sitem.isOpened = false
          })
          this.articleList[1].push(item)
        }
      })
    }
  }
}
</script>
