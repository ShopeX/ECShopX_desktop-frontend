/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

/*
 * @Author: your name
 * @Date: 2021-01-07 14:06:09
 * @LastEditTime: 2021-02-24 17:38:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/api/item.js
 */
import req from './req'

/**
 * 商品列表
 */
export function list(params = {}) {
  return req.get('/api/h5app/wxapp/goods/items', {
    ...params
  })
}
/**
 * 积分商城
 */

export function pointsmallList(params = {}) {
  return req.get('/api/h5app/wxapp/pointsmall/goods/items', {
    ...params
  })
}

export function pointsmallDetail(item_id, params = {}) {
  return req.get(`/api/h5app/wxapp/pointsmall/goods/items/${item_id}`, {
    ...params
  })
}

export function getGuessLikeGoods(params = {}) {
  return req.get(`/api/h5app/wxapp/pointsmall/lovely/goods/items`, {
    ...params
  })
}

/**
 * 商品分类
 */
export function category() {
  return req.get('/api/h5app/wxapp/goods/category')
}
export function getStoreClassify(params) {
  return req.get('/api/h5app/wxapp/goods/category', params)
}

export function getCategory(params) {
  return req.get('/api/h5app/wxapp/pageparams/setting', params)
}

export function detail(item_id, params = {}) {
  return req.get(
    `/api/h5app/wxapp/goods/items/${item_id}`,
    {
      ...params
    },
    { withAuth: true }
  )
}

export function desc(item_id) {
  return req.get('/item.desc', { item_id })
}

// 获取商品评价列表
export function rateList(item_id, params = {}) {
  return req.get('/item.rate.list', { ...params, item_id })
}

export function shareInfo(item_id) {
  return req.get('/item.share', { item_id })
}

export function fav(params = {}) {
  return req.get(
    `/item.fav`,
    {
      ...params
    },
    { withAuth: true }
  )
}

export function microSearch(params) {
  return req.get('/item.microSearch', params, { withAuth: true })
}

export function categoryProps(cat_id) {
  return req.get('/category.relProps', {
    cat_id
  })
}

export function recommend(params) {
  return req.get('/api/h5app/wxapp/promotions/recommendlike', params)
}

export function evaluationList(params) {
  return req.get('/api/h5app/wxapp/order/rate/list', params)
}

export function getreplyRateList(params) {
  return req.get('/api/h5app/wxapp/order/replyRate/list', params)
}

export function replyRate(params) {
  return req.post('/api/h5app/wxapp/order/replyRate', params)
}

// 获取附近商家
export function getNearbyShop (params) {
  return req.get('/api/h5app/wxapp/distributor/list', params ,{ withAuth: false })
}