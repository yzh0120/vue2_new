<!--
 * @Author: yz
 * @Date: 2022-11-09 14:28:34
 * @Description: 
 * 
-->
<template>
  <page>

    <div style="height:10000px">
      <el-button type="primary" @click="click">显示/隐藏</el-button>


      <transition name="fade">
        <!-- 
        vue提供的wrapper包装组件——transition，在包裹的元素中，有涉及到v-if，,v-show, 动态组件,组件根节点,，都会给它们添加进入/离开的过渡效果。
       -->
        <p v-if="show" style="width: 100px;height:100px;background-color: burlywood">hello</p>
      </transition>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    click() {
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
// 活动的
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
