
<!-- 下拉框
 type:'select'                             控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 
 opt : [text:'描述',value:'值']             控件下拉选项
 text:"aaa",                                opt对应的text
 value:'bbb'                                opt对应的value
 filter :函数                               补全过滤器   默认情况下，Select 会找出所有label属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现
 filterFn                                   过滤函数
 remote                                     远程搜索
 mult : true                                多标签选择模式
 disabled:true                              禁用
 -->
<template>
  <el-select
    style="width: 100%"
    v-model="data[item.field]"
    :disabled="item.disabled"
    clearable
    :placeholder="_getPlaceholder(item)"
    @change="change"
    @clear="setValueNull"
    :multiple="mult || item.create"
    :allow-create="item.create"
    filterable
    :filter-method="item.filterFn"
    :remote="remote"
    :remote-method="item.remote"
  >
    <el-option
      v-for="(childItem, childIndex) in item.opt"
      :key="childIndex"
      :label="childItem[text]"
      :value="childItem[value]"
    />
  </el-select>
</template>

<script>
export default {
  //   props: ["data", "item"],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    change(nowValue) {
      this.$emit("baseFormEvent", {
        name: "select",
        value: nowValue,
      });
    },
    setValueNull(nowValue) {
      this.$emit("baseFormEvent", {
        name: "clear",
        value: nowValue,
      });
    },
  },
  computed: {
    mult() {
      if (this.item.mult) {
        return true;
      } else {
        return false;
      }
    },
    filter() {
      if (this.item.filter) {
        return true;
      } else {
        return false;
      }
    },
    remote() {
      if (this.item.remote) {
        return true;
      } else {
        return false;
      }
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
