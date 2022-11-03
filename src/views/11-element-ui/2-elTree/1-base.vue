<template>
  <page>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </page>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          text: "一级 11",
          ddd: "ddd",
          children: [
            {
              text: "二级 1-1",
              ddd: "ddd",
              children: [
                {
                  text: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          text: "一级 2",
          ddd: "ddd",
          children: [
            {
              text: "二级 2-1",
              children: [
                {
                  text: "三级 2-1-1",
                },
              ],
            },
            {
              text: "二级 2-2",
              children: [
                {
                  text: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          text: "一级 3",
          children: [
            {
              text: "二级 3-1",
              children: [
                {
                  text: "三级 3-1-1",
                },
              ],
            },
            {
              text: "二级 3-2",
              children: [
                {
                  text: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "text",
      },
    };
  },
  methods: {
    //点击node上的文字会触发  左边的箭头不会触发此方法
    handleNodeClick(data, node) {
      console.log(data, node);
    },
  },
};
</script>

<style>
</style>
