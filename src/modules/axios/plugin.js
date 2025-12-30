/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import api, { req } from '@/api'

export default ({ app }, inject) => {
  inject('http', req)
  inject('api', api)
}
