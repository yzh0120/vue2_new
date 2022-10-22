
<!-- 单选框
 type:'radio '                              控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 
 opt : [text:'描述',value:'值']             控件下拉选项
 text:"aaa",                                opt对应的text
 value:'bbb'                                opt对应的value
 -->
<template>
  <el-radio-group v-model="data[item.field]" @change="change">
    <el-radio
      :label="childItem[value]"
      v-for="(childItem, childIndex) in item.opt"
      :key="childIndex"
      >{{ childItem[text] }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  props: ["data", "item"],
  data() {
    return {};
  },
  methods: {
    change(e) {
      this.$emit("baseFormEvent", { name: "radio", value: e });
    },
  },
  computed: {
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
