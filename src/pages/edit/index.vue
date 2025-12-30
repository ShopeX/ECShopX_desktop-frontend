/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="page-index page-body">
    <SpWidgetPanel base-slot="2" base-id="main_focus" :info="wgts"> </SpWidgetPanel>
    <div>
      <div class="wdget-title" style="margin-bottom: 20px;">{{ $t('edit.index.316431-0') }}</div>
      <div class="wdget-recommend__nav">
        <ul class="clearfix">
          <li :class="{ 'active': recommend == 'men' }" @click="handleRecommendClick('men')">
            {{ $t('edit.index.316431-1') }}
          </li>
          <li>/</li>
          <li :class="{ 'active': recommend == 'women' }" @click="handleRecommendClick('women')">
            {{ $t('edit.index.316431-2') }}
          </li>
        </ul>
      </div>
      <div style="background: #f7f7f7;padding: 40px 0;">
        <div class="page-index__container">
          <div class="wdget-recommend">
            <SpWidgetPanel base-slot="3" base-id="recommend_men" :info="wgts"></SpWidgetPanel>
            <SpWidgetPanel base-slot="4" base-id="recommend_women" :info="wgts"></SpWidgetPanel>
          </div>
        </div>
      </div>
    </div>
    <SpWidgetPanel base-slot="5" base-id="brand-dynamics" :info="wgts"></SpWidgetPanel>
    <SpWidgetPanel base-slot="6" base-id="ad_bar" :info="wgts"></SpWidgetPanel>
  </div>
</template>

<script>
import { WidgetsEdit } from '@/mixins'
const demoData = {
  main_focus: {
    base_id: 'main_focus',
    base_file: 'dkmall/index',
    widgets: [
      {
        'widgets_id': 222,
        'widgets_type': 'main_slide',
        'widgets_theme': 'dkmall',
        'core_id': 'hl',
        'params': {
          'effectWay': 'scrollx',
          'autoplay': 'true',
          'pic': {
            '1564055588723': {
              'id': '1564055588723',
              'pc_link':
                'http:\/\/qa-api.dickies.com.cn\/images\/5d\/fc\/e8\/5e26545a82186485154b1081524735fb7bbc548b.jpg',
              'wap_link':
                'http:\/\/qa-api.dickies.com.cn\/images\/41\/81\/13\/f191aa30730c9f1f4764d9fc588b0847cee0da0f.jpg',
              'linktarget': '1212',
              'linkinfo': '1212',
              'bg_color': '#ffffff'
            },
            '1564056102274': {
              'id': '1564056102274',
              'pc_link':
                'http:\/\/qa-api.dickies.com.cn\/images\/5d\/fc\/e8\/5e26545a82186485154b1081524735fb7bbc548b.jpg',
              'wap_link':
                'http:\/\/qa-api.dickies.com.cn\/images\/3b\/57\/b1\/32f9a1e0857cbc7d65d8d9bc5eb85a3397545f7e.jpg',
              'linktarget': '',
              'linkinfo': '',
              'bg_color': '#ffffff'
            }
          },
          'app': 'site',
          'ctl': 'admin_theme_widget',
          'act': 'save_widget',
          'widgets_id': '222',
          'widgets': 'main_slide',
          'widgets_app': '',
          'widgets_theme': 'dkmall',
          'theme': 'dkmall',
          'domid': '1564056135850',
          'allimg': '',
          'allurl': ''
        }
      }
    ]
  }
}

export default {
  mixins: [WidgetsEdit],
  asyncData() {},
  data() {
    return {
      wgts: {}
    }
  },
  created() {
    const { file } = this.$route.query
  },
  async mounted() {
    if (process.client) {
      const res = await this.$http.get('theme.widgets', {
        tmpl: 'index.html',
        platform: 'newwap'
      })
      this.wgts = res
    }
  },
  methods: {}
}
</script>
