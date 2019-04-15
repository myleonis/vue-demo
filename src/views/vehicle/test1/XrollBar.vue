<template>
  <div class="container">
    <nav class="nav">
      <ul class="con">
        <li>元素一</li>
        <li>元素二</li>
        <li>元素三</li>
        <li>元素四</li>
        <li>元素五</li>
        <li>元素六</li>
        <li>元素七</li>
        <li>元素八</li>
      </ul>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "XrollBar"
    }
</script>

<style rel="stylesheet/scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .container {
    height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }

  .nav {
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: #999;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    padding-bottom: 20px;
  }

  .con {
    width: 640px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .con>li {
    text-align: center;
    font-size: 16px;
    width: 80px;
    color: #fff;
    list-style: none;
  }

  .container ::-webkit-scrollbar {
    display: none;
  }
</style>
