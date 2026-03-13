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
    },
    {
      code: 'ar',
      name: 'العربية',
      iso: 'ar-SA',
      language: 'ar-SA'
    }
  ]
  
  export const languageKey = 'i18n_redirected'
  
  const normalizeLocale = (locale) => {
    if (!locale) return 'en'
    const raw = String(locale).trim().toLowerCase().replace(/_/g, '-')
    const compact = raw.replace(/-/g, '')
    const map = {
      zh: 'zh',
      'zh-cn': 'zh',
      zhcn: 'zh',
      cn: 'zh',
      en: 'en',
      'en-us': 'en',
      enus: 'en',
      ar: 'ar',
      'ar-sa': 'ar',
      arsa: 'ar'
    }
    return map[raw] || map[compact] || 'en'
  }
  
  export const defaultLocale = normalizeLocale(process.env.VUE_APP_DEFAULT_LANG)
  