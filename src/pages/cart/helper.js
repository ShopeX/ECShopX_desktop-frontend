/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export const resolveSpec = (spec) => {
  const keyMap = {
    '颜色': 'color',
    '尺码': 'size'
  }
  const ret = {}
  spec.split('、').map(t => {
    Object.keys(keyMap).forEach(k => { t = t.replace(k, keyMap[k]) })
    const [key, val] = t.split('：')
    if (key && val) {
      ret[key] = val
    }
  })

  return ret
}

export const resolveCartData = (cart) => {
  let showGift = false
  let showPromotion = false
  let hasItems = false
  let giftList = []

  const coupons = []
  const list = cart.map(group => {
    const items = (group.object || []).map(t => {
      const { image_default_id, bn, cart_id, item_id, sku_id, title, sub_title, price: priceInfo, spec_info, quantity } = t
      const { color, size } = resolveSpec(spec_info)
      return {
        image_default_id,
        bn,
        title,
        sub_title,
        cart_id,
        item_id,
        sku_id,
        price: priceInfo.price,
        spec_info,
        color,
        size,
        quantity
      }
    })
    const { shop_id, shop_type, shop_name, totalItem, couponlist, promotion_info, shipping } = group

    showGift = showGift || group.promotion_info.gift.length > 0
    showPromotion = showPromotion || group.promotion_info.order.length > 0
    if (items.length > 0) {
      hasItems = true
    }

    // 优惠券
    if (couponlist) {
      couponlist.forEach(coupon => {
        const { coupon_name: label, coupon_code: value } = coupon
        coupons.push({
          label,
          value,
          ...coupon
        })
      })
    }

    if (showGift) {
      giftList = (promotion_info.gift || []).map(g => {
        const { promotion_tag, promotion_name, promotion_desc, promotion_type, promotion_id, promotion_order } = g
        let gifts = g.gift_item.map(gm => {
          const { image_default_id, bn, cart_id, item_id, sku_id, title, sub_title, price, spec_info } = gm
          const { color, size } = resolveSpec(spec_info)
          return {
            image_default_id,
            bn,
            title,
            sub_title,
            cart_id,
            item_id,
            sku_id,
            price,
            spec_info,
            color,
            size
          }
        })
        return {
          promotion_tag,
          promotion_name,
          promotion_desc,
          promotion_type,
          promotion_id,
          promotion_order,
          gifts
        }
      })
    }
    return { items, shop_id, shop_type, shop_name, totalItem, promotion_info, shipping, giftList }
  })

  coupons.push({
    label: '不使用优惠券',
    value: null
  })

  return {
    hasItems,
    list,
    coupons,
    giftList,
    showGift,
    showPromotion
  }
}
