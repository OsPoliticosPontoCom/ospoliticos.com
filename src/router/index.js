import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Politicos from '@/components/Politicos'
import PoliticoPage from '@/components/PoliticoPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/politicos',
      name: 'politicos',
      component: Politicos
    },
    {
      path: '/politico/:id',
      name: 'politico-page',
      component: PoliticoPage
    }
  ]
})

