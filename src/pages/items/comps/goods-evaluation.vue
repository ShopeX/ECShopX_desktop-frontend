/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.comps-evaluation {
  &__item {
    margin-bottom: 10px;
    padding: 10px 0;
    .rate-pic {
      margin-bottom: 10px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
    .avatar-wrap {
      width: 60px;
      height: 60px;
      background: #fff;
      margin-right: 10px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
      .hasAvatar {
        height: 100%;
      }
    }
  }
  &__main {
    float: left;
    width: calc(100% - 70px);
    .name {
      font-size: 14px;
      color: #888;
      height: 20px;
    }
    .rate-wrap {
      margin-bottom: 4px;
      .ec-icon-favorfill {
        color: $color-brand-primary; //#ff9900
        &.disabled {
          color: #d7d7d7;
        }
      }
    }
    .reply-list {
      padding: 10px;
      margin-top: 20px;
      background: #f7f7f7;
      .reply-item {
        margin-bottom: 10px;
        .reply-name {
          font-size: 12px;
          color: #888;
        }
        .reply-comment {
          font-size: 12px;
          color: #888;
        }
        .reply-date {
          font-size: 12px;
          color: #888;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .comment {
      margin-bottom: 10px;
      font-size: 13px;
      @include clearfix();
      &-text {
        float: left;
      }
      &-num {
        float: right;
        .ec-icon-comment_light {
          color: #888;
        }
        .num {
          color: #888;
          position: relative;
          top: -1px;
        }
      }
      .btn-comment {
        float: right;
        position: relative;
        top: -1px;
        color: #888;
        margin-left: 10px;
        cursor: default;
      }
    }

    .comment-btn {
      font-size: 12px;
      color: #888;
      cursor: pointer;
      display: inline-block;
    }
    .comment-wrap {
      margin-top: 20px;
      .el-textarea {
        position: relative;
        width: 500px;
        margin-bottom: 20px;
        &__content {
          width: 100%;
          border-radius: 2px;
          color: #606266;
          border-color: #dcdfe6;
          padding: 10px;
        }
        &__count {
          color: #909399;
          background: #fff;
          font-size: 12px;
          position: absolute;
          bottom: 8px;
          right: 10px;
          z-index: 10;
        }
      }
      .inner-btn {
        height: 36px;
        line-height: 36px;
        width: 90px;
        border-radius: 2px;
        text-align: center;
        background: $color-brand-primary;
        color: #fff;
        cursor: pointer;
        &.disabled {
          cursor: not-allowed;
          background: #d7d7d7;
        }
      }
    }
  }
}
</style>

<template>
  <div class="comps-evaluation__item clearfix">
    <div class="avatar-wrap">
      <!-- 商品评价默认头像 -->
      <img :src="info.avatar.length===0?defaultImg:info.avatar" :class="{ hasAvatar: info.avatar }" />
    </div>
    <div class="comps-evaluation__main">
      <div class="name">{{ info.username }}</div>
      <div class="rate-wrap">
        <i
          class="ec-icon ec-icon-favorfill"
          :class="{ disabled: index > info.star - 1 }"
          v-for="(rate, index) in [1, 1, 1, 1, 1]"
          :key="index"
        ></i>
      </div>
      <div class="comment">
        <div class="comment-text">{{ info.content }}</div>
        <div class="btn-comment" @click="handleClickShowComment">{{ $t('comps.goods-evaluation.645004-0') }}</div>
        <div class="comment-num">
          <i class="ec-icon ec-icon-comment_light" @click="handleClickShowReply"></i>
          <span class="num">{{ info.reply.total_count }}</span>
        </div>
      </div>
      <img :src="item" v-for="(item,index) in info.rate_pic" :key="index" style="width:100px;height:100px;margin-right:1px;" @click="viewImg(item)">

      <div class="reply-list" v-if="replyList.length > 0 && showReply">
        <div class="reply-item" v-for="(reply, i) in replyList" :key="`reply-item__${i}`">
          <span class="reply-name">{{ reply.username || $t('comps.goods-evaluation.645004-1') }}：</span>
          <span class="reply-comment">{{ reply.content }}</span>
          <div class="reply-date">{{ reply.created | DateTimeFilter }}</div>
        </div>
      </div>

      <div class="comment-wrap" v-if="showComment">
        <div class="el-textarea">
          <textarea
            class="el-textarea__content"
            rows="5"
            v-model="replyComment"
            :maxlength="500"
            :placeholder="$t('comps.goods-evaluation.645004-2')"
          ></textarea>
          <span class="el-textarea__count">{{ replyComment.length }}/500</span>
        </div>
        <div
          class="inner-btn"
          :class="{ disabled: !replyComment }"
          :style="{
            backgroundColor: theme
          }"
          @click.stop="handleReply()"
        >
          {{ $t('comps.goods-evaluation.645004-0') }}
        </div>
      </div>
    </div>
    <SpModal
      title=""
      v-model="dialogImgVisible"
      :width="650"
    >
      <div style="text-align:center">
        <img :src="viewImgVal" alt="" style="width:500px;margin:50px 0">
      </div>
    </SpModal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  // name: 'SpGoodsEvaluation',
  props: {
    info: Object,
    theme: String
  },
  data() {
    return {
      evaluationList: [],
      evaluationTotal: 0,
      page: 1,
      pageSize: 20,
      replyList: [],
      showReply: false,
      showComment: false,
      replyComment: '',
      defaultImg:require('@/assets/imgs/avator.png'),
      viewImgVal:"",
      dialogImgVisible:false,
    }
  },
  filters: {
    DateTimeFilter(date) {
      return moment(date * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    viewImg(item){
      this.viewImgVal = item
      this.dialogImgVisible = true
    },
    async handleClickShowReply() {
      this.showReply = !this.showReply
      if(this.showReply) {
        this.fetchRate()
      }
    },
    async fetchRate() {
      const { rate_id, item_id } = this.info
      const params = {
        item_id,
        rate_id,
        page: 1,
        pageSize: 100
      }
      const { list, total_count } = await this.$api.item.getreplyRateList(params)
      this.replyList = list
      this.$emit('on-reply', total_count)
    },
    handleClickShowComment() {
      this.showComment = !this.showComment
    },
    async handleReply() {
      const { rate_id } = this.info
      await this.$api.item.replyRate({
        rate_id: rate_id,
        content: this.replyComment
      })
      this.fetchRate()
      this.showComment = false
    }
  }
}
</script>
