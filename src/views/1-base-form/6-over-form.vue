<template>
  <page>
    <base-form :data="form" ref="form" @event="formEvent"></base-form>
  </page>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      form: {
        list: [
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            tip: true, //重点
          },
          //   {
          //     type: "input",
          //     field: "_input_prepend",
          //     title: "前缀输入框",
          //     prepend: "前缀文字",
          //   },
        ],
        data: {},
        titleWidth: "160px",
      },
    };
  },
  mounted() {
    this.form.data._input =
      "mounted修改mounted修改mounted修改mounted修改mounted修改mounted修改mounted修改mounted修改mounted修改mounted修改";
  },
  methods: {
    formEvent(e) {
      if (e.item.field == "_input") {
        if ((e.event = "btn")) {
          console.log(this.form.data);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
