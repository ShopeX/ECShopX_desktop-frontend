/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { startLoading } from './service'

const Loading = function(params = {}) {
  params.fullscreen = true
  return startLoading(params)
}

export default {
  install(Vue) {
    if (Vue.prototype.$loading) return
    
    // 确保在 Vue 实例上安装 $loading 方法
    Vue.prototype.$loading = Loading
    
    // 如果 i18n 还没有准备好，等待它准备好
    if (!Vue.prototype.$i18n) {
      Vue.mixin({
        beforeCreate() {
          if (this.$i18n && !this.$loading) {
            this.$loading = Loading
          }
        }
      })
    }
  }
}
