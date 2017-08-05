<template>
<div class="politicos navbar-margin">

  <!-- <input type="text" v-model="nome" class="input"> -->
  <div class="politicos-filtro">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-md-3 col-sm-12 col-xs-12 col-estado">
              <label>Estado</label>
              <select class="select-estado" v-model="estado">
                <option disabled value="">Estado</option>
                <option :value="estado.sigla" v-for="estado in estados" :key="estado.id">{{estado.nome}}</option>
              </select>
            </div>
            <div class="col-md-2 col-sm-12 col-xs-12">
              <label>Partido</label>
              <select class="select-partido" v-model="partido">
                <option disabled value="">Partido</option>
                <option value="TODOS">Todos</option>
                <option :value="partido.sigla" v-for="partido in partidos" :key="partido.id">{{partido.sigla}}</option>
              </select>
            </div>
            <div class="col-md-2 col-sm-12 col-xs-12">
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
      <div class="col-md-9 col-sm-5 col-xs-5 max-view-heigth" >
        <h4 v-show="politicosFiltered.length === 0">Nenhum resultado encontrado</h4>
        <div class="row">
          <politico class="col-md-4 col-sm-12 col-xs-12" v-for="politico in politicosFiltered" :key="politico.id" :politico="politico">
          </politico>
        </div>

      </div>

      <div class="col-md-3 col-sm-7 col-xs-7 max-view-heigth" v-if="proposicoesComEmenta.length > 0">
        <h3>Últimas proposições dos deputados da(o) {{estado}} {{partido !== 'TODOS' ? ` do partido ${partido}` : ''}}</h3>
        <hr>
        <div class="proposicao" v-for="proposicao in proposicoesComEmenta" :key="proposicao.id" v-if="proposicao && proposicao.ementa && proposicao.ementa.length > 0">
          {{proposicao.ementa}} <br> <br>
          <p class="autor">Autor: {{proposicao.tipoAutor}}</p>
          <p class="data">Apresentada em: {{moment(proposicao.dataApresentacao).format('llll')}}</p>
          <hr>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.max-view-heigth {
  height: 100vh;
  overflow: auto;
}
</style>

<script>
import Politico from './Politico.vue'
import {getDeputadosFromUF, getDeputadosProposicoes, normalizeText} from 'assets/js/helpers'
import moment from 'moment'

async function getDeputados (partido, uf, sexo, fetch) {
  let newPartido = (partido !== null && partido !== 'TODOS') ? partido : ''
  let newSexo = (sexo !== null && sexo !== 'TODOS') ? sexo : ''

  const deputados = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=${uf.toUpperCase()}&siglaPartido=${newPartido}&siglaSexo=${newSexo}&itens=99&ordem=ASC&ordenarPor=nome`)
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
      vm.proposicoes = await getDeputadosProposicoes('PB', vm.$fetch)
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
      buscaNome: '',
      moment
    }
  },
  methods: {
  },
  mounted () {
    this.moment.locale('pt-br')
  },
  computed: {
    politicosFiltered () {
      if (this.buscaNome.length > 1) {
        return this.politicos.filter(p => normalizeText(p.nome).includes(normalizeText(this.buscaNome)))
      } else {
        return this.politicos
      }
    },
    proposicoesComEmenta () {
      return this.proposicoes.filter((p, idx) => {
        return p && p.ementa && p.ementa.length > 0
      })
    }
  },
  watch: {
    async estado (newEstado) {
      this.politicos = await getDeputados(this.partido, newEstado, this.sexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoes(newEstado, this.$fetch, {partido: this.partido, sexo: this.sexo})
    },
    async partido (newPartido) {
      this.politicos = await getDeputados(newPartido, this.estado, this.sexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoes(this.estado, this.$fetch, {partido: newPartido, sexo: this.sexo})
    },
    async sexo (newSexo) {
      this.politicos = await getDeputados(this.partido, this.estado, newSexo, this.$fetch)
      this.proposicoes = await getDeputadosProposicoes(this.estado, this.$fetch, {partido: this.partido, sexo: newSexo})
    }
  },
  components: {
    Politico
  }
}
</script>
