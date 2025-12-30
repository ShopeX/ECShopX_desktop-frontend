import i18n from './src/plugins/nuxti18n'

const path = require('path')
const merge = require('webpack-merge')
const pkg = require('./package.json')
const { extendRoutes } = require('./nuxt')
const OssPlugin = require('./nuxt/ossplugin')

// const Parser = require('process-argv-parser')
// const parser = new Parser()
const mode = process.env.BUILD_ENV
console.log(`build template: ${process.env.npm_config_t}, mode: ${mode}`);
// console.log(mode)
require('dotenv-flow').config({
  node_env: mode
})

const SRC_PATH = path.resolve(__dirname, 'src')
const CUSTOME_PATH = path.resolve(__dirname, 'custome')

const vueAppEnvs = Object.keys(process.env).reduce((ret, key) => {
  const val = process.env[key]
  if (key.indexOf('VUE_APP_') >= 0) {
    console.log(`${key}=${val}`)
    ret[key] = val
  }

  if (process.server) console.log('server')

  return ret
}, {})

module.exports = {
  mode: 'universal',

  srcDir: 'src/',

  dir: {
    // layouts: path.resolve(CUSTOME_PATH, 'layouts')
  },

  server: {
    host: '0.0.0.0',
    // port: '80',
    disableHostCheck: true
  },

  env: {
    ...vueAppEnvs,
    VUE_APP_TEMPLATE: process.env.npm_config_t
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.VUE_APP_TITLE || pkg.name,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge' },
      { name: 'renderer', content: 'webkit' },
      { name: 'referrer', content: 'never' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_2290749_t11sxx31om.css'
      }
    ],
    script: [
      {
        src: process.env.VUE_APP_ADOBE ? process.env.VUE_APP_ADOBE_URL : ''
      },
      {src: "https://map.qq.com/api/gljs?v=1.exp&key=UZZBZ-ADN6W-VHVRB-OYRGN-M6KRK-O2BTG",  type: 'text/javascript', mode: 'client'},
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: false,
  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/error-handler',
    // '~/plugins/analytics',
    '~/plugins/axios',
    { src: '~/plugins/vue-swiper.js' },
    { src: '~plugins/vue-infinite-scroll', ssr: false },
    { src: '~/plugins/route', ssr: true },
    { src: '~/plugins/persistedState', ssr: false }
  ],

  serverMiddleware: [],

  /*
   ** Nuxt.js modules
   */
  modules: [

    ['nuxt-i18n', i18n],
    '@nuxtjs/device',
    // ['~/modules/axios'],
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { parseJSON: true }]
    // ['~/modules/page-cache', {
    //   pages: [
    //     // '/',
    //     // /^\/items\?cat_id/,
    //     // /^\/items\/(\d+)$/,
    //     // /^\/api\?.+(method=theme\.widgets).+/
    //   ]
    // }],
    // ['@nuxtjs/component-cache', {
    //   max: 500,
    //   maxAge: 1000 * 60 * 3
    // }],
    // ['~/modules/proxy']
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['@shopex/espier-widgets', 'vue-hotzone'],
    extractCSS: true,
    parallel: true,
    // publicPath: process.env.VUE_APP_PUBLIC_PATH || "/_nuxt/",
    // publicPath: "https://ecshopx.shopex123.com/pc/_nuxt/",
    extend(config, { isDev, isClient, isServer }) {

      config.module.rules.forEach(rule => {
        if (rule.test && rule.test.toString().includes('scss')) {
          // console.log('SCSS RULE:', JSON.stringify(rule, null, 2));
        }
      });

      config.resolve = merge(config.resolve, {
        alias: {
          lodash$: 'lodash-es',
          '~': path.resolve(__dirname, 'src'),
          '~assets': path.resolve(__dirname, 'src/assets'),
          '@': path.resolve(__dirname, 'src'),
          '@assets': path.resolve(__dirname, 'src/assets')
        }
      })
      if (isClient) {
        if (process.env.BUILD_ENV === 'release') {
          // config.plugins = config.plugins.concat([
          //   new OssPlugin({
          //     client: isClient,
          //     region: "oss-cn-shanghai",
          //     accessKeyId: process.env.CDN_KEY,
          //     accessKeySecret: process.env.CDN_SECRET,
          //     bucket: "aigle-bbc",
          //     dist: "aigle/"
          //   })
          // ]);
        }
      }
    },
    unknownContextCritical: false,
    cssSourceMap: false,

    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.scss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    loaders: {
      css:{
        modules:false
      },
      cssModules: {
        modules:false
      },
      scss: {
        // modules:false,
        implementation: require('sass'),
        additionalData: `@import '${path.resolve(SRC_PATH, './style/theme.scss')}';
        @import '${path.resolve(SRC_PATH, './style/imports.scss')}';`,
        sassOptions: {
          includePaths: [path.resolve(SRC_PATH, './style')]
        }
      }
    }
  },

  // buildDir: process.env.NODE_ENV === "production" ? "dist" : ".nuxt",

  router: {
    base: '/',
    middleware: 'i18n',
    extendRoutes
  },

  // Vuex store 配置
  store: true,

  render: {
    static: {}
  },

  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  watch: ['~/custome']
}
