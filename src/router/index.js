import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import MainLayout from '@/views/layout/MainLayout';
import test from '@/views/vehicle/test/test';
import test1 from '@/views/vehicle/test/test1';

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
    },
    {
      path: '/test1',
      component: test1
    }
  ]
})
