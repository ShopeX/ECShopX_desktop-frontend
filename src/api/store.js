/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function storeSeach (params = {}) {
  return req.get('/store.search', params, { withAuth: true })
}

// 获取商户类型列表
export function getMerchantType (params = {}) {
  return req.get('/api/h5app/wxapp/merchant/type/list', params, { withAuth: true })
}
// 获取结算银行
export function getBank (params = {}) {
  return req.get('/api/h5app/wxapp/adapay/bank/list', params, { withAuth: true })
}

// 保存入驻商户信息
export function saveSettlementInfo (setp,params = {}) {
  return req.post(`/api/h5app/wxapp/merchant/settlementapply/${setp}`, params, { withAuth: true })
}

// 获取入驻商户详情
export function settlementDetail (params = {}) {
  return req.get(`/api/h5app/wxapp/merchant/settlementapply/detail`)
}
// 获取入驻商户当前步骤
export function settlementSet (params = {}) {
  return req.get(`/api/h5app/wxapp/merchant/settlementapply/step`)
}
// 获取入驻商户审核结果
export function settlementAuditstatus (params = {}) {
  return req.get(`/api/h5app/wxapp/merchant/settlementapply/auditstatus`)
}
// 获取入驻商户入驻协议
export function getBasesetting (params = {}) {
  return req.get(`/api/h5app/wxapp/merchant/basesetting`)
}