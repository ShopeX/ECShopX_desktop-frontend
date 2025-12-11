/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="bd-steps clearfix">
    <template v-for="(item, index) in stepsData">
      <div class="step" :class="[index < step ? type : '']">
        <div v-if="index != 0" class="points">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <i class="ec-icon ec-icon-right"></i>
        </div>
        <div class="step-content" style="width: 70px">
          <i class="ec-icon step-icon" :class="item.icon"></i>
          <p>{{ item.text }}</p>
          <p>{{ item.time }}</p>
        </div>
      </div>
      <!-- <div class="step" :style="{ width: `${100 / stepData.length}%` }" :class="[item <= step ? type : '']">
        <div class="step-bg">
          <span class="number">{{ item }}</span>
        </div>
        <div class="step-txt">
          <template v-for="(el,index) in splitText(stepsText[item-1],item)">
            <p>{{el}}</p>
          </template>
        </div>
      </div> -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'SpSteps',
  props: {
    stepsData: {
      type: Array,
      default: () => [],
    },
    type: {
      // 背景主题，目前有success,和danger。可以自行添加。在样式里面加上对应的样式颜色就可以
      type: String,
      default: 'success',
    },
    steps: {
      // 总步数
      type: Number,
      default: 1,
    },
    step: {
      // 当前步数
      type: Number,
      default: 1,
    },
    stepsText: {
      type: Array,
      //   提示语 多行显示用逗号分隔开，英文逗号 ['第一步,付款成功']
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    sLength() {
      return this.data
    },
  },
  methods: {
    splitText(text, num) {
      let arr = []
      if (text) {
        arr = text.split(',')
      } else {
        arr = [`第${num}步`]
      }
      return arr
    },
  },
}
</script>

<style lang="scss" scoped>
.bd-steps {
  padding: 20px 20px;
  .step-icon {
    font-size: 40px;
    color: #e4e7ed;
  }
  .points {
    display: inline-block;
    margin-top: 16px;

    & > div {
      //   left: -1px;
      display: inline-block;
      width: 10px;
      height: 10px;
      // position: absolute;
      background-color: #e4e7ed;
      border-radius: 50%;
      // display: flex;
      // justify-content: center;
      // align-items: center;
    }
    i {
      color: #e4e7ed;
    }
  }
  .step-content {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    p {
      padding-top: 10px;
      color: #797979;
    }
  }
  .step {
    display: inline-block;
    vertical-align: top;
    // & > div {
    //   display: inline-block;
    //   vertical-align: top;
    // }
  }
  //   .step {
  //     float: left;
  //     &:nth-last-child(1) {
  //       .step-bg {
  //         width: 50%;
  //         .number {
  //           left: 100%;
  //         }
  //         // background-color: #fff;
  //       }
  //     }
  //     &:first-child {
  //       transform: translateX(50%);
  //       .step-bg {
  //         width: 50%;
  //         .number {
  //           left: 0;
  //         }
  //       }
  //       .step-txt {
  //         transform: translateX(-50%);
  //       }
  //     }
  //     // background-color: $color-border-gray;
  //     .step-bg {
  //       height: 6px;
  //       margin-bottom: 25px;
  //       height: 6px;
  //       background-color: $color-border-gray;
  //       .number {
  //         position: relative;
  //         display: inline-block;
  //         top: -15px;
  //         left: 50%;
  //         transform: translateX(-50%);
  //         width: 35px;
  //         height: 35px;
  //         line-height: 35px;
  //         border-radius: 50%;
  //         font-size: 16px;
  //         text-align: center;
  //         background-color: $color-border-gray;
  //         z-index: 10;
  //       }
  //     }
  //     .step-txt {
  //       text-align: center;
  //     }
  //   }
  .success {
    .points {
      color: #797979;
    }
    .step-icon {
      
      color: #666;
    // color: $color-success-text;
    }
  }
  .danger {
    .points {
      color: #797979;
    }
    .step-icon {
      
    //   color: #666;
    color: $color-brand-primary;
    }
    
  }
}
</style>