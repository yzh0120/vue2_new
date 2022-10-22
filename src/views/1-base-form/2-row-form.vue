<template>
  <page>
    <base-form :data="form" ref="form" @event="formEvent">
      <template #mySlot>
        <el-input placeholder="请输入内容" v-model="form.data.xxx">
          <template slot="prepend">Http://</template>
        </el-input>
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
        isRow: true, //重点
        list: [
          // {
          //   type: "treeselect",
          //   field: "__treeselect",
          //   title: "树选择",
          //   opt: [],
          //   id: "id1",
          //   text: "label1",
          //   children: "subOptions",
          //   // labelWidth: "0px",
          //   rules: [{ required: true, message: "请输入" }],
          //   // xs: 8, //<768px
          //   // sm: 2, //≥768px
          //   // md: 2, //≥992px
          //   // lg: 24, //≥1200px
          //   // xl: 24, //≥1920px
          // },
          // {
          //   type: "treeselect",
          //   field: "__treeselectCreate",
          //   title: "多选树选择",
          //   opt: [],
          //   mult: true,
          //   id: "id1",
          //   text: "label1",
          //   children: "subOptions",
          //   rules: [{ required: true, message: "请输入" }],
          // },
          ////////////////////////////////////////////////////////////////////////
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            md: 8,
            lg: 6,
          },
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            md: 8,
            lg: 6,
          },
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            md: 8,
            lg: 6,
          },
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            md: 8,
            lg: 6,
          },
          {
            type: "input",
            field: "_input",
            title: "普通输入框",
            rules: [
              { required: true, message: "请输入" },
              { validator: self.$validator.numberpoint },
            ],
            md: 8,
            lg: 6,
          },
          // {
          //   type: "input",
          //   field: "_input_prepend",
          //   title: "前缀输入框",
          //   prepend: "前缀文字",
          // },
          // {
          //   type: "input",
          //   field: "_input_append",
          //   title: "后缀输入框",
          //   append: "后缀文字",
          // },
          // {
          //   type: "input",
          //   field: "_input_btn",
          //   title: "按钮输入框",
          //   btn: "搜索",
          // },
          // {
          //   type: "password",
          //   field: "_password",
          //   title: "密码输入框",
          // },

          // {
          //   type: "inputrange",
          //   field: "_inputrange",
          //   title: "范围输入框",
          // },
          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "select",
          //   field: "_select",
          //   title: "普通下拉框",
          //   opt: [
          //     {
          //       text: "选择1",
          //       value: "1",
          //     },
          //     {
          //       text: "选择2",
          //       value: "2",
          //     },
          //   ],
          // },

          // {
          //   type: "select",
          //   field: "_select_remote",
          //   title: "远程过滤下拉框",
          //   opt: [
          //     { text: "选项一", value: 1 },
          //     { text: "选项二", value: 2 },
          //   ],
          //   remote: self.select_remote,
          // },
          // {
          //   type: "select",
          //   field: "_select_mult",
          //   title: "多标签下拉框",
          //   opt: [
          //     { text: "选项一", value: 1 },
          //     { text: "选项二", value: 2 },
          //   ],
          //   mult: true,
          // },
          // {
          //   type: "select",
          //   field: "_select_create",
          //   title: "创造标签下拉框",
          //   opt: [
          //     { text: "选项一", value: 1 },
          //     { text: "选项二", value: 2 },
          //   ],
          //   create: true,
          // },
          ////////////////////////////////////////////////////////////////////////
          // { type: "year", field: "_year", title: "年选择器" },
          // { type: "month", field: "_month", title: "月选择器" },
          // { type: "date", field: "_date", title: "年月日选择器" },
          // { type: "dates", field: "_dates", title: "多年月日选择器" },
          // { type: "week", field: "_week", title: "星期选择器" },
          // { type: "datetime", field: "_datetime", title: "年月日_时间选择器" },
          // {
          //   type: "datetimerange",
          //   field: "_datetimerange",
          //   title: "年月日_时间范围选择器",
          // },
          // { type: "daterange", field: "_daterange", title: "年月日范围选择器" },
          // { type: "monthrange", field: "_monthrange", title: "月范围选择器" },
          // { type: "time", field: "_time", title: "时间范围选择器" },
          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "switch",
          //   field: "_switch",
          //   title: "开关",
          //   av: 1,
          //   iav: 0,
          //   avText: "同意",
          //   iavText: "否决",
          // },
          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "radio",
          //   field: "_radio",
          //   title: "单选框",
          //   opt: [
          //     { text1: "单选一", value1: 1 },
          //     { text1: "单选二", value1: 2 },
          //   ],
          //   text: "text1",
          //   value: "value1",
          // },
          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "checkbox",
          //   field: "_checkbox",
          //   title: "多选框",
          //   opt: [
          //     { text1: "多选一", value1: 1 },
          //     { text1: "多选二", value1: 2 },
          //   ],
          //   text: "text1",
          //   value: "value1",
          // },
          ////////////////////////////////////////////////////////////////////////
          // {
          //   type: "auto",
          //   field: "_auto",
          //   title: "远程搜索",
          //   filter: self.auto_filter,
          //   key: "value1",
          // },
          ////////////////////////////////////////////////////////////////////////

          // {
          //   type: "textarea",
          //   field: "_textarea",
          //   title: "文本输入框",
          //   row: 1,
          // },

          // { slot: "mySlot", field: "xxx", title: "自定义插槽" },
        ],
        data: {},
        titleWidth: "160px",
      },
    };
  },
  mounted() {
    let arr = [
      {
        id1: "a",
        label1: "a",
        subOptions: [
          {
            id1: "aa",
            label1: "aa",
          },
          {
            id1: "ab",
            label1: "ab",
          },
        ],
      },
      {
        id1: "b",
        label1: "b",
      },
      {
        id1: "c",
        label1: "c",
      },
    ];
    this._set(this.form, "__treeselect", { opt: arr });

    this._set(this.form, "__treeselectCreate", { opt: arr });
  },
  methods: {
    //下拉框的本地过滤函数  有一点问题  目前建议用 select_remote 代替
    select_filterFn(query, row) {
      console.log(query, row, "query");
      let arr = [
        { text: "选项一", value: 1 },
        { text: "选项二", value: 2 },
      ];
      this._set(this.form, "_select_filterFn", { opt: arr });
    },
    //下拉框的远程过滤函数
    select_remote(query) {
      console.log(query, "query");
      let arr = [
        { text: query + "选项一", value: 1 },
        { text: query + "选项二", value: 2 },
      ];
      this._set(this.form, "_select_remote", { opt: arr });
    },
    //auto的自动补全
    auto_filter(queryStr, cd) {
      //自动补全
      let res = [
        {
          value1: "三全鲜食（北新泾店）",
          address: "长宁区新渔路144号",
        },
        {
          value1: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
      ];
      cd(res);
    },
    formEvent(e) {
      console.log(e, "表单事件");
      if (e.item.field == "_input_btn") {
        if ((e.name = "btn")) {
          console.log(this.form.data);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
