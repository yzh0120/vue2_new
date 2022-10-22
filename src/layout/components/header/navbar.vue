<template>
  <div class="navbar">
    <div class="navbar-left">
      <i class="navbar-collapse" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="onCollapseChange"></i>
    </div>
    <div class="navbar-right">
      <user></user>
    </div>
  </div>
</template>

<script>
import user from "@/layout/components/header/user";
export default {
  name: "navbar",
  components: {
    user,
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
  methods: {
    onCollapseChange() {
      this.$store.dispatch("config/setCollapse", !this.$store.getters.isCollapse);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #f1f2f3;
  height: 50px;
  background-color: var(--bg-topBar);
  flex-shrink: 0;
  display: flex;
  padding-right: 15px;

  .navbar-left,
  .navbar-right {
    flex: 1;
    align-items: center;
    display: flex;
  }

  .navbar-right {
    justify-content: flex-end;
  }

  .navbar-collapse{
    cursor: pointer;
    font-size: 22px;
    margin-left: 15px;
    margin-right: 15px;
    color: var(--bg-topBarColor);
  }
}
</style>
