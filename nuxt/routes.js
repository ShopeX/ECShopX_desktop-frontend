import { createRoutes } from '@nuxt/utils'

const glob = require('glob')
const path = require('path')

const CUSTOME_PATH = path.resolve(
  __dirname,
  "../" + process.env.npm_config_t
);
const SRC_PATH = path.resolve(__dirname, '../src')
const exts = ['vue', 'js', 'ts', 'tsx']

function resolveCustomeRoutes(routes) {
  if (!process.env.npm_config_t) {
    return routes;
  }
  const customePages = glob.sync(`pages/**/*.{${exts.join(',')}}`, {
    cwd: CUSTOME_PATH
  })
  console.log('customePage: ', customePages)
  const customeRoutes = createRoutes({
    files: customePages,
    srcDir: CUSTOME_PATH,
    pagesDir: '/pages'
  })

  const routesDict = routes.reduce((dict, r) => {
    dict[r.path] = r
    return dict
  }, {})

  customeRoutes.forEach(croute => {
    const route = routesDict[croute.path]
    if (route) {
      route.component = croute.component
    } else {
      routes.push(croute)
    }
  })

  return routes
}

export default function extendRoutes(routes) {
  this.scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition && to.meta.isKeepAlive) {
      this.app.$store.commit('savedPosition', savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

  routes.forEach(item => {
    if (item.path === '/items' || item.path === '/member/trade') {
      item.meta = {
        isKeepAlive: true
      }
    }
  })

  return [
    ...resolveCustomeRoutes(routes),
    {
      path: '/shopadmin/index',
      component: `${SRC_PATH}/pages/index`
    },
    {
      path: '/product/*',
      component: `${SRC_PATH}/pages/custom`
    }
    , {
      path: '/website/decorate',
      component: `${SRC_PATH}/pages/template`
    },
    // {
    //   path: `/shopadmin/path/${encodeURIComponent('item/list')}`,
    //   component: `${SRC_PATH}/pages/item/list`
    // }
  ]
}
