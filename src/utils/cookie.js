/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

class Cookie {
  constructor() {
    this.expire = 30
  }

  setCookie( name, value ) {
    const exp = new Date();
    exp.setTime( exp.getTime() + this.expire * 24 * 60 * 60 * 1000 );
    document.cookie =  `${name}=${escape(value)};expires=${exp.toGMTString()}`
  }

  getCookie( name ) {
    let arr = ''
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ( ( arr = document.cookie.match( reg ) ) ) {
      return unescape( arr[2] );
    }
    else {
      return null;
    }
  }

  deleteCookie( name ) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

  /**
   * 获取 Cookie 授权状态
   * @returns {string|null} 'true' | 'false' | null
   */
  getCookieConsent() {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null
    }
    return window.localStorage.getItem('cookie_consent_authorized')
  }

  /**
   * 设置 Cookie 授权状态
   * @param {boolean} value - 授权状态
   */
  setCookieConsent(value) {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }
    window.localStorage.setItem('cookie_consent_authorized', String(value))
  }

  /**
   * 检查是否已授权 Cookie
   * @returns {boolean}
   */
  hasCookieConsent() {
    const consent = this.getCookieConsent()
    return consent === 'true'
  }
}

const cookie = new Cookie()

export default cookie;
