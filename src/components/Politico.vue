<template>
<div class="politico col-lg-4">
  <div class="panel panel-default">
    <div class="panel-body">
      Panel content
    </div>
    <div class="panel-footer">Panel footer</div>
  </div>
  <div class="name">Nome: {{politico.nome}}</div>
  <div class="condicao">Condicao: {{politico.condicao}}</div>
</div>
</template>

<script>
/*
{ "id": 1, "idParlamentar": "5830382", "ideCadastro": "178980", "codOrcamento": "3283", "matricula": "361", "condicao": "Titular", "nome": "ANTONIO GOULART DOS REIS", "nomeParlamentar": "GOULART", "email": "dep.goulart@camara.gov.br", "gabinete": "533", "anexo": "4", "fone": "3215-5533", "sexo": "masculino", "partido": "PSD", "uf": "SP", "urlFoto": "http://www.camara.gov.br/internet/deputado/bandep/178980.jpg", "proposicoes": [] }
*/
export default {
  name: 'politico',
  props: {
    politico: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
