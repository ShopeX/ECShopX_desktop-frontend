/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

const noop = () => {}

const debug = (...args) => {
  let cArgs = []
  args.forEach(item => {
    const cItem = typeof item !== 'object' ? ['%c' + item, 'color: #3e76f6; font-weight: normal;'] : item
    cArgs = cArgs.concat(cItem)
  })

  if (console.groupCollapsed) {
    console.groupCollapsed(...cArgs)
    console.trace(...args)
    console.groupEnd()
  } else {
    console.info(args)
  }
}

const log = {
  ...console,
  debug: process.env.NODE_ENV === 'development' ? debug : noop
}

export default log
