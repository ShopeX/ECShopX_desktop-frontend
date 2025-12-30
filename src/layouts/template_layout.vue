/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <LayoutHoc>
    <!-- <HmNavigationHeader /> -->
    <div class="page-body">
      <Nuxt />
    </div>
  </LayoutHoc>
</template>

<script>
export default {

  head() {
    return {
      title: process.env.VUE_APP_TITLE
    }
  }
}
</script>
