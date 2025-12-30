/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>
<style lang="scss">
.coupons-list {
  display: flex;
  flex-wrap: wrap;
  .goods-image {
    position: relative;
    margin-left: 10px;
    margin-top: 10px;
    .link-page {
      display: flex;
    }
    .btn_receive {
      position: absolute;
      color: #606266;
      top: 42%;
      right: 10px;
      background: #fff;
      border: 2px solid #dcdfe6;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
    }
  }
  .linkHid {
    display: none;
  }
  .linkItem {
    background: #f0f2f5;
    width: 378px;
    height: 115px;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 40px 10px 30px;
    .discount_title {
      line-height: 1.2;
      font-size: 52px;
      color: #333;
      margin-top: 10px;
      margin-left: 10px;
      display: flex;
      align-items: flex-end;
      max-width: 30%;
      span {
        font-size: 14px;
        color: #999;
      }
    }
    .conpon_info {
      margin-left: 20px;
      line-height: 1.2;
      width: 164px;
      .conpon_title {
        font-size: 18px;
        color: #333;
        margin-top: 10px;
        //超出的文本隐藏
        overflow: hidden;
        //溢出的显示省略号
        text-overflow: ellipsis;
        //溢出不换行
        white-space: nowrap;
      }
      .conpon_desc {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
  .img-wrap {
    width: 33%;
    min-height: 115px;
    height: max-content !important;
  }
  .conponImg {
    background: transparent;
  }
}
</style>
<template>
  <div class="widget-W0021" :style="widgetStyle">
    <slot></slot>
    <div class="widget-W0021-inner widget-inner" :style="widgetInnerStyle">
      <div class="widget-W0021-body widget-body" :style="widgetBodyStyle">
        <div class="wgt-goodstab_tab">
          <div
            class="title"
            :style="{
              backgroundColor: value.wgtBackgroundColor,
              borderRadius: `${value.wgtBorderRadius ? '15px' : '0px'}`
            }"
          >
            <span
              class="title-span"
              :style="{ color: value.wgtTextColor, fontSize: value.wgtTitleFontSize + 'px' }"
              >{{ value.text }}</span
            >
          </div>
          <div class="tabList" style="margin-left: 26px; margin-top: 25px">
            <span
              class="tabItem"
              :style="{ color: value.wgtSubTextColor, fontSize: value.wgtSubTitleFontSize + 'px' }"
              >{{ value.subTitle }}</span
            >
          </div>

          <linkPage class="more" :mode="mode" :to="handleLinkPage(value.moreLinkData)">
            {{ value.moreText }}
            <i class="espier-icon espier-icon-xiangyou-01"></i>
          </linkPage>
          <!-- <ul class="tabList">
            <a class="tabItem" v-for="(tab, index) in value.data" :key="`tabitem__${index}`"
              @mouseover="handleOverShow(index)" :class="{ active: index == tabIndex }">{{ tab.text }}</a>
          </ul> -->
        </div>
        <div class="wgt-goodstab_goods">
          <div class="wgt-goodstab_goods_scroll">
            <div
              v-for="(item, index) in value.data"
              :class="[`goods-wrap`, { active: index == tabIndex }]"
              :id="`goods-wrap__${value.coupons_id}_${index}`"
              :key="`goods-wrap__${index}`"
            >
              <div class="goods-wrap__info coupons-list">
                <div class="goods-image" v-for="(itemx, indexx) in value.data" :key="indexx">
                  <!-- <linkPage :mode="mode" :to="`/items/${itemx.card_id}`" > -->
                  <linkPage :mode="mode">
                    <ImgWrap
                      :class="[itemx.icon_url_list != '' ? 'conponImg' : '']"
                      v-if="
                        (!itemx.icon_url_list && !itemx.card_type) ||
                        (itemx.icon_url_list && itemx.card_type)
                      "
                      :src="itemx.icon_url_list"
                      :width="378"
                      :height="115"
                    />
                    <div
                      v-if="!itemx.icon_url_list && itemx.card_type"
                      :class="[itemx.icon_url_list ? 'linkHid' : 'linkItem']"
                    >
                      <p v-if="itemx.card_type == 'discount'" class="discount_title">
                        {{ 10 - itemx.discount / 10 }}
                        <span>折</span>
                      </p>
                      <p v-if="itemx.card_type == 'cash'" class="discount_title">
                        {{ itemx.reduce_cost / 100 }}
                        <span>RMB</span>
                      </p>
                      <p v-if="itemx.card_type == 'gift'" class="discount_title">
                        适用商品：{{ itemx.object_use_for }}
                      </p>
                      <div class="conpon_info">
                        <p class="conpon_title" :title="itemx.title">{{ itemx.title }}</p>
                        <p class="conpon_desc">{{ itemx.description }}</p>
                      </div>
                    </div>
                    <span class="btn_receive" @click="handleClickGetCoupon(itemx)">领取</span>
                  </linkPage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { goodsPrice } from '../../common/comps'
import braidStyle from './props'
import mixins from '../../mixins'
import ImgWrap from '../../common/img-wrap'
import linkPage from '../../common/linkpage'
import { attrs, LinkMaps } from '../../mixins/common-props'

const WIDGET_NAME = 'W0021'

export default {
  name: WIDGET_NAME,
  icon: 'icon-chuchuang1',
  title: '优惠券',
  mixins: [mixins],
  panel: braidStyle,
  navs: ['nav2', 'nav2-1'],
  // 挂件类型
  widgetType: ['pc', 'h5'],
  setting: {
    // 元件名称
    name: '优惠券',
    alias: '优惠券',
    text: '优惠券 >',
    type: WIDGET_NAME,
    ...attrs,
    widthDisabled: true,
    height: 462,
    heightDisabled: true,
    wgtTextColor: '#ffffffff',
    wgtBackgroundColor: '#FF5D02',
    wgtPriceColor: '#FF0036',
    wgtTitleColor: '#3B3B3B',
    wgtBorderRadius: false,
    wgtTitleFontSize: 18,
    wgtPriceFontSize: 18,
    wgtToFixed: 2,
    subTitle: '副标题',
    wgtSubTitleFontSize: 16,
    wgtSubTextColor: '#3B3B3B',
    moreText: '更多',
    moreLinkData: {},
    pathData: {},
    data: [
      {
        coupons_id: '',
        icon_url_list: '',
        title: '',
        price: 0,
        coupons_name: '商品名称',
        linkPage: 'coupons',
        linkPageLabel: '优惠券'
      },
      {
        coupons_id: '',
        icon_url_list: '',
        title: '',
        price: 0,
        coupons_name: '商品名称',
        linkPage: 'coupons',
        linkPageLabel: '优惠券'
      },
      {
        coupons_id: '',
        icon_url_list: '',
        title: '',
        price: 0,
        coupons_name: '商品名称',
        linkPage: 'coupons',
        linkPageLabel: '优惠券'
      }
    ],
    foregroundColor: '#ffffffff',
    imgWidth: 200,
    imgHeight: 200
  },
  watch: {
    data(oldData, newData) {
      console.log(oldData)
      console.log(newData)
    }
  },
  data() {
    return {
      defaultImg: '',
      tabIndex: 0,
      imgWidth: 0,
      imgHeight: 0,
      leftWidth: 0.3333
    }
  },
  components: {
    goodsPrice,
    ImgWrap,
    linkPage
  },
  computed: {
    goodsImageStyle() {
      const { value } = this
      return {
        // width: Math.floor((value.width * (1 - this.leftWidth)) / 2),
        // height: Math.floor((value.width * (1 - this.leftWidth)) / 2)
        width: 200,
        height: 200
      }
    }
  },
  created() {
    // 数据兼容处理
    if (this.isRenderMode()) {
      const { data } = this.value
      data.forEach((item) => {
        console.log(item)
        // item.data.forEach(coupons => {
        //   if (!coupons.coupons_id) {
        //     coupons = {
        //       coupons_id: '',
        //       icon_url_list: '',
        //       title: '',
        //       price: 0,
        //       coupons_name: '商品名称',
        //       tagList: [],
        //       linkPage: 'coupons',
        //       linkPageLabel: '优惠券'
        //     }
        //   }
        // })
      })
      console.log(JSON.stringify(data))
      // this.getGooditems()
    }
  },
  methods: {
    callback() {},
    handleOverShow(index) {
      this.tabIndex = index
    },
    handleClickGooditem(item) {
      if (this.isRenderMode()) {
        this.$router.push(LinkMaps[item.linkPage](item))
      }
    },
    async handleClickGetCoupon(coupon) {
      if (this.isRenderMode()) {
        await this.$api.cart.receiveCard({
          card_id: coupon.card_id
        })
        this.$Modal.confirm({
          title: '领取成功',
          content: '优惠券领取成功，现在去使用',
          showFooter: true,
          onOk: () => {
            this.$router.push('/items?keywords=')
          },
          onCancel: () => {}
        })
      }
    }
  }
}
</script>
