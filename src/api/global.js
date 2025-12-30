/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function getGlobalTdk(params) {
  return req.get('/api/h5app/wxapp/pagestemplate/gettdk', params)
}
