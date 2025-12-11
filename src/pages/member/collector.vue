/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" src="./collector.scss"></style>

<template>
  <div class="page-collector">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="coupcollectoron" active="collector"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">{{ $t('member.collector.299067-0') }}</div>
          <div class="member-content-right-body">
            <div v-if="!loading" class="collect-list clearfix">
              <template v-if="list && list.length > 0">
                <CollectorItem
                  :info="item"
                  @remove="itemRemove"
                  @addCartSuccess="handleShowModal"
                  v-for="item in list"
                  :key="item.item_id"
                >
                </CollectorItem>
              </template>
              <div class="collector__blank" v-else>
                <Tips
                  :userInfo="userInfo"
                  :tips="$t('member.collector.299067-1')"
                />
              </div>
            </div>
            <div class="pagination-wrap">
              <SpPagination
                :total="total"
                :pageSize="pageSize"
                :current="page"
                @on-change="changePage"
                :maxPage="5"
              />
            </div>
          </div>
          <ModalTips v-if="showModal" @close="handleCloseModal">
            <div slot="content">
              <p class="reg-modal__h1">
                {{ userInfo.username ? userInfo.username + '，' : '' }}{{ $t('member.collector.299067-2') }}
              </p>
            </div>
            <SpButton class="button-dark" @click="handleCloseModal">{{ $t('member.collector.299067-3') }}</SpButton>
            <SpButton class="button-dark ml20" @click="handleGoCart">{{ $t('member.collector.299067-4') }}</SpButton>
          </ModalTips>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorItem from './comps/collector-item'
import smenu from './../member/comps/smenu'
import ModalTips from '../auth/comps/modal-tips'
import Tips from './comps/tips'
import { analytics } from '@/plugins/analytics'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: this.$t('member.collector.299067-0'),
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('member.collector.299067-5')
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('member.collector.299067-5')
        }
      ]
    }
  },
  components: {
    smenu,
    CollectorItem,
    ModalTips,
    Tips
  },
  data() {
    return {
      list: null,
      loading: false,
      page: 1,
      pageSize: 20,
      total: 0,
      info: null,
      showModal: false
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      this.loading = true
      const { list, total_count } = await this.$api.member.favoriteItemList(params)
      this.list = list
      this.total = total_count
      this.loading = false
    },

    changePage(val) {
      this.page = val
      this.fetch()
    },

    itemRemove(item_id) {
      this.$Modal.confirm({
        title: this.$t('member.collector.299067-6'),
        content: '<p>请确认是否移除收藏?</p>',
        onOk: async () => {
          await this.$api.member.removeCollection({ item_ids: [item_id], is_empty: false })
          this.$Message.success(this.$t('member.collector.299067-8'))
          this.fetch()
        },
        onCancel: () => {}
      })
    },

    handleShowModal() {
      this.showModal = true
    },

    handleGoCart() {
      this.$router.push('/cart')
    },

    handleCloseModal() {
      this.showModal = false
    },

    handleGoIndex() {
      this.$router.push('/items')
    }
  }
}
</script>
