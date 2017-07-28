<template>
<div class="politicos navbar-margin">

  <input type="text" v-model="nome" class="input">
  <br>
  Estado
  <select v-model="estado">
    <option disabled value="">Estado</option>
    <option :value="estado.sigla" v-for="estado in estados" :key="estado.id">{{estado.nome}}</option>
  </select>
  <br>

  <div class="container">
    <div class="row">
      <div class="col-md-10" >
        <politico v-for="politico in politicos" :key="politico.id" :politico="politico">
        </politico>
      </div>

      <div class="col-md-2">
        <h3>Últimas proposições dos deputados da(o) {{estado}}</h3>
        <hr>
        <div class="proposicao" v-for="proposicao in proposicoes" :key="proposicao.id">
          {{proposicao.ementa}}
          <hr>
        </div>

      </div>
      <!--
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
      -->
    </div>
  </div>
</div>
</template>

<style>
</style>

<script>
import Politico from './Politico.vue'
// PODE SER UTIL https://github.com/coderdiaz/vue-datasource
import InfiniteLoading from 'vue-infinite-loading'

async function getDeputadosFromUF (uf, fetch) {
  const deputados = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=${uf.toUpperCase()}&itens=99&ordem=ASC&ordenarPor=nome`)
  const result = await deputados.json()
  return result.dados
}

async function getDeputadosProposicoesFromUF (uf, fetch) {
  const proposicoes = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaUfAutor=${uf.toUpperCase()}&ano=2017&ordem=ASC&ordenarPor=id&itens=10`)
  const result = await proposicoes.json()
  return result.dados
}

export default {
  name: 'politicos',
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      // deputados
      // const deputados = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=PB&itens=50&ordem=ASC&ordenarPor=nome`)
      // const result = await deputados.json()
      // PB is the default
      vm.politicos = await getDeputadosFromUF('PB', vm.$fetch)

      // estados(UFs)
      const estados = await vm.$fetch.get('https://dadosabertos.camara.leg.br/api/v2/referencias/uf')
      console.log('estados', estados)
      const resultEstados = await estados.json()
      vm.estados = resultEstados.dados

      // proposicoes
      vm.proposicoes = await getDeputadosProposicoesFromUF('PB', vm.$fetch)
    })
  },
  data () {
    return {
      nome: '',
      apenasComProposicao: false,
      politicos: [],
      proposicoes: [],
      estado: 'PB',
      estados: ['PB', 'PE', 'SP', 'RJ'] // vem da API UFs, PB, PE, SP...
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
  },
  watch: {
    async estado (newEstado) {
      this.politicos = await getDeputadosFromUF(newEstado, this.$fetch)
      this.proposicoes = await getDeputadosProposicoesFromUF(newEstado, this.$fetch)
    }
  },
  components: {
    Politico,
    InfiniteLoading
  }
}
</script>
