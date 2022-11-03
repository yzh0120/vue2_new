<template>
  <page>
    <el-tree
      @node-click="nodeClick"
      :props="defaultProps"
      lazy
      :load="loadNode"
    >
    </el-tree>
  </page>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text",
      },
    };
  },
  methods: {
    // 懒加载点击node上的文字会触发  左边的箭头不会触发此方法
    nodeClick(data, node) {
      console.log(data, node);
    },
    //一进页面也会执行此方法,所以不需要:data="treeData"
    //点击tree 动态加载  ,
    //此方法会比 node-click先执行
    // 如果一个节点的 isLeaf 是true,则不会执行此方法,只会执行 node-click
    loadNode(node, resolve) {
      //resolve是一个方法 用来合并返回的数据  resolve(res.data);
      let params = {
        // parentId: node.data.id,
      };
      this.getTree(params, resolve);
    },

    //获取tree
    getTree(params, resolve) {
      setTimeout(() => {
        resolve([
          {
            text: "一级 ---11",
            children: [],
          },
        ]);
      }, 2000);
    },
  },
};
</script>

<style>
</style>
