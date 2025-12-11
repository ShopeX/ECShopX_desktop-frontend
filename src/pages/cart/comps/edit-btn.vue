/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.edit-btn {
  display: inline;
  &__icon {
    float: left;
    position: relative;
    top: 4px;
    margin-right: 2px;
  }
  &__warp {
    // width: 100px;
    position: relative;
  }
  &__text {
    color: #cb0025;
    position: relative;
  }
}
</style>

<template>
  <div class="edit-btn" @click.stop="handleClick">
    <SpButton type="text">
      <div class="edit-btn__warp">
        <!-- <i class="mb-iconfont mb-iconfont-dropdown up"></i>
          <i class="mb-iconfont mb-iconfont-dropdown down"></i> -->
        <img class="edit-btn__icon" src="~/assets/imgs/rectangle.png" alt="" width="8" />
        <span class="edit-btn__text">{{ text }}</span>
      </div>
    </SpButton>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: this.$t('comps.edit-btn.393972-0')
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
