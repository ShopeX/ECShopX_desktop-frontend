/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export default {
  head() {
    const { mate_description, mate_keywords, title } = this.$store.state.global.pageSeo
    console.log('-----heamixd-----')
    return {
      title: title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: mate_keywords },
        { hid: 'description', name: 'description', content: mate_description }
      ]
    }
  },
  methods: {
    setSeo() {
      const { mate_description, mate_keywords, title } = this.$store.state.global.pageSeo
      const { title: documentTitle, keywords, description } = document
      if (mate_description !== description) {
        document.description = mate_description
      }
      if (mate_keywords !== keywords) {
        document.title = mate_keywords
      }
      if (title !== documentTitle) {
        document.title = title
      }
    }
  }
}
