import Vue from "vue";
import store from './store';
import App from "./App.vue";
import VueKonva from "vue-konva";

Vue.use(VueKonva);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
