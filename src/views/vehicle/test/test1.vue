<template>
  <div id="example">
    <button @click="decrement">-</button>
    {{count}}
    {{dataCount}}
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'test1',
  data () {
    return {
      dataCount: this.$store.state.count
    }
  },
  mounted () {
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.dataCount++
    },
    decrement () {
      this.$store.state.count--
    }
  }
}
</script>

<style scoped>

</style>
