/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import _widgets from './src'

// export const Widgets = {
//   ...widgets
// }

const install = (Vue) => {
  Object.keys(widgets).forEach((key) => {
    const widget = widgets[key]
    widget['propsComponent'] = widget.panel.name
    Vue.component(widget.name, widget)
    if (widget.panel) {
      Vue.component(widget.panel.name, widget.panel)
    }
  })
}

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

const widgets = _widgets

export { widgets }

export default {
  install

  // install(Vue) {
  //   Object.keys(widgets).forEach((key) => {
  //     const widget = widgets[key]
  //     widget['propsComponent'] = widget.panel.name
  //     Vue.component(widget.name, widget)
  //     if (widget.panel) {
  //       Vue.component(widget.panel.name, widget.panel)
  //     }
  //   })
  // }
}
