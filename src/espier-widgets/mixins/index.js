/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import { LinkMaps } from './common-props'

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  props: {
    rendertype: {
      type: String,
      default: 'pc' // pc h5 小程序
    },
    value: [Object, Array],
    pageProps: Object,
    mode: {
      type: String,
      default: 'design'
    },
    inLayout: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    widgetStyle() {
      const { value, translatePx2Device } = this
      return {
        marginTop: translatePx2Device(value.marginTop),
        marginBottom: translatePx2Device(value.marginBottom),
        borderStyle: 'solid',
        borderTopWidth: translatePx2Device(value.borderTopWidth),
        borderTopColor: value.borderTopColor,
        borderRightWidth: translatePx2Device(value.borderRightWidth),
        borderRightColor: value.borderRightColor,
        borderBottomWidth: translatePx2Device(value.borderBottomWidth),
        borderBottomColor: value.borderBottomColor,
        borderLeftWidth: translatePx2Device(value.borderLeftWidth),
        borderLeftColor: value.borderLeftColor,
        backgroundColor: value.backgroundColor
      }
    },
    widgetInnerStyle() {
      const { value, translatePx2Device } = this
      return {
        width: this.inLayout ? 'auto' : translatePx2Device(value.pageWidth),
        paddingTop: translatePx2Device(value.paddingTop),
        paddingRight: translatePx2Device(value.paddingRight),
        paddingBottom: translatePx2Device(value.paddingBottom),
        paddingLeft: translatePx2Device(value.paddingLeft),
        backgroundColor: value.foregroundColor,
        margin: '0 auto',
        boxSizing: 'border-box'
      }
    },
    widgetBodyStyle() {
      const { value, translatePx2Device } = this
      return {
        width: translatePx2Device(value.width),
        height: value.heightShow ? translatePx2Device(value.height) : 'auto',
        marginRight: translatePx2Device(value.marginRight),
        marginLeft: translatePx2Device(value.marginLeft)
      }
    },
    getThemeColor() {
      const { pageProps, value } = this
      // console.log(`${value.type}: ${value.customerThemeEnabled}, pageThemeColor: `, pageProps)
      if (value.customerThemeEnabled) {
        return value.wgtTheme
      } else {
        return pageProps ? pageProps.themeColor : 'inherit'
      }
    }
  },
  mounted() {
    // console.log('pageProps:', this.pageProps, this.)
  },
  methods: {
    isRenderMode() {
      return this.mode === 'render'
    },
    isDesignMode() {
      return this.mode === 'design'
    },
    isPreviewMode() {
      return this.mode === 'preview'
    },
    handleClickLinkPage(item) {
      if (this.isRenderMode()) {
        this.$router.push(LinkMaps[item.linkPage](item))
      }
    },
    handleLinkPage(item) {
      if (!item) return ''
      if (item && typeof item.href == 'undefined') {
        return LinkMaps(item)
      } else {
        return item.href
      }
    },
    translatePx2Device(v) {
      if (v === 'auto') {
        return v
      }
      let v2
      switch (this.rendertype) {
        case 'pc':
          v2 = v + 'px'
          break
        case 'h5':
          v2 = ((v * 2) / 100).toFixed(3) + 'rem'
          break
        default:
          break
      }
      return v2
    },
    navagation(href) {
      // console.log( '[mixins] navagation: ', href )
      if (this.mode !== 'design' && href.length > 0) {
        this.dispatch('preview', 'page.navagation', {
          href: href
        })
      }
    },
    telephone(phoneNumber) {
      if (this.mode !== 'design' && phoneNumber) {
        this.dispatch('preview', 'page.telephone', phoneNumber)
      }
    },
    clipboard(clipboard) {
      if (this.mode !== 'design' && clipboard) {
        this.dispatch('preview', 'page.clipboard', clipboard)
      }
    },
    //
    getChildInPanel() {
      // let puuid = this.$store.state.mshopdesign.activeEleId
      let cuuid = this.$store.state.mshopdesign.activeEleIdOfPanel
      let widgets = this.$store.state.mshopdesign.activePage.widgets
      let child
      widgets.forEach((m) => {
        if (m.type === 'widget-panel') {
          m.children.forEach((n) => {
            if (n.uuid === cuuid) {
              // console.log( n )
              child = n
            }
          })
        }
      })
      return child
    },
    // 获取当前获焦元件（不含自由面板和表单内部元件）
    getActiveComponent() {
      return this.getComponentByUuid(this.$store.state.mshopdesign.activeEleId)
    },
    // 通过uuid 查找元件
    getComponentByUuid(uuid) {
      let obj
      let widgets = this.$store.state.mshopdesign.activePage.widgets
      widgets.forEach((m) => {
        if (m.uuid === uuid) {
          obj = m
        }
      })
      return obj
    },
    // handleMouseOver () {
    //     this.hover = true
    //     // console.log( 'handleMouseOver' )
    // },
    // handleMouseOut () {
    //     this.hover = false
    //     // console.log( 'handleMouseOut' )
    // },
    // 查找所有父级，找到所需组件后调用$emit触发当前事件
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
    // // 删除组件
    // deleteComponent () {
    //     console.log( 'delete' )
    // }
  }
}
