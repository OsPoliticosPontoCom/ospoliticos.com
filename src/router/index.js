import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/routes/Home'
import Politicos from '@/components/routes/Politicos'
import Sobre from '@/components/routes/Sobre'
import Perfil from '@/components/routes/Perfil'

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
      path: '/sobre',
      name: 'sobre',
      component: Sobre
    },
    {
      path: '/politico/:id',
      name: 'politico',
      component: Perfil
    }
  ]
})
