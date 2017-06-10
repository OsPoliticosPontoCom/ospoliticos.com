<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/bootstrap.min.css'
import './assets/css/material-kit.css'
import './assets/css/demo.css'

export default {
  name: 'app',
  mounted () {
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
  margin-top: 60px;
}
</style>
