<template>
  <div class="three_tags-div-scrollbar">
    <el-scrollbar ref="scrollbarRef" @wheel.native.prevent="onHandleScroll">
      <ul class="three_tags-div-scrollbar-ul" ref="tagsUlRef">
        <li v-for="(v, k) in tagsViewList" :key="k" class="three_tags-div-scrollbar-ul-li" :data-name="v.name"
          :class="{ 'is-active': v.path === tagsRoutePath }" @contextmenu.prevent="onContextmenu(v, $event)"
          @click="onTagsClick(v, k)" ref="tagsRefs">
          <svgIcon :icon="v.meta.icon" className="three_tags-div-scrollbar-ul-li-iconfont font14"
            v-if="v.path === tagsRoutePath"></svgIcon>


          <svgIcon :icon="v.meta.icon" className="three_tags-div-scrollbar-ul-li-iconfont font14 is-tagsview-icon"
            v-if="v.path !== tagsRoutePath"></svgIcon>


          <span>{{ v.meta.title }}</span>
          <i class="el-icon-refresh-right three_tags-div-scrollbar-ul-li-icon ml5" v-if="v.path === tagsRoutePath"
            @click.stop="_refreshCurrentTagsView(v)"></i>
          <i class="el-icon-close three_tags-div-scrollbar-ul-li-icon ml5" v-if="!v.meta.isAffix"
            @click.stop="_closeCurrentTagsView(v)"></i>
        </li>
      </ul>
    </el-scrollbar>
    <contextmenu :dropdown="tagsDropdown" ref="tagsContextmenu" @currentContextmenuClick="onCurrentContextmenuClick" />
  </div>
</template>

<script>
let fixedRoutes = []; //固定路由
import contextmenu from "@/layout/components/header/contextmenu";
import keepAlive from "@/mixins/keepAlive";

export default {
  name: "tagsview",
  components: {
    contextmenu,
  },
  mixins: [keepAlive],
  data() {
    return {
      tagsRefsIndex: 0,
      // tagsRoutePath: "",
      tagsDropdown: {
        x: "",
        y: "",
      },
    };
  },

  computed: {
    // tagsViewList() {
    //   return this.$store.getters.tagsViewList;
    // },
    tagsViewList: {
      get() {
        return this.$store.getters.tagsViewList;
      },
      set(v) {
        this.$store.commit("tagsView/setView", v);
      },
    },
    router() {
      return this.$store.state.router.routes;
    },
    tagsRoutePath() {
      return this.$store.getters.currentTagView;
    },
    // routeName() {
    //   return this.$route.name;
    // },
  },

  watch: {
    // 监听路由变化
    $route: {
      handler(to) {
        if (to.name != "blank") {
          this.$store.dispatch("tagsView/setCurrentTagView", to.path);
          this._addTagsView(to);
          this.getTagsRefsIndex(to.path);
          this.tagsViewmoveToCurrentTag();
        }
      },
      deep: true,
    },
  },

  created() {
    this.getFixed(this.router);
    this.toPath(fixedRoutes);
    var hash = {};
    fixedRoutes = fixedRoutes.reduce(function (item, next) {
      hash[next.selfPath]
        ? ""
        : (hash[next.selfPath] = true && item.push(next));
      return item;
    }, []);
    this.tagsViewList = fixedRoutes;
    this.initTagsViewList();
  },
  methods: {
    toPath(routes) {
      routes.forEach((item) => {
        //迭代
        if (item.selfPath) {
          item.path = item.selfPath;
        }
        if (item.children) {
          this.toPath(item.children);
        }
      });
    },
    getFixed(routes, fatherPath) {
      routes.forEach((item) => {
        if (fatherPath) {
          item.selfPath = fatherPath + item.path;
        } else {
          item.selfPath = item.path;
        }
        //迭代
        if (item.meta && item.meta.isAffix && !item.meta.hidden) {
          // console.log(fatherPath);

          fixedRoutes.push(this.$fn.deepClone(item));
        }
        if (item.children) {
          this.getFixed(item.children, item.selfPath);
        }
      });
    },
    // 初始化设置了 tagsView 数据
    initTagsViewList() {
      this.$store.dispatch("tagsView/setCurrentTagView", this.$route.path);
      this._addTagsView(this.$route);
      // 初始化当前元素(li)的下标
      this.getTagsRefsIndex(this.$route.path);
      // 添加初始化横向滚动条移动到对应位置
      this.tagsViewmoveToCurrentTag();
    },

    // 鼠标滚轮滚动
    onHandleScroll(e) {
      this.$refs.scrollbarRef.$refs.wrap.scrollLeft += e.wheelDelta / 4;
    },

    // tagsView 横向滚动
    tagsViewmoveToCurrentTag() {
      this.$nextTick(() => {
        const tagsRefs = this.$refs.tagsRefs;
        if (!tagsRefs) return false;
        if (tagsRefs.length <= 0) return false;
        // 当前 li 元素
        let liDom = tagsRefs[this.tagsRefsIndex];
        // 当前 li 元素下标
        let liIndex = this.tagsRefsIndex;
        // 当前 ul 下 li 元素总长度
        let liLength = tagsRefs.length;
        // 最前 li
        let liFirst = tagsRefs[0];
        // 最后 li
        let liLast = tagsRefs[tagsRefs.length - 1];
        // 当前滚动条的值
        let scrollRefs = this.$refs.scrollbarRef.$refs.wrap;
        // 当前滚动条滚动宽度
        let scrollS = scrollRefs.scrollWidth;
        // 当前滚动条偏移宽度
        let offsetW = scrollRefs.offsetWidth;
        // 当前滚动条偏移距离
        let scrollL = scrollRefs.scrollLeft;
        // 上一个 tags li dom
        let liPrevTag = tagsRefs[this.tagsRefsIndex - 1];
        // 下一个 tags li dom
        let liNextTag = tagsRefs[this.tagsRefsIndex + 1];
        // 上一个 tags li dom 的偏移距离
        let beforePrevL = "";
        // 下一个 tags li dom 的偏移距离
        let afterNextL = "";
        if (liDom === liFirst) {
          // 头部
          scrollRefs.scrollLeft = 0;
        } else if (liDom === liLast) {
          // 尾部
          scrollRefs.scrollLeft = scrollS - offsetW;
        } else {
          // 非头/尾部
          if (liIndex === 0) beforePrevL = liFirst?.offsetLeft - 5;
          else beforePrevL = liPrevTag?.offsetLeft - 5;
          if (liIndex === liLength)
            afterNextL = liLast?.offsetLeft + liLast.offsetWidth + 5;
          else afterNextL = liNextTag?.offsetLeft + liNextTag.offsetWidth + 5;
          if (afterNextL > scrollL + offsetW) {
            scrollRefs.scrollLeft = afterNextL - offsetW;
          } else if (beforePrevL < scrollL) {
            scrollRefs.scrollLeft = beforePrevL;
          }
        }
        // 更新滚动条，防止不出现
        this.updateScrollbar();
      });
    },

    // 更新滚动条显示
    updateScrollbar() {
      this.$refs.scrollbarRef.update();
    },

    // 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
    getTagsRefsIndex(path) {
      if (this.tagsViewList.length > 0) {
        this.tagsRefsIndex = this.tagsViewList.findIndex(
          (item) => item.path === path
        );
      }
    },

    // 当前的 tagsView 项点击时
    onTagsClick(v, k) {
      this.$store.dispatch("tagsView/setCurrentTagView", v.path);
      this.tagsRefsIndex = k;
      this.$router.push(v);
    },

    // 右键菜单点击时显示菜单列表
    onContextmenu(v, e) {
      let { clientX, clientY } = e;
      this.tagsDropdown.x = clientX;
      this.tagsDropdown.y = clientY;
      this.$refs.tagsContextmenu.openContextmenu(v);
    },

    // 添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中
    _addTagsView(item) {
      if (this.tagsViewList.some((v) => v.path === item.path)) return false;
      if (item.meta.isLink && !item.meta.isIframe) return false;
      this.$store.dispatch("tagsView/addView", item);
      // this.tagsViewList.push(item);
    },

    // 当前项右键菜单点击
    onCurrentContextmenuClick(data) {
      let { id, path, route } = data;
      let currentTag = this.tagsViewList.find((v) => v.path === path);
      switch (id) {
        //刷新
        case 0:
          this._refreshCurrentTagsView(route);
          break;
        //关闭
        case 1:
          this._closeCurrentTagsView(route);
          break;
        //关闭其他
        case 2:
          this._closeOtherTagsView(route);
          break;
        //关闭所有
        case 3:
          this._closeAllTagsView(route);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.three_tags-div-scrollbar {
  flex: 1;
  background-color: var(--bg-topBar);
  border-bottom: 1px solid #f1f2f3;

  & ::v-deep .is-vertical {
    display: none !important;
  }

  .el-scrollbar {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .el-scrollbar__wrap {
    overflow-x: auto !important;
    max-height: 100%;
  }

  &-ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: #606266;
    font-size: 12px;
    padding: 0 15px;

    &-li {
      height: 26px;
      line-height: 26px;
      display: flex;
      align-items: center;
      border: 1px solid #ebeef5;
      padding: 0 12px 0 15px;
      margin-right: 5px;
      border-radius: 2px;
      position: relative;
      z-index: 0;
      cursor: pointer;
      justify-content: space-between;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: var(--color-primary);
        z-index: -1;
        opacity: 0;
        transform: scale3d(0.7, 1, 1);
        transition: transform 0.3s, opacity 0.3s;
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      }

      &:hover {
        color: #ffffff;
        transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        border-color: transparent;

        &::before {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          border-radius: 2px;
        }

        .is-tagsview-icon {
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }
      }

      &-iconfont {
        position: relative;
        left: -5px;
        top: 1px;
        color: #ffffff;
      }

      &-icon {
        border-radius: 100%;
        position: relative;
        height: 14px;
        width: 14px;
        text-align: center;
        line-height: 14px;
        top: 1px;
      }

      .is-tagsview-icon {
        color: #606266;
        transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
      }
    }

    .is-active {
      color: #ffffff;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
      border-color: transparent;

      &::before {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        border-radius: 2px;
      }
    }
  }

  & ::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
