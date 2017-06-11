<template>
<div class="main-content container">
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Deputado {{startCase(toLower(perfilDep1.ultimoStatus.nomeEleitoral))}}</p>
          <div class="content">
            <img :src="perfilDep1.ultimoStatus.urlFoto" class="image">
          </div>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">Gastos de Leo de Brito</p>
          <doughnut :width="260" :height="260" :options="{responsive: false}" :data="{
            labels: maioresGastosDep1.slice(0,5).map(g => g.nome_fornecedor),
            datasets: [
              {
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(0, 150, 136)',
                  'rgb(121, 85, 72)'
                ],
                data: maioresGastosDep1.slice(0,5).map(g => Number(g.valor_total.split(',')[0]))
              }
            ]
          }"></doughnut>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="field">
            <input type="text" class="input" placeholder="Procure por outros deputados">
          </p>
          <p class="title">Leo de Brito gastou com transporte: R$ {{gastosTransporteDep1}}</p>
          <p class="subtitle">Deputado do estado AC</p>
          <compare-card nome="Leo de Brito" :gastos="gastosDep1"></compare-card>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
        <p class="title">O Deputado Leo De Brito gastou {{(gastosTransporteDep1/gastosTransporteDep2).toFixed(2)}} vezes mais que o Deputado Hido Rocha</p>
        <p class="subtitle"><a href="https://twitter.com/intent/tweet?text=%22O%20Deputado%20Leo%20De%20Brito%20gastou%202.07%20vezes%20mais%20que%20o%20Deputado%20Hido%20Rocha%22&via=os_politicos" target="_blank"><i class="fa fa-twitter-square"></i> Compartilhar No Twitter</a></p>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="field">
          <input type="text" class="input" placeholder="Procure por outros deputados">
        </p>
        <p class="title">Hildo Rocha gastou com transporte: R$ {{gastosTransporteDep2}}</p>
        <p class="subtitle">Deputad do estado MA</p>
        <div class="content">
          <compare-card nome="Hildo Rocha" :gastos="gastosDep2"></compare-card>
        </div>
      </div>
    </article>
  </div>
</div>
</div>
</template>

<script>
/* eslint-disable */
import Doughnut from './Doughnut'
import CompareCard from './CompareCard'
import Perfil from './Perfil'
import {startCase, toLower} from 'lodash'
export default {
  name: 'main-content',
  methods: {
    startCase,
    toLower
  },
  data () {
    return {
      // leo brito
      maioresGastosDep1: [{'id_fornecedor':'9732','cnpj_cpf':'02787053000120','nome_fornecedor':'ACRE PUBLICIDADE LTDA','valor_total':'173.950,00'},{'id_fornecedor':'186','cnpj_cpf':'02012862000160','nome_fornecedor':'TAM LINHAS AEREAS S/A','valor_total':'167.316,27'},{'id_fornecedor':'73183','cnpj_cpf':'20596985000177','nome_fornecedor':'L & A COMERCIO E SERVIÇOS LTDA ME','valor_total':'139.350,00'},{'id_fornecedor':'598','cnpj_cpf':'07575651000159','nome_fornecedor':'GOL LINHAS AÉREAS INTELIGENTES','valor_total':'127.791,39'},{'id_fornecedor':'55066','cnpj_cpf':'14344311000182','nome_fornecedor':'VERDE SERVICE LTDA - LOCALIZA','valor_total':'115.775,43'},{'id_fornecedor':'73122','cnpj_cpf':'07466381000148','nome_fornecedor':'JOAFRA AUTO POSTO','valor_total':'110.404,63'},{'id_fornecedor':'73226','cnpj_cpf':'81180870263','nome_fornecedor':'WEVERTON COSTA SOUZA','valor_total':'61.250,00'},{'id_fornecedor':'60687','cnpj_cpf':'16670085045507','nome_fornecedor':'LOCALIZA RENT A CAR S/A','valor_total':'24.959,68'},{'id_fornecedor':'36477','cnpj_cpf':'07918532000151','nome_fornecedor':'TÁXI AÉREO LTDA','valor_total':'21.250,00'},{'id_fornecedor':'90664','cnpj_cpf':'07914597000129','nome_fornecedor':'ESFERA COMUNICAÇÃO LTDA','valor_total':'18.000,00'}],
      // Dep. HILDO ROCHA
      maioresGastosDep2: [{'id_fornecedor':'7892','cnpj_cpf':'11630318000172','nome_fornecedor':'BCP - BRASILIA COMUNICAÇÃO E PUBLICIDADE','valor_total':'374.199,99'},{'id_fornecedor':'72210','cnpj_cpf':'10558639000140','nome_fornecedor':'A.BISPO DE JESUS FILHO','valor_total':'104.659,97'},{'id_fornecedor':'598','cnpj_cpf':'07575651000159','nome_fornecedor':'GOL LINHAS AÉREAS INTELIGENTES','valor_total':'86.660,29'},{'id_fornecedor':'186','cnpj_cpf':'02012862000160','nome_fornecedor':'TAM LINHAS AEREAS S/A','valor_total':'65.920,45'},{'id_fornecedor':'69767','cnpj_cpf':'13144355000104','nome_fornecedor':'MARANHÃO GRAFF','valor_total':'40.950,00'},{'id_fornecedor':'72291','cnpj_cpf':'22457798353','nome_fornecedor':'DAVID MALUF SAAD','valor_total':'40.000,00'},{'id_fornecedor':'69608','cnpj_cpf':'02290600000167','nome_fornecedor':'NEW SERVICE LTDA ME','valor_total':'39.746,40'},{'id_fornecedor':'14717','cnpj_cpf':'13822124000102','nome_fornecedor':'SIGMA AUTOLOCADORA','valor_total':'32.200,00'},{'id_fornecedor':'72216','cnpj_cpf':'10892795000143','nome_fornecedor':'ESCUTEC - PESQUISAS DE MERCADO E DE OPINIÃO PÚBLICA LTDA','valor_total':'26.000,00'},{'id_fornecedor':'461','cnpj_cpf':'05443449000148','nome_fornecedor':'VÉRTICE ASSOCIADOS','valor_total':'25.900,00'}],
      // pertence a cateforia
      categoriasTransporte: ['TAM LINHAS AEREAS S/A', 'CIA AÉREA - AZUL', 'GOL LINHAS AÉREAS INTELIGENTES', 'TÁXI AÉREO LTDA'],
      // Hildo Rocha
      perfilDep1: {
        'id': 178825,
        'uri': 'https://dadosabertos.camara.leg.br/api/v2/deputados/178825',
        'nomeCivil': 'LEONARDO CUNHA DE BRITO',
        'ultimoStatus': {
            'id': 178825,
            'uri': 'https://dadosabertos.camara.leg.br/api/v2/deputados/178825',
            'nome': 'LEO DE BRITO',
            'siglaPartido': 'PT',
            'uriPartido': 'https://dadosabertos.camara.leg.br/api/v2/partidos/36844',
            'siglaUf': 'AC',
            'idLegislatura': 55,
            'urlFoto': 'http://www.camara.gov.br/internet/deputado/bandep/178825.jpg',
            'data': '2015-02-01',
            'nomeEleitoral': 'LEO DE BRITO',
            'gabinete': {
                'nome': '619',
                'predio': '4',
                'sala': '619',
                'andar': '6',
                'telefone': '3215-5619',
                'email': 'dep.leodebrito@camara.leg.br'
            },
            'situacao': 'Exercício',
            'condicaoEleitoral': 'Titular',
            'descricaoStatus': null
        },
        'cpf': '',
        'sexo': 'M',
        'urlWebsite': null,
        'redeSocial': [
            'www.facebook.com/leodopt1331'
        ],
        'dataNascimento': '1979-04-13',
        'dataFalecimento': null,
        'ufNascimento': 'AC',
        'municipioNascimento': 'Rio Branco',
        'escolaridade': 'Mestrado'
      },
      'links': null
      }
  },
  computed: {
    gastosTransporteDep1 () {
      return this.maioresGastosDep1.filter(g => {
        return this.categoriasTransporte.includes(g.nome_fornecedor)
      }).reduce((total, curr) => {
        console.log(curr)
        return total + Number(curr.valor_total.split(',')[0].split('.').join(''))
      }, 0)
    },
    gastosTransporteDep2 () {
      return this.maioresGastosDep2.filter(g => {
        return this.categoriasTransporte.includes(g.nome_fornecedor)
      }).reduce((total, curr) => {
        console.log(curr)
        return total + Number(curr.valor_total.split(',')[0].split('.').join(''))
      }, 0)
    },
    maiorGastoTransporte () {
      return Math.max(this.gastosTransporteDep1, this.gastosTransporteDep2)
    },
    gastosDep1 () {
      return [{
        label: 'Transporte',
        percent: (this.gastosTransporteDep1 / this.maiorGastoTransporte) * 100
      }]
    },
    gastosDep2 () {
      return [{
        label: 'Transporte',
        percent: (this.gastosTransporteDep2 / this.maiorGastoTransporte) * 100
      }]
    }
  },
  components: {
    Doughnut,
    CompareCard,
    Perfil
  }
}
</script>

<style>
.main-content {
  padding: 20px 0;
}
</style>
