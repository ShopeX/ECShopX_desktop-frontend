/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div className="sp-page-template">
   
        <SpTemplate :list="list" type="edit" />

  </div>
</template>
<script>
import PostMessage from '@/components/sp-template/src/postmessage'
import { ACTIONS, SOURCE } from '@/components/sp-template/src/util'
export default {
  layout: 'template_layout',
  data() {
    return {
      list: []
    }
  },
  methods: {
    listener() {
      this.postmessage.onMessage((data) => {
        switch (data.action) {
          case ACTIONS.UPDATE:
            const list = [...data.payload.value]
            this.list = list
            break
        }
      })
    }
  },

  created() {
    this.postmessage = new PostMessage()
  },
  mounted() {
    if (this.$route.query.type && this.$route.query.type.includes('edit')) {
      this.listener()
    }
  }
}
</script>
<style lang="scss">
.template-edit {
   background: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, .1);
    flex: 1;
    overflow: auto;
}
</style>
