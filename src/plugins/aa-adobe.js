/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { log } from '@/utils'
class Adobe {
  constructor (options = {}) {
    this.init()
  }

  init () {
    if (process.client) {
      window.digitalData = {
        core: {
          language: 'zh', // language of content on page
          currencyCode: 'CNY'
        },
        page: {},
        visitor: {},
        ecommerce: {}
      }
    }
  }

  track (params) {
    this.init()
    window.digitalData = {
      ...window.digitalData,
      ...params
    }
    if (window._satellite) {
      window._satellite.track('page ready')
    } else {
      console.error('adobe script load fail')
    }
    // console.log('--page--ready--', window.digitalData)
  }

  event (params, name) {
    window.digitalData.eventData = {
      ...params
    }

    window.digitalData.event = name
    // console.log('--digitalData event--', window.digitalData, window.digitalData.event)
  }
}

export default new Adobe()
