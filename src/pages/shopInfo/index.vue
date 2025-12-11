/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./index.scss"></style>

<template>
  <div class="page-item-detail">
    <div class="container">
      <!-- logo区域 -->
      <div class="content-top">
        <div>
          <img :src="logoUrl" alt="" class="logo-img" />
        </div>
        <div class="top-info">
          <div style="display: flex; align-items: center;">
            <div class="shop-name">{{ $t('shopInfo.index.513870-0') }}{{ storeInfo.store_name || '' }}</div>
            <div @click="collectionClick">
              <i class="ec-icon ec-icon-favor_light left-icon"  v-if="iconShow"></i>
              <i class="ec-icon ec-icon-favorfill color-icom"  v-else></i>
              <span class="words-color"> {{followStore}}</span>
            </div>
          </div>
          <div class="words-color">{{ $t('shopInfo.index.513870-1') }}{{ storeInfo.store_address || '' }}</div>
          <div class="words-color" style="margin-top: 8px;">
            {{ $t('shopInfo.index.513870-2') }}{{ storeInfo.introduce || '' }}
          </div>
        </div>
      </div>
      <!-- 商品分类 -->
      <div class="content-middle">
        <div class="sort-title">•&nbsp;&nbsp; 商品分类 &nbsp;&nbsp; •</div>
        <div>
          <GoodSort
            :data="sorts"
            :value="sort"
            :total="total"
            @change="changeSort"
            @change-price="changeSortPrice"
            @search-keyword="search"
          >
          </GoodSort>
        </div>
      </div>
      <!-- 下面区域 -->
      <div class="content-bottom">
        <div class="goods-sort">
          <div class="list-boby">
            <ul>
              <li v-for="(item, index) of menu" :key="index" >
                <div class="content-icon" @click="showNextClick(index,item.category_id)">
                  <div >{{ item.category_name }}</div>
                  <div>
                    <i v-if="!item.listShow" class="ec-icon ec-icon-unfold"></i>
                    <i v-else class="ec-icon ec-icon-fold"></i>
                  </div>
                </div>
                <div class="list-boby-next" v-show="item.listShow && item.children.length > 0">
                  <ul>
                    <li v-for="(e, ind) of item.children" :key="ind">
                      <div class="next-menu" @click="showTwoClick(index, ind,e.category_id)">
                        <div>{{ e.category_name }}</div>
                        <div>
                          <i v-if="!e.listShow" class="ec-icon ec-icon-unfold"></i>
                          <i v-else class="ec-icon ec-icon-fold"></i>
                        </div>
                      </div>
                      <div class="three-menu" v-show="e.listShow && e.children.length > 0">
                        <ul>
                          <li v-for="(threeMenu, x) of e.children" :key="x" @click="threeMenuClick(threeMenu.category_id)">
                            {{ threeMenu.category_name }}
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 右边区域 -->
        <div class="cotent-right" v-if="total > 0">
          <!-- 商品信息 -->
          <div class="right-imgs">
            <div class="right-list" v-for="(item, index) in storeShopsInfo" :key="index">
              <div class="list-img">
                <div class="show-img">
                  <img class="show-img" :src="item.lgImgUrl" alt="" />
                </div>
                <div class="imgsInfo-list">
                  <div v-for="(itm, i) of item.pics" :key="i" @click="updateImg(index, itm)">
                    <img :src="itm" alt="" class="imgs-info" />
                  </div>
                </div>
              </div>
              <div>
                <div class="price">￥{{ item.price || '' }}</div>
                <div class="introduce">
                  {{ item.item_name || '' }}
                </div>
              </div>
              <div class="imgs-btn" @click="addClick(item)">{{ $t('shopInfo.index.513870-4') }}</div>
            </div>
          </div>
          <div class="pagination-wrap">
            <SpPagination
              :total="total"
              :pageSize="pageSize"
              :current="page"
              @on-change="changePage"
            />
          </div>
        </div>
        <div class="cotent-right" v-else>
          <div class="content-nothing">{{ $t('shopInfo.index.513870-5') }}</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="popup" v-if="popupShow">
      <div class="popup-item">
        <div class="item-top">
          <div class="item-top-content">{{ $t('shopInfo.index.513870-6') }}</div>
          <div @click="closeClick">
            <i class="ec-icon ec-icon-close"></i>
          </div>
        </div>
        <div class="item-center">
          <div class="item-center-content">
            <div class="content-list" v-for="(item, n) of itemInfo" :key="n">
              <div class="list-title">{{ item.spec_name }}</div>
              <div class="list-lable">
                <div
                  :class="val.selectShow ? 'select-content ': 'list-content'"
                  v-for="(val, x) of item.spec_values"
                  :key="x"
                  @click="selectClick(n,x)"
                >
                  {{ val.spec_custom_value_name||val.spec_value_name }}
                </div>
              </div>
            </div>
          </div>
          <div class="item-center-number">
            <div class="number-title">{{ $t('shopInfo.index.513870-7') }}</div>
            <div class="number-lable">
              <div>
                <input type="number"  min=0 v-model="carNumber"/>
              </div>
              <div class="lable-btn">
                <div class="btn-box" style="border-bottom: 1px solid #dddddd;" @click="numberClick(0)">
                  <i class="ec-icon ec-icon-fold icon-style" ></i>
                </div>
                <div class="btn-box"  @click="numberClick(1)">
                  <i class="ec-icon ec-icon-unfold"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-bottom">
          <button class="car-btn" @click="addCat">{{ $t('shopInfo.index.513870-4') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodSort from '../pointitems/comps/goods-sort'


export default {
  async asyncData({ app, route }) {
    const { item_name, distributor_id } = route.query

    const val = await app.$api.shop.getShop({ distributor_id: distributor_id })
    const params = {
      distributor_id: val.distributor_id,
      company_id: val.company_id
    }
    const res = await app.$api.item.getStoreClassify(params)
    if (res) {
      res.forEach((element) => {
        element.listShow = false

        if (element.children.length > 0) {
          element.children.forEach((item) => {
            item.listShow = false
          })
        }
      })
    }
    // 商品信息
    const param = {
      page: 1,
      pageSize: 16,
      distributor_id: val.distributor_id,
      
    }
    const storeShopsInfo = await app.$api.item.list(param)
    console.log(storeShopsInfo);
    storeShopsInfo.list.forEach((item) => {
      item.pics = JSON.parse(item.pics)
      if (item.pics.length > 4) {
        let arr = []
        arr.push(item.pics[0])
        arr.push(item.pics[1])
        arr.push(item.pics[2])
        arr.push(item.pics[3])
        item.pics = arr
      }
      item.lgImgUrl = item.pics[0]
    })

    return {
      menu: res,
      storeInfo: val,
      logoUrl: val.logo,
      storeShopsInfo: storeShopsInfo.list,
      total: storeShopsInfo.total_count - 0
    }
  },
  components: {
    GoodSort
  },
  data() {
    return {
      sorts: [
        { label: this.$t('shopInfo.index.513870-8'), value: 'all' },
        { label: this.$t('shopInfo.index.513870-9'), value: '1' },
        { label: this.$t('shopInfo.index.513870-10'), value: '4' },
        { label: this.$t('shopInfo.index.513870-11'), value: '2' },
        { label: this.$t('shopInfo.index.513870-12'), value: '3' }
      ],
      sort: 'all',
      total: 0,
      page: 1,
      pageSize: 16,
      popupShow: false,
      menu: null,
      storeInfo: null,
      logoUrl: '',
      storeShopsInfo: [],
      itemInfo: null,
      addCarInfo:null,
      carNumber:0,
      iconShow: true,
      followStore:this.$t('shopInfo.index.513870-13'),
      keywords:'',
      goodsSort: '',
      main_category: 0
    }
  },
  methods: {
    //商店列表
    async getStoreShopsInfo(){
      const param = {
        page: this.page,
        pageSize: this.pageSize,
        distributor_id: this.storeInfo.distributor_id,
        item_type: 'normal',
        keywords: this.keywords || '',//搜索关键词
        item_name: '',//商品名称
        main_category: this.main_category|| 0,//主类目ID
        brand_id: 0,//品牌ID
        goodsSort: 0,//排列方式
        start_price: 0,//最小金额
        end_price: 0,//最大金额
        is_tdk: 1,
        type: 0,
        goodsSort: this.goodsSort
      }
      const storeShopsInfo = await this.$api.item.list(param)
      storeShopsInfo.list.forEach((item) => {
        item.pics = JSON.parse(item.pics)
        if (item.pics.length > 4) {
          let arr = []
          arr.push(item.pics[0])
          arr.push(item.pics[1])
          arr.push(item.pics[2])
          arr.push(item.pics[3])
          item.pics = arr
        }
        item.lgImgUrl = item.pics[0]
      })
      this.storeShopsInfo = storeShopsInfo.list
      this.total = storeShopsInfo.total_count - 0
    },
    // 收藏商店
    async collectionClick(){
      if( this.iconShow){
        this.iconShow = false
        this.followStore = this.$t('shopInfo.index.513870-14')
        const data = await this.$api.member.addCollectionStore(this.storeInfo.distributor_id)
        if(data){
          this.$Message.success(this.$t('shopInfo.index.513870-15'))
        }
      }else{
        this.iconShow = true
        this.followStore = this.$t('shopInfo.index.513870-16')
        const data = await this.$api.member.removeCollectionStore(this.storeInfo.distributor_id)
        if(data){
          this.$Message.success(this.$t('shopInfo.index.513870-17'))
        }
      }
      
    },
    // 获取商品详情
    async getItemInfo(item_id, distributor_id) {

      const data = await this.$api.item.detail(item_id, {
        distributor_id
        // is_tdk: 1
      })
      data.item_spec_desc.forEach(item=>{
        item.spec_values.forEach( e=>{
          e.selectShow = false
        })
      })
      this.itemInfo = data.item_spec_desc
      this.addCarInfo = data
    },
    // 排序选择功能
    changeSort(val) {
      this.page = 1
      this.sort = val
      this.goodsSort = val == 'all' ? '' : val
      this.getStoreShopsInfo()
    },
    // 价格
    changeSortPrice(start_price, end_price) {
      this.start_price = start_price
      this.end_price = end_price
    },
    // 店铺搜索
    search(keywords) {
      this.page = 1
      this.keywords = keywords
      this.main_category = 0
      this.getStoreShopsInfo()

    },
    // 分页
    changePage(val) {
      this.page = val
      this.getStoreShopsInfo()
    },
    // 弹窗
    addClick(obj) {
      const user = this.$store.state.user.userInfo
      this.addCarInfo = ''
      this.carNumber = 0
      if (user) {
        this.popupShow = true
        
        /* obj.item_id = 529
        obj.distributor_id = 35 */
        this.getItemInfo(obj.item_id, obj.distributor_id)
      } else {
        this.$router.push({
          path: '/auth/login'
        })
      }
    },
   
    // 展开二级菜单
    showNextClick(index,id) {
      this.menu[index].listShow = !this.menu[index].listShow
      if(this.menu[index].children.length == 0){
        this.page = 1
        this.main_category = id
        this.getStoreShopsInfo()
      }
      // this.listShow = !this.listShow
    },
    
    //展开三级菜单
    showTwoClick(index, ind) {
      this.menu[index].children[ind].listShow = !this.menu[index].children[ind].listShow
      if(this.menu[index].children[ind].children.length == 0){
        this.page = 1
        this.main_category = id
        this.getStoreShopsInfo()
      }
    },
    //商品分类点击搜索
     threeMenuClick(id){
      this.page = 1
      this.main_category = id
      this.getStoreShopsInfo()
    },

    closeClick() {
      this.popupShow = false
      this.carNumber = 0
    },
    // 更改图片
    updateImg(i, val) {
      this.storeShopsInfo[i].lgImgUrl = val
    },
    // 选择型号
    selectClick(n,x) {
      this.itemInfo[n].spec_values[x].selectShow = !this.itemInfo[n].spec_values[x].selectShow
      this.itemInfo[n].spec_values.forEach(( item ,index)=> {
        if(index != x){
          item.selectShow = false
        }
      })

    },
    // 数量
    numberClick(index){
      if(index == 0){
        this.carNumber++
      }
      if(index == 1 && this.carNumber > 0){
        this.carNumber--
      }
    },

    // 添加到购物车
    async addCat(){
      let params ={}
      if(this.addCarInfo.nospec ){
         if(  this.carNumber > 0 ){
           params = {
            item_id: this.addCarInfo.item_id,
            num: this.carNumber,
            shop_type: 'distributor',
            distributor_id: this.addCarInfo.distributor_id
          }
         } else {
          this.$Message.error(this.$t('shopInfo.index.513870-18'))
            return

        }
      }
      if(!this.addCarInfo.nospec){
        
        let arr = []
        this.itemInfo.forEach((item,index) => {
          item.spec_values.forEach((e,n) =>{
            if(e.selectShow){
              let numArr = {
                spec_id: item.spec_id,
                spec_value_id: e.spec_value_id
              }
              arr.push(numArr)
            }
          })
        })
        
        if(this.itemInfo.length > arr.length){
          this.$Message.error(this.$t('shopInfo.index.513870-19'))
          return
        }
        
        let itemId = 0
        arr.forEach(item =>{
          this.addCarInfo.spec_items.forEach(value =>{
            value.item_spec.forEach(element => {
              if( item.spec_id == element.spec_id && item.spec_value_id == element.spec_value_id){
                itemId = value.item_id
              }
            })
          })
        })
         if( this.carNumber > 0){
            params = {
            item_id: itemId,
            num: this.carNumber,
            shop_type: 'distributor',
            distributor_id: this.addCarInfo.distributor_id
          }
         }else{
            this.$Message.error(this.$t('shopInfo.index.513870-18'))
            return
         }
      }
      const data = await this.$api.cart.add(params)
      if(data.is_check_store){
        this.popupShow = false
        this.carNumber = 0
      }

    }
  }
}
</script>
