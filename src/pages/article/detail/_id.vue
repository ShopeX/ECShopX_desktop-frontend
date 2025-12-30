/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-article-detail {
  min-height: 400px;
  text-align: center;
  // padding: 50px 30px;
  .article {
    //   float: left;
    //   width: calc(100% - 250px);
    //   padding-right: 50px;
    //   margin-right: 50px;
    //   border-right: 1px solid $color-border-gray;
    //   &-title {
    //     // max-width: 1150px;
    //     margin: 0 auto;
    //     font-size: 22px;
    //     color: #212322;
    //     letter-spacing: 1px;
    //     border-bottom: 1px solid #adadad;
    //     padding-bottom: 10px;
    //   }
    max-width: 1150px;
    margin: 0 auto;
  }
  // img {
  //   width: 100%;
  // }
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
  .goods-list {
    float: left;
    width: 200px;
    &__title {
      font-size: 26px;
      text-align: center;
      margin-bottom: 20px;
    }
    img {
      @include pdt-img(120px);
    }
    li {
      text-align: center;
      margin-bottom: 30px;
    }
  }
  .article-list {
    margin-top: 50px;
    &__title {
      font-size: 26px;
      text-align: center;
      margin-bottom: 20px;
    }
    li {
      width: 25%;
      padding: 20px;
      float: left;
      text-align: center;
      .img-title {
        @include multi-ellipsis(2);
        height: 40px;
        margin-bottom: 10px;
      }
      .img-warp {
        width: 200px;
        height: 200px;
      }
    }
  }

  // @include respond(sm) {
  //   padding: 20px 10px 50px;
  //   .article {
  //     float: none;
  //     width: 100%;
  //     margin-right: 0;
  //     padding-right: 0;
  //     border-right-width: 0;
  //   }
  //   .article-title {
  //     font-size: 20px;
  //   }
  //   .goods-list {
  //     width: 100%;
  //     margin-top: 30px;
  //     ul {
  //       li {
  //         width: 50%;
  //         float: left;
  //         &:nth-child(2n+1) {
  //           text-align: left;
  //         }
  //         &:nth-child(2n) {
  //           text-align: right;
  //         }
  //       }
  //     }
  //     .goods-desc {
  //       font-size: 12px;
  //       text-align: center;
  //     }
  //     .goods-price {
  //       text-align: center;
  //     }
  //   }
  //   .article-list {
  //     &__title {
  //       margin-top: 30px;
  //     }
  //     li {
  //       width: 100%;
  //     }
  //   }
  //   .article-content {
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  // }
  img {
    max-width: 100% !important;
    vertical-align: middle;
    display: block;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="page-article-detail page-body container">
    <!-- <div class="clearfix"> -->
    <div class="article">
      <div class="page-article-detail__nav">
        <div class="article-title">{{ info.title }}</div>
      </div>
      <!-- <div class="article-datetime">{{handleDatetime(info.pubtime)}}</div> -->
      <!-- <div class="share">
          <SpSocialShare :info="shareInfo" :is-product="false" />
        </div> -->
      <div class="article-content" v-html="info.content"></div>
    </div>
    <!-- <div class="goods-list" v-if="info.related_item">
        <div class="goods-list__title">相关商品</div>
        <ul>
          <li v-for="item in info.related_item" :key="item.item_id">
            <nuxt-link :to="`/items/${item.item_id}`">
              <img :src="resolveImgPath(item.image_default_id, 's')" alt :style="imgStyle"/>
              <div class="goods-desc">{{item.title}}</div>
              <div class="goods-price">
                <SpPrice :value="item.price"></SpPrice>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div> -->
    <!-- </div> -->
    <!-- <div class="article-list" v-if="info.related_article">
      <div class="article-list__title">相关文章</div>
      <div>
        <ul class="clearfix">
          <li v-for="item in info.related_article" :key="item.article_id">
            <nuxt-link :to="`/article/detail/${item.article_id}`">
              <div class="img-warp">
                <img :src="resolveImgPath(item.article_logo, 's')" alt width="100%" height="100%" />
              </div>
              <div class="img-title">{{item.title}}</div>
            </nuxt-link>
            <nuxt-link to="/news">
              <SpButton type="text">阅读更多</SpButton>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
import { SpSocialShare } from '@/components'
import { formatDataTime, resolveImgPath } from '@/utils'
import { analytics } from '@/plugins/analytics'

export default {
  async asyncData({ app, params, query }) {
    let info
    try {
      const res = await app.$api.content.contentDetail({
        article_id: params.id
      })
      info = res
    } catch (e) {}
    return {
      info
    }
  },
  head() {
    return {
      title: this.info.title,
      meta: [
        // { hid: 'keywords', name: 'keywords', content: this.info.seo.keywords },
        // { hid: 'description', name: 'description', content: this.info.seo.description }
      ]
    }
  },
  data() {
    return {
      shareInfo: {
        page_url: '',
        size: 120
      }
    }
  },
  components: { SpSocialShare },
  computed: {
    imgStyle() {
      let width = 180
      return {
        width: width + 'px',
        height: Math.floor(width * 1.2825) + 'px'
      }
    }
  },
  mounted() {
    this.shareInfo.page_url = `${process.env.VUE_APP_HOST}/article/detail/${this.$route.params.id}`
    analytics.pageReady({
      page: {
        pageName: this.info.title,
        pageType: 'content',
        breadcrumb: this.info.node_name
      }
    })
  },
  methods: {
    handleDatetime(timestamp) {
      return formatDataTime(timestamp * 1000, 'YYYY-M-D HH:mm:ss')
    },
    resolveImgPath(url, size) {
      return resolveImgPath(url, size)
    }
  }
}
</script>
