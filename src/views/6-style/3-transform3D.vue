<!--
 * @Author: yz
 * @Date: 2022-11-09 10:21:08
 * @Description: 
 * 
-->
<template>
  <!-- 
    https://www.cnblogs.com/xiaohuochai/p/5351477.html


    https://blog.csdn.net/qq_32013641/article/details/89070248
   -->
  <page>
    <div style="height: 100000px;">
      <el-divider>基础3D</el-divider>


      <div class="base_box">
        <div class="transform3D_transform">rotateX(90deg)</div>
      </div>

      <div class="base_box">
        <div class="transform3D_transform_animation animation"></div>
      </div>


      <div class="base_box">
        <div class="transform3D_transform_animation2 animation_transform_origin"></div>
      </div>
    </div>
  </page>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.base_box {
  // 视距(透视)  产生近大远小的效果 写在被观察的父盒子上  如果需要在网页产生3d效果需要透视(理解为3D物体投影到2D平面内) 
  perspective: 800px !important;
  //视距的原点 
  perspective-origin: center -300px;
  // 控制子元素开启三维立体环境 代码是写给父级 但是影响的是子盒子
  transform-style: preserve-3d !important;
}

.transform3D_transform {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
  transform: rotateX(90deg);
}

///////////////////////////////////////////////
.transform3D_transform_animation {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  background-color: pink;
  position: relative;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: blue;
    position: absolute;
    top: 0px;
    left: 50%;
    border-radius: 50%;
  }

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: green;
    position: absolute;
    bottom: 0px;
    left: 50%;
    border-radius: 50%;
  }

  // transform: rotateX(90deg);
}

.animation {
  animation: myfirst 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes myfirst {

  0% {
    transform: rotateY(0deg) rotateX(90deg);
  }

  25% {
    transform: rotateY(90deg) rotateX(90deg);
  }

  50% {
    transform: rotateY(180deg) rotateX(90deg);
  }

  75% {
    transform: rotateY(270deg) rotateX(90deg);
  }

  100% {
    transform: rotateY(360deg) rotateX(90deg);
  }
}

///////////////////////////////////////////////
.transform3D_transform_animation2 {
  width: 200px;
  height: 200px;
  margin: 500px auto 0;
  background-color: pink;
  transform-origin: 50% 50% -500px;
  // transform: rotateY(50deg);
}

.animation_transform_origin {
  animation: myfirst_transform_origin 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes myfirst_transform_origin {

  0% {
    transform: rotateY(0deg);
  }

  25% {
    transform: rotateY(90deg);
  }

  50% {
    transform: rotateY(180deg);
  }

  75% {
    transform: rotateY(270deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>
