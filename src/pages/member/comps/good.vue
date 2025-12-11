/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="good">
    <SpImg class="spimg" :src="item.item_image" no-size @click="handelClick(item.item_id)"/>
    <div class="text" v-show="haveName">
      <span @click="handelClick(item.item_id)">{{item.item_name}}</span>
    </div>
    <div class="price">
      ￥{{item.price|formatPriceToHundred}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
    haveName:{
      type: Boolean,
      default: false,
    },
  },
  computed: {
   
	},
	methods:{
	
    handelClick(id){
      this.$router.push(`/items/${id}`)
    }
	}
}
</script>

<style lang="scss" scoped>
.good {
  
  .spimg {
    width: 128px;
		height: 128px;
    // border-radius:5px ;
    cursor: pointer;
  }
  .text {
    // width: 200px;
    cursor: pointer;
    text-align: center;
    span {
      display: inline-block;
      width: 140px;
    }
  }
  .price{
    margin-top:14px;
    font-size: 12px;
    // font-weight: bold;
    // color: $color-brand-primary;
  }
}
</style>