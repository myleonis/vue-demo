<template>
  <!-- d1是外层div，带滚动条-->
  <div id='d1' style='height:200px;width:100px;overflow:auto;background:blue;'>
    <div style='height:500px;width:500px;background:yellow'>2222</div>
  </div>
</template>

<script>
  export default {
    name: "RollBarTest",
    mounted() {
      document.getElementById('d1').scrollTop=100;//通过scrollTop设置滚动到100位置
      document.getElementById('d1').scrollLeft=200;//通过scrollTop设置滚动到200位置
    }
  }
</script>

<style rel="stylesheet/scss" scoped>
  #wrap {
    height:300px;
    overflow:auto;
  }
  #inner {
    background-color: #cccccc;
  }
</style>
