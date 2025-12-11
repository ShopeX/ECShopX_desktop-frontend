/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import S from '@/spx'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  computed: {
    ...mapState({
      pageConfig: (state) => {
        return state.pageConfig
      }
    }),
    getThemeColor() {
      const { themeColor } = this.pageConfig;
      console.log('themeColor', themeColor)
      return {
        color: themeColor
      }
    },
    getThemeBackground() {
      const { themeColor } = this.pageConfig
      return {
        backgroundColor: themeColor
      }
    },
    themeColor() {
      const { themeColor } = this.pageConfig
      console.log('themeColor', themeColor)
      return themeColor
    }
  },
  filters: {
    DateTimeFilter(date) {
      return moment(date * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    ...mapActions({
      CART_GETINFO: 'cart/CART_GETINFO'
    }),
    initStore() {
      if (process.client && S.getAuthToken()) {
        this.$store.dispatch('user/getUserInfo')
        // this.$store.dispatch( 'cart/getCartInfo' )
        this.CART_GETINFO()
      }
    }
  }
}
