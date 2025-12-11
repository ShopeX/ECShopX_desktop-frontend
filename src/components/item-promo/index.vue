/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<script>
export default {
  functional: true,

  name: 'SpItemPromo',

  props: {
    info: Object
  },

  render (h, context) {
    const { info } = context.props

    return (
      <div class="item-promo">
        <span class="item-promo__tag">{info.promotion_tag}</span>
        <div class="item-promo__name">{info.promotion_name}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.item-promo {
  color: $color-brand-primary;
  font-size: 13px;
  &__tag {
    border: 1px solid $color-brand-primary;
    margin-right: 20px;
    padding: 1px 10px;
    display: inline-block;
    vertical-align: middle;
  }
  &__name {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>