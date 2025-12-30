/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

/*
 * @Author: your name
 * @Date: 2021-02-23 17:53:01
 * @LastEditTime: 2021-02-24 11:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/src/api/pointitem.js
 */

import req from './req'

export function getTemplateConfig(params) {
  return req.get('/api/h5app/wxapp/pointsmall/setting', params)
}

export function getCategory(params) {
  return req.get('/api/h5app/wxapp/pointsmall/goods/category', params)
}
