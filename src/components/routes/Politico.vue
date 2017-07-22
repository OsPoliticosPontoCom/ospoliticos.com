<template>
<div class="politico col-md-4">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">{{startCase(toLower(nome))}}</h3>
    </div>
    <div class="panel-body">
      <div>
        <div class="row">
          <div class="col-md-4" v-if="id">

            <router-link :to="{ name: 'politico', params: { id }}">
              <img :src="urlFoto" :alt="nome">
            </router-link>
          </div>
          <div class="col-md-8 text-left">
            Partido: {{siglaPartido}}  <br>
            Uf: {{siglaUf}}  <br>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/*
POLITICO
{
  id:160527
  idLegislatura:55
  nome:"AGUINALDO RIBEIRO"
  siglaPartido:"PP"
  siglaUf:"PB"
  uri:"https://dadosabertos.camara.leg.br/api/v2/deputados/160527"
  uriPartido:"https://dadosabertos.camara.leg.br/api/v2/partidos/36809"
  urlFoto:"http://www.camara.leg.br/internet/deputado/bandep/160527.jpg"
}
-----

PROPOSICAO - SE TIVER

{
        "id": 142,
        "tipo": "REQ",
        "numero": "5679",
        "ano": "2016",
        "nomeProposicao": "REQ 5679/2016 => PL 5850/2016",
        "idProposicao": "2120382",
        "idProposicaoPrincipal": "2092189",
        "nomeProposicaoOrigem": "NA",
        "tipoProposicao": "Requerimento de Urgência (Art. 155 do RICD)",
        "tema": "NA",
        "ementa": "Requer Urgência para o PL 5.850 de 2016.",
        "explicacaoEmenta": "NA",
        "dataApresentacao": "07/12/2016",
        "regimeTramitacao": ".",
        "dataUltimoDespacho": "NA",
        "ultimoDespacho": "NA",
        "apreciacao": ".",
        "indexacao": "NA",
        "situacao": "MESA - Tramitação do Requerimento Finalizada",
        "linkInteiroTeor": "http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=1515376",
        "apensadas": "NA"
      }
*/
import {capitalize, startCase, toLower} from 'lodash'

export default {
  name: 'politico',
  props: {
    politico: {
      type: Object,
      required: true
    }
  },
  data () {
    return {...this.politico}
  },
  methods: {
    capitalize,
    startCase,
    toLower
  }
}
</script>

<style lang="scss" scoped>

</style>
