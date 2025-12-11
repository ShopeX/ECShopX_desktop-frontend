/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="ad-bar">
    <div class="ad-bar__contain">
      <div class="ad-bar__item ad-bar__item1" v-if="item1">
        <div class="ad-bar__content ad-bar__content1" >
          <div v-html="item1.content"></div>
          <SpButton type="default" @click="handleClickBtn(item1)">{{item1.btn_name}}</SpButton>
        </div>
        <div class="ad-bar__img1">
          <img v-lazy="item1.pc_link" alt="">
        </div>
      </div>
      <div class="ad-bar__item" v-if="item2">
        <div class="ad-bar__img2">
          <img v-lazy="item2.pc_link" alt="">
        </div>
        <div class="ad-bar__content ad-bar__content2">
          <div v-html="item2.content"></div>
          <SpButton type="default" @click="handleClickBtn(item2)">{{item2.btn_name}}</SpButton>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { replaceUrl } from '@/utils'

export default {
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    item1: function () {
      const key = Object.keys(this.params.pic)[0]
      return this.params.pic && this.params.pic[key]
    },
    item2: function () {
      const key = Object.keys(this.params.pic)[1]
      return this.params.pic && this.params.pic[key]
    }
  },
  methods: {
    handleClickBtn (item) {
      const { btn_link } = item
      const url = replaceUrl(btn_link)
      this.$router.push(url)
      this.$track('index_sub_banner', url, item.btn_name)
    }
  }
}
</script>

<style lang="scss">
$ad-content-w:1040px;
.ad-bar{
  padding: 0 0 94px;
  background: #f5f1eb;
  &__contain{
    width: $ad-content-w;
    margin: auto;
  }
  &__item{
    // @include clearfix;
    position: relative;
  }
  &__item1{
    height: 426px;
    padding-top: 79px;
    padding-bottom: 77px;
  }
  &__content{

    &-hd{
      font-size: 40px;
      letter-spacing: 4px;
      color: #020304;
    }
    p{
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 2px;
      color: $color-secondary-text;
    }
    .sp-btn{
      width: 180px;
      height: 30px;
      background: #f5f1eb;
      margin-top: 30px;
      &:hover{
        background: $color-brand-primary;
      }
    }
  }
  &__content1{
    padding-left: 95px;
    width: calc(100% - 445px - 95px);
  }
   &__content2{
     position: absolute;
     right: 0;
     top: 40%;
     width: calc(100% - 655px - 40px);
    //  float: left;
  }
  &__img1{
    position: absolute;
    top: -50px;
    right: 50px;
    width: 445px;
    height: 555px;
    img{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  &__img2{
    position: relative;
    width: 655px;
    height: 490px;
    img{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
