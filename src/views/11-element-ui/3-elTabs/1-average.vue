<template>
  <page>
    <div style="height: 1000px">
      <el-tabs
        ref="navTabs"
        class="average"
        @tab-click="handleClick"
        type="border-card"
      >
        <div class="linkNav" ref="link" @click="linkNavFn">
          <div class="link" style="background-color: #008000"></div>
          <div class="link" style="background-color: yellowgreen"></div>
          <div class="link" style="background-color: #008000"></div>
          <div class="link" style="background-color: yellowgreen"></div>
        </div>
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="法律诉讼">法律诉讼</el-tab-pane>
        <el-tab-pane label="经营风险">经营风险</el-tab-pane>
        <el-tab-pane label="经营信息">经营信息</el-tab-pane>
        <el-tab-pane label="经营信息">经营信息</el-tab-pane>
      </el-tabs>
    </div>
  </page>
</template>

<script>
let setTimeoutVAl = "";
export default {
  data() {
    return {};
  },
  mounted() {
    this.set();
  },
  methods: {
    linkNavFn() {
      this.$refs.link.style.height = "0px";
    },
    //点击tabs
    handleClick() {
      this.$refs.link.style.height = "0px";
      if (setTimeoutVAl) {
        clearTimeout(setTimeoutVAl);
      }
    },
    add() {
      setTimeoutVAl = setTimeout(() => {
        this.$refs.link.style.height = "400px";
        this.$refs.link.style.width = "100%";
        console.log(this.$refs.link.style.height, this.$refs.link.style.width);
      }, 600);
    },
    set() {
      this.$nextTick(() => {
        //link移入事件
        this.$refs.link.addEventListener("mouseover", () => {
          this.$refs.link.style.height = "400px";
        });
        //link移除事件
        this.$refs.link.addEventListener("mouseout", () => {
          this.$refs.link.style.height = "0px";
        });
        //tabs 移入移除事件
        this.$refs.navTabs.$refs.nav.$nextTick(() => {
          //获取tabs的dom
          this.over = this.$refs.navTabs.$el.querySelector(
            ".el-tabs__nav-scroll"
          );
          this.over.addEventListener("mouseenter", this.add);
          this.over.addEventListener("mouseleave", () => {
            this.$refs.link.style.height = "0px";
            clearTimeout(setTimeoutVAl);
          });
        });
      });
    },
    //锚点  每一个tabs-pane  都有一个函数
    goOne(label, str, active) {
      this.active = "1";
      if (document.getElementById(`${this.type}${label}`)) {
        document.getElementById(`${this.type}${label}`).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        if (str) {
          //tabs
          if (active) {
            this.$refs["gsjbxx"][active] = str;
          } else {
            this.$refs["gsjbxx"].active = str;
          }
        } else {
          //没有tabs
        }
      }
    },
  },
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
.linkNav {
  margin-left: -16px;
  top: 0px;

  position: absolute;
  z-index: 999999999999;
  height: 0;
  overflow: hidden;
  transition: all 0.2s;
  background-color: #fff;
  display: flex;

  .link {
    border: 1px solid #ccc;
    border-right: 0px solid #ccc;
    width: 100%;
    height: 100%;
  }

  .link:last-child {
    border: 1px solid #ccc;
  }
}
</style>
