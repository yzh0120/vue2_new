<template>
  <el-main class="two_amin-main-scrollbar">
    <el-scrollbar class="layout-scrollbar" ref="layoutScrollbarRef" :style="style">
      <div ref="keepAliveContainer" class="app_main" id="app_main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive v-if="needTags">
            <router-view :key="key" />
          </keep-alive>
          <router-view v-else></router-view>
        </transition>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script>
import * as config from "@/config/index";
export default {
  name: "maincontent",
  data() {
    return {
      needTags: config.needTags,
      style: {
        "min-height": config.needTags
          ? "calc(100vh - 84px)"
          : "calc(100vh - 50px)",
      },
    };
  },
  mounted() {
    if (this.$refs.keepAliveContainer) {
      this.$root.keepAlive =
        this.$refs.keepAliveContainer.childNodes[0].__vue__._vnode.componentInstance;
    }
  },
  computed: {
    key() {
      return this.$route.path;
    },
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
.one_index-container-aside-head-main .layout-scrollbar {
  padding: 15px;
  transition: padding 0.3s ease-in-out 0s;
}
</style>
