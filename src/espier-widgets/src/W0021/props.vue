/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-W0021-props {
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .wgt-props {
    display: flex;
    margin: 20px 0 10px;
    &_img {
      flex: 0;
      width: 60px;
      height: 60px;
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
      }
    }
    &_delete {
      flex: 0;
      width: 30px;
      cursor: pointer;
      padding-top: 5px;
      text-align: center;
      .icon-shanchu {
        color: #3091f2;
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
      .tag {
        .tag-item {
          padding: 2px 3px;
          // border: 1px solid rgba(247, 137, 137, 1);
          border-radius: 3px;
          font-size: 12px;
          color: #f56c6c;
          background-color: rgba(254, 240, 240, 1);
          margin-right: 3px;
          // @include mult-ellipsis(1)
        }
      }
    }
  }
  .tip {
    margin-top: 8px;
    color: #d01717;
  }
}
</style>
<template>
  <div class="widget-W0021-props">
    <Tabs value="name1" :animated="false">
      <TabPane :label="`${activeElement.name}[${activeElement.type}]`" name="name1">
        <panelBar title="标题设置">
          <attr-field label="主标题：">
            <Input v-model="activeElement.text" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体颜色：">
            <color-picker v-model="activeElement.wgtTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="圆角：">
            <iSwitch size="small" v-model="activeElement.wgtBorderRadius" />
          </attr-field>

          <div class="division"></div>
          <attr-field label="副标题：">
            <Input v-model="activeElement.subTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="副标题字体：">
            <InputNumber
              v-model="activeElement.wgtSubTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="副标题字体颜色：">
            <color-picker v-model="activeElement.wgtSubTextColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="更多链接：" labelTop>
            <!-- {{activeElement.moreLinkData}} -->
            <dataBind v-model="activeElement.moreLinkData" :imgPicker="false"></dataBind>
          </attr-field>
        </panelBar>

        <panelBar title="优惠券列表">
          <div class="division"></div>
          <!-- <attr-field label="选择商品："> -->
          <dataBind
            v-if="showGoodsList"
            :value="activeElement.data"
            :imgPicker="false"
            :filterMenu="['coupons']"
            :multiple="true"
            :customPath="false"
            @pathOnChange="onChangePath"
            activeKey="card_id"
            placeholder="选择优惠券"
          ></dataBind>
          <!-- </attr-field>  -->
          <!-- {{activeElement.data}} -->
          <!-- <Button type="primary" style="width: 100%; margin: 0 auto"
              @click="(data) => onChangePath(data)"
            >添加优惠券</Button
          > -->
          <!-- <div class="division"></div> -->
          <div
            v-for="(tab, i) in activeElement.data"
            :key="i"
            style="margin-bottom: 10px; margin-top: 10px"
          >
            <ul>
              <draggable v-model="activeElement.data[i]" class="list-group" ghost-class="ghost">
                <!-- <li class="wgt-props" v-for="(item, index) in tab.goods_list" :key="`wgt-propsitem__${index}`"> -->
                <li class="wgt-props">
                  <div class="">
                    <dataBind
                      :key="key"
                      :value="tab.icon_url_list"
                      :pathPicker="false"
                      :imgData="tab.icon_url_list"
                      :pathData="tab.pathData"
                      :imgOnChange="handleImgOnChange.bind(this, i)"
                      :pathOnChange="handlePathOnChange.bind(this, i)"
                    >
                    </dataBind>
                  </div>
                  <div class="wgt-props_content">
                    <h4 class="title">{{ tab.title }}</h4>
                  </div>
                  <div class="wgt-props_delete" @click="deleteItem(i)">
                    <i class="mshopdesign icon-shanchu"></i>
                  </div>
                </li>
              </draggable>
            </ul>
            <!-- :pathOnChange="handlePathOnChange.bind(activeElement.pathData)" -->
          </div>
        </panelBar>
      </TabPane>
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { panelBar, attrField, dataBind, colorPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0021Props',
  props: ['activeElement'],
  data() {
    return {
      key: 0,
      showGoodsList: true
    }
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    basicSet,
    colorPicker
  },
  watch: {
    'activeElement.data': {
      handler: function (nval, oval) {
        // setTimeout(() => {
        //   this.activeElement.height =
        //     60 + document.getElementById(`goods-wrap__${this.activeElement.uuid}_0`).clientHeight
        // }, 100)
      },
      deep: true
    },
    'activeElement.width': {
      handler: function (nval, oval) {
        setTimeout(() => {
          this.activeElement.height =
            60 + document.getElementById(`goods-wrap__${this.activeElement.uuid}_0`).clientHeight
        }, 100)
      },
      deep: true
    }
  },
  methods: {
    handleAdd() {
      this.activeElement.data.push({
        text: 'tab',
        goods_id: '',
        data: [{ card_id: '', linkPage: 'coupons', linkPageLabel: '优惠券' }]
      })
      console.log(this.activeElement)
    },
    handleDelete(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          console.log(this.activeElement)
          if (this.activeElement.data.length > 1) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1个优惠券')
          }
        }
      })
      this.key = this.key + 1
    },
    deleteItem(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该优惠券？',
        onOk: () => {
          this.showGoodsList = false
          if (this.activeElement.data.length > 1) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
            this.$forceUpdate()
          } else {
            this.$Message.error('请至少添加1个优惠券')
          }
          this.showGoodsList = true
        }
      })
    },
    onChangePath(data) {
      this.activeElement.data = []
      const goodsData = data.map((item) => {
        const {
          card_id,
          card_type,
          icon_url_list, // 图片
          linkPage,
          linkPageLabel,
          title,
          description,
          notice, // 卡券提示语
          custom_url, // 自定义跳转链接
          discount, // 折扣券打折额度（百分比)
          least_cost, // 满减券满多少可用
          reduce_cost, // 满减券减多少金额 OR 兑换券启用金额
          object_use_for // 卡券适用对象
        } = item
        return {
          card_id,
          card_type,
          notice,
          icon_url_list: icon_url_list ? icon_url_list : '',
          linkPage,
          title,
          description,
          linkPageLabel,
          custom_url,
          discount,
          least_cost,
          reduce_cost,
          object_use_for
        }
      })
      // this.activeElement.pathData = img
      console.log(this.activeElement.data, 'this.activeElement.data11111111111111111111111')
      this.activeElement.data = goodsData
      this.$forceUpdate()
      console.log(this.activeElement.data)
    },
    handleImgOnChange(i, item) {
      const list = this.activeElement.data[i]
      list.icon_url_list = item
      this.activeElement.data[i] = list
    },
    handlePathOnChange(i, item) {
      console.log(item)
      this.activeElement.data[i].icon_url_list = item
    }
  }
}
</script>
