/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */


import { importAll } from '@/utils'

const widgets = {}
importAll(require.context('./', true, /\.vue$/), (key, r) => {
  const wgt = r(key).default
  const name = wgt.name || /\.\/([^/]+)\//.exec(key)[1]
  widgets[name] = wgt
})

export default widgets
