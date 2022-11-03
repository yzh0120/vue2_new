<template>
  <page>
    <el-button @click="set_checkbox">设置勾选</el-button>
    <el-tree
      show-checkbox
      @check-change="handleCheckChange"
      ref="tree"
      :data="data"
      node-key="id"
    >
    </el-tree>
  </page>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    // set_checkbox() {// node对象 的键值对 需要和 data里面的一样
    // 	this.$refs.tree.setCheckedNodes([{
    // 	             id: 10,
    // 	             label: '三级 1-1-2'
    // 	           }])
    // 	console.log(this.$refs.tree.getCheckedNodes())
    // },
    set_checkbox() {
      //搭配key-node

      this.$refs.tree.setCheckedKeys([4]); //[4]  和 [9,10]  效果一样

      // console.log(this.$refs.tree.getCheckedKeys())
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
  },
};
</script>

<style>
</style>
