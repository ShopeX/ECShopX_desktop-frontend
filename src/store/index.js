/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import S from '@/spx'
import { getSaaSCompanyId } from '@/utils'
import { defaultLocale } from '@/utils/language'

export const state = () => ({
  commonWgts: {},
  locale: defaultLocale,
  headerTemplate: [],
  footerTemplate: [],

  pageConfig: {
    backgroundColor: '#f4f4f4'
  },
  pageSeo: {},

  category: [],

  // 商品列表缓存信息
  itemsCache: {
    sort: '',
    pageindex: 1,
    height: 'auto'
  },
  // 订单详情缓存信息
  tradeCache: {
    keyword: '',
    pageindex: 1,
    orderType: '',
    height: 'auto'
  },
  position: {
    x: 0,
    y: 0
  }
})

export const mutations = {
  SET_LANG(state, locale) {
    // console.log('SET_LANG-----------', locale)
    state.locale = locale
  },
  fetchCommonWgts(state, payload) {
    state.commonWgts = payload
  },

  setHeaderTemplate( state, payload ) {
    state.headerTemplate = payload
  },

  setFooterTemplate( state, payload ) {
    state.footerTemplate = payload
  },

  setSeoInfo( state, payload ) {
    state.pageSeo = payload
  },

  setCategory(state, payload) {
    state.category = payload
  },

  setPageConfig(state, payload) {
    state.pageConfig = payload
  },

  savedPosition(state, payload) {
    state.position = payload
  },

  saveItemPage(state, payload) {
    state.itemsCache = {
      ...state.itemsCache,
      ...payload
    }
  },

  saveTradePage(state, payload) {
    state.tradeCache = {
      ...state.tradeCache,
      ...payload
    }
  },

  updateBodyTemplate(state, payload) {
    const { wid, data } = JSON.parse(JSON.stringify(payload))
    console.log('updateBodyTemplate:', data)
    const commonWgts = JSON.parse(JSON.stringify(state.commonWgts))
    commonWgts.bodyTemplate.forEach( wgt => {
      if ( wgt.uuid == wid ) {
        wgt.data = data
      }
    } )
// console.log(commonWgts)
    state.commonWgts = {
      ...JSON.parse(JSON.stringify(commonWgts))
    }
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app, req }) {
    // if (process.env.VUE_APP_SAAS == 'true') {
    //   const { host } = req.headers
    //   const companyid = getSaaSCompanyId(host)
    //   app.$cookies.set('ECSHOPEX_COMPANYID', companyid)
    // }

    // const reg = new RegExp("(^| )auth_token=([^;]*)(;|$)");

    // try{
    //   S.set("COMPANY_ID",host.split('.')[0].replace(/[^0-9]/ig,""));
    // }catch(err){
    //   console.log(err)
    // }
    try {
      // const token = unescape(cookie.match(reg)[2]);
      // console.log("[token]:", token);
      // S.set("token", token);

      // const token = app.$cookies.get('ECSHOPX_TOKEN')
      // commit('user/setToken', token)
    } catch (e) {
      // console.error(e)
    }
    // const [headerTemplate, bodyTemplate, footerTemplate, seoInfo] = await Promise.all([
    //   app.$api.theme.getHeaderOrFooter({
    //     page_name: 'header'
    //   }),
    //   app.$api.theme.getTemplateContent(),
    //   app.$api.theme.getHeaderOrFooter({
    //     page_name: 'footer'
    //   } ),
    //   app.$api.global.getGlobalTdk()
    // ] )
    // console.log('promise ending...')
    // commit('setSeoInfo', seoInfo)

    // const _bodyTemplate = []
    // bodyTemplate.forEach((item) => {
    //   const config = JSON.parse(item.config)
    //   if (config.type != 'W0000') {
    //     _bodyTemplate.push(config)
    //   } else {
    //     commit('setPageConfig', config)
    //   }
    // })

    // console.log("_bodyTemplate:", _bodyTemplate);

    // const _headerTemplate = {
    //   params: '[]'
    // }
    // if (typeof headerTemplate.params != 'undefined') {
    //   _headerTemplate.params = headerTemplate.params
    // }

    // const _footerTemplate = {
    //   params: '[]'
    // }
    // if (typeof footerTemplate.params != 'undefined') {
    //   _footerTemplate.params = footerTemplate.params
    // }

    // commit( 'setHeaderTemplate', headerTemplate )

    // commit('setFooterTemplate', footerTemplate)

    // const commonWgts = {
    //   headerTemplate: _headerTemplate,
    //   bodyTemplate: _bodyTemplate,
    //   footerTemplate: _footerTemplate
    // }

    // commit('fetchCommonWgts', commonWgts)
  },

  async initStore({ state, commit, dispatch }) {
    if (state.user.token) {
      // await dispatch("cart/getCartCount");
      // await dispatch("user/getUserInfo");
    }

    // if (S.getAuthToken()) {
    //   commit('user/initUserInfo')
    //   await dispatch('user/getUserInfo')
    //   dispatch('cart/getCartInfo')
    // } else {
    //   commit('user/getUserSessionId')
    //   dispatch('cart/getCartInfo')
    // }
  }
}

export const getters = {
  token: (state) => state.user.token
}
