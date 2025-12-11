/**
 * Copyright © ShopeX （http://www.shopex.cn）. All rights reserved.
 * See LICENSE file for license details.
 */

<style lang="scss">
.sp-scroll-loading {
  margin: 20px 0;
  .loader:before,
  .loader:after,
  .loader {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation-fill-mode: both;
    animation: loader 1.8s infinite ease-in-out;
  }
  .loader:before,
  .loader:after {
    background-color: inherit;
  }
  .loader {
    margin: 0 auto;
    position: relative;
    animation-delay: 0.2s;
  }
  .loader:before {
    left: -20px;
  }
  .loader:after {
    left: 20px;
    animation-delay: 0.4s;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  @keyframes loader {
    0%,
    80%,
    100% {
      // box-shadow: 0 2.5em 0 -1.3em #ce1c1c;
      transform: scale(1);
    }
    40% {
      // box-shadow: 0 2.5em 0 0 #ce1c1c;
      transform: scale(0);
    }
  }
  .no-more {
    text-align: center;
    color: #afafaf;
  }
}

</style>
<template>
  <div class="sp-scroll-loading" >
    <div class="loader" :style="{ backgroundColor: theme }" v-if="loading" ></div>
    <div class="no-more" v-if="noMore" >{{ $t('sp-scroll-loading.index.291488-0') }}</div>
  </div>
</template>

<script>
export default {
  name: 'SpScrollLoading',
  props: {
    loading: Boolean,
    noMore: Boolean,
    theme: String
  },
  data() {
    return {

    }
  },
  created() {},
  methods: {}
}
</script>

