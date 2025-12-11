/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src='@/style/index.scss'>
// .btn_add_widget:hover {
  .widget-drop-menu {
    display: block;
  }
// }
</style>

<template>
<LayoutHoc>
<div>
  <SpHeader />

  <Nuxt :key="nuxtKey"/>
  <SpFooter />

  <div class="test">
    <div id="drag_operate_box" class="drag_operate_box" style="visibility:hidden;">
      <div class="drag_handle_box">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td width="117" align="left" style="text-align:left;">
                <span class="add-widgets-wrap">
                  <a
                    class="btn-operate btn-edit-widgets"
                    title="'.app::get('site')->_('编辑此挂件').'"
                  >编辑</a>
                  <span style="position:relative;display:inline;" id="btn_add_widget"  class="btn_add_widget">
                    <a class="btn-operate btn-add-widgets">
                      <i class="icon"></i>添加挂件
                    </a>
                    <ul class="widget-drop-menu" id="add_widget_dropmenu" style="margin-top:-4px;">
                      <li class="before" title="'.app::get('site')->_('添加到此挂件上方').'">添加到上方</li>
                      <li class="after" title="'.app::get('site')->_('添加到此挂件下方').'">添加到下方</li>
                    </ul>
                  </span>
                </span>
              </td>
              <td class="operate-title" style="_width:85px;" align="center">
                <a class="btn-operate btn-up-slot" title="'.app::get('site')->_('上移').'">&#12288;</a>
                <a class="btn-operate btn-down-slot" title="'.app::get('site')->_('下移').'">&#12288;</a>
              </td>
              <td width="36" align="right" style="text-align:right;">
                <a class="btn-operate btn-del-widgets" title="'.app::get('site')->_('删除此挂件').'">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="drag_rules" style="display:none;">
        <div class="drag_left_arrow">&larr;</div>
        <div class="drag_annotation">
          <em></em>
        </div>
        <div class="drag_right_arrow">&rarr;</div>
      </div>
    </div>
    <div id="drag_ghost_box" class="drag_ghost_box" style="visibility:hidden"></div>
  </div>

</div>
</LayoutHoc>
</template>

<script>
import { SpHeader, SpFooter } from '@/components'
import '@/main'

export default {
  provide: {
    themeIsEditing: true
  },
  components: {
    SpHeader, SpFooter
  },
  data () {
    return {
      nuxtKey: null,
      showDropmenu: false
    }
  },
  created () {
    // console.log(window)
  },
  mounted () {
    // console.log(window)
    // this.baseLink = 'http://172.19.108.40:8001'
    // this.baseLink = 'http://qa-api.dickies.com.cn'
    // this.baseLink = 'http://test.vip.shopex.cn'
    this.baseLink = window.__shopex_widgets_env.baseLink

    if (process.client) {
      this.loadStyle()
      this.loadScript()
      window.__nuxt_refresh = this.refresh
    }
  },
  methods: {
    refresh () {
      this.nuxtKey = Math.round(Math.random() * 1000)
    },
    loadStyle () {
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href =
        `${this.baseLink}/app/site/statics/stylesheets/widgets_edit.css?1557803239`
      document.getElementsByTagName('head')[0].appendChild(link)
    },
    loadScript () {
      let scripts = [
        `${this.baseLink}/app/site/statics/scripts/lib/jquery.js?1557798410`,
        `${this.baseLink}/app/site/statics/scripts/tools.js?1557798410`,
        `${this.baseLink}/app/site/statics/scripts/shopwidgets.js?1557798410`
      ]
      let load = function (index) {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = scripts[index]
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = script.onreadystatechange = function () {
          if (
            !this.readyState ||
            this.readyState === 'loaded' ||
            this.readyState === 'complete'
          ) {
            if (index < scripts.length - 1) {
              load(++index)
            }
          }
        }
      }

      load(0)
    }
  }
}
</script>
