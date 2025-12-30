/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import adobe from './aa-adobe'

class Analytics {
  constructor (options = {}) {
    this.options = {}
  }

  pageReady (params) {
    let visitor = this.getVisitor()
    this.track({
      ...params,
      visitor
    })
  }

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

  track (params) {
    // console.log('--page ready--', params)
    process.env.VUE_APP_ADOBE && adobe.track(params)
  }

  // click
  event (params, eventname) {
    // console.log('--analytics event--', params, eventname)
    process.env.VUE_APP_ADOBE && adobe.event(params, eventname)
  }
}

let analytics = new Analytics()

export { analytics }
