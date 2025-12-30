import Vue from 'vue'
import wdLoading from './index.vue'
import { addClass, removeClass } from '@/utils/dom'

const LoadingCtsr = Vue.extend(wdLoading)
const loadingsMap = new WeakMap()
const LOADING_PARENT_CLASS = 'sp-loading__parent'

export const getLoadingParent = function ({ target, fullscreen }) {
  const doc = global.document
  const body = doc.body
  if (fullscreen) return body
  return (typeof target === 'string' ? doc.querySelector(target) : target)
}

export const startLoading = function (options = {}) {
  const { target, ...propsData } = options
  let parent = getLoadingParent(options)

  let vm = loadingsMap.get(parent)
  if (vm) return vm

  addClass(parent, LOADING_PARENT_CLASS)
  Object.assign(propsData, {
    mask: true,
    onClose () {
      removeClass(parent, LOADING_PARENT_CLASS)
      loadingsMap.delete(parent)
      parent = null
      this.$destroy()
      // this.$el.remove()
    }
  })

  vm = new LoadingCtsr({
    propsData
  }).$mount()
  loadingsMap.set(parent, vm)
  parent.appendChild(vm.$el)
  return vm
}

export const hasLoading = function (options) {
  return loadingsMap.has(options)
}

export const stopLoading = function (options) {
  const el = getLoadingParent(options)
  const loading = loadingsMap.get(el)
  if (!loading) return

  loading.close()
}
