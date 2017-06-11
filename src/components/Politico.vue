<template>
<div class="politico col-md-4">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">{{capitalize(nome)}}</h3>
    </div>
    <div class="panel-body">
      <div>
        <div class="row">
          <div class="col-md-4">
            <img :src="urlFoto" :alt="nome">
          </div>
          <div class="col-md-8">
            Partido: {{partido}}  <br>
            Uf: {{uf}}  <br>
            Condição: {{condicao}}
            <hr>
            <div class="proposicoes" v-if="proposicoes.length > 0">
              Proposicoes ({{proposicoes.length}}):
              <div v-for="proposicao in proposicoes" class="proposicao">
                <a :href="proposicao.linkInteiroTeor">Nome: {{proposicao.nomeProposicao}}</a><br>
                Situacao: {{proposicao.situacao}} <br>
                Tipo: {{proposicao.tipoProposicao}}
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">{{email}}</div>
  </div>
</div>
</template>

<script>
/*
POLITICO

{ "id": 1, "idParlamentar": "5830382", "ideCadastro": "178980", "codOrcamento": "3283", "matricula": "361", "condicao": "Titular", "nome": "ANTONIO GOULART DOS REIS", "nomeParlamentar": "GOULART", "email": "dep.goulart@camara.gov.br", "gabinete": "533", "anexo": "4", "fone": "3215-5533", "sexo": "masculino", "partido": "PSD", "uf": "SP", "urlFoto": "http://www.camara.gov.br/internet/deputado/bandep/178980.jpg", "proposicoes": [] }

-----

PROPOSICAO

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
import {capitalize} from 'lodash'

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
    capitalize
  }
}
</script>

<style lang="scss" scoped>

</style>
