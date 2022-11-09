<!--
 * @Author: yz
 * @Date: 2022-11-09 10:21:08
 * @Description: 
 * 
-->
<template>
  <page>
    <div style="height: 100000px;">
      <el-divider></el-divider>

      <div class="before_transform">translate 平移</div>

      <div class="before_transform after_translate">translate 平移</div>

      <el-divider></el-divider>


      <div class="before_transform">rotate 旋转</div>

      <div class="before_transform after_rotate">rotate 旋转</div>

      <el-divider></el-divider>


      <div class="before_transform">scale 缩放</div>

      <div class="before_transform after_scale">scale 缩放</div>

      <el-divider></el-divider>


      <div class="before_transform">skew 倾斜</div>

      <div class="before_transform after_skew">skew 倾斜</div>

      <el-divider>结合transform</el-divider>
      <div class="transform_scale">
        结合transform
      </div>


    </div>
  </page>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.before_transform {
  margin: 0 auto;
  width: 100px;
  height: 75px;
  background-color: red;
  border: 1px solid black;
}

.after_translate {
  transform: translate(50px, 20px);
}

// .before_rotate {
//   width: 100px;
//   height: 75px;
//   background-color: red;
//   border: 1px solid black;
// }

.after_rotate {
  transform: rotate(30deg);
}

// .before_scale {
//   width: 200px;
//   height: 100px;
//   background-color: yellow;
//   border: 1px solid black;
//   border: 1px solid black;
// }

.after_scale {
  margin-top: 150px;
  margin-bottom: 150px;
  transform: scale(1, 3);
}

// .before_skew {
//   width: 100px;
//   height: 75px;
//   background-color: red;
//   border: 1px solid black;
// }

.after_skew {
  transform: skew(30deg, 0deg);
}

.transform_scale {
  margin: 0 auto;
  width: 100px;
  height: 75px;
  background-color: red;
  border: 1px solid black;
  transition: transform .3s;

  &:hover {
    transform: scale(1, 3);
  }
}
</style>
