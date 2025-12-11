/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { SOURCE, POST_SOURCE } from './util'

export default class PostMessage {
  constructor(postUrl) {
    this.url = postUrl
    this._$parent = window.parent
  }
  post({ action, payload }) {
    window?.parent?.postMessage(
      {
        source: SOURCE,
        payload: payload,
        action
      },
      this.url
    )
  }
  onMessage(fallback) {
    window.addEventListener('message', (event) => {
      // 确保消息来源是可信的
      // if (event.origin !== this.url) return
      if (event.data.source == POST_SOURCE) {
        fallback && fallback(event.data)
      }
    })
  }
  removeMessage() {
    window.removeEventListener('message')
  }
}
