<template>
  <el-container class="one_index-container-aside-head-main">
    <!-- 侧边栏 -->
    <sidebar></sidebar>
    <el-container class="one_index-container-head-main">
      <!-- 头部 -->
      <topheader></topheader>
      <el-scrollbar ref="layoutScrollbarRef" class="one_index-backtop-main">
        <!-- 主体 -->
        <maincontent></maincontent>
      </el-scrollbar>
    </el-container>
    <el-backtop target=".one_index-backtop-main .el-scrollbar__wrap"
      style="background-color: rgba(64,158,255,0.8);color:#ffffff;">
      <i class="el-icon-upload2"></i>
    </el-backtop>
  </el-container>
</template>

<script>
import aside from "@/layout/components/aside/index.vue";
import topheader from "@/layout/components/header/index.vue";
import maincontent from "@/layout/components/main/index";
export default {
  name: "layout",
  components: {
    sidebar: aside,
    topheader,
    maincontent,
  },
  // 监听路由的变化
  $route: {
    handler(to) {
      this.$refs.layoutScrollbarRef.wrap.scrollTop = 0;
    },
    deep: true,
  },
};
</script>


<style lang="scss" scoped>
.one_index-container-head-main {
  flex-direction: column;
}

.layout-scrollbar {
  // min-height: calc(100vh - 84px);
  transition: padding 0.3s ease-in-out 0s;
  width: 100%;
  // padding: 15px;
}
</style>
