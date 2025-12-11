/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0005-props {
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
  <div class="widget-w0005-props">
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
        </panelBar>
        <panelBar title="标签列表">
          <Button type="primary" style="width: 100%; margin: 0 auto" @click="handleAdd"
            >添加标签商品</Button
          >
          <div class="division"></div>
          <div v-for="(tab, i) in activeElement.data" :key="i" style="margin-bottom: 10px">
            <Collapse>
              <Panel :name="i.toString()">
                {{ `标签${i + 1}` }}
                <span class="delete-btn">
                  <Icon type="ios-trash-outline" size="16" @click.stop="handleDelete(i)" />
                </span>
                <div slot="content">
                  <attr-field label="设置标题：">
                    <Input v-model="tab.text" />
                  </attr-field>
                  <div class="division"></div>
                  <attr-field label="选择商品：">
                    <dataBind
                      :value="tab.data"
                      :imgPicker="false"
                      :filterMenu="['goods']"
                      :multiple="true"
                      :customPath="false"
                      @pathOnChange="(data) => onChangePath(data, i)"
                      activeKey="goods_id"
                      placeholder="选择商品"
                    ></dataBind>
                  </attr-field>
                  <!-- <div class="tip">
                    {{ `图片分辨率：${activeElement.imgWidth}px * ${activeElement.imgHeight}px` }}
                  </div> -->
                  <div class="division"></div>
                  <ul>
                    <draggable v-model="tab.data" class="list-group" ghost-class="ghost">
                      <li
                        class="wgt-props"
                        v-for="(val, index) in tab.data"
                        :key="`wgt-props__${i}_${index}`"
                      >
                        <div class="wgt-props_img" @click="handleClickPickerGoods(val, i, index)">
                          <img :src="val.goods_pic" />
                        </div>
                        <div class="wgt-props_content">
                          <h4 class="title">{{ val.goods_name }}</h4>
                        </div>
                        <div class="wgt-props_delete" @click="deleteItem(i, index)">
                          <i class="mshopdesign icon-shanchu"></i>
                        </div>
                      </li>
                    </draggable>
                  </ul>
                </div>
              </Panel>
            </Collapse>
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
import { panelBar, attrField, dataBind } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0005Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    basicSet
  },
  watch: {
    'activeElement.data': {
      handler: function (nval, oval) {
        setTimeout(() => {
          this.activeElement.height =
            60 + document.getElementById(`goods-wrap__${this.activeElement.uuid}_0`).clientHeight
        }, 100)
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
        data: [
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 0,
            goods_name: '商品名称',
            tagList: [],
            linkPage: 'goods',
            linkPageLabel: '商品'
          }
        ]
      })
    },
    handleDelete(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          if (this.activeElement.data.length > 1) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1个商品')
          }
        }
      })
    },
    deleteItem(i, idex) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商品？',
        onOk: () => {
          if (this.activeElement.data[i].data.length > 1) {
            this.activeElement.data[i].data.splice(idex, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1个商品')
          }
        }
      })
    },
    async handleClickPickerGoods(item, index, sindex) {
      const { data } = await this.$picker('path', {
        data: JSON.parse(JSON.stringify(item)),
        filterMenu: ['goods'],
        activeKey: 'goods_id'
      })
      const { goods_id, itemId, pics, price, item_name, linkPage, linkPageLabel } = data
      const goodsData = {
        goods_id,
        itemId,
        goods_pic: pics.length > 0 ? pics[0] : '',
        price: price,
        goods_name: item_name,
        linkPage,
        linkPageLabel
      }
      this.$set(this.activeElement.data[index].data, sindex, goodsData)
    },
    onChangePath(data, index) {
      const goodsData = data.map((item) => {
        const { goods_id, itemId, pics, price, item_name, linkPage, linkPageLabel } = item
        return {
          goods_id,
          itemId,
          goods_pic: pics.length > 0 ? pics[0] : '',
          price: price,
          goods_name: item_name,
          linkPage,
          linkPageLabel
        }
      })
      this.activeElement.data[index].data = goodsData
    }
  }
}
</script>
