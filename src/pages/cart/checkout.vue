/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./checkout.scss"></style>

<template>
  <div class="page-checkout">
    <div class="container clearfix">
      <div class="checkout-title">{{ $t('cart.checkout.032780-0') }}</div>

      <div class="content-body clearfix">
        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('cart.checkout.032780-1') }}</h4>
          <div class="content-item-bd address">
            <!-- expressType: {{expressType}} -->
            <SpBtnPickerGroup v-model="expressType" @onChange="onChangeExpress">
              <SpBtnPicker
                v-for="(item, index) in addressTabs"
                :value="item.value"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >{{ item.name }}</SpBtnPicker
              >
            </SpBtnPickerGroup>
          </div>
        </div>

        <!-- 收货地址 -->
        <div class="content-item" v-if="expressType == 'logistics'">
          <h4 class="content-item-hd">
            {{ $t('cart.checkout.032780-2') }}
            <span
              class="btn-text"
              :style="{
                color: themeColor
              }"
              @click="handleAddAddress"
              >{{ $t('cart.checkout.032780-3') }}</span
            >
          </h4>
          <div class="content-item-bd address-list">
            <!-- defaultAddress: {{defaultAddress}} -->
            <SpBtnPickerGroup v-model="defaultAddress" @onChange="onChangeAddress">
              <div
                class="address-item"
                v-for="(item, index) in addressList"
                :key="`btn-item__${index}`"
              >
                <SpBtnPicker :value="item.address_id" :theme="themeColor">{{
                  item.username
                }}</SpBtnPicker>
                <div class="address-item-detail">
                  <div class="phone">{{ item.telephone }}</div>
                  <div class="d-detail">
                    {{ `${item.province} ${item.city} ${item.county} ${item.adrdetail}` }}
                  </div>
                  <div
                    class="def-tag"
                    v-if="item.is_def"
                    :style="{
                      backgroundColor: themeColor
                    }"
                  >
                    {{ $t('cart.checkout.032780-4') }}
                  </div>
                  <div class="btn-tools">
                    <!-- <span class="btn btn-text" :style="{
                      color: themeColor
                    }">设为默认</span> -->
                    <span
                      class="btn btn-text"
                      :style="{
                        color: themeColor
                      }"
                      @click="handleEditAddress(item)"
                      >{{ $t('cart.checkout.032780-5') }}</span
                    >
                    <!-- <span class="btn btn-text" :style="{
                      color: themeColor
                    }">删除</span> -->
                  </div>
                </div>
              </div>
            </SpBtnPickerGroup>
          </div>
        </div>

        <div class="content-item" v-if="expressType == 'ziti'">
         <!--  <h4 class="content-item-hd">收货信息</h4>
          <div class="content-item-bd ziti" v-if="zitiAddress">
            <div class="ziti-name">{{ zitiAddress.name }}</div>
            <div class="ziti-address">{{ zitiAddress.store_address }}</div>
            <div class="ziti-time">营业时间：{{ zitiAddress.hour }}</div>
            <div class="ziti-phone">{{ $t('cart.checkout.032780-7') }}{{ zitiAddress.phone }}</div>
          </div> -->
          <h4 class="content-item-hd">{{ $t('cart.checkout.032780-6') }}</h4>

          <div class="content-item-bd address-list" v-if="zitiList&&zitiList.length>0">
            <!-- defaultAddress: {{defaultAddress}} -->
            <SpBtnPickerGroup v-model="zitiInfo.pickup_location" @onChange="zitiHandle">
              <div class="address-item" v-for="(item, index) in zitiList" :key="`btn-item__${index}`">
                <SpBtnPicker :value="item.id" :theme="themeColor">{{
                  item.name
                }}</SpBtnPicker>
                <div class="address-item-detail">
                  <div class="phone">{{ $t('cart.checkout.032780-7') }}{{ item.contract_phone }}</div>
                  <div class="d-detail">
                    {{ $t('cart.checkout.032780-8') }}{{ item.city }} {{ item.area }} {{ item.address }}
                  </div>
                  <img src="~/assets/imgs/map.png"  @click="initMap(item)" style="margin:0 35px;width: 30px;" />
                </div>
              </div>
            </SpBtnPickerGroup>
          </div>
          <div v-else class="content-item-bd ziti-list">
            <div class="ziti-list-phone">{{ $t('cart.checkout.032780-9') }}</div>
          </div>
          <!-- <div id="containerMap" style="width: 100%;height:200px;"></div> -->
          <div v-if="zitiCut" class="ziti-info">
            <div>
              <span class="ziti-info-name">{{ $t('cart.checkout.032780-10') }}</span>
              <SpSelect style="width: 200px;" v-model="zitiInfo.pickup_date" :data="zitiDateList" :placeholder="$t('cart.checkout.032780-11')" @change="changeZitiDate"></SpSelect>
              <SpSelect style="width: 200px;" v-model="zitiInfo.pickup_time" :data="zitiTimeList" :placeholder="$t('cart.checkout.032780-12')"></SpSelect>
            </div>
            <div><span class="ziti-info-name">{{ $t('cart.checkout.032780-13') }}</span><SpInput style="width: 300px;" v-model="zitiInfo.receiver_name"></SpInput></div>
            <div><span class="ziti-info-name">{{ $t('cart.checkout.032780-14') }}</span><SpInput style="width: 300px;" v-model="zitiInfo.receiver_mobile"></SpInput></div>
          </div>
        </div>

        <div class="content-body clearfix">
        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('cart.checkout.032780-15') }}</h4>
          <div class="content-item-bd address">
            <!-- expressType: {{expressType}} -->
            <SpBtnPickerGroup v-model="paymentType" @onChange="onChangePaymentType">
              <SpBtnPicker
                v-for="(item, index) in paymentTypeList"
                :value="item.value"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >{{ item.name }}</SpBtnPicker
              >
            </SpBtnPickerGroup>
          </div>
        </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('cart.checkout.032780-16') }}</h4>
          <div class="content-item-bd goods-list">
            <div
              class="goods-list-item"
              v-for="(item, index) in list"
              :key="`goods-list-item__${index}`"
            >
              <SpImg class="goods-img" :src="item.pic" no-size />
              <div class="goods-name">
                <div class="p-name">{{ item.item_name }}</div>
                <div class="p-extra">{{ item.item_spec_desc }}</div>
              </div>
              <div class="goods-price">
                <SpPrice :value="item.price / 100" />
              </div>
              <div class="goods-num">{{ `x ${item.num}` }}</div>
            </div>
          </div>
          <div>
            <SpInput
            :placeholder="$t('cart.checkout.032780-17')"
            v-model="remark"
            ></SpInput>
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">
            {{ $t('cart.checkout.032780-18') }}
            <SpRadio type="checkbox" class="use-invoice" :theme="themeColor" v-model="useInvoice"
              >{{ $t('cart.checkout.032780-19') }}</SpRadio
            >
          </h4>
          <div class="content-item-bd invoice">
            <div v-if="useInvoice">
              <SpRadioGroup v-model="invoiceTyle">
                <SpRadio label="individual" :theme="themeColor">{{ $t('cart.checkout.032780-20') }}</SpRadio>
                <SpRadio label="unit" :theme="themeColor">{{ $t('cart.checkout.032780-21') }}</SpRadio>
              </SpRadioGroup>
              <!-- {{ $t('cart.checkout.032780-20') }} -->
              <div class="invoice-info" v-if="invoiceTyle == 'individual'">
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-22') }}</div>
                  <SpInput v-model="invoice_content.title"></SpInput>
                </div>
              </div>
              <!-- {{ $t('cart.checkout.032780-21') }} -->
              <div class="invoice-info" v-if="invoiceTyle == 'unit'">
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-23') }}</div>
                  <SpInput v-model="invoice_content.content"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-24') }}</div>
                  <SpInput v-model="invoice_content.registration_number"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-25') }}</div>
                  <SpInput v-model="invoice_content.company_address"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-26') }}</div>
                  <SpInput v-model="invoice_content.company_phone"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-27') }}</div>
                  <SpInput v-model="invoice_content.bankname"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">{{ $t('cart.checkout.032780-28') }}</div>
                  <SpInput v-model="invoice_content.bankaccount"></SpInput>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item" v-if="!orderData.is_distribution">
          <div class="integral">
            <h4 class="content-item-hd">
              {{ $t('cart.checkout.032780-29') }}
            </h4>
            <div class="integral-rules" style="cursor:pointer" @click="dailogIntegralVisible=true">{{ $t('cart.checkout.032780-30') }}</div>
          </div>
          <div>{{ $t('cart.checkout.032780-31') }}{{ orderData.user_point }}{{ $t('cart.checkout.032780-32') }}{{ orderData.max_point }}</div>
          <div class="integral-item">
            <SpRadio type="checkbox" :theme="themeColor" v-model="useIntegral"  @change="handleDeducted"
              >{{ $t('cart.checkout.032780-33') }}</SpRadio
            >
            <input class="integral-input" type="number" v-show="useIntegral" v-model="point_use" @blur="pointBlur">
            <SpRadio type="checkbox" :theme="themeColor" v-model="useAllDeducted" @change="handleAllDeducted" v-show="useIntegral && (orderData.deduct_point_rule&&orderData.deduct_point_rule.full_amount)"
              >{{ $t('cart.checkout.032780-34') }}</SpRadio
            >
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">{{ $t('cart.checkout.032780-35') }}</h4>
          <div class="content-item-bd coupon-list">
            <SpBtnPickerGroup v-model="coupon" @onChange="onChangeCoupon" class="couponInfo">
              <SpBtnPicker
                v-for="(coupon, index) in couponList"
                class="coupon-item"
                :value="coupon.code"
                :disabled="!coupon.valid"
                :key="`btn-item__${index}`"
                :theme="themeColor"
              >
                <div class="coupon-wrap">
                  <div class="coupon-name">
                    <template v-if="coupon.card_type == 'discount'"
                      >{{ (100 - coupon.discount) / 10 }}<span class="symbol">{{ $t('cart.checkout.032780-36') }}</span></template
                    >
                    <template v-if="coupon.card_type == 'cash'"
                      ><SpPrice :value="coupon.reduce_cost / 100"></SpPrice
                    ></template>
                  </div>
                  <div class="coupon-title">{{ coupon.title }}</div>
                </div>
                <div class="coupon-date">{{ $t('cart.checkout.032780-37', [coupon.end_date]) }}</div>
              </SpBtnPicker>
              <SpBtnPicker class="coupon-item not-use" :value="''" :theme="themeColor"
                >{{ $t('cart.checkout.032780-38') }}</SpBtnPicker
              >
            </SpBtnPickerGroup>
          </div>
        </div>
        <div class="content-item">
          <div class="content-item-bd checkout-total">
            <div class="total-row">
              <div class="label">{{ orderData.items_count }}{{ $t('cart.checkout.032780-39') }}</div>
              <div class="value"><SpPrice :value="orderData.item_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">{{ $t('cart.checkout.032780-40') }}</div>
              <div class="value"><SpPrice :value="orderData.freight_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">{{ $t('cart.checkout.032780-41') }}</div>
              <div class="value"><SpPrice :value="0 - orderData.discount_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">{{ $t('cart.checkout.032780-29') }}：</div>
              <div class="value"><SpPrice :value="0 - orderData.point_fee / 100" /></div>
            </div>
          </div>
        </div>
        <div class="content-ft">
          <div class="actual-total">
            <span class="label">{{ $t('cart.checkout.032780-43') }}</span>
            <SpPrice :value="orderData.total_fee / 100" />
          </div>
          <div
            class="content-ft-btn"
            @click="handleSubmitOrder"
            :style="{
              backgroundColor: themeColor
            }"


          >
            {{ $t('cart.checkout.032780-44') }}
          </div>
        </div>
      </div>
    </div>

    <SpModal
      :title="addType == 'post' ? $t('cart.checkout.032780-45') : $t('cart.checkout.032780-46')"
      v-model="dailogVisible"
      :width="600"
    >
      <AddressItemAdd
        :type="addType"
        :addressInfoFrom="addressInfoFrom"
        :theme="themeColor"
        @onClick="addAddressSumbit"
        @clickCancel="clickCancel"
      />
    </SpModal>
    <SpModal
      :title="$t('cart.checkout.032780-47')"
      v-model="dailogIntegralVisible"
      :width="600"
    >
      <div style="height:200px;margin:20px;">
        <div>{{ $t('cart.checkout.032780-48') }}</div>
        <div>{{ $t('cart.checkout.032780-49') }}{{orderData.deduct_point_rule&&orderData.deduct_point_rule.deduct_proportion_limit}}%；</div>
        <div>{{ $t('cart.checkout.032780-50') }}</div>
        <div> 2、{{orderData.deduct_point_rule&&orderData.deduct_point_rule.deduct_point}}{{ $t('cart.checkout.032780-29') }}1元；</div>
      </div>
    </SpModal>
    <SpModal
      :title="$t('cart.checkout.032780-52')"
      v-model="dailogMapVisible"
      :width="700"
    >
      <div style="padding:30px 0;">
        <div id="containerMap" style="width: 90%;height:450px;margin:0 auto"></div>
      </div>
    </SpModal>
  </div>
</template>
<script>
import { mixin } from '@/mixins'
import AddressItemAdd from '@/pages/member/address-item-add'
import { validate } from '@/utils'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'authenticated',
  mixins: [mixin],
  components: {
    AddressItemAdd
  },
  data() {
    return {
      addressList: [],
      orderData: {}, //订单数据
      list: [], //商品数据
      creatData: {}, //
      dailogVisible: false,
      dailogIntegralVisible: false,
      addressInfoFrom: {}, //修改地址信息
      addType: 'post', //修改地址类型，post新增，put更新,
      params: {},
      expressType: 'logistics',
      addressTabs: [{ name: this.$t('cart.checkout.032780-53'), value: 'logistics' }],
      defaultAddress: '',
      curAddressIndex: 0,
      curAddress: null,
      couponList: [],
      coupon: '',
      paymentType: 'wxpaypc',
      paymentTypeList: [{name:this.$t('cart.checkout.032780-54'),value:'wxpaypc'},{name:this.$t('cart.checkout.032780-55'),value:'offline_pay'}],
      zitiAddress: null,
      zitiList: null,
      zitiCut:false,
      zitiDateList:[],    // 可选择的提货日期列表
      zitiTimeList:[],    // 可选择的提货时间列表
      zitiInfo:{
        receiver_name:'',
        receiver_mobile:'',
        pickup_location:'',
        pickup_date:'',
        pickup_time:'',
      },
      // 是否使用发票
      useInvoice: false,
      // 是否使用积分
      useIntegral: false,
      // 是否全额抵扣
      useAllDeducted: false,
      // 发票类型
      invoiceTyle: 'individual',
      // 开票信息
      invoice_content: {
        title: '', // 发票title
        content: '', // 公司名称,
        company_address: '', // 公司地址
        registration_number: '', // 税号
        bankname: '', // 银行名称
        bankaccount: '', // 银行账号
        company_phone: '' // 电话号码
      },
      point_use:0,    //输入的积分
      maxPoint:0,     //可输入的最大值
      dailogMapVisible:false,
      remark:'',
      isFirstCalc: true, // 是否第一次计算
      pointPayFirst: false, //是否使用积分支付
    }
  },
  mounted() {
    this.getAddressList()
    this.fetchZiTiShop()
  },
  methods: {
    ...mapActions({
      CART_GETINFO: 'cart/CART_GETINFO'
    }),

    initMap (val) {
      this.dailogMapVisible = true
      let { lat,lng } = val
      console.log(lat,lng);
      //定义地图中心点坐标
      this.$nextTick(()=>{

        var center = new TMap.LatLng(lat,lng)
        var map = new TMap.Map(document.getElementById('containerMap'), {
            center: center,//设置地图中心点坐标
            zoom: 16,   //设置地图缩放级别
            // pitch: 43.5,  //设置俯仰角
            // rotation: 45    //设置地图旋转角度
        })
        var marker = new TMap.MultiMarker({
          map: map,
          styles: {
            // 点标记样式
            marker: new TMap.MarkerStyle({
              width: 10, // 样式宽
              height: 20, // 样式高
              anchor: { x: 10, y: 30 }, // 描点位置
            }),
          },
          geometries: [
            // 点标记数据数组
            {
              // 标记位置(纬度，经度，高度)
              position: center,
              id: 'marker',
            },
          ],
        });

        // var a = document.querySelector('canvas+div:last-child')
        // a.style.display = 'none'

      });
    },

    async fetchZiTiShop() {
      const { id } = this.$route.query
      const res = await this.$api.shop.getShop({ distributor_id: id })
      this.zitiAddress = res
      if (res && res.is_ziti) {
        this.addressTabs = [
          { name: this.$t('cart.checkout.032780-53'), value: 'logistics' },
          { name: this.$t('cart.checkout.032780-56'), value: 'ziti' }
        ]
      }
    },
    // 获取优惠券
    async getValidCoupon() {
      const { id, mode } = this.$route.query
      const items = this.list
        .filter((item) => item.order_item_type !== 'gift')
        .map((item) => {
          const { item_id, num, total_fee: price } = item
          return {
            item_id,
            price,
            num
          }
        })
      const params = {
        // valid: true,
        page_no: 1,
        page_size: 999,
        status: 1,
        is_checkout: true,
        cart_type: mode,
        distributor_id: id,
        use_platform: 'mall',
        page_type: 'picker',
        items
      }
      const { list } = await this.$api.member.couponList(params)
      // const { list } = await this.$api.member.getUserCardList(params)
      this.couponList = list
    },
    onChangePaymentType(){

    },
    // 获取地址列表
    async getAddressList() {
      const { list } = await this.$api.member.addressList()
      this.addressList = list
      const fd = list.find((item) => item.is_def)
      if (fd) {
        this.defaultAddress = fd.address_id
      }
      this.getFreightFee()
    },
    // 积分输入规则
    pointBlur(){
      let { point_use,maxPoint } = this
      if(point_use>maxPoint){
        point_use = maxPoint
      }
      this.point_use = point_use*1
      // 判断是否全额支付
      if(this.point_use === this.orderData.max_point){
        this.useAllDeducted = true
      }else{
        this.useAllDeducted = false
      }
      this.getFreightFee()
    },
    // 单选是否使用积分
    handleDeducted(){
      if(this.useIntegral===false){
        this.point_use = 0
        this.useAllDeducted = false   //全额抵扣单选关闭
      } else {
        if (this.pointPayFirst) { // 后端打开默认积分开关
          this.point_use = this.expressType == 'ziti' ? this.orderData.max_point_ziti : this.orderData.max_point
          this.isFirstCalc = true
        } else {
          this.point_use = 0
        }
      }
      this.getFreightFee()
      console.log(this.useIntegral,"useIntegral",this.point_use);
    },
    // 全额支付
    handleAllDeducted(){
      // 全额抵扣用deduct_point字段直接赋值
      this.point_use = this.orderData.max_point
      this.getFreightFee()
    },
    // 切换取货类型
    async onChangeExpress() {
      if(this.expressType == "ziti"){
        const { mode,id } = this.$route.query
        let position = JSON.parse(localStorage.getItem('position')) || {}
        // 获取自提点列表
        const { list } = await this.$api.member.pickuplocation({
          lat:position?.point?.lat,
          lng:position?.point?.lng,
          cart_type: mode,
          // isNostores: 1,   // 请求全部
          distributor_id:id
        })
        this.zitiList = list
      }
      if (this.expressType == 'logistics') {
        await this.getFreightFee()
      }
      if (this.pointPayFirst && this.useIntegral) { // 后端打开默认积分开关
        this.point_use = this.expressType == 'ziti' ? this.orderData.max_point_ziti : this.orderData.max_point
        this.isFirstCalc = true
      } else {
        this.point_use = 0
      }
      this.getFreightFee()
    },
    onChangeAddress() {
      this.getFreightFee()
    },
    onChangeCoupon() {
      this.getFreightFee()
    },
    // 获取商品信息
    async getFreightFee() {
      this.$loading({ background: 'transparent' })
      const params = this.getParams()
      try {
        const {
          items,
          item_fee,
          is_distribution,
          discount_fee,
          freight_fee,
          total_fee,
          totalItemNum,
          user_point,   //可用积分
          max_point,    //本单可用积分
          max_point_ziti=0,
          point_fee,    //抵扣金额
          deduct_point_rule,
          coupon_discount,
          point_rule
        } = await this.$api.cart.freightFee(params)
        this.orderData = {
          item_fee,
          discount_fee: discount_fee,
          freight_fee,
          is_distribution,
          items_count: totalItemNum,
          total_fee,
          user_point,
          max_point,
          max_point_ziti,
          point_fee,
          deduct_point_rule,
          coupon_discount
        }
        this.list = items
        this.getValidCoupon()
        this.$loading().close()
        // maxPoint可输入的最大积分
        const max_point_value = this.expressType === 'ziti' ? max_point_ziti : max_point
        if(user_point<max_point_value){
          this.maxPoint = user_point
        }else{
          this.maxPoint = max_point_value
        }
        this.pointPayFirst = Number(point_rule?.point_pay_first) > 0
        if(this.isFirstCalc && this.pointPayFirst){
          this.point_use = Math.min(max_point_value,user_point)
          this.isFirstCalc = false
        }
      } catch (e) {
        this.$loading().close()
      }
    },
    // 订单提交参数
    getParams() {
      const { id, mode, order_type, seckill_id, ticket } = this.$route.query
      const { defaultAddress, coupon,point_use } = this
      let pay_type = 'wxpaypc'

      if(this.point_use > 0 && this.orderData.total_fee == 0){   // 判断是否积分支付
        pay_type = 'point'
      }else{
        pay_type = this.paymentType
      }

      let params = {
        distributor_id: id,
        cart_type: mode,
        order_type: order_type || 'normal',
        seckill_id,
        seckill_ticket: ticket,
        // pay_type: 'wxpaypc',
        pay_type: pay_type,
        promotion: 'normal',
        // receipt_type: 'logistics',
        receipt_type: this.expressType,
        remark: this.remark,
        point_use:point_use
      }

      if(coupon == -1 || coupon == ''){  // 不使用优惠券需要传 not_use_coupon
        params.not_use_coupon = 1
      }

      // 使用优惠券
      if (coupon != -1) {
        params = {
          ...params,
          coupon_discount: coupon
        }
      }
      const fdAddress = this.addressList.find((item) => item.address_id == defaultAddress)
      if (fdAddress) {
        params = {
          ...params,
          receiver_address: fdAddress.adrdetail,
          receiver_city: fdAddress.city,
          receiver_district: fdAddress.county,
          receiver_mobile: fdAddress.telephone,
          receiver_name: fdAddress.username,
          receiver_state: fdAddress.province
        }
      }
      if (this.expressType == 'ziti'){
        params = {
          ...params,
          ...this.zitiInfo,
        }
      }
      return params
    },
    // 新增收货地址
    handleAddAddress() {
      this.addType = 'post'
      this.addressInfoFrom = {}
      this.dailogVisible = true
    },
    // 编辑地址
    handleEditAddress(item) {
      this.addType = 'put'
      this.addressInfoFrom = item
      this.dailogVisible = true
    },
    // 提交订单
    async handleSubmitOrder() {
      if (this.expressType == 'logistics' && !this.defaultAddress) {
        this.$Message.error(this.$t('cart.checkout.032780-57'))
        return
      }else if (this.expressType == 'ziti'){
        const {
          receiver_name,
          receiver_mobile,
          pickup_date,
          pickup_time
        } = this.zitiInfo

        if (receiver_name.length==0) {
          this.$Message.error(this.$t('cart.checkout.032780-58'))
          return
        } else if (receiver_mobile.length==0) {
          this.$Message.error(this.$t('cart.checkout.032780-59'))
          return
        } else if (pickup_date.length==0) {
          this.$Message.error(this.$t('cart.checkout.032780-60'))
          return
        } else if (pickup_time.length==0) {
          this.$Message.error(this.$t('cart.checkout.032780-61'))
          return
        }
      }
      let params = this.getParams()
      console.log(params,"params-----------");
      if (this.useInvoice) {
        const {
          title,
          content,
          registration_number,
          company_address,
          bankname,
          bankaccount,
          company_phone
        } = this.invoice_content
        if (this.invoiceTyle == 'individual') {
          if (!title) {
            this.$Message.error(this.$t('cart.checkout.032780-62'))
            return
          }
        } else if (this.invoiceTyle == 'unit') {
          if (!content) {
            this.$Message.error(this.$t('cart.checkout.032780-63'))
            return
          }
          if (!validate.checkTax(registration_number)) {
            this.$Message.error(this.$t('cart.checkout.032780-64'))
            return
          }
        }
        const invoice_content = {
          title: this.invoiceTyle,
          content: this.invoiceTyle == 'individual' ? title : content,
          company_address,
          registration_number,
          bankname,
          bankaccount,
          company_phone
        }
        params = {
          ...params,
          invoice_type: 'normal',
          invoice_content
        }
      }

      this.$loading({ background: 'transparent' })
      try {
        const { order_id } = await this.$api.cart.creatOrder(params)
        const { mode } = this.$route.query
        if (mode == 'cart') {
          this.CART_GETINFO()
        }
        this.$loading().close()
        if(this.orderData.total_fee===0){
          console.log(this.orderData.total_fee===0);
          // 积分抵扣支付
          this.$router.push({ path: `/finish/result?order_id=${order_id}` })
        }else{
          // 正常支付
          this.$router.push({ path: `/cashier?order_id=${order_id}` })
        }
      } catch (e) {
        this.$loading().close()
      }
    },
    addAddressSumbit() {
      this.getAddressList()
      this.dailogVisible = false
    },
    clickCancel() {
      this.dailogVisible = false
    },
    // 选择日期后
    changeZitiDate(){
      this.zitiInfo.pickup_time = ''
      var day = new Date().getDate();
      let pickup_date = this.zitiInfo.pickup_date.substring(8,10)
      if(day == pickup_date){
        this.getTimeFil()   // 当天的话重新筛选时间
      }
    },
    // 选择自提店铺回显提货时间
    zitiHandle(){
      // this.expressType == "ziti"
      let val = null
      // 获取选中店铺数据
      this.zitiList.map(ele=>{
        if(ele.id===this.zitiInfo.pickup_location){
          val = ele
        }
      })
      // console.log(val,this.zitiInfo.pickup_location);
      this.zitiCut = true
      this.zitiDateList = []
      this.zitiTimeList = []

      // 选择列表--时间
      this.zitiTimeList = []
      val.hours.map(ele=>{
        this.zitiTimeList.push({ label:ele[0]+'-'+ele[1], value:ele})
      })

      // 选择列表--日期
      this.zitiDateList = []
      let pkc = this.dateFilter()
      // console.log(pkc);  // 近十天的日期和事件数组
      if(val.wait_pickup_days == 0){
        // 选择当天领取
        this.zitiDateList= [{ label:this.$t('cart.checkout.032780-65'), value:pkc[0].date}]
      }else{
        // 预约领取---1.该时间之后，只能选择第二天的自提时间；如上面最长预约选择只能当天自提，则该时间后下单不能选择自提。
        let sum = this.getHoursFil(val)?-1:0
        // console.log(sum);  // 当前时间

        // 预约领取---2.最长预约时间筛选：天数从第二天开始计算，如设置为可预约1天内订单，则买家最长可预约第二天上门自提；天为自然日。
        let list = []
        pkc.map((ele,index)=>{
          // 筛选非当天的最长预约日期--index==0时为当天,sum是由上面的逻辑得到的
          if(index>sum && index<=val.wait_pickup_days){
            list.push({
              label:ele.name, value:ele.date, week:ele.week
            })
          }
        })

        // 预约领取---3.可领取的星期几匹配
        list.map(ele=>{
          val.workdays.map(ele2=>{
            if(ele.week == ele2){
              this.zitiDateList.push(ele)
            }
          })
        })
      }
    },
    getTimeFil(){
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let time = String(hh) + String(mf)
      let list = []
      this.zitiTimeList.map(ele=>{
        if(time < ele.value[1].replace(':','')){    // 筛选可选的时间段中当前时间已不可选的时间段
          list.push({ label:ele.value[0]+'-'+ele.value[1], value:ele.value})
        }
      })
      if(list.length==0){
        list.push({ label:this.$t('cart.checkout.032780-66'), value:'',disabled:true})
      }
      this.zitiTimeList = list
    },
    getHoursFil(val){
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let timeCurrent = String(hh) + String(mf)
      let res = val.latest_pickup_time.replace(':','')
      // console.log(res,"res",timeCurrent);
      // 当前时间小于指定时间
      if(timeCurrent < res){
        return true
      }else{
        return false
      }
    },
    // 日期与时间关联
    dateFilter(){
      let data=[]
      // this.start=this.getDay(+12);
      // this.end=this.getDay();
      // let start=this.getDay(+12);
      // let end=this.getDay();
      for(let i=10;i>=0;i--){
        data.push(this.getDay(+i))
      }
      var date=data.reverse()//得出一周的日期进行排序
      this.week=date;
      var date=this.week;
      var pkc=[];/* 用于存储展示的日期数据 */
      // var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      var weekday=["7","1","2","3","4","5","6"];
      date.forEach((item,index)=>{//循坏日期
        var f=new Date(item);
        var week=f.getDay()//计算出星期几
        var str1=item.split('-');
        var strs=str1[1]+'-'+str1[2];

        var weeks=weekday[week]/* 将计算出来的时间带入数字得出中文 */
        var time= Math.round(new Date(item) / 1000)//时间戳转换
        var s={}//用于存储每个日期对象
        s.date=item;
        s.name=strs;
        s.week=weeks;
        s.times=time;
        pkc.push(s)
      })
      return pkc
    },
    // 获取时间
    getDay(day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate =  this.doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
    },
    doHandleMonth(month){
      var m = month;
      if(month.toString().length == 1){
        m =month;
      }
      return m;
    },
  }
}
</script>
