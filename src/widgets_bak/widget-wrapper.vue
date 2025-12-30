/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<script>
export default {
  functional: true,

  props: {
    config: Object
  },

  render (h, ctx) {
    const attrs = ctx.props.config

    return (
      <div
        class="shopWidgets_box"
        {...{ attrs }}
      >
        {ctx.children}
      </div>
    )
  }
}
</script>
