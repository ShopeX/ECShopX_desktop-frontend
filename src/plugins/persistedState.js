/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  // 只在客户端执行持久化，避免服务端渲染错误
  if (process.client) {
    createPersistedState({
      // 使用 paths 配置，这是官方推荐的方式
      paths: [
        'address',
        'cart', 
        'global',
        'user',
        'trade',
        'locale',
        'pageConfig',
        'pageSeo',
        'category',
        'itemsCache',
        'tradeCache',
        'position'
      ],
      
      // 存储方式：localStorage
      storage: window.localStorage,
      
      // 自定义存储 key 前缀，避免与其他应用冲突
      key: 'xiaocao-store',
      
      // 序列化方式（默认就是 JSON，但明确指定更安全）
      serialize: JSON.stringify,
      deserialize: JSON.parse,
      
      // 过滤 mutation，只持久化需要的状态变化
      filter: (mutation) => {
        // 可以根据需要过滤特定的 mutation
        // 例如：只持久化某些模块的 mutation
        return true
      },
      
      // 在状态恢复前的钩子函数
      beforeRestore: (context) => {
        console.log('准备恢复 Vuex 状态:', context)
      },
      
      // 在状态恢复后的钩子函数
      afterRestore: (context) => {
        console.log('Vuex 状态恢复完成:', context)
      }
    })(store)
  }
}
