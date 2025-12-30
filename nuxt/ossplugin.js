
const OSS = require('ali-oss')

class OssPlugin {
  constructor (options = {}) {
    const {
      client,
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
      dist
    } = options
    let oss = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    })
    this.options = {
      client,
      test: /\.(jpe?g|png|gif|svg|js)$/i,
      dist,
      oss
    }
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('OssPlugin', async (compilation, callback) => {
      const { client, test } = this.options
      if (client) {
        for (let key of Object.keys(compilation.assets)) {
          if (test.test(key)) {
            let source = compilation.assets[key].source()
            if (!Buffer.isBuffer(source)) {
              source = Buffer.from(source)
            }
            await this.putOSS(source, key)
          }
        }
        // Object.keys(compilation.assets).(item => {
        //   // console.log(item)
        //   if (test.test(item)) {
        //     let source = compilation.assets[item].source()
        //     if (!Buffer.isBuffer(source)) {
        //       source = Buffer.from(source)
        //     }
        //     this.putOSS(source, item)
        //   }
        // })
      }
      callback()
    })
  }

  async putOSS (src, name) {
    const { dist, oss } = this.options
    try {
      await oss.put(dist + name, src)
    } catch (err) {
      console.error('error: %j', err)
    }
  }
}

module.exports = OssPlugin
