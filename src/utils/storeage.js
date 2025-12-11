/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import store from 'store'
import { expirePlugin } from './expire'
store.addPlugin(expirePlugin)
const gstore = store
export default gstore
