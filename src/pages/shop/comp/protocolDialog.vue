/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <SpModal v-model="visiableProtocol" :width="600" @Cancel="handleClose">
    <div slot="title" class="protocol-title">{{ $t('comp.protocolDialog.382474-0') }}</div>
    <div class="protocol-info">
      <p class="dialog-info">{{ $t('comp.protocolDialog.382474-1') }}</p>
    </div>
  </SpModal>
</template>

<script>
export default {
  components: {},
  props: {
    visiableProtocol: Boolean
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    handleClose() {
      this.$emit('close');
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>