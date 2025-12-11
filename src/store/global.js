/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import store from 'store'

export const state = () => ({
  pageSeo: {}
})

export const mutations = {
  setPageSeo(state, payload) {
    state.pageSeo = payload
  }
}

export const actions = {
  // 获取用户信息
  async getGlobalSeo({ commit }) {
    const message = await this.$api.global.getGlobalTdk()
    commit('setPageSeo', message)
  }
}
