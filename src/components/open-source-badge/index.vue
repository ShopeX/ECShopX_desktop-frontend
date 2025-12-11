/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<template>
  <div class="open-source-badge">
    <img src="~/assets/imgs/powered-logo.png" alt="Powered by ECShopX" />
  </div>
</template>

<script>
export default {
  name: 'OpenSourceBadge',
  data() {
    return {}
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
  
  img {
    max-width: 120px;
    height: auto;
    object-fit: contain;
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    padding: 12px 0;
    margin-top: 16px;
    
    img {
      max-width: 100px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      max-width: 80px;
    }
  }
}
</style>
