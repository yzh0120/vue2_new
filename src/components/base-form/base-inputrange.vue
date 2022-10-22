
<!-- 输入框
 type:'input '                              控件类型
 field:xxx                                  控件对应的字段      
 title: '账号',                             控件描述
 rules:[],                                  控件校验规则
 disabled:true                              禁用
 -->
 <!--  -->
<template>
  <div class="flex">
    <el-input
      v-model="start"
      :type="item.type"
      :disabled="item.disabled"
      placeholder="最小值"
      @clear="setValueNull(`clear1`)"
      @blur="blur(data[item.field], 'blur1')"
      @focus="focus(data[item.field], 'focus1')"
      @input="input(data[item.field], 'input1')"
      clearable
      :maxlength="item.max"
    ></el-input>
    <span> 至 </span>
    <el-input
      v-model="end"
      :type="item.type"
      :disabled="item.disabled"
      placeholder="最大值"
      @clear="setValueNull(`clear2`)"
      @blur="blur(data[item.field], 'blur2')"
      @focus="focus(data[item.field], 'focus2')"
      @input="input(data[item.field], 'input2')"
      clearable
      :maxlength="item.max"
    ></el-input>
  </div>
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
    return {
      start: "",
      end: "",
    };
  },
  methods: {
    blur(value, event) {
      this.$emit("baseFormEvent", {
        name: event,
        value: value,
      });
    },
    focus(value, event) {
      this.$emit("baseFormEvent", {
        name: event,
        value: value,
      });
    },
    input(value, event) {
      this.$emit("baseFormEvent", {
        name: event,
        value: value,
      });
    },
    setValueNull(event) {
      //nowValue:
      this.$emit("baseFormEvent", {
        name: event,
        value: undefined,
      });
    },
  },
  computed: {
    xxx: {
      get() {
        if (
          this.$fn.type(this.data[this.item.field]) != "arr" ||
          (this.$fn.type(this.data[this.item.field]) == "arr" &&
            this.data[this.item.field].length != 2)
        ) {
          // this.data[this.item.field] = ["", ""];
          this.$set(this.data, this.item.field, ["", ""]);
        }
        return this.data[this.item.field];
      },
      set(val) {
        // this.data[this.item.field] = val;
        this.$set(this.data, this.item.field, val);
      },
      // get() {
      //   if (
      //     this.$fn.type(this.data[this.item.field]) != "arr" ||
      //     (this.$fn.type(this.data[this.item.field]) == "arr" &&
      //       this.data[this.item.field].length != 2)
      //   ) {
      //     this.data[this.item.field] = ["", ""];
      //   }
      //   return this.data[this.item.field];
      // },
      // set(val) {
      //   this.data[this.item.field] = val;
      // },
    },
  },
  watch: {
    start: {
      handler(newVal) {
        let arr = this.$fn.deepClone(this.xxx);
        arr[0] = this.start;
        this.xxx = arr;
      },
      immediate: true,
    },
    end: {
      handler(newVal) {
        let arr = this.$fn.deepClone(this.xxx);
        arr[1] = this.end;
        this.xxx = arr;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.flex {
  display: flex;
  flex: 1;
}
</style>
