/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { locales, languageKey, defaultLocale } from '@/utils/language'
import { getlanguageByPath } from '@/utils/doc'
export default function (context) {
  const { store, route, redirect, app, isHMR, error } = context
  if (isHMR) return

  const enPath = `en`
  const zhPath = 'zh'
  const arPath = 'ar'

  const pathLang = getlanguageByPath(route.path)
  let lang = pathLang || app.i18n.locale || defaultLocale
  const routePath = route.path;
  store.commit('SET_LANG', lang)

  app.i18n.locale = lang
  if (
    routePath.indexOf(`${lang}`) === -1 &&
    defaultLocale !== lang
  ) {
    // 支持三种语言之间的路径转换
    let trans = null
    if (routePath.indexOf(zhPath) !== -1) {
      trans = { c: zhPath, r: lang }
    } else if (routePath.indexOf(enPath) !== -1) {
      trans = { c: enPath, r: lang }
    } else if (routePath.indexOf(arPath) !== -1) {
      trans = { c: arPath, r: lang }
    }

    const path = trans ? routePath.replace(trans.c, trans.r) : `/${lang}${routePath}`
    return redirect({ path: path, query: route.query })
  }
}
