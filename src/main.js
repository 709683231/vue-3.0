
import Vue from 'vue'
import App from './App'
import router from './router'

import Header from "./components/Header/Header.vue"
import Stars from "./components/Stars/Stars.vue"
import store from './vuex/store'

Vue.component('Header',Header)

Vue.component('Stars',Stars)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
