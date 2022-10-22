<template>
  <div class="menuTree">
    <label v-for="item in data" :key="item.path">

      <template v-if="item.children && item.meta && !item.meta.hidden">
        <el-menu-item v-if="item.children.length == 1 && !item.children[0].children && item.children[0].name == `home`"
          :index="bindingName(item, 'name')" key="">

          <template v-if="item.children[0].meta.icon">
            <template v-if="item.children[0].meta.icon.includes('fa ')">
              <i :class="show(item, 'icon')" class="titile-left-icon"></i>
            </template>
            <template v-else>
              <svg-icon :icon-class="show(item, 'icon')" className="titile-left-icon"></svg-icon>
            </template>
          </template>

          <span slot="title">
            <span class="menu-text">{{ show(item, "title") }}</span>
            <el-badge type="warning" :value="item.todoNum" class="item" v-if="item.todoNum"></el-badge>
          </span>
        </el-menu-item>

        <template v-else>
          <el-submenu :index="bindingName(item, 'name')">
            <template slot="title">

              <template v-if="item.meta.icon">
                <template v-if="item.meta.icon.includes('fa ')">
                  <i :class="show(item, 'icon')" class="titile-left-icon"></i>
                </template>
                <template v-else>
                  <svg-icon :icon-class="show(item, 'icon')" className="titile-left-icon"></svg-icon>
                </template>
              </template>

              <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
              <el-badge type="warning" :value="item.todoNum" class="item" v-if="item.todoNum"></el-badge>
            </template>
            <template v-for="child in item.children">
              <template v-if="!child.meta.hidden">
                <menutree v-if="child.children&&child.children.length>0" :data="[child]" :key="child.path"></menutree>
                <el-menu-item v-else :key="child.path" :index="bindingName(child, 'name')">

                  <template v-if="child.meta.icon">
                    <template v-if="child.meta.icon.includes('fa ')">
                      <i :class="show(child, 'icon')" class="titile-left-icon"></i>
                    </template>
                    <template v-else>
                      <svg-icon :icon-class="show(child, 'icon')" className="titile-left-icon"></svg-icon>
                    </template>
                  </template>

                  <span slot="title">
                    <span class="menu-text">{{ show(child, "title") }}</span>
                    <el-badge type="warning" :value="child.todoNum" class="item" v-if="child.todoNum"></el-badge>
                  </span>
                </el-menu-item>
              </template>
            </template>

          </el-submenu>
        </template>
      </template>



    </label>
  </div>
</template>

<script>
export default {
  name: "Menutree",
  props: {
    data: {
      type: Array,
      required: true,
    },
    active: {
      type: String,
      default: "",
    },
  },
  methods: {
    getPath(path) {
      if (typeof path === "undefined") {
        return;
      }
      const index = path.indexOf(".");
      return path.substring(0, index);
    },
    show(item, flag) {
      //展示meta的信息
      if (item.meta && item.meta[flag]) {
        //先 展示本身的meta
        return item.meta[flag];
      } else if (item.children && item.children[0].meta[flag]) {
        //第一级 children的mate
        return item.children[0].meta[flag];
      }
    },
    showIcon(item) {
      //展示meta的信息
      if (item.meta) {
        //先 展示本身的meta
        return String.fromCharCode(parseInt(item.meta.icon, 16));
      } else if (item.children && item.children[0].meta.icon) {
        //第一级 children的mate
        return String.fromCharCode(parseInt(item.children[0].meta.icon, 16));
      }
    },
    bindingName(item, flag) {
      //bind name
      if (item.children && item.children.length == 1) {
        //如果有children ,兼容 类似于首页这种结构,优先展示 第一级 children的name
        return item.children[0][flag];
      } else {
        return item[flag];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menuTree {
  .el-badge {
    position: absolute;

    ::v-deep {
      .el-badge__content {
        border: none;
      }
    }
  }
}
</style>
