/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-W0018-props {
  .point-style {
    .attr-field__label {
      margin-top: 30px;
    }
  }
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="widget-W0018-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
        style="overflow: auto"
      >
        <panelBar title="基本设置">
          <attr-field label="主标题：">
            <Input v-model="activeElement.mainTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="自动播放：">
            <iSwitch size="small" v-model="activeElement.autoplay" />
            <!-- <RadioGroup v-model="activeElement.autoplay">
              <Radio :label="true">是</Radio>
              <Radio :label="false">否</Radio>
            </RadioGroup> -->
          </attr-field>
          <div class="division"></div>
          <attr-field label="延时时间：">
            <InputNumber v-model="activeElement.autoplaySpeed" size="small" :min="0"></InputNumber>
          </attr-field>
        </panelBar>
        <panelBar title="指示点">
          <attr-field label="样式：">
            <Select v-model="activeElement.styleType" size="small" label-in-value>
              <Option
                v-for="item in styleList"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              >
                <img :src="item.img" alt width="24" />
                <div>{{ item.label }}</div>
              </Option>
            </Select>
          </attr-field>
          <div class="division"></div>
          <attr-field label="位置：">
            <RadioGroup v-model="activeElement.pointAlign">
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
          </attr-field>
          <div class="division"></div>
          <!-- <attr-field label="选中：">
            <color-picker v-model="activeElement.pointDefaultColor"></color-picker>
          </attr-field> -->

          <attr-field label="选中：" labelTop>
            <iSwitch size="small" v-model="activeElement.customerThemeEnabled" />
            <div class="division"></div>
            <color-picker v-model="activeElement.pointActiveColor"></color-picker>
          </attr-field>

          <div class="division"></div>
          <attr-field label="默认：">
            <color-picker v-model="activeElement.pointDefaultColor"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="字体设置">
          <attr-field label="标题字体：">
            <InputNumber
              v-model="activeElement.wgtTitleFontSize"
              size="small"
              :min="0"
              :max="27"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题颜色：">
            <color-picker v-model="activeElement.wgtTitleColor"></color-picker>
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
          <attr-field label="保留小数：">
            <InputNumber
              v-model="activeElement.wgtToFixed"
              size="small"
              :min="0"
              :max="2"
            ></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="价格颜色：">
            <color-picker v-model="activeElement.wgtPriceColor"></color-picker>
          </attr-field>
        </panelBar>
        <panelBar title="商品列表">
          <Button type="primary" @click="handleAdd" style="width: 100%; margin: 0 auto"
            >添加标签商品</Button
          >
          <div v-for="(item, i) in activeElement.data" :key="i" style="margin-top: 10px">
            <Collapse>
              <Panel :name="i.toString()">
                标签{{ Number(i) + 1 }}
                <span class="delete-btn">
                  <Icon type="ios-trash-outline" size="16" @click.stop="handleDelete(i)" />
                </span>
                <div slot="content">
                  <!-- {{item.pathData}} -->
                  <div class="division"></div>
                  <attr-field label="选择商品：">
                    <dataBind
                      :value="item.data"
                      :imgPicker="false"
                      :filterMenu="['goods']"
                      :multiple="true"
                      :customPath="false"
                      @pathOnChange="(data) => onChangePath(data, i)"
                      activeKey="goods_id"
                      placeholder="选择商品"
                    ></dataBind>
                  </attr-field>
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
import { panelBar, attrField, colorPicker, dataBind } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0018Props',
  props: ['activeElement'],
  data() {
    return {
      data: {},
      test: '',
      styleList: [
        { img: require('./img/11.png'), label: '样式一', value: 'style1' },
        { img: require('./img/22.png'), label: '样式二', value: 'style2' },
        { img: require('./img/33.png'), label: '样式三', value: 'style3' },
        { img: require('./img/44.png'), label: '样式四', value: 'style4' },
        { img: require('./img/55.png'), label: '样式五', value: 'style5' }
      ]
    }
  },
  components: {
    panelBar,
    attrField,
    colorPicker,
    basicSet,
    dataBind
  },
  methods: {
    change() {},
    handleAdd() {
      console.log('this.activeElement', this.activeElement)
      if (this.activeElement.data.length < 5) {
        this.activeElement.data.push({
          data: [
            {
              goods_id: '',
              goods_pic: '',
              price: 1231,
              market_price: 3333,
              goods_name: '流行饰品1',
              brief: '璀璨夺目甄选好礼',
              tagList: [],
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 4234,
              market_price: 3333,
              goods_name: '大牌腕表2',
              brief: '璀璨夺目甄选好礼',
              tagList: [],
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 68.9,
              market_price: 3333,
              goods_name: '眼镜烟具3',
              brief: '璀璨夺目甄选好礼',
              tagList: [],
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 220,
              market_price: 3333,
              goods_name: '黄金珠宝4',
              brief: '璀璨夺目甄选好礼',
              tagList: [],
              linkPage: 'goods',
              linkPageLabel: '商品'
            }
          ]
        })
      } else {
        this.$Message.error('最多只能添加5组商品列表')
      }
    },
    handleDelete(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商品列表？',
        onOk: () => {
          if (this.activeElement.data.length > 1) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1组商品列表')
          }
        }
      })
    },
    handleImgOnChange(idx, item) {
      this.activeElement.data[idx].imgUrl = item
    },
    handlePathOnChange(idx, item) {
      this.activeElement.data[idx].pathData = item
    },
    onChangePath(data, index) {
      const goodsData = data.map((item) => {
        const {
          goods_id,
          itemId,
          pics,
          price,
          item_name,
          linkPage,
          linkPageLabel,
          title,
          brief,
          market_price
        } = item
        return {
          goods_id,
          itemId,
          goods_pic: pics.length > 0 ? pics[0] : '',
          price: price,
          goods_name: item_name,
          linkPage,
          title,
          brief,
          market_price,
          linkPageLabel
        }
      })
      this.activeElement.data[index].data = goodsData
    }
  }
}
</script>
