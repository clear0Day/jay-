import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import router from "./router";
import store from "./store";
import http from "axios";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";
import "../src/api/mock";
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$http = http;

router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({
      name: "login",
    });
  } else if (token && to.name === "login") {
    next({
      name: "home",
    });
  } else {
    next();
  }
});
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
