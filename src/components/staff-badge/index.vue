/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-staff-badge {
  display: inline-block;
  height: 18px;
  font-size:0;
  &__staff-icon {
    display: inline-block;
    height: 18px;
    border-radius: 10px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    // margin-right: 5px;
    background: $color-red;
    padding: 0 8px;
    color: #fff;
    // font-size: $font-size-small;
  }
  // @include respond(sm) {
  //   &__staff-icon {
  //     width: 18px;
  //     padding: 0;
  //   }
  // }
}
</style>

<template>
  <div>
    <no-ssr>
    <div class="sp-staff-badge" v-if="!!value.product_type && (userInfo && userInfo.is_staff == '1')">
      <span class="sp-staff-badge__staff-icon" v-if="value.product_type === 'sale'">
        {{$t('staff-badge.index.772336-0')}}
      </span>
      <span class="sp-staff-badge__staff-icon" v-if="value.product_type === 'bag'">
        {{$t('staff-badge.index.772336-1')}}
      </span>
      <span class="sp-staff-badge__staff-icon" v-if="value.product_type === 'normal' && value.staff_goods == 1">
        {{$t('staff-badge.index.772336-2')}}
      </span>
    </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'SpStaffBadge',
  props: {
    value: Object
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  }
}
</script>
