/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import store from 'store'
import { areaList } from '@/api/member'
export const state = () => ({
    region: [],
})

export const mutations = {
    SET_REGION (state, val) {
        state.region = val
    }
}

export const actions = {
    async getRegion ({ state,commit }) {
        if (state.region!='') {
            return state.region
        } else {
            let res = await areaList()
            commit('SET_REGION', res)
            return res
        }
    }
}
