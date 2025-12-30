/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function lucky_list (params) {
  return req.get('/lucky.activity.items', params, { withAuth: true })
}
export function staff_list (params) {
  return req.get('/staff.activity.items', params, { withAuth: true })
}