import Message from './service'

export default {
  install (Vue) {
    if (Vue.prototype.$Message) return
    Vue.prototype.$Message = Message
  }
}
