/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import store from 'store'
// const USER_INFO = 'user_info'
const USER_SESSION_ID = 'user_session_id'
const USER_INFO = 'userinfo'

export const state = () => ({
  token: null,
  userInfo: null,
  sessionId: null
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload
  },

  setUserInfo(state, payload) {
    state.userInfo = payload
    // state.sessionId = store.get(USER_SESSION_ID)
  },
  // getUserInfo (state) {
  //   state.userInfo = store.get(USER_INFO)
  //   state.sessionId = store.get(USER_SESSION_ID)
  // },
  // clearUserInfo (state) {
  //   store.remove(USER_INFO)
  // },
  getUserSessionId(state) {
    state.sessionId = store.get(USER_SESSION_ID)
  },
  setUserSessionId(state, payload) {
    state.sessionId = payload
    store.set(USER_SESSION_ID, payload)
  },
  initUserInfo(state) {
    let userinfo = store.get(USER_INFO)
    if (userinfo) {
      state.userInfo = userinfo
    }
    // console.log('*****initUserInfo*****')
    // console.log(state)
  },

  cacheUserInfo(state) {
    store.set(USER_INFO, state.userInfo)
  },
  resetInfo(state) {
    state.userInfo = null
    store.set(USER_INFO, null)
  }
}

export const actions = {
  // 获取用户信息
  async getUserInfo({ commit }) {
    console.log('getUserInfo')
    const info = await this.$api.member.memberInfo()
    commit('setUserInfo', info)
  }
}
