
import Vue from 'vue'
import App from './App'
import router from './router'


import Header from "./components/Header/Header.vue"
import Stars from "./components/Stars/Stars.vue"
import CartControl from './components/CartControl/CartControl.vue'
import store from './vuex/store'

import VeeValidate from 'vee-validate';
import './mock/mockServer'

import { Button } from 'mint-ui'
Vue.component('Button', Button)

Vue.component('Header',Header)
Vue.component('Stars',Stars)
Vue.component('CartControl',CartControl)

Vue.config.productionTip = false
Vue.use(VeeValidate);

Vue.prototype.$eventbus = new Vue

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
