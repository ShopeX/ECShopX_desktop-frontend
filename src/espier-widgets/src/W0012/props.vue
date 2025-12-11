/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-w0012-props {
  .point-style {
    .attr-field__label {
      margin-top: 30px;
    }
  }
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .style-picker {
    display: flex;
    flex-wrap: wrap;
  }
  .goods-con {
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
          object-fit: cover;
        }
      }
      &_delete {
        flex: 0;
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
  }

  .coupon-con {
    .wgt-props {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .img-picker {
        width: 80px;
        height: 80px;
      }
      &_img {
        margin-right: 10px;
      }
    }
  }
  .picker-coupon__btn {
    position: relative;
    .icon-delete1 {
      position: absolute;
      right: -6px;
      top: -8px;
      z-index: 800;
      color: #3091f2;
      cursor: default;
    }
  }
}
</style>

<template>
  <div class="widget-w0012-props">
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
          <attr-field label="副标题：">
            <Input v-model="activeElement.subTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="链接：" labelTop>
            <dataBind v-model="activeElement.linkPath" :imgPicker="false"></dataBind>
          </attr-field>
        </panelBar>
        <panelBar title="排版">
          <attr-field label="样式：" labelTop>
            <select-picker
              :data="styleList"
              v-model="activeElement.styleType"
              label="label"
              icon="img"
            ></select-picker>
          </attr-field>
        </panelBar>
        <panelBar :title="styleTitle">
          <!-- 橱窗一 -->
          <div v-if="activeElement.styleType == 0">
            <template v-for="(item, index) in activeElement.data[0]">
              <dataBind
                :imgData="activeElement.data[0][index].imgUrl"
                :pathData="activeElement.data[0][index].pathData"
                :key="`path-item-0-0__${index}`"
                :imgOnChange="handleImgOnChange.bind(this, 0, index)"
                :pathOnChange="handlePathOnChange.bind(this, 0, index)"
              >
              </dataBind>
              <div class="division" :key="`path-item-0-1__${index}`"></div>
            </template>
          </div>

          <!-- 橱窗二 -->
          <div v-if="activeElement.styleType == 1">
            <template v-for="(item, index) in activeElement.data[1]">
              <dataBind
                :imgData="activeElement.data[1][index].imgUrl"
                :pathData="activeElement.data[1][index].pathData"
                :key="`path-item-1-0__${index}`"
                :imgOnChange="handleImgOnChange.bind(this, 1, index)"
                :pathOnChange="handlePathOnChange.bind(this, 1, index)"
              >
              </dataBind>
              <div class="division" :key="`path-item-1-1__${index}`"></div>
            </template>
          </div>

          <!-- 橱窗三 -->
          <div v-if="activeElement.styleType == 2">
            <template v-for="(item, index) in activeElement.data[2]">
              <dataBind
                :imgData="activeElement.data[2][index].imgUrl"
                :pathData="activeElement.data[2][index].pathData"
                :key="`path-item-2-0__${index}`"
                :imgOnChange="handleImgOnChange.bind(this, 2, index)"
                :pathOnChange="handlePathOnChange.bind(this, 2, index)"
              >
              </dataBind>
              <div class="division" :key="`path-item-2-1__${index}`"></div>
            </template>
          </div>

          <!-- 商品 -->
          <div v-if="activeElement.styleType == 3">
            <Button type="primary" style="width: 100%; margin: 0 auto" @click="handleAddGoods"
              >添加商品</Button
            >
            <div class="division"></div>
            <div v-for="(tab, i) in activeElement.data[3]" :key="i" style="margin-bottom: 10px">
              <Collapse>
                <Panel :name="i.toString()">
                  {{ `商品组${i + 1}` }}
                  <span class="delete-btn">
                    <Icon type="ios-trash-outline" size="16" @click.stop="handleDeleteGoods(i)" />
                  </span>
                  <div slot="content">
                    <attr-field label="选择商品：">
                      <dataBind
                        v-model="tab.data"
                        :imgPicker="false"
                        :filterMenu="['goods']"
                        :multiple="true"
                        :customPath="false"
                        @pathOnChange="(data) => onChangePath(data, i)"
                        activeKey="goods_id"
                        placeholder="选择商品"
                      ></dataBind>
                    </attr-field>
                    <div class="division"></div>
                    <ul class="goods-con">
                      <template v-for="(val, index) in tab.data">
                        <li class="wgt-props" :key="index">
                          <div class="wgt-props_img" @click="handleClickPickerGoods(val, i, index)">
                            <img :src="val.goods_pic" />
                          </div>
                          <div class="wgt-props_content">
                            <h4 class="title">{{ val.goods_name }}</h4>
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>

          <!-- 优惠券 -->
          <div v-if="activeElement.styleType == 4">
            <Button type="primary" style="width: 100%; margin: 0 auto" @click="handleAddCoupon"
              >添加优惠券</Button
            >
            <div class="division"></div>
            <div v-for="(tab, i) in activeElement.data[4]" :key="i" style="margin-bottom: 10px">
              <Collapse>
                <Panel :name="i.toString()">
                  {{ `优惠券组${i + 1}` }}
                  <span class="delete-btn">
                    <Icon type="ios-trash-outline" size="16" @click.stop="handleDeleteCoupon(i)" />
                  </span>
                  <div slot="content">
                    <attr-field label="优惠券：">
                      <div class="picker-coupon__btn">
                        <SpIcon icon="icon-delete1" @click.native.stop="handleDeletePath"></SpIcon>
                        <div class="data-bind__path-con" @click="handleSelectCouponPicker(tab, i)">
                          <i class="mshopdesign icon-editor-link"></i>
                          <span class="text">{{ `${tab.data.length}张` }}</span>
                        </div>
                      </div>
                    </attr-field>
                    <div class="division"></div>
                    <ul class="coupon-con">
                      <template v-for="(val, index) in tab.data">
                        <li class="wgt-props" :key="index" v-if="val.title">
                          <div class="wgt-props_img">
                            <imgPicker v-model="val.imgUrl" :path="false" />
                          </div>
                          <div class="wgt-props_content">
                            <h4 class="title">{{ `优惠券：${val.title}` }}</h4>
                          </div>
                        </li>
                      </template>
                    </ul>
                  </div>
                </Panel>
              </Collapse>
            </div>
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
import { panelBar, attrField, dataBind, imgPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
import selectPicker from '../../common/select-picker'
import img10 from './img/10.png'
import img11 from './img/11.png'
import img12 from './img/12.png'
import img13 from './img/13.png'
import img14 from './img/14.png'
export default {
  name: 'W0012Props',
  props: ['activeElement'],
  data() {
    return {
      test: '',
      styleList: [
        { img: img10, label: '橱窗一', value: 0 },
        { img: img11, label: '橱窗二', value: 1 },
        { img: img12, label: '橱窗三', value: 2 },
        { img: img13, label: '商品', value: 3 },
        { img: img14, label: '优惠券', value: 4 }
      ]
    }
  },
  computed: {
    styleTitle() {
      const fd = this.styleList.find((item) => item.value == this.activeElement.styleType)
      return fd ? fd.label : ''
    }
  },
  components: {
    panelBar,
    attrField,
    basicSet,
    dataBind,
    selectPicker,
    imgPicker
  },
  methods: {
    // 图片改变
    handleImgOnChange(didx, index, item) {
      this.activeElement.data[didx][index].imgUrl = item
    },
    handlePathOnChange(didx, index, item) {
      this.activeElement.data[didx][index].pathData = item
    },
    // 添加商品组
    handleAddGoods() {
      if (this.activeElement.data[3].length < 4) {
        this.activeElement.data[3].push({
          type: 'goods',
          data: [
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            },
            {
              goods_id: '',
              goods_pic: '',
              price: 0,
              goods_name: '商品名称',
              linkPage: 'goods',
              linkPageLabel: '商品'
            }
          ]
        })
      } else {
        this.$Message.error('最多添加4组商品')
      }
    },
    // 删除商品组
    handleDeleteGoods(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          if (this.activeElement.data[3].length > 1) {
            this.activeElement.data[3].splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1组商品')
          }
        }
      })
    },
    // 选择商品
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
      this.$set(this.activeElement.data[3][index].data, sindex, goodsData)
    },
    // 添加优惠券组
    handleAddCoupon() {
      if (this.activeElement.data[4].length < 3) {
        this.activeElement.data[4].push({
          type: 'coupon',
          data: []
        })
      } else {
        this.$Message.error('最多添加3组优惠券')
      }
    },
    // 删除优惠券组
    handleDeleteCoupon(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          if (this.activeElement.data[4].length > 1) {
            this.activeElement.data[4].splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1组优惠券')
          }
        }
      })
    },
    // 选择优惠券
    async handleSelectCouponPicker(item, index) {
      const res = await this.$picker('coupon', {
        data: JSON.parse(JSON.stringify(item)),
        multiple: true
      })
      if (res.data.length > 3) {
        this.$Message.error('最多选择3张优惠券')
      } else {
        const _data = res.data.map((item) => {
          return {
            ...item,
            imgUrl: ''
          }
        })
        this.activeElement.data[4][index].data = _data
      }
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
      this.activeElement.data[3][index].data = goodsData
    }
  }
}
</script>
