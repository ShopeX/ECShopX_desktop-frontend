import Message from './message'

let messageInstance

function getMessageInstance (text, type) {
  messageInstance =
    messageInstance ||
    Message.newInstance({
      message: text,
      type
    })

  return messageInstance
}

function showMessage (text, type) {
  let instance = getMessageInstance(text, type)

  let options = {
    message: text,
    onRemove: function () {
      messageInstance = null
    }
  }

  instance.show(options)

  setTimeout(() => {
    instance.remove()
  }, 3000)
}

Message.warning = function (text) {
  return showMessage(text, 'warning')
}

Message.success = function (text) {
  return showMessage(text, 'success')
}

Message.error = function (text) {
  return showMessage(text, 'error')
}

export default Message
