/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="slider-wrap">
    <swiper :options="getOptions" class="sliderimg" ref="mySwiper" v-if="value.length">
      <swiper-slide v-for="(item, index) in value" :key="index" :class="{ 'slider-item': true }">
        <div class="img">
          <img :src="item" />
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination swiper-pagination-custom"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

export default {
  props: ['value'],
  watch: {
    value(val) {
      console.log('------value-------', val)
      // if (val && Array.isArray(val)) {
      //   this.data = this.changePosition(val);
      // }
    }
  },
  data() {
    const _this = this
    return {
      base: {},
      config: {},
      data: []
    }
  },
  directives: {
    swiper: directive
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    getOptions() {
      const self = this
      return {
        // 分页器配置
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
        direction: 'horizontal',
        // 自动切换图配置
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 环状轮播
        loop: true,
        slidesPerView: 'auto',
        // 一个屏幕展示的数量
        slidesPerView: 1,
        // 间距
        // spaceBetween: 26,
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        on: {
          click(evt, currentIndex) {}
          //   transitionStart(evt) {
          //     let swiper = self.$refs.mySwiper.$swiper;
          //     let activeIndex = swiper ? swiper.activeIndex : undefined;
          //     if (activeIndex) {
          //       self.change(activeIndex - 2);
          //     }
          //   },
        }
      }
    }
  },
  mounted() {},
  methods: {
    change(e) {
      console.log(e)
      this.config.current = e
    },
    changePosition(val) {
      return val.concat(val[0])
    }
  }
}
</script>

    <style lang="scss" scoped>
.swiper-pagination {
  &.swiper-pagination-custom {
    position: absolute;
    bottom: 20px;
    width: 80px;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    justify-content: space-between;

    .swiper-pagination-bullet {
      flex: 1;
      flex-wrap: nowrap;
      flex-grow: 0;
      flex-basis: 12px;
      outline: none;
      width: 12px;
      height: 12px;
      background-color: #2d2d2d;
      opacity: 0.3;

      &-active {
        background: #ea2329;
      }
    }
  }
}
.component-padded {
  padding: 10px 0;
}
.component-wrap {
  .subtitle {
    padding-left: 5px;
    font-size: 12px;
    color: #999;
  }
  .component-header {
    padding: 0 10px 10px 10px;
  }
}
.el-carousel {
  overflow: hidden;
}
.slider-wrap {
  position: relative;
  background: #ffffff;
  height: 480px;
  margin: 20px 0;
}
.sliderimg {
  .slider-item {
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    &.rounded {
      .img {
        border-radius: 5px;
      }
    }
  }
}
.slider-dot {
  display: flex;
  align-items: center;
  &.no-cover {
    padding: 12.5px;
  }
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }
  &.cover {
    padding: 0;
    position: absolute;
    bottom: 10px;
    z-index: 20;
  }
  &.cover.center {
    left: 50%;
    transform: translateX(-50%);
  }
  &.cover.left {
    left: 10px;
  }
  &.cover.right {
    right: 10px;
  }
  &.dark {
    .dot {
      background: rgba(0, 0, 0, 0.4);
    }
  }
  &.light {
    .dot {
      background: rgba(255, 255, 255, 0.7);
    }
  }
  &.circle {
    .dot {
      width: 7.5px;
      height: 7.5px;
      border-radius: 100%;
    }
  }
  &.rectangle {
    .dot {
      width: 10px;
      height: 4px;
    }
  }
  .dot {
    margin: 0 3px;
    &.active {
      background: rgba(241, 50, 0, 1);
    }
  }
  &.dot-size-switch {
    &.circle {
      .dot {
        border-radius: 10px;
      }
    }
    .dot {
      transition: all 0.3s ease;
      &.active {
        width: 15px;
      }
    }
  }
}
.slider-count {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  width: 25px;
  height: 25px;
  font-size: 12px;
  z-index: 20;
  &.left {
    left: 10px;
  }
  &.right {
    right: 10px;
  }
  &.dark {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
  &.light {
    background: rgba(255, 255, 255, 0.7);
    color: #555;
  }
  &.circle {
    border-radius: 100%;
  }
  &.rectangle {
    border-radius: 0;
  }
}
.slider-wrap {
  &.padded {
    .sliderimg {
      padding: 10px 0;
      .slider-item {
        padding: 0 10px;
      }
    }
    .slider-dot {
      &.no-cover {
        padding: 5px 22.5px;
      }
      &.cover {
        padding: 0;
        bottom: 20px;
      }
      &.cover.left {
        left: 20px;
      }
      &.cover.right {
        right: 20px;
      }
    }
    .slider-count {
      bottom: 20px;
      &.left {
        left: 20px;
      }
      &.right {
        right: 20px;
      }
    }
  }
  .sliderimg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 4px;
  }
  .scale-placeholder {
    display: block;
    width: 100%;
    visibility: hidden;
    z-index: -1;
  }
}
.slider-caption {
  padding: 10px 15px;
  color: #999;
}
</style>
