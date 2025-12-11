/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export default {
  data() {
    return {
      pageType: 'item',
      currentKeywords: '',
      currentDescription: '',
      currentTitle: ''
    }
  },
  head() {
    return {
      title: this.currentTitle,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.currentKeywords },
        { hid: 'description', name: 'description', content: this.currentDescription }
      ]
    }
  },
  methods: {
    async getListAndSetSeo(incomingParams = {}, id) {
      console.log('--getListAndSetSeoasdas--')
      const globalSeo = this.$store.state.global.pageSeo
      const newParams = {
        ...incomingParams,
        is_tdk: 1
      }
      let list
      if (this.pageType === 'item') {
        list = await this.$api.item.list(newParams)
      } else if (this.pageType === 'itemDetail') {
        list = await this.$api.item.detail(id, newParams)
      } else if (this.pageType === 'pointitem') {
        list = await this.$api.item.pointsmallList(newParams)
      } else if (this.pageType === 'pointitemDetail') {
        list = await this.$api.item.pointsmallDetail(id, newParams)
      }
      let mergeObject = Object.assign({}, globalSeo, JSON.parse(JSON.stringify(list)).tdk_data)
      this.currentTitle = mergeObject.title
      this.currentKeywords = mergeObject.mate_keywords
      this.currentDescription = mergeObject.mate_description
      return list
    }
  }
}
