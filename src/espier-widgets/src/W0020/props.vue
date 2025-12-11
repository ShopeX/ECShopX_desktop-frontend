/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-W0020-props {
  .wgt-props {
    display: flex;
    align-items: center;
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
  <div class="widget-W0020-props">
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
          <attrField label="标题位置：">
            <RadioGroup v-model="activeElement.titleAlign">
              <Radio label="left">
                <span>居左</span>
              </Radio>
              <Radio label="center">
                <span>居中</span>
              </Radio>
              <Radio label="right">
                <span>居右</span>
              </Radio>
            </RadioGroup>
          </attrField>
          <div class="division"></div>
          <attrField label="隐藏标题：">
            <iSwitch size="small" v-model="activeElement.wgtHiddenTitle" />
          </attrField>
          <div class="division"></div>
          <attrField label="标题背景：">
            <iSwitch size="small" v-model="activeElement.titleBackground" />
          </attrField>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtTitleFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtTitleColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtBackgroundColor1"></color-picker>
            <color-picker v-model="activeElement.wgtBackgroundColor2"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="商铺列表">
          <div class="division"></div>
          <attrField :width="100" label="隐藏未选择商品：">
            <iSwitch size="small" v-model="activeElement.wgtHideUnselectedItems" />
          </attrField>
          <div
            v-model="activeElement.data"
            v-for="(shop, i) in activeElement.data"
            :key="i"
            style="margin-top: 10px"
          >
            <Collapse>
              <Panel :name="i.toString()">
                商铺{{ i + 1 + '  :  ' + shop.shop_name }}
                <div slot="content">
                  <shopBind
                    :shopOnChange="shopOnChange.bind(this, i)"
                    style="width: 100%; margin: 0 auto"
                  ></shopBind>
                  <div class="tip">顶部图片 图片分辨率：538px * 96px</div>
                  <div class="division"></div>
                  <dataBind
                    :imgData="shop.shop_pic"
                    :pathData="shop.pathData"
                    :imgOnChange="handleImgOnChange.bind(this, i)"
                    :pathOnChange="handlePathOnChange.bind(this, i)"
                  >
                  </dataBind>
                  <div class="division"></div>
                  <div class="tip">上下拖动图片可以改变商品排序</div>
                  <div class="tip">点击图片可以选择商品</div>
                  <ul>
                    <draggable
                      v-model="activeElement.data[i].goods_list"
                      class="list-group"
                      ghost-class="ghost"
                    >
                      <li
                        class="wgt-props"
                        v-for="(item, index) in shop.goods_list"
                        :key="`wgt-propsitem__${index}`"
                      >
                        <div
                          class="wgt-props_img"
                          @click="handleClickPickerGoods(shop, item, i, index)"
                        >
                          <img :src="item.goods_pic" />
                        </div>
                        <div class="wgt-props_content">
                          <h4 class="title">{{ item.goods_name }}</h4>
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
import { panelBar, attrField, dataBind, colorPicker, shopBind } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0020Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    colorPicker,
    basicSet,
    shopBind
  },
  methods: {
    // 删除商铺
    deleteSop(index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商铺？',
        onOk: () => {
          if (this.activeElement.data.length > 0) {
            this.activeElement.data.splice(index, 1)
            this.$Message.success('删除成功！')
          }
        }
      })
    },
    // 删除商品
    deleteItem(i, index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商品？',
        onOk: () => {
          if (this.activeElement.data.length > 0) {
            this.activeElement.data[i].goods_list.splice(index, 1)
            this.$Message.success('删除成功！')
          }
        }
      })
    },
    // 商品顶部图片改变
    handleImgOnChange(index, item) {
      this.activeElement.data[index].shop_pic = item
    },
    //商品顶部路径改变
    handlePathOnChange(index, item) {
      this.activeElement.data[index].dataPath = item
    },
    async handleClickPickerGoods(shop, item, dix, index) {
      if (shop.shop_id == '') {
        this.$Message.error('请先选择商铺')
        return
      }
      const { data } = await this.$picker('shop-goods', {
        data: JSON.parse(JSON.stringify(item)),
        shop: shop
      })
      const { goods_id, itemId, pics, price, item_name, linkPage, linkPageLabel, market_price } =
        data
      const goodsData = {
        goods_id,
        itemId,
        goods_pic: pics.length > 0 ? pics[0] : '',
        price: price,
        goods_name: item_name,
        linkPage,
        linkPageLabel
      }
      console.log(data)
      this.$set(this.activeElement.data[dix].goods_list, index, goodsData)
    },
    shopOnChange(index, data) {
      const { distributor_id, company_id, name, address, logo, banner, tagList } = data

      let shopData = {
        shop_id: distributor_id,
        shop_pic: '',
        pathData: {},
        shop_name: name,
        logo: logo,
        banner: banner,
        tag_list: tagList.length > 2 ? tagList.slice(0, 2) : tagList,
        goods_list: [
          {
            goods_id: '',
            goods_pic: '',
            price: 1799.0,
            goods_name: '商品名1',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799.0,
            goods_name: '商品名2',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          },
          {
            goods_id: '',
            goods_pic: '',
            price: 1799.0,
            goods_name: '商品名3',
            pathData: {},
            linkPage: '',
            linkPageLabel: '商品'
          }
        ]
      }
      this.$set(this.activeElement.data, index, shopData)
    }
  }
}
</script>
