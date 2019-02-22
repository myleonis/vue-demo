import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state.js
let state = {
  count: 1,
  name: 'dkr',
  sex: '男',
  from: 'china'
}
export default new Vuex.Store({
  state
})
