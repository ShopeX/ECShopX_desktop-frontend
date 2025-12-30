/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="goods-img-pan" v-hammer="hmOptions" :class="{ 'is-zoom': isZoomOut }">
    <div class="pan-responder"></div>
    <SpImg class="pan-img" no-size :src="src" :style="styles" />
  </div>
</template>

<script>
let directives = {}
if (process.client) {
  const Hammer = require('hammerjs')

  directives = {
    hammer: {
      bind(el, binding) {
        const { value } = binding
        const hm = new Hammer(el)
        // hm.get('pan').set({ direction: Hammer.DIRECTION_ALL })
        Object.keys(value).forEach((k) => {
          const v = value[k]
          hm.on(k, v)
        })
      },
      unbind(el, binding) {}
    }
  }
}

export default {
  props: {
    src: String,
    boundingInset: {
      type: Number,
      default: 40
    }
  },

  data() {
    return {
      styles: {},
      isZoomOut: false,
      hmOptions: {
        pan: this.handlePan,
        // panend: this.handlePanEnd,
        tap: this.handleTap
      }
    }
  },

  directives,

  created() {
    this._lastPos = {
      x: 0,
      y: 0
    }
  },

  mounted() {
    this.$nextTick(() => {
      this._size = {
        w: this.$el.clientWidth,
        h: this.$el.clientHeight
      }
    })
  },

  methods: {
    handlePan(e) {
      if (!this.isZoomOut) return

      const { deltaX: x, deltaY: y, isFinal } = e
      const _lastPos = this._lastPos
      const pos = {
        x: x + (_lastPos.x || 0),
        y: y + (_lastPos.y || 0)
      }
      this.updateStyle(pos)
      this._isPan = true
      if (isFinal) {
        this._isPan = false
        this._lastPos = pos
        this.bounceBack()
      }
    },
    handleTap(e) {
      if (this._isPan) return

      this.isZoomOut = !this.isZoomOut
      this.updateStyle()
      this._lastPos = {
        x: 0,
        y: 0
      }
    },
    bounceBack() {
      let { x, y } = this._lastPos
      let needsUpdate = false
      const { w, h } = this._size
      const b = this.boundingInse
      if (x > w) {
        x = w
        needsUpdate = true
      }
      if (x < -w) {
        x = -w
        needsUpdate = true
      }
      if (y > h) {
        y = h
        needsUpdate = true
      }
      if (y < -h) {
        y = -h
        needsUpdate = true
      }

      if (needsUpdate) {
        const pos = { x, y }
        this.updateStyle(pos)
        this._lastPos = pos
      }
    },
    updateStyle(styles = {}) {
      const boundingInset = this.boundingInset
      let { x = 0, y = 0 } = styles

      const { w, h } = this._size
      x = Math.max(-(w + boundingInset), Math.min(w + boundingInset, x))
      y = Math.max(-(h + boundingInset), Math.min(h + boundingInset, y))

      this.styles = {
        transform: `translate3D(${x}px, ${y}px, 0) ${this.isZoomOut ? 'scale(3)' : ''}`
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
.goods-img-pan {
  background: #fff;
  position: relative;
  width: 320px;
  height: 440px;
  border: 1px solid $color-border-gray;
  overflow: hidden;
  cursor: zoom-in;
  &.is-zoom {
    cursor: grab;
  }
  .pan-img {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-out;
  }
  .pan-responder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
}
</style>
