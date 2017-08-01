<template>
<div class="politicos navbar-margin">

  <!-- <input type="text" v-model="nome" class="input"> -->
  <div class="politicos-filtro">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3 col-estado">
              <label>Estado</label>
              <select class="select-estado" v-model="estado">
                <option disabled value="">Estado</option>
                <option :value="estado.sigla" v-for="estado in estados" :key="estado.id">{{estado.nome}}</option>
              </select>
            </div>
            <div class="col-md-2">
              <label>Partido</label>
              <select class="select-partido" v-model="partido">
                <option disabled value="">Partido</option>
                <option value="TODOS">Todos</option>
                <option :value="partido.sigla" v-for="partido in partidos" :key="partido.id">{{partido.sigla}}</option>
              </select>
            </div>
            <div class="col-md-2">
              <label>Sexo</label>
              <select class="select-sexo" v-model="sexo">
                <option disabled value="">Sexo</option>
                <option value="TODOS">Todos</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
            <div class="col-md-4">
              <input class="form-control input-nome" v-model="buscaNome" placeholder="Nome" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-9" >
        <h4 v-show="politicosFiltered.length === 0">Nenhum resultado encontrado</h4>
        <politico class="col-md-4" v-for="politico in politicosFiltered" :key="politico.id" :politico="politico">
        </politico>
      </div>

      <div class="col-md-3">
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
import {getDeputadosFromUF, normalizeText} from 'assets/js/helpers'

async function getDeputados (partido, uf, sexo, fetch) {
  var newPartido = (partido !== null && partido !== 'TODOS') ? partido : ''
  var newSexo = (sexo !== null && sexo !== 'TODOS') ? sexo : ''

  const deputados = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=${uf.toUpperCase()}&siglaPartido=${newPartido}&siglaSexo=${newSexo}&itens=99&ordem=ASC&ordenarPor=nome`)
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
      const resultEstados = await estados.json()
      vm.estados = resultEstados.dados

      // partidos
      const partidos = await vm.$fetch.get('https://dadosabertos.camara.leg.br/api/v2/partidos?itens=100&ordem=ASC&ordenarPor=sigla')
      const resultPartidos = await partidos.json()
      vm.partidos = resultPartidos.dados

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
      estados: ['PB', 'PE', 'SP', 'RJ'], // valores serao substituidos pelos que vem da API UFs, PB, PE, SP...
      partido: 'TODOS',
      partidos: ['TODOS', 'DEM', 'PCdoB', 'PDT', 'PEN'], // valores serao substituidos pelos que vem da API Partidos, DEM, PCdoB, PDT, PEN...
      sexo: 'TODOS',
      buscaNome: ''
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
    politicosFiltered () {
      if (this.buscaNome.length > 1) {
        return this.politicos.filter(p => normalizeText(p.nome).includes(normalizeText(this.buscaNome)))
      } else {
        return this.politicos
      }
    }
  },
  watch: {
    async estado (newEstado) {
      this.politicos = await getDeputados(this.partido, newEstado, this.sexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoesFromUF(newEstado, this.$fetch)
    },
    async partido (newPartido) {
      this.politicos = await getDeputados(newPartido, this.estado, this.sexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoesFromUF(this.estado, this.$fetch)
    },
    async sexo (newSexo) {
      this.politicos = await getDeputados(this.partido, this.estado, newSexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoesFromUF(this.estado, this.$fetch)
    }
  },
  components: {
    Politico,
    InfiniteLoading
  }
}
</script>
