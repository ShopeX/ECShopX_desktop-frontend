/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<script>
import { resolveImgPath } from '@/utils'

export default {
  name: 'SpImg',

  functional: true,

  props: {
    src: String,
    size: {
      type: String,
      default: 'm' // s | t | m | l
    },
    noSize: Boolean
  },

  render(h, ctx) {
    const { src = '', size, noSize } = ctx.props
    const url = !noSize ? resolveImgPath(src, size) : src
    ctx.data.attrs.src = url

    return h('img', ctx.data, ctx.children)
  }
}
</script>
