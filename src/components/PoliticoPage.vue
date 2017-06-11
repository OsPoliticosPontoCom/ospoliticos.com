<template>
<div class="politico-page">
 Deputado: {{deputado}}
</div>
</template>


<script>

/*

Deputado: { "id_cf_deputado": "3156", "id_cadastro": "195143", "nome_parlamentar": "ANDRÉ AMARAL", "nome_civil": "ANDRÉ AUGUSTO CASTRO DO AMARAL FILHO", "sigla_estado": "PB", "sigla_partido": "PMDB", "condicao": "TITULAR", "email": "DEP.ANDREAMARAL@CAMARA.GOV.BR", "valor_total_ceap": "308.318,48", "quantidade_secretarios": "0" }

maioresfornecedores: [ { "id_fornecedor": "90960", "cnpj_cpf": "23551151000133", "nome_fornecedor": "JONATHAN ALVES DA SILVA 08622290492", "valor_total": "80.000,00" }, { "id_fornecedor": "12144", "cnpj_cpf": "09133778000143", "nome_fornecedor": "FLORENCIO", "valor_total": "57.948,57" }, { "id_fornecedor": "2840", "cnpj_cpf": "08865615000192", "nome_fornecedor": "WORKING", "valor_total": "26.300,00" }, { "id_fornecedor": "73804", "cnpj_cpf": "10541486000129", "nome_fornecedor": "M3 LOCADORA DE VEÍCULOS LTDA", "valor_total": "15.000,00" }, { "id_fornecedor": "186", "cnpj_cpf": "02012862000160", "nome_fornecedor": "TAM LINHAS AEREAS S/A", "valor_total": "14.715,62" }, { "id_fornecedor": "1096", "cnpj_cpf": "38024675000143", "nome_fornecedor": "QUASAR RENT A CAR LOCADORA DE VEÍCULOS LTDA", "valor_total": "13.200,00" }, { "id_fornecedor": "227", "cnpj_cpf": "02575829000148", "nome_fornecedor": "CIA AÉREA - AVIANCA", "valor_total": "13.175,51" }, { "id_fornecedor": "88912", "cnpj_cpf": "19044740000158", "nome_fornecedor": "WAYS RENT A CAR", "valor_total": "12.000,00" }, { "id_fornecedor": "598", "cnpj_cpf": "07575651000159", "nome_fornecedor": "GOL LINHAS AÉREAS INTELIGENTES", "valor_total": "11.800,48" }, { "id_fornecedor": "72556", "cnpj_cpf": "07976147002295", "nome_fornecedor": "MOVIDA LOCAÇÃO DE VEICULOS LTDA", "valor_total": "6.700,00" } ]

maioresnotas: [ { "id_cf_despesa": "2763392", "id_fornecedor": "90960", "cnpj_cpf": "23551151000133", "nome_fornecedor": "JONATHAN ALVES DA SILVA 08622290492", "valor_liquido": "20.000,00" }, { "id_cf_despesa": "2763391", "id_fornecedor": "90960", "cnpj_cpf": "23551151000133", "nome_fornecedor": "JONATHAN ALVES DA SILVA 08622290492", "valor_liquido": "20.000,00" }, { "id_cf_despesa": "2763390", "id_fornecedor": "90960", "cnpj_cpf": "23551151000133", "nome_fornecedor": "JONATHAN ALVES DA SILVA 08622290492", "valor_liquido": "20.000,00" }, { "id_cf_despesa": "2763393", "id_fornecedor": "90960", "cnpj_cpf": "23551151000133", "nome_fornecedor": "JONATHAN ALVES DA SILVA 08622290492", "valor_liquido": "20.000,00" }, { "id_cf_despesa": "2424951", "id_fornecedor": "12144", "cnpj_cpf": "09133778000143", "nome_fornecedor": "FLORENCIO", "valor_liquido": "15.000,00" }, { "id_cf_despesa": "2424949", "id_fornecedor": "12144", "cnpj_cpf": "09133778000143", "nome_fornecedor": "FLORENCIO", "valor_liquido": "15.000,00" }, { "id_cf_despesa": "2424950", "id_fornecedor": "12144", "cnpj_cpf": "09133778000143", "nome_fornecedor": "FLORENCIO", "valor_liquido": "15.000,00" }, { "id_cf_despesa": "2424963", "id_fornecedor": "2840", "cnpj_cpf": "08865615000192", "nome_fornecedor": "WORKING", "valor_liquido": "13.600,00" }, { "id_cf_despesa": "2424952", "id_fornecedor": "12144", "cnpj_cpf": "09133778000143", "nome_fornecedor": "FLORENCIO", "valor_liquido": "12.453,40" }, { "id_cf_despesa": "2424962", "id_fornecedor": "2840", "cnpj_cpf": "08865615000192", "nome_fornecedor": "WORKING", "valor_liquido": "10.000,00" } ]
*/
export default {
  name: 'politico-page',
  beforeRouteEnter (to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    console.log('to', to)
    next(async vm => {
      // 3156 (andre amaral) should come from 'from'
      // http://ops.net.br/api/deputado/3156/maioresfornecedores
      // http://ops.net.br/api/deputado/3156/maioresnotas
      // http://ops.net.br/api/deputado/3156/gastosmensaisporano
      const {id} = to.params

      const deputado = await vm.$fetch.get(`http://ops.net.br/api/deputado/${id}`)
      vm.deputado = await deputado.json()

      const maioresfornecedores = await vm.$fetch.get(`http://ops.net.br/api/deputado/${id}/maioresfornecedores`)
      vm.maioresfornecedores = await maioresfornecedores.json()

      const maioresnotas = await vm.$fetch.get(`http://ops.net.br/api/deputado/${id}/maioresnotas`)
      vm.maioresnotas = await maioresnotas.json()
    })
  },
  data () {
    return {
      deputado: {},
      maioresfornecedores: {},
      maioresnotas: {}
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>

</style>
