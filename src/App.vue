<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: {
      //保存上一次的路由,之所以放在这里 是保证已经进了路由了
      handler(newVal, oldVal) {
        if (oldVal) {
          this.$store.commit("router/preRoute_fn", oldVal);
        }
      },
      immediate: true,
    },
  },
  created() {
    // this.favicon();
  },
  methods: {
    favicon() {
      var link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";

      link.href = require("@/assets/imgs/mxh.png");
      document.getElementsByTagName("head")[0].appendChild(link);
    },
  },
};
</script>

<style lang="scss">
</style>
