/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Baidu from './baidu'

class Trackers {
  constructor () {
    this.providers = {
      baidu: Baidu
    }
  }

  get (name, options) {
    const Tracker = this.providers[name]
    return new Tracker(options)
  }
}

export default new Trackers()
