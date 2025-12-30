/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0004-props {
  .wgt-props {
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    &_img {
      width: 60px;
      height: 60px;
      img {
        width: 60px;
        height: 60px;
      }
      .img-picker__btn {
        width: 60px;
        height: 60px;
      }
    }
    &_delete {
      width: 30px;
      cursor: pointer;
      padding-top: 5px;
      text-align: center;
      .ivu-icon {
        font-size: 20px;
        color: #f56c6c;
      }
    }
    &_content {
      flex: 1;
      padding: 5px 10px;
      .title {
        font-size: 12px;
        font-weight: 400;
        @include mult-ellipsis(2);
      }
    }
    .icon-shanchu {
      margin-left: 20px;
      color: #3091f2;
    }
  }
  .tip {
    margin-top: 8px;
    color: #d01717;
  }
}
</style>
<template>
  <div class="widget-w0004-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="基本设置">
          <attr-field label="标题：">
            <Input v-model="activeElement.text" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="副标题：">
            <Input v-model="activeElement.moreText" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="链接：" labelTop>
            <!-- {{activeElement.moreLinkData}} -->
            <dataBind v-model="activeElement.moreLinkData" :imgPicker="false"></dataBind>
          </attr-field>
          <div class="division"></div>
          <attr-field label="选择列数：">
            <Select
              v-model="activeElement.column"
              size="small"
              @on-change="handleSelectChange"
              label-in-value
            >
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

          <!-- <div class="division"></div>
          <attr-field label="显示更多：">
            <iSwitch v-model="activeElement.showMore" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="更多：" v-if="activeElement.showMore">
            <Input v-model="activeElement.moreText" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="更多跳转：" v-if="activeElement.showMore">
            <dataBind v-model="activeElement.moreLinkData" :imgPicker="false"></dataBind>
          </attr-field> -->
        </panelBar>
        <panelBar title="参数配置">
          <Button type="primary" style="width: 100%; margin: 0 auto" @click="handleAdd"
            >添加配置</Button
          >
          <div class="tip">
            {{ `图片分辨率：${activeElement.logoWidth}px * ${activeElement.logoHeight}px` }}
          </div>

          <draggable v-model="activeElement.data" class="list-group" ghost-class="ghost">
            <div
              class="wgt-props"
              v-for="(item, index) in activeElement.data"
              :key="`wgt-props__${index}`"
            >
              <dataBind
                :imgData="item.imgUrl"
                :pathData="item.pathData"
                :imgOnChange="handleImgOnChange.bind(this, index)"
                :pathOnChange="handlePathOnChange.bind(this, index)"
              ></dataBind>
              <i class="mshopdesign icon-shanchu" @click="deleteItem(index)"></i>
            </div>
          </draggable>
        </panelBar>
      </TabPane>
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { panelBar, attrField, dataBind } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0004Props',
  props: ['activeElement'],
  data() {
    return {
      styleList: [
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ]
    }
  },
  components: {
    panelBar,
    attrField,
    basicSet,
    dataBind
  },
  mounted() {
    this.calcHeight()
  },
  methods: {
    // 删除商品
    deleteItem(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          if (this.activeElement.data.length > 0) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
            this.calcHeight()
          }
        }
      })
    },
    async handleAdd() {
      // const res = await this.$picker('img', {
      //   data: {},
      //   multiple: true
      // })

      // this.activeElement.data = res.data.map((item) => {
      //   this.$set(item, 'href', '')
      //   return item
      // })
      this.activeElement.data.push({
        imgUrl: '',
        pathData: {}
      })
      this.calcHeight()
    },
    handleSelectChange() {
      this.calcLogoSize()
      this.calcHeight()
    },
    // 商品设置
    handleGetImg(data) {
      console.log(data)
    },
    handleImgOnChange(idx, item) {
      this.activeElement.data[idx].imgUrl = item
    },
    handlePathOnChange(idx, item) {
      this.activeElement.data[idx].pathData = item
    },
    calcLogoSize() {
      const { width, column } = this.activeElement
      this.activeElement.logoWidth = Math.floor((width - 10 * (column - 1)) / column)
      this.activeElement.logoHeight = Math.floor(this.activeElement.logoWidth * 0.6)
      console.log(
        'logoWidth, logoHeight',
        this.activeElement.logoWidth,
        this.activeElement.logoHeight
      )
    },
    calcHeight() {
      setTimeout(() => {
        this.activeElement.height =
          document.getElementById(`wgt-logowall_list_${this.activeElement.uuid}`).clientHeight + 60
      }, 100)
    }
  }
}
</script>
