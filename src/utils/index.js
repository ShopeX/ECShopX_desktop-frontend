/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import qs from 'qs'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { get, pickBy as _pickBy } from 'lodash'
import log from './log'
import gstore from './storeage'
import validate from './validate'

const isPrimitiveType = (val, type) => Object.prototype.toString.call(val) === type

export function isFunction(val) {
  return isPrimitiveType(val, '[object Function]')
}

export function isNumber(val) {
  return isPrimitiveType(val, '[object Number]')
}

export function isObject(val) {
  return isPrimitiveType(val, '[object Object]')
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isString(val) {
  return typeof val === 'string'
}

export function normalizeArray(...args) {
  return args.reduce((ret, item) => ret.concat(item), [])
}

export function getCurrentRoute(router) {
  const { path, params: origParams } = router
  const params = _pickBy(origParams, (val) => val !== '')

  const fullPath = `${path}${Object.keys(params).length > 0 ? '?' + qs.stringify(params) : ''}`

  return {
    path,
    fullPath,
    params
  }
}

export function normalizeQuerys(params = {}) {
  const { scene, ...rest } = params
  const queryStr = decodeURIComponent(scene)

  const ret = {
    ...rest,
    ...qs.parse(queryStr)
  }

  return ret
}

export function pickBy(arr, keyMaps = {}) {
  const picker = (item) => {
    const ret = {}
    Object.keys(keyMaps).forEach((key) => {
      const val = keyMaps[key]
      if (isString(val)) {
        ret[key] = get(item, val)
      } else if (isFunction(val)) {
        ret[key] = val(item)
      } else {
        ret[key] = val
      }
    })

    return ret
  }

  if (isArray(arr)) {
    return arr.map(picker)
  } else {
    return picker(arr)
  }
}

export function resolvePath(baseUrl, params = {}) {
  const queryStr = typeof params === 'string' ? params : qs.stringify(params)

  return `${baseUrl}${baseUrl.indexOf('?') >= 0 ? '&' : '?'}${queryStr}`
}

export function formatTime(time, formatter = 'YYYY-MM-DD') {
  return moment(time).format(formatter)
}

export function formatDataTime(time, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(formatter)
}

export function copyText(text, msg = '内容已复制', errMsg = '复制失败，请选择文字手工复制') {
  return new Promise((resolve, reject) => {
    if (copy(text)) {
      resolve(text)
    } else {
      reject(new Error(errMsg))
    }
  })
}

export function importAll(r, fn = (key, r) => r(key)) {
  r.keys().forEach((key) => fn(key, r))
}

export function goToPage(page) {
  // eslint-disable-next-line
  const loc = location
  page = page.replace(/^\//, '')
  const url = `${loc.protocol}//${loc.host}/${page}`
  loc.href = url
}

export function maskMobile(mobile) {
  return mobile.replace(/^(\d{3})(\d+)(\d{4}$)/, '$1****$3')
}

export function isNativeBrower() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') < 0
}

export function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

export async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function resolveLazyLoadImg(str) {
  return str.replace(/(<img.*?)\s+src=([^>]+>)/gi, '$1 data-src=$2')
}

export function resolveImgPath(url, size) {
  let regExp = /(\.(\w+)\?)|(\.(\w+)$)/
  if (url) {
    let matches = url.match(regExp)
    if (matches && size) {
      if (url.indexOf('http') >= 0) {
        return `${url}_${size}`
      } else {
        return `${location.protocol}//${location.host}${url}_${size}${matches[0]}`
      }
    }
  }
  return ''
}

// 判断参数是否是其中之一
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

export function cleanParams(params) {
  return _pickBy(params, (v) =>
    Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== ''
  )
}

export function replaceUrl(url) {
  const baseurl = process.env.VUE_APP_HOST
  return url.replace(baseurl, '')
}

// 价格千分位分割
export function formatPrice(price) {
  return Number(price)
    .toFixed(2)
    .toString()
    .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
// 除以100以后的千分符
export function formatPriceToHundred(price) {
  if (price) {
    return (Number(price) / 100)
      .toFixed(2)
      .toString()
      .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  } else {
    return 0
  }
}

export function parseTime(time, cFormat) {
  console.log('----parseTime---', time)
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function calcTimer(totalSec) {
  let remainingSec = totalSec
  const dd = Math.floor(totalSec / 24 / 3600)
  remainingSec -= dd * 3600 * 24
  const hh = Math.floor(remainingSec / 3600)
  remainingSec -= hh * 3600
  const mm = Math.floor(remainingSec / 60)
  remainingSec -= mm * 60
  const ss = Math.floor(remainingSec)

  return {
    dd,
    hh,
    mm,
    ss
  }
}

export function CreateID () {
  return ''
}

// saas通过域名获取companyid
export function getSaaSCompanyId(host) {
  // const reg = new RegExp(`${process.env.VUE_APP_SAAS_MATCH_REGULAR}`)
  // if (reg.test(host)) {
  //   const companyid = host.split('.')[0]
  //   return companyid
  // } else {
  //   return
  // }
  return ''
}

/**
 * 验证是否有值
 * @param {*} value
 */
export function hasValue(value) {
  return value !== null && value !== undefined && value !== ''
}

export { log, gstore, validate }