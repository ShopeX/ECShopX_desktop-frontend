/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./items/index.scss"></style>

<style lang="scss">
.page-result {
  .recommend {
    padding: 50px 0;
    &__td {
      font-size: 16px;
      color: $color-brand-primary;
      font-weight: 600;
    }
    &__bd {
      margin-top: 10px;
      li {
        font-size: 14px;
        color: $color-brand-primary;
        float: left;
        margin-right: 20px;
        cursor: pointer;
        a {
          font-size: 14px;
          color: $color-brand-primary;
        }
      }
    }
  }
}
</style>

<template>
  <div class="page-item page-result page-body container">
    <div class="page-item__breadcrumb-wraper">
      <div class="items-searchbar">
        <h3 class="items-searchbar-h">{{ $t('pages.result.828730-0') }}</h3>
        <div class="items-searchbar-hd">
          <SpInput
            class="items-searchbar-input"
            v-model="message"
            :placeholder="`${$t('pages.result.828730-0')}......`"
          ></SpInput>
          <SpButton class="items-searchbar-btn" type="primary" @click="handleSearch(message)"
            >{{ $t('pages.result.828730-2') }}</SpButton
          >
        </div>

        <div class="recommend">
          <p class="recommend__td">{{ $t('pages.result.828730-3') }}</p>
          <ul class="recommend__bd">
            <li v-for="(item, index) in list" :key="index" @click="handleClickItem(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      list: [this.$t('pages.result.828730-4'), this.$t('pages.result.828730-5'), this.$t('pages.result.828730-6'), this.$t('pages.result.828730-7')]
    }
  },
  mounted() {
    const { name } = this.$route.query
    this.message = name
  },
  methods: {
    async handleSearch(val) {
      if (!val) {
        return
      }
      val = val.trim()
      const { category, itemSearchCount } = await this.$api.item.microSearch({
        search_keywords: val
      })
      if (category.length === 0 && itemSearchCount === 0) {
        this.$Message.error(this.$t('pages.result.828730-8'))
        this.message = val
      } else {
        this.$router.push({ path: '/items', query: { keyword: val } })
      }
      this.$track('search', val)
    },
    handleClickItem(keyword) {
      this.$router.push(`/items?keyword=${keyword}`)
      this.$track('search_hot', keyword)
    }
  }
}
</script>
