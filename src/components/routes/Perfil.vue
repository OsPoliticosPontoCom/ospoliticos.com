<template>
  <div class="perfil">
    <div class="container-fluid">
      <div class="row full-view-height">
        <div class="col-md-3 left text-left top-space full-height">
          <div class="profile-photo">
            <img class="img-responsive" v-if="politico.ultimoStatus" :src="politico.ultimoStatus.urlFoto" alt="">
          </div>
          <div class="profile-info" v-if="politico && politico.ultimoStatus">
            <p>Nome: {{politico.ultimoStatus.nome}}</p>
            <p>Partido: {{politico.ultimoStatus.siglaPartido}}</p>
            <p>Naturalidade: {{politico.municipioNascimento}}</p>
          </div>
          <hr>
          <div class="outros-politicos">
            <h3>Compare com outros Deputados</h3>
            <br>
            <div class="row">
              <politico class="col-md-12" v-for="politico in deputadosDoMesmoUF" :key="politico.id" :politico="politico">
                <button class="btn btn-default btn-xs btn-perfil-xs" @click.stop="comparaDeputado(politico)">
                  <i class="fa fa-exchange" aria-hidden="true"></i>
                  &nbsp;Comparar
                </button>
                <button slot="link" class="btn btn-default btn-xs btn-perfil-xs" @click.stop="verPerfil(politico)">
                  <i class="fa fa-external-link" aria-hidden="true"></i>
                  &nbsp;Ver Perfil
                </button>
              </politico>
            </div>
          </div>
        </div>
        <div class="col-md-5 middle top-space full-height">
          <el-card class="box-card" v-if="gastosTotaisAnoAnterior > 0">
            <div class="row">
              <div class="col-md-12">
                <p v-if="politico && politico.ultimoStatus">
                  O político {{normalizeText(politico.ultimoStatus.nome)}} gastou em {{anoAnterior}}: {{new numeral(gastosTotaisAnoAnterior).format(FORMATO)}}
                </p>
              </div>
            </div>
            <div class="row share-section">
              <div class="col-md-12">
                <a v-if="politico && politico.ultimoStatus" :href="`https://twitter.com/intent/tweet?text=O político ${normalizeText(politico.ultimoStatus.nome)} gastou em ${anoAnterior}: ${new numeral(gastosTotaisAnoAnterior).format(FORMATO)}&via=os_politicos`" target="_blank">
                  <button class="btn btn-primary pull-right">
                    <i class="fa fa-twitter-square"></i> Compartilhar no Twitter
                  </button>
                </a>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" v-for="(comparacao, index) in comparacoes" :key="index">
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{comparacao}}
                </p>
              </div>
            </div>
            <div class="row share-section">
              <div class="col-md-12">
                <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(comparacao)}&via=os_politicos`" target="_blank">
                  <button class="btn btn-primary pull-right">
                    <i class="fa fa-twitter-square"></i> Compartilhar no Twitter
                  </button>
                </a>
              </div>
            </div>
          </el-card>

          <!-- ultimos tweets do deputado(se existir em deputado.redeSocial) -->
          <h3 v-show="lastTweets.length > 0">Últimos Tweets</h3>
          <div ref="last-tweets" class="last-tweets" v-html="lastTweets">

          </div>
        </div>
        <div class="col-md-4 right top-space full-height">

          <div class="row gastos">
            <div class="col-md-12">
              <h4 v-show="gastosTotais <= 0"></h4>
              <div v-show="gastosTotais > 0">
                <h3>Gastos em {{anoAtual}}</h3>
                <h4>{{new numeral(gastosTotais).format(FORMATO)}}</h4>

                <br>
                <div class="gasto-por-dispesa" v-for="(gasto, index) in gastosPorFornecedoresGrouped" :key="index">
                  <label class="label">{{gasto.tipoDespesa}}</label>
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="Number(gasto.percentage)" status="success"></el-progress>
                </div>
                <hr>
              </div>
            </div>
          </div>

          <div class="row gastos gastos-anterior">
            <div class="col-md-12">
              <h3>Quanto já foi gasto em relação ao ano anterior até o momento</h3>
              <h4 v-show="gastosTotaisAnoAnterior > 0">Não conseguimos acessar os gastos do ano anterior</h4>
              <br>
              <el-progress :text-inside="false" :stroke-width="18"
              type="circle"
              :percentage="Number(porcentagemEmRelacaoAoAnoAnterior)"></el-progress>
              <hr>
            </div>
          </div>

          <div class="row gastos">
            <div class="col-md-12">
              <div class="fornecedores">
                <table class="table">
                  <caption>Maiores gastos em {{anoAtual}} por Fornecedores</caption>
                  <thead>
                    <tr>
                      <th>Fornecedor</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="fornecedor in gastosPorFornecedores" :key="fornecedor.cnpjCpfFornecedor">
                      <td>{{fornecedor.nomeFornecedor}}</td>
                      <td width="40%">
                        <span v-if="fornecedor.totalValorLiquido">{{new numeral(fornecedor.totalValorLiquido).format(FORMATO)}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//  GET https://dadosabertos.camara.leg.br/api/v2/deputados/73531
//   {
//   "dados": {
//     "id": 73531,
//     "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/73531",
//     "nomeCivil": "IVAN VALENTE",
//     "ultimoStatus": {
//       "id": 73531,
//       "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/73531",
//       "nome": "IVAN VALENTE",
//       "siglaPartido": "PSOL",
//       "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36839",
//       "siglaUf": "SP",
//       "idLegislatura": 55,
//       "urlFoto": "http://www.camara.leg.br/internet/deputado/bandep/73531.jpg",
//       "data": "2015-02-01",
//       "nomeEleitoral": "IVAN VALENTE",
//       "gabinete": {
//         "nome": "716",
//         "predio": "4",
//         "sala": "716",
//         "andar": "7",
//         "telefone": "3215-5716",
//         "email": "dep.ivanvalente@camara.leg.br"
//       },
//       "situacao": "Exercício",
//       "condicaoEleitoral": "Titular",
//       "descricaoStatus": null
//     },
//     "cpf": "",
//     "sexo": "M",
//     "urlWebsite": null,
//     "redeSocial": SIMILAR a isso [ "http://www.twitter.com/efraimfilho" ],
//     "dataNascimento": "1946-07-05",
//     "dataFalecimento": null,
//     "ufNascimento": "SP",
//     "municipioNascimento": "São Paulo",
//     "escolaridade": null
//   },
//   "links": null
// }

// import Twitter from 'twitter'
// const twitterFetcher = require('assets/js/twitterFetcher_min.js')

import {despesasDeputadoPorAno, getDeputadosFromUF, normalizeText} from 'assets/js/helpers'
import {sampleSize, groupBy} from 'lodash'
import Politico from './Politico.vue'
import { Notification } from 'element-ui'

const numeral = require('numeral')
const FORMATO = '$ 0,0.00'
const LocalStorageDB = require('localStorageDB')
const DB = new LocalStorageDB('os_politicos', localStorage)
if (DB.isNew()) {
  console.log('criando table gastoDeputado')
  DB.createTable('gastoDeputado', [
    'idDeputado',
    'dataDocumento',
    'count',
    'tipoDespesa',
    'nomeFornecedor',
    'cnpjCpfFornecedor',
    'totalValorDocumento',
    'totalValorLiquido',
    'ano',
    'mes',
    'tipoDocumento'
  ])
  DB.commit()
}
// funcoes para comparacao
function comparaQuemGastouMais (deputadoA, gastoTotalA, deputadoB, gastoTotalB, ano = 2017) {
  let a = {nome: deputadoA.nome || deputadoA.ultimoStatus.nome, gasto: gastoTotalA, partido: deputadoA.siglaPartido || deputadoA.ultimoStatus.siglaPartido}
  let b = {nome: deputadoB.nome, gasto: gastoTotalB, partido: deputadoB.siglaPartido}
  let maior = gastoTotalA > gastoTotalB ? a : b
  let menor = gastoTotalA <= gastoTotalB ? a : b

  return `O político ${normalizeText(maior.nome)} do ${maior.partido} gastou ${Number((1 - (menor.gasto / maior.gasto)) * 100).toFixed(2)}% (${numeral(maior.gasto - menor.gasto).format(FORMATO)}) a mais do que o político ${normalizeText(menor.nome)} do ${menor.partido} em ${ano}`
}
// alternativa ao de cima
function comparaQuemGastouMenos (deputadoA, gastoTotalA, deputadoB, gastoTotalB, ano = 2017) {
  let a = {nome: deputadoA.nome || deputadoA.ultimoStatus.nome, gasto: gastoTotalA, partido: deputadoA.siglaPartido || deputadoA.ultimoStatus.siglaPartido}
  let b = {nome: deputadoB.nome, gasto: gastoTotalB, partido: deputadoB.siglaPartido}
  let maior = gastoTotalA > gastoTotalB ? a : b
  let menor = gastoTotalA <= gastoTotalB ? a : b

  return `O político ${normalizeText(menor.nome)} do ${menor.partido} gastou ${numeral(maior.gasto - menor.gasto).format(FORMATO)} a menos do que o político ${normalizeText(maior.nome)} do ${maior.partido} em ${ano} até o momento`
}

export default {
  name: 'perfil',
  beforeRouteEnter (to, from, next) {
    console.log('to', to)
    next(async vm => {
      // setup
      function handleTweets (tweets) {
        console.log('tweets', tweets)
        vm.lastTweets = tweets.map(tweet => {
          return `
          <div class="tweet-wrapper el-card">
            ${tweet}
          </div>
          `
        }).join('')
      }

      let hoje = new Date()
      let anoAtual = hoje.getFullYear()
      let anoAnterior = anoAtual - 1
      vm.anoAtual = anoAtual
      vm.anoAnterior = anoAnterior

      let basePath = 'https://dadosabertos.camara.leg.br/api/v2/deputados/'
      vm.basePath = basePath
      // -------------------
      const { id } = to.params
      let deputado = null

      try {
        deputado = await vm.$fetch.get(`${basePath}${id}`)
        const result = await deputado.json()
        deputado = result.dados
        vm.politico = deputado
      } catch (err) {
        Notification.error({
          title: 'Erro',
          message: 'Não conseguimos acessar os dados do deputado no momento',
          duration: 2000
        })
      }

      // -- fetch twitters
      if (vm.politico.redeSocial && vm.politico.redeSocial.length > 0) {
        // TODO check if twitter
        for (let i = 0; i < vm.politico.redeSocial.length; i++) {
          let redeSocial = vm.politico.redeSocial[i]
          if (redeSocial.includes('twitter')) {
            const twitterScreenName = redeSocial.split('/').slice(-1)[0] // get last string, the screen_name

            // FROM http://www.jasonmayes.com/projects/twitterApi/#sthash.b7Ds9SC7.b9H8Ox9e.dpbs
            // https://github.com/jasonmayes/Twitter-Post-Fetcher/blob/master/js/exampleUsage.js
            require('assets/js/twitterFetcher_min.js')

            const configProfile = {
              'profile': {'screenName': twitterScreenName},
              'maxTweets': 5,
              'enableLinks': true,
              'showUser': true,
              'showTime': true,
              'showImages': true,
              'lang': 'pt',
              'customCallback': handleTweets
            }
            window.twitterFetcher.fetch(configProfile)
          }
        }
      }

      // --- despesas do ano atual
      const gastosPorFornecedores = await despesasDeputadoPorAno(id, DB, vm.$fetch, anoAtual)
      vm.gastosPorFornecedores = gastosPorFornecedores
      vm.gastosTotais = vm.gastosPorFornecedores.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)

      // --- despesas do ano anterior
      let gastosAnoAnterior = await despesasDeputadoPorAno(id, DB, vm.$fetch, anoAnterior)
      vm.gastosAnoAnterior = gastosAnoAnterior
      vm.gastosTotaisAnoAnterior = gastosAnoAnterior.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)

      // TODO
      // verificar se ja existe no "banco"
      // procurar outros 2
      // salvar no "banco"
      // comparar
      // separar as comparacoes pra n ficar deputadoOutro

      // -- coleta outros deputados para comparar
      let deputadosDoMesmoUF = await getDeputadosFromUF(deputado.ufNascimento, vm.$fetch)
      // n considera o deputado atual
      vm.deputadosDoMesmoUF = deputadosDoMesmoUF.filter(d => d.id !== deputado.id)
      console.log('vm.deputadosDoMesmoUF', vm.deputadosDoMesmoUF)
      const outrosDeputados = sampleSize(deputadosDoMesmoUF, 2)
      vm.outrosPoliticos = [...outrosDeputados]

      // --- despesas do ano atual para outros politicos
      for (let politico of vm.outrosPoliticos) {
        const gastosPolitico = await despesasDeputadoPorAno(politico.id, DB, vm.$fetch, anoAtual)
        const gastosTotaisPolitico = gastosPolitico.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)
        politico.gastos = gastosPolitico
        politico.gastosTotais = gastosTotaisPolitico
      }

      // comparacoes
      const comp1 = comparaQuemGastouMais(deputado, vm.gastosTotais, vm.outrosPoliticos[0], vm.outrosPoliticos[0].gastosTotais)
      const comp2 = comparaQuemGastouMenos(deputado, vm.gastosTotais, vm.outrosPoliticos[1], vm.outrosPoliticos[1].gastosTotais)
      const comp3 = comparaQuemGastouMenos(deputado, vm.gastosTotais, vm.outrosPoliticos[0], vm.outrosPoliticos[0].gastosTotais)

      const maiorGastoAnoAnterior = vm.gastosAnoAnterior[0]
      // maior gasto do ano anterior
      const comp4 = `O maior gasto em ${anoAnterior} do político ${normalizeText(deputado.ultimoStatus.nome)} foi de ${new numeral(maiorGastoAnoAnterior.totalValorLiquido).format(FORMATO)} em ${normalizeText(maiorGastoAnoAnterior.nomeFornecedor)}` // eslint-disable-line

      vm.comparacoes = [comp4, comp1, comp2, comp3]
    })
  },
  mounted () {
    try {
      numeral.register('locale', 'brasil', {
        delimiters: {
          thousands: '.',
          decimal: ','
        },
        abbreviations: {
          thousand: 'mil',
          million: 'milhões',
          billion: 'b',
          trillion: 't'
        },
        ordinal: function (number) {
          return 'º'
        },
        currency: {
          symbol: 'R$'
        }
      })
    } catch (e) {
      console.log('erro ao tentar registrar numeral locale')
    }
    numeral.locale('brasil')
    this.numeral = numeral
  },
  watch () {
    // lastTweets (newTweets) {

    // }
  },
  data () {
    return {
      politico: {},
      lastTweets: '',
      gastosPorFornecedores: [],
      gastosAnoAnterior: [],
      gastosTotais: 0,
      gastosTotaisAnoAnterior: 0,
      normalizeText,
      numeral,
      FORMATO,
      searchDeputado: '',
      deputadosDoMesmoUF: [],
      comparacoes: [],
      outrosPoliticos: [], // para comparar
      anoAnterior: 2016, // atualizado em beforeRouteEnter
      anoAtual: 2017 // atualizado em beforeRouteEnter
    }
  },
  methods: {
    verPerfil (deputado) {
      let id = deputado.id
      this.$router.push({ name: 'politico', params: { id } })
      window.location.reload()
    },
    async comparaDeputado (deputado) {
      try {
        let politico = deputado
        const gastosPolitico = await despesasDeputadoPorAno(deputado.id, DB, this.$fetch, this.anoAtual)
        const gastosTotaisPolitico = gastosPolitico.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)
        politico.gastos = gastosPolitico
        politico.gastosTotais = gastosTotaisPolitico

        const comp1 = comparaQuemGastouMais(this.politico, this.gastosTotais, politico, politico.gastosTotais)
        const comp2 = comparaQuemGastouMenos(this.politico, this.gastosTotais, politico, politico.gastosTotais)
        this.outrosPoliticos.push(politico)
        this.comparacoes.push(comp1, comp2)
      } catch (e) {
        Notification.error({
          title: 'Erro',
          message: 'Não conseguimos acessar esse dado no momento',
          duration: 2000
        })
      }
    }
  },
  computed: {
    porcentagemEmRelacaoAoAnoAnterior () {
      return Number((this.gastosTotais / this.gastosTotaisAnoAnterior) * 100).toFixed(2)
    },
    gastosPorFornecedoresGrouped () {
      if (this.gastosTotais <= 0) return
      const gastosGrouped = groupBy(this.gastosPorFornecedores, (g) => normalizeText(g.tipoDespesa) || 'Outros')
      return Object.entries(gastosGrouped).map(
        ([tipoDespesa, gastos]) => {
          const total = gastos.reduce((prev, curr) => prev + Number(curr.totalValorLiquido), 0)
          return {
            tipoDespesa,
            total,
            percentage: Number((total / this.gastosTotais) * 100).toFixed(2)
          }
        }
      )
    }
  },
  components: {
    Politico
  }
}
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
}

.gastos {
  margin-bottom: 30px;
}

.gastos.gastos-anterior h3 {
  margin-bottom: 15px;
}

.share-section {
  margin-top: 15px;
}

.perfil {
  margin-top: 70px;
  color: #4c4c4c;
}

.profile-info {
  margin-top: 15px;
}

.left {
  border-right: 2px solid #ccc;
}

.right {
  border-left: 2px solid #ccc;
}

.top-space {
  padding-top: 20px;
}

.box-card {
  color: black;
  font-size: 14px;
  margin-bottom: 10px;
}

</style>

<style lang="scss">
.el-progress-bar__innerText {
  color: black;
}
.last-tweets {
  .tweet-wrapper {
    margin-bottom: 10px;
    position: relative;
    height: 155px;
    padding: 20px;
    .user {
      width: 15%;
      position: absolute;
      left: 0;
      display: block;
      padding-left: 20px;
    }
    .tweet {
      width: 85%;
      right: 0;
      position: absolute;
      display: block;
    }
    .interact {
      position: absolute;
      bottom: 6px;
      right: 6px;
      display: block;
      a {
        padding: 6px;
        color: #333;
      }
    }
    .timePosted {
      position: absolute;
      bottom: 5px;
      left: 20%;
      color: white;
    }
    .media {
      img {
        display: none; // TODO fix height;
        max-height: 330px;
      }
    }
  }
}
</style>
