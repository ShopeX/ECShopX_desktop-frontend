/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-custom {
  .article-content {
    width: 100%;
    text-align: center;
    > table,
    > div {
      margin: 0 auto;
    }
  }
  img {
    max-width: 100%;
  }
  area:focus {
    outline: none;
  }
}
</style>

<template>
  <div class="page-custom">
    <div class="article-content" v-html="article" v-if="article"></div>
  </div>
</template>

<script>
import { analytics } from '@/plugins/analytics'

export default {
  async asyncData({ app, route }) {
    let article
    try {
      let path = route.path
      let article_url = path.split('/product')[1]
      let res = await app.$api.content.contentInfo({ article_url })
      article = res.content
    } catch (e) {}

    return {
      article
    }
  },
  mounted() {
    let maps = document.getElementsByTagName('map')
    Array.from(maps).forEach((map) => {
      // let img = map.previousElementSibling
      let elename = map.name
      // 查找usemap=elename的图片
      let imgs = document.getElementsByTagName('img')
      let imgWidth
      Array.from(imgs).forEach((img) => {
        // console.log(img.src)
        // console.log(img.useMap)

        if (img.useMap === `#${elename}`) {
          if (img.size) {
            imgWidth = img.size.split(',')[0]
          }
          if (!imgWidth) {
            imgWidth = window.innerWidth < 1440 ? window.innerWidth : 1440
          }
        }
      })

      Array.from(map.children).forEach((are) => {
        let ps = are.coords.split(',')
        let k = imgWidth / 1440

        let nps = ps.map((item) => {
          return parseInt(parseInt(item) * k).toString()
        })
        are.coords = nps.join(',')
      })
    })

    analytics.pageReady({
      page: {
        pageName: '文章页',
        pageType: 'content',
        breadcrumb: '文章页'
      }
    })
  }
}
</script>
