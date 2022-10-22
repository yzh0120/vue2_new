<template>
  <!-- 
element-ui的el-form表单和el-table校验嵌套使用校验el-input和el-select
https://blog.csdn.net/weixin_46724415/article/details/122705528

 -->
  <page>
    <!-- <el-form :model="formData" :rules="formData.rules" ref="formRef">
      <el-table :data="formData.tableData" style="width: 100%">
        <el-table-column prop="id" label="单号" width="100"> </el-table-column>
        
        <el-table-column prop="name" label="商品名" width="180">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.name'"
              :rules="formData.rules.name"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      
        <el-table-column prop="class" label="分类">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.class'"
              :rules="formData.rules.selected"
            >
              <el-select v-model="scope.row.class">
                <el-option
                  v-for="item in classOption"
                  :key="`${item.value}${scope.$index}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form> -->
    <el-form :model="formData" :rules="formData.rules" ref="formRef">
      <el-table :data="formData.tableData" style="width: 100%">
        <el-table-column prop="num" label="单号" width="100"> </el-table-column>
        <!-- 第一个输入框里 -->
        <el-table-column prop="name" label="商品名" width="180">
          <template slot-scope="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.name`"
              :rules="[
                { required: true, message: '此项不能为空', trigger: 'blur' },
              ]"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 第二个下拉框里 -->
        <el-table-column prop="select" label="分类">
          <template slot-scope="scope">
            <el-form-item
              :prop="`tableData.${scope.$index}.select`"
              :rules="[{ required: true, message: '请选择', trigger: 'blur' }]"
            >
              <el-select v-model="scope.row.select">
                <el-option
                  v-for="item in classOption"
                  :key="`${item.value}${scope.$index}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button @click="submitForm('formRef')">提交</el-button>
  </page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        // rules: {
        //   name: {
        //     required: true,
        //     message: "请输入商品名",
        //     tirgger: ["blur", "change"],
        //   },
        //   selected: {
        //     required: true,
        //     message: "请选择",
        //     tirgger: "change",
        //   },
        // },

        //tableData之所以方法哦formData里面是为了表单校验
        tableData: [
          { num: 1, name: "001", select: 1 },
          { num: 2, name: "001", select: 1 },
          { num: 3, name: "001", select: 1 },
        ],
      },
      classOption: [
        {
          value: 1,
          label: "分类1",
        },
        {
          value: 2,
          label: "分类2",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>