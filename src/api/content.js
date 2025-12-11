/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function contentNodeList (params) {
  return req.get('/content.node.list', params)
}

export function contentList (params) {
  return req.get('/content.list', params)
}

export function contentDetail (params) {
  return req.get('/content.info', params)
}

export function qrcode (params) {
  return req.get('/share.qrcode', params)
}

export function contentInfo (params) {
  return req.get('/content.info', params)
}
