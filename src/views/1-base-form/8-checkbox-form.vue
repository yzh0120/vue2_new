<template>
  <page>
    <el-button type="primary" @click="go">主要按钮</el-button>
    <base-form :data="form" ref="form" @event="formEvent">
      <template #mySlot>
        <el-checkbox v-model="form.data.checked" @change="change">备选项</el-checkbox>
      </template>
    </base-form>
  </page>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      form: {
        span: true,
        list: [

          ////////////////////////////////////////////////////////////////////////
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            span: 12,
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
          },
          {
            type: "input",
            field: "_input2",
            title: "普通输入框",
            span: 12,
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
          },

          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "checkbox",
          //   field: "_checkbox",
          //   // title: "多选框",
          //   span: 24,
          //   // labelWidth: "0px",
          //   opt: [
          //     { text1: "显示隐藏", value1: 1 },
          //     // { text1: "多选二", value1: 2 },
          //   ],
          //   text: "text1",
          //   value: "value1",
          // },
          { slot: "mySlot", field: "checked", title: "多选框",  span: 24, },
          {
            type: "input",
            field: "_input3",
            title: "普通输入框",
            span: 12,

            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
          },
          {
            type: "input",
            field: "_input4",
            title: "普通输入框",
            span: 12,

            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
          },
          ////////////////////////////////////////////////////////////////////////

        ],
        data: {checked:true},
        // titleWidth: "160px",
      },
    };
  },
  watch: {
    // "form.data": {
    //   handler() { 

    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  mounted() {
    // this.formEvent({item:{field:"_checkbox"},name:"checkbox"})
  },
  methods: {
    change(e){
      console.log(e,"e")
      this._set(this.form, ["_input4", "_input3"], { show: e ? true : false })
          this._setData(this.form, ["_input4", "_input3"], null)
    },

    formEvent(e) {
      // if (e.item.field == "_checkbox") {
      //   if ((e.name == "checkbox")) {
      //     this._set(this.form, ["_input4", "_input3"], { show: e.value[0] ? true : false })
      //     this._setData(this.form, ["_input4", "_input3"], null)
      //   }
      // }

    },
    go() {
      this.$refs.form.check();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
