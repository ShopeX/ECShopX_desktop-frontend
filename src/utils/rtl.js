/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

/**
 * RTL (Right-to-Left) 工具函数
 * 用于检测和处理从右到左的语言布局
 */

/**
 * RTL 语言列表
 */
const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']

/**
 * 检测指定语言是否为 RTL 语言
 * @param {string} locale - 语言代码，如 'ar', 'zh', 'en'
 * @returns {boolean} 是否为 RTL 语言
 */
export function isRTL(locale) {
  if (!locale) {
    return false
  }
  return RTL_LOCALES.includes(locale.toLowerCase())
}

/**
 * 获取指定语言的文本方向
 * @param {string} locale - 语言代码
 * @returns {string} 'rtl' 或 'ltr'
 */
export function getDirection(locale) {
  return isRTL(locale) ? 'rtl' : 'ltr'
}

/**
 * 从 Vue 实例或上下文获取当前语言
 * @param {Object} context - Vue 实例或包含 $i18n 的对象
 * @returns {string} 当前语言代码
 */
export function getCurrentLocale(context = null) {
  // 如果在 Vue 组件中，尝试从 $i18n 获取
  if (context && context.$i18n) {
    return context.$i18n.locale || 'en'
  }
  
  // 如果在 Nuxt 上下文中
  if (process.client && window.$nuxt && window.$nuxt.$i18n) {
    return window.$nuxt.$i18n.locale || 'en'
  }
  
  // 从 localStorage 获取
  if (process.client) {
    const stored = localStorage.getItem('i18n_redirected')
    if (stored) {
      try {
        return JSON.parse(stored) || 'en'
      } catch {
        return stored || 'en'
      }
    }
  }
  
  // 默认返回英文
  return process.env.VUE_APP_DEFAULT_LANG || 'en'
}

/**
 * 检测当前语言是否为 RTL
 * @param {Object} context - Vue 实例或上下文
 * @returns {boolean} 是否为 RTL 语言
 */
export function isCurrentRTL(context = null) {
  const locale = getCurrentLocale(context)
  return isRTL(locale)
}

/**
 * 获取当前语言的文本方向
 * @param {Object} context - Vue 实例或上下文
 * @returns {string} 'rtl' 或 'ltr'
 */
export function getCurrentDirection(context = null) {
  const locale = getCurrentLocale(context)
  return getDirection(locale)
}

