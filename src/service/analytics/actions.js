/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */



export function name(params) {

}

export default {
  applyFilter (payload) {
    const { ids, name, list } = payload
    let filterOption = ''
    if (ids) {
      let arr = ids.toString().split(',')
      let names = []
      for (let item of list) {
        if (arr.indexOf(item.value.toString()) > -1) {
          names.push(item.label)
        }
      }
      filterOption = names.join(',')
    }

    return {
      filterCategory: name,
      filterOption: filterOption
    }
  },

  applySort (payload) {
    const { sortType } = payload
    return {
      sortType
    }
  },

  quickView (payload) {
    const { info } = payload
    const { item_id: id, title: name, product_type: badge, price, bn: style, woman } = info.item

    const product = [{
      id,
      name,
      badge,
      ratingAvg: '',
      ratingCount: '',
      price,
      style,
      discountAmount: '',
      discountCode: ''
    }]

    return {
      product
    }
  },
  addToWishlist (payload) {
    const { item_id: id, title: name, price, bn: style } = payload
    return {
      product: [{
        id,
        name,
        price,
        style,
        discountAmount: '',
        discountCode: ''
      }]
    }
  }
}