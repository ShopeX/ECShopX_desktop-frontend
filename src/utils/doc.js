/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export const getLanguage = () => {
    const store = Vue.prototype.$context.store
    return store.getters.lang
  }

  export const getlanguageByPath = (path) => {
    const zhKey = 'zh'
    const enKey = 'en'
    const arKey = 'ar'
    if (path.includes(zhKey)) return 'zh'
    if (path.includes(enKey)) return 'en'
    if (path.includes(arKey)) return 'ar'
    return ''
  }
