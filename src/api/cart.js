/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'
// 购物车商品列表
export function cartList(params) {
  return req.get('api/h5app/wxapp/cart/list', params, 'GET')
}
// 修改商品数量
export function cartNumChange(params) {
  return req({ url: 'api/h5app/wxapp/cartupdate/num', params, method: 'PUT' })
}
// 修改购物车选中状态
export function updateCheckStatus(params) {
  return req({ url: 'api/h5app/wxapp/cartupdate/checkstatus', params, method: 'PUT' })
}
// 修改选取状态
export function checkStatus(data) {
  console.log(data, 'data')
  return req({
    url: 'api/h5app/wxapp/cartupdate/checkstatus',
    data,
    method: 'PUT'
  })
}
// 删除购物车商品
export function cartDelete(params) {
  return req({ url: 'api/h5app/wxapp/cartdel', params, method: 'DELETE' })
}
// 购物车订单内容修改
export function freightFee(data) {
  return req({ url: 'api/h5app/wxapp/getFreightFee', data, method: 'POST' })
}
// 购物车订单创建提交
export function creatOrder(data) {
  return req({ url: '/api/h5app/wxapp/order_new', data, method: 'POST' })
}
// 订单信息获取
export const getOrderDet = (params, id) => {
  return req({ url: `api/h5app/wxapp/order_new/${id}`, params, method: 'GET' })
}
// 支付方式获取
export const getPaymentList = (params) => {
  return req({ url: `api/h5app/wxapp/trade/payment/list`, params, method: 'GET' })
}
// 支付
export const payMent = (data) => {
  return req({ url: 'api/h5app/wxapp/payment', data, method: 'POST' })
}
// 支付
export const likeList = (params) => {
  return req({ url: 'api/h5app/wxapp/promotions/recommendlike', params, method: 'get' })
}
// /优惠券列表
export const cardList = (params) => {
  return req.get('api/h5app/wxapp/getCardList', params, { withAuth: true })
}
// 领取优惠券
export const receiveCard = (params) => {
  return req.get('api/h5app/wxapp/user/receiveCard', params, { withAuth: true })
}
// export function add (item, quantity = 1) {
//   const { sku_id, mode, woman, sid, user_id } = item
//   return req.post(`/cart.add`, {
//     sku_id,
//     mode,
//     quantity,
//     woman,
//     sid,
//     user_id
//   }, { withAuth: true })
// }
export function add(item, num = 1) {
  const { item_id, cart_type, distributor_id, shop_type } = item
  return req.post(
    `/api/h5app/wxapp/cart`,
    {
      item_id,
      cart_type,
      num,
      shop_type,
      distributor_id
    },
    { withAuth: true }
  )
}

export function del(params) {
  return req.post(
    '/cart.del',
    {
      ...params
    },
    { withAuth: true }
  )
}

export function checkout(params) {
  return req.get(
    '/cart.checkout',
    {
      ...params
    },
    { withAuth: true }
  )
}

export function update(cart_params) {
  return req.post(
    '/cart.update',
    {
      ...cart_params,
      platform: 'app',
      obj_type: 'item'
    },
    { withAuth: true }
  )
}

export function getCartNewData(params) {
  return req.post(
    '/cart.get.new',
    {
      ...params,
      platform: 'app'
    },
    { withAuth: true }
  )
}

export function caculateCartToatal(params) {
  return req.post('/cart.total', params, { withAuth: true })
}

export function cartCheck(params) {
  return req.post('/cart.check', params, { withAuth: true })
}

export function addGift(params) {
  return req.post('/cart.addGift', params, { withAuth: true })
}

export function userPoint({ total_price, post_fee, mode = 'cart' }) {
  return req.get('/cart.user.point', {
    total_price,
    post_fee,
    mode
  })
}

// 获取购物车数量
export function getCartCount(params) {
  return req.get('/api/h5app/wxapp/cartcount', {
    ...params
  })
}
export function geticket(params) {
  return req.get('/api/h5app/wxapp/promotion/seckillactivity/geticket', {
    ...params
  })
}

//获取收款账户
export function getBackaccount(params) {
  return req.get('/api/h5app/wxapp/order/offline/backaccount', {
    ...params
  })
}

//上传凭证
export function uploadVoucher(params) {
  return req.post('/api/h5app/wxapp/order/offline/upload/voucher', params)
}

//更新凭证
export function updateVoucher(params) {
  return req.post('/api/h5app/wxapp/order/offline/update/voucher', params)
}

//获取凭证
export function getVoucher(params) {
  return req.get('/api/h5app/wxapp/order/offline/get/voucher', params)
}
