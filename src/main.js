import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

// 引入颜色
import './styles/index.scss'

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  store,
  router,
  render: h => h(App)
}).$mount("#app");