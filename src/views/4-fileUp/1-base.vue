<template>
  <page>
    首页

    <fileList :fileList="fileList" :projectId="123456789"></fileList>
  </page>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "中标通知书",
          taskName: "中标通知书",
          detail: [],
          require: 0,
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
