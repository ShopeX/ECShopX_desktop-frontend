/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export const locales = [
    {
      code: 'en',
      name: 'English',
      language: 'en-US',
      iso: 'en-US'
    },
    {
      code: 'zh',
      name: '中文',
      iso: 'zh-CN',
      language: 'zh-CN'
    }
  ]
  
  export const languageKey = 'i18n_redirected'
  export const defaultLocale = process.env.VUE_APP_DEFAULT_LANG || 'en'
  