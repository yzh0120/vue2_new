<template>
  <el-aside width="auto">
    <div class="two_aside-div" :class="{ 'isCollapse': isCollapse }">
      <Logo></Logo>
      <el-scrollbar wrap-class="two_aside-scrollbar-menutree" ref="scrollbarRef"
        style="height:calc(100% - 50px) !important">
        <el-menu :collapse="isCollapse" :collapse-transition="false" :unique-opened="false" :default-active="activeName"
          @select="selectMenu">
          <menutree :data="permission" />
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>

<script>
import Logo from "./logo";
import menutree from "./MenuTree.vue";
export default {
  name: "sidebar",
  data() {
    return {
      activeName: this.$route.name,
    };
  },
  components: {
    menutree,
    Logo,
  },
  mounted() {
    window.addEventListener("resize", this.updateScrollbar);
  },
  methods: {
    //选择叶子节点
    selectMenu(item, indexPath) {
      const arr = item.split(",");
      if (arr[0] !== "undefined") {
        this.$router.push({ name: arr[0] });
      }
    },

    updateScrollbar() {
      this.$refs.scrollbarRef.update();
    },
  },
  computed: {
    permission() {
      return this.$store.getters.permission;
    },
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
  watch: {
    $route() {
      const { meta, path, name } = this.$route;
      this.activeName = name;
    },
  },
};
</script>

<style lang="scss" >
/*********************************************************************************************************
        侧边栏系列
        */
// 侧边栏收缩的transition
.two_aside-div {
  transition: width 0.28s;
  width: 210px !important;
  // background-color: $menuBg;
  height: 100%;
  overflow: hidden;
}

// 折叠时候的侧边栏的宽度
.isCollapse.two_aside-div {
  width: 54px !important;

  // 折叠时候的 导航菜单的宽度
  .el-menu--collapse.el-menu {
    width: 53px !important;
  }
}

/*********************************************************************************************************
        导航栏系列
        */
// 导航栏折叠的时导航栏隐藏 图标
.isCollapse .el-submenu__icon-arrow.el-icon-arrow-right {
  font-size: 0 !important;
}

//导航栏去除边框
.el-menu {
  border: 0px;
  background-color: inherit;
}

//导航栏折叠时候 隐藏标题
.el-menu--collapse {
  background-color: white;

  .el-submenu {
    &>.el-submenu__title {
      &>span {
        margin: 0;
        padding: 0;
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
}

// //当点击了子菜单时 父菜单的文本颜色
.is-active>.el-submenu__title {
  // color: $subMenuActiveText !important;
}

//非一级的一行菜单栏背景悬浮色
.nest-menu .el-submenu>.el-submenu__title,
.el-submenu .el-menu-item {
  // background-color: $subMenuBg !important;

  &:hover {
    // background-color: $subMenuHover !important;
  }
}

//导航栏展开的时候, title左边的图标的margin
.titile-left-icon {
  margin-left: -4px;
  font-size: 16px;
  margin-right: 10px;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
}

/*********************************************************************************************************
        侧边栏的滚动条系列  .two_aside-scrollbar-menutree 和 .el-scrollbar__wrap 都是在同一个dom上    。scrollbar-wrapper是自定义的类名
        */
.el-aside .el-scrollbar {
  height: 100% !important; //作用侧边栏和头部的网页标签

  .two_aside-scrollbar-menutree {
    //只限于 侧边栏的
    overflow-x: hidden !important;
    height: 100% !important;

    .el-scrollbar__view {
      // height: 100% !important;
    }
  }

  //侧边栏的标题过长的时候 将x轴的滚动条的高度设置为0，el-scorll不是正常的滚动条，移除隐藏没有用
  .el-scrollbar__bar.is-horizontal {
    height: 0px !important;
  }
}
</style>
