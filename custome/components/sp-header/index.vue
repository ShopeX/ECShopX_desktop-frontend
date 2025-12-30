<style lang="scss" src="./index.scss"></style>

<template>
  <div class="header-bar">
    this is custome header-bar
  </div>
</template>

<script>
import { mixin as clickaway } from "@/plugins/clickaway";
import { mapState } from "vuex";
import { lockScreen } from "@/utils/dom";
import S from "@/spx";

export default {
  name: "Header",
  mixins: [clickaway],
  data() {
    return {
    };
  },
  methods: {
    
  }
};
</script>
