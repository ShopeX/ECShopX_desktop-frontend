/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$goods-color-primary:#1f201f;
.good-card {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
  position: relative;
  &__inner {
    // border: 1px solid #ccc;
    box-sizing: content-box;
    overflow: hidden;
  }
  &__img {
    margin-bottom: 15px;
    position: relative;
    border: 1px solid #ccc;
    @include pdt-img(315px, 394px);
    img{
      width: 100%;
      height: 100%;
    }
    a {
      display: block;
      height: 100%;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: bold;
    color: $goods-color-primary;
    margin: 0 0 5px;
    padding: 0 5px;
    overflow: hidden;
    text-align: center;
    @include multi-ellipsis(1);
  }
  &__sub-title{
    font-size: 16px;
    color: $goods-color-primary;
    height: 22px;
    margin: 0 0 5px;
    padding: 0 5px;
    overflow: hidden;
    text-align: center;
    @include multi-ellipsis(1);
  }
  .sp-price{
    font-size: 16px;
  }
  &__content {
    text-align: center;
  }
  .fast-browse {
    background: #00397e;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    transition: opacity 0.2s, visibility 0.1s;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
  }
  @media (max-width: 1366px) {
      .swiperBox {
        width: 170px
      }
  }
  @media (min-width: 1367px) {
      .swiperBox {
        width: 230px
      }
  }
  .swiper-sku {
    // padding: 0 40px;
    text-align: center;
    visibility: hidden;
    height: 56px;
    .prev-btn {
      width: 35px;
      text-align: center;
      margin-top: 8px;
      float: left;
    }
    .next-btn {
      width: 35px;
      text-align: center;
      margin-top: 8px;
      float: right;
    }
    .mb-iconfont {
      font-size: 32px;
      cursor: pointer;
    }
    .swiperBox {
      // width: 230px;
      margin: 0 auto;
      display: inline-block;
      .swiper-slide {
        @include pdt-img(50px);
      }
    }
    .swiper-box__0 {
      width: 0px;
    }
    .swiper-box__1 {
      width: 45px;
    }
    .swiper-box__2 {
      width: 110px;
    }
    .swiper-box__3 {
      width: 170px;
    }
  }
  &.valid {
    &:hover {
      .fast-browse {
        visibility: visible;
        opacity: 1;
      }
      .swiper-sku {
        visibility: visible;
      }
    }
  }
  &__cover {
    position: absolute;
    top: 0;
    left: 7px;
    right: 7px;
    background: rgba($color: #000, $alpha: 0.5);
    z-index: 10;
    height: 470px;
  }
  .swiper-sku {
    &__mb {
      height: 20px;
      // padding: 0 10px;
      // margin-left: 5px;
      li {
        border-radius: 10px;
        float: left;
        margin-right: 5px;
        // border: 2px solid transparent;
        // box-sizing: content-box;
        border: 1px solid #000;
        width: 16px;
        height: 16px;
        box-sizing: content-box;
        margin-bottom: 5px;
        &.active {
          border-width: 0;
          width: 18px;
          height: 18px;
          &::before {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 10px;
            border: 1px solid #000;
            margin-top: -1px;
            margin-left: -1px;
          }
          // border: 0;
          // width: 18px;
          // height: 18px;
          // margin-top: -1px;
          // margin-bottom: 0;
        }
      }
    }
  }

  @include respond(sm) {
    // padding: 0 10px !important;
    width: 50%;
    margin-right: 0;
    cursor: default;
    // &:nth-child(odd) {
    //   margin: 0 7.5px 0 15px;
    // }
    // &:nth-child(even) {
    //   margin: 0 15px 0 7.5px;
    // }
    &__cover {
      height: 300px;
    }
    &__img {
      @include pdt-img(200px);
      // max-height: 221px;
      img {
        max-width: 100%;
        max-height: 100%;
        // width: 100%;
        height: 100%;
      }
    }
    &:hover {
      .good-card__img {
        border: 1px solid #eaeaea;
      }
      .fast-browse {
        visibility: hidden;
        opacity: 0;
      }
      .swiper-sku {
        visibility: visible;
      }
    }
    &.valid {
      &:hover {
        .good-card__img {
          border-width: 0px;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
    .fast-browse {
      display: none;
    }
    .swiper-sku {
      display: none;
    }
    .good-card {
      &__content {
        font-size: 12px;
        .sp-price__default {
          font-size: 14px;
        }
        .number {
          font-size: 14px;
        }
      }
      &__title {
         &-name {
          font-size: 12px;
          @include multi-ellipsis(1);
        }
      }
    }
  }
}
</style>

<template>
<div class="good-card" :class="{'valid': info.valid == 1}">
  <div class="good-card__inner">
    <div class="good-card__cover" v-if="!info.valid"></div>
    <div
      class="good-card__img"
      @click.stop="handleClick"
      @mouseover="handleMouseEntry"
      @mouseleave="handleMouseLeave"
      :style="{'width' : '100%', 'height': Math.floor(width * 1.38) + 'px'}"
    >
      <NuxtLink :to="resolveLink">
        <SpImg :src="image_default" size="s"></SpImg>
      </NuxtLink>
    </div>
    <div class="good-card__title">{{info.sub_title}}</div>
    <div class="good-card__sub-title">{{info.title}}</div>
    <div class="good-card__content">
      <SpPrice :value="info.price"></SpPrice>
    </div>
    <slot></slot>
  </div>
</div>
</template>

<script>
import { on, off } from '@/utils/dom'
import { isArray } from '@/utils'
import qs from 'qs'

export default {
  props: {
    value: Object,
    spacewidth: {
      type: Number,
      default: 21
    },
    paddingSpace: {
      type: Number,
      default: 22
    }
  },
  computed: {
    resolveLink () {
      const { item_id, woman } = this.info
      const { curSkuColor } = this

      const query = {
        woman,
        skucolor: curSkuColor
      }

      return `/items/${item_id}` + (query ? `?${qs.stringify(query)}` : '')
    }
  },
  mounted () {
    this.width = this.$el.clientWidth - this.paddingSpace
    this.handleResize = () => {
      this.width = this.$el.clientWidth - this.paddingSpace
    }
    on(window, 'resize', this.handleResize)
  },
  beforeDestroy () {
    off(window, 'resize', this.handleResize)
  },
  data () {
    let previewCount = 4
    if (window.innerWidth > 768 && window.innerWidth <= 1366) {
      previewCount = 3
    }
    const { front_list_images, image_default_id } = this.value
    return {
      info: this.value,
      image_default: (isArray(front_list_images) && front_list_images.length >= 2) ? front_list_images[0] : image_default_id,
      curSkuColor: undefined,
      width: 0,
      hasTwo: isArray(front_list_images) && front_list_images.length >= 2
    }
  },
  methods: {
    handleClick () {
      this.$emit('on-select', this.info)
    },
    handleClickFastBrowse () {
      const woman = this.info.woman || null
      this.$emit('on-fast-browse', this.info.item_id, woman, this.curSkuColor)
    },
    handleMouseEntry () {
      const { front_list_images, image_default_id } = this.info
      this.image_default = this.hasTwo ? front_list_images[1] : image_default_id
    },
    handleMouseLeave () {
      const { front_list_images, image_default_id } = this.info
      this.image_default = this.hasTwo ? front_list_images[0] : image_default_id
    }
  }
}
</script>
