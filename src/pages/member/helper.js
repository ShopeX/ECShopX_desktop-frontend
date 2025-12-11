/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { maskMobile } from '@/utils'

export function formatUsername (userInfo, tips) {
  const { username, mobile } = userInfo || {}
  let tips_local = tips
  if (username) {
    tips_local = username + '，' + tips
  } else if (mobile) {
    tips_local = maskMobile(mobile) + '，' + tips
  }
  return tips_local
}
