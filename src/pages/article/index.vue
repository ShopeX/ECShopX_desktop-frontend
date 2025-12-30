/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.page-article {
}
</style>

<template>
  <div class="page-article page-body container">
    {{ $t('article.index.147915-0') }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    imgStyle() {
      let width = 180
      return {
        width: width + 'px',
        height: Math.floor(width * 1.2825) + 'px'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
