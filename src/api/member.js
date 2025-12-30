/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

// 收货地址列表
export function addressList (params) {
  return req({ url: 'api/h5app/wxapp/member/addresslist', params, method: 'get' })
}
// 修改添加收货地址
export const addressUpdate = (data, obj) => {
  /**
   * obj:{
   * id:id //新增不需要
   * method:post||put //新增post 更新put,删除DElete
   * }
   */
  let url = obj.id ? `api/h5app/wxapp/member/address/${obj.id}` : `api/h5app/wxapp/member/address`
  return req({ url, data, method: obj.method })
  // return http.fetch(`api/h5app/wxapp/member/address/${obj.id}`, params, method:'get')
}
// 订单信息
export function getOrderInfo (params) {
  return req({ url: `api/h5app/wxapp/order/${params.id}`, params, method: 'get' })
}
// 取消订单
export function orderCancel (data) {
  return req({ url: `api/h5app/wxapp/order/cancel`, data, method: 'post' })
}
// 创建售后
export function creatAftersales (data) {
  return req({ url: `api/h5app/wxapp/aftersales`, data, method: 'post' })
}
// 售后列表
export function aftersaleList (data) {
  return req.get(`/api/h5app/wxapp/aftersales`, data, { withAuth: true })
}

// 售后单
export function aftersalesInfo (data) {
  return req.get(`/api/h5app/wxapp/aftersales/info`, data, { withAuth: true })
}
// 修改售后信息
export const editAftersales = (data) => {
  return req.post(`/api/h5app/wxapp/aftersales/modify`, data, { withAuth: true })
}
// 修改售后信息
export const closeAftersales = (data) => {
  return req.post(`/api/h5app/wxapp/aftersales/close`, data, { withAuth: true })
}
// 修改售后信息
export const sendbackAftersales = (data) => {
  return req.post(`/api/h5app/wxapp/aftersales/sendback`, data, { withAuth: true })
}
//获取物流详情
export const getTrackerpull = (params) => {
  return req({ url: 'api/h5app/wxapp/trackerpull', params, method: 'get' })
}
// 确认收货
export const confirmOrder = (data) => {
  return req.post( 'api/h5app/wxapp/order/confirmReceipt', data,{ withAuth: true })
}
// 
export function getCount (params = { order_type: 'normal' }) {
  return req.get('api/h5app/wxapp/orderscount', params)
}

export function addressItem (addr_id) {
  return req.get('/member.address.get', { addr_id }, { withAuth: true })
}

export function addressCreate (params = {}) {
  return req.post('/member.address.add', params, { withAuth: true })
}



// export function addressUpdate (params = {}) {
//   return req.post(`/member.address.update`, params, { withAuth: true })
// }

export function addressDelete (addr_id) {
  return req.post(`/member.address.delete`, addr_id, { withAuth: true })
}

export function addressSetDefault (addr_id) {
  return req.get(`/member.address.setDefault`, addr_id, { withAuth: true })
}

export function favoriteItemAdd (item_id) {
  return req.post(`/member.favorite.item.add`, item_id, { withAuth: true })
}
export function favoriteItemRemove (item_id) {
  return req.get(`/member.favorite.item.remove`, item_id, { withAuth: true })
}

export function favoriteShop (shop_id) {
  return req.get(`/member.favorite.shop.add`, shop_id, { withAuth: true })
}

export function favoriteItemList (params) {
  return req.get('/api/h5app/wxapp/member/collect/item', params, { withAuth: true })
}

export function memberInfo () {
  return req.get(`/api/h5app/wxapp/member`, null, { withAuth: true });
}


// 地区json
export const areaList = (params) => {
  // return http.fetch('api/h5app/wxapp/member/addressarea', params, 'GET')
  return req({ url: 'api/h5app/wxapp/espier/address', params, method: 'get' })
  // return req.fetch('api/h5app/wxapp/espier/address', params, 'GET')
}
// 商品可用优惠券接口
export function couponList (params = {}) {
  return req.get('/api/h5app/wxapp/user/newGetCardList', params, { withAuth: true })
}
// 用户优惠券接口
export function getUserCardList (params = {}) {
  return req.get('/api/h5app/wxapp/user/getUserCardList', params, { withAuth: true })
}

export function updateLoginPassword (params) {
  return req.get('/member.safe.updateLoginPassword', params, { withAuth: true })
}

export function resetLoginPassword (params) {
  return req.get('/member.safe.resetLoginPassword', params, {
    withAuth: true
  })
}

export function checkResetLoginPassword () {
  return req.get('/member.safe.checkResetLoginPassword', null, { withAuth: true })
}

// 收藏商品
export const addCollection = (params, id) => {
  return req.post(`/api/h5app/wxapp/member/collect/item/${id}`, params)
}
// 取消收藏
export const removeCollection = (params) => {
  return req.delete(`/api/h5app/wxapp/member/collect/item`,
    { params }
  )
}
// 收藏店铺
export const addCollectionStore = (distributor_id) => {
  return req.post(`/api/h5app/wxapp/member/collect/distribution/${distributor_id}`)
}
// 取消收藏店铺
export const removeCollectionStore = (distributor_id) => {
  return req.delete(`/api/h5app/wxapp/member/collect/distribution?distributor_id=${distributor_id}`)
}

// 获取店铺收藏列表
export const getCollectionStoreList = (params) => {
  return req.get(`/api/h5app/wxapp/member/collect/distribution`, params)
}

// 获取收藏列表
export const getCollectionList = (params) => {
  return req.get(`/api/h5app/wxapp/member/collect/item`, params)
}
// 是否收藏店铺
export const showStoreIcon = (id) => {
  return req.get(`/api/h5app/wxapp/member/collect/distribution/check?distributor_id=${id}`)
}


// 获取vip列表
export const getVipgradesNewlist = (params) => {
  return req.get(`/api/h5app/wxapp/vipgrades/newlist`, params)
}
export const vipgradesBuy = (params) => {
  return req.post('/api/h5app/wxapp/vipgrades/buy', params, { withAuth: true })
}
// 获取积分列表
export const getPointMember = (params) => {
  return req.get(`/api/h5app/wxapp/point/member`, params)
}
export const getPointMemberInfo = (params) => {
  return req.get(`/api/h5app/wxapp/point/member/info`, params)
}


export const getTradeOrderDetail = ( params ) => {
  return req.get( `/api/h5app/wxapp/trade/detail`, params )
}

//获取浏览记录
export const getHistoryList = (params) => {
  return req.get(`/api/h5app/wxapp/member/browse/history/list`, params)
}

//存浏览记录
export const postHistorySave = (params) => {
  return req.post(`/api/h5app/wxapp/member/browse/history/save`, params)
}

//获取自提点列表
export const pickuplocation = (params) => {
  return req.get(`/api/h5app/wxapp/distributor/pickuplocation`, params)
}

//获取自提点列表
export const ziticode = (params) => {
  return req.get(`/api/h5app/wxapp/ziticode`, params)
}
