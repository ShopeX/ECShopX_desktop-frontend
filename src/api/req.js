/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import S from '@/spx'
import createSign from './sign'
import state from '@/store'
import { getSaaSCompanyId } from '@/utils'

function reqErr(res, msg = '') {
  const { data } = res.data || {}
  msg = data.msg || data.err_msg || msg
  const err = new Error(msg)
  err.res = res

  return err
}

const setCountryCode = (config) => {
  // 添加多语言 country_code 字段
  let country_code = 'zh-CN'

  try {
    let locale

    if (process.client) {
      // 客户端：从 nuxti18n 获取当前语言
      if (window.$nuxt && window.$nuxt.$i18n) {
        locale = window.$nuxt.$i18n.locale
      } else if (window.__NUXT__ && window.__NUXT__.state && window.__NUXT__.state.i18n) {
        locale = window.__NUXT__.state.i18n.locale
      }
    } else if (process.server) {
      // 服务端：从 CreateAxios.content 中的 app 对象获取语言信息
      if (CreateAxios.content && CreateAxios.content.app && CreateAxios.content.app.i18n) {
        locale = CreateAxios.content.app.i18n.locale
      } else if (CreateAxios.content && CreateAxios.content.store && CreateAxios.content.store.state.locale) {
        // 从 Vuex store 获取语言信息
        locale = CreateAxios.content.store.state.locale
      }
    }

    // 根据语言设置 country_code
    if (locale === 'en') {
      country_code = 'en-CN'
    } else {
      country_code = 'zh-CN'
    }
  } catch (e) {
    console.warn('Failed to get locale, using default zh-CN:', e)
    country_code = 'zh-CN'
  }
  // console.log('country_code:', country_code)
  return {
    ...config,
    country_code
  }
}
function getDomain() {
  let id
  try {
    const origin = window.location.origin
    const firstDot = origin.split('.')[0]
    const domain = firstDot.split('//')[1]
    id = domain.replace(/[^0-9]/gi, '')
  } catch {
    id = process.env.VUE_APP_COMPANYID
  }
  return id
}

function resolveGetMethod(inst) {
  const origGetMethod = inst.get

  inst.get = function (url, params, config = {}) {
    config = {
      params,
      ...config
    }
    return origGetMethod(url, config)
  }
}

function errorToast(data) {
  if (process.client) {
    const errMsg = data.msg || (data.error && data.error.message) || '操作失败'
    Vue.prototype.$Message.error(errMsg)
  }
}

function errorMessage(message) {
  if (process.client) {
    Vue.prototype.$Message.error(message)
  }
}

class CreateAxios {
  constructor() {
    this.created()
    return this.inst
  }

  created() {
    this.inst = axios.create()
    this.inst.defaults.timeout = process.env.NODE_ENV === 'production' ? 10000 : 30 * 1000
    this.inst.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || '/'
    this.inst.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    this.inst.interceptors.request.use((config) => {
      const isGetMethod = config.method === 'get'
      const showError = config.showError === undefined ? true : config.showError
      let token, companyid

      if (process.client) {
        const { app } = CreateAxios.content
        // 判断是否是商家入驻
        token = config.url.indexOf('/merchant/') == -1 ? app.$cookies.get('ECSHOPX_TOKEN') : app.$cookies.get('ECSHOPX_STORE_TOKEN');
        if (process.env.VUE_APP_SAAS != 'true') {
          companyid = process.env.VUE_APP_COMPANYID
        }
        // companyid =
        //   process.env.VUE_APP_SAAS == 'true'
        //     ? $nuxt.$cookies.get('ECSHOPEX_COMPANYID')
        //     : process.env.VUE_APP_COMPANYID
      } else {
        const { app, req } = CreateAxios.content
        // 判断是否是商家入驻
        token = config.url.indexOf('/merchant/') == -1 ? app.$cookies.get('ECSHOPX_TOKEN') : app.$cookies.get('ECSHOPX_STORE_TOKEN');
        if (process.env.VUE_APP_SAAS != 'true') {
          companyid = process.env.VUE_APP_COMPANYID
        } else {
          const { host } = req.headers
          config.headers['origin'] = host
        }
      }
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
      }
      if (isGetMethod) {
        if (config.url != '/api/h5app/wxapp/trade/payment/alipay/result') {
          config.params = {
            ...config.params,
            company_id: companyid
          }
        } else {
          config.params = {
            ...config.params
          }
        }
        config.params = setCountryCode(config.params)
      } else {
        config.data = {
          ...config.data,
          company_id: companyid
        }
        config.data = setCountryCode(config.data)
      }

      config.showError = showError

      config.transformRequest = [
        function (data, headers) {
          return qs.stringify(data)
        }
      ]

      // console.log('interceptors.request 2:', config)
      return config
    })

    this.inst.interceptors.response.use(
      (res) => {
        const {
          data,
          status,
          config: { showError }
        } = res
        // console.log('interceptors:', status)
        if (process.server) {
          const req = res.request
          // console.log(`server request: [${req.method}] ${req.res.responseUrl}`)
        }
        // console.log('status:', status)
        if (status === 200) {
          if (data.data) {
            const { status_code, message } = data.data
            if (status_code && status_code > 300) {
              errorMessage(message)
              return Promise.reject(message)
            }
            return data.data
          } else {
            const { status_code, message } = data
            if (status_code && status_code > 300) {
              errorMessage(message)
              return Promise.reject(message)
            }
            return Promise.reject(data)
          }
        }
        return Promise.reject(reqErr(res))
      },
      (err) => {
        // console.log( 'xxx:', err )
        // console.log(`server request error: [${req.method}] ${req.res.responseUrl}`)
        switch (err.response.status) {
          case 401:
            // if ( process.client ) {
            const { app } = CreateAxios.content
            app.$cookies.remove('ECSHOPX_TOKEN')
            S.logout()
            window.location.href = `/auth/login?redirectUrl=${$nuxt.$route.fullPath}`
            // }
            break
          default:
            errorToast(err.response.data)
            break
        }
        if (err.response.status >= 500) {
          return Promise.reject(err.response)
        } else {
          return Promise.reject()
        }
      }
    )
    resolveGetMethod(this.inst)
    return this.inst
  }

  static init(content) {
    CreateAxios.content = content
  }

  static getInstance() {
    if (!CreateAxios.instance) {
      CreateAxios.instance = new CreateAxios()
    }
    return CreateAxios.instance
  }
}

const req = CreateAxios.getInstance()

export default req

export { CreateAxios }
