<!--
 * @Author: yz
 * @Date: 2022-11-09 10:15:12
 * @Description: 
 * 
-->
<template>
  <page>
    <div class="transition"></div>

    <p>鼠标移动到 div 元素上，查看过渡效果。</p>
  </page>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.transition {
  width: 100px;
  height: 100px;
  background: red;
  transition: width 2s;

  &:hover {
    width: 300px;
  }
}
</style>
