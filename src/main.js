import Vue from "vue";
import App from "./App.vue";
import api from "./http/api";
import http from "./http/http";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
