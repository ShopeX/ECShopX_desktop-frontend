/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss" scoped>
.sp-evaluation {
  &__list {
    padding: 10px 20px 0;
  }
  &__item {
    margin-bottom: 30px;
    border-bottom: 1px solid #d7d7d7;
    padding-left: 20px;
    padding-bottom: 20px;
    &:last-child {
      border-bottom-width: 0;
    }
    .rate-pic {
      margin-bottom: 10px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
    .avatar-wrap {
      width: 30px;
      height: 30px;
      background: #ccc;
      margin-right: 20px;
      float: left;
      img {
        width: 100%;
        border-radius: 50%;
      }
      .hasAvatar {
        height: 100%;
      }
    }
  }
  &__main {
    width: calc(100% - 50px);
    float: left;
    text-align: left;
    .name {
      font-size: 12px;
      color: #888;
      margin-bottom: 10px;
    }
    .rate-wrap {
      margin-bottom: 10px;
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
          margin-bottom: 5px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .comment {
      margin-bottom: 10px;
    }
    .comment-btn {
      font-size: 12px;
      color: #888;
      cursor: pointer;
      display: inline-block;
    }
    .comment-wrap {
      margin: 30px 0 20px;
      .el-textarea {
        position: relative;
        width: 80%;
        margin-bottom: 20px;
        &__content {
          width: 100%;
          border-radius: 4px;
          color: #606266;
          border-color: #dcdfe6;
          padding: 5px 15px;
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
        border-radius: 5px;
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
  <div class="sp-evaluation__item clearfix">
    <div class="avatar-wrap">
      <img :src="info.avatar" :class="{ hasAvatar: info.avatar }" />
    </div>
    <div class="sp-evaluation__main">
      <div @click="showReply()">
        <div class="name">{{ info.username }}</div>
        <div class="rate-wrap">
          <i
            class="ec-icon ec-icon-favorfill"
            :class="{ disabled: index > info.star - 1 }"
            v-for="(rate, index) in [1, 1, 1, 1, 1]"
            :key="index"
          ></i>
        </div>
        <div class="comment">{{ info.content }}</div>
         <div class="rate-pic" v-if="info.rate_pic.length > 0">
          <img
            :src="item"
            v-for="(item, index) in info.rate_pic"
            :key="index"
          />
        </div>
      </div>
      <div
        class="comment-btn"
        v-if="!info.showComment"
        @click.stop="openComment()"
      >
        {{ $t('comps.goods-evaluation.885774-0') }}
      </div>
      <div class="reply-list" v-if="info.reply_list.length > 0">
        <div class="reply-item" v-for="(reply, i) in info.reply_list" :key="i">
          <span class="reply-name">{{ reply.username }}：</span>
          <span class="reply-comment">{{ reply.content }}</span>
          <div class="rate-pic" v-if="info.rate_pic.length > 0">
            <img
              :src="item"
              v-for="(item, index) in info.rate_pic"
              :key="index"
            />
          </div>
        </div>
      </div>
      <div class="comment-wrap" v-if="info.showComment">
        <div class="el-textarea">
          <textarea
            class="el-textarea__content"
            rows="3"
            v-model="info.reply_comment"
            :maxlength="500"
            :placeholder="$t('comps.goods-evaluation.885774-1')"
          ></textarea>
          <span class="el-textarea__count"
            >{{ info.reply_comment.length }}/500</span
          >
        </div>
        <div
          class="inner-btn"
          :class="{ disabled: !info.reply_comment }"
          @click.stop="handleReply()"
        >
          {{ $t('comps.goods-evaluation.885774-0') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpGoodsEvaluation",
  props: {
    info: Object,
  },
  data() {
    return {
      evaluationList: [],
      evaluationTotal: 0,
      page: 1,
      pageSize: 20,
    };
  },
  methods: {
    showReply() {
      this.$emit("on-show-reply");
    },
    openComment() {
      this.$emit("on-open-comment");
    },
    handleReply() {
      this.$emit("on-reply");
    },
  },
};
</script>
