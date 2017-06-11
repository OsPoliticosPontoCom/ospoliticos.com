// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuescroll from 'vue-scroll'
import 'whatwg-fetch'
import VueFetch from 'vue-fetch'

Vue.use(vuescroll)
Vue.use(VueFetch, {
  polyfill: true // should vue-fetch load promise polyfill, set to false to use customer polyfill
})
// from package
// require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
