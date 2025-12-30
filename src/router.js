/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import Vue from 'vue'
import Router from 'vue-router'

let customeRoutes = []
try {
  customeRoutes = require('../custome/router')
} catch (e) {}

const glob = require('glob')
const path = require('path')

const CUSTOME_PATH = path.resolve(__dirname, '../custome')
const SRC_PATH = path.resolve(__dirname)

Vue.use(Router)
