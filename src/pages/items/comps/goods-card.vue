/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.goods-card {
  // float: left;
  // width: 278px;
  // height: 389px;
  // margin-left: 17px;
  // margin-bottom: 50px;
  // background: #fff;
  // // border: 1px solid #efefef;
  // border-radius: 3px;
  // &:hover {
  //   box-shadow: 1px 1px 10px #999;
  // }
  &:nth-child(5n) {
    margin-right: 0;
  }
  .img-wrap {
    position: relative;
    width: 100%;
    height: 275px;
    line-height: 275px;
    overflow: hidden;
    border: 1px solid #efefef;
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
    margin: 10px 0 20px 0;
    padding-right: 38px;
    color: #707070;
    cursor: pointer;
    @include multi-ellipsis(2);
    position: relative;
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
  <div class="goods-card clearfix">
    <div class="img-wrap" @click="handleClick(info.item_id, info.distributor_id)">
      <!-- <SpImg @click="handleClick(info.item_id)" :src="info.imgUrl" size="s"></SpImg> -->
      <img :src="info.imgUrl" />
    </div>
    <div class="goods-card__name">
      <span @click="handleClick(info.item_id, info.distributor_id)">{{ info.item_name }}</span>
      <!-- 收藏按钮 -->
      <!-- <div class="like" @click="handleLick(info.item_id,)">
        <i class="ec-icon ec-icon-like"></i>
        <div>关注</div>
      </div> -->
    </div>

    <div class="goods-card__price">
      <SpPrice :value="info.price" unit="cent"></SpPrice>
      <div class="add-cart" @click.stop="handleAddCart(info)">
        <i class="ec-icon ec-icon-cart"></i>{{ $t('comps.goods-card.573640-0') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      info: this.value
    }
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
