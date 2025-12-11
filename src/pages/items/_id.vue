/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./detail.scss"></style>

<template>
  <div class="page-item-detail">
    <div class="container">
      <SpBreadCrumb :value="breadcrumb" />

      <div class="goods-logo">
        <div class="details-left" v-if="info && info.distributor_id != 0">
          <div class="imgs-content">
            <div v-if="shopInfo.name">
              <img :src="shopInfo.logo" alt="" class="goods-imgs" />
            </div>
            <div style="width: 192px;">{{ shopInfo.name }}</div>
          </div>
          <div class="shop_collection" @click="collectionClick">
            <div v-if="shopInfo.name" class="favor-content">
              <i class="ec-icon ec-icon-favor_light left-icon" v-if="iconShow"></i>
              <i class="ec-icon ec-icon-favorfill color-icom" v-else></i>
              <span v-if="iconShow">{{ $t('items._id.894430-0') }}</span>
              <span v-else>{{ $t('items._id.894430-1') }}</span>
            </div>
          </div>
        </div>
        <div class="imgs-content" @mouseover="qrcodeHover = true" @mouseleave="qrcodeHover = false">
          <div class="goods-qrcode">
            <i class="new_iconfont icon-new-pc-erweima"></i>
          </div>
          <div  class="phone-show">{{ $t('items._id.894430-2') }}</div>
          <div v-show="qrcodeHover" class="goods-qrcode-content">
            <img  v-if="showDefaultQrcode" width="188" height="188" class="goods-qrcode-content__img"
            :src="qrcodePath"
            @error="loadQrcodefailed()"
            />
            <img v-else width="188" height="188" class="goods-qrcode-content__img"
            src="../../assets/imgs/qrcode_default.png"
            />

          </div>
        </div>
        <div class="details-right">
          <input :placeholder="$t('items._id.894430-3')" v-model="inputText" type="text" />
          <button v-if="shopInfo.name && info && info.distributor_id != 0" @click="goToShopInfo">{{ $t('items._id.894430-4') }}</button>
          <button @click="goToItems">{{ $t('items._id.894430-5') }}</button>
        </div>
      </div>


      <SpGoodsInfo :info="info" :theme="themeColor" />

      <!-- <GoodsInfo
        :info="info"
        :promotion="info.promotionDetail"
        :showprice="showprice"
        v-if="info"
      /> -->

      <div class="goods-details">
        <div class="details-left">
          <div class="goods-sort" v-if="info && info.distributor_id != 0">
            <div class="sort-title">{{ $t('items._id.894430-6') }}</div>
            <div class="list-boby">
              <ul>
                <li v-for="(item, index) of menu" :key="index">
                  <div @click="showNextClick(index,item.category_id)" class="content-icon">
                    <div>{{ item.category_name }}</div>
                    <div>
                      <i v-if="!item.listShow" class="ec-icon ec-icon-unfold"></i>
                      <i v-else class="ec-icon ec-icon-fold"></i>
                    </div>
                  </div>
                  <div class="list-boby-next" v-if="item.listShow && item.children.length > 0">
                    <ul>
                      <li v-for="(e, ind) of item.children" :key="ind">
                        <div class="next-menu" @click="showTwoClick(index, ind, e.category_id)">
                          <div>{{ e.category_name }}</div>
                          <div class="next-menu-icon">
                            <i v-if="!e.listShow" class="ec-icon ec-icon-unfold"></i>
                            <i v-else class="ec-icon ec-icon-fold"></i>
                          </div>
                        </div>
                        <div class="three-menu" v-show="e.listShow && e.children.length > 0">
                          <ul>
                            <li v-for="(threeMenu, a) of e.children" :key="a"
                              @click="threeMenuClick(threeMenu.category_id)">
                              {{ threeMenu.category_name }}
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <Recommend />
          </div>
        </div>
        <div class="details-right">
          <div class="tab-wrap">
            <div class="tab-item" :class="{ active: index == curTabIdx }" :style="{
                backgroundColor: index == curTabIdx ? themeColor : ''
              }" v-for="(tab, index) in tabList" :key="index" @click="changeTab(index)">
              {{ tab }}
            </div>
          </div>

          <div class="tab-content" v-if="curTabIdx == 0">
            <div class="goods-params">
              <div class="goods-brannd">{{ $t('items._id.894430-7') }}{{ info.goods_brand }}</div>
              <div class="params-items">
                <div class="params-item" v-for="(item, index) in info.item_params" :key="`params-item__${index}`">
                  {{ item.attribute_name }}：{{ item.attribute_value_name }}
                </div>
              </div>
            </div>
            <div class="goods-desc">
              <div></div>
            </div>
          </div>
          <div class="tab-content" v-if="curTabIdx == 1"></div>

          <div class="goods-intro" v-if="curTabIdx == 0">
            <div v-if="Array.isArray(goodsDesc)">
              <div v-for="(item, index) in goodsDesc" :key="index">
                <Film v-if="item.name === 'film'" :dataForm="item"></Film>
                <Heading v-if="item.name === 'heading'" :dataForm="item"></Heading>
                <Slider v-if="item.name === 'slider'" :dataForm="item"></Slider>
                <Writing v-if="item.name === 'writing'" :dataForm="item"></Writing>
              </div>
            </div>
            <div class="goods-intro__detail" v-else v-html="goodsDesc" v-lazy-container="{ selector: 'img' }">
              {{ $t('items._id.894430-8') }}
            </div>
          </div>

          <div class="goods-evaluation" v-if="curTabIdx == 1">
            <div class="goods-evaluation__list">
              <GoodsEvaluation :info="item" :theme="themeColor" :key="index" v-for="(item, index) in evaluationList"
                @on-reply="(count) => handleReply(count, index)" />
            </div>
            <div class="loading-data" v-if="evaluationList.length == 0">
              {{ $t('items._id.894430-9') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    resolveLazyLoadImg,
    hasValue
  } from '@/utils'
  import Recommend from './comps/recommend'
  import GoodsEvaluation from './comps/goods-evaluation'
  import {
    Film,
    Heading,
    Slider,
    Writing
  } from '@/components'
  import {
    mixin
  } from '@/mixins'
  import S from '@/spx'

  export default {
    mixins: [mixin],
    async asyncData({
      app,
      route,
      req,
      params,
      query
    }) {
      const {
        id
      } = route.params
      // const { distributor_id } = route.query
      const {
        item_id
      } = route.query

      const info = await app.$api.item.detail(id, {
        // distributor_id,
        item_id,
        is_tdk: 1
      })

      const val = await app.$api.shop.getShop({
        distributor_id: info.distributor_id
      })


      const param = {
        distributor_id: info.distributor_id,
        category_id: info.category_id
      }
      const res = await app.$api.item.getStoreClassify(param)
      if (res) {
        res.forEach((element) => {
          element.listShow = false

          if (element.children.length > 0) {
            element.children.forEach((item) => {
              item.listShow = false
            })
          }
        })
      }

      return {
        info,
        tdk_data: info.tdk_data,
        goodsDesc: Array.isArray(info.intro) ? info.intro : resolveLazyLoadImg(info.intro),
        menu: res,
        shopInfo: val,
      }
    },
    head() {
      return {
        title: this.tdk_data&&this.tdk_data.title==this.$t('items._id.894430-10') ? this.info.item_name : this.tdk_data&&this.tdk_data!=this.$t('items._id.894430-10') ? this.tdk_data.title : this.$t('items._id.894430-11'),
        meta: [{
            hid: 'keywords',
            name: 'keywords',
            content: this.tdk_data ? this.tdk_data.mate_keywords : ''
          },
          {
            hid: 'description',
            name: 'description',
            content: this.tdk_data ? this.tdk_data.mate_description : ''
          }
        ]
      }
    },
    components: {
      Recommend,
      GoodsEvaluation,
      Film,
      Heading,
      Slider,
      Writing
    },

    created() {
      this.pageType = 'itemDetail'
      this.qrcodePath = `${process.env.VUE_APP_HOST}/wechatAuth/wxapp/qrcode.png?company_id=${this.info.company_id}&page=pages/item/espier-detail&id=${this.info.item_id}`
      // this.qrcodePath = "https://ecshopx-b2c-demo.yuanyuanke.cn/wechatAuth/wxapp/qrcode.png?company_id=1&page=pages/item/espier-detail&id=1"

    },
    data() {
      return {
        curImgIdx: 0,
        desc: null,
        recList: null,
        viewedItems: null,
        curRecIdx: 0,
        keyword: '',
        showprice: true,
        info: null,
        tabList: [this.$t('items._id.894430-12'), this.$t('items._id.894430-13')],
        curTabIdx: 0,
        evaluationList: [],
        evaluationTotal: 0,
        page: 1,
        pageSize: 20,
        loading: false,
        itemId: null,
        listShow: false,
        inputText: '',
        meun: null,
        shopInfo: null,
        iconShow: true,
        qrcodeHover: false,
        qrcodePath: '',
        showDefaultQrcode: true
      }
    },
    computed: {
      breadcrumb() {
        if (!this.info) return []
        const {
          item_category_info
        } = this.info
        let ret = [{
          name: this.$t('items._id.894430-14'),
          url: `/`
        }]
        item_category_info.map((item) => {
          ret.push({
            name: item.category_name,
            url: `/items?cat_id=${item.category_id}`
          })
          if (item.children) {
            item.children.map((secbItem) => {
              ret.push({
                name: secbItem.category_name,
                url: `/items?cat_id=${secbItem.category_id}`
              })
              if (secbItem.children) {
                secbItem.children.map((threeItem) => {
                  ret.push({
                    name: threeItem.category_name,
                    url: `/items?cat_id=${threeItem.category_id}`
                  })
                })
              }
            })
          }
        })
        return ret
      }
    },
    mounted() {
      this.goodsHistorySave()
      this.fetchEvaluationList()
      this.showStoreIcon()


    },
    methods: {
      // 存浏览记录
      async goodsHistorySave() {
        try {
          let token = S.getAuthToken()
          if(!token){
            return
          }
          let params = {
            item_id: this.info.item_id
          }
          await this.$api.member.postHistorySave(params)
        } catch (error) {
          console.log(error)
        }
      },
      async showStoreIcon (){
        
        if(S.getAuthToken()){
          
          const {
            is_fav
          } = await this.$api.member.showStoreIcon(this.info.distributor_id)
              this.iconShow = !is_fav
        }

      },
      // 关注店铺
      async collectionClick() {
        if (this.iconShow) {
          const data = await this.$api.member.addCollectionStore(this.info.distributor_id)
          if (!data.message) {
            this.iconShow = false
            this.$Message.success(this.$t('items._id.894430-15'))
          }
        } else {
          const data = await this.$api.member.removeCollectionStore(this.info.distributor_id)
          if (!data.message) {
            this.iconShow = true
            this.$Message.success(this.$t('items._id.894430-1'))
          }
        }
      },

      changeTab(i) {
        this.curTabIdx = i
      },
      async fetchEvaluationList() {
        const {
          id
        } = this.$route.params
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          item_id: id,
          order_type: 'normal'
        }
        let {
          list,
          total_count
        } = await this.$api.item.evaluationList(params)
        if (list.length > 0) {
          list.map((item) => {
            item.showComment = false
            item.showReply = false
            item.reply_list = []
            item.reply_comment = ''
          })
        }
        this.evaluationList = list.map((item) => ({
         ...item,
          rate_pic: hasValue(item.rate_pic) ? item.rate_pic.split(',') : []
        }))
        this.evaluationTotal = total_count
        this.loading = false
      },
      async handleReply(count, index) {
        this.evaluationList[index].reply.total_count = count
      },
      // 展开二级菜单
      showNextClick(index, id) {
        this.menu[index].listShow = !this.menu[index].listShow
        this.listShow = !this.listShow
        if (this.menu[index].children.length == 0) {
          this.$router.push({
            path: '/shops/info',
            query: {
              distributor_id: this.info.distributor_id,
              category_id: id
            }
          })
        }
      },
      //展开三级菜单
      showTwoClick(index, ind, id) {

        this.menu[index].children[ind].listShow = !this.menu[index].children[ind].listShow

        if (this.menu[index].children[ind].children.length == 0) {
          // http://localhost:3000/38
          this.$router.push({
            path: `/items?cat_id=${id}`,
            query: {
              distributor_id: this.info.distributor_id,
              // main_category:id
            }
          })
        }
      },
      // 查找商品分类
      threeMenuClick(id) {
        this.$router.push({
          path: '/shops/info',
          query: {
            distributor_id: this.info.distributor_id,
            category_id: id
          }
        })
      },
      // 搜索的转跳所有的商品
      goToItems() {
        this.$router.push({
          path: '/items',
          query: {
            keywords: this.inputText
          }
        })
      },
      // 搜索的所在的商店
      goToShopInfo() {
        this.$router.push({
          path: '/shops/info',
          query: {
            keywords: this.inputText,
            distributor_id: this.info.distributor_id
          }
        })
      },
      loadQrcodefailed(){
        this.showDefaultQrcode = !this.showDefaultQrcode
      }
    }
  }
</script>
