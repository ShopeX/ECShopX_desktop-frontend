/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-cashier {
  margin: 30px 0 50px;
  .payment-info {
    border-bottom: 1px solid #efefef;
    .success-info {
      margin-top: 30px;
      padding-bottom: 30px;
      text-align: center;
      .success-info-tl {
        height: 46px;
        line-height: 32px;
        font-size: 24px;
        color: $color-success-text;
      }
    }
  }
  .payment-block {
    margin-top: 20px;
    .b-item {
      margin-bottom: 10px;
      @include clearfix();
      .label {
        width: 100px;
        float: left;
        text-align: right;
        color: #888;
      }
      .value {
        float: left;
      }
    }
    .sp-btn-picker {
      width: 164px;
      height: 53px;
    }
  }

  .btn-pay {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-top: 30px;
    margin-left: 100px;
    cursor: default;
  }

  .wxpay-bg {
    width: 742px;
    height: 406px;
    background: url('~assets/imgs/window-wx.jpg');
    margin: 0 auto;
    position: relative;
    #qr {
      position: absolute;
      width: 200px !important;
      height: 200px !important;
      left: 81px;
      top: 114px;
      z-index: 10;
    }
  }

  .el-textarea {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        &__content {
          width: 100%;
          border-radius: 4px;
          color: #606266;
          border-color: #dcdfe6;
          padding: 5px 15px;
        }
        &__count {
          color: #909399;
          background: #fff;
          font-size: 12px;
          position: absolute;
          bottom: 8px;
          right: 10px;
          z-index: 10;
        }
      }

  .account-box{
    display: flex;
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    &-left{
      width: 80px;
      height: 80px;
      margin-right: 12px;
    }
    &-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-item{
        line-height: initial;
        text-align: left;
      }
    }
  }

  .examine{
    &-title{
      font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    &-item{
      margin-bottom: 12px;
    }
  }

  .qr-payment-area {
    margin-top: 20px;
    text-align: center;
    
    .qr-code-image {
      margin-bottom: 20px;
    }
  }

  .countdown-info {
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    
    .countdown-text {
      font-size: 16px;
      color: #333;
      margin-bottom: 8px;
      
      .countdown-time {
        color: #e74c3c;
        font-weight: bold;
        font-size: 18px;
      }
    }
    
    .countdown-tip {
      font-size: 14px;
      color: #666;
    }
  }


  .offline-pay {
    display: flex;
    margin-top: 16px;
    &-left {
      width: 420px;
      margin-right: 32px;
      &-title{
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .account-select {
        display: flex;
        flex-direction: column;
      }
      .sp-btn-picker {
        width: 420px;
        height: auto;
      }
    }
    &-right {
      flex: 1;
      .upload-pic-tips{
        padding: 8px;
        background: #F3F3F5;
        margin-top: 16px;
        color: #999;
      }
      .required::before{
        content: '*';
        position: absolute;
        left: -8px;
        top: -2px;
        color: red;
      }
      .upload {
          // text-align: left;
          .input {
            visibility: hidden;
            height: 19px;
            width: 1px;
          }
          .spimg-item {
            display: inline-block;
            vertical-align: text-top;
            margin-right: 10px;
            position: relative;
            .spimg1 {
              width: 90px;
              height: 90px;
            }
            &-delete{
              position: absolute;
              right: -5px;
              top: -5px;
              width: 16px;
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: #666;
              color: #fff;
              cursor: pointer;

              z-index: 10;
            }
          }
          .input-icon {
            display: inline-block;
            vertical-align: text-top;
            width: 90px;
            height: 90px;
            background-color: #f6f6f6;
            text-align: center;
            cursor: pointer;
            .ec-icon {
              font-size: 32px;
              line-height: 90px;
              color: #ddd;
            }
          }
        }
    }
  }
}
</style>
<template>
  <div class="page-cashier">
    <div class="container">
      <div class="payment-info" v-if="!isView">
        <div class="success-info">
          <div class="success-info-tl">{{ $t('cashier.index.984361-0') }}</div>
          <div class="success-info-tl-text">{{ $t('cashier.index.984361-1') }}</div>
        </div>
      </div>

      <div class="payment-block" v-show="isPayment">
        <div class="b-item">
          <div class="label">{{ $t('cashier.index.984361-2') }}</div>
          <div class="field">{{ tradeId }}</div>
        </div>
        <div class="b-item" v-if="!isView">
          <div class="label" >{{ $t('cashier.index.984361-3') }}</div>
          <div class="field">
            <SpPrice :value="total_fee / 100" />
          </div>
        </div>
        <div class="b-item" v-if="!isView">
          <div class="label">{{ $t('cashier.index.984361-4') }}</div>
          <div class="field">
            <SpBtnPickerGroup v-model="paymentType">
              <SpBtnPicker
                v-for="(item, index) in paymentList"
                :value="item.type"
                :key="`btn-item__${index}`"
                :theme="themeColor"
              >
                <img v-if="item.img" :src="item.img" alt="" width="100%" />
                <span
                  v-else
                  style="font-size: 14px;display: block;height: 100%;line-height: 53px;"
                  >{{ item.title }}</span
                >
              </SpBtnPicker>
              <!-- <SpBtnPicker
                v-for="(item, index) in paymentList"
                :value="item.pay_type_code"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >
                <img :src="item.img" alt="" width="100%"/>
              </SpBtnPicker> -->
            </SpBtnPickerGroup>
          </div>
        </div>
        <div class="offline-pay" v-if="paymentType == 'offline_pay'">
          <div class="offline-pay-left">
            <div class="offline-pay-left-title">{{ $t('cashier.index.984361-5') }}</div>
            <SpBtnPickerGroup v-model="accountId" class="account-select">
              <SpBtnPicker
                v-for="(item, index) in accountList"
                :value="item.id"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                :disabled="isView"
              >
              <div class="account-box">
                <img class="account-box-left" :src="item.pic" alt="" width="100%" />
                <div class="account-box-right">
                  <div class="account-box-right-item">{{ $t('cashier.index.984361-6') }}{{ item.bank_account_name }}</div>
                  <div class="account-box-right-item">{{ $t('cashier.index.984361-7') }}{{ item.bank_name }}</div>
                  <div class="account-box-right-item">{{ $t('cashier.index.984361-8') }}{{ item.bank_account_no }}</div>
                </div>
              </div>
              </SpBtnPicker>
            </SpBtnPickerGroup>
          </div>
          <div class="offline-pay-right">
            <div class="offline-pay-left-title">{{ $t('cashier.index.984361-9') }}</div>
            <SpForm ref="form" :model="transferInfo" :rules="transferInfoRules">
              <SpFormItem prop="pay_sn">
                <span class="label-text">{{ $t('cashier.index.984361-10') }}</span>
                <SpInput class="input-text" v-model="transferInfo.pay_sn" />
              </SpFormItem>
              <SpFormItem prop="total_fee">
                <span class="label-text required">{{ $t('cashier.index.984361-11') }}</span>
                <SpInput class="input-text" disabled :value="(transferInfo.total_fee/100).toFixed(2)" />
              </SpFormItem>
              <SpFormItem prop="transfer_remark">
                <span class="label-text">{{ $t('cashier.index.984361-12') }}</span>
                <div class="el-textarea">
                  <textarea
                    class="el-textarea__content"
                    rows="3"
                    v-model="transferInfo.transfer_remark"
                    :maxlength="200"
                    :placeholder="$t('cashier.index.984361-13')"
                  ></textarea>
                  <span class="el-textarea__count"
                    >{{ transferInfo.transfer_remark.length }}/200</span
                  >
                </div>
              </SpFormItem>
              <SpFormItem prop="postalCode">
                <span class="label-text required">{{ $t('cashier.index.984361-14') }}</span>
                <div class="upload">
                    <input type="file" ref="input" class="input" @change="(e)=>changeUpload(e)"></input>
                        <div  v-for="(pic,idx) in transferInfo.voucher_pic" class="spimg-item" :key="idx" >
                            <SpImg class="spimg1" :src="pic" no-size @click="handleVerPicClick(pic)"   />
                            <div class="spimg-item-delete" v-if='!isView' @click="handlePicDelete(idx)">x</div>
                        </div>
                    <div class="input-icon" v-if="!isView && this.transferInfo.voucher_pic.length < 6" @click="clickUpLoad()"><i class="ec-icon ec-icon-camera"></i></div>
                </div>
                <div v-if="!transferInfo.voucher_pic.length && rulesShow" class="form-item__error-message">
                  {{ $t('cashier.index.984361-15') }}
                </div>
                <div class="upload-pic-tips">{{ $t('cashier.index.984361-16') }}</div>
              </SpFormItem>

            </SpForm>

            <div class="examine" v-if="examineInfo.check_status">
              <div class="examine-title examine-item">{{ $t('cashier.index.984361-17') }}</div>
              <div class="examine-item">{{ $t('cashier.index.984361-18') }}{{ examineInfo.check_status == 2 ? $t('cashier.index.984361-19') : $t('cashier.index.984361-20') }}</div>
              <div class="examine-item">{{ $t('cashier.index.984361-21') }}{{ examineInfo.remark }}</div>
              <div class="examine-item">{{ $t('cashier.index.984361-22') }}{{ examineInfo.update_time }}</div>
            </div>

          </div>
        </div>
        <div
          class="btn-pay"
          @click="clickPayment"
          :style="{
            backgroundColor: themeColor
          }"
          v-if="!isView && showPayButton"
        >
         {{ paymentType == 'offline_pay' ? $t('cashier.index.984361-23'):$t('cashier.index.984361-24') }}
        </div>
        
      </div>

      <!-- 二维码支付区域 -->
      <div class="qr-payment-area" v-if="!isView && !showPayButton && (paymentType == 'alipay' || paymentType == 'alipay_qr' || paymentType == 'wxpaypc' || paymentType == 'wx_qr')">
        <!-- 二维码显示 -->
        <div class="qr-code-image" v-if="qrCodeUrl">
          <img :src="qrCodeUrl" alt="支付二维码" style="width: 200px; height: 200px; display: block; margin: 0 auto;" />
        </div>
        
        <!-- 倒计时显示 -->
        <div class="countdown-info" v-if="countdown <= 300">
          <div class="countdown-text">
            请在 <span class="countdown-time">{{ formatCountdown }}</span> 内完成支付
          </div>
          <div class="countdown-tip">超时二维码将失效</div>
        </div>
        

      </div>

      <!-- 微信支付背景已移除，现在使用统一的二维码显示方式 -->
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import { mixin } from '@/mixins'
import wxpayImage from '@/assets/imgs/weixinpay.png'
import alipayImage from '@/assets/imgs/alipay.png'
import uploadImageFn from '@/utils/upload'
import moment from 'moment'
export default {
  mixins: [mixin],
  data() {
    var voucherPicValidate = (rule, value, callback) => {
      if (value.length == 0) {
        callback(this.$t('cashier.index.984361-15'))
      }
      callback()
    }
    return {
      paymentList: [
        // {
        //   type: 'alipay',
        //   img: alipayImage,
        //   title: '支付宝'
        // },
        // {
        //   type: 'wxpaypc',
        //   img: wxpayImage,
        //   title: '微信支付'
        // }
      ],
      accountList:[],
      transferInfo: {
        pay_sn:'',
        total_fee:'',
        transfer_remark:'',
        voucher_pic:[]
      },
      transferInfoRules: {
        voucher_pic: [{validate: voucherPicValidate, message: this.$t('cashier.index.984361-15')}],
        total_fee: [{required: true, validate: 'required', message: this.$t('cashier.index.984361-25') }],
      },
      rulesShow:false,
      examineInfo:{},
      paymentType: 'wxpaypc',
      tradeId: '',
      total_fee: 0,
      orderData: {},
      isPayment: true,
      app_id: null,
      payment_id: null,
      home_url: '',
      accountId:'',
      isView:false,
      showPayButton: true, // 控制支付按钮显示状态
      isInitialized: false, // 标记是否已初始化
      countdown: 300, // 倒计时秒数（5分钟 = 300秒）
      countdownTimer: null, // 倒计时定时器
      qrCodeUrl: '', // 二维码URL
    }
  },
  created() {
    this.initFunc()
  },
  computed: {
    formatCountdown() {
      const minutes = Math.floor(this.countdown / 60)
      const seconds = this.countdown % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  watch: {
    paymentType() {
      // 只有在初始化完成后才执行清除逻辑
      if (!this.isInitialized) return
      
      // 当支付方式切换时，重新显示支付按钮
      this.showPayButton = true
      // 清除二维码内容
      this.clearQRCode()
      // 重置支付状态
      this.isPayment = true
      // 清除定时器
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      // 重置倒计时
      this.resetCountdown()
    }
  },
  methods: {
    async initFunc(){
      this.home_url = window.location.origin
      const { has_check,isView } = this.$route.query
      this.isView = isView
      await this.getPaymentList()
      await this.getOrderInfo()
      await this.getBackaccount()
      if(has_check == 'true'){
        //编辑,数据回显
        this.getVoucher()
      }
      // 标记初始化完成
      this.isInitialized = true
    },
    async getVoucher(){
      const { order_id } = this.$route.query
      const accountRes = await this.$api.cart.getVoucher({order_id})
      console.log('accountRes',accountRes);
      const {bank_account_id,id,check_status,remark,update_time,bank_account_no,bank_name,china_ums_no,pay_sn,voucher_pic,transfer_remark} = accountRes;
      this.transferInfo = {
        ...this.transferInfo,
        pay_sn,
        transfer_remark,
        voucher_pic,
        id
      };
      this.examineInfo = {
        check_status,
        remark,
        update_time:moment(update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      this.accountId = bank_account_id

    },
    async getBackaccount(){
      const {list, setting} = await this.$api.cart.getBackaccount()
      console.log('getBackaccount',list, setting)
      this.accountList = list
      this.accountId = list.find(item=>item.is_default == '1')?.id
    },
    async getOrderInfo() {
      const { order_id } = this.$route.query
      const { pay_type, tradeId, total_fee } = await this.$api.cart.getOrderDet(
        { pay_type: this.paymentType },
        order_id
      )
      this.tradeId = tradeId ? tradeId : order_id
      this.total_fee = total_fee
      this.transferInfo.total_fee = total_fee
      if(pay_type == 'offline_pay'){
        // 避免在初始化时触发watch
        this.$nextTick(() => {
          this.paymentType = pay_type
        })
      }
    },
    handleVerPicClick(url){
      if(!this.isView)return
      window.open(url,'_blank')
    },
    async getPaymentList() {
      let params = { platform: 'pc' }
      const res = await this.$api.cart.getPaymentList(params)
      this.paymentList = res.map((item) => {
        return {
          type: item.pay_channel|| item.pay_type_code,
          img:
            item.pay_type_code === 'wxpaypc'
              ? wxpayImage
              : item.pay_type_code === 'alipay'
              ? alipayImage
              : '',
          title: item.pay_type_name,
          pay_type_code: item.pay_type_code
        }
      })

      this.paymentType = this.paymentList[0].type
    },
    // 付款按钮
    async clickPayment() {
      const { order_id } = this.$route.query
      let params = {
        order_id,
        pay_type: this.paymentList.find(item=>item.type == this.paymentType).pay_type_code, // 支付宝/微信
        return_url: this.home_url,
      }

      // if(this.paymentType == 'offline_pay'){
        params.pay_channel = this.paymentType
      // }

      console.log('params',params)
      console.log( this.paymentList.find(item=>item.type == this.paymentType))
      // 找到支付方式的对应支付是否汇付   --如果非汇付，微信或支付宝支付使用pay_type，但有汇付pay_type是汇付字段，pay_channel是微信或支付宝支付
      this.paymentList.map((ele) => {
        if (ele.type == this.paymentType && ele.pay_type) {
          params.pay_type = ele.pay_type // 汇付
          params.pay_channel = this.paymentType // 支付宝/微信
        }
      })

      const res = await this.$api.cart.payMent(params)

      if (this.paymentType == 'alipay' || this.paymentType == 'alipay_qr') {
        this.handleQRCodePayment(res.qrcode_url, res)
        return
      } else if (this.paymentType == 'wxpaypc' || this.paymentType == 'wx_qr') {
        const { qrcode_url:code_url, trade_info, appId } = res
        this.payment_id = trade_info.trade_id
        this.app_id = appId
        this.handleQRCodePayment(code_url, res)
      } else if (this.paymentType == 'deposit') {
        this.showPayButton = false // 隐藏支付按钮
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 2000)
      } else if (this.paymentType == 'point') {
        this.showPayButton = false // 隐藏支付按钮
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 2000)
      }else if(this.paymentType == 'offline_pay'){
        this.$refs['form'].validate((valid, errors) => {
          if (valid) {
            if( !this.transferInfo.voucher_pic.length ){
              this.rulesShow = true
              return
            }
            //调用提交转账接口
            this.handleVoucherFunc()
          }
        })
      }
    },
    // 处理二维码支付（支付宝和微信支付通用方法）
    handleQRCodePayment(qrcodeUrl, responseData) {
      // 隐藏支付按钮
      this.showPayButton = false
      this.isPayment = false
      
      // 设置二维码URL，模板会自动显示
      this.qrCodeUrl = qrcodeUrl || ''
      
      // 启动倒计时
      this.startCountdown()
      
      // 延迟10秒后开始检查支付状态，给用户足够时间扫码
      setTimeout(() => {
        this.timer = setInterval(() => {
          this.tradePaymentFinish()
        }, 3000) // 改为3秒检查一次
      }, 5000)
    },
    
    // 启动倒计时
    startCountdown() {
      this.countdown = 300 // 重置为5分钟
      this.countdownTimer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          this.handleCountdownTimeout()
        }
      }, 1000)
    },
    
    // 重置倒计时
    resetCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
      this.countdown = 300
      // 清除二维码URL
      this.qrCodeUrl = ''
    },
    
    // 处理倒计时超时
    async handleCountdownTimeout() {
      // 清除所有定时器
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
      
      // 清除二维码
      this.clearQRCode()
      
      // 显示超时提示
      this.$Message.error('支付超时，二维码已失效')
      
      // 强制清理所有消息组件
      this.forceClearMessages()
      
      // 延迟跳转，给消息显示时间
      setTimeout(() => {
        // 跳转到订单列表
        this.$router.push('/member/trade')
      }, 1000)
    },
    
    // 强制清理所有消息组件
    forceClearMessages() {
      // 查找并移除所有消息组件
      const messageElements = document.querySelectorAll('.sp-message, [class*="message"], [class*="Message"]')
      messageElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
      
      // 清理可能存在的全局消息实例
      if (window.messageInstance) {
        try {
          window.messageInstance.remove && window.messageInstance.remove()
        } catch (e) {
          console.log('清理消息实例失败:', e)
        }
      }
    },
    
    clearQRCode() {
      // 清除微信支付二维码（虽然现在不再使用，但保留以防万一）
      const qrCanvas = document.getElementById('qr')
      if (qrCanvas) {
        const ctx = qrCanvas.getContext('2d')
        ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height)
      }
      
      // 清除二维码URL
      this.qrCodeUrl = ''
      
      // 清除所有动态创建的二维码元素（包括支付宝和微信）
      const allQrDivs = document.querySelectorAll('div[style*="justify-content: center"]')
      allQrDivs.forEach(div => {
        if (div.querySelector('img') && div.style.margin === '20px 0px') {
          div.remove()
        }
      })
      
      // 更彻底地清除所有可能残留的二维码元素
      const allImages = document.querySelectorAll('img[src*="qrcode"], img[src*="alipay"], img[src*="weixin"]')
      allImages.forEach(img => {
        const parentDiv = img.closest('div[style*="justify-content: center"]')
        if (parentDiv) {
          parentDiv.remove()
        }
      })
      
      // 重置支付状态显示
      this.isPayment = true
    },
    async handleVoucherFunc(){
      const { has_check, order_id } = this.$route.query
      console.log(this.transferInfo,this.isPayment,order_id)
      // const {bank_account_name,bank_account_no,bank_name,china_ums_no} = this.accountList.find(item=>item.id ==  this.accountId) ?? {}
      const params = {
        ...this.transferInfo,
        order_id,
        bank_account_id: this.accountId,
        pay_fee: this.transferInfo.total_fee
      }
      console.log('params',params)
      if(has_check == 'true'){
        //更新凭证
        await this.$api.cart.updateVoucher(params)
        this.$Message.success(this.$t('cashier.index.984361-26'))
      }else{
        // 创建凭证
        await this.$api.cart.uploadVoucher(params)
        this.$Message.success(this.$t('cashier.index.984361-27'))
      }

      const {
        orderInfo: { total_fee, order_status, order_class }
        // tradeInfo
      } = await this.$api.member.getOrderInfo({ id: order_id })

      this.$router.push(
        `/finish/result?order_id=${order_id}&total_fee=${total_fee}&order_class=${order_class}&pay_status=${order_status}`
      )

    },
    handlePicDelete(idx){
      this.transferInfo.voucher_pic.splice(idx,1)
    },
    clickUpLoad() {
      this.$refs.input.value = null

      this.$refs.input.click()

    },
    changeUpload(e, index) {
      let files = e.target.files
      if (files.length + this.transferInfo.voucher_pic.length > 6) {
        this.$Message.error(this.$t('cashier.index.984361-28'))
        return false
      }
      uploadImageFn(e.target.files).then((imgs) => {
        const url = imgs[0]?.url
        if(url){
          this.transferInfo.voucher_pic = this.transferInfo.voucher_pic.concat(imgs[0].url)
          debugger
          this.rulesShow = false
        }
      })
    },
    async tradePaymentFinish() {
      const { order_id } = this.$route.query
      
      try {
        const {
          orderInfo: { total_fee, order_status, order_class }
        } = await this.$api.member.getOrderInfo({ id: order_id })
        
        // 只有当订单状态确实是已支付时才跳转
        if (order_status === 'PAYED') {
          // 订单完成支付
          clearInterval(this.timer)
          // 清除倒计时
          this.resetCountdown()
          // 清除二维码后再跳转
          this.clearQRCode()
          this.$router.push(
            `/finish/result?order_id=${order_id}&total_fee=${total_fee}&order_class=${order_class}&pay_status=${order_status}`
          )
        }
        // 注意：不再检查 CANCEL 状态，因为新订单可能初始状态就是 CANCEL
      } catch (error) {
        console.error('检查订单状态失败:', error)
      }
    }
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    // 清除倒计时定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
      this.countdownTimer = null
    }
    // 组件销毁时清除二维码
    this.clearQRCode()
  }
}
</script>

