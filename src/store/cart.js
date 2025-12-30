/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import S from '@/spx'

const DEFAULT_USER_ID = -1

function resolveUser(userState) {
  const { userInfo, sessionId: sid } = userState
  const user_id = userInfo ? userInfo.userId : DEFAULT_USER_ID

  return {
    user_id,
    sid
  }
}

function resolveSku(info) {
  info.color = info.spec_info.color
  info.size = info.spec_info.size
  info.promotions = info.goodspromotion ? [info.goodspromotion] : []
}

function checkLogin() {
  // 干掉离线购物车功能
  const auth_token = S.getAuthToken()
  // let pathname=window.location.pathname;
  if (!auth_token) {
    this.$router.push(`/auth/login`)
  } else {
    // this.$router.push('/cart')
  }
  return !!auth_token
}

export const state = () => ({
  cartInfo: null,
  sessionId: null,
  cartCount: 0
})

export const mutations = {
  SET_CART_INFO(state, payload) {
    state.cartInfo = payload
  },
  setCartCount(state, payload) {
    state.cartCount = payload
  }
}

export const actions = {
  // async getCartInfo ({ commit }) {
  //   const info = await this.$api.cart.cartList()
  //   commit('setCartInfo', info)
  // },
  async CART_GETINFO({ commit }) {
    const info = await this.$api.cart.cartList()
    commit('SET_CART_INFO', info)
  },
  async CART_ADD( { commit }, params ) {
    const { quantity = 1, ..._params } = params
    const info = await this.$api.cart.add(
      {
        mode: 'cart',
        ..._params,
      },
      quantity
    )
    commit('SET_CART_INFO', info)
    return info
  },
  async addCart({ dispatch, commit, rootState }, params) {
    const { quantity = 1, ..._params } = params
    const info = await this.$api.cart.add(
      {
        mode: 'cart',
        ..._params,
        ...resolveUser(rootState.user)
      },
      quantity
    )
    return info
  },
  async addGift({ dispatch, commit, rootState }, params) {
    const { rel_promotion_id, sku_id, gift_num: quantity, needsRefresh } = params

    await this.$api.cart.addGift({
      rel_promotion_id,
      sku_id,
      quantity,
      ...resolveUser(rootState.user)
    })
    if (needsRefresh || needsRefresh === undefined) {
      dispatch('getCartInfo')
    }
  },
  async updateCart({ dispatch, commit, rootState }, params) {
    const info = await this.$api.cart.update({
      cart_params: JSON.stringify(params),
      ...resolveUser(rootState.user)
    })

    commit('setCartInfo', info)
  },
  async delCartInfo({ dispatch, commit, rootState }, { cart_id, needsRefresh }) {
    await this.$api.cart.del({
      cart_id,
      ...resolveUser(rootState.user)
    })

    if (needsRefresh || needsRefresh === undefined) {
      dispatch('getCartInfo')
    }
  },
  async getCartCount({ commit }) {
    const param = { shop_type: 'distributor' }
    const { item_count } = await this.$api.cart.getCartCount(param)
    commit('setCartCount', item_count)
  }
}
