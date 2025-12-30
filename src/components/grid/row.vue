/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
     <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Row',
  computed: {
    classes () {
      return []
    },
    styles () {
      return {}
    }
  }
}
</script>
