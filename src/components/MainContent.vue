<template>
<div class="main-content container">
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Perfil</p>
          <p class="subtitle">Top tile</p>
          <div class="content">
            <perfil></perfil>
          </div>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">Gastos</p>
          <doughnut :width="260" :height="260" :options="{responsive: false}" :data="{
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]
          }"></doughnut>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">Deputado 1</p>
          <compare-card></compare-card>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
        <p class="title">Wide tile</p>
        <p class="subtitle">Aligned with the right tile</p>
        <div class="content">
          <!-- Content -->
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Deputado 2</p>
        <p class="subtitle">With even more content</p>
        <div class="content">
          <compare-card></compare-card>
        </div>
      </div>
    </article>
  </div>
</div>
</div>
</template>

<script>
import Doughnut from './Doughnut'
import CompareCard from './CompareCard'
import Perfil from './Perfil'

export default {
  name: 'main-content',
  components: {
    Doughnut,
    CompareCard,
    Perfil
  }
}
</script>

<style>

</style>
