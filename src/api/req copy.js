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

function reqErr(res, msg = '') {
  const { data } = res.data || {}
  msg = data.msg || data.err_msg || msg
  const err = new Error(msg)
  err.res = res

  return err
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

function resolveGatewayParams(method, format = 'json', v = 'v1') {
  let url = ''
  if (method.indexOf('http') >= 0) {
    method = method.replace(process.env.VUE_APP_API_BASE_URL, '')
    url = method.slice(0, method.lastIndexOf('/'))
    method = method.replace(url, '')
  }

  method = method.match(/^\/?([^/?&]+)/)[1]
  return {
    url,
    params: {
      method,
      format,
      v
    }
  }
}

function resolveGetMethod(inst) {
  const origGetMethod = inst.get

  inst.get = function(url, params, config = {}) {
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

function createAxios(inst) {
  inst = inst || axios.create()
  inst.defaults.timeout = process.env.NODE_ENV === 'production' ? 10000 : 30 * 1000
  inst.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || '/'
  inst.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  inst.interceptors.request.use((config) => {
    const isGetMethod = config.method === 'get'
    // const sign = createSign(params, config.params, config.data)
    const showError = config.showError === undefined ? true : config.showError
    // const token = $nuxt.$store.state.user.token

    // let token = process.client ? S.getAuthToken() : S.get( "token" );
    // console.log('req token0:')
    // let token, companyid;
    // if ( process.env.VUE_APP_SAAS == 'true' ) {

    // } else {
    //   token = store.getters.token
    //   companyid = process.env.VUE_APP_COMPANYID
    // }
    // console.log('req token2:', token)

    const company_id =
      process.env.VUE_APP_SAAS == 'true'
        ? S.get('COMPANY_ID')
          ? S.get('COMPANY_ID')
          : getDomain()
        : process.env.VUE_APP_COMPANYID
    console.log(`company_id is: ${company_id}`)

    if (isGetMethod) {
      config.params = {
        ...config.params,
        company_id
      }
      // config.headers.common["Authorization"] = "Bearer " + token;
    } else {
      config.data = {
        ...config.data,
        company_id
      }
      // config.headers.common["Authorization"] = "Bearer " + token;
    }

    if (process.client) {
      console.log(`client token:`, $nuxt.$store.getters.token)
      console.log(`client token2:`, $nuxt.$cookies.get('ECSHOPEX_TOKEN'))
      config.headers.common['Authorization'] = 'Bearer ' + $nuxt.$store.getters.token
    } else {
      // console.log(`server token:`, S.getAuthToken())
      // config.headers.common['Authorization'] = 'Bearer ' + S.getAuthToken()
    }

    config.showError = showError

    config.transformRequest = [
      function(data, headers) {
        return qs.stringify(data)
      }
    ]
    return config
  })

  inst.interceptors.response.use(
    (res) => {
      const {
        data,
        status,
        config: { showError }
      } = res
      if (process.server) {
        const req = res.request
        console.log(`server request: [${req.method}] ${req.res.responseUrl}`)
      }
      // console.log('status:', status)
      if (status === 200) {
        if (data.data) {
          return data.data
        } else {
          return Promise.reject(data)
        }
      }
      return Promise.reject(reqErr(res))
    },
    (err) => {
      switch (err.response.status) {
        case 401:
          if (process.client) {
            window.location.href = `/auth/login?redirectUrl=${$nuxt.$route.fullPath}`
          }
          break
        default:
          errorToast(err.response.data)
          break
      }
      return Promise.reject(err.response)
    }
  )

  resolveGetMethod(inst)
  return inst
}

export default createAxios()

export { createAxios }
