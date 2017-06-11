<template>
<div class="politicos">
  <input type="text" v-model="nome" class="input">
  Com proposição ?<input type="checkbox" v-model="apenasComProposicao" class="input">
  <br>
  <div class="container">
    <div class="row">
      <div v-for="politico in filteredPoliticos">
        <politico :politico="politico">
        </politico>
      </div>
    </div>
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
      apenasComProposicao: false,
      politicos
    }
  },
  computed: {
    filteredPoliticos () {
      return this.politicos
      .filter(p => this.apenasComProposicao && p.proposicoes.length > 0)
      .filter(p => p.nome.includes(this.nome))
    }
  },
  components: {
    Politico
  }
}
</script>
