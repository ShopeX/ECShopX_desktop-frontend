/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.img-picker {
  // display: flex;
  // align-items: center;
  &__btn {
    // width: 80px;
    // height: 80px;
    @include pdt-img(80px);
    border: 1px solid $color-divider;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    overflow: inherit;
    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -10px;
      z-index: $z-index-level-8;
      color: $color-active;
      cursor: default;
    }
    .null-picker {
      margin-top: 15px;
      text-align: center;
      .icon {
        font-size: 20px;
      }
    }
  }
}
</style>

<template>
  <div class="img-picker">
    <div class="img-picker__btn" @click="handleSelectImg">
      <SpIcon icon="icon-delete1" @click.native.stop="handleDelete" v-if="value"></SpIcon>
      <img :src="value" alt v-if="value" />
      <div class="null-picker" v-if="!value">
        <div class="icon">+</div>
        <div>选择图片</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgPicker',
  components: {},
  props: {
    value: String,
    onChange: Function,
    multiple: Boolean
  },
  data() {
    return {
      img: ''
    }
  },
  methods: {
    /** 图片选择 */
    async handleSelectImg() {
      const res = await this.$picker('img', {
        data: {},
        multiple: this.multiple
      })
      this.$emit('input', res.data.url)
    },
    handleDelete() {
      this.$emit('input', '')
    }
  }
}
</script>
