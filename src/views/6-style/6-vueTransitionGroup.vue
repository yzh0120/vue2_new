<!--
 * @Author: yz
 * @Date: 2022-11-09 14:40:08
 * @Description: 
 * 
-->
<template>
  <page>
    <div id="demo">
      <el-button class="add-btn" type="success" @click="handleAdd">添加</el-button>
      <div>
        <h3>数据展示区:</h3>
        <!-- 

        1.2、需要注意的点
        1、多个动画列表过渡时，必须设置key值! 并且需要注意的是这个key不要使用index索引
        2、transition-group与transition不同，它会以一个真实元素呈现：默认的是一个span标签包裹
        如果使用的是index索引去处理，那么会有个问题，就是在删除的时候Vue的diff算法去寻找dom的差异性就会按照index从上往下去找其中的区别，就导致删除的永远是最后一项。
       -->
        <transition-group name="myfade" tag="ul">
          <li v-for="item in dataList" :key="item.id">
            {{ item.label }}
            <el-button type="text" @click="handleRemove(item)">remove</el-button>
          </li>
        </transition-group>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      value: "",
      dataList: [],
    };
  },
  methods: {
    //添加子项
    handleAdd() {
      this.dataList.push({
        id: new Date().getTime(),
        label: this.value,
      });
      this.value = "";
      console.log(this.dataList);
    },
    //删除子项
    handleRemove(row) {
      console.log(row.id);
      this.dataList = this.dataList.filter((item) => item.id != row.id);
      console.log("删除操作", this.dataList);
    },
  },
};
</script>

<style scoped>
/* 效果过程 */
.myfade-enter-active,
.myfade-leave-active {
  transition: all 0.8s linear;
}

/* 进场的瞬间与离场的效果添加 */
.myfade-enter,
.myfade-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
</style>
