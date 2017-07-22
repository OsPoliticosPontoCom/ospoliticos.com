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
      <div v-for="politico in politicos" :key="politico.id">
        <politico :politico="politico">
        </politico>
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

export default {
  name: 'politicos',
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      // deputados
      // const deputados = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=PB&itens=50&ordem=ASC&ordenarPor=nome`)
      // const result = await deputados.json()
      vm.politicos = await getDeputadosFromUF('PB', vm.$fetch)

      // estados
      const estados = await vm.$fetch.get('https://dadosabertos.camara.leg.br/api/v2/referencias/uf')
      console.log('estados', estados)
      const resultEstados = await estados.json()
      vm.estados = resultEstados.dados
    })
  },
  data () {
    return {
      nome: '',
      apenasComProposicao: false,
      politicos: [],
      estado: 'PB',
      estados: ['PB', 'PE', 'SP', 'RJ'] // UFs, PB, PE, SP...
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
    }
  },
  components: {
    Politico,
    InfiniteLoading
  }
}
</script>
