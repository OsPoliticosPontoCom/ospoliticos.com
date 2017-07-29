// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)
// bootstrap
// require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
// free theme  https://www.bootstrapzero.com/bootstrap-template/startr-free-startup-landing-page-template
import 'assets/startup-theme/css/bootstrap.min.css'
import 'assets/startup-theme/css/font-awesome.min.css'
import 'assets/startup-theme/css/style.css'
import 'assets/startup-theme/css/owl.carousel.css'
import 'assets/css/app.css'

// responsive
import 'assets/startup-theme/css/responsive.css'

import 'assets/startup-theme/css/animate.min.css'

import 'assets/startup-theme/css/popup.css'

// javascript files
require('assets/startup-theme/js/main.js')
require('assets/startup-theme/js/owl.carousel.js')
require('assets/startup-theme/js/bootstrap.min.js')

import VueFetch from 'vue-fetch'
import 'whatwg-fetch'
Vue.use(VueFetch, {
  polyfill: true // should vue-fetch load promise polyfill, set to false to use customer polyfill
})
Vue.config.productionTip = false

// ELEMENT UI COMPONENTS
// http://element.eleme.io/#/en-US/
// https://github.com/ElemeFE/element/blob/dev/components.json
import { Button, Select, Progress, Card } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Progress.name, Progress)
Vue.component(Card.name, Card)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
