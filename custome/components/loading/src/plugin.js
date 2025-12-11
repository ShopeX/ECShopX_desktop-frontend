import { startLoading } from './service'

const Loading = function (params = {}) {
  params.fullscreen = true
  return startLoading(params)
}

export default {
  install (Vue) {
    if (Vue.prototype.$loading) return
    Vue.prototype.$loading = Loading
  }
}
