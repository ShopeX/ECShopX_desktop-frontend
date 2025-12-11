/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="bd-steps clearfix">
    <template v-for="item in steps">
      <div class="step" :style="{'width':`${100/steps}%`}" :class="[item<=step?type:'']">
        <div class="step-bg">
          <span class="number">{{item}}</span>
        </div>
        <div class="step-txt">
          <template v-for="(el,index) in splitText(stepsText[item-1],item)">
            <p>{{el}}</p>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SpSteps',
  props: {
    type:{
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
  methods: {
    splitText(text, num) {
      let arr = []
      if (text) {
        arr = text.split(',')
      } else {
        arr = [this.$t('steps.index.996759-0', [num])]
      }
      return arr
    },
  },
}
</script>

<style lang="scss" scoped>
.bd-steps {
  padding: 20px 20px;
  .step {
    float: left;
    &:nth-last-child(1) {
      .step-bg {
        width: 50%;
        .number {
          left: 100%;
        }
        // background-color: #fff;
      }
    }
    &:first-child {
      transform: translateX(50%);
      .step-bg {
        width: 50%;
        .number {
          left: 0;
        }
      }
      .step-txt {
        transform: translateX(-50%);
      }
    }
    // background-color: $color-border-gray;
    .step-bg {
      height: 6px;
      margin-bottom: 25px;
      height: 6px;
      background-color: $color-border-gray;
      .number {
        position: relative;
        display: inline-block;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        background-color: $color-border-gray;
        z-index: 10;
      }
    }
    .step-txt {
      text-align: center;
    }
  }
  .success {
    .step-bg {
      background-color: $color-success-text;
      .number {
        color: #fff;
        background-color: $color-success-text;
      }
    }
    .step-txt {
      p {
        color: $color-success-text;
      }
      color: $color-success-text;
    }
  }
  .danger {
    .step-bg {
      background-color: $color-brand-primary;
      .number {
        color: #fff;
        background-color:$color-brand-primary;
      }
    }
    .step-txt {
      p {
        color: $color-brand-primary;
      }
      color: $color-brand-primary;
    }
  }
}
</style>