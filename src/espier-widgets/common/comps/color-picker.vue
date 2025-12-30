/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.color-picker {
  height: 24px;
  .color-select-box {
    border: 1px solid #dddee1;
    height: 24px;
    width: 60px;
    border-radius: 3px;
    padding: 2px;
  }
  .color-select {
    height: 100%;
  }
  .api {
    height: 300px;
  }
}
</style>

<template>
  <div class="color-picker" style>
    <Poptip placement="bottom" :transfer="true">
      <div class="color-select-box">
        <div class="color-select" :style="{ backgroundColor: value }"></div>
        <!-- <div
          class="color-select"
          :style="{
            backgroundColor: color,
            backgroundImage:
              color === 'none'
                ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)'
                : ''
          }"
        ></div> -->
        <!-- {{color.hex}} -->
      </div>
      <div class="api" slot="content">
        <!-- {{skcolor}} -->
        <sketch-picker v-model="skcolor"></sketch-picker>
      </div>
    </Poptip>
    <!-- <sketch-picker v-model="color"></sketch-picker> -->
  </div>
</template>

<script>
import { Sketch as sketchPicker } from 'vue-color'
export default {
  name: 'colorPicker',
  mixins: [],
  components: {
    sketchPicker
  },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      // color: this.value,
      skcolor: this.value
    }
  },
  watch: {
    skcolor(newVal, oldVal) {
      // this.color = newVal.hex8
      // this.$emit( 'input', newVal.hex8 )
      const { r, g, b, a } = newVal.rgba
      this.color = `rgba(${r},${g},${b},${a})`
      // console.log( '[colorPicker]', this.color, r, g, b, a )
      this.$emit('input', `rgba(${r},${g},${b},${a})`)
    }
  }
}
</script>
