/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.win-dispaly-1 {
  // width: 350px;
  .ad-img {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
}
</style>
<template>
  <div class="win-dispaly-1">
    <div class="ad-img">
      <linkPage :mode="mode" :to="`${handleLinkPage(value[0].pathData)}`">
        <ImgWrap :src="value[0].imgUrl" :width="342" :height="160" />
      </linkPage>
    </div>
    <div class="ad-img">
      <linkPage :mode="mode" :to="`${handleLinkPage(value[1].pathData)}`">
        <ImgWrap :src="value[1].imgUrl" :width="342" :height="160" />
      </linkPage>
    </div>
  </div>
</template>

<script>
import ImgWrap from '../../../common/img-wrap'
import linkPage from '../../../common/linkpage'
export default {
  name: 'WinDisplay1',
  inject: ['mode', 'handleLinkPage'],
  props: {
    value: Array
  },
  data() {
    return {
      list: this.value
    }
  },
  components: {
    ImgWrap,
    linkPage
  },
  created() {},
  methods: {}
}
</script>
