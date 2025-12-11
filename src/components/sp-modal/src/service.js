/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Modal from './confirm'

let modalInstance

function getModalInstance(render = undefined) {
  modalInstance =
    modalInstance ||
    Modal.newInstance({
      closable: false,
      maskClosable: false,
      showFooter: false,
      showHeader: false,
      confirm: true,
      render: render
    })

  return modalInstance
}

function confirm(options) {
  const render = 'render' in options ? options.render : undefined
  let instance = getModalInstance(render)

  options.onRemove = function() {
    modalInstance = null
  }

  instance.show(options)
}

Modal.confirm = function(props = {}) {
  return confirm(props)
}

Modal.remove = function() {
  if (!modalInstance) {
    // at loading status, remove after Cancel
    return false
  }

  const instance = getModalInstance()

  instance.remove()
}
export default Modal
