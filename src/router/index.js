import Vue from 'vue'
import Router from 'vue-router'

/* layout */
// '@' 路径别名 指src目录下。webpack.base.conf.js中的resolve别名设置
import MainLayout from '@/views/layout/MainLayout'
import test2 from '@/views/vehicle/test/test2'
import svgIconTest from '@/views/vehicle/test/svgIconTest'
// 引入_import_development.js
// 等价于
// const _import = require('./_import_development.js')
const _import = require('./_import_' + process.env.NODE_ENV)

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
      component: _import('vehicle/test/test')
    },
    {
      path: '/test1',
      component: require('@/views/vehicle/test/test1.vue').default
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
