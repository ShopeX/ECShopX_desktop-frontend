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
    return path.includes(zhKey) ? 'zh' : path.includes(enKey) ? 'en' : ''
  }
  