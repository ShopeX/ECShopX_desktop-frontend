/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { startLoading, stopLoading } from './service'

const directive = {
  name: 'loading',

  bind(el, binding, vnode) {
    if (binding.value) {
      startLoading({
        ...binding.modifiers,
        target: el
      })
    }
  },

  update(el, { modifiers, value, oldValue }) {
    const params = { ...modifiers, target: el }
    if (value !== oldValue) {
      value ? startLoading(params) : stopLoading(params)
    }
  },

  unbind(el, binding) {
    const params = { ...binding.modifiers, target: el }
    stopLoading(params)
  }
}

export default directive
