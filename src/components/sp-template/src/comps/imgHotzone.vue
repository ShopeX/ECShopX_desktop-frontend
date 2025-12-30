/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
    <div class="wgt wgt-imghot-zone" :class="{'wgt__padded':  base.padded}">
      <!-- 标题区域 -->
      <div v-if="base && base.title" class="wgt-head">
        <div class="wgt-hd">
          <div class="wgt-title">{{ base.title }}</div>
          <div class="wgt-subtitle">{{ base.subtitle }}</div>
        </div>
      </div>
  
      <!-- 图片热区 -->
      <div class="slider-wra wgt-body img-hotzone" >
        <img
          class="img-hotzone_img"
          :src="config.imgUrl"
          lazy-load
        />
          <template  v-if="isArray(data)" v-for="(item, index) in data">
            <!-- 特殊处理登录相关区域 -->
            <div 
              v-if="item.id === 'purchase' || ['purchase_activity','regactivity'].includes(item.linkPage)"
              :key="`${index}`"
              @change="handleClickItem(itemWithDistributor(item))"
            >
              <div 
                class="img-hotzone_zone"
                :style="hotzoneStyle(item)"
              />
          </div>
            
            <!-- 普通点击区域 -->
            <div
              v-else
              :key="index"
              class="img-hotzone_zone"
              :style="hotzoneStyle(item)"
              @click="handleClickItem(itemWithDistributor(item))"
            />
          </template>
      </div>
    </div>
  </template>
  
  <script>
  import { isArray } from '@/utils'
import { SpImg } from '../../..'
  export default {
    name: "imgHotzone",
    
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    
    data() {
      return {
        curIdx: 0,
        info:null
      }
    },
    watch:{
        value:{
            immediate:true,
            handler(v){
                console.log('v----------',v)
                this.info = v
            },
            deep:true
        }
    },
    
    computed: {
      config() {
        return this.info?.config || {}
      },
      
      base() {
        return this.info?.base || {}
      },
      
      data() {
        return this.info?.data || []
      },
      
      distributor_id() {
        return this.info?.distributor_id
      }
    },
    
    methods: {
      /**
       * 生成热区样式
       */
      hotzoneStyle(item) {
        return {
          width: `${item.widthPer * 100}%`,
          height: `${item.heightPer * 100}%`,
          top: `${item.topPer * 100}%`,
          left: `${item.leftPer * 100}%`
        }
      },
      
      /**
       * 添加分销商ID到item对象
       */
      itemWithDistributor(item) {
        return {
          ...item,
          distributor_id: this.distributor_id
        }
      },
      
      /**
       * 点击热区处理
       */
      handleClickItem(item) {
        
      },
      
      /**
       * 判断是否为数组
       */
      isArray(val) {
        return isArray(val)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .wgt-imghot-zone {
    .img-hotzone {
      position: relative;
      margin: 0 16px;
      border-radius: 16px;
      overflow: hidden;
      
      &_zone {
        position: absolute;
      }
    }
    
    // 当添加了padding样式
    &.wgt__padded .img-hotzone {
      padding: 0 16px;
    }
    
    .padded {
      margin: 0 16px;
    }
  }
  </style>