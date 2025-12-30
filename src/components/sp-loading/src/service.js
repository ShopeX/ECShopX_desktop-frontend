/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import wdLoading from './index.vue'
import { addClass, removeClass } from '@/utils/dom'

const LoadingCtsr = Vue.extend(wdLoading)
const loadingsMap = new WeakMap()
const LOADING_PARENT_CLASS = 'sp-loading__parent'

export const getLoadingParent = function({ target, fullscreen }) {
  const doc = global.document
  const body = doc.body
  if (fullscreen) return body
  return typeof target === 'string' ? doc.querySelector(target) : target
}

export const startLoading = function(options = {}) {
  const { target, ...propsData } = options
  let parent = getLoadingParent(options)

  let vm = loadingsMap.get(parent)
  if (vm) return vm

  addClass(parent, LOADING_PARENT_CLASS)
  Object.assign(propsData, {
    mask: true,
    onClose() {
      removeClass(parent, LOADING_PARENT_CLASS)
      loadingsMap.delete(parent)
      parent = null
      this.$destroy()
      // this.$el.remove()
    }
  })

  // 确保在创建实例时 i18n 已经可用
  const createLoadingInstance = () => {
    vm = new LoadingCtsr({
      propsData
    }).$mount()
    loadingsMap.set(parent, vm)
    parent.appendChild(vm.$el)
    return vm
  }

  // 如果是在客户端且 Vue 实例已经有 i18n，直接创建
  if (typeof window !== 'undefined' && Vue.prototype.$i18n) {
    return createLoadingInstance()
  }

  // 否则等待下一个 tick 再创建，确保 i18n 已经初始化
  return new Promise((resolve) => {
    Vue.nextTick(() => {
      const instance = createLoadingInstance()
      resolve(instance)
    })
  })
}

export const hasLoading = function(options) {
  return loadingsMap.has(options)
}

export const stopLoading = function(options) {
  const el = getLoadingParent(options)
  const loading = loadingsMap.get(el)
  if (!loading) return

  loading.close()
}
