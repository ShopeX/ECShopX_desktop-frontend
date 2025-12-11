/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Base from './base'

export default class Baidu extends Base {
  name = 'baidu'

  constructor (options) {
    super(options)

    if (process.client) {
      global._hmt = global._hmt || []

      var hm = document.createElement('script')
      hm.src = `https://hm.baidu.com/hm.js?${options.id}`
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }

  trackEvent ({ category, action, label, value }) {
    global._hmt.push(['_trackEvent', category, action, label, value])
  }
}
