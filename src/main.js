// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUi from "element-ui";
import "../node_modules/element-ui/lib/theme-chalk/index.css";
import store from "./store";
// 若页面报错 !xml-loader!../../src/svg-bash: !xml-loader!../../src/svg: event not found
// 执行cnpm install xml-loader
import Icon from "vue-svg-icon/Icon.vue";
Vue.component("icon", Icon);

Vue.use(ElementUi);
// 原型属性
Vue.prototype.$test123 = "ceshi123";
window.test333 = "test333";

// 生产环境时自动设置为 false 以阻止 web 在启动时生成生产提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
