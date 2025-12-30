/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./follow.scss"></style>

<template>
  <div class="page-follow">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="follow" active="follow"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-content">
            <div class="content-head">
              <span class="vertical">|</span>
              <span class="shop-collection">{{ $t('member.follow.764248-0') }}</span>
            </div>
            <hr />
            <div>
              <div class="content-list">
                <!-- 列表 -->
                <div class="content-list-item" v-for="(item,index) of shopList" :key="index">
                  <div class="item-top">
                    <div >
                      <img :src="item.logo" class="item-logo" alt="">
                    </div>
                    <div>
                      <div class="shop-name">{{item.name}}</div>
                      <div class="shop-follow">{{item.fav_num}}{{ $t('member.follow.764248-1') }}</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left" @click="goStore(item.distributor_id)">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">{{ $t('member.follow.764248-2') }}</span>
                    </div>
                    <div class="item-bottom-right" @click="collectShops(item.distributor_id)">
                      <i v-if="iconShow" class="ec-icon ec-icon-favorfill color-icom"></i>
                      <i v-else class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;" >{{ $t('member.follow.764248-3') }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="pagination-wrap">
                <SpPagination
                  :total="total"
                  :pageSize="pageSize"
                  :current="page"
                  @on-change="changePage"
                  :maxPage="5"
                />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CollectorItem from './comps/collector-item'
import smenu from './comps/smenu'
import Tips from './comps/tips'

export default {
  async asyncData({ app }) {
    const res = await app.$api.member.getCollectionStoreList()
    return {
      shopList : res.list
    }
  },
  components: { smenu, CollectorItem, Tips },

  data() {
    return {
      list: null,
      page: 1,
      pageSize: 20,
      total: 1,
      curTypeIndex: 0,
      iconShow: true,
      shopList: null
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },

  mounted() {},
  methods: {
    /* changePage(val) {
      this.page = val
      this.fetch()
    }, */
    // 进入店铺功能
    goStore(id){
      console.log('111111111');
      this.$router.push({
        path: '/shops/info',
        query: {
          distributor_id: id
        }
      })
    },
    // 取消收藏
    async collectShops(id){
      const data = await this.$api.member.removeCollectionStore(id)
      if (!data.message) {
         this.shopList = this.shopList.filter(item =>item.distributor_id != id )
      }
    }
  }
}
</script>
