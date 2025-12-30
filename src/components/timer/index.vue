/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-timer {
  height: 30px;
  border: 1px solid $color-brand-primary;
  // padding: 10px 16px;
  font-size: 12px;
  width: 100%;
  background: $color-brand-primary;
  color: #fff;
  line-height: 30px;
  letter-spacing: 2px;
  text-align: center;
}
</style>

<template>
  <div class="sp-timer" @click="handleClick">{{btnMsg}}</div>
</template>

<script>
export default {
  // inject: ['$t'],
  name: 'SpTimer',
  props: {
    duration: {
      type: Number,
      default: 60
    },
    timerMsg: String,
    defaultMsg: {
      type: String,
      default: ''
      // default: this.nuxt.$i18n.$t('timer.index.419920-0')
    },
    msg: {
      type: String,
      default: ''
      // default: this.nuxt.$i18n.$t('timer.index.419920-1')
    },
    onStart: Function
  },
  data () {
    return {
      countDur: this.duration,
      sent: false,
      btnMsg: this.timerMsg ? this.timerMsg : this.defaultMsg  || this.$t('timer.index.419920-0')
    }
  },
  watch: {
    countDur (val) {
      this.btnMsg =
        this.timerMsg ||
        (this.timer ? `${val}s` : this.sent ? this.msg || this.$t('timer.index.419920-1') : this.defaultMsg)
    }
  },
  methods: {
    handleClick () {
      if (this.timer) return
      if (!this.timer) {
        this.start()
      }
      this.sent = true
    },
    start () {
      this.stop()
      const next = () => {
        this.timer = setTimeout(() => {
          this.countDur--
          this.$emit('UpdateTimer', this.countDur)
          if (this.countDur > 0) {
            next()
          } else {
            this.stop()
            this.$emit('Stop')
          }
        }, 1000)
      }
      this.onStart &&
        this.onStart(start => {
          next()
        }, this.countDur)
    },
    stop () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.countDur = this.duration
        this.timer = null
      }
    }
  }
}
</script>
