/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

function resolveProxy () {
  const url = new URL(process.env.VUE_APP_API_BASE_URL)
  return {
    target: `${url.origin}`,
    path: `${url.pathname}`
  }
}

export default function ProxyModule (moduleOptions) {
  const { target, path } = resolveProxy()
  const onProxyRes = (proxyRes, req, res) => {
    var body = []
    proxyRes.on('data', function (chunk) {
      body.push(chunk)
    })
    proxyRes.on('end', function () {
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  }
  const proxyOptions = {
    '/api': {
      target,
      pathRewrite: { '^/api': path },
      selfHandleResponse: true,
      onProxyRes
    }
  }
  const proxy = { ...proxyOptions, ...this.options.proxy, ...moduleOptions.proxy }
  // workaround for @nuxtjs/proxy
  this.options.proxy = proxy
  this.requireModule(['@nuxtjs/proxy'])
}
