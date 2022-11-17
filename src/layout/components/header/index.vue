<template>
  <el-header :height="heigth" class="two_header-header-navbar-tagsView">
    <navbar></navbar>
    <tagsView v-if="needTags"></tagsView>
  </el-header>
</template>

<script>
import navbar from "@/layout/components/header/navbar";
import tagsView from "@/layout/components/header/tagsView";
import * as config from "@/config/index";
export default {
  name: "topheader",
  components: {
    navbar,
    tagsView,
  },
  data() {
    return {
      needTags: config.needTags,
      heigth: config.needTags ? "84px" : "50px",
    };
  },
  created() { },
};
</script>

<style lang="scss" scoped>
.two_header-header-navbar-tagsView {
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>
