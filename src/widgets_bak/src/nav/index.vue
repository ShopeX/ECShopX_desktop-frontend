/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.widget-nav {
  .main-nav {
    display: inline-block;
    text-align: left;
    li {
      .sp-link {
        display: inline-block;
        cursor: pointer;
      }
      &.active, &:hover {
        .sp-link {
          border-bottom: 1px solid $color-brand-primary;
        }
      }
      &.no-after {
        &:after {
          opacity: 0;
        }
      }
    }
  }
  .header-bar__menus {
    position: absolute;
    left: 0;
    right: 0;
    background: #fff;
    top: 75px;
  }
  .header-bar__menus-sub-wrap {
    &.container{
      box-sizing: border-box;
      padding: 15px 75px 15px 65px;
    }
    &.sub-menu-container{
      width: 100%;
    }

    &-wrap {
      border-bottom: 2px solid $color-brand-primary;
      position: absolute !important;
      right: 0;
      left: 0;
      background: #fff;
      z-index: 900;
    }
    // .header-bar__menus-sub {
    //     &:nth-child(4),&:nth-child(5){
    //        .m-1 {
    //          &:first-child{
    //           min-width: 100px;
    //          }
    //        }
    //     }
    // }
    .left {
      float: left;
      // width: 10%;
      display: table;
      .has-link {
        cursor: pointer;
      }
      .m-1 {
        display: table-cell;
        height: 100%;
        // padding-right: 40px;
        // min-width: 180px;
        padding-right: 80px;
        min-width: 108px;
        &__title {
          font-size: 14px;
          font-weight: bold;
          text-align: left;
          margin: 0 0 10px;
        }
      }
      .m-2 {
        li {
          margin: 0 0 10px;
          font-size: 14px;
        }
      }
    }
    .right {
      float: right;
      // width: 35%;
      overflow: hidden;
      text-align: right;
      li {
        position: relative;
        display: inline-block;
        margin-left: 20px;
      }
    }
    .menu-img {
      @include pdt-img(200px);
      height: 280px;
      &___desc {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 9px;
        margin: 0 auto;
        width: 155px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border: solid 1px #000000;
        background: rgba(255,255,255, 0.4);
      }
    }
  }

  @include respond(lg){
    .header-bar__menus-sub-wrap {
      padding: 15px 100px;
      &.sub-menu-container{
        width: 1150px;
      }
    }
  }

  @include respond(sm) {
    .main-nav {
      padding-left: 0;
    }
    .menu-1 {
      background: #fff;
      > li {
        a {
          padding-left: 10px;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #cccccc;
        }
      }
      &__1 {
        background: #c6c6c6;
        // display: none;
        a {
          padding-left: 20px !important;
        }
        // &.active {
        //   display: block;
        // }
      }
      &__1-1 {
        // display: none;
        background: #fff;
        // &.active {
        //   display: block;
        // }
        &-a {
          &.active {
            background: $color-brand-primary;
            color: #fff;
          }
        }
        > li:not(:last-child) {
          border-bottom: 1px solid #cccccc;
        }
      }
    }
    .menu-2 {
      background: $color-brand-primary;
      li {
        a {
          display: block;
          color: #fff;
          padding-left: 15px;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #6a6a6a;
        }
      }
    }
    .arrow {
      > a:after {
        font-family: "mb-iconfont" !important;
        float: right;
        margin-top: 0px;
        font-size: 20px;
      }
    }
    .arrow-down {
      > a:after {
        content: "\e75b";
      }
    }
    .arrow-up {
      > a:after {
        content: "\e7c5";
      }
    }
    .arrow-right {
      > a:after {
        content: "\e7c6";
      }
    }
  }
}
</style>

<template>
  <div class="widget-nav" :class="{'widget-nav-bg-white':(sub_index!== null)}">
    <div class="container">
      <ul class="main-nav">
        <li
          v-for="(item, index) in menus"
          :key="index"
          @mouseenter.stop="handleMouseEnter(item, index)"
          @mouseleave.stop="handleMouseLeave"
          :class="{'active' : index == sub_index, 'no-after': hover_index == index + 1}"
        >
          <nuxt-link :to="item.linktarget || item.url" v-if="item.nuxtlink || item.linktarget" @click.native="$track('nav', item.title)">{{item.title}}</nuxt-link>
          <a v-else>{{item.title}}</a>
          <!-- <SpLink :href="item.linktarget">{{item.title}}</SpLink> -->
        </li>
      </ul>
    </div>
    <div class="header-bar__menus" :class="{'open' : (sub_index!== null) }"
    @mouseenter.stop="handleMouseEnterOpen"
    @mouseleave.stop="handleMouseLeaveOpen">
      <SpDpTransition>
        <div class="header-bar__menus-sub-wrap container sub-menu-container" v-if="sub_index!== null" v-on-clickaway="away">
          <div class="header-bar__menus-sub clearfix" v-for="(item, index) in menus" :key="index">
            <template v-if="item.children && sub_index === index">
              <div class="left">
                <div class="m-1" v-for="(sitem, sindex) in item.children" :key="sindex">
                  <ul>
                    <li>
                      <div :class="['m-1__title', { 'has-link': sitem.linktarget }]" @click="handleMenuClick(sitem)">{{sitem.title}}</div>
                      <ul class="m-2">
                        <li
                          v-for="(citem, cindex) in sitem.children"
                          :key="cindex"
                          @click="sub_index=null"
                        >
                          <NuxtLink v-if="citem.linktarget" :to="citem.linktarget" @click.native="$track('nav_sub', citem.linktarget, citem.title)">{{citem.title}}</NuxtLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <ul class="right">
                <li>
                  <SpLink :href="item.piclinktarget1" @click.native="$track('nav_img', item.piclinktarget1)">
                    <div class="menu-img" >
                      <img v-show="item.piclink1" :src="resolveImgPath(item.piclink1, 'm')" alt="nav-pic" />
                    </div>
                  <div class="menu-img___desc txt-center" v-show="item.pictitle1">{{item.pictitle1}}</div>
                  </SpLink>
                </li>
                <li>
                  <SpLink :href="item.piclinktarget2" @click.native="$track('nav_img', item.piclinktarget2)">
                    <div class="menu-img" >
                        <img v-show="item.piclink2" :src="resolveImgPath(item.piclink2, 'm')" alt="nav-pic" />
                    </div>
                    <div class="menu-img___desc txt-center" v-show="item.pictitle2">{{item.pictitle2}}</div>
                  </SpLink>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </SpDpTransition>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from '@/plugins/clickaway'
import { resolveImgPath } from '@/utils'
export default {
  mixins: [clickaway],
  props: {
    params: Object
  },
  data () {
    return {
      m_index: null,
      n_index: null,
      sub_index: null,
      hover_index: null,
      menus: [],
      inopen: false,
      inmenu: false,
      fixed: false
    }
  },
  created () {
    let obj = this.params.text
    for (let item in obj) {
      let tjson = {}
      tjson.title = obj[item].linkinfo
      // tjson.nuxtlink = !!obj[item].cat_id
      // tjson.url = `/items?cat_id=${obj[item].cat_id}`
      tjson.linktarget = obj[item].cat_id ? `/items?cat_id=${obj[item].cat_id}` : obj[item].linktarget
      tjson.pictitle1 = obj[item].pictitle1
      tjson.pictitle2 = obj[item].pictitle2
      tjson.piclink1 = obj[item].piclink1
      tjson.piclink2 = obj[item].piclink2
      tjson.piclinktarget1 = obj[item].piclinktarget1
      tjson.piclinktarget2 = obj[item].piclinktarget2
      if (obj[item].lv_2) {
        tjson.children = []
        let lv2 = obj[item].lv_2
        lv2.forEach(item2 => {
          let lv_tjson = {
            title: item2.linkinfo,
            // nuxtlink: !!item2.cat_id,
            // url: `/items?cat_id=${item2.cat_id}`,
            linktarget: item2.cat_id ? `/items?cat_id=${item2.cat_id}` : item2.linktarget
          }
          if (item2.lv_3) {
            lv_tjson.children = []
            Object.keys(item2.lv_3).forEach(key => {
              lv_tjson.children.push({
                title: item2.lv_3[key].linkinfo,
                // nuxtlink: !!item2.lv_3[key].cat_id,
                // url: `/items?cat_id=${item2.lv_3[key].cat_id}`,
                linktarget: item2.lv_3[key].cat_id ? `/items?cat_id=${item2.lv_3[key].cat_id}` : item2.lv_3[key].linktarget
              })
            })
          }
          tjson.children.push(lv_tjson)
        })
      }
      this.menus.push(tjson)
    }
  },
  computed: {},
  watch: {
    sub_index: function (v) {
      this.emitSubNav(v)
    }
  },
  methods: {
    emitSubNav (v) {
      this.$EventBus.$emit('show-sub-nav', v)
    },
    handleMouseEnter (item, index) {
      this.hover_index = index
      this.inmenu = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (item.children) {
          this.sub_index = index
        } else {
          this.sub_index = null
        }
      }, 200)
    },
    handleMouseLeave () {
      this.inmenu = false
      setTimeout(() => {
        if (!this.inopen && !this.inmenu) {
          this.hover_index = null
          this.sub_index = null
        }
      }, 200)
      clearTimeout(this.timer)
    },
    handleMouseEnterOpen (index) {
      this.inopen = true
      this.hover_index = this.sub_index
    },
    handleMouseLeaveOpen (index) {
      this.inopen = false
      setTimeout(() => {
        if (!this.inopen && !this.inmenu) {
          this.hover_index = null
          this.sub_index = null
        }
      }, 200)
    },
    closeMenu () {
      this.$EventBus.$emit('close-menu')
    },
    toggleMenuLevel1 (index) {
      this.m_index = this.m_index === index ? null : index
    },
    toggleMenuLevel2 (index, sindex) {
      this.n_index =
        this.n_index === `${index}_${sindex}` ? null : `${index}_${sindex}`
    },
    away () {
      this.sub_index = null
      this.hover_index = null
    },
    resolveImgPath (url, size) {
      return (resolveImgPath(url, size))
    },
    handleMenuClick (menu) {
      if (menu.linktarget) {
        this.$router.push(menu.linktarget)
        this.$track('nav_sub', menu.linktarget, menu.title)
      }
    }
  }
}
</script>
