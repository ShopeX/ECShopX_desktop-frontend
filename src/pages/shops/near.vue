/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./near.scss"></style>

<template>
  <div class="page-near">
    <div class="container">
      <div class="container__btn" :style="{ backgroundColor: '#FF5D02', color: '#FFFFFF', fontWeight:'800'}"
        @mousedown="tagClicked(-1)">
        {{ $t('shops.near.137693-0') }}
      </div>
      <div class="navs-con">
        <span class="nav-item" v-for="(item, index) in navList" :key="`nav-item__${index}`"
          :class="{ active: index == tabIndex }" @mousedown="navListClicked(index)">
          {{ item }}
        </span>
        <div class="shop_serch">
          <input class="search-input" v-model="keywords" :placeholder="$t('shops.near.137693-1')" type="text" />
          <i class="espier-icon espier-icon-sousuo-01" @click="shopSearch"></i>
        </div>
      </div>
      <div class="near-content" v-loading="loading">
        <div class="near-content-left">
          <div class="menu">
            <ul class="menu-con">
              <li class="menu-block" v-for="(item , index) in tagList" :key="`menu-block__${index}`">
                <div class="menu-item" :class="{ active: index == tagIdex }" @mousedown="tagClicked(index)">
                  <span class="menu-item-title">{{item.tag_name}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="near-content-right">
          <div class="shop_list">
            <ul>
              <li class="shop_list_item" v-for="(shop , index) in shopList" :key="`shop_list_item__${index}`">
                <div class="shop_list_item_right">
                  <div class="shop_list_item_right__concern" @click="collectShops(shop)">
                    <div class="shop_collection_not" v-if="!shop.collection">
                      <i class="new_iconfont icon-new-pc-shoucang"></i>
                      <span class="shop_list_item_right__concern_text">{{ $t('shops.near.137693-2') }}</span>
                    </div>
                    <div class="shop_collection" v-else>
                      <i class="new_iconfont icon-new-pc-shoucang" style="color: #FF5D02;"></i>
                      <span class="shop_list_item_right__concern_text" style="color: #FF5D02;">{{ $t('shops.near.137693-3') }}</span>
                    </div>
                  </div>
                  <div class="shop_list_item_right__distance">
                    <span class="shop_list_item_right__distance_text">{{ $t('shops.near.137693-4') }}
                      {{parseFloat(shop.distance).toFixed(2)}}{{shop.distance_unit}}</span>
                  </div>
                </div>
                <NuxtLink :to="`info?distributor_id=${shop.distributor_id}`">
                  <img class="shop_list_item__banner" :src="shop.banner " />
                </NuxtLink>
                <div class="shop_list_item_content">
                  <NuxtLink :to="`info?distributor_id=${shop.distributor_id}`">
                    <span class="shop_list_item_content__name">
                      {{shop.name}}
                    </span>
                  </NuxtLink>

                  <br />
                  <span class="shop_list_item_content__info">{{ $t('shops.near.137693-5') }} {{shop.business}} {{ $t('shops.near.137693-6') }} {{shop.sales_count}}</span>
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
  import {
    mixin
  } from '@/mixins'
  const baiduKey = '5IaKAT5exp7lhdRsNDTWKXrvqZLytIFg'
  import S from '@/spx'

  export default {
    components: {},
    data() {
      return {
        navList: [this.$t('shops.near.137693-7'), this.$t('shops.near.137693-8'), this.$t('shops.near.137693-4')],
        keywords: '',
        tagList: [],
        allShopList: [],
        shopList: [],
        collectShopList: [],
        isReloadData: true,
        tabIndex: 0,
        tagIdex: -1,
        loading: false
      }
    },
    computed: {},
    created() {
      window.init = () => {
        this.initMap()
      }
    },
    mounted() {
      this.loadScript()
    },
    methods: {
      loadScript() {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.charset = 'utf-8'
        script.src = `https://api.map.baidu.com/api?v=2.0&ak=${baiduKey}&callback=init`
        document.body.appendChild(script)
        console.log(this.$t('shops.near.137693-9'))
      },
      initMap(id) {
        console.log(this.$t('shops.near.137693-10'))
        // eslint-disable-next-line no-undef
        var map = new BMap.Map("map-container1")
        this.localPosition()
      },
      localPosition() {
        let _this = this
        // 当前位置
        let geolocation = new BMap.Geolocation()
        // geolocation.enableSDKLocation()
        let gc = new BMap.Geocoder()
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 判断用户是否允许授权
            let mk = new BMap.Marker(r.point)
            if (r.accuracy == null || r.accuracy == 'null') {
              mk = new BMap.Marker(r.point)
            }
            // 定位后，获取省，市名称
            let pt = r.point
            gc.getLocation(pt, async function(rs) {
              let addComp = rs.addressComponents
              let province = addComp.province
              let city = addComp.city
              // let area = addComp.district

              const params = {
                lat: r.point.lat,
                lng: r.point.lng,
                show_discount: 1,
                company_id: 1,
                province: r.point.lat ? addComp.province : this.$t('shops.near.137693-11'),
                city: r.point.lat ? addComp.city : this.$t('shops.near.137693-11'),
                area: r.point.lat ? addComp.district : this.$t('shops.near.137693-12'),
                // 根据经纬度或地区查询
                type: r.point.lat ? 0 : 1,
                sort_type: 1
              }
              province = province.replace(/市/i, '')
              _this.getShopList(params)
              if (S.getAuthToken()) {
                _this.loading = true;
                const {
                  list
                } = await _this.$api.member.getCollectionStoreList()
                _this.collectShopList = list
                // _this.getShopList(params)
                _this.loading = false;
              }
              
            })
            // _this.map.panTo(r.point)
            // console.log('您的位置：' + r.point.lng + ',' + r.point.lat)

          } else {
            alert('failed' + this.getStatus())
          }
        }, {
          enableHighAccuracy: true
        })
      },
      //获取商铺列表
      async getShopList(params) {
        const {
          list,
          tagList
        } = await this.$api.item.getNearbyShop(params)
        this.allShopList = list;
        let length = list.length
        for (var i = 0; i < length; i++) {
          var shop = list[i]
          var result = this.collectShopList ? this.collectShopList.some(item => item.distributor_id === shop
            .distributor_id) : false
          if (result) {
            shop.collection = true
          } else {
            shop.collection = false
          }
          this.shopList.push(shop)
        }
        this.tagList = tagList
        this.navListClicked(0)
      },

      async collectShops(shop) {
        if (shop.collection) {
          const data = await this.$api.member.removeCollectionStore(shop.distributor_id)
          if (!data.message) {
            shop.collection = !shop.collection
            this.$Message.success(this.$t('shops.near.137693-14'))
          }
        } else {
          const data = await this.$api.member.addCollectionStore(shop.distributor_id)
          if (!data.message) {
            shop.collection = !shop.collection
            this.$Message.success(this.$t('shops.near.137693-15'))
          }
        }
        var list = []
        this.shopList.forEach(item => {
          if (item.distributor_id == shop.distributor_id) {
            item = shop
          }
          list.push(item)
        })
        this.shopList = list;
      },
      navListClicked(index) {
        this.tabIndex = index
        var sortShopList = []
        switch (index) {
          case 0:
            this.shopList.sort(function(shopA, shopB) {
              var x = parseFloat(shopA.created)
              var y = parseFloat(shopB.created)
              return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
            break

          case 1:
            this.shopList.sort(function(shopA, shopB) {
              var x = parseFloat(shopA.sales_count)
              var y = parseFloat(shopB.sales_count)
              return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
            break

          case 2:
            this.shopList.sort(function(shopA, shopB) {
              var x = parseFloat(shopA.distance)
              var y = parseFloat(shopB.distance)
              return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            });
            break

        }
      },
      tagClicked(index) {
        this.tagIdex = index;
        var shopList = [];
        if (index == -1) {
          shopList = this.allShopList;
        } else {
          let tag = this.tagList[index];
          this.allShopList.forEach(shop => {
            shop.tagList.forEach(t => {
              if (t.tag_id == tag.tag_id) {
                shopList.push(shop);
              }
            })
          })
        }
        this.shopList = shopList;
        this.navListClicked(0)

      },
      reload() {
        this.isReloadData = false;
        this.$nextTick(() => {
          this.isReloadData = true;
        })
      },
      shopSearch() {

        let list = this.allShopList.filter(shop => {
          return this.keywords == '' ? true : shop.name.includes(this.keywords)
        })
        this.shopList = list;

      }
    }
  }
</script>
