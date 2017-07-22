<template>
  <div class="perfil">
    <div class="container-fluid">
      <div class="row full-view-height">
        <div class="col-md-2 left text-left top-space full-height">
          <div class="profile-photo">
            <img class="img-responsive" :src="politico.urlFoto" alt="">
            Nome: {{politico.nome}} <br>
            Partido: {{politico.siglaPartido}}
          </div>
        </div>
        <div class="col-md-8 middle top-space">
          cards com coisas que o politico já fez, noticias, comparacoes q já fizemos, ultimos twitts
        </div>
        <div class="col-md-2 right top-space">gráficos</div>
      </div>
    </div>
  </div>
</template>

<script>

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
      vm.politico = result.dados.ultimoStatus // TODO check if dados exists first

      // const maioresfornecedores = await vm.$fetch.get(`http://ops.net.br/api/deputado/${id}/maioresfornecedores`)
      // vm.maioresfornecedores = await maioresfornecedores.json()
      // // TODO get API basePath
      // const maioresnotas = await vm.$fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/maioresnotas`)
      // vm.maioresnotas = await maioresnotas.json()

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

.top-space {
  padding-top: 20px;
}
</style>
