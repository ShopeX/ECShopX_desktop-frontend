/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.shop-bind {
  display: flex;
  align-items: center;

  &__path {
    position: relative;
    width: 100%;

    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -8px;
      z-index: $z-index-level-8;
      color: $color-active;
      cursor: default;
    }
    &-con {
      height: 36px;
      line-height: 36px;
      border: 1px solid $color-divider;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
      text-align: center;
      .icon-editor-link {
        margin-right: 4px;
      }
      .text {
        position: relative;
        top: -2px;
      }
    }
  }
  &.path-full {
    .shop-bind__path {
      flex: 1;
    }
  }
}
</style>
<template>
  <div class="shop-bind">
    <div class="shop-bind__path">
      <div class="path-wrap" @click="handleClickSetPath">
        <SpIcon icon="icon-delete1" v-if="false" @click.native.stop="handleDeletePath"></SpIcon>
        <div class="shop-bind__path-con">
          <i class="mshopdesign icon-editor-link"></i>
          <span class="text">{{ pathTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shopPicker',
  components: {},
  props: {
    value: [Object, String, Array],
    shopData: [Object, Array],
    activeKey: {
      type: String,
      default: ''
    },
    shopOnChange: Function,
    pathTitle: {
      type: String,
      default: '选择商铺'
    }
  },
  data() {
    return {}
  },
  methods: {
    // 路径选择
    async handleClickSetPath() {
      const res = await this.$picker('shop', {
        title: '选择商铺',
        data: {}
      })
      console.log('$picker component result:', res.data)
      this.$emit('input', res.data)
      this.shopOnChange && this.shopOnChange(res.data)
      this.$emit('shopOnChange', res.data)
    },
    handleDeletePath() {
      this.$Modal.confirm({
        title: '提示',
        content: '确定情况商铺？',
        onOk: () => {
          const result = {}
          this.$emit('input', result)
          this.shopOnChange && this.shopOnChange(result)
          this.$emit('shopOnChange', result)
          this.$Message.success('删除成功！')
        }
      })
    }
  }
}
</script>
