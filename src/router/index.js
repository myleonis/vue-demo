import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import MainLayout from '@/views/layout/MainLayout';
import test from '@/views/vehicle/test/test';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: MainLayout
    },
    {
      path: '/test',
      component: test
    }
  ]
})
