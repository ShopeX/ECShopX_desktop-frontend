/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

export default function errorHandler ({ beforeNuxtRender, nuxtState}) {
  if (process.server) {
    beforeNuxtRender(({ nuxtState }) => {
      if (nuxtState.error) {
        delete nuxtState.error.path
      }
    })
  }
}