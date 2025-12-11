/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div id="cart-recommend">
    <!-- <div class="header">
      <span class="hd-text">
        <slot name="header">关注商品</slot>
      </span>
      <div class="hd-point" @click="() => $router.push('/member/collector')">查看全部<i class="ec-icon ec-icon-right"></i></div>
    </div> -->
    <div class="body clearfix">
      <!-- 左按钮 -->
      <div
        class="left clickIcon"
        @click="handelClick($t('comps.good-focus.219508-0'))"
        :class="{ disable: (num == 1) | (active == 1) }"
      >
        <i class="ec-icon ec-icon-back"></i>
      </div>
      <div class="goods clearfix">
        <transition-group name="list" tag="div" class="list clearfix">
          <template v-for="item in goods">
            <div class="good-item clearfix" :key="item.item_id">
              <GoodItem class="good" :item="item"></GoodItem>
            </div>
          </template>
        </transition-group>
      </div>
      <!-- 右按钮 -->
      <div
        class="right clickIcon"
        @click="handelClick($t('comps.good-focus.219508-1'))"
        :class="{ disable: (num == 1) | (active == num) }"
      >
        <i class="ec-icon ec-icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import GoodItem from './good'
import { getCollectionList } from '@/api/member'

export default {
  components: {
    GoodItem
  },
  data() {
    return {
      num: 4,
      active: 1,
      goods: [],
      page: {
        page: 1,
        pageSize: 4
      },
      curItem: {},
      showModal: false,
      selectedAttr: []
    }
  },
  created() {
    this.getLikeList()
  },
  methods: {
    async getLikeList() {
      let res = await getCollectionList(this.page)
      let { total_count, list } = res
      this.num = Math.ceil(total_count / this.page.pageSize)
      this.goods = list
      if (this.goods.length == 0) {
        this.$emit('update:recommendVisiable', false)
      }
    },
    handelClick(type, i) {
      if (this.num == 1) return false
      switch (type) {
        // case '点':
        //   if (this.active == i) return false
        //   this.active = i
        //   break
        case this.$t('comps.good-focus.219508-0'):
          if (this.active == 1) return false
          this.active--
          break
        case this.$t('comps.good-focus.219508-1'):
          if (this.active == this.num) return false
          this.active++
          break
      }
      if (this.active > this.num) this.active = 1
      if (this.active < 1) this.active = this.num
      this.page.page = this.active
      if (this.num == 1) return false
      this.getLikeList()
    }
  }
}
</script>

<style lang="scss" scoped>
#cart-recommend {
  .header {
    height: 60px;
    // border-bottom: 1px solid $color-border-gray-light;
    .hd-text {
      padding-left: 20px;
      display: inline-block;
      line-height: 50px;
    }
    .hd-point {
      height: 50px;
      line-height: 50px;
      padding-right: 20px;
      float: right;
      font-size: 13px;
      cursor: pointer;
      color: #888888;
      .ec-icon {
        font-size: 13px;
        color: inherit;
      }

      .hd-point-ch {
        cursor: pointer;
        margin-right: 5px;
        display: inline-block;
        width: 6px;
        height: 6px;
        background: inherit;
        background-color: rgba(204, 204, 204, 1);
        border: none;
        border-radius: 20px;
        // box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.0980392156862745);
      }
      .active {
        background-color: rgba(121, 121, 121, 1);
      }
    }
  }
  .body {
    // border: 1px solid $color-border-gray-light;
    border-top: none;
    height: 190px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    .left {
      display: inline-block;
    }
    .clickIcon {
      display: inline-block;
      text-align: center;
      position: relative;
      width: 20px;
      height: 30px;
      background: #000000;
      opacity: 0.2;
      top: 40%;
      transform: translateY(-50%);
      cursor: pointer;
      i {
        line-height: 30px;
        font-size: 12px;
        color: #fff;
      }
      &:hover {
        // background-color: $color-secondary-text;
      }
    }
    .disable {
      cursor: default;
      // background-color: $color-border-gray-light;
      // color: $color-border-gray;
      opacity: 0;
      &:hover {
        // background-color: $color-border-gray-light;
      }
    }
    .right {
      display: inline-block;
    }
    .goods {
      display: inline-block;
      width: 599px;
      height: 100%;
      padding: 0 10px 25px;
      .list {
        height: 100%;
      }
      .good-item {
        float: left;
        width: 25%;
        // margin-right: 15px;
        // height: 100%;
        text-align: center;
        // padding: 20px 10px;
        position: relative;
      }
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter,
  .list-leave-to {
    /* .list-leave-active for below version 2.1.8 */
    opacity: 0;
    transform: translateX(50px);
  }
}
</style>
