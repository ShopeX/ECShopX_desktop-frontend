/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0002-props {
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
  <div class="widget-w0002-props">
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
          <div class="division"></div>
          <attr-field label="价格字体：">
            <InputNumber
              v-model="activeElement.wgtPriceFontSize"
              size="small"
              :min="0"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="价格颜色：">
            <color-picker v-model="activeElement.wgtPriceColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="跳转路径：" labelTop v-if="activeElement.showMore">
            <dataBind v-model="activeElement.moreLinkData" :imgPicker="false"></dataBind>
          </attr-field>
        </panelBar>
        <panelBar title="商品配置">
          <attr-field label="选择商品：">
            <dataBind
              :value="activeElement.data"
              :imgPicker="false"
              :filterMenu="['goods']"
              :multiple="true"
              :customPath="false"
              @pathOnChange="onChangePath"
              activeKey="goods_id"
              placeholder="选择商品"
            ></dataBind>
          </attr-field>
          <div class="tip">图片分辨率：300px * 300px</div>
          <div class="tip">上下拖动图片可以改变排序</div>
          <ul>
            <draggable v-model="activeElement.data" class="list-group" ghost-class="ghost">
              <li
                class="wgt-props"
                v-for="(item, index) in activeElement.data"
                :key="`wgt-propsitem__${index}`"
              >
                <div class="wgt-props_img" @click="handleClickPickerGoods(item, index)">
                  <img :src="item.goods_pic" />
                </div>
                <div class="wgt-props_content">
                  <h4 class="title">{{ item.goods_name }}</h4>
                </div>
                <div class="wgt-props_delete" @click="deleteItem(index)">
                  <i class="mshopdesign icon-shanchu"></i>
                </div>
              </li>
            </draggable>
          </ul>
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
  name: 'W0002Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    // goodsPrice,
    colorPicker,
    basicSet
  },
  methods: {
    // 删除商品
    deleteItem(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商品？',
        onOk: () => {
          if (this.activeElement.data.length > 0) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
          }
        }
      })
    },
    handleChangeColumn(val) {
      this.column = val
      this.activeElement.columnStyle = val
    },
    async handleClickPickerGoods(item, index) {
      const { data } = await this.$picker('path', {
        data: JSON.parse(JSON.stringify(item)),
        filterMenu: ['goods'],
        activeKey: 'goods_id'
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
        linkPageLabel,
        market_price
      }
      // this.activeElement.data[index] = res.data
      this.$set(this.activeElement.data, index, goodsData)
    },
    onChangePath(data) {
      const goodsData = data.map((item) => {
        const { goods_id, itemId, pics, price, item_name, linkPage, linkPageLabel, market_price } =
          item
        return {
          goods_id,
          itemId,
          goods_pic: pics.length > 0 ? pics[0] : '',
          price: price,
          goods_name: item_name,
          linkPage,
          linkPageLabel,
          market_price
        }
      })
      this.activeElement.data = goodsData
    }
  }
}
</script>
