/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-news {
  // padding-bottom: 100px;
  &__nav {
    text-align: left;
    padding: 48px 0 34px;
    .nav_title {
      max-width: 1150px;
      margin: 0 auto;
      font-size: 22px;
      color: #212322;
      letter-spacing: 1px;
      border-bottom: 1px solid #adadad;
      padding-bottom: 10px;
    }
  }
  &__subnav {
    margin-bottom: 34px;
    .subnav_title {
      font-size: 16px;
      color: #525252;
    }
  }

  .page-content {
    padding: 20px 0;
    text-align: center;
  }
  .news-list {
    width: 1150px;
    margin: 0 auto;
    &__item {
      position: relative;
      float: left;
      margin: 0 50px 50px 0;
      width: 550px;
      height: 330px;
      border: solid 1px #626262;
      &:hover .into {
        background-color: #000;
        color: #fff;
        border-color: #000;
      }
      &:nth-child(even){
        margin-right: 0;
      }
      &-img {
        @include pdt-img(548px);
        height: 328px;
      }
      .text-container {
        position: absolute;
        padding: 0 20px;
        height: 80px;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(255,255,255,0.9);
        letter-spacing: 0;
      }
      .text {
        text-align: left;
        padding: 18px 0;
        line-height: 18px;
        font-size: 18px;
        color: #525252;
        width: 342px;
        .title {
          @include multi-ellipsis(1);
          margin-bottom: 9px;
          height: 18px;
        }
        .sub-title {
          @include multi-ellipsis(1);
          height: 18px;
        }
      }
      .into {
        width: 150px;
        line-height: 30px;
        background-color: #fff;
        color: #000;
        font-size: 16px;
        text-align: center;
        border: solid 1px #959595;
        margin-top: 32px;
        transition: all 0.2s;
        // position: absolute;
        // bottom: 0;
        // left: 50%;
        // margin-left: -75px;
      }
    }
  }

  // @include respond(sm) {
  //   padding-bottom: 0;
  //   .news-list {
  //     width: 100%;
  //     &__item {
  //       width: 50%;
  //       margin: 0 0 20px;
  //       padding: 0 5px;
  //       &-img {
  //         @include pdt-img(200px);
  //       }
  //     }
  //   }
  //   .nav {
  //     margin: 15px;
  //   }
  // }
}
</style>

<template>
  <div class="page-news page-body container">
    <div class="page-news__nav">
      <div class="nav_title">{{ $t('news.index.335531-0') }}</div>
    </div>
    <div class="page-news__subnav">
      <div class="subnav_title">{{ $t('news.index.335531-1') }}</div>
    </div>
    <div class="news-list clearfix">
      <div class="news-list__item" v-for="(item, index) in list" :key="index">
        <nuxt-link :to="`/article/detail/${item.article_id}`" @click.native="$track('news', `/article/detail/${item.article_id}`, item.article_id)">
          <div
            class="news-list__item-img"

          >
            <img :src="item.article_logo" alt />
          </div>
          <div class="text-container clearfix">
            <div class="text fl">
              <p class="title">{{item.title}}</p>
              <p class="sub-title">{{item.sub_title}}</p>
            </div>
            <!-- <div class="desc">
              <span>{{handleDate(item.modified)}}</span>
              <span class="fr">
                <i class="mb-iconfont mb-iconfont-right"></i>
              </span>
            </div> -->
            <div class="into fr">
              {{ $t('news.index.335531-2') }}
            </div>
          </div>

        </nuxt-link>
      </div>
    </div>
    <div class="page-content">
      <SpPagination
        :total="total"
        :pageSize="page_size"
        :current="page_no"
        @on-change="handleChangePage"
      ></SpPagination>
    </div>
  </div>
</template>

<script>
import { formatDataTime } from '@/utils'
import { analytics } from '@/plugins/analytics'

export default {
  data () {
    return {
      list: [],
      total: 0,
      page_no: 1,
      page_size: 12,
      width: 550
    }
  },
  components: {},
  created () {
    this.getNews()
  },
  mounted () {
    analytics.pageReady({
      page: {
        pageName: this.$t('news.index.335531-3'),
        pageType: 'content',
        breadcrumb: this.$t('news.index.335531-3')
      }
    })
  },
  methods: {
    // 分页查询
    handleChangePage (page) {
      this.page_no = page
      this.list = []
      this.getNews()
    },
    handleDate (timestamp) {
      return formatDataTime(timestamp * 1000, 'DD.MM.YYYY')
    },
    async getNews () {
      const { list } = await this.$api.content.contentNodeList({
        parent_id: 0,
        orderBy: 'order_sort'
      })
      let nodeid
      list.forEach(item => {
        if (item.node_name === this.$t('news.index.335531-0')) {
          nodeid = item.node_id
        }
        if (item.children) {
          item.children.forEach(sitem => {
            if (sitem.node_name === this.$t('news.index.335531-0')) {
              nodeid = sitem.node_id
            }
          })
        }
      })

      if (nodeid) {
        const { articleList, pagers } = await this.$api.content.contentList({
          node_id: nodeid,
          page_no: this.page_no,
          page_size: this.page_size
        })
        this.list = articleList
        if (pagers) {
          this.total = pagers.total
        }
      } else {
        this.$Message.error(this.$t('news.index.335531-4'))
      }
    }
  }
}
</script>
