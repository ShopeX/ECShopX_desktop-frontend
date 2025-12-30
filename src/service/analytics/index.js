/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import actions from './actions'

function enable (target, name, descriptor) {
  if (process.env.VUE_APP_ANALYTICS) {
    return descriptor
  }

  descriptor.value = function (type, payload) {
    if (process.env.VUE_APP_ANALYTICS_DEBUG) {
      console.info(`[analytics ${name}]:  type: ${type}, payload:`, payload)
    }
  }
  return descriptor
}

class Analytics {
  constructor (options = {}) {
    this.options = options
  }

  @enable
  pageReady (params) {
    let visitor = this.getVisitor()
    this.track({
      ...params,
      visitor
    })
  }

  @enable
  errorPage (code) {
    let page = {
      pageType: 'error',
      errorCode: code
    }
    let visitor = this.getVisitor()
    this.track({
      page,
      visitor
    })
  }

  @enable
  getVisitor () {
    // eslint-disable-next-line no-undef
    const { userInfo } = $nuxt.$store.state.user
    if (userInfo) {
      return {
        customerID: userInfo.userId,
        isRewardsMember: userInfo.grade_id,
        login_type: userInfo.login_type,
        isLoggedIn: !!userInfo
      }
    } else {
      return {
        customerID: null,
        isRewardsMember: false,
        login_type: null,
        isLoggedIn: false
      }
    }
  }

  @enable
  track (params) {
    adobe.track(params)
  }

  @enable
  event (params, evtName) {
    adobe.event(params, evtName)
  }

  @enable
  dispatch (type, payload) {
    const fn = actions[type]
    if (fn) {
      this.event(fn(payload), type)
    } else {
      console.error(`no such events: ${type}`)
    }
  }
}

export default new Analytics()
