<template>
  <div class="svg-test">
    <icon name="chameleon" scale="10" spin></icon>
    <!--若想指定位置颜色更改，fill不指定-->
    <icon name="lemon" scale="20"  id="animation"></icon>
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
