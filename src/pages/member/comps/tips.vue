/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="member__tips">{{showTips}}</div>
</template>
<script>
import { formatUsername } from '../helper.js'

export default {
  props: {
    tips: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    showTips: function () {
      return formatUsername(this.userInfo, this.tips || this.$t('comps.tips.500997-0'))
    }

  }
}
</script>

    <style lang="scss" scoped>
  .member__tips{
    font-size: 16px;
    // color: $color-primary-text;
  }
</style>
