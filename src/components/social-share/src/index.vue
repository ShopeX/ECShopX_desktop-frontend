/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss" scoped></style>

<template>
<no-ssr>
  <div class="social-share">
    <a href="javascript:;" class="mb-iconfont mb-iconfont-weibo icon-weibo" :title="$t('src.index.918636-0')" @click="handleShare('weibo')"></a>
    <a href="javascript:;" class="mb-iconfont mb-iconfont-weixin" :title="$t('src.index.918636-1')" @mouseover="handleClickShareImg" @click="handleShare('weixin')">
      <SharePanel :info="shareInfo" :is-product="isProduct" />
    </a>
    <!-- <a href="javascript:;" class="mb-iconfont mb-iconfont-douban icon-douban" title="分享到豆瓣" @click="handleShare('douban')"></a> -->
    <a href="javascript:;" class="mb-iconfont mb-iconfont-qq icon-qq" :title="$t('src.index.918636-2')" @click="handleShare('QQ')"></a>
    <a href="javascript:;" class="mb-iconfont mb-iconfont-qzone icon-qzone" :title="$t('src.index.918636-3')" @click="handleShare('QZone')"></a>
    <!-- <a href="javascript:;" class="mb-iconfont mb-iconfont-xhs" title="分享到小红书" @mouseover="handleClickShareImg" @click="handleShare('小红书')">
      <SharePanel :info="shareInfo" :is-product="isProduct" />
    </a> -->
  </div>
</no-ssr>
</template>

<script>
import SharePanel from './panel'
import { analytics } from '@/plugins/analytics'
import { resolveImgPath } from '@/utils'

// eslint-disable-next-line
let SocialShare
if (process.client) {
  SocialShare = require('social-share.js/dist/js/social-share.min.js')
}

export default {
  name: 'SpSocialShare',
  components: { SharePanel },
  props: {
    info: {
      type: Object
    },
    isProduct: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      shareInfo: null,
      shareFetching: false,
      modalShow: false
    }
  },
  mounted () {
    if (process.client) {
      const loc = window.location
      this.$nextTick(() => {
        // eslint-disable-next-line
        socialShare(this.$el, {
          initialized: true,
          sites: ['weibo', 'wechat', 'douban', 'qq', 'qzone'],
          source: `${loc.protocol}//${loc.host}/`,
          wechatQrcodeTitle: this.$t('src.index.918636-4'),
          wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
          ...this.info
        })
      })
    }
  },
  methods: {
    handleShare (type) {
      analytics.event({
        socialShareService: type
      }, 'socialShareClick')
    },
    async handleClickShareImg () {
      if (this.isProduct) {
        this.modalShow = true
        if (this.shareInfo || this.shareFetching) return
        this.shareFetching = true
        const { weixin_qrcode: shareQR, downWeixinImgLink: downUrl } = await this.$api.item.shareInfo(this.info.item_id)
        this.shareFetching = false
        // const shareUrl = location.href
        const shareUrl = `${process.env.VUE_APP_HOST}/items/${this.info.item_id}`
        if (this.info.image) {
          this.info.image = resolveImgPath(this.info.image, 'm')
        }

        this.shareInfo = {
          ...this.info,
          shareQR,
          shareUrl,
          downUrl
        }
      } else {
        const { qrcodeImage } = await this.$api.content.qrcode(this.info)
        this.shareInfo = {
          qrcodeImage,
          size: this.info.size
        }
      }
    }
  }
}
</script>
