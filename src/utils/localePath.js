/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { defaultLocale } from './language'
import { getlanguageByPath } from './doc'

/**
 * 生成本地化路径（带语言前缀）
 * @param {string} path - 原始路径，如 '/items/123' 或 '/items'
 * @param {string} locale - 语言代码，如 'zh', 'en', 'ar'。如果不提供，则从当前路由或默认语言获取
 * @param {Object} context - Vue 实例或 Nuxt 上下文，用于获取当前语言
 * @returns {string} 带语言前缀的路径，如 '/zh/items/123' 或 '/en/items'
 */
export function localePath(path, locale = null, context = null) {
  if (!path) return ''
  
  // 如果路径已经是绝对 URL，直接返回
  if (/^(https?|mailto|tel):/.test(path)) {
    return path
  }
  
  // 获取当前语言
  let currentLocale = locale
  
  if (!currentLocale) {
    // 尝试从 context 获取
    if (context) {
      if (context.$i18n && context.$i18n.locale) {
        currentLocale = context.$i18n.locale
      } else if (context.$route && context.$route.path) {
        const pathLang = getlanguageByPath(context.$route.path)
        if (pathLang) {
          currentLocale = pathLang
        }
      }
    }
    
    // 如果还是没有，尝试从全局获取
    if (!currentLocale && process.client && window.$nuxt && window.$nuxt.$i18n) {
      currentLocale = window.$nuxt.$i18n.locale
    }
    
    // 最后使用默认语言
    if (!currentLocale) {
      currentLocale = defaultLocale
    }
  }
  
  // 如果路径已经包含语言前缀，先移除
  const pathWithoutLang = path.replace(/^\/(zh|en|ar)(\/|$)/, '/')
  
  // 如果是默认语言且路径是根路径，可以不添加语言前缀（根据 nuxt-i18n 的 prefix_and_default 策略）
  // 但为了保持一致性，我们总是添加语言前缀
  if (currentLocale === defaultLocale && pathWithoutLang === '/') {
    return '/'
  }
  
  // 确保路径以 / 开头
  const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`
  
  // 生成带语言前缀的路径
  return `/${currentLocale}${normalizedPath}`
}

/**
 * 在 Vue 组件中使用的辅助方法
 * 可以通过 mixin 或直接在组件中使用
 */
export function getLocalePath(path, locale = null) {
  // 在 Vue 组件中，this 会被自动传入
  return localePath(path, locale, this)
}

