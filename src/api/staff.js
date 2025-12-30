/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function addressList (params) {
  return req.get('/staff.address.list', {
    disabled: 1,
    ...params
  })
}

export function dologin (params) {
  return req.post('/staff.dologin', {
    ...params
  })
}

export function sendVcode (data) {
  return req.post('/staff.send.vcode', data)
}

export function staffMobile (work_id) {
  return req.post('/staff.mobile', { work_id })
}

export function staffAgreement () {
  return req.post('/staff.agreement')
}
