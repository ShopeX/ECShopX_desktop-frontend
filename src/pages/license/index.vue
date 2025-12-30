/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.page-license-staff {
  padding: 50px 200px;
  .licensetext {
    font-size: 20px;
    text-align: center;
  }
  //   .license {
  //      &-title: {
  //       font-size: 20px;
  //       text-align: center;
  //     }
  //   }
  @include respond(sm) {
    padding: 15px 10px;
  }
}
</style>

<template>
  <div class="page-license-staff page-body">
    <div class="licensetext">{{title}}</div>
    <div v-html="agreement"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      agreement: ''
    }
  },
  created () {
    const { type } = this.$route.query
    this.getAgreement(type)
  },
  methods: {
    async getAgreement (type) {
      const { content, title } = await this.$api.user.userClause(type)
      this.title = title
      this.agreement = content
    }
  }
}
</script>
