import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import MainLayout from '@/views/layout/MainLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: MainLayout
    }
  ]
})
