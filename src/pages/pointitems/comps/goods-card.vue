/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
$good_color: #f0f0f0;

.goods-card {
  &.goods-card-pointitem {
    position: relative;
    transition: all 0.1s linear;
    width: 220px;
    height: 378px;
    margin-left: 0px;
    margin-bottom: 50px;
    background: #fff;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin-bottom: 40px;

    &:nth-child(n + 2) {
      margin-left: calc(25% - 275px);
    }

    &:first-child,
    &:nth-child(5n + 1) {
      margin-left: 0;
    }

    &:hover {
      // box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      // transform: translate3d(0, -2px, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.23);
    }
    .img-wrap {
      border: none;
      border-bottom: 1px solid $good_color;
    }
    .goods-card__name {
      padding-right: 0 !important;
      font-size: 16px !important;
      height: 48px !important;
    }
    .goods_display {
      position: absolute;
      display: flex;
      left: 0;
      bottom: 0;
      right: 0;
      height: 46px;
      align-items: center;
      padding-left: 10px;

      .ec-icon2-jifen-01 {
        margin-right: 5px;
        font-size: 16px;
      }

      &:hover {
        .exchange-btn {
          visibility: inherit;
          opacity: 1;

          .ec-icon2-anniu-01 {
            margin-left: 8px;
            color: white;
          }
        }
      }

      span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }

      .exchange-btn {
        position: absolute;
        visibility: hidden;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        justify-content: center;
        align-items: center;
        background: #ea2329;
        opacity: 0.9;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.1s linear;
        display: flex;
      }
    }
  }
  &:nth-child(5n) {
    margin-right: 0;
  }
  .img-wrap {
    position: relative;
    width: 100%;
    height: 220px;
    line-height: 220px;
    overflow: hidden;
    // border: 1px solid #efefef;
    img {
      width: 100%;
      cursor: pointer;
    }
    .add-cart {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -40px;

      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.5);
      filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr=#7f000000, endColorstr=#7f000000);
      transition: all 0.4s ease;
      z-index: 10;
    }
    &:hover {
      .add-cart {
        bottom: 0;
        &:hover {
          background: $color-brand-primary;
        }
      }
    }
  }
  &__name {
    height: 37px;
    margin: 13px 10px 8px 10px;
    color: #707070;
    cursor: pointer;
    @include multi-ellipsis(2);
    position: relative;
    span {
      word-wrap: break-word;
    }
    .like {
      top: 0;
      position: absolute;
      right: 5px;
      width: 24px;
      color: $color-brand-primary;
      i {
        font-size: 18px;
        padding-left: 2px;
        text-align: center;
        color: inherit;
      }
      div {
        font-size: 10px;
        color: inherit;
      }
    }
  }

  &__price {
    margin: 0 0 0 10px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    .sp-price {
      // height: 40px;
      display: inline-block;
      font-size: 18px;
      width: 140px;
      color: $color-brand-primary;
    }
    .add-cart {
      display: inline-block;
      // position: absolute;
      // left: 0;
      // right: 0;
      // bottom: -40px;
      width: 120px;
      // padding: 10px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s ease;
      z-index: 10;
      background: $color-brand-primary;
      .ec-icon {
        color: #fff;
        margin-right: 8px;
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 1366px) {
  .goods-card {
    .goods-card {
      width: 277px !important;
      .img-wrap {
        height: 275px !important;
        line-height: 275px !important;
      }
    }
  }
}

@include respond(lg) {
  .goods-card {
    .goods-card {
      width: 240px !important;
      height: 290px !important;
      .img-wrap {
        height: 238px !important;
        line-height: 238px !important;
      }
    }
  }
}

@include respond(md) {
  .goods-card {
    .goods-card {
      width: 215px !important;
      height: 270px !important;
      .img-wrap {
        height: 213px !important;
        line-height: 213px !important;
      }
    }
  }
}
</style>

<template>
  <div class="goods-card goods-card-pointitem clearfix">
    <div class="img-wrap" @click="handleClick(info.item_id, info.distributor_id)">
      <!-- <SpImg @click="handleClick(info.item_id)" :src="info.imgUrl" size="s"></SpImg> -->
      <img :src="info.imgUrl" />
    </div>
    <div class="goods-card__name goods-card-pointitem__name">
      <span @click="handleClick(info.item_id, info.distributor_id)">{{ info.item_name }}</span>
    </div>

    <div class="goods-card__price">
      <!-- <SpPrice :defaultValue="`${info.point}积分`" unit="" symbol=""></SpPrice> -->
      <SpPointPrice :point="info.point" />
      <!-- <div class="add-cart" @click.stop="handleAddCart(info)"><i class="ec-icon ec-icon-cart"></i>{{ $t('comps.goods-card.680253-1') }}</div> -->
    </div>
    <div class="goods_display">
      <span class="ec-icon2 ec-icon2-jifen-01"></span>
      <span>{{ $t('comps.goods-card.680253-0') }}{{ info.store }}</span>
      <div class="exchange-btn" @click.stop="handleAddCart(info)">
        {{ $t('comps.goods-card.680253-1') }}<span class="ec-icon2 ec-icon2-anniu-01"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { SpPointPrice } from '@/components'
export default {
  props: {
    value: Object
  },
  data() {
    return {
      info: this.value
    }
  },
  components: {
    SpPointPrice
  },
  methods: {
    handleClick(item_id, distributor_id) {
      this.$emit('on-select', item_id, distributor_id)
    },
    handleAddCart(item) {
      this.$emit('on-add-cart', item)
    },
    handleLick(item) {
      console.log(item)
    }
  }
}
</script>
