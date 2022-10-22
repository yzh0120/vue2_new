
 <!-- input自动补全
  type:'auto'                                控件类型
  field:xxx                                  控件对应的字段      
  title: '账号',                             控件描述
  rules:[],                                  控件校验规则
  key:""                                     显示的字段
  filter:函数                                过滤函数
  -->
<template>
  <el-autocomplete
    v-model="data[item.field]"
    :type="item.type"
    :disabled="item.disabled"
    :placeholder="_getPlaceholder(item)"
    :fetch-suggestions="item.filter"
    clearable
    @select="handleSelect"
    style="width: 100%"
    :value-key="item.key"
  />
</template>

<script>
export default {
  props: ["data", "item"],
  data() {
    return {};
  },
  methods: {
    focus() {},
    handleSelect(nowValue) {
      this.$emit("baseFormEvent", {
        name: "auto",
        value: nowValue,
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
