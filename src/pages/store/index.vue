/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-store {
  // position: relative;
  width: 1150px;
  margin: 0 auto;
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
  .search-form {
    float: left;
    width: 380px;
    background: $color-bg-gray;
    margin-left: 20px;
    &__input {
      background: #fff;
      .sp-address-picker.vertical .y-s {
        width: 185px;
        float: left;
        margin-bottom: 0;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
    &__result {
      // padding: 0 20px 26px 0;
      padding: 0 26px 0 20px;
      width: 380px;
      height: 669px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 26px;
      letter-spacing: 0px;
      color: #212322;
      overflow-y: scroll;
      .no-store {
        padding-top: 17px;
      }
      ul {
        background: #f2f2f2;

        // padding: 15px;
        height: 100%;
        // overflow: auto;

        li {
          padding: 17px 0;
          cursor: pointer;
        }
        li:not(:last-child) {
          border-bottom: 1px solid $color-border-gray;
          // padding-bottom: 10px;
          // margin-bottom: 10px;
        }
        .logo {
          line-height: 28px;
          margin-right: 18px;
        }
        .txt {
          width: 238px;
        }
        .aicon-small-logo {
          font-size: 28px;
        }
      }
      .store-name {
        font-weight: bold;
        margin-bottom: 6px;
        line-height: 28px;
      }
    }
    .title {
      font-size: 18px;
      padding-bottom: 10px;
    }
  }
  .here {
    float: right;
  }
  .map {
    width: 750px;
    height: 750px;
    overflow: hidden;
    margin: 0;
    float: left;
  }
  .mb {
    display: none;
  }
  .local-position {
    line-height: 24px;
    letter-spacing: 0px;
    color: #212322;
    font-size: 12px;
    background: #fff;
    line-height: 51px;
    cursor: pointer;
    .aicon-navigation {
      color: #a8a8a8;
    }
  }

  @include respond(sm) {
    .mb {
      display: block;
    }
    .mb-title {
      font-size: 18px;
      text-align: center;
      background: #e5e5e5;
      height: 46px;
      line-height: 46px;
    }
    .search-form {
      .title {
        display: none;
      }
      &__result {
        padding: 0;
        ul {
          li {
            display: flex;
            align-items: center;
          }
        }
      }
      width: 100%;
      position: initial;
    }
    .search-result {
      padding: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

<template>
  <div class="page-store page-body clearfix">
    <div class="page-store__nav">
      <div class="title">{{ $t('store.index.407028-0') }}</div>
    </div>
    <div id="map-container1" class="map"></div>
    <div class="search-form">
      <div class="search-form__input">
        <!-- <div class="title">搜索店铺</div> -->
        <SpAddressPicker
          v-model="address"
          vertical
          valuetype="label"
          :showCountry="false"
          @onChange="handleAddressOnChange"
          @onSearch="handleSearch"
        ></SpAddressPicker>
        <!-- <SpButton type="primary" size="large" long @click="handleSearch">搜索</SpButton> -->
      </div>
      <div class="local-position" @click="localPosition">
        <i class="aicon aicon-navigation"></i>
        {{ $t('store.index.407028-1') }}
      </div>
      <div class="search-form__result">
        <ul v-if="list.length > 0">
          <li class="clearfix" v-for="(item,index) in list" :key="index" @click="openInfo(item)">
            <div class="fl logo">
              <!-- <img src="~/assets/imgs/dickies-logo-mini.png" /> -->
              <i class="aicon aicon-small-logo"></i>
            </div>
            <div class="fl txt">
              <div class="address-detail">
                <!-- <i class="mb-iconfont mb-iconfont-location"></i> -->
                <div class="store-name">{{item.store_name}}</div>
                {{item.address}}
              </div>

              <div class="mobile">
                <span v-if="item.mobile">
                  <!-- <i class="mb-iconfont mb-iconfont-dianhua"></i> -->
                  {{item.mobile}}
                </span>
                <!-- <SpButton type="text" class="here" @click="openInfo(item)">
                  到这里去
                  <i class="mb-iconfont mb-iconfont-right"></i>
                </SpButton> -->
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="no-store">{{ $t('store.index.407028-2') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { SpAddressPicker } from '@/components'
import { analytics } from '@/plugins/analytics'
// import logoicon from '～/assets/imgs/dickies-logo.png'
// const baiduKey = 'D93M9iDMmDrqr7v5IzHVtEc4WCUifyTP'
const baiduKey = '5IaKAT5exp7lhdRsNDTWKXrvqZLytIFg'

export default {
  data () {
    return {
      list: [],
      address: [],
      addressLable: [],
      opts: {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: '', // 信息窗口标题
        enableMessage: true // 设置允许信息窗发送短息
      },
      result: null,
      status: 'search'
    }
  },
  head () {
    return {
      title: this.$t('store.index.407028-3'),
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.$t('store.index.407028-3') },
        { hid: 'description', name: 'description', content: this.$t('store.index.407028-3') }
      ]
    }
  },
  created () {
    window.init = () => {
      this.initMap()
    }
  },
  components: { SpAddressPicker },
  mounted () {
    this.loadScript()
    analytics.pageReady({
      page: {
        pageName: this.$t('store.index.407028-4'),
        pageType: 'store search',
        breadcrumb: this.$t('store.index.407028-4')
      }
    })
    this.addressLable = [this.$t('store.index.407028-5'), this.$t('store.index.407028-6')]
    this.handleSearch()
  },
  methods: {
    loadScript () {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.src = `https://api.map.baidu.com/api?v=2.0&ak=${baiduKey}&callback=init`
      document.body.appendChild(script)
    },
    initMap (id) {
      // eslint-disable-next-line no-undef
      let map = new BMap.Map('map-container1')
      // eslint-disable-next-line no-undef
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12)
      // map.enableScrollWheelZoom(true)
      map.addControl(
        // eslint-disable-next-line no-undef
        new BMap.NavigationControl({
          // eslint-disable-next-line no-undef
          type: BMAP_NAVIGATION_CONTROL_LARGE, // 缩放控件类型 仅包含缩放按钮
          // eslint-disable-next-line no-undef
          anchor: BMAP_ANCHOR_TOP_LEFT // 右下角
          // offset: new BMap.Size(1, 1) // 进一步控制缩放按钮的水平竖直偏移量
        })
      )
      function myFun (result) {
        var cityName = result.name
        map.setCenter(cityName)
      }
      // eslint-disable-next-line no-undef
      var myCity = new BMap.LocalCity()
      myCity.get(myFun)

      this.map = map
      // eslint-disable-next-line no-undef
      // let point = new BMap.Point(121.423442, 31.181791) // 创建Map实例
      // this.map.centerAndZoom(point, 14)
      // eslint-disable-next-line no-undef
      // let marker = new BMap.Marker(point) // 创建标注
      // map.addOverlay(marker)
    },
    async handleSearch () {
      let self = this
      if (this.addressLable.length > 0) {
        const { list } = await this.$api.store.storeSeach({
          area: this.addressLable.join(',')
        })

        if (list.length === 0) {
          this.$Message.error(this.$t('store.index.407028-7'))
          return
        }

        // 创建图标
        this.map.clearOverlays()
        list.forEach(item => {
          let lng = parseFloat(item.lng)
          let lat = parseFloat(item.lat)
          // eslint-disable-next-line no-undef
          let point = new BMap.Point(lng, lat)
          // eslint-disable-next-line no-undef
          var myIcon = new BMap.Icon(
            require(`../../assets/imgs/resource/201911/pc/local.png`),
            // eslint-disable-next-line no-undef
            new BMap.Size(28, 39),
            {
              imageSize: new BMap.Size(28, 39)
            }
          )
          // eslint-disable-next-line no-undef
          var marker = new BMap.Marker(point, { icon: myIcon }) // 创建标注
          marker.addEventListener('click', function (e) {
            self.openInfo(item)
          })
          this.map.addOverlay(marker)
        })

        this.map.centerAndZoom(this.addressLable[0], 12)

        this.list = list
        this.status = 'result'
      }
    },
    handleAddressOnChange (e) {
      this.addressLable = e
    },
    openInfo (item) {
      this.result = item
      var point = new BMap.Point(parseFloat(item.lng), parseFloat(item.lat))
      var infoWindow = new BMap.InfoWindow(
        `${item.area}${item.address}${item.store_name}`,
        this.opts
      ) // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, point) // 开启信息窗口
      this.status = 'detail'

      setTimeout(() => {
        this.map.centerAndZoom(point, 12)
      }, 0)
    },
    localPosition () {
      let _this = this
      // 当前位置
      let geolocation = new BMap.Geolocation()
      // geolocation.enableSDKLocation()
      let gc = new BMap.Geocoder()
      geolocation.getCurrentPosition(function (r) {
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

            province = province.replace(/市/i, '')
            // alert(province + ':' + city)
            _this.addressLable = [province, city]
            _this.handleSearch()
          })

          _this.map.addOverlay(mk)
          _this.map.panTo(r.point)
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat)
        } else {
          alert('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
    }

  }
}
</script>
