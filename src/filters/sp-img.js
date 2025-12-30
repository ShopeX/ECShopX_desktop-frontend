/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export default {
  name: 'SpImg',

  filter (value, size, defaultUrl = '') {
    if (!value) return defaultUrl

    const regExp = /(\.(\w+)\?)|(\.(\w+)$)/
    const matches = value.match(regExp)
    if (matches) {
      return `${value}_${size}${matches[0]}`
    }
    return value
  }
}
