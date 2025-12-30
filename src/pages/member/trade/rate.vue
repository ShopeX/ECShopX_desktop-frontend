/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.rate-page {
  .head {
    padding: 5px 0 25px;
    text-align: center;
    h4 {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      line-height: 24px;
    }
    span {
      color: #888888;
      line-height: 24px;
    }
  }
  .bd {
    width: 100%;
    background-color: #fff;
    .rate-item {
      width: 100%;
      height: 292px;
      border-bottom: 1px solid #ddd;
      .spimg {
        width: 76px;
        height: 76px;
      }
      .left {
        padding: 50px;
        text-align: center;
        width: 300px;
        display: inline-block;
        vertical-align: top;
        .name {
          width: 200px;
          height: 40px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          color: #333;
          overflow: hidden;
          //   text-overflow: ellipsis;
          //   white-space: nowrap;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .des {
          width: 200px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          color: #888;
        }
        .price {
          padding-top: 20px;
          line-height: 24px;
          font-size: 14px;
          text-align: center;
          color: #333;
        }
      }
      .right {
        margin: 10px 100px 10px 0;
        padding: 20px 0 0 19px;
        border-left: 1px solid #ddd;
        height: 272px;
        display: inline-block;
        vertical-align: top;
        .text {
          line-height: 32px;
          font-size: 12px;
          color: #666;
        }
        .red {
          color: #e43838;
        }
        .rate-rate {
          display: inline-block;
        }
        .textarea {
          vertical-align: top;
          border-color: #e8e8e8;
          width: 670px;
          height: 110px;
        }
        .tips {
          text-align: right;
          color: #aaa;
        }
        .upload {
          // text-align: left;
          .input {
            visibility: hidden;
            height: 19px;
            width: 60px;
          }
          .spimg-item {
            display: inline-block;
            vertical-align: text-top;
            margin-right: 10px;
            .spimg1 {
              width: 50px;
              height: 50px;
            }
          }
          .input-icon {
            display: inline-block;
            vertical-align: text-top;
            width: 50px;
            height: 50px;
            background-color: #f6f6f6;
            text-align: center;
            cursor: pointer;
            .ec-icon {
              font-size: 22px;
              line-height: 50px;
              color: #ddd;
            }
          }
        }
      }
    }
  }
  .ft {
    margin-top: 20px;
    height: 80px;
    padding: 20px;
    background-color: #fff;
    .btn {
      width: 300px;
      height: 40px;
      font-size: 14px;
      margin-left: 440px;
      background-color: #e40a1e;
      color: #fff;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      display: inline-block;
    }
    .btn-tips {
      margin-left: 15px;
    }
  }
}
</style>

<template>
  <div class="rate-page container-member">
    <div class="head">
      <h4>{{ $t('trade.rate.336928-0') }}</h4>
      <span>{{ $t('trade.rate.336928-1') }}{{ info.id }}</span>
      <span>{{ info.date }}</span>
    </div>
    <div class="bd">
      <template v-for="(item, index) in list">
        <div class="rate-item">
          <div class="left">
            <SpImg class="spimg" :src="item.pic" no-size />
            <p class="name">{{ item.title }}</p>
            <p class="des">{{ item.desc }}</p>
            <div class="price">￥{{ item.price }}</div>
          </div>
          <div class="right">
            <div class="rate"><span class="text">{{ $t('trade.rate.336928-2') }}</span> <SpRate :max='5' v-model="item.star" class="rate-rate"></SpRate> <span class="text " :class="item.star==0?'':'red'">{{item.star}}{{ $t('trade.rate.336928-3') }}</span></div>
            <div class="evaluate"><span class="text">{{ $t('trade.rate.336928-4') }}</span> <textarea  class="textarea"  v-model="item.content" :placeholder="$t('trade.rate.336928-5')"  /></div>
            <div class="tips">{{ $t('trade.rate.336928-6') }}{{item.content&&(300-item.content.length)||300}}{{ $t('trade.rate.336928-7') }}</div>
            <div class="upload">
                <input type="file" ref="input" class="input" @change="(e)=>changeUpload(e,index)"></input>
                <template v-for="pic in item.pics">
                    <div class="spimg-item">
                        <SpImg class="spimg1" :src="pic.url" no-size />
                    </div>
                </template>
                <div class="input-icon" @click="clickUpLoad(index)"><i class="ec-icon ec-icon-camera"></i></div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="ft"> 
        <div class="btn" @click="clickSumbit"> 
           {{ $t('trade.rate.336928-8') }}
        </div>
        <span class="btn-tips">
            
            <SpRadio type="checkbox" size="small" v-model="anonymousStatus" >{{ $t('trade.rate.336928-9') }}</SpRadio>
             </span>
    </div>
  </div>
</template>

<script>
import { getOrderInfo } from '@/api/member'
import { createOrderRate } from '@/api/trade'

import { pickBy } from '@/utils'
import uploadImageFn from '@/utils/upload'

export default {
  data() {
    return {
      list: [],
      info: {},
      anonymousStatus: false,
      id: '',
    }
  },
  computed: {},
  components: {},
  created() {
    this.getInfo()
  },
  mounted() {},
  methods: {
    async getInfo() {
      let { id } = this.$route.query
      this.id = id
      let res = await getOrderInfo({ id })
      let { orderInfo } = res
      let info = {
        id: orderInfo.order_id,
        date: orderInfo.end_date,
      }
      let list = pickBy(orderInfo.items, {
        item_id: 'item_id',
        desc: 'item_spec_desc',
        pic: 'pic',
        title: 'item_name',
        price: ({ item_fee }) => (+item_fee / 100).toFixed(2),
        num: 'num',
        star: 0,
        content: '',
        pics: [],
      })

      this.list = list
      
      this.info = info
    },
    clickUpLoad(index) {
      this.$refs.input.value = null
      
      this.$refs.input[index].click()
      
    },
    changeUpload(e, index) {
      let files = e.target.files
      if (files.length + this.list[index].pics.length > 5) {
        this.$Message.error(this.$t('trade.rate.336928-10'))
        return false
      }
      uploadImageFn(e.target.files).then((imgs) => {
        this.list[index].pics = this.list[index].pics.concat(imgs)
      })
    },
    clickToList() {
      this.$router.go(-1)
    },
    clickSumbit() {
      let { list, anonymousStatus } = this
      let rates = []
      let errText = ''
      for (let item of list) {
        if (!errText) {
          if (!item.star) {
            errText = this.$t('trade.rate.336928-11')
            break
          }
          if (!item.content) {
            errText = this.$t('trade.rate.336928-12')
            break
          }
        }

        let pics = []
        item.pics.map((pic) => {
          pics.push(pic.url)
        })
        rates.push({
          item_id: item.item_id,
          content: item.content,
          star: item.star,
          pics,
        })
      }

      if (errText) {
        this.$Message.error(errText)
        return
      }

      let params = {
        order_id: this.id,
        anonymous: anonymousStatus ? 1 : 0,
        rates,
      }

      createOrderRate(params).then((res) => {
           this.$Message.success(this.$t('trade.rate.336928-13'))
           if(this.$route.query.order_class&&this.$route.query.order_class=='pointsmall'){
             this.$router.push('/member/trade/point')
           }else{
             this.$router.push('/member/trade')
           }
           
      })
    },
  },
}
</script>
