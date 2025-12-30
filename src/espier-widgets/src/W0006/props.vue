/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-0006-props {
}
</style>

<template>
  <div class="widget-0006-props">
    <Tabs value="name1" :animated="false">
      <TabPane :label="`${activeElement.name}[${activeElement.type}]`" name="name1">
        <panelBar title="基本设置">
          <attr-field label="类型：">
            <Select v-model="activeElement.comptyle" size="small" label-in-value>
              <Option
                v-for="item in styleList"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              >
                <div>{{ item.label }}</div>
              </Option>
            </Select>
          </attr-field>
          <div class="division"></div>
          <attr-field label="网格：">
            <iSwitch size="small" v-model="activeElement.grid" />
          </attr-field>
        </panelBar>
        <panelBar :title="`挂件（${activeElement.childWidgets.length}）`">
          <ul class="child-ele">
            <li
              v-for="(item, index) in activeElement.childWidgets"
              :key="index"
              @mouseover="handleMouseover(item)"
            >
              <div>{{ `${item.type}(${item.name})` }}</div>
              <!-- <span v-if="index !== editIndex">
                <span v-if="item.alias != item.name">{{ item.alias }} ({{ item.name }})</span>
                <span v-if="item.alias === item.name">{{ item.name }}</span>
              </span>
              <Input
                v-if="index === editIndex"
                :ref="'input_' + index"
                v-model="item.alias"
                size="small"
                @on-blur="blur"
                style="width: 120px;"
              />
              <span class="child-ele-tool">
                <SpIcon icon="icon-bianji" @click.native.stop="edit(index)"></SpIcon>
                <SpIcon icon="icon-shezhi" @click.native.stop="handleClick(item)"></SpIcon>
                <SpIcon
                  icon="icon-shanchu"
                  @click.native.stop="del(activeElement.uuid, item.uuid)"
                ></SpIcon>
              </span> -->
            </li>
          </ul>
        </panelBar>
        <div class="division"></div>
        <attr-field label="视图层级">
          <InputNumber v-model="activeElement.zindex" size="small" :min="0"></InputNumber>
        </attr-field>
      </TabPane>
      <!-- <TabPane label="动画" name="name2">
        <panel-bar title="动画设置">
          <ButtonGroup class="animate-btn">
            <Button type="primary">
              <Icon type="md-add-circle" />
              添加动画</Button
            >
            <Button type="primary">
              <Icon type="md-arrow-dropright-circle" />
              运行动画</Button
            >
          </ButtonGroup>
        </panel-bar>
      </TabPane> -->
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { panelBar, attrField, imgPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
// import domtoimage from 'dom-to-image'
import _ from 'lodash'
import axios from 'axios'
export default {
  name: 'W0006Props',
  props: ['activeElement'],
  data() {
    return {
      editIndex: -1,
      src: '',
      postData: {
        token: '',
        key: ''
      },
      blob: '',
      vmodelCombineName: '',
      loading: false,
      styleList: [
        { label: '头部', value: 'header' },
        { label: '正文', value: 'body' },
        { label: '尾部', value: 'footer' }
      ]
    }
  },
  components: { panelBar, basicSet, attrField },
  computed: {
    // isprivilegeAddCombine: {
    //   get () {
    //     return this.$store.state.mshopdesign.privilegeAddCombine
    //   },
    //   set () {}
    // }
  },
  methods: {
    // 收藏组合模块
    async collection() {
      this.loading = true
      if (!this.vmodelCombineName) {
        this.$Message.error('请输入组合模块名称')
        this.loading = false
        return false
      }
      await this.getQiniuToken() // qiniu的token
      await this.handleDomToImage() // dom转图片file,上传qiniu
      if (!_.isEmpty(this.src)) {
        // 保存组合模块信息
        this.combineSave({ image: this.src, name: this.vmodelCombineName })
        this.loading = false
      } else {
        this.loading = false
        this.$Message.error('组合模块图片保存失败')
      }
    },
    // 保存组合模块
    combineSave(object) {
      if (this.$store.state.mshopdesign.activeElement.type === 'widget-layout') {
        // 再确认一遍 当前选中的组件是组合组件
        // 删除uuid和点击事件跳转页面
        let params = _.omit(this.$store.state.mshopdesign.activeElement, ['uuid'])
        params.href = []
        if (!_.isEmpty(params.children)) {
          // 组合模块内部的基础组件的uuid删除，重置点击事件跳转页面
          let arr = []
          params.children.forEach((v) => {
            let obj = _.omit(v, ['uuid'])
            obj.href = []
            arr.push(obj)
          })
          params.children = arr
        }
        let para = {
          name: object.name,
          image: object.image,
          params: JSON.stringify(params)
        }
        API.postCombineDesign(para).then((res) => {
          this.$Message.success('组合模块保存成功！')
        })
      } else {
        this.$Message.warning('请选中要保存的自由面板')
      }
    },
    // dom转图片file
    async handleDomToImage() {
      var node = document.getElementsByClassName('widget-active')[0]
      var blob = await domtoimage.toBlob(node)
      let files = new window.File([blob], 'file', { type: blob.type })
      try {
        await this.uploadQiniu(files, blob)
      } catch (err) {
        this.loading = false
      }
    },
    // qiniu的token
    async getQiniuToken() {
      const { data } = await API.getQiniuToken(
        {},
        { Authorization: 'bearer ' + this.getCookie('jwt_token') }
      )
      this.postData.token = data.data
      this.image_prefix = data.image_prefix
    },
    async uploadQiniu(file, blob) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
      }
      let ext = '.jpg'
      if (isPNG) {
        ext = '.png'
      }
      this.postData.key = this.image_prefix + this.uuid(32, 32) + ext
      var url = 'https://upload-z2.qiniup.com'
      var formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('token', this.postData.token)
      formData.append('key', this.postData.key)
      try {
        let { data } = await axios({
          url: url,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        let params = {
          img_name: file.name,
          img_url: data.img_url,
          img_type: data.mimeType,
          img_size: data.img_size,
          width: data.width,
          height: data.height
        }
        await this.postQiniu(params)
        this.$Message.success('上传组合模块图片成功!')
      } catch (err) {
        this.loading = false
      }
    },
    async postQiniu(params) {
      try {
        const { data } = await API.postQiniuToken(params, {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: 'bearer ' + this.getCookie('jwt_token')
        })
        this.src = data.img_full_url
      } catch (err) {
        this.loading = false
      }
    },
    getCookie(name) {
      var strcookie = document.cookie // 获取cookie字符串
      var arrcookie = strcookie.split('; ') // 分割
      // 遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    },
    uuid(len, radix) {
      // 时间戳转时间字符串
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      var uuid = []
      var i = 0
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16)
            uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    handleMouseover(item) {
      // this.$log.debug( '[panel]', 'handleMouseover', {a: 100}, 'sfef', {b: 200} )
      // Bus.$emit( 'bus.panelstyle.handleMouseover' )
      // this.$store.commit('MSHOPDESIGN_SET_PANEL_ACTIVE_ELE', item.uuid)
    },
    handleClick(item) {
      this.$store.commit('MSHOPDESIGN_SELECT_ELE_IN_PANEL', item)
      // this.$store.commit( 'MSHOPDESIGN_SET_PANEL_ACTIVE_ELE', item.uuid )
    },
    edit(index) {
      this.editIndex = index
      setTimeout(() => {
        this.$refs[`input_${index}`][0].focus()
      }, 50)
    },
    del(puuid, cuuid) {
      this.$store.commit('MSHOPDESIGN_DELETE_IN_PANEL', { puuid, cuuid })
    },
    blur() {
      this.editIndex = -1
    }
  }
}
</script>
