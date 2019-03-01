<template>
  <div class="svg-test">
    <!--若想指定位置颜色更改，fill不设置-->
    <icon name="chameleon" scale="20" id="animation"></icon>
    <icon name="lemon" scale="20"  spin></icon>
  </div>
</template>

<script>
export default {
  name: 'svgIconTest'
}
</script>

<style scoped>
  .svg-test {
    height: auto;
  }
  #animation {
    animation: changeColor 5s infinite step-end;
  }
  @keyframes changeColor {
    0% {
      color: red;
    }
    20% {
      color: yellow;
    }
    40% {
      color: blue;
    }
    60% {
      color: green;
    }
    80% {
      color: purple;
    }
    100% {
      color: gold;
    }
  }
</style>
