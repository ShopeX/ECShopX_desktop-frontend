/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<script>
import WidgetWrapper from './widget-wrapper'
import Widgets from './src'

export default {
  name: 'SpWidget',

  inject: {
    themeIsEditing: {
      default: false
    }
  },

  props: {
    info: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default () {
        return this.themeIsEditing
      }
    }
  },

  render (h) {
    const { params, ...config } = this.info
    config.widgets_type = config.widgets_type.replace(/_/g, '-')
    const Widget = Widgets[config.widgets_type]
    // console.log(Widget, config.widgets_type)

    return (
      this.isEdit
        ? (
          <WidgetWrapper
            config={config}
          >
            <Widget params={params}>{this.$slots.default}</Widget>
          </WidgetWrapper>
        )
        : <Widget params={params}>{this.$slots.default}</Widget>

    )
  }
}
</script>
