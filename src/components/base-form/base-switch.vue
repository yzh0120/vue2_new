
<!-- 开关
 type:'switch'                              控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 av                                开启值 默认true   
 iav                              关闭值 默认false
 avText:"开启"                             开启的提示
 iavText:"开启"                             关闭的提示
  disabled:true                              禁用
 -->
<template>
  <!-- <el-tooltip :content="tooltipTitle(item,data[item.field])" :popper-class="tooltipClass(item,data[item.field])" placement="right"> -->
  <el-switch
    @change="change"
    :active-value="item.av"
    :inactive-value="item.iav"
    :inactive-text="textFalse()"
    :active-text="textTrue()"
    :inactive-color="colorFalse()"
    :active-color="colorTrue()"
    class="demo"
    v-model="data[item.field]"
  ></el-switch>
  <!-- </el-tooltip> -->
</template>

<script>
export default {
  props: ["data", "item"],
  data() {
    return {};
  },
  filters: {},
  methods: {
    change(e) {
      // 默认 true 、false
      this.$emit("baseFormEvent", { name: "switch", value: e });
    },
    // tooltipTitle(data, status) {
    //   let active = data.av ? data.av : true;
    //   let inActive = data.iav ? data.iav : false;
    //   if (status == active) {
    //     return this.item.confirm ? this.item.confirm : "开启";
    //   } else if (status == inActive) {
    //     return this.item.cancel ? this.item.cancel : "关闭";
    //   } else {
    //     return "禁用";
    //   }
    // },
    textFalse() {
      return this.item.iavText ? this.item.iavText : "关闭";
    },
    textTrue() {
      return this.item.avText ? this.item.avText : "开启";
    },
    colorTrue() {
      return "success-tooltip";
    },
    colorFalse() {
      return "success-tooltip";
    },
    // tooltipClass(data, status) {
    //   let active = data.av ? data.av : true;
    //   if (status == active) {
    //     return "success-tooltip";
    //   } else {
    //     return "failed-tooltip";
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
//  .demo .el-switch__label {
//     position: absolute;
//     display: none;
//     color: #fff;
//   }
//   /*打开时文字位置设置*/
//   .demo .el-switch__label--right {
//     z-index: 1;
//    right: -3px;
//  }
//  /*关闭时文字位置设置*/
//  .demo .el-switch__label--left {
//    z-index: 1;
//    left: 19px;
//  }
//  /*显示文字*/
//  .demo .el-switch__label.is-active {
//    display: block;
//  }
//  .demo.el-switch .el-switch__core,
//  .el-switch .el-switch__label {
//    width: 50px !important;
// }
</style>
