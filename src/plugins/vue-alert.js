/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import { SpAlert } from '@/components'

const AlertConstructor = Vue.extend(SpAlert)
let gAlert

function showAleft (opt) {
  let defaultOption = {
    text: '',
    loading: false,
    duration: 3000,
    type: 'default'
  }
  let option = {}
  if (typeof opt === 'string') {
    option = Object.assign(defaultOption, { text: opt })
  } else if (Object.prototype.toString.call(opt) === '[object Object]') {
    option = Object.assign(defaultOption, opt)
  }

  gAlert && gAlert.close()
  const alertDom = new AlertConstructor({
    el: document.createElement('div'),
    props: {
      // type: ''
    },
    data () {
      return {
        text: option.text,
        loading: option.loading,
        showWrap: true,
        showContent: true,
        type: option.type
      }
    }
  })
  gAlert = alertDom
  document.body.appendChild(alertDom.$el)

  alertDom.close = function () {
    this.showContent = false
    this.showWrap = false
  }

  if (!option.loading) {
    setTimeout(() => {
      alertDom.showContent = false
    }, option.duration - 1250)

    setTimeout(() => {
      alertDom.showWrap = false
    }, option.duration)
  }

  return alertDom
}

function registryAlert () {
  Vue.prototype.$alert = showAleft
}

Vue.use(registryAlert)
