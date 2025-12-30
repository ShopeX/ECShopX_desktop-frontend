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
}

const cookie = new Cookie()

export default cookie;