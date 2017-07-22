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
        </div>
        <div class="col-md-3 right top-space full-height">gráficos</div>
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
//     "redeSocial": [],
//     "dataNascimento": "1946-07-05",
//     "dataFalecimento": null,
//     "ufNascimento": "SP",
//     "municipioNascimento": "São Paulo",
//     "escolaridade": null
//   },
//   "links": null
// }
export default {
  name: 'perfil',
  beforeRouteEnter (to, from, next) {
    console.log('to', to)
    next(async vm => {
      // 3156 (andre amaral) should come from 'from'
      // http://ops.net.br/api/deputado/3156/maioresfornecedores
      // http://ops.net.br/api/deputado/3156/maioresnotas
      // http://ops.net.br/api/deputado/3156/gastosmensaisporano
      const {id} = to.params
      // TODO get basePath for API
      const deputado = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)
      const result = await deputado.json()
      vm.politico = result.dados
    })
  },
  data () {
    return {
      politico: {}
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
  background-color: #dadada;
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
