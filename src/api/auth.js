/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import req from './req'

export function login (params = {}) {
  return req.post("/api/h5app/wxapp/login", params, { showError: false });
}

export function logout () {
  return req.post('/user.logout', null, { withAuth: true })
}

export function login_moblie (data) {
  return req.post('/user.mobile.login', data)
}

export function reg (data) {
  return req.post('/api/h5app/wxapp/member', data)
}

export function bindwechat (data) {
  return req.post('/api/h5app/wxapp/member/bind', data)
}

export function regImg (params = {}) {
  return req.get('/api/h5app/wxapp/member/image/code', params)
}

export function regAccountVerify (params = {}, config) {
  return req.get('/user.account.verify', params, config)
}

export function regSmsCode (params = {}) {
  return req.get('/api/h5app/wxapp/member/sms/code', params)
}

export function bindSignupUser (params = {}) {
  return req.get('/user.trustlogin.bindSignupUser', params)
}

export function bindExistsUser (params = {}) {
  return req.get('/user.trustlogin.bindExistsUser', params)
}

export function regAccount (params = {}, config) {
  return req.get('/user.check.account', params, config)
}

export function modifyPassword (params = {}, config) {
  return req.post('/api/h5app/wxapp/member/reset/password', params, config)
}

// 获取注册参数
export function getRegisterParam () {
  return req.get('/api/h5app/wxapp/member/setting')
}

export function verifyVcode (params = {}, config) {
  return req.post('/user.account.verify.code', params, config)
}

export function regEmail (params = {}) {
  return req.get('/user.account.send.email', params)
}

export function bindWechatPhone(params={}){
  return req.post('/api/h5app/wxapp/member/bind',params)
}

// 协议信息获取
export function getRuleInfo (params = {}) {
  return req.get('/api/h5app/wxapp/shops/protocol', params)
}