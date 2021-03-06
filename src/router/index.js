import Vue from "vue";
import Router from "vue-router";

/* layout */
// '@' 路径别名 指src目录下。webpack.base.conf.js中的resolve别名设置
import MainLayout from "@/views/layout/MainLayout";
import test2 from "@/views/vehicle/test/test2";
import svgIconTest from "@/views/vehicle/test/svgIconTest";
// 引入_import_development.js
// 等价于
// const _import = require('./_import_development.js')
const _import = require("./_import_" + process.env.NODE_ENV);

Vue.use(Router);

export const routeList = [
  {
    name: "主页",
    path: "/",
    component: MainLayout,
    children: [
      {
        name: "测试",
        path: "/test",
        component: _import("vehicle/test/test")
      },
      {
        name: "测试1",
        path: "/test1",
        component: require("@/views/vehicle/test/test1.vue").default
      },
      {
        name: "测试2",
        path: "/test2",
        component: test2
      },
      {
        name: "svg",
        path: "/svgTest",
        component: () => import("@/views/vehicle/test/svgIconTest")
      },
      {
        name: "测试3",
        path: "/test3",
        component: _import("vehicle/test/alert")
      },
      {
        name: "raf",
        path: "/raf",
        component: _import("vehicle/test/requestAnimationFrame")
      },
      {
        name: "top",
        path: "/top",
        component: _import("vehicle/test/svgTop")
      },
      {
        name: "rollbar",
        path: "/rollbar",
        component: _import("vehicle/test1/RollBarTest")
      },
      {
        name: "xRollbar",
        path: "/xRollbar",
        component: _import("vehicle/test1/XrollBar")
      },
      {
        name: "RollBarXTest",
        path: "/RollBarXTest",
        component: _import("vehicle/test1/RollBarXTest")
      },
      {
        name: "BetterScroll",
        path: "/BetterScroll",
        component: _import("vehicle/test1/BetterScrollTest")
      },
      {
        name: "scrollTest",
        path: "/scrollTest",
        component: _import("vehicle/scrollTest/index")
      },
      {
        name: "dateSeason",
        path: "/dateSeason",
        component: _import("vehicle/test/dateSeason")
      },
      {
        name: "elTableTest",
        path: "/elTableTest",
        component: _import("vehicle/test/elTableTest")
      },
      {
        name: "dialogDate",
        path: "/dialogDate",
        component: _import("vehicle/test1/dialogDate")
      }
    ]
  }
];
export default new Router({
  mode: "history", // 如果不配置，路径上会有#符号
  routes: routeList
});
