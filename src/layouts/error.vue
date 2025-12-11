/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.page-error {
  text-align: center;
  &__container {
    margin-bottom: 100px;
  }
  .icon {
    margin-top: 50px;
  }
  .sp-tip-message {
    padding: 50px;
    font-weight: bold;
    &__txt {
      // display: block;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <LayoutHoc>
  <div class="page-error page-body">
    <div v-if="statusCode === 404" class="page-error__container">
      <div class="icon">
        <img src="~/assets/imgs/404.png" alt />
      </div>
      <SpTipMessage
        :value="true"
        :tipText="$t('layouts.error.251551-0')"
        :tipLink="$t('layouts.error.251551-1')"
        to="/"
      ></SpTipMessage>
    </div>
    <div v-else class="page-error__container">
      <SpTipMessage
        :value="true"
        :tipText="$t('layouts.error.251551-2')"
        :tipLink="$t('layouts.error.251551-1')"
        to="/"
      ></SpTipMessage>
    </div>
    <!-- <Recommend /> -->
  </div>
</LayoutHoc>
</template>

<script>
import Recommend from '@/pages/items/comps/recommend'
import { analytics } from '@/plugins/analytics'

export default {
  props: ['error'],
  components: { Recommend },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  },
  mounted() {
    // analytics.errorPage(this.statusCode)
    // console.log('*****error page*****')
    // console.log(this.$store.state.user.userInfo)
  },
  methods: {}
}
</script>
