<template>
  <div :dir="direction">
    <slot />
  </div>
</template>

<script>
import { getCurrentDirection } from '@/utils/rtl'

export default {
  name: 'LayoutHoc',
  computed: {
    direction() {
      return getCurrentDirection(this)
    }
  },
  mounted() {
    const getlanguageByPath = (path) => {
      const zhKey = 'zh'
      const enKey = 'en'
      const arKey = 'ar'
      if (path.includes(zhKey)) return 'zh'
      if (path.includes(enKey)) return 'en'
      if (path.includes(arKey)) return 'ar'
      return null
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
