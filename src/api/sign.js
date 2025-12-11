/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import _sortBy from 'lodash/sortBy'

const md5 = require('md5')

export default function createSign (...args) {
  const params = args
    .reduce((obj, item) => ({ ...obj, ...item }), {})

  let sparams = _sortBy(Object.keys(params).map(k => ({
    k,
    v: params[k]
  })), 'k')

  let sign = ''
  sparams.forEach(({ v, k }) => {
    if (typeof v !== 'undefined') {
      sign += `${k}${v || ''}`
    }
  })

  return md5(md5(sign).toUpperCase() + process.env.VUE_APP_TOKEN).toUpperCase()
}
