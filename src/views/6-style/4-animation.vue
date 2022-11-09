<!--
 * @Author: yz
 * @Date: 2022-11-09 10:54:10
 * @Description: 
 * 
-->
<template>
  <page>
    <div style="height: 100000px;">
      <el-divider>基础动画</el-divider>
      <div class="animation animation_base"></div>

      <el-divider>重复次数</el-divider>
      <div class="animation animation_count"></div>

      <el-divider>延迟</el-divider>
      <div class="animation animation_delay"></div>
    </div>
  </page>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@keyframes myfirst {
  // from {
  //   background: red;
  // }

  // to {
  //   background: yellow;
  // }

  0% {
    background: red;
    transform: translate(0, 0);
  }

  25% {
    background: rgb(0, 255, 115);
    transform: translate(100px, 0);
  }

  50% {
    background: green;
    transform: translate(100px, 100px);
  }

  75% {
    background: blue;
    transform: translate(0, 100px);
  }
}

.animation {
  margin: 0 auto 120px;

  width: 100px;
  height: 100px;
  background: red;

}

.animation_base {
  animation: myfirst 5s;
}

.animation_count {
  animation: myfirst 5s;
  animation-iteration-count: infinite;
}

.animation_delay {
  animation: myfirst 5s;
  animation-delay: 1s;
}
</style>
