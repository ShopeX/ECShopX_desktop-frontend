/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$num-color : #FF5D02;
@import './member.scss';
.page-userinfo {
    background: #f5f5f5;
    overflow: hidden;
    .container {
      background: transparent;
    }
    .member-hd {
  // @include clearfix();
      height: 214px;
      display: inline-block;
      margin-top: 15px;
    .hd-avatar {
      width: 214px;
      height: 214px;
      background: #fff;
      float: left;
      box-shadow: 4px 4px 3px #f9f9f9;
      position: relative;
      text-align: center;
      .avatar-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-sizing: border-box;
        margin: 30px auto 0;
      }
      .avatar-name {
        text-align: center;
        font-size: 14px;
        margin-top: 8px;
        .title {
          @include text-overflow();
          font-size: 13px;
          padding: 0 20px;
        }
      }
      .avatar-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        border-top: 1px solid $color-border-gray;
        padding: 0 10px;
        background: linear-gradient(270deg, #322F5C 0%, #071030 100%);
        .title {
          // float: left;
          position: relative;
          width: 86px;
          height: 50px;
          line-height: 20px;
          color: #FFD454;
        }
        .btn-buy {
          position: relative;
          width: 78px;
          height: 30px;
          background: linear-gradient(96deg, #ECC793 0%, #E0A271 100%);

          font-size: 14px;
          left: 120px;
          bottom: 40px;
          line-height: 22px;
          border-radius: 15px;
          line-height: 28px;
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .hd-tabs {
      width: 702px;
      height: 214px;
      float: left;
      background: #fff;
      // margin-top: 32px;
      margin-left: 20px;
      .user-tabs {
        width: 100%;
        padding-top: 62px;
        .tab {
          display: inline-block;
          text-align: center;
          .num {
            font-size: 30px;
            font-weight: 600;
            word-spacing: -10px;
            color: $num-color;
            span {
              color: inherit;
            }
          }
          .title {
            color: #888;
          }
        }
      }
    }
  }

  .member-bd {
    margin-top: 24px;
    margin-bottom: 20px;
    @include clearfix();
    .member-bd-left {
      width: 682px;
      float: left;
      .order-container {
        background: #fff;
        .block-bd {
          @include clearfix();
          .tab {
            width: 20%;
            float: left;
            text-align: center;
          }
          .new_iconfont{
            font-size: 36px;
            color: #888;
            position: relative;
          }
          .ec-icon {
            font-size: 36px;
            color: #888;
            position: relative;
          }
          .badge {
            position: absolute;
            display: inline-block;
            width: 20px;
            height: 20px;
            // background: #f00;
            line-height: 20px;
            text-align: center;
            color: #fff;
            border-radius: 50%;
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            right: -8px;
          }
        }
      }
      .follow-goods {
        margin-top: 10px;
        background: #fff;
        .block-bd {
          padding: 0 10px;
          @include clearfix();
          .followgoods-item {
            width: 25%;
            float: left;
            padding: 10px;
            text-align: center;
            img {
              width: 105px;
              height: 105px;
              object-fit: cover;
            }
            .goods-price {
              font-size: 15px;
            }
          }
        }
      }
    }
    .member-bd-right {
      width: 234px;
      float: left;
      margin-left: 20px;
      .footprint-container {
        background: #fff;
        .block-bd{
          &:nth-child(2) {
            min-height: 90px;
          }
        }
        .goods {
          margin: 0 10px;
          height: 80px;
          @include clearfix();
          img {
            width: 80px;
            height: 80px;
            float: left;
            border-radius: 4px;
          }
          &:not(:last-child) {
            margin-bottom: 10px;
          }
          .goods-con {
            margin-left: 90px;
          }
          .goods-name {
            @include multi-ellipsis(2);
            font-size: 13px;
            width: 150px;
            height: 40px;
          }
          .goods-price {
            font-size: 15px;
            margin-top: 20px;
          }
        }
      }
    }

    .block-hd {
      @include clearfix();
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      .title {
      }
      .more {
        float: right;
        cursor: pointer;
        font-size: 12px;
        color: #888;
        i {
          position: relative;
          font-size: 14px;
        }
      }
    }

    .block-bd {
      padding: 10px 0 20px;
    }
  }
}

</style>

<template>
  <div class="page-userinfo">
    <div v-if="false" class="widget-w0006"
    	style="margin-top:0px;margin-bottom:0px;border-style:solid;border-top-width:0px;border-top-color:#ffffffff;border-right-width:0px;border-right-color:#ffffffff;border-bottom-width:0px;border-bottom-color:#ffffffff;border-left-width:0px;border-left-color:#ffffffff;background-color:#ffffffff;">
    	<div class="widget-w0006-inner widget-inner"
    		style="width:1190px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;background-color:#ffffffff;margin:0 auto;box-sizing:border-box;">
    		<div class="widget-w0006-body widget-body"
    			style="width:1190px;height:207px;margin-right:auto;margin-left:auto;">
    			<!---->
    			<!---->
    			<div data-type="W0007" data-uuid="b4a37fbfca" class="widget-w0007"
    				style="margin-top:0px;margin-bottom:0px;border-style:solid;border-top-width:0px;border-top-color:#ffffffff;border-right-width:0px;border-right-color:#ffffffff;border-bottom-width:0px;border-bottom-color:#ffffffff;border-left-width:0px;border-left-color:#ffffffff;background-color:#ffffffff;position:absolute;top:160px;left:0px;">
    				<div class="widget-w0007-inner widget-inner"
    					style="width:auto;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;background-color:#ffffffff;margin:0 auto;box-sizing:border-box;">
    					<div class="widget-w0007-body widget-body"
    						style="width:1190px;height:40px;margin-right:auto;margin-left:auto;">
    						<div class="all-category open">
    							<div class="all-category__btn"
    								style="background-color:#FF5D02;color:#FFFFFF;font-weight:800;">
    								{{ $t('member.user-info.869309-0') }}
    							</div>
    						</div>
    						<div class="navs-con"><span class="link-page nav-item"><a href="/custompage?pageid=3"
    									style="color:#333333;" class="">{{ $t('member.user-info.869309-1') }}</a>
    								<!---->
    								<!---->
    							</span><span class="link-page nav-item"><a href="/cart" style="color:#333333;"
    									class="">{{ $t('member.user-info.869309-2') }}</a>
    								<!---->
    								<!---->
    							</span><span class="link-page nav-item"><a href="/member/user-info" style="color:#333333;"
    									class="">{{ $t('member.user-info.869309-3') }}</a>
    								<!---->
    								<!---->
    							</span><span class="link-page nav-item">
    								<!---->
    								<!----> <a style="color:#333333;">{{ $t('member.user-info.869309-4') }}</a>
    							</span><span class="link-page nav-item">
    								<!---->
    								<!----> <a style="color:#333333;">{{ $t('member.user-info.869309-5') }}</a>
    							</span><span class="link-page nav-item">
    								<!---->
    								<!----> <a style="color:#333333;"></a>
    							</span></div>
    					</div>
    				</div>
    			</div>
    			<!---->
    			<div data-type="W0010" data-uuid="75e004a882" class="widget-0010"
    				style="margin-top:0px;margin-bottom:0px;border-style:solid;border-top-width:0px;border-top-color:#ffffffff;border-right-width:0px;border-right-color:#ffffffff;border-bottom-width:0px;border-bottom-color:#ffffffff;border-left-width:0px;border-left-color:#ffffffff;background-color:#ffffffff;position:absolute;top:33px;left:975px;">
    				<div class="widget-0010-inner widget-inner"
    					style="width:auto;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;background-color:#ffffffff;margin:0 auto;box-sizing:border-box;">
    					<div class="widget-0010-body widget-body"
    						style="width:142px;height:38px;margin-right:auto;margin-left:auto;">
    						<div class="minicart-wrap">
    							<div class="minicart-btn"
    								style="background-color:rgba(255,255,255,1);color:rgba(255,93,2,1);border:1px solid rgba(245,166,35,1);">
    								<i class="new_iconfont icon-new-pc-cart"></i>
    								{{ $t('member.user-info.869309-6') }}

    								<span class="count" style="background:rgba(255,93,2,1);">0</span>
    							</div>
    							<div class="minicart-list">
    								<div class="cart-main-wrap"></div>
    								<div class="cart-total">
    									<div class="cart-total__hd">
    										{{ $t('member.user-info.869309-7') }}
    										<span
    											class="goods-price widgets-goods-price widgets-goods-price__default clearfix"
    											style="color:#e1251b;font-size:18px;"><span class="price__symbol"
    												style="font-size:14px;margin-top:5px;"> ¥</span> <span
    												class="price__int">0</span> <span class="price__decimal">.00</span>
    											<!---->
    										</span>
    									</div>
    									<div class="cart-total__bd">
    										<div class="btn btn-cart">{{ $t('member.user-info.869309-8') }}</div>
    										<div class="btn btn-checkout"
    											style="background-color:rgba(255,255,255,1);color:rgba(255,93,2,1);">
    											{{ $t('member.user-info.869309-9') }}
    										</div>
    									</div>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    			<!---->
    			<div data-type="W0008" data-uuid="66b299d804" class="widget-w0008"
    				style="margin-top:0px;margin-bottom:0px;border-style:solid;border-top-width:0px;border-top-color:#ffffffff;border-right-width:0px;border-right-color:#ffffffff;border-bottom-width:0px;border-bottom-color:#ffffffff;border-left-width:0px;border-left-color:#ffffffff;background-color:#ffffffff;position:absolute;top:31px;left:192px;">
    				<div class="widget-w0008-inner widget-inner"
    					style="width:auto;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;background-color:#ffffffff;margin:0 auto;box-sizing:border-box;">
    					<div class="widget-w0008-body widget-body"
    						style="width:630px;height:66px;margin-right:auto;margin-left:auto;position:relative;left:;">
    						<div class="widget-w0008__wrap" style="border-color:rgba(255,0,54,1);"><i
    								class="espier-icon espier-icon-sousuo-01"></i> <input :placeholder="$t('member.user-info.869309-10')" type="text"
    								value="" class="search-input">
    							<div class="search-icon"
    								style="color: rgb(255, 255, 255); background: linear-gradient(90deg, rgb(255, 90, 0) 0%, rgb(255, 134, 0) 100%);">
    								{{ $t('member.user-info.869309-10') }}
    							</div>
    						</div>
    						<div class="hot-keyword"><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:rgba(140,140,140,1);">{{ $t('member.user-info.869309-11') }}</a>
    							</span><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:rgba(140,140,140,1);">{{ $t('member.user-info.869309-12') }}</a>
    							</span><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:rgba(255,93,2,1);">{{ $t('member.user-info.869309-13') }}</a>
    							</span><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:#8C8C8C;">{{ $t('member.user-info.869309-14') }}</a>
    							</span><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:#8C8C8C;">{{ $t('member.user-info.869309-15') }}</a>
    							</span><span class="link-page hot-keyword__item">
    								<!---->
    								<!----> <a style="color:#8C8C8C;">{{ $t('member.user-info.869309-16') }}</a>
    							</span></div>
    					</div>
    				</div>
    			</div>
    			<!---->
    			<div data-type="W0003" data-uuid="01dcc9a7dc" class="widget-w0003"
    				style="margin-top:0px;margin-bottom:0px;border-style:solid;border-top-width:0px;border-top-color:#ffffffff;border-right-width:0px;border-right-color:#ffffffff;border-bottom-width:0px;border-bottom-color:#ffffffff;border-left-width:0px;border-left-color:#ffffffff;background-color:#ffffffff;position:absolute;top:33px;left:86px;">
    				<div class="widget-w0003-inner widget-inner"
    					style="width:auto;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;background-color:#ffffffff;margin:0 auto;box-sizing:border-box;">
    					<div class="widget-w0003-body widget-body"
    						style="width:62px;height:62px;margin-right:auto;margin-left:auto;"><img
    							src="https://mhespier-vue.oss-cn-beijing.aliyuncs.com/default_project/image/1/2021/12/28/9aca6495c4a56eaa54ad767e00ad1001WhMnspCHPsxh1OeU9wdymymKovv9fYse"
    							alt="" width="100%" height="100%" style="display: block"> </div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>

    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="account" active="user-info"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-hd">
            <div class="hd-avatar">
              <img
                class="avatar-img"
                :src="memberInfo.avatar || defaultImg"
              />
              <div class="avatar-name">
                <div>{{ memberInfo.username }}</div>
                <div class="title" v-if="vipgrade.is_vip">{{ vipgrade.guide_title }}</div>
              </div>
              <div class="avatar-info">
                <div class="title">{{ $t('member.user-info.869309-17') }}
                <br />
                {{ $t('member.user-info.869309-18') }}</div>
                <div class="btn-buy" @click="toLink('/member/vip')" >
                  {{ vipgrade.is_had_vip ? $t('member.user-info.869309-19') : $t('member.user-info.869309-20') }}
                </div>
              </div>
            </div>

            <div class="hd-tabs">
              <div class="user-tabs">
                <template v-for="tab in userTabs">
                  <!-- <div class="tab" :style="{ width: `${100 / userTabs.length}%` }"> -->
                  <div class="tab" :style="{ width: `${100 / (userTabs.length-1)}%` }" :v-show="tab.title!=$t('member.user-info.869309-21')">
                    <router-link :to="tab.link">
                      <h4 class="num">
                        <span v-if="tab.icon" class="icon">{{ tab.icon }}</span>
                        <span>{{ tab.num }}</span>
                      </h4>
                      <div class="title">{{ tab.title }}</div>
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <section class="member-bd">
            <div class="member-bd-left">
              <div class="order-container">
                <div class="block-hd">
                  <span class="title">{{ $t('member.user-info.869309-22') }}</span>
                  <nuxt-link class="more" to="/member/trade">
                    {{ $t('member.user-info.869309-23') }}<i class="ec-icon ec-icon-right"></i>
                  </nuxt-link>
                </div>

                <div class="block-bd">
                  <template v-for="tab in orderTabs">
                    <div class="tab">
                      <div class="icon" @click="toLink(tab.link)">
                        <i class="new_iconfont"  :class="tab.icon">
                          <i class="badge" v-if="tab.num != 0" style="background: #FF0036">{{
                            tab.num
                          }}</i>
                        </i>
                      </div>
                      <div class="title">{{ tab.title }}</div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="follow-goods">
                <div class="block-hd">
                  <span class="title">{{ $t('member.user-info.869309-24') }}</span>
                  <nuxt-link class="more" to="/member/collector">
                    {{ $t('member.user-info.869309-23') }}<i class="ec-icon ec-icon-right"></i>
                  </nuxt-link>
                </div>
                <div class="block-bd">
                  <div
                    class="followgoods-item"
                    v-for="(item, index) in collectGoods"
                    :key="`collectgoods-${index}`"
                    @click="handelClickToLink(item.item_id)"
                  >
                    <SpImg :src="item.item_image" no-size class="img" />
                    <div class="goods-con">
                      <SpPrice class="goods-price" :value="item.item_price / 100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="member-bd-right">
              <div class="footprint-container">
                <div class="block-hd">
                  <span class="title">{{ $t('member.user-info.869309-25') }}</span>
                  <nuxt-link class="more" to="/member/foottrace">
                    {{ $t('member.user-info.869309-23') }}<i class="ec-icon ec-icon-right"></i>
                  </nuxt-link>
                </div>
                <div class="block-bd">
                  <div
                    class="goods"
                    v-for="(item, index) in footGoods.filter((item, index) => index < 3)"
                    :key="`footgoods__${index}`"
                    @click="handelClickToLink(item.item_id)"
                  >
                    <SpImg :src="item.itemData.pics.length > 0 ? item.itemData.pics[0] : ''" no-size class="img" />
                    <div class="goods-con">
                      <div class="goods-name">{{ item.itemData.item_name }}</div>
                      <SpPrice class="goods-price" :value="item.itemData.price / 100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberInfo, getCount, getHistoryList } from '@/api/member'
import { mixin } from '@/mixins'
import smenu from '../member/comps/smenu'
import goodFocus from './comps/good-focus'

export default {
  //  middleware: 'authenticated',
  // async asyncData ({ app, route }) {
  //   let { region } = await app.$api.member.areaList()
  //   return {
  //     region
  //   }
  // },

  mixins: [mixin],
  data() {
    return {
      userTabs: [
        {
          num: 0,
          title: this.$t('member.user-info.869309-26'),
          button: this.$t('member.user-info.869309-27'),
          link: '/member/coupon'
        },
        {
          num: 0,
          title: this.$t('member.user-info.869309-28'),
          button: this.$t('member.user-info.869309-29'),
          link: '/member/point'
        },
        {
          icon: '￥',
          num: '0',
          title: this.$t('member.user-info.869309-21'),
          button: this.$t('member.user-info.869309-30'),
          link: '/member/user-info'
        }
      ],
      orderTabs: {
        normal_notpay_notdelivery: {
          num: 0,
          icon: 'icon-new-pc-daifukuan',
          title: this.$t('member.user-info.869309-31'),
          link: '/member/trade?status=5'
        },
        normal_payed_daishouhuo: {
          num: 0,
          icon: 'icon-new-pc-daishouhuo',
          title: this.$t('member.user-info.869309-32'),
          link: '/member/trade?status=1'
        },
        daipingjia: {
          icon: 'icon-new-pc-daipingjia',
          num: '',
          title: this.$t('member.user-info.869309-33'),
          link: '/member/trade?status=3'
        },
        normal_payed_daiziti: {
          num: 0,
          icon: 'icon-new-pc-daiziti',
          title: this.$t('member.user-info.869309-34'),
          link: '/member/trade?status=6'
        },
        aftersales: {
          num: 0,
          icon: 'icon-new-pc-shouhou',
          title: this.$t('member.user-info.869309-35'),
          link: '/member/trade/aftersale-list'
        }
      },
      orderList: [],
      footGoods: [],
      collectGoods: [],
      pointNum: 3,
      active: 1,
      vipgrade: {
        guide_title: '',
        is_vip: false
      },
      memberInfo: {},
      defaultImg:require('@/assets/imgs/avator.png')
    }
  },
  components: { smenu, goodFocus },

  computed: {
    getTheme() {
      const { themeColor } = this.pageConfig
      return {
        borderColor: themeColor,
        color: themeColor
      }
    }
  },
  created() {
    if (process.client) {
      this.getMemberInfo()
      this.getCount()
      // 我的足迹
      this.getHistoryList()
      // 我的关注
      this.getCollectionList()
    }
  },
  mounted() {},
  methods: {
    // 跳转
    toLink(link) {
      this.$router.push(link)
    },
    handelClick(type, i) {
      this.active = i
    },
    handelClickToLink(id) {
      this.$router.push(`/items/${id}`)
    },
    async getMemberInfo() {
      let res = await memberInfo()

      let { coupon, deposit, point, vipgrade } = res

      // PC不显示已过期优惠券数量，所以请求之后减去已过期优惠券
      const { total_count } = await this.$api.member.getUserCardList({
        status: 3,
        scope_type:'all'
      })

      // this.userTabs[0].num = coupon
      this.userTabs[0].num = coupon-Number(total_count)
      this.userTabs[2].num = (deposit / 100).toFixed(2)
      this.userTabs[1].num = point
      this.vipgrade = vipgrade
      this.memberInfo = res.memberInfo

      let { list } = await this.$api.trade.list({
        pageSize: 2,
        page: 1,
        order_type: 'normal',
        status: '0'
      })

      this.orderList = list.map((item) => {
        let obj = {
          order_id: item.order_id,
          delivery_code: item.delivery_code,
          delivery_corp_name: item.delivery_corp_name,
          pic: item.items[0].pic || '',
          item_name: item.items[0].item_name || ''
        }
        return obj
      })
    },
    async getCount() {
      let res = await getCount()
      // let oKey = Object.getOwnPropertyNames(res)
      for (let key in res) {
        // res[key] += 5
        if (this.orderTabs[key]) {
          this.orderTabs[key].num = res[key]
        }
      }
    },
    async getHistoryList() {
      let { list } = await this.$api.member.getHistoryList()
      this.footGoods = list
    },
    async getCollectionList() {
      const { list } = await this.$api.member.getCollectionList()
      this.collectGoods = list.slice(0, 4)
    }
  }
}
</script>
