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

  const pathLang = getlanguageByPath(route.path) 
  let lang = pathLang || app.i18n.locale || defaultLocale
  const routePath = route.path;
  store.commit('SET_LANG', lang)

  app.i18n.locale = lang
  if (
    routePath.indexOf(`${lang}`) === -1 &&
    defaultLocale !== lang
  ) {
    const trans = routePath.indexOf(zhPath) !== -1
      ? {
        c: zhPath,
        r: enPath
      }
      : routePath.indexOf(enPath) !== -1
        ? {
          c: enPath,
          r: zhPath
        }
        : null;
    const path = trans ? routePath.replace(trans.c, trans.r) : `/${`${lang}`}${routePath}`
    return redirect({ path: path, query: route.query })
  }
}
