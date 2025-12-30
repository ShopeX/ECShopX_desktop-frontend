/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import VueMq from 'vue-mq'

if (process.client) {
  require('matchmedia-polyfill')
  require('matchmedia-polyfill/matchMedia.addListener')
}

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 769,
    md: 993,
    lg: Infinity
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})
