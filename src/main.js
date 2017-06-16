// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
Vue.use(VueBlu)

import VueFetch from 'vue-fetch'
import 'whatwg-fetch'
Vue.use(VueFetch, {
  polyfill: true // should vue-fetch load promise polyfill, set to false to use customer polyfill
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
