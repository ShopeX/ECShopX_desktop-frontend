/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from "vue";
// import { gstore } from '@/utils'
import cookie from "@/utils/cookie";
import api from "@/api";
// import store from '@/store'
import Router from "vue-router";

const globalData = {};
const AUTH_TOKEN = "auth_token";
const USER_SESSION_ID = "user_session_id";
const USER_INFO = "userinfo";

// const AUTH_TOKEN_EXPIRED = 'auth_token_expired'

class Spx {
  constructor(options = {}) {
    this.hooks = [];
    this.options = {
      autoRefreshToken: true,
      ...options
    };
    this.store = null;
    this.api = null;
    this.router = null;

    if (this.options.autoRefreshToken) {
      this.startRefreshToken();
    }
  }

  getAuthToken() {
    // const authToken = gstore.get( AUTH_TOKEN )
    // const authToken = cookie.getCookie(AUTH_TOKEN);
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return authToken;
  }

  setAuthToken(accessToken) {
    // cookie.setCookie(AUTH_TOKEN, accessToken);
    $nuxt.$store.commit("user/setToken", accessToken);
    localStorage.setItem(AUTH_TOKEN, accessToken);
    // gstore.set(AUTH_TOKEN, accessToken, new Date().getTime() + 24 * 3600 * 1000)
  }

  async getUserInfo() {
    const res = await api.member.memberInfo();
    $nuxt.$store.commit("user/setUserInfo", res);
  }

  // bind (name, fn) {
  //   const fns = this.hooks[name] || []
  //   fns.push(fn)
  //   this.hooks[name] = fns
  // }

  // unbind (name, fn) {
  //   const fns = this.hooks[name]
  //   if (!fns) return

  //   // remove(fns, fn)
  // }

  // async trigger (name, v) {
  //   this[name] = v
  // }
  get(key) {
    return globalData[key];
  }

  set(key, val) {
    globalData[key] = val;
  }

  startRefreshToken() {}

  logout(params = {}) {
    // $nuxt.$store.commit("user/resetInfo");

    // $nuxt.$router.push( "/" );
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = '/'
  }

  logoutShop(params = {}) {
    // $nuxt.$store.commit("user/resetInfo");

    // $nuxt.$router.push( "/" );

    sessionStorage.removeItem('ECSHOPX_STORE_TOKEN');
    window.location.href = '/shop'
  }
}

export default new Spx();
