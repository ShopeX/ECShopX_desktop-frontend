/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function info (params) {
  return req.get('/aftersales.apply.view', params, { withAuth: true })
}

export function apply (params) {
  return req.post('/aftersales.apply', params, { withAuth: true })
}

export function list (params) {
  return req.get('/aftersales.list.get', params, { withAuth: true })
}

export function logistics (params) {
  return req.post('/aftersales.send.back', params, { withAuth: true })
}

export function logisticsList () {
  return req.get('/logistics.dlycorp.get.list', { withAuth: true })
}

export function detail (params) {
  return req.get('/aftersales.detail.get', params, { withAuth: true })
}

export function uploadPic (params) {
  return req.post('/aftersales.uploadPic', params, { withAuth: true })
}
