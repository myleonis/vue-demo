<template>
  <div class="main-layout">
    <div class="side-view-wrap"></div>
    <div class="topBar-wrap"></div>
    <app-main></app-main>
  </div>
</template>

<script>
import AppMain from './components/AppMain'

export default {
  name: 'MainLayout',
  components: [AppMain]
}
</script>

<style lang="scss">
  .main-layout {
    height: 100%;
    width: 100%;
  }
</style>
