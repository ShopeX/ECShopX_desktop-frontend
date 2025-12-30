/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.page-license-staff {
  padding: 50px 200px;
  @include respond(sm) {
    padding: 15px 10px;
  }
}
</style>

<template>
  <div class="page-license-staff page-body">
    <div v-html="agreement"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      agreement: ''
    }
  },
  created () {
    this.getAgreement()
  },
  methods: {
    async getAgreement () {
      const { agreement } = await this.$api.staff.staffAgreement()
      this.agreement = agreement
    }
  }
}
</script>
