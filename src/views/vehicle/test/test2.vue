<template>
  <div id="example">
    <button @click="decrement">-</button>
    {{count}}
    {{dataCount}}
    <button @click="increment">+</button>
    <div>{{sex}}</div>
    <div>{{from}}</div>
    <div>{{myCmpted}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'test2',
  data () {
    return {
      str: '国籍',
      dataCount: this.$store.state.count
    }
  },
  computed: mapState({
    count: 'count', // 第一种写法
    sex: (state) => state.sex, // 第二种写法
    from: function (state) {
      return this.str + ':' + state.from
    },
    myCmpted: function () {
      return '测试' + this.str
    }
  }),
  methods: {
    increment () {
      this.dataCount++
    },
    decrement () {
      this.$store.state.count--
    }
  },
  mounted () {
    console.log(process)
  }
}
</script>

<style scoped>

</style>
