<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
import NavBar from './components/shared/NavBar'
import Footer from './components/shared/Footer'

export default {
  name: 'app',
  mounted () {

  },
  components: {
    navbar: NavBar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
