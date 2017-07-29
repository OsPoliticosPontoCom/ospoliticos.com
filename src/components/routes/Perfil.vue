<template>
  <div class="perfil">
    <div class="container-fluid">
      <div class="row full-view-height">
        <div class="col-md-3 left text-left top-space full-height">
          <div class="profile-photo">
            <img class="img-responsive" v-if="politico.ultimoStatus" :src="politico.ultimoStatus.urlFoto" alt="">
            Nome: {{politico.ultimoStatus.nome}} <br>
            Partido: {{politico.ultimoStatus.siglaPartido}} <br>
            Redes Sociais: {{politico.redeSocial}} <br>
            Município de nascimento: {{politico.municipioNascimento}}
          </div>
        </div>
        <div class="col-md-6 middle top-space full-height">
          <el-card class="box-card">
            <p>
              O deputado {{politico.ultimoStatus.nome}} gastou em 2016: {{new numeral(gastosTotaisOutro).format(FORMATO)}}
            </p>
            <button class="btn btn-primary pull-right">
              Compartilhar no Twitter
            </button>
          </el-card>

          <el-card class="box-card" v-for="comparacao in comparacoes">
            <p>
              {{comparacao}}
            </p>
            <button class="btn btn-primary pull-right">
              Compartilhar no Twitter
            </button>
          </el-card>

          <!-- ultimos tweets do deputado(se existir em deputado.redeSocial) -->
          <div ref="last-tweets" class="last-tweets" v-html="lastTweets">

          </div>
        </div>
        <div class="col-md-3 right top-space full-height">
          <h3>Gastos em 2017</h3>
          <h4>{{new numeral(gastosTotais).format(FORMATO)}}</h4>

          <br>
          <div class="gasto-por-dispesa" v-for="(gasto, index) in gastosPorFornecedoresGrouped" :key="index">
            <label class="label">{{gasto.tipoDespesa}}</label>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="Number(gasto.percentage)" status="success"></el-progress>
          </div>
          <hr>

          <h3>Quanto já foi gasto em relação ao ano anterior até o momento</h3>
          <el-progress v-if="gastosTotaisOutro" :text-inside="true" :stroke-width="18" :percentage="Number((gastosTotais/gastosTotaisOutro) * 100).toFixed(2)" status="success"></el-progress> <br>

          <hr>

          <div class="fornecedores">
            <table class="table">
              <caption>Maiores gastos em 2017 por Fornecedores</caption>
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
const numeral = require('numeral')
const FORMATO = '$ 0,0.00'
export default {
  name: 'perfil',
  beforeRouteEnter (to, from, next) {
    console.log('to', to)
    next(async vm => {
      function handleTweets (tweets) {
        console.log('tweets', tweets)
        vm.lastTweets = tweets.map(tweet => {
          return `
          <div class="tweet">
            ${tweet}
          </div>
          `
        }).join('')
      }

      const {id} = to.params
      // TODO get basePath for API
      let deputado = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)
      const result = await deputado.json()
      deputado = result.dados
      vm.politico = deputado

      // -- fetch twitters
      if (vm.politico.redeSocial && vm.politico.redeSocial.length > 0) {
        // TODO check if twitter
        const twitterScreenName = vm.politico.redeSocial[0].split('/').slice(-1)[0] // get last string, the screen_name

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

      // --- despesas do ano (2017)
      let gastosPorFornecedores = await despesasDeputadoPorAno(id, vm.$fetch, '2017')
      console.log('gastosPorFornecedores', gastosPorFornecedores)
      vm.gastosPorFornecedores = gastosPorFornecedores
      vm.gastosTotais = gastosPorFornecedores.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)

      // --- despesas do ano (2016)
      let gastosPorFornecedoresOutro = await despesasDeputadoPorAno(id, vm.$fetch, '2016')
      console.log('gastosPorFornecedoresOutro', gastosPorFornecedoresOutro)
      vm.gastosPorFornecedoresOutro = gastosPorFornecedoresOutro
      vm.gastosTotaisOutro = gastosPorFornecedoresOutro.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)
      // TODO
      // verificar se ja existe no "banco"
      // procurar outros 2
      // salvar no "banco"
      // comparar
      // separar as comparacoes pra n ficar deputadoOutro

      // -- coleta outros deputados para comparar
      console.log('deputado', deputado)
      let deputadosDoMesmoUF = await getDeputadosFromUF(deputado.ufNascimento, vm.$fetch)
      console.log('deputadosDoMesmoUF', deputadosDoMesmoUF)
      // remove o deputado atual
      // n funciona TODO checkar isso
      deputadosDoMesmoUF = deputadosDoMesmoUF.filter(d => d.id !== id)
      const outrosDeputados = sampleSize(deputadosDoMesmoUF, 2)
      console.log('outrosDeputados', outrosDeputados)
      vm.politicoOutro = outrosDeputados[0]
      vm.politicoOutro2 = outrosDeputados[1]

      // --- despesas do ano (2017) para politicoOutro
      let gastosPorFornecedoresPolitico2 = await despesasDeputadoPorAno(vm.politicoOutro.id, vm.$fetch, '2017')
      console.log('gastosPorFornecedoresPolitico2', gastosPorFornecedoresPolitico2)
      let gastosTotaisPolitico2 = gastosPorFornecedoresPolitico2.reduce((soma, atual) => soma + atual.totalValorLiquido, 0)

      const comp1 = `O deputado ${deputado.ultimoStatus.nomeEleitoral} do ${deputado.ultimoStatus.siglaPartido} gastou ${Number(vm.gastosTotais / gastosTotaisPolitico2).toFixed(2)} vezes ${vm.gastosTotais - gastosTotaisPolitico2 > 0 ? 'mais' : 'menos'} (${numeral(vm.gastosTotais - gastosTotaisPolitico2).format(FORMATO)}) do que o deputado ${vm.politicoOutro.nome} do ${vm.politicoOutro.siglaPartido} em 2017` // TODO encontrar o maior

      vm.comparacoes = [comp1]
      // set timeout
    })
  },
  mounted () {
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
      politicoOutro: {},
      politicoOutro2: {},
      lastTweets: '',
      gastosPerPage: [],
      gastosPorFornecedores: [],
      gastosPorFornecedoresOutro: [],
      gastosTotais: 0,
      gastosTotaisOutro: 0,
      numeral,
      FORMATO,
      comparacoes: []
    }
  },
  computed: {
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
  }
}
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
}

.perfil {
  margin-top: 54px;
  background-color: #3c3636;
  color: white;
}

.left {
  border-right: 1px solid black;
}

.right {
  border-left: 1px solid black;
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
  .tweet {
    border: 1px solid white;
    margin-bottom: 10px;
    position: relative;
    height: 116px;
    color: white;
    .user {
      width: 15%;
      position: absolute;
      left: 0;
      display: block;
    }
    .tweet {
      width: 85%;
      right: 0;
      position: absolute;
      display: block;
    }
    .interact {
      position: absolute;
      bottom: 0;
      right: 0;
      display: block;
      a {
        margin-right: 6px;
        color: white;
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
