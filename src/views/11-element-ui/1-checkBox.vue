<template>
  <page>
    <el-checkbox-group v-model="memberList" class="box">
      <div v-for="(item, index) in tableData" :key="index" class="div">
        <el-card shadow="hover">
          <el-checkbox :label="item">
            <svgIcon :icon="item" className="aaa"></svgIcon>
          </el-checkbox>
        </el-card>
      </div>
    </el-checkbox-group>
  </page>
</template>

<script>
export default {
  data() {
    return {
      memberList: [],
      tableData: [
        "program-code",
        "wenjianshangchuan",
        "biaodanzujian-biaoge",
        "input",
        "gouwucheman",
      ],
    };
  },
};
</script>

<style style="scss" scoped>
.box {
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
}
.div {
  margin: 10px;
  width: 100px;
}
.aaa {
  font-size: 40px;
}
</style>
