/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="widget-W0019" :style="widgetStyle" v-loading="loading">
    <slot></slot>
    <div class="widget-W0019-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0019-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-goods">
          <div class="wgt-goodstab_tab">
            <div
              class="title"
              :style="{
                backgroundColor: value.wgtTitleBackgroundColor,
                borderRadius: `${value.wgtTitleBorderRadius ? '15px' : '0px'}`
              }"
            >
              <span
                class="title-span"
                :style="{ color: value.wgtTitleTextColor, fontSize: `${value.wgtTitleFontSize}px` }"
                >{{ value.text }}</span
              >
            </div>
            <ul class="tabList">
              <li
                class="tabItem"
                v-for="(tab, index) in value.selectTagList"
                :key="`tabitem__${index}`"
                @mousedown="handleOverShow(index)"
                :class="{ active: index == tabIndex }"
              >
                {{ tab.tag_name }}
              </li>
            </ul>
            <div
              class="more"
              :style="{
                fontSize: `${value.wgtMoreTitleFontSize}px`,
                color: value.wgtMoreTitleColor,
                marginRight: `${value.wgtMoreRightMargin}px`
              }"
            >
              <nuxt-link name="tag" to="/shops/near">{{ value.moreText }}</nuxt-link>
            </div>
          </div>
          <ul :class="`wgt-goods_list`" :id="`wgt-goods_list__${value.uuid}`">
            <li
              class="goods-item"
              v-for="(item, index) in shopList"
              :key="`goods-item__${index}`"
              :style="{
                border: `${value.wgtShopBorder ? value.wgtShopBorderWidth : 0}px solid`,
                borderColor: value.wgtShopBorderColor
              }"
            >
              <linkPage
                class="goods-item_wrap"
                :mode="mode"
                :to="`shops/info?distributor_id=${item.distributor_id}`"
              >
                <!-- :to="`shops/list?distributor_id=${item.distributor_id}`" -->
                <div class="goods-item_img">
                  <ImgWrap :src="item.banner" :width="214" :height="130" />
                </div>
                <div class="goods-item_logo">
                  <ImgWrap :borderRadius="35" :src="item.logo" :width="70" :height="70" />
                </div>
                <div
                  class="goods-item_title"
                  :style="{
                    fontSize: `${value.wgtShopNameFontSize}px`,
                    color: value.wgtShopNameColor
                  }"
                >
                  {{ item.name }}
                </div>
              </linkPage>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import braidStyle from './props'
import mixins from '../../mixins'
import { attrs } from '../../mixins/common-props'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'

const WIDGET_NAME = 'W0019'
const baiduKey = '5IaKAT5exp7lhdRsNDTWKXrvqZLytIFg'

export default {
  name: WIDGET_NAME,
  icon: 'icon-shangpin',
  title: '附近商家',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '附近商家',
    alias: '附近商家',
    text: '附近商家',
    type: WIDGET_NAME,
    ...attrs,
    showMore: true,
    moreText: '查看更多>',
    moreLinkData: {},
    columnNums: 5,
    widthDisabled: true,
    height: 565,
    heightDisabled: true,
    data: [],
    //用户选中标签
    selectTagList: [],
    //所有商铺标签
    allTagList: [],
    // 默认标题配置
    wgtTitleBorderRadius: true,
    wgtTitleBackgroundColor: '#FF5A00',
    wgtTitleTextColor: '#FFFFFF',
    wgtTitleFontSize: 18,
    //默认更多 标题设置
    wgtMoreTitleColor: '#8C8C8C',
    wgtMoreTitleFontSize: 14,
    wgtMoreRightMargin: 10,
    // 商家配置
    wgtShopNameColor: '#333333',
    wgtShopNameFontSize: 18,
    wgtShopBorder: false,
    wgtShopBorderColor: '#333333',
    wgtShopBorderWidth: 0
  },
  data() {
    return {
      // goodsData:[],
      tabIndex: 0,
      loading: false,
      shopList: []
    }
  },
  components: {
    linkPage,
    ImgWrap
  },
  computed: {},
  watch: {
    // 'value.columnNums': {
    //   handler: function(nval, oval) {
    //     setTimeout(() => {
    //       this.changeWgtHeight()
    //     }, 100)
    //   },
    //   deep: true
    // },
    'value.data': {
      handler: function (nval, oval) {},
      deep: true
    },
    'value.location': {
      handler: function (nval, oval) {
        if (nval) {
          this.localPosition()
        }
      },
      deep: true
    }
  },
  created() {
    window.init = () => {
      this.initMap()
    }
  },
  mounted() {
    // 判断是否pc端（调用方法）
    if (this.$route.name == 'index') {
      this.loadScript()
      // console.log(this.$route,"route111111111");
    } else {
      this.getShopListAdmin()
      // console.log(this.$route,"route2222222222");
    }
  },
  methods: {
    handleOverShow(index) {
      this.tabIndex = index
      if (index == 0) {
        this.value.data = this.shopList
      } else {
        let tag = this.value.selectTagList[index]
        var shopList = []
        this.shopList.forEach((shop) => {
          shop.tagList.forEach((t) => {
            if (t.tag_id == tag.tag_id) {
              shopList.push({
                'name': shop.name,
                'tag': t.tag_name,
                'banner': shop.banner,
                'logo': shop.logo
              })
            }
          })
        })
        this.value.data = shopList
      }
      // if(this.value.data.length >5 ){
      //     this.value.height = 680
      // }else{
      //   this.value.height = 340
      // }

      console.log(JSON.stringify(shopList))
    },
    loadScript() {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.src = `https://api.map.baidu.com/api?v=2.0&ak=${baiduKey}&callback=init`
      document.body.appendChild(script)
      console.log('动态加载SDK')
    },
    initMap(id) {
      console.log('地图初始化')
      // eslint-disable-next-line no-undef
      var map = new BMap.Map('map-container1')
      this.localPosition()
    },
    localPosition() {
      let _this = this
      // 当前位置
      let geolocation = new BMap.Geolocation()
      // geolocation.enableSDKLocation()
      let gc = new BMap.Geocoder()

      geolocation.getCurrentPosition(
        function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 判断用户是否允许授权
            let mk = new BMap.Marker(r.point)
            if (r.accuracy == null || r.accuracy == 'null') {
              mk = new BMap.Marker(r.point)
            }
            // 定位后，获取省，市名称
            let pt = r.point
            gc.getLocation(pt, function (rs) {
              let addComp = rs.addressComponents
              let province = addComp.province
              let city = addComp.city
              // let area = addComp.district
              // 坐标本地存储
              localStorage.setItem('position', JSON.stringify(r))

              const params = {
                lat: r.point.lat,
                lng: r.point.lng,
                show_discount: 1,
                company_id: 1,
                province: r.point.lat ? addComp.province : '北京市',
                city: r.point.lat ? addComp.city : '北京市',
                area: r.point.lat ? addComp.district : '昌平区',
                // 根据经纬度或地区查询
                type: r.point.lat ? 0 : 1,
                sort_type: 1
              }
              province = province.replace(/市/i, '')
              _this.getShopList(params)

              // _this.handleSearch()
            })
            // _this.map.panTo(r.point)
            // console.log('您的位置：' + r.point.lng + ',' + r.point.lat)
          } else {
            alert('failed' + this.getStatus())
          }
        },
        {
          enableHighAccuracy: true
        }
      )
    },
    changeWgtHeight() {
      this.value.height =
        document.getElementById(`wgt-goods_title__${this.value.uuid}`).clientHeight +
        document.getElementById(`wgt-goods_list__${this.value.uuid}`).clientHeight +
        20
    },
    async getShopList(params) {
      this.loading = true
      const { list, tagList } = await this.$api.item.getNearbyShop(params)
      this.value.data = []
      this.shopList = list

      let length = list.length >= 10 ? 10 : list.length
      for (var i = 0; i < length; i++) {
        this.value.data.push(list[i])
      }
      this.value.allTagList = JSON.parse(JSON.stringify(tagList))
      tagList.unshift({ 'tag_id': -1, 'tag_name': '全部' })
      this.value.selectTagList = tagList
      this.loading = false
    },
    // 给装修器和管理端专用的方法
    async getShopListAdmin() {
      const { list, tagList } = await this.$api.item.getNearbyShop({
        show_discount: 1,
        company_id: 1,
        type: 1,
        sort_type: 1
      })
      this.value.data = []
      this.shopList = list

      let length = list.length >= 10 ? 10 : list.length
      for (var i = 0; i < length; i++) {
        this.value.data.push(list[i])
      }
      this.value.allTagList = JSON.parse(JSON.stringify(tagList))
      tagList.unshift({ 'tag_id': -1, 'tag_name': '全部' })
      this.value.selectTagList = tagList
      this.loading = false
    }
  }
}
</script>
