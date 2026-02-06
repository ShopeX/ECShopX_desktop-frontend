/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="open-source-badge" @click="handleClick">
    <img src="~/assets/imgs/powered-logo.png" alt="Powered by Shopex" />
  </div>
</template>

<script>
export default {
  name: 'OpenSourceBadge',
  data() {
    return {}
  },
  methods: {
    handleClick() {
      window.open('https://www.shopex.cn/', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.open-source-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  margin-top: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    max-width: 160px;
    height: auto;
    object-fit: contain;
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    padding: 12px 0;
    margin-top: 16px;
    
    span {
      font-size: 11px;
    }
    
    img {
      max-width: 100px;
    }
  }
  
  @media (max-width: 480px) {
    span {
      font-size: 10px;
    }
    
    img {
      max-width: 80px;
    }
  }
}
</style>
