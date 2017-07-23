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
          cards com coisas que o politico já fez, noticias, comparacoes q já fizemos, ultimos twitts
          <div ref="last-tweets" class="last-tweets" v-html="lastTweets">

          </div>
        </div>
        <div class="col-md-3 right top-space full-height">
          <h3>Gastos</h3>
          <label class="label">Transporte</label>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="35" status="success"></el-progress> <br>

          <label class="label">Outros</label>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="65" status="success"></el-progress> <br>
          <hr>
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
      const deputado = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)
      const result = await deputado.json()
      vm.politico = result.dados

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
    })
  },
  mounted () {

  },
  watch () {
    // lastTweets (newTweets) {

    // }
  },
  data () {
    return {
      politico: {},
      lastTweets: ''
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.full-view-height {
  height: 100vh;
}
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


</style>

<style lang="scss">
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
