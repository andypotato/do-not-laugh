import 'reset-css/reset.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueElectron from 'vue-electron';
Vue.use(VueElectron);

// import sound library
import sounds from './sounds';
Vue.prototype.$sounds = sounds;

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
