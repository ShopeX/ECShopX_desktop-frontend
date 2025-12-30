/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <transition name="cookie-consent-fade">
    <div v-if="visible" class="cookie-consent">
      <div class="cookie-consent__mask" @click="handleMaskClick"></div>
      <div class="cookie-consent__content">
        <div class="cookie-consent__body">
          <div class="cookie-consent__text">
            <div 
              class="cookie-consent__description" 
              v-if="privacyContent"
              v-html="privacyContent"
            ></div>
            <!-- <p class="cookie-consent__description" v-else>{{ $t('cookieConsent.description') }}</p> -->
          </div>
          <div class="cookie-consent__actions">
            <button 
              @click="handleReject"
              class="cookie-consent__btn cookie-consent__btn--reject"
            >
              {{ $t('cookieConsent.reject') }}
            </button>
            <button 
              @click="handleAccept"
              class="cookie-consent__btn cookie-consent__btn--accept"
            >
              {{ $t('cookieConsent.accept') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cookie from '@/utils/cookie'
import { getPrivacySetting } from '@/api/global'

export default {
  name: 'CookieConsent',
  data() {
    return {
      visible: false,
      privacyContent: ''
    }
  },
  mounted() {
    this.fetchPrivacyContent()
    this.checkAndShow()
  },
  methods: {
    /**
     * 获取隐私协议内容
     */
    async fetchPrivacyContent() {
      try {
        const res = await getPrivacySetting()
        if (res && res.pc_privacy_content) {
          this.privacyContent = res.pc_privacy_content
        }
      } catch (error) {
        console.warn('Failed to fetch privacy content:', error)
        // 如果接口失败，使用 i18n 翻译作为后备
      }
    },
    /**
     * 检查授权状态并显示弹框
     */
    checkAndShow() {
      // 仅在客户端执行
      if (process.client) {
        const consent = cookie.getCookieConsent()
        // 如果未授权，显示弹框
        if (consent === null) {
          this.show()
        }
      }
    },
    /**
     * 显示弹框
     */
    show() {
      this.visible = true
    },
    /**
     * 隐藏弹框
     */
    hide() {
      this.visible = false
    },
    /**
     * 处理同意操作
     */
    handleAccept() {
      cookie.setCookieConsent(true)
      this.hide()
      this.$emit('consent', true)
    },
    /**
     * 处理拒绝操作
     */
    handleReject() {
      cookie.setCookieConsent(false)
      this.hide()
      this.$emit('reject', false)
    },
    /**
     * 处理遮罩层点击（不允许点击关闭）
     */
    handleMaskClick() {
      // 根据设计需求，可能不允许点击遮罩关闭
      // 如果需要允许，可以取消下面的注释
      // this.handleReject()
    }
  }
}
</script>

<style lang="scss">
@import '@/style/variables';
@import '@/style/mixins';
@import '@/style/mixins/rtl';

.cookie-consent {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-level-12;
  display: flex;
  align-items: center;
  justify-content: center;

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 80%;
    max-width: 815px;
    min-width: 320px;
    background-color: #fff;
    box-shadow: 0px 0px 10.7px 7px rgba(0, 0, 0, 0.17);
    border-radius: 0;
  }

  &__body {
    padding: 55px 44px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__text {
    width: 100%;
  }

  &__description {
    font-family: 'Noto Sans SC', -apple-system, PingFang SC, Microsoft YaHei, "微软雅黑", Hiragino Sans GB, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #000;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    
    // HTML 内容样式
    :deep(div) {
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    :deep(p) {
      margin: 0 0 12px 0;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__actions {
    display: flex;
    @include justify-content-end;
    gap: 20px;
    flex-shrink: 0;
  }

  &__btn {
    font-family: 'Noto Sans SC', -apple-system, PingFang SC, Microsoft YaHei, "微软雅黑", Hiragino Sans GB, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    min-width: 140px;
    padding: 12px 24px;
    border-radius: 2px;

    &--reject {
      background-color: #fff;
      color: #666666;
      border: 1px solid #e5e5e5;
      
      &:hover {
        background-color: #f6f6f6;
        border-color: #d9d9d9;
      }
    }

    &--accept {
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
      
      &:hover {
        background-color: #333;
        border-color: #333;
      }
    }
  }
}

// 响应式设计
@include respond(sm) {
  .cookie-consent {
    &__content {
      width: 90%;
      max-width: 100%;
    }

    &__body {
      padding: 40px 30px;
      gap: 30px;
    }

    &__description {
      font-size: 14px;
      line-height: 20px;
    }

    &__actions {
      flex-direction: column;
      width: 100%;
    }

    &__btn {
      width: 100%;
      min-width: auto;
    }
  }
}

// 淡入淡出动画
.cookie-consent-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active .cookie-consent__content,
  &-leave-active .cookie-consent__content {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &-enter .cookie-consent__content,
  &-leave-to .cookie-consent__content {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>

