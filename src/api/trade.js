/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function list (params) {
  return req.get('api/h5app/wxapp/orders', params, { withAuth: true })
}
export function createOrderRate (params) {
  return req.post(`api/h5app/wxapp/order/rate/create`, params)
}
export function getdeliveryId (params) {
  return req.get(`/api/h5app/wxapp/delivery/lists`,params)
}
export function deliveryInfo (params) {
  // return req.get(`api/h5app/wxapp/trackerpull`,params)
  return req.get(`/api/h5app/wxapp/delivery/trackerpull`,params)
}
export function detail (tid) {
  return req.get(`/trade.detail`, tid, { withAuth: true })
}
export function create (params) {
  return req.post('/trade.create', params, { withAuth: true })
}

export function remove (tid) {
  return req.post('/trade.delete', {
    tid
  })
}

export function paymentList (params) {
  return req.get('/trade.payment.list', params)
}

export function paymentdo (params) {
  return req.post('/trade.payment.do', params, { withAuth: true })
}

export function tradeCancelBuyer (params) {
  return req.post('/trade.cancel.buyer', params, { withAuth: true })
}

export function tradePaymentFinish (payment_id) {
  return req.post('/trade.payment.finish', { payment_id }, { withAuth: true })
}

export function paymentCreate (tid) {
  return req.post('/trade.payment.create', { tid }, { withAuth: true })
}

export function tradeConfirmReceipt (params) {
  return req.post('/trade.confirm.receipt', params, { withAuth: true })
}

export function logistics (params) {
  return req.post('/trade.logistics', params)
}

export function tradeList (params) {
  return req.post('/trade.payment.tradeList', params, { withAuth: true })
}

export function alipayCallBack (params) {
  return req.post('/api/alipay/notify', params)
}
// 结算返回首页后更新订单信息
export function aliPayResult (params) {
  return req.get('/api/h5app/wxapp/trade/payment/alipay/result', params)
}
// 售后原因列表
export function reasonList (params) {
  return req.get('/api/h5app/wxapp/aftersales/reason/list', params)
}
