<template>
  <div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
    <router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 v-else class="sidebar-title">{{ title }} </h1>
    </router-link>
    <router-link v-else key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
  data() {
    return {
      title: "深圳担保",
      logo: require("@/assets/imgs/mxh.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
$sidebar-logo-container: 50px;

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $sidebar-logo-container;
  line-height: $sidebar-logo-container;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
