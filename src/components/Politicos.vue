<template>
<div class="politicos">
  <input type="text" v-model="nome" class="input">
  <div class="politico" v-for="politico in filteredPoliticos">
    <politico :politico="politico">
    </politico>
  </div>
</div>
</template>

<style>
</style>

<script>
import politicos from '../data/politicos.json'
import Politico from './Politico.vue'
export default {
  name: 'politicos',
  data () {
    return {
      nome: '',
      politicos
    }
  },
  computed: {
    filteredPoliticos () {
      return this.politicos.filter(p => p.nome.includes(this.nome))
    }
  },
  components: {
    Politico
  }
}
</script>
