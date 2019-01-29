import Vue from 'vue'
import Router from 'vue-router'
import fist from '@/views/fist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: fist
    }
  ]
})
