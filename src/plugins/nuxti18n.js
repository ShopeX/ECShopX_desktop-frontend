/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import messages from '../assets/lang'

import { locales, defaultLocale } from '../utils/language'

const i18n = {
  locales: locales,
  defaultLocale: defaultLocale,
  vueI18nLoader: true,
  seo: true,
  vueI18n: {
    messages: messages,
    fallbackLocale: 'zh'
  },
  strategy: 'prefix_and_default',
  // TODO 自动切换多语言
  // detectBrowserLanguage: {
  //   useCookie: true,
  //   cookieKey: 'i18n_redirected',
  //   alwaysRedirect: false,
  //   fallbackLocale: 'en_cn'
  // },
  detectBrowserLanguage: false
}

export default i18n
