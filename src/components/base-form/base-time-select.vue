
<!-- 时间选择器
 type:'time '                               控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 :picker-options="item.pickerOpt"           控件选项  见文档
  disabled:true                              禁用
 -->

<template>
  <el-time-picker
    style="width: 100%"
    v-model="data[item.field]"
    :picker-options="item.pickerOpt"
    :value-format="valueFormat"
    clearable
    :placeholder="_getPlaceholder(item)"
    :disabled="item.disabled"
    @change="change"
  >
  </el-time-picker>
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
  computed: {
    opt() {
      if (this.item.pickerOpt) {
        return this.item.pickerOpt;
      } else {
        return {
          selectableRange: "00:00:00 - 23:59:59",
        };
      }
    },
    valueFormat() {
      if (this.item.valueFormat) {
        return this.item.valueFormat;
      } else {
        return "HH:mm";
      }
    },
  },
  methods: {
    change(nowValue) {
      //无效
      this.$emit("baseFormEvent", {
        name: "time",
        value: nowValue,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
