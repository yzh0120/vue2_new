<template>
  <page>
    <el-button @click="add">新增</el-button>
    <!-- 表格 -->
    <vxe-grid class="reverse-table" v-bind="gridOptions">
      <template #demo="{ row, columnIndex }">
        <div>
          <!-- 
            columnIndex  代表了第几列  
            col${index}   是代表了第几行的值
           -->
          <!-- <div v-if="columnIndex == 1">
            <span v-if="row.col0 == '科目'">{{eval(`row.col${columnIndex}`)  }}</span>
            <span v-else>{{row.col1 | formatMoney}}</span>
          </div>
          <div v-else-if="columnIndex == 2">
            <span v-if="row.col0 == '科目'">{{row.col2 }}</span>
            <span v-else>{{row.col2 | formatMoney}}</span>
          </div>
          <div v-else-if="columnIndex == 3">
            <span v-if="row.col0 == '科目'">{{row.col3 }}</span>
            <span v-else>{{row.col3 | formatMoney}}</span>
          </div> -->

          <span v-if="row.col0 == '科目'">{{ eval(row, columnIndex) }}</span>
          <span v-else>{{ eval(row, columnIndex) }}</span>

          <el-button type="text" v-if="row.col0 == '科目'" @click="edit(row, columnIndex)">编辑</el-button>
          <el-button type="text" v-if="row.col0 == '科目'" @click="del(row, columnIndex)">删除</el-button>
        </div>
      </template>
    </vxe-grid>

    <!-- 弹窗 -->
    <vxe-modal v-model="alert" width="800" height="600" showFooter title="产品分配标准" @close="alertCancel">
      <base-form :data="formData" ref="form"></base-form>
      <template #footer>
        <el-button @click="alertCancel" plain>取消</el-button>
        <el-button type="primary" @click="alertConfirm">确认</el-button>
      </template>
    </vxe-modal>
  </page>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      formData: {
        list: [
          { type: "input", field: "statDate", title: "科目" },
          { type: "input", field: "moneyFunds", title: "货币资金" },
          { type: "input", field: "id", title: "id" },
        ],
        data: {},
      },
      confirmData: {
        flag: false,
        w: "1066px",
        h: "800px",
        title: "基础弹窗",
      },
      gridOptions: {
        border: false,
        showOverflow: false,
        height: 400,
        showHeader: false,
        columns: [],
        data: [],
      },
      //这个是给reverseTable使用的  table的字段
      columnsList: [
        { field: "statDate", title: "科目" },
        { field: "moneyFunds", title: "货币资金" },
      ],
      mytableDataList: [], //这个是给reverseTable使用的  table的数据
    };
  },
  created() {
    this.reverseTable(this.columnsList, this.mytableDataList);
  },
  methods: {
    getData(columnsList, list) {
      this.reverseTable(columnsList, list);
    },
    //新增
    add() {
      this.alert = true;
      // this.reverseTable(this.columnsList, []);
    },
    //编辑
    edit(row, columnIndex) {
      this.confirmData.flag = true;
      this.formData.data = this.$fn.deepClone(
        this.mytableDataList[columnIndex - 1]
      );
    },
    //删除
    del(row, columnIndex) {
      console.log(row, columnIndex);
    },



    alertCancel() {
      this._reset(this.formData)
      this.alert = false;
    },
    // 弹窗确认
    alertConfirm() {
      this.mytableDataList.push(this.$fn.deepClone(this.formData.data));
      this.getData(this.columnsList, this.mytableDataList);
      this.alertCancel()
    },
    // alertEvent(e) {
    //   //确认
    //   if (e.name == "confirm") {
    //     this.mytableDataList.push(this.$fn.deepClone(this.formData.data));

    //     this.getData(this.columnsList, this.mytableDataList);
    //     this.alertEvent({ name: "cancel" });
    //   }
    //   //取消
    //   if (e.name == "cancel") {
    //     // this.$refs.form.reset();
    //     this._reset(this.formData)
    //     this.confirmData.flag = false;
    //   }
    // },
    eval(row, columnIndex) {
      return row[`col${columnIndex}`];
    },

    // 反转函数  设置竖向表格的方法
    reverseTable(columnsList, list, num) {
      const buildData = columnsList.map((column) => {
        const item = { col0: column.title };
        list.forEach((row, index) => {
          item[`col${index + 1}`] = row[column.field];
        });
        return item;
      });
      const buildColumns = [
        {
          field: "col0", //col0 是标题
          fixed: "left",
          width: 80,
        },
      ];
      list.forEach((item, index) => {
        buildColumns.push({
          field: `col${index + 1}`,
          minWidth: 120,
          slots: {
            default: "demo",
          },
        });
      });
      console.log(buildData, "buildData", buildColumns);
      /*
      在没有数据的情况下
        buildData :[
          {
            col0: "科目"
            _XID: "row_133"
          },
          {
            col0: "货币资金"
            _XID: "row_134"
          }
        ]

        buildColumns:[
          {              
            field: "col0"
            fixed: "left"
            width: 80
          },
        ]
      */
      /*
      在有数据的情况下
        buildData :[
          {
            col0: "科目"   //这是来自this.columnsList的标题
            col1: "科目1"  //这是手动填写的
            col2: "科目2"  //这是手动填写的
            _XID: "row_133"
          },
          {
            col0: "货币资金"   //这是来自this.columnsList的标题
            col1: "货币资金1"  //这是手动填写的
            col2: "货币资金2"  //这是手动填写的
            _XID: "row_134"
          }
        ]

        buildColumns:[
          {               //这是title
            field: "col0"
            fixed: "left"
            width: 80
          },
          {               //这是手动填写的
            field: "col1"
            minWidth: 120,
            slots: {
              default: "demo",
            },
          },
          {                //这是手动填写的
            field: "col2"
            minWidth: 120,
            slots: {
              default: "demo",
            },
          }
        ]
      */
      this.gridOptions.data = buildData;
      this.gridOptions.columns = buildColumns;
      /*
      this[`gridOptions${num}`].data = buildData;
      this[`gridOptions${num}`].columns = buildColumns;
      */
    },
  },
};
</script>

<style>
.reverse-table .vxe-body--row .vxe-body--column:first-child {
  background-color: #f8f8f9;
}
</style>
