/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

// 开源标注信息
const licenseInfo = `
╔══════════════════════════════════════════════════════════════╗
║                  ECShopX open source E-commerce              ║
║                  ECShopX 开源商城系统                        ║
╠══════════════════════════════════════════════════════════════╣
║  Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.    ║
║  Corporate Website: https://www.shopex.cn                    ║
║  Licensed under the Apache License, Version 2.0              ║
║  http://www.apache.org/licenses/LICENSE-2.0                  ║
╠══════════════════════════════════════════════════════════════╣
║  The removal of shopeX copyright information without         ║
║  authorization is prohibited.                                 ║
║  未经授权不可去除shopeX商派相关版权                           ║
╠══════════════════════════════════════════════════════════════╣
║  Author: shopeX Team <mkt@shopex.cn>                         ║
║  Contact: 400-821-3106                                       ║
╚══════════════════════════════════════════════════════════════╝
`

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// import EspierWidgetPkg from '@shopex/espier-widgets/package.json'
import Widgets from "./espier-widgets";


// import {
//   SpButton,
//   SpForm,
//   SpFormItem,
//   SpPrice,
//   SpCollapse,
//   SpModal,
//   SpModalPlugin,
//   SpLabel,
//   SpLayer,
//   SpLoading,
//   SpPagination,
//   SpSelect,
//   SpInput,
//   SpSearch,
//   SpBreadCrumb,
//   SpDpTransition,
//   SpRadioGroup,
//   SpRadio,
//   SpTimer,
//   SpNumInput,
//   SpLoadingPlugin,
//   SpLoadingDirective,
//   SpTipMessage,
//   SpItemPromo,
//   // SpMessage,
//   SpMessagePlugin,
//   SpWidget,
//   SpWidgetPanel,
//   SpGoodsRecommend,
//   SpImg,
//   SpMiniCart,
//   SpLink,
//   SpAnalytics,
//   SpFloatMenu,
//   SpFloatMenuItem,
//   SpAddressPicker
// } from '@/components'
import * as Filters from '@/filters'
import { TrackerPlugin } from '@/service'
import store from 'store'

// import 'swiper/css/swiper.css'
import plugin from './components/sp-modal/src/plugin'

// const Comps = {
//   SpButton,
//   SpForm,
//   SpFormItem,
//   SpPrice,
//   SpCollapse,
//   SpModal,
//   SpLabel,
//   SpLayer,
//   SpLoading,
//   SpPagination,
//   SpSelect,
//   SpInput,
//   SpSearch,
//   SpBreadCrumb,
//   SpDpTransition,
//   SpRadioGroup,
//   SpRadio,
//   SpTimer,
//   SpItemPromo,
//   SpNumInput,
//   SpTipMessage,
//   SpWidget,
//   SpWidgetPanel,
//   SpGoodsRecommend,
//   SpImg,
//   SpMiniCart,
//   SpLink,
//   SpAnalytics,
//   SpFloatMenu,
//   SpFloatMenuItem,
//   SpAddressPicker
// }

// const Plugins = {
//   SpLoadingPlugin,
//   SpModalPlugin,
//   SpMessagePlugin,
//   TrackerPlugin
// }

// const Directives = {
//   SpLoadingDirective
// }

const install = function(Vue, opts = {}) {
  // const paths = [
  //   "./components",
  //   "./../custome/components"
  // ]

  const components = {}
  const plugins = {}
  const directives = {}

  const baseContext = require.context('./components', true, /index(\.vue|\.js)$/)

  function resloveModule(mod) {
    Object.keys(mod).forEach((key) => {
      if (/Plugin$/.test(key)) {
        plugins[key] = mod[key]
      } else if (/Directive$/.test(key)) {
        directives[key] = mod[key]
      } else {
        mod[key].name && (components[mod[key].name] = mod[key])
      }
    })
  }

  baseContext.keys().forEach((key) => {
    const mod = baseContext(key)
    resloveModule(mod)
  })

  console.log(`Ecshopx PC template is: ${process.env.VUE_APP_TEMPLATE || 'defalut'}`)
  // console.log(`Ecshopx PC widgets version: ${EspierWidgetPkg.version}`)
  if (process.env.VUE_APP_SAAS == 'true') {
    console.log('Ecshopx PC SAAS')
  }

  if (process.env.VUE_APP_TEMPLATE) {
    const customeContext = require.context(
      './../' + process.env.VUE_APP_TEMPLATE + '/components',
      true,
      /index(\.vue|\.js)$/
    )
    customeContext.keys().forEach((key) => {
      const mod = customeContext(key)
      resloveModule(mod)
    })

    import(`@/../${process.env.VUE_APP_TEMPLATE}/style/index.scss`)
  }

  // console.log(components);
  Object.keys(components).forEach((key) => {
    const comp = components[key]
    Vue.component(comp.name, comp)
  })

  Object.keys(plugins).forEach((key) => {
    const plugin = plugins[key]
    Vue.use(plugin)
  })

  Object.keys(directives).forEach((key) => {
    const { name, ...directive } = directives[key]
    Vue.directive(name, directive)
  })

  Object.keys(Filters).forEach((key) => {
    const { name, filter } = Filters[key]
    if (key == 'formatPrice' || key == 'formatPriceToHundred' || key == 'parseTime') {
      Vue.filter(key, Filters[key])
    } else {
      Vue.filter(name, filter)
    }
  })
}

install(Vue)
  Vue.use( Widgets )

// ie9 console
if (Function.prototype.bind && global.console && typeof console.log === 'object') {
  ;['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(
    function(method) {
      console[method] = this.bind(console[method], console)
    },
    Function.prototype.call
  )
}

// lazyload
Vue.use(VueLazyload)
//element
// Vue.use(ElementUI);

// Vue.prototype.$redirect = function (url, params = {}) {
//   if (typeof url !== 'string') {
//     params = url
//   }
//   if (params.key) {
//     url = store.get(params.key)
//     store.remove(params.key)
//   }
//   // console.log('----auth_redirect----', url, '---params---', params)
//   if (!params.disableHostCheck && url) {
//     const parser = document.createElement('a')
//     parser.href = url
//     url = url.replace(`${parser.protocol}//${parser.host}`, '')
//   }
//   url = url || '/'
//   const method = params.redirect ? 'replace' : 'push'
//   this.$router[method](url)
// }

Vue.prototype.$EventBus = new Vue()

// 在应用启动时打印开源标注信息（仅客户端）
if (process.client) {
  console.log('%c' + licenseInfo, 'color: #3e76f6; font-family: monospace; line-height: 1.4;')
}
