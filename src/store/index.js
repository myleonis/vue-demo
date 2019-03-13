import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import permission from './modules/permission'
Vue.use(Vuex)

// state.js
const state = {
  count: 1,
  name: 'dkr',
  sex: '男',
  from: 'china'
}
export default new Vuex.Store({
  /**
   * modules中的格式一定需要对应。 不然undefined
   *  permission: {
      actions: require("./modules/pp-actions").default,
      state: Object.assign({}, require("./modules/pp-state").default),
      mutations: require("./modules/pp-mutations").default
    }
   */
  modules: {
    permission
  },
  state,
  getters
})
