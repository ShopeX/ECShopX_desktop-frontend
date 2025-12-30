/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import api, { CreateAxios, req } from '@/api'

export default (content, inject) => {
  CreateAxios.init(content)

  inject('http', req)
  inject('api', api)
}
