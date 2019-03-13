<template>
  <div id="example">
    <button @click="decrement">-</button>
    {{count}}
    {{dataCount}}
    <button @click="increment">+</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'test1',
  data () {
    return {
      dataCount: this.$store.state.count
    }
  },
  mounted () {
    console.log('test', this.testCount)
  },
  computed: {
    ...mapState({
      testCount: state => state.count
    }),
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
