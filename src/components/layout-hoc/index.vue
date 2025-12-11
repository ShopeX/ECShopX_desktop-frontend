/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutHoc',
  mounted() {
    const getlanguageByPath = (path) => {
      const zhKey = 'zh'
      const enKey = 'en'
      return path.includes(zhKey) ? 'zh' : path.includes(enKey) ? 'en' : null
    }
    const language = getlanguageByPath(this.$route.path)
    if (language && this.$store.state.locale != language) {
      this.$store.commit('SET_LANG', language)
    } else if (!language) {
      this.$store.commit('SET_LANG', 'zh')
    }   
  } 
}
</script>

<style scoped>

</style>