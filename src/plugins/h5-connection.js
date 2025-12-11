/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

const h5Routes = [{
  title: '首页',
  url: '/pages/index/index'
},
{
  title: '商品列表',
  url: '/pages/item/list'
},
{
  title: '商品详情',
  url: '/pages/item/detail'
},
{
  title: '购物车',
  url: '/pages/cart/index'
},
{
  title: '资讯',
  url: '/pages/article/index'
},
{
  title: '登录',
  url: '/pages/auth/login'
},
{
  title: '注册',
  url: '/pages/auth/reg'
},
{
  title: '会员中心',
  url: '/pages/member/index'
},
{
  title: '法国工艺',
  url: 'pages/technology/index'
},
{
  title: '经典传承',
  url: 'pages/story/index'
},
{
  title: '品牌资讯',
  url: 'pages/news/index'
},
{
  title: 'lookbook',
  url: 'pages/frenchstyle/index'
}]

function navigateH5 () {
  this.$route
}

function registerRoutes () {
  Vue.prototype.$navigateH5 = navigateH5
}

Vue.use(registerRoutes)