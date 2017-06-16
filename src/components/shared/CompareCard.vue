<template>
<div class="compare-card">
  <h3 class="title">{{nome}}</h3>

  <div class="gastos">
    <div class="gasto" v-for="gasto in gastos">
      <div class="field">
        <label>{{gasto.label}}</label>
        <progress-bar :showinfo="true" size="medium" :percent="gasto.percent.toFixed(2)"></progress-bar>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'compare-card',
  props: ['nome', 'gastos'],
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style>
.compare-card {
  padding: 15px;
  color: #333;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
