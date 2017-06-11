<template>
<div class="politicos">
  <!--
  <input type="text" v-model="nome" class="input">
  <br>
  Estado
  <input type="text" class="input" v-model="estado">
  <br>
  -->
  <h3>Total de {{numProposicoes}} proposições de apenas {{deputadosComProposicao.length}} deputados durante X anos</h3>
  <div class="container">
    <div class="row">
      <div v-for="politico in filteredDeputadosComProposicao">
        <politico :politico="politico">
        </politico>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    </div>
  </div>
</div>
</template>

<style>
</style>

<script>
import politicos from '../data/politicos.json'
import Politico from './Politico.vue'
// PODE SER UTIL https://github.com/coderdiaz/vue-datasource
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'politicos',
  data () {
    return {
      nome: '',
      apenasComProposicao: false,
      politicos,
      numProposicoes: politicos.reduce((pre, cur) => cur.proposicoes.length + pre, 0),
      estado: ''
    }
  },
  methods: {
    onInfinite () {
      setTimeout(() => {
        const temp = []
        for (let i = this.politicos.length + 1; i <= this.politicos.length + 20; i++) {
          temp.push(i)
        }
        this.politicos = this.politicos.concat(temp)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      }, 250)
    }
  },
  computed: {
    // N FUNCIONA
    filteredPoliticos () {
      return this.politicos
      .filter(p => {
        if (this.apenasComProposicao) {
          return p.proposicoes && p.proposicoes.length > 0
        }
        return true
      })
      .filter(p => p.nome.toLowerCase().includes(this.nome.toLowerCase()))
      .filter(p => {
        if (this.estado.length > 0) {
          return p.uf.toLowerCase().includes(this.estado.toLowerCase())
        }
        return true
      })
    },
    deputadosComProposicao () {
      return this.politicos.filter(p => {
        return p.proposicoes && p.proposicoes.length > 0
      })
    },
    filteredDeputadosComProposicao () {
      return this.deputadosComProposicao
      .filter(p => {
        if (this.estado.length > 0) {
          return p.uf.toLowerCase().includes(this.estado.toLowerCase())
        }
        return true
      })
    }
  },
  components: {
    Politico,
    InfiniteLoading
  }
}
</script>
