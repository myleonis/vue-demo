<template>
  <div id="SomeElementYouWantToAnimate"></div>
</template>

<script>
    export default {
        name: "requestAnimationFrame",
      mounted() {
        var start = null;
        var element = document.getElementById('SomeElementYouWantToAnimate');
        element.style.position = 'absolute';

        const step = (timestamp) => {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.left = Math.min(progress / 100, 2000) + 'px';
          if (progress < 20000) {
            window.requestAnimationFrame(step);
          }
        }
        console.log("123123")
        window.requestAnimationFrame(step);
      }
    }
</script>

<style scoped>
  #SomeElementYouWantToAnimate {
    height: 100%;
    width: 100%;
    background-color: #666666;
  }
</style>
