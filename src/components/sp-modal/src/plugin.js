/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Modal from './service'

export default {
  install(Vue) {
    if (Vue.prototype.$Modal) return
    Vue.prototype.$Modal = Modal
  }
}
