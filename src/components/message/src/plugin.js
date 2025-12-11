/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Message from './service'

export default {
  install (Vue) {
    if (Vue.prototype.$Message) return
    Vue.prototype.$Message = Message
  }
}
