import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import MainLayout from '@/views/layout/MainLayout';
import test from '@/views/vehicle/test/test';
import test1 from '@/views/vehicle/test/test1';
import test2 from '@/views/vehicle/test/test2';
import svgIconTest from '@/views/vehicle/test/svgIconTest';

Vue.use(Router)

export default new Router({
  mode: 'history', // 如果不配置，路径上会有#符号
  routes: [
    {
      path: '/',
      component: MainLayout
    },
    {
      path: '/test',
      component: test
    },
    {
      path: '/test1',
      component: test1
    },
    {
      path: '/test2',
      component: test2
    },
    {
      path: '/svgTest',
      component: svgIconTest
    }
  ]
})
