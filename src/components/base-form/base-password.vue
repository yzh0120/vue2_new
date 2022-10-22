

 
 <!-- 密码框
  type:'password'                            控件类型
  field:xxx                                  控件对应的字段      
  title: '账号',                             控件描述
  rules:[],                                  控件校验规则
  disabled:true                              禁用
  -->

<template>
  <el-input
    v-model="data[item.field]"
    :type="item.type"
    :disabled="item.disabled"
    :placeholder="_getPlaceholder(item)"
    @clear="setValueNull"
    show-password
    @blur="blur(data[item.field])"
    @focus="focus(data[item.field])"
  />
</template>

<script>
export default {
  // props: ["data", "item"],
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
    blur(value) {
      this.$emit("baseFormEvent", {
        name: "blur",
        value: value,
      });
    },
    focus(value) {
      this.$emit("baseFormEvent", {
        name: "focus",
        value: value,
      });
    },
    setValueNull(nowValue) {
      this.$emit("baseFormEvent", {
        name: "clear",
        value: nowValue,
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
