/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.win-dispaly-2 {
  > .ad-img {
    margin-bottom: 2px;
  }
  .img-row {
    .ad-img {
      float: left;
      &:not(:last-child) {
        margin-right: 2px;
      }
    }
  }
}
</style>
<template>
  <div class="win-dispaly-2">
    <div class="ad-img">
      <linkPage :mode="mode" :to="`${handleLinkPage(value[0].pathData)}`">
        <ImgWrap :src="value[0].imgUrl" :width="350" :height="180" />
      </linkPage>
    </div>
    <div class="img-row">
      <div class="ad-img">
        <linkPage :mode="mode" :to="`${handleLinkPage(value[1].pathData)}`">
          <ImgWrap :src="value[1].imgUrl" :width="174" :height="180" />
        </linkPage>
      </div>
      <div class="ad-img">
        <linkPage :mode="mode" :to="`${handleLinkPage(value[2].pathData)}`">
          <ImgWrap :src="value[2].imgUrl" :width="174" :height="180" />
        </linkPage>
      </div>
    </div>
  </div>
</template>

<script>
import ImgWrap from '../../../common/img-wrap'
import linkPage from '../../../common/linkpage'
export default {
  name: 'WinDisplay2',
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
