/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function getContentNodes (params) {
  return req.get('/content.node.list', {
    ...params
  }, { withAuth: true })
}

export function getContentList (params) {
  return req.get('/content.list', {
    ...params
  }, { withAuth: true })
}

// 常见问题
export function getArticleContent (params) {
  return req.get('/content.info', {
    ...params
  }, { withAuth: true })
}
