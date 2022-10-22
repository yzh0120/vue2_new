
<!-- 多选框
 type:'checkbox '                           控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 
 opt : [text:'描述',value:'值']            控件下拉选项
 text:"aaa",                                opt对应的text
 value:'bbb'                                opt对应的value
-->
<template>
  <el-checkbox-group v-model="xxx" @change="change">
    <el-checkbox
      :label="childItem[value]"
      v-for="(childItem, childIndex) in item.opt"
      :key="childIndex"
      >{{ childItem[text] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  props: ["data", "item"],
  data() {
    return {};
  },
  methods: {
    change(e) {
      this.$emit("baseFormEvent", { name: "checkbox", value: e });
    },
  },
  computed: {
    xxx: {
      get() {
        if (this.$fn.type(this.data[this.item.field]) != "arr") {
          this.$set(this.data, this.item.field, []);
        }
        return this.data[this.item.field];
      },
      set(val) {
        this.$set(this.data, this.item.field, val);
      },
      // get() {
      //   if (this.$fn.type(this.data[this.item.field]) != "arr") {
      //     this.data[this.item.field] = [];
      //   }
      //   return this.data[this.item.field];
      // },
      // set(val) {
      //   this.data[this.item.field] = val;
      // },
    },
    text() {
      if (this.item.text) {
        return this.item.text;
      } else {
        return "text";
      }
    },
    value() {
      if (this.item.value) {
        return this.item.value;
      } else {
        return "value";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
