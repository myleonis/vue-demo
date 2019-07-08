<template>
  <div class="scroll-main">
    <nav-scroll :navList="navList" v-on:listenEvent="getActiveIndex"></nav-scroll>
  </div>
</template>

<script>
  import navscroll from './NavScroll.vue'

  export default {
    data() {
      return {
        navList: [
          '推荐',
          '热点',
          '北京',
          '社会',
          '娱乐',
          '科技',
          '财经',
          '体育'
        ]
      }
    },
    components: {
      'nav-scroll': navscroll
    },
    mounted: function () {

    },
    methods: {
      getActiveIndex: function (data) {
        console.log(data)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-main {
    overflow: hidden;
    overflow-x: scroll;
  }
</style>
