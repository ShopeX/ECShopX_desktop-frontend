/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.name === 'cart-checkout' && from.name === 'cashier') {
      next({ path: '/member/trade' })
      return
    }
    next()
  })
}
